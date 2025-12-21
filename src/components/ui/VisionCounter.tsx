import { useEffect, useMemo, useRef, useState } from 'react'

type VisionCounterProps = {
  target: number
  startAt?: number
  durationMs?: number
  heading?: string
  label?: string
  suffix?: string
  locale?: string
  className?: string
}

export default function VisionCounter({
  target,
  startAt = 0,
  durationMs = 2200,
  heading = 'WHERE VISION TAKES SHAPE',
  label = 'RESIDENTS',
  suffix = '+',
  locale = 'en',
  className = '',
}: VisionCounterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState<number>(startAt)
  const [started, setStarted] = useState<boolean>(false)
  const [completed, setCompleted] = useState<boolean>(false)

  const formatter = useMemo(() => new Intl.NumberFormat(locale), [locale])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true)

            if (prefersReduced || durationMs <= 0) {
              setValue(target)
              setCompleted(true)
              return
            }

            const startTime = performance.now()
            let raf = 0
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

            const tick = (now: number) => {
              const elapsed = now - startTime
              const progress = Math.min(1, elapsed / durationMs)
              const eased = easeOutCubic(progress)
              const next = Math.round(startAt + (target - startAt) * eased)
              setValue(next)
              if (progress < 1) {
                raf = requestAnimationFrame(tick)
              } else {
                setCompleted(true)
              }
            }

            raf = requestAnimationFrame(tick)
            return () => cancelAnimationFrame(raf)
          }
        })
      },
      { threshold: 0.35 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, startAt, durationMs, started])

  return (
    <div ref={containerRef} className={`vision-counter ${className}`} aria-label={heading}>
      <div className="vision-heading">{heading}</div>
      <div className="vision-number" aria-live="polite">
        <span className="vision-number-value">{formatter.format(value)}</span>
        <span className={`vision-plus ${completed ? 'vision-plus-show' : ''}`}>{suffix}</span>
      </div>
      <div className="vision-label">{label}</div>
    </div>
  )
}