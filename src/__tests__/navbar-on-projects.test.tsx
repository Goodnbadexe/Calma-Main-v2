import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AppLayout from '@/layouts/AppLayout'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { SplashProvider } from '@/components/system/SplashProvider'

vi.mock('next/router', () => {
  return {
    useRouter: () => ({ asPath: '/projects' })
  }
})

describe('NavBar renders on projects pages', () => {
  it('shows NavBar when path is /projects', () => {
    render(
      <HelmetProvider>
        <LanguageProvider defaultLanguage="en">
          <SplashProvider>
            <AppLayout>
              <div>Projects Content</div>
            </AppLayout>
          </SplashProvider>
        </LanguageProvider>
      </HelmetProvider>
    )
    expect(screen.getByRole('navigation', { name: /Primary navigation/i })).toBeInTheDocument()
  })
})
