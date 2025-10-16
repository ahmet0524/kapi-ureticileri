// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const article = defineCollection({
    // Load Markdown and MDX files in the `src/content/article/` directory.
    loader: glob({ base: './src/content/article', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
       z.object({
          title: z.string(),
          description: z.string(),
          pubDate: z.coerce.date(),
          updatedDate: z.coerce.date().optional(),
          heroImage: image().optional(),
          // Yeni eklenen alanlar
          category: z.string().optional().default('Genel'),
          readTime: z.string().optional().default('5 dakika'),
          author: z.string().optional().default('CihanPan Door'),
          featured: z.boolean().optional().default(false),
          keywords: z.string().optional(),
          tags: z.array(z.string()).optional().default([]),
       }),
});

export const collections = { article };
