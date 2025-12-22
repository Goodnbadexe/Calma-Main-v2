import { describe, it, expect } from 'vitest'
import { isValidEmail } from '@/pages/english/Register/validation'

describe('Register validation', () => {
  it('validates email format', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('bad@')).toBe(false)
    expect(isValidEmail('no-at.com')).toBe(false)
  })
})
