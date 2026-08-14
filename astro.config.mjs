import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://opsprimer.com',
  integrations: [mdx(), sitemap()],
  build: {
    // CSS sempre em arquivo proprio — <style> inline seria bloqueado pelo CSP.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Impede o Astro de embutir o JS do quiz no HTML: o CSP nao permite
      // script inline, entao o script precisa sair como arquivo em /_astro/.
      assetsInlineLimit: 0,
    },
  },
});
