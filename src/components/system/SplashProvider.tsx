import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { splashFallbackMs, overlayFadeMs } from '@/config/uiTimings'

type SplashContextValue = {
  showSplash: (text?: string) => Promise<void>
  signalReady: () => void
}

const SplashContext = createContext<SplashContextValue | null>(null)

export function useSplash() {
  const ctx = useContext(SplashContext)
  if (!ctx) throw new Error('useSplash must be used within SplashProvider')
  return ctx
}

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const timerRef = useRef<number | null>(null)
  const fadeTimerRef = useRef<number | null>(null)
  const splashRef = useRef<HTMLVideoElement | null>(null)
  const warmRef = useRef<HTMLVideoElement | null>(null)
  const [clipUrl, setClipUrl] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const fadeMs = overlayFadeMs
  const resolveRef = useRef<(() => void) | null>(null)
  const lastClipUrlRef = useRef<string | null>(null)

  const isVideoUrl = (url: string) => /\.(mp4|webm|ogg)$/i.test(url)


  // Collect all video URLs from assets at build time
  const allMedia = useMemo(() => {
    // Use public assets instead of glob imports for better compatibility
    const splashUrls = [
      '/Splash/Calma_Resources_3D Pattern_1.mp4',
      '/Splash/Calma_Resources_3D Pattern_2.mp4',
      '/Splash/Calma_Resources_3D Pattern_3.mp4'
    ]
    return splashUrls
  }, [])

  const showSplash = useCallback((_text?: string) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current)
      fadeTimerRef.current = null
    }
    // Select random clip
    if (allMedia.length) {
      // Avoid immediate repeat of last clip
      let chosen = allMedia[Math.floor(Math.random() * allMedia.length)]
      if (allMedia.length > 1 && lastClipUrlRef.current === chosen) {
        const alt = allMedia.find((u) => u !== chosen)
        if (alt) chosen = alt
      }
      setClipUrl(chosen)
      lastClipUrlRef.current = chosen
      // Disable warming to prevent auto-loading
    } else {
      setClipUrl(null)
    }
    setClosing(false)
    setVisible(true)
    // Return a promise that resolves when splash has fully closed
    return new Promise<void>((resolve) => {
      resolveRef.current = resolve
      // Fallback close if destination never signals readiness
      if (timerRef.current) { window.clearTimeout(timerRef.current) }
      timerRef.current = window.setTimeout(() => startClosing(), splashFallbackMs)
    })
  }, [allMedia, clipUrl])

  const startClosing = useCallback(() => {
    setClosing(true)
    if (splashRef.current) {
      try { splashRef.current.pause() } catch {}
    }
    fadeTimerRef.current = window.setTimeout(() => {
      setVisible(false)
      setClosing(false)
      // Reset media elements
      if (splashRef.current) {
        try { splashRef.current.pause() } catch {}
        splashRef.current.currentTime = 0
      }
      if (warmRef.current) {
        try { warmRef.current.pause() } catch {}
        warmRef.current.currentTime = 0
      }
      timerRef.current = null
      fadeTimerRef.current = null
      // Resolve any awaiting navigation
      if (resolveRef.current) {
        const r = resolveRef.current
        resolveRef.current = null
        r()
      }
    }, fadeMs)
  }, [])

  const signalReady = useCallback(() => {
    if (!visible || closing) return
    startClosing()
  }, [visible, closing, startClosing])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (fadeTimerRef.current) {
        window.clearTimeout(fadeTimerRef.current)
        fadeTimerRef.current = null
      }
      if (splashRef.current) {
        try { splashRef.current.pause() } catch {}
        splashRef.current.currentTime = 0
      }
      if (warmRef.current) {
        try { warmRef.current.pause() } catch {}
        warmRef.current.currentTime = 0
      }
    }
  }, [])

  const value = useMemo(() => ({ showSplash, signalReady }), [showSplash, signalReady])

  return (
    <SplashContext.Provider value={value}>
      {children}
      {/* Overlay rendered at root for full-screen coverage */}
      <div className={`splash-overlay ${visible ? 'open' : ''} ${closing ? 'closing' : ''}`} aria-hidden={!visible} role="status">
        {/* Immersive media layer: video or image */}
        {clipUrl ? (
          isVideoUrl(clipUrl) ? (
            <video
              ref={splashRef}
              key={`splash-${clipUrl}`}
              className="splash-media"
              src={clipUrl}
              muted
              loop
              playsInline
              preload="metadata"
              autoPlay
              onLoadedMetadata={() => { try { splashRef.current?.play() } catch {} }}
              aria-label="Preview clip"
            />
          ) : (
            <img
              ref={imgRef}
              key={`splash-${clipUrl}`}
              className="splash-media"
              src={clipUrl}
              alt="Preview image"
            />
          )
        ) : (
          <div className="splash-content" aria-live="polite">
            <div className="splash-spinner" aria-label="Loading" />
          </div>
        )}
        {/* Hidden warmer video to prime media pipeline */}
        {/* Warming disabled to prevent auto-loading */}
      </div>
    </SplashContext.Provider>
  )
}
