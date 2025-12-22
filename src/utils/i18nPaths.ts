import { routes } from '@/config/routes.config'

const enToAr: Record<string, string> = {
  [routes.home.en]: routes.home.ar,
  [routes.about.en]: routes.about.ar,
  [routes.news.en]: routes.news.ar,
  [routes.projects.en]: routes.projects.ar,
  [routes.contact.en]: routes.contact.ar,
  [routes.register.en]: routes.register.ar,
  [routes.projectCategories.villa.en]: routes.projectCategories.villa.ar,
  [routes.projectCategories.floor.en]: routes.projectCategories.floor.ar,
  [routes.projectCategories.townhouse.en]: routes.projectCategories.townhouse.ar,
  [routes.projectCategories.office.en]: routes.projectCategories.office.ar,
}

const arToEn: Record<string, string> = {
  [routes.home.ar]: routes.home.en,
  [routes.about.ar]: routes.about.en,
  [routes.about.arNative]: routes.about.en,
  [routes.news.ar]: routes.news.en,
  [routes.news.arNative]: routes.news.en,
  [routes.projects.ar]: routes.projects.en,
  [routes.projects.arNative]: routes.projects.en,
  [routes.contact.ar]: routes.contact.en,
  [routes.contact.arNative]: routes.contact.en,
  [routes.register.ar]: routes.register.en,
  [routes.register.arNative]: routes.register.en,
  [routes.projectCategories.villa.ar]: routes.projectCategories.villa.en,
  [routes.projectCategories.floor.ar]: routes.projectCategories.floor.en,
  [routes.projectCategories.townhouse.ar]: routes.projectCategories.townhouse.en,
  [routes.projectCategories.office.ar]: routes.projectCategories.office.en,
}

export function getAlternateLinks(currentPath: string) {
  const isAr = isArabicPath(currentPath)
  if (isAr) {
    const en = arToEn[currentPath]
    return [
      { hrefLang: 'ar', path: currentPath },
      ...(en ? [{ hrefLang: 'en', path: en }] : []),
    ]
  } else {
    const ar = enToAr[currentPath]
    return [
      { hrefLang: 'en', path: currentPath },
      ...(ar ? [{ hrefLang: 'ar', path: ar }] : []),
    ]
  }
}

export function isArabicPath(path: string) {
  return path.startsWith('/ar')
}

export function toLanguagePath(lang: 'en' | 'ar', currentPath: string) {
  if (lang === 'en') {
    const mapped = arToEn[currentPath]
    if (mapped) return mapped
    if (currentPath.startsWith('/ar')) return routes.home.en
    return currentPath || routes.home.en
  } else {
    const mapped = enToAr[currentPath]
    if (mapped) return mapped
    if (currentPath.startsWith('/ar')) return currentPath
    if (currentPath === routes.home.en) return routes.home.ar
    return `${routes.home.ar}${currentPath === '/' ? '' : currentPath}`
  }
}
