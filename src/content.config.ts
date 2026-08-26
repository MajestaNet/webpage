import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!README.md'],
    base: './content/articles',
  }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().min(1),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { articles };
