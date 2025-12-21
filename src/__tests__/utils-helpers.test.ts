// @ts-nocheck
/// <reference types="vitest" />
import { describe, it, expect } from 'vitest'
import { formatCurrency, validateEmail, validateSaudiPhone, formatDate } from '@/utils/helpers'

describe('utils/helpers', () => {
  it('formats currency in SAR', () => {
    const out = formatCurrency(1234.56, 'SAR', 'ar-SA')
    expect(out).toMatch(/ر\.س|SAR/)
  })

  it('validates email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('bad@')).toBe(false)
  })

  it('validates saudi phone numbers', () => {
    expect(validateSaudiPhone('+966500000000')).toBe(true)
    expect(validateSaudiPhone('0500000000')).toBe(true)
    expect(validateSaudiPhone('12345')).toBe(false)
  })

  it('formats dates', () => {
    const out = formatDate('2025-01-01', 'en-US')
    expect(out).toMatch(/2025/)
  })
})
