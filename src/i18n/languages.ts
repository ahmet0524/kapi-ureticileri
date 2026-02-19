// ============================================
// 2. src/i18n/languages.ts - Dil Tanımları
// ============================================

export const languages = {
  tr: {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷',
    dir: 'ltr'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    dir: 'ltr'
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl'
  }
} as const;

export const defaultLang = 'en';
export type Language = keyof typeof languages;
