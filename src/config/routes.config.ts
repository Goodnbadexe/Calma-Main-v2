export const routes = {
  home: { en: '/', ar: '/ar' },
  about: { en: '/about', ar: '/ar/about', arNative: '/ar/عن كالـما' },
  news: { en: '/news', ar: '/ar/news', arNative: '/ar/الأخبار' },
  projects: { en: '/projects', ar: '/ar/projects', arNative: '/ar/المشاريع' },
  projectDynamic: { en: '/projects/:slug' },
  projectCategories: {
    villa: { en: '/projects/villa', ar: '/ar/projects/villa' },
    floor: { en: '/projects/floor', ar: '/ar/projects/floor' },
    townhouse: { en: '/projects/townhouse', ar: '/ar/projects/townhouse' },
    office: { en: '/projects/office', ar: '/ar/projects/office' },
    commercials: { ar: '/ar/projects/commercials' },
    residential: { ar: '/ar/projects/residential' },
    calmaTower: { ar: '/ar/projects/calma-tower' },
  },
  contact: { en: '/contact', ar: '/ar/contact', arNative: '/ar/تواصل معنا' },
  register: { en: '/register', ar: '/ar/register', arNative: '/ar/التسجيل' },
} as const

export type RouteKey = keyof typeof routes
