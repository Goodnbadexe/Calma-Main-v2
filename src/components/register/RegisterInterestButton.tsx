import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRegisterOverlay } from '@/components/register/RegisterOverlayProvider'

export default function RegisterInterestButton({ label = 'Register Your Interest', className }: { label?: string; className?: string }) {
  const overlay = useRegisterOverlay()
  return (
    <motion.div layoutId="cta-card" className={className ?? ''} style={{ display: 'inline-block' }}>
      <Button className="rounded-full register-button" onClick={() => overlay.open()}>
        {label}
      </Button>
    </motion.div>
  )
}

