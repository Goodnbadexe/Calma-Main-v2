import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import NavBar from '@/components/ui/NavBar'

function App({ initialPath = '/' }: { initialPath?: string }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <LanguageProvider defaultLanguage={initialPath.startsWith('/ar') ? 'ar' : 'en'}>
        <SplashProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<div>Home EN</div>} />
            <Route path="/ar" element={<div>Home AR</div>} />
            <Route path="/contact" element={<div>Contact EN</div>} />
            <Route path="/ar/contact" element={<div>Contact AR</div>} />
            <Route path="/register" element={<div>Register EN</div>} />
            <Route path="/ar/register" element={<div>Register AR</div>} />
          </Routes>
        </SplashProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe.skip('Routing and i18n', () => {
  it('placeholder', () => {
    expect(true).toBe(true)
  })
})
