import { describe, expect, it } from 'vitest';
import { shareHref, type SharePayload } from './share';

const payload: SharePayload = {
  url: 'https://majesta.net/notes/a-public-notebook',
  title: 'A public notebook',
  summary: 'Notes that travel with the software.',
};

describe('shareHref', () => {
  it('builds an X intent that carries the title and canonical URL', () => {
    const href = shareHref('x', payload);
    const parsed = new URL(href);

    expect(parsed.origin + parsed.pathname).toBe('https://x.com/intent/tweet');
    expect(parsed.searchParams.get('text')).toBe(payload.title);
    expect(parsed.searchParams.get('url')).toBe(payload.url);
  });

  it('builds Facebook and LinkedIn share URLs from the canonical page', () => {
    expect(shareHref('facebook', payload)).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(payload.url)}`,
    );
    expect(shareHref('linkedin', payload)).toBe(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(payload.url)}`,
    );
  });

  it('builds a mailto link with the title, summary, and URL', () => {
    const href = shareHref('email', payload);
    const parsed = new URL(href);

    expect(parsed.protocol).toBe('mailto:');
    expect(parsed.searchParams.get('subject')).toBe(payload.title);
    expect(parsed.searchParams.get('body')).toBe(`${payload.summary}\n\n${payload.url}`);
  });

  it('encodes punctuation in titles and URLs', () => {
    const href = shareHref('x', {
      url: 'https://majesta.net/notes/eins-vieles?',
      title: 'Kein Eins, immer ein Vieles',
      summary: 'A line.',
    });
    const parsed = new URL(href);

    expect(parsed.searchParams.get('text')).toBe('Kein Eins, immer ein Vieles');
    expect(parsed.searchParams.get('url')).toBe('https://majesta.net/notes/eins-vieles?');
  });
});
