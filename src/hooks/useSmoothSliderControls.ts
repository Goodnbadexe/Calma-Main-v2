import { useEffect, useCallback, useRef, useState } from 'react'

interface UseSmoothSliderControlsProps {
  totalSlides: number
  isVisible: boolean
  onNext: () => void
  onPrev: () => void
  onGoToIndex: (index: number) => void
  autoPlay?: boolean
  autoPlayDelay?: number
}

interface TouchState {
  startX: number
  startY: number
  startTime: number
  isDragging: boolean
  isScrolling: boolean
}

export function useSmoothSliderControls({
  totalSlides,
  isVisible,
  onNext,
  onPrev,
  onGoToIndex,
  autoPlay = false,
  autoPlayDelay = 5000
}: UseSmoothSliderControlsProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [touchState, setTouchState] = useState<TouchState>({
    startX: 0,
    startY: 0,
    startTime: 0,
    isDragging: false,
    isScrolling: false
  })
  
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Enhanced keyboard controls with accessibility
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isVisible) return

    // Prevent default for navigation keys
    const navigationKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End', ' ', 'Enter']
    if (navigationKeys.includes(e.key)) {
      e.preventDefault()
    }

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        onPrev()
        break
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        onNext()
        break
      case 'Home':
        onGoToIndex(0)
        break
      case 'End':
        onGoToIndex(totalSlides - 1)
        break
      case 'Enter':
        // Pause/resume autoplay
        if (autoPlay) {
          if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current)
            autoPlayRef.current = null
          } else {
            startAutoPlay()
          }
        }
        break
      default:
        // Number keys for direct navigation (0-9)
        if (/^[0-9]$/.test(e.key)) {
          const slideIndex = parseInt(e.key)
          if (slideIndex < totalSlides) {
            onGoToIndex(slideIndex)
          }
        }
    }
  }, [isVisible, onNext, onPrev, onGoToIndex, totalSlides, autoPlay])

  // Enhanced touch/mouse gesture handling
  const handlePointerDown = useCallback((e: PointerEvent) => {
    const newTouchState: TouchState = {
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      isDragging: false,
      isScrolling: false
    }
    setTouchState(newTouchState)
    setIsDragging(false)

    // Pause autoplay during interaction
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }, [])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!touchState.startTime) return

    const deltaX = Math.abs(e.clientX - touchState.startX)
    const deltaY = Math.abs(e.clientY - touchState.startY)
    const deltaTime = Date.now() - touchState.startTime

    // Determine if this is a drag or scroll gesture
    if (deltaTime > 50 && (deltaX > 10 || deltaY > 10)) {
      const newTouchState = { ...touchState }
      
      if (deltaX > deltaY && deltaX > 15) {
        // Horizontal drag - slider navigation
        newTouchState.isDragging = true
        setIsDragging(true)
      } else if (deltaY > deltaX && deltaY > 15) {
        // Vertical drag - page scroll
        newTouchState.isScrolling = true
      }
      
      setTouchState(newTouchState)
    }
  }, [touchState])

  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (!touchState.startTime) return

    const deltaX = e.clientX - touchState.startX
    const deltaTime = Date.now() - touchState.startTime
    const distance = Math.abs(deltaX)
    const velocity = distance / deltaTime

    // Only process as slider navigation if it was a horizontal drag
    if (touchState.isDragging && !touchState.isScrolling) {
      const threshold = 50
      const velocityThreshold = 0.3

      if (distance > threshold || velocity > velocityThreshold) {
        if (deltaX > 0) {
          onPrev()
        } else {
          onNext()
        }
      }
    }

    // Reset touch state
    setTouchState({
      startX: 0,
      startY: 0,
      startTime: 0,
      isDragging: false,
      isScrolling: false
    })
    setIsDragging(false)

    // Resume autoplay after interaction
    if (autoPlay && isVisible) {
      setTimeout(startAutoPlay, 1000) // Delay restart
    }
  }, [touchState, onNext, onPrev, autoPlay, isVisible])

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlay && isVisible && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        onNext()
      }, autoPlayDelay)
    }
  }, [autoPlay, isVisible, isDragging, onNext, autoPlayDelay])

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  // Focus management for accessibility
  const handleFocus = useCallback(() => {
    stopAutoPlay()
  }, [stopAutoPlay])

  const handleBlur = useCallback(() => {
    if (autoPlay && isVisible) {
      setTimeout(startAutoPlay, 2000)
    }
  }, [autoPlay, isVisible, startAutoPlay])

  // Mouse wheel support
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isVisible || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return

    e.preventDefault()
    
    if (e.deltaX > 30) {
      onNext()
    } else if (e.deltaX < -30) {
      onPrev()
    }
  }, [isVisible, onNext, onPrev])

  // Setup event listeners
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    // Keyboard events
    window.addEventListener('keydown', handleKeyDown)
    
    // Pointer events for touch and mouse
    slider.addEventListener('pointerdown', handlePointerDown)
    slider.addEventListener('pointermove', handlePointerMove)
    slider.addEventListener('pointerup', handlePointerUp)
    slider.addEventListener('pointercancel', handlePointerUp)
    
    // Focus events for accessibility
    slider.addEventListener('focus', handleFocus)
    slider.addEventListener('blur', handleBlur)
    
    // Wheel events for desktop
    slider.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      slider.removeEventListener('pointerdown', handlePointerDown)
      slider.removeEventListener('pointermove', handlePointerMove)
      slider.removeEventListener('pointerup', handlePointerUp)
      slider.removeEventListener('pointercancel', handlePointerUp)
      slider.removeEventListener('focus', handleFocus)
      slider.removeEventListener('blur', handleBlur)
      slider.removeEventListener('wheel', handleWheel)
    }
  }, [
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleFocus,
    handleBlur,
    handleWheel
  ])

  // Auto-play management
  useEffect(() => {
    if (autoPlay && isVisible && !isDragging) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }

    return stopAutoPlay
  }, [autoPlay, isVisible, isDragging, startAutoPlay, stopAutoPlay])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoPlay()
    }
  }, [stopAutoPlay])

  return {
    sliderRef,
    isDragging,
    startAutoPlay,
    stopAutoPlay
  }
}

// Accessibility announcements hook
export function useSliderAnnouncements(currentIndex: number, totalSlides: number) {
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    const slideNumber = currentIndex + 1
    const newAnnouncement = `Slide ${slideNumber} of ${totalSlides}`
    setAnnouncement(newAnnouncement)

    // Clear announcement after a delay to avoid repetition
    const timer = setTimeout(() => setAnnouncement(''), 1000)
    return () => clearTimeout(timer)
  }, [currentIndex, totalSlides])

  return announcement
}

// Performance optimization hook
export function useSliderPerformance() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Check for high contrast preference
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return {
    isReducedMotion,
    isHighContrast
  }
}
