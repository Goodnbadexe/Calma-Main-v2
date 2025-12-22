import { useEffect } from 'react'
import anime from 'animejs'

export function useHeroAnimation(heroReady: boolean) {
  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    if (!heroReady) return
    anime
      .timeline({ easing: 'easeOutQuad', duration: 500 })
      .add({
        targets: '.luxury-hero-content',
        opacity: [0, 1],
        translateY: [16, 0],
      })
      .add({
        targets: '.reveal-block',
        opacity: [0, 1],
        translateY: [8, 0],
        delay: anime.stagger(120),
      })
  }, [heroReady])
}
