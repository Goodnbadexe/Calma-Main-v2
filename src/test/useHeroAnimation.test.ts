import { describe, it, expect } from 'vitest'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'

describe('useHeroAnimation', () => {
  it('is a function', () => {
    expect(typeof useHeroAnimation).toBe('function')
  })
})
