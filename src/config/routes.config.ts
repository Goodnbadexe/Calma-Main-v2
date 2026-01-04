export const routes = {
  home: { en: '/en/home', ar: '/ar/home' },
  about: { en: '/en/about', ar: '/ar/about', arNative: '/ar/عن كالـما' },
  news: { en: '/en/news', ar: '/ar/news', arNative: '/ar/الأخبار' },
  projects: { en: '/en/projects', ar: '/ar/projects', arNative: '/ar/المشاريع' },
  projectDynamic: { en: '/en/projects/:slug' },
  projectCategories: {
    villa: { en: '/en/projects/villa', ar: '/ar/projects/villa' },
    floor: { en: '/en/projects/floor', ar: '/ar/projects/floor' },
    townhouse: { en: '/en/projects/townhouse', ar: '/ar/projects/townhouse' },
    office: { en: '/en/projects/office', ar: '/ar/projects/office' },
    commercials: { ar: '/ar/projects/commercials' },
    residential: { ar: '/ar/projects/residential' },
    calmaTower: { ar: '/ar/projects/calma-tower' },
  },
  contact: { en: '/en/contact', ar: '/ar/contact', arNative: '/ar/تواصل معنا' },
  register: { en: '/en/register', ar: '/ar/register', arNative: '/ar/التسجيل' },
} as const

export type RouteKey = keyof typeof routes
