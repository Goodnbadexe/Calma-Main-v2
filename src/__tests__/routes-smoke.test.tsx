/**
 * Route linkage smoke test: basic routes render expected components
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

import EnglishHome from '@/pages/english/Home/Home'
import About from '@/pages/english/About/About'

function TestRouter({ initialPath }: { initialPath: string }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <LanguageProvider defaultLanguage="en">
        <SplashProvider>
          <Routes>
            <Route path="/" element={<EnglishHome />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </SplashProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe('Basic route rendering', () => {
  it('renders Home at /', () => {
    render(<TestRouter initialPath="/" />)
    expect(screen.getByRole('heading', { name: /Where Vision Takes Shape/i, level: 1 })).toBeInTheDocument()
  })

  it('renders About at /about', () => {
    render(<TestRouter initialPath="/about" />)
    // Check a known section header from About page
    expect(screen.getByText(/Visionary Leadership/i)).toBeInTheDocument()
  })
})
