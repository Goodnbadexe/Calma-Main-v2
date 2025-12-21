import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedNumberProps {
  value: number | string
  className?: string
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
  formatter?: (value: number) => string
  triggerOnView?: boolean
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className = '',
  duration = 2000,
  delay = 0,
  suffix = '',
  prefix = '',
  formatter,
  triggerOnView = true
}) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  // Extract numeric value from string if needed
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^\d.-]/g, '')) || 0
    : value

  // Default formatter
  const defaultFormatter = (num: number) => {
    const base = Math.floor(num).toLocaleString()
    if (typeof value === 'string' && value.includes('K')) {
      const kilo = Math.floor(num / 1000)
      return `${kilo}K+`
    }
    if (typeof value === 'string' && value.includes('+')) {
      return `${base}+`
    }
    return base
  }

  const formatValue = formatter || defaultFormatter

  useEffect(() => {
    if (!triggerOnView) {
      startAnimation()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          startAnimation()
        }
      },
      { threshold: 0.3 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible, triggerOnView])

  const startAnimation = () => {
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplayValue(typeof numericValue === 'number' ? numericValue : 0)
      return
    }
    setTimeout(() => {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
        const easedProgress = easeOutCubic(progress)
        const currentValue = numericValue * easedProgress
        setDisplayValue(currentValue)
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, delay)
  }

  return (
    <motion.span
      ref={elementRef}
      className={`animated-number ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </motion.span>
  )
}

export default AnimatedNumber
