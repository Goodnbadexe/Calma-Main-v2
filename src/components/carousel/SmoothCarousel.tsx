import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export type CarouselConfig = {
  snap?: boolean
  dragSpeed?: number
  damp?: number
  lerp?: number
  infinite?: boolean
  moveByVW?: number
}

export type CarouselItem = {
  id: string
}

type Props<T extends CarouselItem> = {
  items: T[]
  renderItem: (item: T, opts: { active: boolean }) => ReactNode
  config?: CarouselConfig
  ariaLabel?: string
}

export default function SmoothCarousel<T extends CarouselItem>({
  items,
  renderItem,
  config,
  ariaLabel = 'Carousel',
}: Props<T>) {
  const cfg = useMemo<Required<CarouselConfig>>(
    () => ({
      snap: config?.snap ?? false,
      dragSpeed: config?.dragSpeed ?? 1,
      damp: config?.damp ?? 0.92,
      lerp: config?.lerp ?? 0.12,
      infinite: config?.infinite ?? false,
      moveByVW: config?.moveByVW ?? 0.85,
    }),
    [config]
  )

  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const position = useRef(0)
  const velocity = useRef(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const lastX = useRef(0)
  const rafId = useRef<number | null>(null)

  const [cardWidth, setCardWidth] = useState(0)
  const [gap, setGap] = useState(24)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const compute = () => {
      const vw = window.innerWidth
      let visible = 1
      if (vw >= 1440) visible = 3
      else if (vw >= 1024) visible = 2.2
      else if (vw >= 768) visible = 1.5
      else visible = 1
      const g = vw >= 1440 ? 28 : vw >= 1024 ? 24 : 20
      setGap(g)
      const cw = Math.max(280, Math.floor((el.clientWidth - g * (visible - 1)) / visible))
      setCardWidth(cw)
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  const clampPosition = (pos: number) => {
    if (cfg.infinite) return pos
    const max =
      Math.max(0, items.length * (cardWidth + gap) - (containerRef.current?.clientWidth ?? 0))
    return Math.min(Math.max(0, pos), max)
  }

  const updateActiveIndex = () => {
    const idx = Math.round(position.current / (cardWidth + gap))
    setActiveIndex(Math.min(Math.max(idx, 0), items.length - 1))
  }

  const animate = () => {
    position.current = clampPosition(position.current + velocity.current)
    velocity.current *= cfg.damp
    if (Math.abs(velocity.current) < 0.01) velocity.current = 0
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-position.current}px,0,0)`
    }
    updateActiveIndex()
    if (velocity.current !== 0) {
      rafId.current = requestAnimationFrame(animate)
    } else if (cfg.snap) {
      const target = Math.round(position.current / (cardWidth + gap)) * (cardWidth + gap)
      smoothTo(target)
    } else {
      rafId.current = null
    }
  }

  const smoothTo = (target: number) => {
    cancelRaf()
    const step = () => {
      const delta = target - position.current
      position.current = clampPosition(position.current + delta * cfg.lerp)
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-position.current}px,0,0)`
      }
      updateActiveIndex()
      if (Math.abs(delta) > 0.5) {
        rafId.current = requestAnimationFrame(step)
      } else {
        rafId.current = null
      }
    }
    rafId.current = requestAnimationFrame(step)
  }

  const cancelRaf = () => {
    if (rafId.current != null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true
      el.classList.add('dragging')
      startX.current = e.clientX
      lastX.current = e.clientX
      velocity.current = 0
      el.setPointerCapture(e.pointerId)
      cancelRaf()
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - lastX.current
      lastX.current = e.clientX
      position.current = clampPosition(position.current - dx * cfg.dragSpeed)
      velocity.current = -(dx * cfg.dragSpeed)
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-position.current}px,0,0)`
      }
      updateActiveIndex()
    }
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging.current) return
      dragging.current = false
      el.classList.remove('dragging')
      el.releasePointerCapture(e.pointerId)
      cancelRaf()
      rafId.current = requestAnimationFrame(animate)
    }
    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [cfg.dragSpeed])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      const isRTL = document.documentElement.dir === 'rtl'
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        let dir = e.key === 'ArrowRight' ? 1 : -1
        if (isRTL) dir = -dir
        const by = Math.floor(window.innerWidth * cfg.moveByVW)
        smoothTo(clampPosition(position.current + dir * by))
      } else if (e.key === 'Home') {
        e.preventDefault()
        smoothTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        const end = (items.length - 1) * (cardWidth + gap)
        smoothTo(clampPosition(end))
      }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [cfg.moveByVW])

  useEffect(() => {
    position.current = clampPosition(activeIndex * (cardWidth + gap))
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-position.current}px,0,0)`
    }
  }, [cardWidth, gap])

  return (
    <section
      className="featured-carousel section"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="showcase-header">
        <h2 className="showcase-title">Featured Projects</h2>
        <p className="showcase-subtitle">A glimpse into the places where our vision takes shape.</p>
      </div>
      <div
        className="carousel-container"
        ref={containerRef}
        tabIndex={0}
        aria-live="polite"
        aria-label="Project slider"
      >
        <div className="carousel-track" ref={trackRef} style={{ gap }}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="carousel-item"
              style={{ width: cardWidth }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${items.length}`}
              id={`slide-${i + 1}`}
            >
              <motion.div
                className={i === activeIndex ? 'card-active' : 'card-inactive'}
                animate={i === activeIndex ? { scale: 1.02 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              >
                {renderItem(item, { active: i === activeIndex })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button
          className="btn btn-ghost btn-icon"
          aria-label="Previous"
          onClick={() => smoothTo(clampPosition(position.current - Math.floor(window.innerWidth * cfg.moveByVW)))}
        >
          ‹
        </button>
        <button
          className="btn btn-ghost btn-icon"
          aria-label="Next"
          onClick={() => smoothTo(clampPosition(position.current + Math.floor(window.innerWidth * cfg.moveByVW)))}
        >
          ›
        </button>
      </div>
      <div className="carousel-pagination" aria-label="Carousel pagination">
        <div className="carousel-dots" role="tablist" aria-orientation="horizontal">
          {items.map((it, i) => {
            const isActive = i === activeIndex
            const target = i * (cardWidth + gap)
            return (
              <button
                key={`dot-${it.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`slide-${i + 1}`}
                className={`carousel-dot ${isActive ? 'active' : ''}`}
                onClick={() => smoothTo(clampPosition(target))}
              />
            )
          })}
        </div>
        <div className="carousel-count" aria-live="polite">
          {activeIndex + 1} / {items.length}
        </div>
      </div>
    </section>
  )
}
