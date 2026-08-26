import type { APIRoute } from 'astro';
import { getPublishedArticles } from '../lib/articles';
import { site } from '../lib/brand';

const staticPaths = ['/', '/notes', '/terms'] as const;

export const GET: APIRoute = async () => {
  const articles = await getPublishedArticles();
  const urls = [
    ...staticPaths.map((path) => new URL(path, site.url).toString()),
    ...articles.map((article) => new URL(`/notes/${article.id}`, site.url).toString()),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
