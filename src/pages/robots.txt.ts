import type { APIRoute } from 'astro';
import { site } from '../lib/brand';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site.url).toString()}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
