import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  site: 'https://kapi-ureticileri.vercel.app/',
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Google için serialize ekle
      serialize(item) {
        return {
          ...item,
          // Changefreq ve priority ekle
          changefreq: 'weekly',
          priority: 0.7,
        };
      }
    })
  ],
  build: {
    assets: 'assets'
  }
});
