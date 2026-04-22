// utils.ts — blog slug'ları eklenmiş versiyon
// Sadece routeSlugs nesnesine yeni satırlar eklendi.
// Diğer her şey orijinal ile aynı.

import { translations, type Language } from './translations';
import { languages, defaultLang } from './languages';

const routeSlugs: Record<string, Partial<Record<Language, string>>> = {
  // ── Mevcut sayfalar ──────────────────────────────────────────────────
  '/hakkimizda':                { en: '/about',                  ar: '/hakkimizda' },
  '/urunlerimiz':               { en: '/products',               ar: '/urunlerimiz' },
  '/iletisim':                  { en: '/contact',                ar: '/contact' },
  '/pvc-kapilar':               { en: '/pvc-doors',              ar: '/pvc-kapilar' },
  '/laminoks-kapilar':          { en: '/laminoks-doors',         ar: '/laminoks-kapilar' },
  '/laminoks-kapilar-2':        { en: '/laminoks-doors-2',       ar: '/laminoks-kapilar-2' },
  '/elitpan-kapilar':           { en: '/elitpan-doors',          ar: '/elitpan-kapilar' },
  '/hastane-kapilari':          { en: '/hospital-doors',         ar: '/hastane-kapilari' },
  '/otel-kapilari':             { en: '/hotel-doors',            ar: '/otel-kapilari' },
  '/yangina-dayanikli-kapilar': { en: '/fire-resistant-doors',   ar: '/yangina-dayanikli-kapilar' },
  '/misyon-vizyon':             { en: '/mission-vision',         ar: '/misyon-vizyon' },
  '/kalite':                    { en: '/quality',                ar: '/kalite' },
  '/ihracat':                   { en: '/export',                 ar: '/ihracat' },
  '/gizlilik':                  { en: '/privacy',                ar: '/gizlilik' },
  '/kosullar':                  { en: '/terms',                  ar: '/kosullar' },
  '/sss':                       { en: '/faq',                    ar: '/sss' },
  '/destek':                    { en: '/support',                ar: '/destek' },
  '/kategoriler':               { en: '/categories',             ar: '/kategoriler' },
  '/kapi-malzemeleri':          { en: '/door-materials',         ar: '/kapi-malzemeleri' },

  // ── Blog sayfaları ───────────────────────────────────────────────────
  '/blog':                               { en: '/blog',                               ar: '/blog' },
  '/blog/pvc-kapi-ihracati':             { en: '/blog/pvc-door-manufacturers',        ar: '/blog/pvc-kapi-ihracati' },
  '/blog/pvc-kapi-modelleri':            { en: '/blog/pvc-door-models',               ar: '/blog/pvc-kapi-modelleri' },
  '/blog/pvc-kapi-fiyatlari':            { en: '/blog/pvc-door-prices',               ar: '/blog/pvc-kapi-fiyatlari' },
  '/blog/otel-kapilari':                 { en: '/blog/hotel-doors',                   ar: '/blog/otel-kapilari' },
  // Yeni blog yazıları buraya eklenecek:
  // '/blog/yeni-yazi':                  { en: '/blog/new-post',                      ar: '/blog/yeni-yazi' },
};

function getTrSlug(slug: string, lang: Language): string {
  if (lang === 'tr') return slug;
  for (const [trSlug, translations] of Object.entries(routeSlugs)) {
    if (translations[lang] === slug) return trSlug;
  }
  return slug;
}

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as Language;
  }
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: keyof typeof translations[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key] || key;
  }
}

export function getLocalizedRoute(route: string, lang: Language): string {
  const cleanRoute = route.replace(/^\/(en|ar|tr)/, '') || '/';
  const trSlug = getTrSlug(cleanRoute, lang);
  let targetSlug: string;
  if (lang === 'tr') {
    targetSlug = trSlug;
  } else {
    targetSlug = routeSlugs[trSlug]?.[lang] ?? trSlug;
  }
  if (lang === defaultLang) {
    return targetSlug || '/';
  }
  return `/${lang}${targetSlug === '/' ? '' : targetSlug}` || `/${lang}`;
}

export function getAlternateLanguages(currentPath: string, baseUrl: string) {
  // currentPath tam pathname olabilir (/en/blog/... veya /blog/... veya /ar/blog/...)
  const currentLang = (Object.keys(languages) as Language[]).find(lang => {
    if (lang === defaultLang) return !currentPath.match(/^\/(en|ar)\//);
    return currentPath.startsWith(`/${lang}/`) || currentPath === `/${lang}`;
  }) ?? defaultLang;

  const cleanPath = currentPath.replace(/^\/(en|ar)/, '') || '/';
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

export function getLanguageInfo(lang: Language) {
  return {
    code: languages[lang].code,
    name: languages[lang].name,
    dir: languages[lang].dir,
    locale: lang === 'tr' ? 'tr_TR' : lang === 'en' ? 'en_US' : 'ar_AR'
  };
}

export function getAllLanguages() {
  return Object.entries(languages).map(([code, info]) => ({
    code: code as Language,
    ...info
  }));
}

export function getLanguageSwitchUrl(currentUrl: URL, targetLang: Language): string {
  const currentLang = getLangFromUrl(currentUrl);
  let pathname = currentUrl.pathname;
  if (currentLang !== defaultLang) {
    pathname = pathname.replace(`/${currentLang}`, '');
  }
  pathname = pathname || '/';
  const trSlug = getTrSlug(pathname, currentLang);
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

export function isLanguageRoute(pathname: string, lang: Language): boolean {
  if (lang === defaultLang) {
    return !pathname.startsWith('/tr') && !pathname.startsWith('/ar');
  }
  return pathname.startsWith(`/${lang}`);
}

export type { Language };
