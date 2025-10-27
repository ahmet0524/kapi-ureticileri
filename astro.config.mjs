import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kapi-ureticileri.vercel.app', // 🔴 sondaki / olmasın
  output: 'static', // Vercel için ideal
  integrations: [
    mdx(), // MDX desteği aktif kalıyor
  ],
  build: {
    assets: 'assets', // Statik dosyaları /assets altına koyar
  },
});
