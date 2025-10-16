import { defineCollection, z } from 'astro:content';

const article = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    readTime: z.string(),
    author: z.string(),
    featured: z.boolean(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    keywords: z.string().optional(),
  }),
});

export const collections = { article };
