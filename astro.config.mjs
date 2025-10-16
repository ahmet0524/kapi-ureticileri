import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  site: 'https://kapi-ureticileri.vercel.app/',
  integrations: [mdx(), sitemap()],
  build: {
    assets: 'assets'
  }
});