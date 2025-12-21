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

describe('Routing and i18n', () => {
  it('Contact nav goes to /contact in English', async () => {
    render(<App initialPath="/" />)
    const btn = screen.getByRole('button', { name: /Contact/i })
    btn.click()
    expect(await screen.findByText('Contact EN')).toBeInTheDocument()
  })

  it('Arabic Contact nav goes to /ar/contact', async () => {
    render(<App initialPath="/ar" />)
    const langToggle = screen.getByRole('button', { name: /Switch language/i })
    langToggle.click()
    const btn = await screen.findByRole('button', { name: /تواصل/i })
    btn.click()
    expect(await screen.findByText('Contact AR')).toBeInTheDocument()
  })
})
