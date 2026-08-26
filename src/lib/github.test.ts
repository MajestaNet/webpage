import { describe, expect, it } from 'vitest';
import {
  CACHE_TTL_MS,
  parseRepoCache,
  selectTopRepos,
  type GithubRepo,
} from './github';

function repo(overrides: Partial<GithubRepo>): GithubRepo {
  return {
    name: 'example',
    description: 'An example project',
    html_url: 'https://github.com/MajestaNet/example',
    homepage: null,
    language: 'TypeScript',
    stargazers_count: 0,
    pushed_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    fork: false,
    archived: false,
    ...overrides,
  };
}

describe('selectTopRepos', () => {
  it('returns an empty list when the org has no public software yet', () => {
    expect(selectTopRepos([])).toEqual([]);
  });

  it('drops forks, archives, private repos and the website itself', () => {
    const selected = selectTopRepos([
      repo({ name: 'website', stargazers_count: 99 }),
      repo({ name: '.github' }),
      repo({ name: 'forked', fork: true, stargazers_count: 12 }),
      repo({ name: 'old', archived: true, stargazers_count: 12 }),
      repo({ name: 'secret', private: true, stargazers_count: 12 }),
      repo({ name: 'keeper', description: 'Keep this one' }),
    ]);

    expect(selected.map((item) => item.name)).toEqual(['keeper']);
  });

  it('prefers stars, then recency, and caps at four', () => {
    const selected = selectTopRepos([
      repo({ name: 'a', stargazers_count: 1, pushed_at: '2026-02-01T00:00:00Z' }),
      repo({ name: 'b', stargazers_count: 5, pushed_at: '2026-01-01T00:00:00Z' }),
      repo({ name: 'c', stargazers_count: 5, pushed_at: '2026-03-01T00:00:00Z' }),
      repo({ name: 'd', stargazers_count: 2, pushed_at: '2026-04-01T00:00:00Z' }),
      repo({ name: 'e', stargazers_count: 0, pushed_at: '2026-05-01T00:00:00Z' }),
    ]);

    expect(selected.map((item) => item.name)).toEqual(['c', 'b', 'd', 'a']);
  });

  it('fills a missing description', () => {
    const [card] = selectTopRepos([repo({ name: 'bare', description: '  ' })]);
    expect(card.description).toMatch(/open source/i);
  });
});

describe('parseRepoCache', () => {
  const now = Date.parse('2026-08-22T00:00:00Z');
  const repos = [repo({ name: 'keeper' })];

  it('returns repos saved within the TTL', () => {
    expect(
      parseRepoCache(JSON.stringify({ savedAt: now - 60_000, repos }), now),
    ).toEqual(repos);
  });

  it('rejects expired, malformed, or non-array payloads', () => {
    expect(parseRepoCache('not-json', now)).toBeNull();
    expect(parseRepoCache(JSON.stringify({ savedAt: now, repos: {} }), now)).toBeNull();
    expect(
      parseRepoCache(JSON.stringify({ savedAt: now - CACHE_TTL_MS - 1, repos }), now),
    ).toBeNull();
  });
});
