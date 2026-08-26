import { getCollection, type CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;

export async function getPublishedArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatArticleDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
