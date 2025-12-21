import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import type { Project } from '@/types/project'

type Props = {
  project: Project | null
  open: boolean
  onClose: () => void
}

export default function ProjectSlideOver({ project, open, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) closeBtnRef.current?.focus()
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={backdropRef}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === backdropRef.current) onClose()
          }}
          aria-hidden={!open}
        >
          <motion.div
            className="fixed right-0 bottom-0 top-0 w-full max-w-lg md:max-w-xl bg-card border-l border-primary/20 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label={project ? project.name : 'Project details'}
          >
            <Card className="h-full rounded-none border-0">
              <div className="flex items-center justify-between p-4 border-b border-primary/20">
                <div>
                  <h3 className="text-xl font-bold">{project?.name}</h3>
                  <p className="text-sm text-muted-foreground">{project?.location} • {project?.valueLabel}</p>
                </div>
                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  className="px-3 py-2 rounded-lg border hover:bg-secondary/60"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
              <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
                {project?.image && (
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <p className="text-sm text-muted-foreground">{project?.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border">{project?.category}</span>
                  <span className="text-xs px-2 py-1 rounded-full border">{project?.type}</span>
                </div>
                <div className="pt-2">
                  <a href={project?.href ?? '#'} className="hero-button luxury-button">Request Details</a>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

