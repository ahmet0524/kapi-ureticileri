import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'kapi-ureticileri.vercel.app',
  integrations: [sitemap()],
  build: {
    assets: 'assets'
  }
});