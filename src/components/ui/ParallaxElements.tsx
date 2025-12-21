import React, { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'

// Parallax Text Element (inspired by smooothy's data-p elements)
interface ParallaxTextProps {
  children: React.ReactNode
  speed?: number
  direction?: 'x' | 'y' | 'both'
  className?: string
  delay?: number
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  speed = 0.5,
  direction = 'y',
  className = '',
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const x = useTransform(scrollYProgress, [0, 1], [0, speed * 50])

  const getTransform = () => {
    switch (direction) {
      case 'x': return { x }
      case 'y': return { y }
      case 'both': return { x, y }
      default: return { y }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`parallax-text ${className}`}
      style={getTransform()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

// Parallax Container (inspired by smooothy's slider structure)
interface ParallaxContainerProps {
  children: React.ReactNode
  className?: string
  speed?: number
  triggerOnce?: boolean
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  className = '',
  speed = 0.3,

}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className={`parallax-container ${className}`}
      style={{ y, opacity }}
    >
      {children}
    </motion.div>
  )
}

// Parallax List Item (inspired by smooothy's li elements)
interface ParallaxListItemProps {
  children: React.ReactNode
  index: number
  className?: string
  staggerDelay?: number
}

export const ParallaxListItem: React.FC<ParallaxListItemProps> = ({
  children,
  index,
  className = '',
  staggerDelay = 0.1
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.li
      ref={ref}
      className={`parallax-list-item ${className}`}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: index * staggerDelay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.li>
  )
}

// Parallax Speed Element (inspired by smooothy's speed-based parallax)
interface ParallaxSpeedProps {
  children: React.ReactNode
  speedMultiplier?: number
  className?: string
  triggerDistance?: number
}

export const ParallaxSpeed: React.FC<ParallaxSpeedProps> = ({
  children,
  speedMultiplier = 1,
  className = '',

}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollSpeed, setScrollSpeed] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const speed = Math.abs(currentScrollY - lastScrollY)
      setScrollSpeed(speed)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scrollSpeed * speedMultiplier * 0.5]
  )

  return (
    <motion.div
      ref={ref}
      className={`parallax-speed ${className}`}
      style={{ x }}
    >
      {children}
    </motion.div>
  )
}

// Parallax Reveal (inspired by smooothy's reveal animations)
interface ParallaxRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  className?: string
  delay?: number
}

export const ParallaxReveal: React.FC<ParallaxRevealProps> = ({
  children,
  direction = 'up',
  distance = 50,
  className = '',
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance }
      case 'down': return { y: -distance }
      case 'left': return { x: distance }
      case 'right': return { x: -distance }
      default: return { y: distance }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`parallax-reveal ${className}`}
      initial={{ ...getInitialPosition(), opacity: 0 }}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax Background (inspired by smooothy's background effects)
interface ParallaxBackgroundProps {
  imageUrl?: string
  speed?: number
  className?: string
  overlay?: boolean
  overlayOpacity?: number
  children?: React.ReactNode
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageUrl,
  speed = 0.5,
  className = '',
  overlay = false,
  overlayOpacity = 0.3,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <div className={`parallax-background absolute inset-0 ${className}`}>
      <motion.div
        ref={ref}
        className="w-full h-full"
        style={{ y }}
      >
        {imageUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
        {overlay && (
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        )}
        {children}
      </motion.div>
    </div>
  )
}

// Parallax Grid (inspired by smooothy's grid layouts)
interface ParallaxGridProps {
  children: React.ReactNode
  columns?: number
  gap?: string
  className?: string
  staggerDelay?: number
}

export const ParallaxGrid: React.FC<ParallaxGridProps> = ({
  children,
  columns = 3,
  gap = '2rem',
  className = '',
  staggerDelay = 0.1
}) => {
  const childrenArray = React.Children.toArray(children)

  return (
    <div 
      className={`parallax-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap
      }}
    >
      {childrenArray.map((child, index) => (
        <ParallaxReveal key={index} delay={index * staggerDelay}>
          {child}
        </ParallaxReveal>
      ))}
    </div>
  )
}