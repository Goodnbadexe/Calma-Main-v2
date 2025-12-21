/**
 * GSAP Timeline Animations for Complex Sequences
 * Advanced animation utilities using GSAP for sophisticated UI interactions
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

// Animation configuration constants
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    medium: 0.6,
    slow: 1.2,
    extraSlow: 2.0
  },
  ease: {
    smooth: 'power2.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
    expo: 'expo.out',
    circ: 'circ.out'
  },
  stagger: {
    fast: 0.1,
    medium: 0.2,
    slow: 0.3
  }
}

/**
 * Hero Section Timeline Animation
 * Complex sequence for hero content reveal
 */
export const createHeroTimeline = (container: HTMLElement) => {
  const tl = gsap.timeline({ paused: true })
  
  // Set initial states
  gsap.set(container.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-actions'), {
    opacity: 0,
    y: 60,
    scale: 0.9
  })
  
  gsap.set(container.querySelector('.hero-background'), {
    scale: 1.1,
    opacity: 0
  })

  // Animation sequence
  tl.to(container.querySelector('.hero-background'), {
    opacity: 1,
    scale: 1,
    duration: ANIMATION_CONFIG.duration.slow,
    ease: ANIMATION_CONFIG.ease.smooth
  })
  .to(container.querySelector('.hero-badge'), {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: ANIMATION_CONFIG.duration.medium,
    ease: ANIMATION_CONFIG.ease.bounce
  }, '-=0.5')
  .to(container.querySelector('.hero-title'), {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: ANIMATION_CONFIG.duration.medium,
    ease: ANIMATION_CONFIG.ease.smooth
  }, '-=0.3')
  .to(container.querySelector('.hero-subtitle'), {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: ANIMATION_CONFIG.duration.medium,
    ease: ANIMATION_CONFIG.ease.smooth
  }, '-=0.2')
  .to(container.querySelector('.hero-actions'), {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: ANIMATION_CONFIG.duration.medium,
    ease: ANIMATION_CONFIG.ease.bounce
  }, '-=0.1')

  return tl
}

/**
 * Cards Stagger Animation
 * Sophisticated staggered reveal for card grids
 */
export const createCardsStaggerTimeline = (container: HTMLElement) => {
  const cards = container.querySelectorAll('.card, .luxury-card, .project-card')
  const tl = gsap.timeline({ paused: true })

  // Set initial states
  gsap.set(cards, {
    opacity: 0,
    y: 80,
    rotationX: 45,
    scale: 0.8
  })

  // Staggered animation
  tl.to(cards, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    scale: 1,
    duration: ANIMATION_CONFIG.duration.medium,
    ease: ANIMATION_CONFIG.ease.smooth,
    stagger: {
      amount: 0.8,
      from: 'start',
      ease: 'power2.out'
    }
  })

  return tl
}

/**
 * Text Reveal Animation
 * Character-by-character text reveal effect
 */
export const createTextRevealTimeline = (element: HTMLElement) => {
  const text = element.textContent || ''
  const chars = text.split('')
  
  // Wrap each character in a span
  element.innerHTML = chars.map(char => 
    char === ' ' ? ' ' : `<span class="char">${char}</span>`
  ).join('')
  
  const charElements = element.querySelectorAll('.char')
  const tl = gsap.timeline({ paused: true })

  // Set initial states
  gsap.set(charElements, {
    opacity: 0,
    y: 50,
    rotationX: 90
  })

  // Animate characters
  tl.to(charElements, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: ANIMATION_CONFIG.duration.fast,
    ease: ANIMATION_CONFIG.ease.smooth,
    stagger: {
      amount: 1.2,
      from: 'start'
    }
  })

  return tl
}

/**
 * Morphing Background Animation
 * Dynamic background shape morphing
 */
export const createMorphingBackgroundTimeline = (container: HTMLElement) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true })
  
  const shapes = container.querySelectorAll('.morph-shape')
  
  tl.to(shapes, {
    morphSVG: 'M0,0 Q50,100 100,0 T200,0 L200,100 L0,100 Z',
    duration: ANIMATION_CONFIG.duration.extraSlow,
    ease: ANIMATION_CONFIG.ease.smooth,
    stagger: ANIMATION_CONFIG.stagger.medium
  })
  .to(shapes, {
    morphSVG: 'M0,0 Q25,50 50,0 T100,0 Q150,50 200,0 L200,100 L0,100 Z',
    duration: ANIMATION_CONFIG.duration.extraSlow,
    ease: ANIMATION_CONFIG.ease.smooth,
    stagger: ANIMATION_CONFIG.stagger.medium
  })

  return tl
}

/**
 * Scroll-Triggered Section Animation
 * Complex section reveal with multiple elements
 */
export const createScrollTriggeredTimeline = (section: HTMLElement) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      scrub: false
    }
  })

  const title = section.querySelector('.section-title, .luxury-section-title')
  const content = section.querySelectorAll('.section-content, .luxury-content')
  const images = section.querySelectorAll('img, .image-container')
  const cards = section.querySelectorAll('.card, .luxury-card')

  // Set initial states
  gsap.set([title, content, images, cards], {
    opacity: 0,
    y: 60
  })

  // Animation sequence
  if (title) {
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth
    })
  }

  if (content.length > 0) {
    tl.to(content, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth,
      stagger: ANIMATION_CONFIG.stagger.fast
    }, '-=0.3')
  }

  if (images.length > 0) {
    tl.to(images, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth,
      stagger: ANIMATION_CONFIG.stagger.medium
    }, '-=0.2')
  }

  if (cards.length > 0) {
    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.bounce,
      stagger: ANIMATION_CONFIG.stagger.medium
    }, '-=0.1')
  }

  return tl
}

/**
 * Magnetic Button Effect
 * Interactive magnetic attraction effect for buttons
 */
export const createMagneticEffect = (button: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    })
  }
  
  button.addEventListener('mousemove', handleMouseMove)
  button.addEventListener('mouseleave', handleMouseLeave)
  
  return () => {
    button.removeEventListener('mousemove', handleMouseMove)
    button.removeEventListener('mouseleave', handleMouseLeave)
  }
}

/**
 * Parallax Scroll Effect
 * Advanced parallax with multiple layers
 */
export const createParallaxTimeline = (container: HTMLElement) => {
  const layers = container.querySelectorAll('[data-parallax]')
  
  layers.forEach(layer => {
    const speed = parseFloat(layer.getAttribute('data-parallax') || '0.5')
    
    gsap.to(layer, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  })
}

/**
 * Loading Sequence Animation
 * Complex loading animation with multiple stages
 */
export const createLoadingSequence = (container: HTMLElement) => {
  const tl = gsap.timeline()
  
  const loader = container.querySelector('.loader')
  const progress = container.querySelector('.progress-bar')
  const content = container.querySelector('.content')
  
  // Loading animation
  tl.to(progress, {
    width: '100%',
    duration: 2,
    ease: 'power2.out'
  })
  .to(loader, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'power2.out'
  })
  .to(content, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.2')
  
  return tl
}

/**
 * Utility function to initialize all GSAP animations
 */
export const initializeGSAPAnimations = () => {
  // Refresh ScrollTrigger on window resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh()
  })
  
  // Set default GSAP settings
  gsap.defaults({
    duration: ANIMATION_CONFIG.duration.medium,
    ease: ANIMATION_CONFIG.ease.smooth
  })
  
  // Enable hardware acceleration
  gsap.set('*', { force3D: true })
}

/**
 * Cleanup function for GSAP animations
 */
export const cleanupGSAPAnimations = () => {
  ScrollTrigger.killAll()
  gsap.killTweensOf('*')
}
