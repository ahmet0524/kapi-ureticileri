import { translations, type Language } from './translations';
import { languages, defaultLang } from './languages';

// ============================================
// Sayfa slug çevirileri
// TR slug -> her dildeki karşılığı
// ============================================
const routeSlugs: Record<string, Partial<Record<Language, string>>> = {
  '/hakkimizda':              { en: '/about',               ar: '/hakkimizda' },
  '/urunlerimiz':             { en: '/products',            ar: '/urunlerimiz' },
  '/iletisim':                { en: '/contact',             ar: '/contact' },
  '/pvc-kapilar':             { en: '/pvc-doors',           ar: '/pvc-kapilar' },
  '/laminoks-kapilar':        { en: '/laminoks-doors',      ar: '/laminoks-kapilar' },
  '/laminoks-kapilar-2':      { en: '/laminoks-doors-2',    ar: '/laminoks-kapilar-2' },
  '/elitpan-kapilar':         { en: '/elitpan-doors',       ar: '/elitpan-kapilar' },
  '/hastane-kapilari':        { en: '/hospital-doors',      ar: '/hastane-kapilari' },
  '/otel-kapilari':           { en: '/hotel-doors',         ar: '/otel-kapilari' },
  '/yangina-dayanikli-kapilar': { en: '/fire-resistant-doors', ar: '/yangina-dayanikli-kapilar' },
  '/misyon-vizyon':           { en: '/mission-vision',      ar: '/misyon-vizyon' },
  '/kalite':                  { en: '/quality',             ar: '/kalite' },
  '/ihracat':                 { en: '/export',              ar: '/ihracat' },
  '/gizlilik':                { en: '/privacy',             ar: '/gizlilik' },
  '/kosullar':                { en: '/terms',               ar: '/kosullar' },
  '/sss':                     { en: '/faq',                 ar: '/sss' },
  '/destek':                  { en: '/support',             ar: '/destek' },
  '/kategoriler':             { en: '/categories',          ar: '/kategoriler' },
  '/kapi-malzemeleri':        { en: '/door-materials',      ar: '/kapi-malzemeleri' },
};

// Ters map: her dilin kendi slug'ından TR slug'ına dönmek için
function getTrSlug(slug: string, lang: Language): string {
  if (lang === 'tr') return slug;
  for (const [trSlug, translations] of Object.entries(routeSlugs)) {
    if (translations[lang] === slug) return trSlug;
  }
  return slug; // bulunamazsa olduğu gibi döndür
}

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
 * Route helper - Dil prefixli ve slug çevrilmiş URL oluştur
 */
export function getLocalizedRoute(route: string, lang: Language): string {
  // Önce mevcut dil prefix'ini temizle
  const cleanRoute = route.replace(/^\/(en|ar|tr)/, '') || '/';

  // TR slug'a dönüştür (eğer başka dilden geliyorsa)
  const trSlug = getTrSlug(cleanRoute, lang);

  // Hedef dile çevir
  let targetSlug: string;
  if (lang === 'tr') {
    targetSlug = trSlug;
  } else {
    targetSlug = routeSlugs[trSlug]?.[lang] ?? trSlug;
  }

  // Default dil (en) için prefix yok
  if (lang === defaultLang) {
    return targetSlug || '/';
  }

  return `/${lang}${targetSlug === '/' ? '' : targetSlug}` || `/${lang}`;
}

/**
 * Alternate language URLs oluştur (hreflang için)
 */
export function getAlternateLanguages(currentPath: string, baseUrl: string) {
  // currentPath'i TR slug'a çevir
  const currentLang = (Object.keys(languages) as Language[]).find(lang => {
    if (lang === defaultLang) return !currentPath.match(/^\/(tr|ar)/);
    return currentPath.startsWith(`/${lang}`);
  }) ?? defaultLang;

  const cleanPath = currentPath.replace(/^\/(tr|ar|en)/, '') || '/';
  const trSlug = getTrSlug(cleanPath, currentLang);

  return Object.keys(languages).map(lang => {
    const langCode = lang as Language;
    let slug: string;

    if (langCode === 'tr') {
      slug = trSlug;
    } else {
      slug = routeSlugs[trSlug]?.[langCode] ?? trSlug;
    }

    const path = langCode === defaultLang
      ? slug
      : `/${langCode}${slug === '/' ? '' : slug}`;

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

  // Mevcut prefix'i temizle
  if (currentLang !== defaultLang) {
    pathname = pathname.replace(`/${currentLang}`, '');
  }
  pathname = pathname || '/';

  // TR slug'a çevir
  const trSlug = getTrSlug(pathname, currentLang);

  // Hedef dile çevir
  let targetSlug: string;
  if (targetLang === 'tr') {
    targetSlug = trSlug;
  } else {
    targetSlug = routeSlugs[trSlug]?.[targetLang] ?? trSlug;
  }

  if (targetLang === defaultLang) {
    return targetSlug || '/';
  }

  return `/${targetLang}${targetSlug === '/' ? '' : targetSlug}`;
}

/**
 * Route'un hangi dilde olduğunu kontrol et
 */
export function isLanguageRoute(pathname: string, lang: Language): boolean {
  if (lang === defaultLang) {
    return !pathname.startsWith('/tr') && !pathname.startsWith('/ar');
  }
  return pathname.startsWith(`/${lang}`);
}

export type { Language };
