// ============================================
// astro.config.mjs - Production-Ready Config
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
      prefixDefaultLocale: false,
      // Vercel için fallback stratejisi
      fallbackType: 'redirect'
    }
  },

  integrations: [mdx()],

  build: {
    assets: 'assets',
    // Vercel için optimize edilmiş build
    format: 'directory'
  },

  // Vercel deployment için
  trailingSlash: 'ignore',

  // Build hooks
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
});
