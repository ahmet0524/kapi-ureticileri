import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'kapi-ureticileri-q0437kbcw-ahmet-yavuzs-projects-1c10fc7c.vercel.app',
  integrations: [sitemap()],
  build: {
    assets: 'assets'
  }
});