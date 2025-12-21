import { describe, expect, it } from 'vitest'
import { clamp, nextByViewport } from '../utils'

describe('carousel utils', () => {
  it('clamps values within bounds', () => {
    expect(clamp(-10, 0, 100)).toBe(0)
    expect(clamp(50, 0, 100)).toBe(50)
    expect(clamp(150, 0, 100)).toBe(100)
  })
  it('computes next position by viewport percentage', () => {
    const vw = 1200
    const moveByVW = 0.85
    const max = 3000
    expect(nextByViewport(0, vw, moveByVW, max, 1)).toBe(Math.floor(vw * moveByVW))
    expect(nextByViewport(2900, vw, moveByVW, max, 1)).toBe(max)
    expect(nextByViewport(200, vw, moveByVW, max, -1)).toBe(0)
  })
})

