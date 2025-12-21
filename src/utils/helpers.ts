/**
 * CALMA Website Helpers
 * React-specific helpers, animation presets, and component utilities
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import anime from 'animejs';

// ==================== REACT HOOKS ====================

/**
 * Custom hook for intersection observer
 * @param options - Intersection observer options
 */
export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasIntersected, options]);

  return [ref, isIntersecting, hasIntersected];
};

/**
 * Custom hook for scroll position
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollPosition = () => {
      const scrollY = window.pageYOffset;
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      setScrollPosition(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollPosition, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  return { scrollPosition, scrollDirection };
};

/**
 * Custom hook for window size
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Custom hook for anime.js animations
 * @param animationConfig - Anime.js configuration
 * @param dependencies - Dependencies to trigger animation
 */
export const useAnimeAnimation = (animationConfig: anime.AnimeParams, dependencies: React.DependencyList = []) => {
  const ref = useRef(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    if (ref.current) {
      animationRef.current = anime({
        targets: ref.current,
        ...animationConfig
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, dependencies);

  const play = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  }, []);

  const restart = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.restart();
    }
  }, []);

  return [ref, { play, pause, restart }];
};

// ==================== ANIMATION PRESETS ====================

/**
 * Luxury entrance animation preset
 */
export const luxuryEntrance = {
  opacity: [0, 1],
  translateY: [60, 0],
  scale: [0.8, 1],
  duration: 1200,
  easing: 'easeOutExpo'
};

/**
 * Elegant fade-in preset
 */
export const elegantFadeIn = {
  opacity: [0, 1],
  translateY: [30, 0],
  duration: 800,
  easing: 'easeOutQuart'
};

/**
 * Sophisticated slide-in preset
 */
export const sophisticatedSlideIn = {
  opacity: [0, 1],
  translateX: [-50, 0],
  duration: 1000,
  easing: 'easeOutCubic'
};

/**
 * Premium scale-in preset
 */
export const premiumScaleIn = {
  opacity: [0, 1],
  scale: [0.9, 1],
  duration: 600,
  easing: 'easeOutBack'
};

/**
 * Floating animation preset for decorative elements
 */
export const floatingPreset = {
  translateY: [-10, 10],
  duration: 3000,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine'
};

/**
 * Rotating animation preset for geometric elements
 */
export const rotatingPreset = {
  rotate: '1turn',
  duration: 20000,
  loop: true,
  easing: 'linear'
};

// ==================== COMPONENT HELPERS ====================

/**
 * Generate staggered animation delays for lists
 * @param index - Item index
 * @param baseDelay - Base delay in milliseconds
 * @param stagger - Stagger amount in milliseconds
 */
export const getStaggerDelay = (index: number, baseDelay: number = 0, stagger: number = 100): number => {
  return baseDelay + (index * stagger);
};

/**
 * Create responsive breakpoint checker
 * @param breakpoint - Breakpoint in pixels
 */
export const createBreakpointChecker = (breakpoint: number): (() => boolean) => {
  return () => window.innerWidth >= breakpoint;
};

/**
 * Common breakpoints
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Check if device is mobile
 */
export const isMobile = () => window.innerWidth < breakpoints.md;

/**
 * Check if device is tablet
 */
export const isTablet = () => window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;

/**
 * Check if device is desktop
 */
export const isDesktop = () => window.innerWidth >= breakpoints.lg;

/**
 * Format metrics with locale and optional plus suffix
 */
export const formatMetric = (value: number | string, opts: { plus?: boolean; locale?: string } = {}) => {
  const { plus = false, locale = 'en' } = opts
  const n = typeof value === 'string' ? Number(String(value).replace(/[^\d.-]/g, '')) : value
  const formatted = new Intl.NumberFormat(locale).format(isNaN(n) ? 0 : n)
  return plus ? `${formatted}+` : formatted
}

/**
 * Get unit symbol by locale
 */
export const getUnit = (locale: string) => (locale?.startsWith('ar') ? 'م²' : 'm²')

// ==================== ANIMATION SEQUENCES ====================

/**
 * Hero section animation sequence
 * @param containerSelector - Container selector
 */
export const heroAnimationSequence = (containerSelector: string): anime.AnimeTimelineInstance => {
  const timeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 800
  });

  timeline
    .add({
      targets: `${containerSelector} .hero-title`,
      opacity: [0, 1],
      translateY: [60, 0],
      duration: 1000
    })
    .add({
      targets: `${containerSelector} .hero-subtitle`,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800
    }, '-=600')
    .add({
      targets: `${containerSelector} .hero-cta`,
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.8, 1],
      duration: 600
    }, '-=400')
    .add({
      targets: `${containerSelector} .hero-stats`,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600
    }, '-=300');

  return timeline;
};

/**
 * Card reveal animation sequence
 * @param cardSelector - Card selector
 */
export const cardRevealSequence = (cardSelector: string): anime.AnimeInstance => {
  return anime({
    targets: cardSelector,
    opacity: [0, 1],
    translateY: [50, 0],
    scale: [0.9, 1],
    duration: 800,
    delay: (_el, i) => i * 150,
    easing: 'easeOutExpo'
  });
};

/**
 * Navigation animation sequence
 * @param navSelector - Navigation selector
 * @param isVisible - Whether nav should be visible
 */
export const navAnimationSequence = (navSelector: string, isVisible: boolean): anime.AnimeInstance => {
  return anime({
    targets: navSelector,
    translateY: isVisible ? ['-100%', '0%'] : ['0%', '-100%'],
    opacity: isVisible ? [0, 1] : [1, 0],
    duration: 400,
    easing: 'easeOutQuart'
  });
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Create parallax effect
 * @param selector - Element selector
 * @param speed - Parallax speed (0-1)
 */
export const createParallaxEffect = (selector: string, speed: number = 0.5): (() => void) => {
  const elements = document.querySelectorAll(selector);
  
  const updateParallax = () => {
    const scrollTop = window.pageYOffset;
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
        const yPos = -(scrollTop - elementTop) * speed;
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      }
    });
  };
  
  window.addEventListener('scroll', updateParallax, { passive: true });
  
  return () => window.removeEventListener('scroll', updateParallax);
};

/**
 * Create magnetic effect for buttons
 * @param selector - Button selector
 * @param strength - Magnetic strength
 */
export const createMagneticEffect = (selector: string, strength: number = 0.3): void => {
  const buttons = document.querySelectorAll(selector);
  
  buttons.forEach(button => {
    const htmlButton = button as HTMLElement;
    htmlButton.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = htmlButton.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      htmlButton.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    
    htmlButton.addEventListener('mouseleave', () => {
      htmlButton.style.transform = 'translate(0px, 0px)';
    });
  });
};

/**
 * Format currency for display
 * @param amount - Amount to format
 * @param currency - Currency code
 * @param locale - Locale string
 */
export const formatCurrency = (amount: number, currency: string = 'SAR', locale: string = 'ar-SA'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Format date for display
 * @param date - Date to format
 * @param locale - Locale string
 * @param options - Intl.DateTimeFormat options
 */
export const formatDate = (date: Date | string, locale: string = 'ar-SA', options: Intl.DateTimeFormatOptions = {}): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(new Date(date));
};

/**
 * Validate email address
 * @param email - Email to validate
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Saudi format)
 * @param phone - Phone number to validate
 */
export const validateSaudiPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+966|966|0)?[5][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export default {
  useIntersectionObserver,
  useScrollPosition,
  useWindowSize,
  useAnimeAnimation,
  luxuryEntrance,
  elegantFadeIn,
  sophisticatedSlideIn,
  premiumScaleIn,
  floatingPreset,
  rotatingPreset,
  getStaggerDelay,
  createBreakpointChecker,
  breakpoints,
  isMobile,
  isTablet,
  isDesktop,
  heroAnimationSequence,
  cardRevealSequence,
  navAnimationSequence,
  createParallaxEffect,
  createMagneticEffect,
  formatCurrency,
  formatDate,
  validateEmail,
  validateSaudiPhone
};
