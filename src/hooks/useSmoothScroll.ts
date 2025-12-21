import { useEffect, useCallback, useRef } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: 'easeInOut' | 'easeOut' | 'easeIn' | 'linear';
  offset?: number;
}

interface ScrollToOptions extends SmoothScrollOptions {
  behavior?: 'smooth' | 'instant';
}

export const useSmoothScroll = () => {
  const isScrolling = useRef<boolean>(false);
  const animationFrame = useRef<number | null>(null);

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t),
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  };

  const scrollTo = useCallback((
    target: string | number | Element,
    options: ScrollToOptions = {}
  ) => {
    const {
      duration = 800,
      easing = 'easeInOut',
      offset = 0,
      behavior = 'smooth'
    } = options;

    if (behavior === 'instant') {
      let targetPosition: number;
      
      if (typeof target === 'number') {
        targetPosition = target;
      } else if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (!element) return;
        targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      } else {
        targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      }
      
      window.scrollTo(0, targetPosition);
      return;
    }

    // Cancel any ongoing scroll animation
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    let targetPosition: number;
    
    if (typeof target === 'number') {
      targetPosition = target;
    } else if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (!element) return;
      targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    } else {
      targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    }

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    isScrolling.current = true;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easingFunctions[easing](progress);
      const currentPosition = startPosition + (distance * easedProgress);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        isScrolling.current = false;
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
  }, []);

  const scrollToTop = useCallback((options?: SmoothScrollOptions) => {
    scrollTo(0, options);
  }, [scrollTo]);

  const scrollToBottom = useCallback((options?: SmoothScrollOptions) => {
    const targetPosition = document.documentElement.scrollHeight - window.innerHeight;
    scrollTo(targetPosition, options);
  }, [scrollTo]);

  const scrollToSection = useCallback((sectionId: string, options?: SmoothScrollOptions) => {
    scrollTo(`#${sectionId}`, options);
  }, [scrollTo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return {
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToSection,
    isScrolling: isScrolling.current
  };
};

// Enhanced intersection observer hook with animation triggers
export const useIntersectionAnimation = (
  options: IntersectionObserverInit = {},
  animationCallback?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void
) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (animationCallback) {
          animationCallback(entry.isIntersecting, entry);
        }
      });
    }, defaultOptions);

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [options, animationCallback]);

  return elementRef;
};

// Scroll-triggered parallax hook
export const useScrollParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;
      
      elementRef.current.style.transform = `translateY(${parallax}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return elementRef;
};
