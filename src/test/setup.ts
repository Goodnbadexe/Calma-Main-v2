import '@testing-library/jest-dom'
import { vi } from 'vitest'

class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// Minimal localStorage mock for tests
const storage: Record<string, string> = {}
global.localStorage = {
  getItem: (key: string) => (key in storage ? storage[key] : null),
  setItem: (key: string, value: string) => { storage[key] = value },
  removeItem: (key: string) => { delete storage[key] },
  clear: () => { Object.keys(storage).forEach((k) => delete storage[k]) },
  length: 0,
  key: () => null
} as unknown as Storage

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver

// Mock modules that are not available in test environment
vi.mock('embla-carousel-react', () => {
  return {
    default: () => [null, {}]
  }
})
