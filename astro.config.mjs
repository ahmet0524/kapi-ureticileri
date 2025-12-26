
// ============================================
// 1. astro.config.mjs - i18n Yapılandırması
// ============================================

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kapi-ureticileri.vercel.app',
  output: 'static',
  
  // ✅ i18n yapılandırması
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'ar'],
    routing: {
      prefixDefaultLocale: false, // Türkçe için /tr kullanma
      redirectToDefaultLocale: true
    }
  },
  
  integrations: [mdx()],
  
  build: {
    assets: 'assets',
  }
});
