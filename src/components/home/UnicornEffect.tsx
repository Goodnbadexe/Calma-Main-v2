import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  lazy?: boolean
  onReady?: () => void
}

export default function UnicornEffect({ src, lazy = true, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const mount = () => {
      if (!containerRef.current || loaded) return
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = () => {
        setLoaded(true)
        onReady?.()
      }
      script.onerror = () => {
        if (import.meta.env.DEV) console.warn('Failed to load Unicorn script:', src)
      }
      containerRef.current.appendChild(script)
    }
    if (!lazy) {
      mount()
      return
    }
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mount()
          io.disconnect()
        }
      })
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [src, lazy, loaded, onReady])

  return <div ref={containerRef} className="unicorn-host reveal-block" aria-label="Interactive Unicorn effect" />
}

