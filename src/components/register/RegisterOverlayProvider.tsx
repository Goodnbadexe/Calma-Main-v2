import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Ctx = { open: () => void; close: () => void; isExpanded: boolean }
const RegisterOverlayContext = createContext<Ctx | null>(null)

export function useRegisterOverlay() {
  const ctx = useContext(RegisterOverlayContext)
  if (!ctx) throw new Error('useRegisterOverlay must be used within RegisterOverlayProvider')
  return ctx
}

export function RegisterOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const open = () => setIsExpanded(true)
  const close = () => setIsExpanded(false)

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isExpanded])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!isExpanded) return
    const panel = panelRef.current
    if (!panel) return
    const focusables = panel.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])')
    const first = focusables[0]
    first?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const list = Array.from(focusables).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null)
      if (!list.length) return
      const firstEl = list[0]
      const lastEl = list[list.length - 1]
      const active = document.activeElement as HTMLElement
      if (e.shiftKey) {
        if (active === firstEl || !panel.contains(active)) {
          e.preventDefault()
          lastEl.focus()
        }
      } else {
        if (active === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    panel.addEventListener('keydown', onKeyDown as any)
    return () => panel.removeEventListener('keydown', onKeyDown as any)
  }, [isExpanded])

  return (
    <RegisterOverlayContext.Provider value={{ open, close, isExpanded }}>
      {children}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-3 sm:p-2">
            <motion.div
              ref={panelRef}
              layoutId="cta-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: 24 }}
              className="relative flex h-full w-full overflow-y-auto bg-[#004FE5]"
              role="dialog"
              aria-modal="true"
              aria-label="Register your interest"
            >
              <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 24 }}>
                <div className="animated-gradient" />
              </div>
              <div className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
                <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-none tracking-[-0.03em]">
                    Talk to sales
                  </h2>
                  <p className="text-sm sm:text-base text-white leading-[150%]">
                    Learn how CALMA can transform your investment with tailored solutions.
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <form className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-mono text-white mb-2 tracking-[0.5px] uppercase">
                        Full Name *
                      </label>
                      <input id="name" name="name" className="w-full px-4 py-2.5 rounded-lg bg-[#001F63] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm h-10" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-mono text-white mb-2 tracking-[0.5px] uppercase">
                        Work Email *
                      </label>
                      <input id="email" name="email" type="email" className="w-full px-4 py-2.5 rounded-lg bg-[#001F63] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm h-10" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-[10px] font-mono text-white mb-2 tracking-[0.5px] uppercase">
                        Anything else?
                      </label>
                      <textarea id="message" name="message" rows={3} className="w-full px-4 py-3 rounded-lg bg-[#001F63] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none text-sm" />
                    </div>
                    <button type="submit" className="w-full px-8 py-2.5 rounded-full bg-white text-[#0041C1] font-medium hover:bg-white/90 transition-colors tracking-[-0.03em] h-10">
                      Submit
                    </button>
                    <div aria-live="polite" className="sr-only">Form ready</div>
                  </form>
                </div>
              </div>
              <button onClick={close} className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-white bg-transparent hover:bg-white/10 rounded-full" aria-label="Close">
                ×
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </RegisterOverlayContext.Provider>
  )
}
