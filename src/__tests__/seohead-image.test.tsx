import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import SEOHead from '@/components/seo/SEOHead'
import brandmark from '@/assets/Logos/BRANDMARK_01-p-2000.png'

describe('SEOHead default image', () => {
  it('uses brandmark for og:image when no image provided', () => {
    render(
      <HelmetProvider>
        <SEOHead title="Test" />
      </HelmetProvider>
    )
    const metas = Array.from(document.head.querySelectorAll('meta[property="og:image"]'))
    const og = metas.find(Boolean)
    expect(og?.getAttribute('content')).toContain(brandmark)
  })
})
