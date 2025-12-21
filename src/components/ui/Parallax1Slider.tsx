import React, { useEffect, useRef, useState, useCallback } from 'react'
import Core from 'smooothy'
import { resolveAssetUrls } from '@/utils/assetResolver'

interface Parallax1SliderProps {
  title?: string
  description?: string
  features?: string[]
  images?: string[]
  className?: string
  slideCount?: number
  enableAutoPlay?: boolean
  autoPlayDelay?: number
  onSlideChange?: (index: number) => void
  onError?: (error: Error) => void
}

const Parallax1Slider: React.FC<Parallax1SliderProps> = ({
  title = "Parallax.",
  description = "Weird parallax effect but kinda exemplifies why you might want it.",
  features = ["Infinite", "Snap", "Parallax", "current"],
  images = [],
  className = "",
  slideCount = 18,
  enableAutoPlay = false,
  autoPlayDelay = 5000,
  onSlideChange,
  onError
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const sliderInstanceRef = useRef<Core | null>(null)
  const parallaxElementsRef = useRef<HTMLElement[]>([])
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isActive, setIsActive] = useState(false)


  // Default images from local About folder
  const defaultImages = [
    '/src/assets/Images/About/Asset-1.JPG',
    '/src/assets/Images/About/Asset-2.JPG',
    '/src/assets/Images/About/Asset-3.JPG',
    '/src/assets/Images/About/Asset-4.JPG',
    '/src/assets/Images/About/Asset-5.jpg',
    '/src/assets/Images/About/Asset-6.JPG'
  ]

  const slideImagesRaw = images.length > 0 ? images : defaultImages
  const slideImages = resolveAssetUrls(slideImagesRaw)
  
  // Create slides based on slideCount, cycling through available images
  const slides = Array.from({ length: slideCount }, (_, index) => ({
    id: index,
    image: slideImages[index % slideImages.length],
    originalIndex: index
  }))

  // Custom slider class extending Core
  class ControlsSlider extends Core {
    parallaxy: HTMLElement[]
    onSlideChangeCallback?: (current: number, previous: number) => void

    constructor(container: HTMLElement, onSlideChangeCallback?: (current: number, previous: number) => void) {
      super(container, {
        infinite: true,
        snap: true,
        dragSensitivity: 0.01,
        lerpFactor: 0.12,
        scrollSensitivity: 1,
        snapStrength: 0.2,
        speedDecay: 0.85,
        bounceLimit: 0.5,
        onSlideChange: (current: number, previous: number) => {
          this.handleSlideChange(current, previous)
        }
      })

      this.parallaxy = [...container.querySelectorAll("[data-p]")] as HTMLElement[]
      this.onSlideChangeCallback = onSlideChangeCallback
    }

    handleSlideChange = (current: number, previous: number) => {
      // Normalize indices for infinite scrolling
      const normalizedCurrent = ((current % this.items.length) + this.items.length) % this.items.length
      const normalizedPrevious = ((previous % this.items.length) + this.items.length) % this.items.length
      
      // Remove active class from previous slide
      if (this.items[normalizedPrevious] && this.items[normalizedPrevious].children[0]) {
        this.items[normalizedPrevious].children[0].classList.remove("active")
      }
      // Add active class to current slide
      if (this.items[normalizedCurrent] && this.items[normalizedCurrent].children[0]) {
        this.items[normalizedCurrent].children[0].classList.add("active")
      }
      
      // Call external callback with normalized current slide
      this.onSlideChangeCallback?.(normalizedCurrent, normalizedPrevious)
    }

    onUpdate = (core: Core) => {
      const parallaxValues = core.parallaxValues || []
      this.parallaxy.forEach((p, i) => {
        if (p && parallaxValues[i] !== undefined) {
          p.style.transform = `translateY(${Math.sin(parallaxValues[i] * 1.5) * 10}%)`
        }
      })
    }
  }

  // Initialize slider
  useEffect(() => {
    if (!sliderRef.current || !containerRef.current) return

    try {
      const slider = new ControlsSlider(
        sliderRef.current,
        (current, _previous) => {
          // Current is already normalized from handleSlideChange
          setCurrentSlide(current)
          onSlideChange?.(current)
        }
      )

      sliderInstanceRef.current = slider
      
      // Set initial active slide
      if (slider.items[0] && slider.items[0].children[0]) {
        slider.items[0].children[0].classList.add("active")
      }
      
      setIsActive(true)

      // Animation loop using requestAnimationFrame (similar to gsap.ticker)
      const animate = () => {
        if (sliderInstanceRef.current) {
          sliderInstanceRef.current.update()
        }
        animationFrameRef.current = requestAnimationFrame(animate)
      }
      animate()

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        if (sliderInstanceRef.current && typeof sliderInstanceRef.current.destroy === 'function') {
          sliderInstanceRef.current.destroy()
        }
      }
    } catch (error) {
      console.error('Slider initialization error:', error)
      onError?.(error as Error)
    }
  }, [slides.length, onSlideChange, onError])

  // Auto-play functionality
  useEffect(() => {
    if (!enableAutoPlay || !sliderInstanceRef.current) return

    const startAutoPlay = () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
      
      autoPlayTimerRef.current = setInterval(() => {
        if (sliderInstanceRef.current) {
          sliderInstanceRef.current.goToNext()
        }
      }, autoPlayDelay)
    }

    startAutoPlay()

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [enableAutoPlay, autoPlayDelay])

  // Core handles all drag interactions, no need for custom handlers

  // Navigation functions
  const goToNext = useCallback(() => {
    sliderInstanceRef.current?.goToNext()
  }, [])

  const goToPrev = useCallback(() => {
    sliderInstanceRef.current?.goToPrev()
  }, [])

  const goToSlide = useCallback((index: number) => {
    sliderInstanceRef.current?.goToIndex(index)
  }, [])

  return (
    <div ref={containerRef} className={`parallax1-slider ${className}`}>
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4" style={{ fontFamily: 'Bluteau Arabic Sans' }}>{title}</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">{description}</p>
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {features.map((feature, index) => (
            <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors">
              {feature}
            </span>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {isActive ? 'Slider Active' : 'Slider Inactive'}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={goToPrev}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          aria-label="Previous slide"
        >
          ← Previous
        </button>
        <button
          onClick={goToNext}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          aria-label="Next slide"
        >
          Next →
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-gray-800 scale-125' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slider */}
        <div 
          ref={sliderRef}
          data-slider
          className="flex w-screen overflow-x-hidden px-[calc(50%-40vw)] md:px-[calc(50%-15vw)] py-8 focus:outline-none"
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          tabIndex={0}
        >
         {slides.map((slide, i) => (
           <div 
             key={slide.id}
             className="flex aspect-[3/4] w-[80vw] md:w-[30vw] shrink-0 items-center justify-center p-1"
           >
             <div className="relative h-full w-full p-8 border-2 border-gray-800 bg-white">
               <div
                  data-p
                  ref={el => {
                    if (el) parallaxElementsRef.current[i] = el
                  }}
                  className="flex h-full w-full items-center justify-center border-2 border-gray-600 overflow-hidden bg-gray-50 relative"
                >
                  <div className="overflow-hidden w-full h-full absolute inset-0 z-0" style={{ userSelect: 'none' }}>
                    <img 
                      src={slide.image} 
                      alt={`Slide ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{ 
                        objectPosition: 'center center',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        pointerEvents: 'none'
                      }}
                      draggable={false}
                    />
                  </div>
                  <div className="overflow-hidden relative z-10" style={{ userSelect: 'none' }}>
                    <p className="">{i + 1}</p>
                  </div>
                </div>
             </div>
           </div>
         ))}
       </div>

      <style>{`
        .parallax1-slider [data-p] > div > p {
          transform: translateY(120%);
          transition: transform 0.5s ease-out;
          transition-delay: 0.1s;
        }

        .parallax1-slider .active > [data-p] > div > p {
          transform: translateY(0%);
          transition: transform 0.5s ease-out;
          transition-delay: 0.3s;
        }

        .parallax1-slider .active {
          background-color: rgba(59, 130, 246, 0.1);
        }

        /* Prevent text selection during drag */
        .parallax1-slider [data-slider] {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .parallax1-slider [data-slider] * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          pointer-events: none;
        }

        .parallax1-slider [data-slider] img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }


      `}</style>
    </div>
  )
}

export default Parallax1Slider
