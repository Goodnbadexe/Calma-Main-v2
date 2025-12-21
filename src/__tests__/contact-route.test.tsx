import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Contact from '@/pages/english/Contact/Contact'
import NavBar from '@/components/ui/NavBar'
import { HelmetProvider } from 'react-helmet-async'

function RouterWithProviders({ initialPath = '/' }: { initialPath?: string }) {
  // suppress scrollTo in tests
  ;(window as any).scrollTo = vi.fn()
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <HelmetProvider>
        <LanguageProvider defaultLanguage="en">
          <SplashProvider>
            <NavBar />
            <Routes>
              <Route path="/contact" element={<Contact />} />
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </SplashProvider>
        </LanguageProvider>
      </HelmetProvider>
    </MemoryRouter>
  )
}

describe('Contact route', () => {
  it('renders Contact at /contact', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <HelmetProvider>
          <LanguageProvider defaultLanguage="en">
            <SplashProvider>
              <Routes>
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </SplashProvider>
          </LanguageProvider>
        </HelmetProvider>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /Contact CALMA/i, level: 1 })).toBeInTheDocument()
  })

  it('NavBar Contact navigates to /contact', async () => {
    render(<RouterWithProviders initialPath="/" />)
    const contactButton = screen.getByRole('button', { name: /Contact/i })
    contactButton.click()
    expect(await screen.findByRole('heading', { name: /Contact CALMA/i, level: 1 })).toBeInTheDocument()
  })
})
