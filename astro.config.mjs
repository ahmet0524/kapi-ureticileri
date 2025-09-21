import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://kapi-ureticileri.web.app',
  integrations: [],
  build: {
    assets: 'assets'
  }
});