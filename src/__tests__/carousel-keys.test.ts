import { describe, it, expect } from 'vitest'
import { keyToDirection } from '@/components/home/FeaturedProjectsCarousel'

describe('carousel keyboard mapping', () => {
  it('maps right keys to next', () => {
    expect(keyToDirection('ArrowRight')).toBe('next')
    expect(keyToDirection('d')).toBe('next')
    expect(keyToDirection('D')).toBe('next')
  })
  it('maps left keys to prev', () => {
    expect(keyToDirection('ArrowLeft')).toBe('prev')
    expect(keyToDirection('a')).toBe('prev')
    expect(keyToDirection('A')).toBe('prev')
  })
  it('ignores other keys', () => {
    expect(keyToDirection('x')).toBeNull()
    expect(keyToDirection('Enter')).toBeNull()
  })
})
