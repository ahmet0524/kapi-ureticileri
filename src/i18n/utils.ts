import { translations, type Language } from './translations';
import { languages, defaultLang } from './languages';


export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as Language;
  }
  return defaultLang;
}

/**
 * Çeviri fonksiyonu oluştur
 */
export function useTranslations(lang: Language) {
  return function t(key: keyof typeof translations[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key] || key;
  }
}

/**
 * Route helper - Dil prefixli URL oluştur
 */
export function getLocalizedRoute(route: string, lang: Language): string {
  const cleanRoute = route.replace(/^\/(en|ar|tr)/, '');
  if (lang === defaultLang) {
    return cleanRoute || '/';
  }
  return `/${lang}${cleanRoute || '/'}`;
}

/**
 * Alternate language URLs oluştur
 */
export function getAlternateLanguages(currentPath: string, baseUrl: string) {
  return Object.keys(languages).map(lang => {
    const langCode = lang as Language;
    const path = langCode === defaultLang ? currentPath : `/${langCode}${currentPath}`;
    return {
      lang: langCode,
      url: `${baseUrl}${path}`,
      name: languages[langCode].name
    };
  });
}

/**
 * Meta tags için dil bilgisi
 */
export function getLanguageInfo(lang: Language) {
  return {
    code: languages[lang].code,
    name: languages[lang].name,
    dir: languages[lang].dir,
    locale: lang === 'tr' ? 'tr_TR' : lang === 'en' ? 'en_US' : 'ar_AR'
  };
}

/**
 * Tüm dilleri listele
 */
export function getAllLanguages() {
  return Object.entries(languages).map(([code, info]) => ({
    code: code as Language,
    ...info
  }));
}

/**
 * Dil switch için URL oluştur
 */
export function getLanguageSwitchUrl(currentUrl: URL, targetLang: Language): string {
  const currentLang = getLangFromUrl(currentUrl);
  let pathname = currentUrl.pathname;

  if (currentLang !== defaultLang) {
    pathname = pathname.replace(`/${currentLang}`, '');
  }

  if (targetLang === defaultLang) {
    return pathname || '/';
  }

  return `/${targetLang}${pathname || '/'}`;
}

/**
 * Route'un hangi dilde olduğunu kontrol et
 */
export function isLanguageRoute(pathname: string, lang: Language): boolean {
  if (lang === defaultLang) {
    return !pathname.startsWith('/en') && !pathname.startsWith('/ar');
  }
  return pathname.startsWith(`/${lang}`);
}

export type { Language };
