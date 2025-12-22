import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitLead } from '@/services/api'

type LeadForm = {
  firstName: string
  lastName: string
  phone: string
  email: string
  projectName: string
  unitType: string
  city: string
  purchaseMethod: string
  leadSource: string
}

export default function CTAFluid() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState<LeadForm>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    projectName: '',
    unitType: '',
    city: '',
    purchaseMethod: '',
    leadSource: '',
  })
  const panelRef = useRef<HTMLDivElement>(null)

  const open = () => setIsExpanded(true)
  const close = () => setIsExpanded(false)

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isExpanded])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!isExpanded) return
    const panel = panelRef.current
    if (!panel) return
    const focusables = panel.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
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
        if (active === firstEl || !panel.contains(active)) { e.preventDefault(); lastEl.focus() }
      } else {
        if (active === lastEl) { e.preventDefault(); firstEl.focus() }
      }
    }
    panel.addEventListener('keydown', onKeyDown as any)
    return () => panel.removeEventListener('keydown', onKeyDown as any)
  }, [isExpanded])

  const setField = (name: keyof LeadForm, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }
  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.firstName) next.firstName = 'First name is required'
    if (!form.lastName) next.lastName = 'Last name is required'
    if (!form.email) next.email = 'Email is required'
    if (form.email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    setErrors(next)
    return Object.keys(next).length === 0
  }
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await submitLead({ ...form, locale: 'en' })
      setSubmitted(true)
    } catch (err: any) {
      const msg = String(err?.message || 'Submission failed')
      setErrors(prev => ({ ...prev, submit: msg }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px', textAlign: 'center' }}>
        <AnimatePresence initial={false}>
          {!isExpanded && (
            <motion.div className="inline-block relative" style={{ display: 'inline-block' }}>
              <motion.div layout layoutId="cta-card" className="absolute inset-0 transform-gpu will-change-transform" style={{ borderRadius: 100, background: '#004FE5' }} />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <Button onClick={open} className="h-15 px-6 py-3 text-lg font-medium text-white" style={{ position: 'relative' }}>
                  Register your interest
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-2">
            <motion.div
              ref={panelRef}
              layoutId="cta-card"
              transition={{ duration: 0.3 }}
              layout
              className="relative flex h-full w-full overflow-y-auto transform-gpu will-change-transform bg-[#004FE5]"
              style={{ borderRadius: 24 }}
              role="dialog"
              aria-modal="true"
              aria-label="Register your interest"
            >
              <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute h-full inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: 24 }}>
                <div className="animated-gradient" />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.4 }} className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
                <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-none tracking-[-0.03em]">Talk to sales</h2>
                  <p className="text-sm sm:text-base text-white leading-[150%]">Learn how CALMA can transform your investment with tailored solutions.</p>
                  <p className="text-base sm:text-lg text-white leading-[150%]">Register your interest Today for a pristine tomorrow.</p>
                </div>
                <div className="flex-1 w-full">
                  <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field id="firstName" label="First Name" value={form.firstName} onChange={v => setField('firstName', v)} error={errors.firstName} />
                      <Field id="lastName" label="Last Name" value={form.lastName} onChange={v => setField('lastName', v)} error={errors.lastName} />
                      <Field id="phone" label="Phone Number" value={form.phone} onChange={v => setField('phone', v)} />
                      <Field id="email" type="email" label="Email Address" value={form.email} onChange={v => setField('email', v)} error={errors.email} />
                      <Field id="projectName" label="Project Name" value={form.projectName} onChange={v => setField('projectName', v)} />
                      <Field id="unitType" label="Unit Type" value={form.unitType} onChange={v => setField('unitType', v)} />
                      <Field id="city" label="City" value={form.city} onChange={v => setField('city', v)} />
                      <Field id="purchaseMethod" label="Purchase Method" value={form.purchaseMethod} onChange={v => setField('purchaseMethod', v)} />
                    </div>
                    <Field id="leadSource" label="Lead Source" value={form.leadSource} onChange={v => setField('leadSource', v)} />
                    <Button type="submit" disabled={loading} className="w-full px-8 py-2.5 rounded-full bg-white text-[#0041C1] font-medium hover:bg-white/90 tracking-[-0.03em] h-10">
                      {loading ? 'Submitting…' : 'Submit'}
                    </Button>
                    <div aria-live="polite" className="sr-only">
                      {submitted ? 'Submitted successfully' : errors.submit ? errors.submit : loading ? 'Submitting' : ''}
                    </div>
                  </form>
                </div>
              </motion.div>
              <motion.button onClick={close} className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-white bg-transparent hover:bg-white/10 rounded-full" aria-label="Close">
                <X className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ id, label, value, onChange, type = 'text', error }: { id: string, label: string, value: string, onChange: (v: string) => void, type?: string, error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] font-mono text-white mb-2 tracking-[0.5px] uppercase">{label}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-[#001F63] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm h-10" />
      {error && <p className="mt-1 text-xs text-white/90">{error}</p>}
    </div>
  )
}
