import { useEffect, useRef } from 'react'
import splashVideo from '@/assets/Splash/Calma_Resources_3D Pattern_1.mp4'

export function LoadingScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked
      })
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#081e1f]">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        src={splashVideo}
        muted
        loop
        playsInline
        autoPlay
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Optional: Add Logo or Loader Spinner here if needed */}
        <div className="w-12 h-12 border-2 border-[#d4cfbc] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
