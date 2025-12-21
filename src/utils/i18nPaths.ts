export function toLanguagePath(lang: 'en' | 'ar', currentPath: string): string {
  const mapEnToAr: Record<string, string> = {
    '/': '/ar',
    '/about': '/ar/about',
    '/projects': '/ar/projects',
    '/news': '/ar/news',
    '/contact': '/ar/contact',
    '/register': '/ar/register'
  }
  const mapArToEn: Record<string, string> = {
    '/ar': '/',
    '/ar/about': '/about',
    '/ar/projects': '/projects',
    '/ar/news': '/news',
    '/ar/contact': '/contact',
    '/ar/register': '/register'
  }
  const normalize = (p: string) => p.replace(/\/+$/, '') || '/'
  const path = normalize(currentPath)
  if (lang === 'ar') {
    if (path.startsWith('/projects')) return path.replace('/projects', '/ar/projects')
    if (mapEnToAr[path]) return mapEnToAr[path]
    return '/ar'
  } else {
    if (path.startsWith('/ar/projects')) return path.replace('/ar/projects', '/projects')
    if (mapArToEn[path]) return mapArToEn[path]
    return '/'
  }
}
