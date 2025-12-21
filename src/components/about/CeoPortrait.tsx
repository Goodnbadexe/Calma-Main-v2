import { useState } from 'react'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

type Props = {
  src: string
  alt: string
  ratio?: `${number}/${number}` | string
  className?: string
}

export default function CeoPortrait({ src, alt, ratio = '4/3', className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={className} style={{ position: 'relative' }}>
      <ResponsiveImage src={src} alt={alt} ratio={ratio} />
      {!loaded && (
        <div
          className="skeleton-overlay"
          aria-hidden="true"
          style={{ borderRadius: '1rem' }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ display: 'none' }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
