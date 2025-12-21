/**
 * Smoke test: English Home page renders without crashing
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import EnglishHome from '@/pages/english/Home/Home'

describe('EnglishHome page', () => {
  it('renders hero content', () => {
    render(
      <MemoryRouter>
        <LanguageProvider defaultLanguage="en">
          <SplashProvider>
            <EnglishHome />
          </SplashProvider>
        </LanguageProvider>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /Where Vision Takes Shape/i, level: 1 })).toBeInTheDocument()
  })
})
