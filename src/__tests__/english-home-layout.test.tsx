import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import EnglishHome from '@/pages/english/Home/Home'

describe('EnglishHome layout regressions', () => {
  it('renders key content sections', () => {
    render(
      <MemoryRouter>
        <LanguageProvider defaultLanguage="en">
          <SplashProvider>
            <EnglishHome />
          </SplashProvider>
        </LanguageProvider>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /Redefining Luxury Living/i })).toBeInTheDocument()
    expect(screen.getByText(/m² of Possibilities unfolding/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /The Calma Way/i })).toBeInTheDocument()
  })
})

