import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '@/components/ui/NavBar'
import { useEffect, useState } from 'react'
import { runPreflight } from '@/utils/preflight'
import Footer from '@/components/ui/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { getAlternateLinks } from '@/utils/i18nPaths'
import { RegisterOverlayProvider } from '@/components/register/RegisterOverlayProvider'

export default function AppLayout() {
  useEffect(() => { runPreflight() }, [])
  const location = useLocation()
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    setOverlayVisible(true)
    const timer = setTimeout(() => {
      setOverlayVisible(false)
    }, reduceMotion ? 0 : 520)
    return () => {
      clearTimeout(timer)
    }
  }, [location.pathname, reduceMotion])

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'auto' })
  }, [location.pathname])

  return (
    <RegisterOverlayProvider>
    <div className="page">
      <Helmet>
        {getAlternateLinks(location.pathname).map(link => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.path} />
        ))}
        <link rel="preload" as="font" href="/src/assets/fonts/BluteauArabicSans-Regular.otf" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/src/assets/fonts/SpicaArabic-Book.otf" type="font/otf" crossOrigin="anonymous" />
      </Helmet>
      <a
        href="#main"
        className="skip-to-content"
        style={{
          position: 'absolute',
          left: 8,
          top: 8,
          padding: '8px 12px',
          background: '#000',
          color: '#fff',
          borderRadius: 8,
          transform: 'translateY(-200%)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.transform = 'translateY(-200%)'
        }}
      >
        Skip to content
      </a>
      <NavBar />
      <div style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? {} : { opacity: 1 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.26, ease: 'easeInOut' }}
          >
            <Suspense fallback={<div className="page-loading" aria-busy="true" aria-live="polite" />}>
              <div id="main">
                <Outlet />
              </div>
            </Suspense>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {overlayVisible && (
            <motion.div
              key={`overlay-${location.pathname}`}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? {} : { opacity: 0.25 }}
              exit={reduceMotion ? {} : { opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.26, ease: 'easeInOut' }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#000',
                pointerEvents: 'none',
                zIndex: 900,
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
    </RegisterOverlayProvider>
  )
}
