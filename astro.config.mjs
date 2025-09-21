import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://kapi-ureticileri.netlify.app', // Netlify URL'inizi buraya yazın
  integrations: [sitemap()],
  build: {
    assets: 'assets'
  }
});