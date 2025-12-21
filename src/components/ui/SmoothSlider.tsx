import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import anime from 'animejs'

// Core Slider Engine - Enhanced Performance Edition
class SliderCore {
  private target: number = 0
  private current: number = 0
  private speed: number = 0
  private lastSpeed: number = 0
  private deltaTime: number = 0
  private lastTime: number = 0
  private isDestroyed: boolean = false
  
  // Enhanced performance monitoring
  private frameCount: number = 0
  private lastFPSCheck: number = 0
  private currentFPS: number = 60
  private performanceMode: 'high' | 'balanced' | 'power-save' = 'high'
  
  // Advanced caching system
  private cachedProgress: number = 0
  private lastProgressUpdate: number = 0
  private progressDirty: boolean = true
  
  // Stuttering prevention
  private frameTimeHistory: number[] = []
  private averageFrameTime: number = 16.67 // 60fps baseline
  private stutterThreshold: number = 33.33 // 30fps threshold
  
  // Luxury animation curves
  private easingCurve: (t: number) => number = (t: number) => {
    // Sophisticated cubic-bezier curve for luxury feel
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }
  


  
  private config: {
    infinite: boolean
    lerpFactor: number
    dragSensitivity: number
    scrollSensitivity: number
    snapStrength: number
    speedDecay: number
    bounceLimit: number
    luxuryMode: boolean
    continuousScroll: boolean
    performanceTarget: number
  }
  
  private viewport: {
    itemWidth: number
    wrapperWidth: number
    totalWidth: number
  }
  
  private callbacks: {
    onUpdate?: (state: any) => void
    onSlideChange?: (index: number) => void
    onPerformanceChange?: (mode: string) => void
  }

  constructor(config: any = {}) {
    this.config = {
      infinite: true,
      lerpFactor: 0.12,
      dragSensitivity: 1.2,
      scrollSensitivity: 0.9,
      snapStrength: 0.75,
      speedDecay: 0.95,
      bounceLimit: 1,
      luxuryMode: true,
      continuousScroll: true,
      performanceTarget: 60,
      ...config
    }
    
    this.viewport = {
      itemWidth: 100,
      wrapperWidth: 100,
      totalWidth: 100
    }
    
    this.callbacks = {}
    
    // Initialize performance monitoring
    this.initPerformanceMonitoring()
  }
  
  private initPerformanceMonitoring() {
    // Detect device capabilities for adaptive performance
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (gl && gl instanceof WebGLRenderingContext) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        // Adjust performance mode based on GPU capabilities
        if (renderer.includes('Intel') || renderer.includes('integrated')) {
          this.performanceMode = 'balanced'
        }
      }
    }
    
    // Monitor memory usage
    if ('memory' in performance) {
      const memInfo = (performance as any).memory
      if (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize > 0.8) {
        this.performanceMode = 'power-save'
      }
    }
  }

  public init(slideCount: number) {
    this.viewport.totalWidth = slideCount * this.viewport.itemWidth
    this.lastTime = performance.now()
    
    // Initialize frame time history for stuttering detection
    this.frameTimeHistory = new Array(10).fill(16.67)
  }

  public update(time: number = performance.now()) {
    if (this.isDestroyed) return
    
    // Enhanced FPS monitoring with stuttering detection
    this.updatePerformanceMetrics(time)
    
    if (this.lastTime === 0) {
      this.lastTime = time
      return
    }
    
    // Adaptive delta time with stuttering prevention
    const rawDelta = (time - this.lastTime) / 1000
    const frameTime = time - this.lastTime
    
    // Update frame time history
    this.frameTimeHistory.push(frameTime)
    if (this.frameTimeHistory.length > 10) {
      this.frameTimeHistory.shift()
    }
    
    // Calculate average frame time for stuttering detection
    this.averageFrameTime = this.frameTimeHistory.reduce((a, b) => a + b, 0) / this.frameTimeHistory.length
    
    // Adaptive delta time based on performance mode
    let adaptiveDelta = rawDelta
    if (this.performanceMode === 'power-save') {
      adaptiveDelta = Math.min(rawDelta, 1/30) // 30fps cap
    } else if (this.performanceMode === 'balanced') {
      adaptiveDelta = Math.min(rawDelta, 1/45) // 45fps cap
    } else {
      adaptiveDelta = Math.min(rawDelta, 1/60) // 60fps cap
    }
    
    this.deltaTime = adaptiveDelta
    this.lastTime = time
    
    const diff = this.target - this.current
    const absDiff = Math.abs(diff)
    
    // Enhanced micro-movement optimization
    const microThreshold = this.performanceMode === 'high' ? 0.001 : 0.005
    
    if (absDiff > microThreshold) {
      // Luxury interpolation with stuttering prevention
      const speedFactor = Math.min(Math.abs(this.speed) / 300, 1)
      const distanceFactor = Math.min(absDiff / 50, 1)
      const combinedFactor = (speedFactor + distanceFactor) * 0.5
      
      // Performance-adaptive lerp calculation
      const targetFPS = this.config.performanceTarget
      const fpsRatio = Math.min(this.currentFPS / targetFPS, 1.5)
      
      // Stuttering compensation
      const stutterCompensation = this.averageFrameTime > this.stutterThreshold ? 0.8 : 1.0
      
      let baseLerp = this.config.lerpFactor
      
      // Luxury mode adjustments
      if (this.config.luxuryMode) {
        baseLerp *= this.easingCurve(Math.min(combinedFactor, 1))
      }
      
      const adaptiveLerp = baseLerp * (1 + combinedFactor * 0.3) * fpsRatio * stutterCompensation
      const clampedLerp = Math.min(adaptiveLerp, 0.3)
      
      // Smooth interpolation with momentum preservation
      const movement = diff * clampedLerp
      this.current += movement
      this.progressDirty = true
      
      // Enhanced speed calculation with luxury decay
      const newSpeed = movement / this.deltaTime
      const decayFactor = this.config.luxuryMode ? 0.92 : this.config.speedDecay
      this.speed = this.speed * decayFactor + newSpeed * (1 - decayFactor)
      
      // Enhanced snapping with luxury feel and adaptive behavior
      if (this.config.snapStrength > 0) {
        const slideWidth = this.viewport.itemWidth
        const baseSnapThreshold = slideWidth * this.config.snapStrength * 0.08 // Even tighter for precision
        
        // Adaptive snap threshold based on performance mode
        const performanceMultiplier = this.performanceMode === 'high' ? 1 : 
                                     this.performanceMode === 'balanced' ? 1.2 : 1.5
        const snapThreshold = baseSnapThreshold * performanceMultiplier
        
        const speedThreshold = this.config.luxuryMode ? 3 : 8 // Lower for more responsive snapping
        
        // Enhanced snap conditions with velocity consideration
        const isNearTarget = absDiff < snapThreshold
        const isSlowEnough = Math.abs(this.speed) < speedThreshold
        const isDecelerating = Math.abs(this.speed) < Math.abs(this.lastSpeed || this.speed)
        
        if (isNearTarget && (isSlowEnough || isDecelerating)) {
          // Smooth snap transition instead of instant
          const snapLerp = this.config.luxuryMode ? 0.15 : 0.25
          this.current = this.current + (this.target - this.current) * snapLerp
          this.speed *= 0.7 // Gradual speed reduction
          
          // Final snap when very close
          if (absDiff < snapThreshold * 0.1) {
            this.current = this.target
            this.speed = 0
          }
          
          this.progressDirty = true
        }
        
        // Store last speed for deceleration detection
        this.lastSpeed = this.speed
      } else {
        // Fallback precision snapping with luxury timing
        const snapThreshold = this.config.luxuryMode ? 0.5 : 1
        const speedThreshold = this.config.luxuryMode ? 5 : 10
        
        if (absDiff < snapThreshold && Math.abs(this.speed) < speedThreshold) {
          this.current = this.target
          this.speed = 0
          this.progressDirty = true
        }
      }
    } else {
      // Ultra-smooth static state handling
      if (this.current !== this.target) {
        this.current = this.target
        this.progressDirty = true
      }
      
      // Luxury speed decay
      this.speed *= this.config.luxuryMode ? 0.85 : 0.9
      
      if (Math.abs(this.speed) < 0.05) {
        this.speed = 0
      }
    }
    
    // Enhanced infinite scrolling for continuous experience
    if (this.config.infinite && this.config.continuousScroll) {
      this.handleContinuousScroll()
    }
    
    // Optimized progress calculation with luxury caching
    const progress = this.getProgress()
    
    // GPU-optimized callback execution
    if (this.callbacks.onUpdate) {
      // Batch updates for better performance
      requestAnimationFrame(() => {
        this.callbacks.onUpdate?.({
          current: this.current,
          target: this.target,
          speed: this.speed,
          progress,
          performanceMode: this.performanceMode,
          fps: this.currentFPS
        })
      })
    }
  }
  
  private handleContinuousScroll() {
    if (!this.config.infinite || !this.config.continuousScroll) return
    
    const slideWidth = this.viewport.itemWidth
    const totalWidth = this.viewport.totalWidth
    const slideCount = totalWidth / slideWidth
    
    if (slideCount <= 1) return // Prevent issues with single slide
    
    // Simplified infinite scrolling with larger buffer zones
    const bufferZone = slideWidth * 0.5 // Larger buffer to prevent getting stuck
    const centerOffset = slideWidth * Math.floor(slideCount / 2)
    
    // Forward boundary - reset to center when too far ahead
    if (this.current > centerOffset + bufferZone) {
      const resetOffset = slideWidth * slideCount
      this.current -= resetOffset
      this.target -= resetOffset
      this.progressDirty = true
      this.speed *= 0.95 // Preserve some velocity
    }
    
    // Backward boundary - reset to center when too far behind  
    else if (this.current < -centerOffset - bufferZone) {
      const resetOffset = slideWidth * slideCount
      this.current += resetOffset
      this.target += resetOffset
      this.progressDirty = true
      this.speed *= 0.95 // Preserve some velocity
    }
  }
  
  private updatePerformanceMetrics(time: number) {
    this.frameCount++
    
    if (time - this.lastFPSCheck >= 1000) {
      this.currentFPS = this.frameCount
      this.frameCount = 0
      this.lastFPSCheck = time
      
      // Adaptive performance mode switching
      if (this.currentFPS < 45 && this.performanceMode === 'high') {
        this.performanceMode = 'balanced'
        this.callbacks.onPerformanceChange?.('balanced')
      } else if (this.currentFPS < 30 && this.performanceMode === 'balanced') {
        this.performanceMode = 'power-save'
        this.callbacks.onPerformanceChange?.('power-save')
      } else if (this.currentFPS > 55 && this.performanceMode !== 'high') {
        this.performanceMode = 'high'
        this.callbacks.onPerformanceChange?.('high')
      }
    }
  }
  
  public getProgress(): number {
    // Use cached progress if not dirty and recent
    if (!this.progressDirty && (performance.now() - this.lastProgressUpdate) < 16) {
      return this.cachedProgress
    }
    
    const slideWidth = this.viewport.itemWidth
    const totalSlides = this.viewport.totalWidth / slideWidth
    const currentSlide = -this.current / slideWidth
    const progress = currentSlide / totalSlides
    
    // Cache the result
    this.cachedProgress = Math.max(0, Math.min(1, progress))
    this.lastProgressUpdate = performance.now()
    this.progressDirty = false
    
    return this.cachedProgress
  }

  // Enhanced progress tracking for luxury experience
  public getLuxuryProgress(): { 
    normalized: number, 
    percentage: number, 
    smoothed: number,
    velocity: number,
    direction: 'forward' | 'backward' | 'static'
  } {
    const baseProgress = this.getProgress()
    const velocity = Math.abs(this.speed)
    
    // Smooth progress with luxury easing
    const smoothed = this.config.luxuryMode 
      ? this.easingCurve(baseProgress)
      : baseProgress
    
    // Direction detection
    let direction: 'forward' | 'backward' | 'static' = 'static'
    if (this.speed > 0.1) direction = 'forward'
    else if (this.speed < -0.1) direction = 'backward'
    
    return {
      normalized: baseProgress,
      percentage: Math.round(baseProgress * 100),
      smoothed,
      velocity,
      direction
    }
  }

  // Continuous scroll implementation
  public enableContinuousScroll(enable: boolean = true) {
    this.config.continuousScroll = enable
    if (enable) {
      this.config.infinite = true // Continuous requires infinite
    }
  }

  // Never-ending scroll mechanics
  public setNeverEndingMode(enabled: boolean = true) {
    this.config.infinite = enabled
    this.config.continuousScroll = enabled
    
    if (enabled) {
      // Optimize for seamless transitions
      this.config.lerpFactor = 0.08 // Slightly slower for smoother feel
      this.config.snapStrength = 0.6 // Gentler snapping
    }
  }

  // Route-specific progress tracking
  public getRouteProgress(routeId: string): number {
    // This can be extended for different routes
    const baseProgress = this.getProgress()
    
    // Route-specific adjustments
    switch (routeId) {
      case 'commercial':
        return Math.min(baseProgress * 1.2, 1) // Slightly accelerated
      case 'residential':
        return baseProgress * 0.9 // Slightly decelerated for luxury feel
      default:
        return baseProgress
    }
  }
  
  public goToIndex(index: number, immediate: boolean = false) {
    const newTarget = -index * this.viewport.itemWidth
    
    if (immediate) {
      this.current = newTarget
      this.target = newTarget
      this.speed = 0
    } else {
      this.target = newTarget
    }
    
    this.progressDirty = true
    this.callbacks.onSlideChange?.(index)
  }
  
  public goToNext() {
    if (this.config.infinite && this.config.continuousScroll) {
      // Seamless infinite navigation
      const slideWidth = this.viewport.itemWidth
      this.target -= slideWidth
      this.progressDirty = true
    } else {
      const currentIndex = Math.round(-this.target / this.viewport.itemWidth)
      const slideCount = this.viewport.totalWidth / this.viewport.itemWidth
      const maxIndex = this.config.infinite ? Infinity : slideCount - 1
      const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
      this.goToIndex(nextIndex)
    }
  }
  
  public goToPrev() {
    if (this.config.infinite && this.config.continuousScroll) {
      // Seamless infinite navigation
      const slideWidth = this.viewport.itemWidth
      this.target += slideWidth
      this.progressDirty = true
    } else {
      const currentIndex = Math.round(-this.target / this.viewport.itemWidth)
      const slideCount = this.viewport.totalWidth / this.viewport.itemWidth
      const minIndex = 0
      const prevIndex = currentIndex <= minIndex ? slideCount - 1 : currentIndex - 1
      this.goToIndex(prevIndex)
    }
  }
  
  public addOffset(offset: number) {
    this.target += offset
    this.progressDirty = true
    
    // Clamp target to reasonable bounds to prevent overflow
    const maxOffset = this.viewport.totalWidth * 2
    this.target = Math.max(-maxOffset, Math.min(maxOffset, this.target))
  }
  

  
  public getCurrentIndex(): number {
    return Math.round(-this.current / this.viewport.itemWidth)
  }

  // Enhanced position tracking methods
  public getDetailedPosition(): {
    current: number
    target: number
    speed: number
    index: number
    progress: number
    slideOffset: number
    isMoving: boolean
    direction: 'forward' | 'backward' | 'static'
  } {
    const slideWidth = this.viewport.itemWidth
    const currentIndex = this.getCurrentIndex()
    const slideOffset = (-this.current % slideWidth) / slideWidth
    const progress = this.getProgress()
    
    let direction: 'forward' | 'backward' | 'static' = 'static'
    if (this.speed > 0.1) direction = 'forward'
    else if (this.speed < -0.1) direction = 'backward'
    
    return {
      current: this.current,
      target: this.target,
      speed: this.speed,
      index: currentIndex,
      progress,
      slideOffset,
      isMoving: Math.abs(this.speed) > 0.1,
      direction
    }
  }

  public getPositionMetrics(): {
    distanceToTarget: number
    timeToTarget: number
    isSnapping: boolean
    snapProgress: number
  } {
    const distanceToTarget = Math.abs(this.target - this.current)
    const timeToTarget = Math.abs(this.speed) > 0.1 ? distanceToTarget / Math.abs(this.speed) : 0
    const snapThreshold = this.viewport.itemWidth * this.config.snapStrength * 0.1
    const isSnapping = distanceToTarget < snapThreshold
    const snapProgress = isSnapping ? 1 - (distanceToTarget / snapThreshold) : 0
    
    return {
      distanceToTarget,
      timeToTarget,
      isSnapping,
      snapProgress
    }
  }
  
  public setCallbacks(callbacks: { onUpdate?: any; onSlideChange?: any; onPositionChange?: any }) {
    this.callbacks = callbacks
  }
  
  public destroy() {
    this.isDestroyed = true
    this.callbacks = {}
    
    // Clear performance monitoring
    this.frameCount = 0
    this.currentFPS = 60
    this.lastFPSCheck = 0
    
    // Clear cache
    this.cachedProgress = 0
    this.lastProgressUpdate = 0
    this.progressDirty = true
  }
  
  // Performance getter for debugging
  public getPerformanceInfo() {
    return {
      fps: this.currentFPS,
      deltaTime: this.deltaTime,
      speed: this.speed,
      isMoving: Math.abs(this.speed) > 0.1
    }
  }
  
  // Getters and setters for external access
  get currentPosition() { return this.current }
  get targetPosition() { return this.target }
  get currentSpeed() { return this.speed }
  
  set targetPosition(value: number) { this.target = value }
  set currentPosition(value: number) { this.current = value }
}

interface SlideData {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  parallaxElements?: Array<{
    content: string
    speed: number
    position: { x: number; y: number }
    scale?: number
    rotation?: number
  }>
}

interface SmoothSliderProps {
  slides: SlideData[]
  infinite?: boolean
  autoPlay?: boolean
  autoPlayDelay?: number
  dragSensitivity?: number
  lerpFactor?: number
  snapStrength?: number
  speedDecay?: number
  scrollSensitivity?: number
  showControls?: boolean
  showDots?: boolean
  parallax?: boolean
  className?: string
}

export default function SmoothSlider({
  slides,
  infinite = false, // Disable infinite by default to prevent stuck issues
  autoPlay = false,
  autoPlayDelay = 5000,
  dragSensitivity = 1.0, // Reduced sensitivity
  lerpFactor = 0.12, // Increased for more responsive movement
  snapStrength = 0.85, // Increased for better snapping
  speedDecay = 0.92, // Adjusted for better control
  scrollSensitivity = 0.7, // Reduced to prevent conflicts
  showControls = true,
  showDots = true,
  parallax = true,
  className = ''
}: SmoothSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  
  // Route detection for progress tracking
  const currentRoute = useMemo(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.includes('commercial')) return 'commercial'
      if (path.includes('residential')) return 'residential'
    }
    return 'default'
  }, [])
  
  // Performance monitoring
  const [performanceMode, setPerformanceMode] = useState<'high' | 'balanced' | 'power-save'>('high')
  const [currentFPS, setCurrentFPS] = useState(60)
  const [statusText, setStatusText] = useState("READY")
  
  // Refs
  const sliderRef = useRef<HTMLDivElement>(null)
  const sliderCore = useRef<SliderCore | null>(null)
  const momentumDecay = useRef<number | null>(null)
  
  // Anime.js refs for enhanced animations
  const containerRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  // Motion values synchronized with SliderCore
  const current = useMotionValue(0)
  const target = useMotionValue(0)
  const speed = useMotionValue(0)
  const progress = useMotionValue(0)
  
  // Initialize SliderCore
  useEffect(() => {
    if (!sliderCore.current) {
      sliderCore.current = new SliderCore({
        infinite,
        lerpFactor,
        dragSensitivity,
        scrollSensitivity,
        snapStrength,
        speedDecay
      })
      
      // Set up callbacks
      sliderCore.current.setCallbacks({
        onUpdate: (state: any) => {
          current.set(state.current)
          target.set(state.target)
          speed.set(state.speed)
          progress.set(state.progress)
        },
        onSlideChange: (index: number) => {
          setCurrentIndex(index)
        }
      })
      
      sliderCore.current.init(slides.length)
    }
    
    return () => {
      sliderCore.current?.destroy()
    }
  }, [slides.length, infinite, lerpFactor, dragSensitivity, scrollSensitivity, snapStrength, speedDecay])

  // Update status text based on speed
  useEffect(() => {
    const unsubscribe = speed.on("change", (s) => {
      if (Math.abs(s) < 5) {
        setStatusText("READY")
      } else if (s > 0) {
        setStatusText("MOVING RIGHT →")
      } else {
        setStatusText("← MOVING LEFT")
      }
    })
    
    return unsubscribe
  }, [speed])

  // Anime.js initialization effects
  useEffect(() => {
    if (!containerRef.current || !anime) return

    // Luxury entrance animation for the entire slider
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 1200,
      easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
      delay: 300
    })

    // Animate controls entrance
    if (controlsRef.current && anime) {
      const controlButtons = controlsRef.current.querySelectorAll('button');
      if (controlButtons.length > 0) {
        anime({
          targets: controlButtons,
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.8, 1],
          duration: 800,
          easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
          delay: (_el: Element, i: number) => 600 + (i * 100)
        })
      }
    }

    // Animate progress bar entrance
    if (progressRef.current && anime) {
      anime({
        targets: progressRef.current,
        opacity: [0, 1],
        scaleX: [0, 1],
        duration: 1000,
        easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
        delay: 800
      })
    }
  }, [])

  // Anime.js slide change animations
  useEffect(() => {
    if (slidesRef.current && anime) {
      const slides = slidesRef.current.children
      if (slides.length > 0 && slides[currentIndex]) {
        // Animate slide transitions with luxury easing
        anime({
          targets: slides[currentIndex],
          opacity: [0.7, 1],
          scale: [0.98, 1],
          duration: 600,
          easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)'
        })
      }

      // Animate dots to reflect current slide
      if (dotsRef.current && anime) {
        const dots = dotsRef.current.querySelectorAll('button')
        if (dots.length > 0) {
          dots.forEach((dot, index) => {
            anime({
              targets: dot,
              scale: index === currentIndex ? [1, 1.2] : [1.2, 1],
              rotate: index === currentIndex ? [0, 45] : [45, 0],
              duration: 300,
              easing: 'cubicBezier(0.34, 1.56, 0.64, 1)'
            })
          })
        }
      }
    }
  }, [currentIndex])
  

  
  // Create infinite slides array for seamless looping (Smooothy-inspired)
  const infiniteSlides = useMemo(() => {
    if (!infinite) return slides
    
    // Enhanced infinite slide generation for smoother transitions
    const slideCount = slides.length
    const bufferMultiplier = Math.max(3, Math.ceil(10 / slideCount)) // Adaptive buffer
    
    // Create extended array with proper indexing for seamless loops
    const extendedSlides: any[] = []
    for (let i = 0; i < bufferMultiplier; i++) {
      slides.forEach((slide, index) => {
        extendedSlides.push({
          ...slide,
          id: `${slide.id}-loop-${i}-${index}`, // Unique ID for each instance
          originalIndex: index,
          loopIndex: i
        })
      })
    }
    
    return extendedSlides
  }, [slides, infinite])
  
  // Enhanced Transform values for advanced parallax effects (Smooothy-inspired)
  const x = useTransform(current, (value) => value)
  
  // Multi-layer parallax backgrounds with different speeds
  const backgroundX = useTransform(current, (value) => value * 0.2) // Slower background
  const midgroundX = useTransform(current, (value) => value * 0.5) // Medium layer
  const foregroundX = useTransform(current, (value) => value * 0.8) // Faster foreground
  
  // Enhanced content animations with smooth transitions
  const contentOpacity = useTransform(current, (value) => {
    const slideWidth = 100
    const slideOffset = Math.abs(value % slideWidth)
    const fadeDistance = 30 // Smoother fade transition
    return Math.max(0.1, 1 - Math.pow(slideOffset / fadeDistance, 2))
  })
  
  const contentScale = useTransform(current, (value) => {
    const slideWidth = 100
    const slideOffset = Math.abs(value % slideWidth)
    const scaleDistance = 150 // More subtle scaling
    return Math.max(0.85, 1 - Math.pow(slideOffset / scaleDistance, 1.5))
  })
  
  // Advanced speed-based parallax effects
  const speedBasedRotation = useTransform(speed, [-100, 0, 100], [-1.5, 0, 1.5])
  const speedBasedBlur = useTransform(speed, (value) => Math.min(Math.abs(value) / 25, 8))
  const speedBasedSkew = useTransform(speed, [-100, 0, 100], [-0.5, 0, 0.5])
  
  // Depth-based parallax for layered elements
  const parallaxDepth1 = useTransform(current, (value) => value * 0.1) // Far background
  const parallaxDepth2 = useTransform(current, (value) => value * 0.3) // Mid background  
  const parallaxDepth3 = useTransform(current, (value) => value * 0.6) // Near background
  const parallaxDepth4 = useTransform(current, (value) => value * 0.9) // Foreground elements
  
  // Enhanced Progress Bar with luxury animations and route-specific tracking
  const progressTransform = useTransform(current, (value) => {
    const slideWidth = 100
    const currentPos = -value
    let progressValue = (currentPos / slideWidth / slides.length) * 100
    
    // Route-specific progress adjustments
    if (sliderCore.current) {
      const routeProgress = sliderCore.current.getRouteProgress(currentRoute)
      progressValue = routeProgress * 100
    }
    
    const clampedProgress = Math.max(0, Math.min(100, progressValue))
    
    // Add velocity-based smoothing for ultra-luxury feel
    const currentSpeed = speed.get()
    const velocityFactor = Math.min(Math.abs(currentSpeed) / 100, 1)
    const smoothingOffset = velocityFactor * 2 // Subtle lead/lag effect
    
    const finalProgress = currentSpeed > 0 
      ? clampedProgress + smoothingOffset
      : clampedProgress - smoothingOffset
    
    return Math.max(0, Math.min(finalProgress, 100))
  })
  
  // Enhanced animation loop with position tracking and synchronization
  useAnimationFrame((time: number) => {
    if (!isVisible || !sliderCore.current) return
    
    try {
      sliderCore.current.update(time)
      
      // Enhanced real-time position synchronization
      const coreState = sliderCore.current
      const currentPos = coreState.currentPosition
      const targetPos = coreState.targetPosition
      const currentSpd = coreState.currentSpeed
      
      // Smooth motion value updates with interpolation
      current.set(currentPos)
      target.set(targetPos)
      speed.set(currentSpd)
      
      // Enhanced progress tracking with luxury smoothing
      const luxuryProgress = sliderCore.current.getLuxuryProgress()
      progress.set(luxuryProgress.percentage)
      
      // Real-time position-based index tracking with accuracy
      const slideWidth = 100
      const calculatedIndex = Math.round(-currentPos / slideWidth)
      
      // Enhanced index bounds checking for infinite and finite scroll
      let realIndex: number
      if (infinite) {
        // For infinite scroll, map to actual slide index with proper wrapping
        const totalSlides = slides.length
        realIndex = ((calculatedIndex % totalSlides) + totalSlides) % totalSlides
      } else {
        // For finite scroll, clamp to bounds with precision
        realIndex = Math.max(0, Math.min(calculatedIndex, slides.length - 1))
      }
      
      // Update current index only when it actually changes (prevents unnecessary re-renders)
      setCurrentIndex(prevIndex => {
        if (prevIndex !== realIndex) {
          // Trigger slide change callback for external components
          sliderCore.current?.setCallbacks({
            onSlideChange: (_index: number) => {
              // Enhanced position tracking callback
              if (typeof window !== 'undefined') {
                // Dispatch custom event for external position tracking
                window.dispatchEvent(new CustomEvent('sliderPositionChange', {
                  detail: { 
                    index: realIndex, 
                    position: currentPos,
                    progress: luxuryProgress.percentage,
                    velocity: currentSpd
                  }
                }))
              }
            }
          })
          return realIndex
        }
        return prevIndex
      })
      
      // Performance monitoring with adaptive adjustments
      const perfInfo = sliderCore.current.getPerformanceInfo()
      if (perfInfo.fps !== currentFPS) {
        setCurrentFPS(perfInfo.fps)
        
        // Adaptive performance mode based on FPS with hysteresis
        if (perfInfo.fps < 25 && performanceMode !== 'power-save') {
          setPerformanceMode('power-save')
        } else if (perfInfo.fps < 40 && performanceMode === 'high') {
          setPerformanceMode('balanced')
        } else if (perfInfo.fps > 55 && performanceMode !== 'high') {
          setPerformanceMode('high')
        }
      }
      
    } catch (error) {
      console.warn('SliderCore update error:', error)
    }
  })
  
  // Navigation functions using SliderCore
  const goToIndex = useCallback((index: number, immediate = false) => {
    if (!sliderCore.current) return
    sliderCore.current.goToIndex(index, immediate)
  }, [])
  
  const goToNext = useCallback(() => {
    if (!sliderCore.current) return
    sliderCore.current.goToNext()
  }, [])
  
  const goToPrev = useCallback(() => {
    if (!sliderCore.current) return
    sliderCore.current.goToPrev()
  }, [])
  
  // Enhanced differential navigation with SliderCore
  const handleQuickNavigation = useCallback((direction: 'next' | 'prev', intensity: number = 0.5) => {
    if (!sliderCore.current) return
    
    const movement = 25 * intensity // Base movement percentage
    const offset = direction === 'next' ? -movement : movement
    sliderCore.current.addOffset(offset)
  }, [])
  
  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || !isVisible || isDragging) return
    
    const interval = setInterval(goToNext, autoPlayDelay)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayDelay, isVisible, isDragging])
  
  // Enhanced snap to nearest slide with precision (Smooothy-inspired)
  useEffect(() => {
    if (!isDragging && sliderCore.current) {
      const slideWidth = 100
      const currentPos = current.get()
      const currentSpeed = speed.get()
      
      // Adaptive snap behavior based on velocity and position
      const velocityThreshold = 15 // Minimum velocity for momentum-based snapping
      const snapSensitivity = 0.3 // How much of slide width triggers snap to next
      
      let targetSlide: number
      
      if (Math.abs(currentSpeed) > velocityThreshold) {
        // Velocity-based snapping - snap in direction of movement
        const currentSlide = -currentPos / slideWidth
        const direction = currentSpeed > 0 ? 1 : -1
        targetSlide = Math.floor(currentSlide) + (direction > 0 ? 1 : 0)
      } else {
        // Position-based snapping with sensitivity
        const currentSlide = -currentPos / slideWidth
        const slideProgress = currentSlide % 1
        
        if (slideProgress > snapSensitivity && slideProgress < (1 - snapSensitivity)) {
          // In the middle zone - snap to nearest
          targetSlide = Math.round(currentSlide)
        } else {
          // Near edges - use threshold-based snapping
          targetSlide = slideProgress > 0.5 ? Math.ceil(currentSlide) : Math.floor(currentSlide)
        }
      }
      
      // Apply snap with smooth transition
      // Use SliderCore for smooth snapping
      sliderCore.current.goToIndex(Math.abs(targetSlide), false)
      
      // Update current index with proper bounds
      const boundedIndex = infinite 
        ? ((targetSlide % slides.length) + slides.length) % slides.length
        : Math.max(0, Math.min(targetSlide, slides.length - 1))
      
      setCurrentIndex(boundedIndex)
    }
  }, [isDragging, slides.length, infinite])
  
  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    if (sliderRef.current) {
      observer.observe(sliderRef.current)
    }
    
    return () => observer.disconnect()
  }, [slides.length])

  // Smooothy-inspired precise control methods
  const scrollTo = useCallback((index: number, smooth: boolean = true) => {
    if (!sliderCore.current || index < 0 || index >= slides.length) return
    
    if (smooth) {
      sliderCore.current.goToIndex(index, false)
    } else {
      sliderCore.current.goToIndex(index, true)
    }
  }, [slides.length])

  const scrollBy = useCallback((delta: number) => {
    if (!sliderCore.current) return
    
    const currentIndex = sliderCore.current.getCurrentIndex()
    const targetIndex = Math.max(0, Math.min(currentIndex + delta, slides.length - 1))
    scrollTo(targetIndex)
  }, [scrollTo, slides.length])

  const scrollToNext = useCallback(() => scrollBy(1), [scrollBy])
  const scrollToPrev = useCallback(() => scrollBy(-1), [scrollBy])

  // Enhanced keyboard navigation with Smooothy-inspired controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isVisible) return
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          scrollToPrev()
          break
        case 'ArrowRight':
          event.preventDefault()
          scrollToNext()
          break
        case 'Home':
          event.preventDefault()
          scrollTo(0)
          break
        case 'End':
          event.preventDefault()
          scrollTo(slides.length - 1)
          break
        case ' ': // Spacebar for next slide
          event.preventDefault()
          scrollToNext()
          break
        // Number keys for direct navigation
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          event.preventDefault()
          const index = parseInt(event.key) - 1
          if (index < slides.length) {
            scrollTo(index)
          }
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, slides.length, scrollTo, scrollToNext, scrollToPrev])



  // Remove window globals; consumers should use component refs/props instead

  // Simplified and precise wheel handling (Smooothy-inspired)
  useEffect(() => {
    let wheelTimeout: number | null = null
    let wheelDelta = 0
    
    const handleWheel = (event: WheelEvent) => {
      if (!isVisible || isDragging) return
      
      // Only handle wheel events when directly over the slider
      const rect = sliderRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const isOverSlider = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      )
      
      if (!isOverSlider) return
      
      // Detect horizontal scroll intent
      const isHorizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      
      if (isHorizontalScroll) {
        event.preventDefault()
        
        // Accumulate horizontal wheel delta
        wheelDelta += event.deltaX
        
        // Clear existing timeout
        if (wheelTimeout) {
          clearTimeout(wheelTimeout)
        }
        
        // Set new timeout for wheel end detection
        wheelTimeout = window.setTimeout(() => {
          // Determine direction and navigate
          if (Math.abs(wheelDelta) > 50) { // Threshold for navigation
            if (wheelDelta > 0) {
              scrollToNext()
            } else {
              scrollToPrev()
            }
          }
          wheelDelta = 0
        }, 150) // Wait for wheel end
      } else {
        // Vertical scroll - accumulate for slide navigation
        wheelDelta += event.deltaY
        
        // Clear existing timeout
        if (wheelTimeout) {
          clearTimeout(wheelTimeout)
        }
        
        // Set new timeout for wheel end detection
        wheelTimeout = window.setTimeout(() => {
          // Determine direction and navigate
          if (Math.abs(wheelDelta) > 100) { // Higher threshold for vertical
            if (wheelDelta > 0) {
              scrollToNext()
            } else {
              scrollToPrev()
            }
          }
          wheelDelta = 0
        }, 200) // Longer wait for vertical scroll
      }
    }
    
    // Enhanced touch handling for mobile devices
    let touchStartY = 0
    let touchStartX = 0
    let touchStartTime = 0
    let touchMomentum = 0
    
    const handleTouchStart = (event: TouchEvent) => {
      if (!isVisible) return
      
      const touch = event.touches[0]
      touchStartY = touch.clientY
      touchStartX = touch.clientX
      touchStartTime = Date.now()
      touchMomentum = 0
    }
    
    const handleTouchMove = (event: TouchEvent) => {
      if (!isVisible || !sliderCore.current) return
      
      const touch = event.touches[0]
      const deltaY = touch.clientY - touchStartY
      const deltaX = touch.clientX - touchStartX
      const now = Date.now()
      
      // Determine if this is a horizontal or vertical gesture
      const isHorizontalGesture = Math.abs(deltaX) > Math.abs(deltaY) * 1.5
      
      if (isHorizontalGesture) {
        event.preventDefault()
        
        // Calculate touch momentum
        const timeDelta = now - touchStartTime
        touchMomentum = Math.abs(deltaX) / Math.max(timeDelta, 1)
        
        // Apply virtual scroll with touch sensitivity
        const virtualOffset = deltaX * 0.2
        sliderCore.current.addOffset(virtualOffset)
      }
    }
    
    const handleTouchEnd = (event: TouchEvent) => {
      if (!isVisible) return
      
      const touch = event.changedTouches[0]
      const deltaX = touch.clientX - touchStartX
      const deltaY = touch.clientY - touchStartY
      const isHorizontalGesture = Math.abs(deltaX) > Math.abs(deltaY) * 1.5
      
      if (isHorizontalGesture && Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? 'prev' : 'next'
        const intensity = Math.min(touchMomentum / 3, 1)
        
        if (touchMomentum > 2) {
          // High momentum touch - quick navigation
          handleQuickNavigation(direction, intensity * 0.8)
        } else {
          // Normal touch navigation
          direction === 'next' ? goToNext() : goToPrev()
        }
      }
    }
    
    const sliderElement = sliderRef.current
    if (sliderElement) {
      // Wheel events
      sliderElement.addEventListener('wheel', handleWheel, { passive: false })
      
      // Touch events
      sliderElement.addEventListener('touchstart', handleTouchStart, { passive: true })
      sliderElement.addEventListener('touchmove', handleTouchMove, { passive: false })
      sliderElement.addEventListener('touchend', handleTouchEnd, { passive: true })
      
      return () => {
        sliderElement.removeEventListener('wheel', handleWheel)
        sliderElement.removeEventListener('touchstart', handleTouchStart)
        sliderElement.removeEventListener('touchmove', handleTouchMove)
        sliderElement.removeEventListener('touchend', handleTouchEnd)
        
        if (momentumDecay.current) {
          clearTimeout(momentumDecay.current)
        }
      }
    }
  }, [isVisible, isDragging])
  
  return (
    <div 
      ref={(el) => {
        sliderRef.current = el
        containerRef.current = el
      }}
      className={`relative w-full h-screen overflow-hidden bg-black ${className}`}
      role="region"
      aria-label="Image slider"
      aria-live="polite"
    >
      {/* Main slider container */}
      <motion.div
        ref={slidesRef}
        className="flex h-full cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -slides.length * 100 + 100, right: 0 }}
        dragElastic={0.02} // Even more subtle elastic effect
        dragMomentum={false}
        dragTransition={{
          bounceStiffness: 200, // Softer bounce
          bounceDamping: 40, // More damping for smoother feel
          power: 0.2, // Reduced power for gentler transitions
          timeConstant: 750 // Longer time constant for smoother motion
        }}
        onDragStart={(_event, _info) => {
          setIsDragging(true)
          // Prevent text selection during drag
          document.body.style.userSelect = 'none'
          
          // Enable free-roam mode during drag
          if (sliderCore.current) {
            sliderCore.current.enableContinuousScroll(true)
          }
        }}
        onDrag={(_event, info) => {
          // Enhanced free-roam drag with luxury smoothing
          const dragOffset = info.offset.x
          const dampedOffset = dragOffset * 0.3 // Even gentler for luxury feel
          
          // Direct manipulation for free-roam experience
          if (sliderCore.current) {
            const luxuryOffset = dampedOffset * 0.8
            sliderCore.current.addOffset(luxuryOffset)
          }
        }}
        onDragEnd={(_event, info) => {
          setIsDragging(false)
          // Restore text selection
          document.body.style.userSelect = ''
          
          // Calculate final momentum with luxury smoothing
          const dragDistance = info.offset.x
          const dragVelocity = info.velocity.x
          
          // Luxury momentum thresholds
          const luxuryMomentumThreshold = 300 // Lower for more responsive luxury feel
          const maxMomentumIntensity = 2.5 // Capped for smooth transitions
          
          if (Math.abs(dragVelocity) > luxuryMomentumThreshold) {
            const direction = dragVelocity > 0 ? 'prev' : 'next'
            const intensity = Math.min(Math.abs(dragVelocity) / 800, maxMomentumIntensity)
            
            // Never-ending scroll with momentum
            handleQuickNavigation(direction, intensity * 0.6)
          } else if (Math.abs(dragDistance) > 50) {
            // Standard navigation for significant drags
            if (dragDistance > 0) {
              goToPrev()
            } else {
              goToNext()
            }
          }
          
          // Maintain continuous scroll after drag
          if (sliderCore.current) {
            sliderCore.current.setNeverEndingMode(true)
          }
        }}
      >
        <AnimatePresence mode="wait">
          {infiniteSlides.map((slide, index) => {
            const slideOffset = index - currentIndex
            
            return (
              <motion.div
                key={`${slide.id}-${index}`}
                className="relative flex-shrink-0 w-full h-full"
                style={{
                  opacity: contentOpacity,
                  scale: contentScale,
                  rotateY: speedBasedRotation,
                  filter: useTransform(speedBasedBlur, (blur) => `blur(${blur}px)`)
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Multi-layer background with enhanced parallax */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    x: backgroundX,
                    scale: 1.15,
                    filter: useTransform(speedBasedBlur, (blur) => `blur(${blur * 0.3}px)`)
                  }}
                />
                
                {/* Parallax background overlay for depth */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"
                  style={{
                    x: midgroundX,
                    opacity: useTransform(speed, (value) => 0.3 + Math.abs(value) / 500)
                  }}
                />
                
                {/* Enhanced parallax elements with proper data mapping */}
                {parallax && slide.parallaxElements?.map((element: any, elemIndex: number) => {
                  // Map old data structure to new structure
                  const elementData = {
                    id: element.id || `element-${elemIndex}`,
                    content: element.content,
                    x: element.position?.x || element.x || 50,
                    y: element.position?.y || element.y || 50,
                    scale: element.scale || 1,
                    rotation: element.rotation || 0,
                    speed: element.speed || 0.5
                  }
                  
                  // Determine parallax depth based on speed
                  const getParallaxTransform = (speed: number) => {
                    if (speed < 0.3) return parallaxDepth1
                    if (speed < 0.5) return parallaxDepth2  
                    if (speed < 0.7) return parallaxDepth3
                    return parallaxDepth4
                  }
                  
                  return (
                    <motion.div
                      key={`${slide.id}-${index}-${elementData.id}-${elemIndex}`}
                      className="absolute text-white/15 text-6xl md:text-8xl font-bold pointer-events-none select-none"
                      style={{
                        left: `${elementData.x}%`,
                        top: `${elementData.y}%`,
                        x: useTransform(getParallaxTransform(elementData.speed), (value) => 
                          slideOffset * 80 * elementData.speed + value
                        ),
                        y: useTransform(speed, (value) => value * elementData.speed * 0.3),
                        opacity: useTransform(current, () => {
                          const distance = Math.abs(slideOffset)
                          return Math.max(0, (0.4 - distance * 0.15) * (1 + elementData.speed * 0.3))
                        }),
                        scale: useTransform(current, () => {
                          const distance = Math.abs(slideOffset)
                          return elementData.scale * (1 - distance * 0.1)
                        }),
                        rotate: useTransform(speed, (value) => 
                          elementData.rotation + value * elementData.speed * 0.1
                        ),
                        skewX: speedBasedSkew,
                        filter: useTransform(speedBasedBlur, (blur) => 
                          `blur(${blur * elementData.speed * 0.2}px)`
                        )
                      }}
                    >
                      {elementData.content}
                    </motion.div>
                  )
                })}
                
                {/* Content with enhanced parallax */}
                <div className="absolute inset-0 flex items-end justify-start p-12">
                  <motion.div
                    className="text-white max-w-2xl"
                    style={{
                      x: useTransform(foregroundX, (value) => slideOffset * 40 + value * 0.1),
                      opacity: contentOpacity,
                      scale: contentScale
                    }}
                  >
                    <motion.h1
                      className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-2xl"
                      style={{
                        y: useTransform(current, () => slideOffset * 25),
                        x: useTransform(parallaxDepth4, (value) => value * 0.1)
                      }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.h2
                      className="text-lg md:text-xl mb-4 opacity-90 drop-shadow-lg"
                      style={{
                        y: useTransform(current, () => slideOffset * 15),
                        x: useTransform(parallaxDepth3, (value) => value * 0.1)
                      }}
                    >
                      {slide.subtitle}
                    </motion.h2>
                    <motion.p
                      className="text-sm md:text-base opacity-80 drop-shadow-md max-w-lg"
                      style={{
                        y: useTransform(current, () => slideOffset * 8),
                        x: useTransform(parallaxDepth2, (value) => value * 0.1)
                      }}
                    >
                      {slide.description}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
      
      {/* Consolidated Navigation Controls */}
      {showControls && (
        <>
          <div ref={controlsRef} className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {/* Primary navigation button */}
            <button
              onClick={goToPrev}
              className="p-4 bg-white/30 hover:bg-white/50 active:bg-white/70 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-110 active:scale-95 shadow-lg border border-white/20 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white drop-shadow-sm group-hover:scale-110 transition-transform" />
            </button>
            
            {/* Micro-navigation hint */}
            <button
              onClick={() => handleQuickNavigation('prev', 0.3)}
              className="p-2 bg-white/20 hover:bg-white/35 rounded-full transition-all duration-200 backdrop-blur-sm opacity-60 hover:opacity-100 scale-75 hover:scale-90"
              aria-label="Previous (fine control)"
              title="Fine control - small step backward"
            >
              <ChevronLeft className="w-3 h-3 text-white" />
            </button>
          </div>
          
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {/* Primary navigation button */}
            <button
              onClick={goToNext}
              className="p-4 bg-white/30 hover:bg-white/50 active:bg-white/70 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-110 active:scale-95 shadow-lg border border-white/20 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white drop-shadow-sm group-hover:scale-110 transition-transform" />
            </button>
            
            {/* Micro-navigation hint */}
            <button
              onClick={() => handleQuickNavigation('next', 0.3)}
              className="p-2 bg-white/20 hover:bg-white/35 rounded-full transition-all duration-200 backdrop-blur-sm opacity-60 hover:opacity-100 scale-75 hover:scale-90"
              aria-label="Next (fine control)"
              title="Fine control - small step forward"
            >
              <ChevronRight className="w-3 h-3 text-white" />
            </button>
          </div>
        </>
      )}
      
      {/* Enhanced Visual Elements */}
      
      {/* Interactive Square Indicators */}
      {showDots && (
        <div ref={dotsRef} className="absolute bottom-32 left-1/2 -translate-x-1/2 flex space-x-4">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToIndex(index)}
              className={`relative w-4 h-4 transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              style={{
                borderRadius: '2px',
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
              }}
              whileHover={{ scale: 1.3, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Active indicator glow */}
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ filter: 'blur(4px)' }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
      
      {/* Performance & Route Indicator */}
      <motion.div 
        className="absolute top-8 right-8 flex flex-col items-end space-y-2"
        style={{
          opacity: useTransform(speed, (s) => Math.min(Math.abs(s) / 100, 1))
        }}
      >
        {/* Route indicator */}
        <div className="text-white/60 text-xs font-mono uppercase">
          {currentRoute} MODE
        </div>
        
        {/* Performance mode indicator */}
        <div className={`text-xs font-mono px-2 py-1 rounded ${
          performanceMode === 'high' ? 'bg-green-500/20 text-green-300' :
          performanceMode === 'balanced' ? 'bg-yellow-500/20 text-yellow-300' :
          'bg-red-500/20 text-red-300'
        }`}>
          {performanceMode.toUpperCase()}
        </div>
        
        {/* Velocity indicator */}
        <div className="flex items-center space-x-2">
          <div className="text-white/80 text-sm font-mono">
            VELOCITY
          </div>
          <motion.div 
            className="w-16 h-2 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, rgba(255,255,255,0.85), rgba(197,164,109,0.9))',
                scaleX: useTransform(speed, (s) => Math.min(Math.abs(s) / 200, 1)),
                transformOrigin: "left"
              }}
            />
          </motion.div>
        </div>
        
        {/* FPS counter */}
        <div className="text-white/40 text-xs font-mono">
          {currentFPS} FPS
        </div>
      </motion.div>
      
      {/* Interaction Feedback Squares */}
      <motion.div 
        className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col space-y-2"
        style={{
          opacity: useTransform(current, (c) => {
            const movement = Math.abs(c % 100)
            return Math.min(movement / 20, 1)
          })
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white/60 rounded-sm"
            style={{
              scale: useTransform(speed, (s) => 1 + Math.abs(s) / 500),
              rotate: useTransform(current, (c) => c * 0.1 * (i + 1))
            }}
          />
        ))}
      </motion.div>
      
      {/* Luxury Enhanced Progress Bar with Segments */}
      <div ref={progressRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 w-96 h-2.5 bg-white/15 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
        {/* Segment indicators */}
        <div className="absolute inset-0 flex">
          {slides.map((_, index) => (
            <div
              key={index}
              className="flex-1 border-r border-white/20 last:border-r-0"
              style={{ height: '100%' }}
            />
          ))}
        </div>
        
        {/* Main progress with luxury gradient */}
        <motion.div
          className="h-full rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.85), rgba(212,180,131,0.9))',
            scaleX: useTransform(progressTransform, (p) => Math.max(0, Math.min(1, p / 100))),
            transformOrigin: "left"
          }}
        />
        
        {/* Luxury glow effect */}
        <motion.div
          className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
          style={{
            width: '25%',
            left: useTransform(progressTransform, (p) => `${Math.max(0, Math.min(75, p * 0.75))}%`)
          }}
        />
        
        {/* Enhanced position indicator */}
        <motion.div
          className="absolute top-0 w-1.5 h-full bg-white shadow-xl rounded-full"
          style={{
            left: useTransform(progressTransform, (p) => `${Math.max(0, Math.min(100, p))}%`),
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))'
          }}
        />
      </div>
      
      {/* Touch/Drag Visual Feedback */}
      <motion.div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono"
        style={{
          opacity: useTransform(speed, (s) => Math.abs(s) > 10 ? 1 : 0.3)
        }}
      >
        {statusText}
      </motion.div>
    </div>
  )
}
