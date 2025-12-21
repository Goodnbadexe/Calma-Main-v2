import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface ParallaxElement {
  content: string
  speed: number
  position: { x: number; y: number }
  className?: string
}

interface ParallaxSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  parallaxElements: ParallaxElement[]
}

interface ParallaxSliderProps {
  slides: ParallaxSlide[]
  autoPlay?: boolean
  autoPlayDelay?: number
  infinite?: boolean
  showControls?: boolean
  showDots?: boolean
  className?: string
}

const ParallaxSlider: React.FC<ParallaxSliderProps> = ({
  slides,
  autoPlay = true,
  autoPlayDelay = 5000,
  infinite = true,
  showControls = true,
  showDots = true,
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const sliderRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  
  // Parallax transforms based on smooothy patterns
  const parallaxY = useTransform(x, [-100, 100], [-20, 20])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (isPlaying && autoPlay) {
      interval = setInterval(() => {
        setCurrentSlide(prev => infinite ? (prev + 1) % slides.length : Math.min(prev + 1, slides.length - 1))
      }, autoPlayDelay)
    }
    return () => { if (interval) clearInterval(interval) }
  }, [isPlaying, autoPlay, autoPlayDelay, slides.length, infinite])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(autoPlay), 1000)
  }

  const nextSlide = () => {
    setCurrentSlide(prev => infinite ? (prev + 1) % slides.length : Math.min(prev + 1, slides.length - 1))
  }

  const prevSlide = () => {
    setCurrentSlide(prev => infinite ? (prev - 1 + slides.length) % slides.length : Math.max(prev - 1, 0))
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`} ref={sliderRef}>
      {/* Main slider container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
              zIndex: index === currentSlide ? 10 : 1
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Background image with parallax */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                y: index === currentSlide ? parallaxY : 0
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Parallax elements inspired by smooothy */}
            {slide.parallaxElements.map((element, elementIndex) => (
              <motion.div
                key={`${slide.id}-${elementIndex}`}
                className={`absolute text-white font-bold tracking-wider opacity-20 select-none pointer-events-none ${element.className || ''}`}
                style={{
                  left: `${element.position.x}%`,
                  top: `${element.position.y}%`,
                  fontSize: 'clamp(2rem, 8vw, 12rem)',
                  fontFamily: 'Bluteau Arabic Sans, sans-serif',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  x: index === currentSlide ? element.speed * 20 : 0,
                  y: index === currentSlide ? Math.sin(element.speed * 1.5) * 10 : 0,
                  rotate: index === currentSlide ? element.speed * 2 : 0,
                  opacity: index === currentSlide ? 0.15 : 0
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: elementIndex * 0.1
                }}
              >
                {element.content}
              </motion.div>
            ))}
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-8">
                <motion.h3
                  className="text-lg md:text-xl font-light mb-4 tracking-wide opacity-80"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{
                    y: index === currentSlide ? 0 : 30,
                    opacity: index === currentSlide ? 0.8 : 0
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ fontFamily: 'Bluteau Arabic Sans' }}
                >
                  {slide.subtitle}
                </motion.h3>
                
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{
                    y: index === currentSlide ? 0 : 50,
                    opacity: index === currentSlide ? 1 : 0
                  }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ fontFamily: 'Bluteau Arabic Sans' }}
                >
                  {slide.title}
                </motion.h2>
                
                <motion.p
                  className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-90"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{
                    y: index === currentSlide ? 0 : 30,
                    opacity: index === currentSlide ? 0.9 : 0
                  }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {slide.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation controls */}
      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
          >
            <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
          >
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

export default ParallaxSlider
