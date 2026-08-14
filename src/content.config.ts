import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    /** Ferramentas citadas. Decide se o bloco de divulgacao aparece. */
    tools: z.array(z.string()).default([]),
    /** Agrupamento tematico da home e da listagem. */
    group: z.enum(['choosing', 'limits', 'making-it-work']).optional(),
    /** O numero-manchete do artigo. */
    hero: z.object({ figure: z.string(), label: z.string() }).optional(),
  }),
});

export const collections = { articles };
