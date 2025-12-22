import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SplashProvider } from '@/components/system/SplashProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Register from '@/pages/english/Register/Register'
import { HelmetProvider } from 'react-helmet-async'

vi.mock('@/services/api', () => ({
  submitLead: vi.fn(async () => ({ ok: true }))
}))

describe('Register form', () => {
  it('validates required fields and submits', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider defaultLanguage="en">
          <SplashProvider>
            <HelmetProvider>
              <Register />
            </HelmetProvider>
          </SplashProvider>
        </LanguageProvider>
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('checkbox', { name: /I agree to the Privacy Policy/i }))
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } })
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /Register Your Interest/i }))
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })
})
