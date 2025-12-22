import { describe, it, expect } from 'vitest'
import { getAlternateLinks, toLanguagePath } from '@/utils/i18nPaths'
import { routes } from '@/config/routes.config'

describe('i18nPaths', () => {
  it('returns alternate links for EN path', () => {
    const links = getAlternateLinks(routes.home.en)
    expect(links.find(l => l.hrefLang === 'en')?.path).toBe(routes.home.en)
    expect(links.find(l => l.hrefLang === 'ar')?.path).toBe(routes.home.ar)
  })

  it('returns alternate links for AR path', () => {
    const links = getAlternateLinks(routes.about.ar)
    expect(links.find(l => l.hrefLang === 'ar')?.path).toBe(routes.about.ar)
    expect(links.find(l => l.hrefLang === 'en')?.path).toBe(routes.about.en)
  })

  it('maps to correct language path', () => {
    expect(toLanguagePath('ar', routes.projects.en)).toBe(routes.projects.ar)
    expect(toLanguagePath('en', routes.register.ar)).toBe(routes.register.en)
  })
})
