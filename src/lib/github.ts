export const GITHUB_ORG = 'MajestaNet';
export const GITHUB_ORG_URL = `https://github.com/${GITHUB_ORG}`;
export const MAX_REPOS = 4;
export const REPOS_ENDPOINT = `https://api.github.com/orgs/${GITHUB_ORG}/repos?type=public&sort=pushed&per_page=100`;
export const CACHE_KEY = 'majesta.repos.v2';
export const CACHE_TTL_MS = 10 * 60 * 1000;

export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  private?: boolean;
};

export type ProjectCard = {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
};

export function selectTopRepos(
  repos: GithubRepo[],
  limit = MAX_REPOS,
): ProjectCard[] {
  return repos
    .filter((repo) => !repo.fork && !repo.archived && !repo.private)
    .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, limit)
    .map((repo) => ({
      name: repo.name,
      description: repo.description?.trim() || 'Open source software from Majesta.Net.',
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
    }));
}

export function parseRepoCache(raw: string, now = Date.now()): GithubRepo[] | null {
  try {
    const parsed = JSON.parse(raw) as { savedAt?: number; repos?: GithubRepo[] };
    if (
      typeof parsed.savedAt !== 'number' ||
      !Array.isArray(parsed.repos) ||
      now - parsed.savedAt > CACHE_TTL_MS
    ) {
      return null;
    }
    return parsed.repos;
  } catch {
    return null;
  }
}

export function cacheRead(now = Date.now()): GithubRepo[] | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return parseRepoCache(raw, now);
  } catch {
    return null;
  }
}

export function cacheWrite(repos: GithubRepo[], now = Date.now()): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: now, repos }));
  } catch {
    // Quota or private-mode storage can throw; the catalogue still works without a cache.
  }
}
