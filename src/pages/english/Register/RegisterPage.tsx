import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'
import { FormField, TextareaField, Checkbox } from '@/components/forms'
import SEOHead from '@/components/seo/SEOHead'
import { submitLead } from '@/services/api'
import { useTelemetry } from '@/utils/telemetry'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  country: string
  additionalInfo: string
  newsletter: boolean
  updates: boolean
  agreeToTerms: boolean
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: '',
    newsletter: false,
    updates: false,
    agreeToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { trackPerformance, trackError } = useTelemetry()

  const validate = () => {
    const next: Record<string, string> = {}
    if (!formData.firstName) next.firstName = 'First name is required'
    if (!formData.lastName) next.lastName = 'Last name is required'
    if (!formData.email) next.email = 'Email is required'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email'
    if (!formData.agreeToTerms) next.agreeToTerms = 'You must agree to Privacy Policy'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const start = performance.now()
    try {
      await submitLead({ ...formData, locale: 'en' })
      setSubmitted(true)
      trackPerformance('register_interest', performance.now() - start, 'ms')
    } catch (err: any) {
      const msg = String(err?.message || 'Submission failed')
      trackError('form_submission_error', msg)
      setErrors(prev => ({ ...prev, submit: msg === 'LEADS_API_URL_MISSING' ? 'Lead API URL missing. Please configure VITE_LEADS_API_URL.' : 'Failed to submit. Please try again.' }))
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4" aria-live="polite">
        <div className="max-w-2xl w-full">
          <div className="rounded-xl bg-white p-10 text-center shadow-luxury" role="status">
            <h2 className="text-3xl font-bold mb-2">Welcome to CALMA!</h2>
            <p className="text-neutral-700 text-lg">
              Thank you for registering your interest. Our team will contact you shortly with exclusive opportunities.
            </p>
            <div className="mt-6">
              <Button onClick={() => setSubmitted(false)} className="rounded-full bg-primary text-white hover:bg-primary-700">
                Register Another Interest
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-neutral-50" lang="en" dir="ltr">
      <SEOHead title="Register Your Interest" description="Join CALMA to discover luxury real estate opportunities first." locale="en" />
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h1 className="text-4xl font-serif text-neutral-900">Register Your Interest</h1>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-700">
          Join the exclusive CALMA community and be the first to discover our luxury real estate opportunities.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader className="border-b">
                <h2 className="text-2xl font-semibold text-neutral-900">Tell Us About Yourself</h2>
                <p className="mt-1 text-neutral-700">Help us understand your preferences to provide personalized recommendations</p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="First Name" name="firstName" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required placeholder="Enter your first name" error={errors.firstName} />
                    <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required placeholder="Enter your last name" error={errors.lastName} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Email Address" name="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required placeholder="your.email@example.com" error={errors.email} />
                    <FormField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+966 5X XXX XXXX" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="City" name="city" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="Enter your city" />
                    <FormField label="Country" name="country" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} placeholder="Enter your country" />
                  </div>

                  <TextareaField label="Additional Information" name="additionalInfo" value={formData.additionalInfo} onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })} placeholder="Tell us more about your requirements, preferences, or any questions..." rows={4} />

                  <div className="space-y-3">
                    <Checkbox label="Subscribe to our newsletter for market insights and exclusive opportunities" name="newsletter" checked={formData.newsletter} onChange={e => setFormData({ ...formData, newsletter: e.target.checked })} />
                    <Checkbox label="Receive updates about new projects and investment opportunities" name="updates" checked={formData.updates} onChange={e => setFormData({ ...formData, updates: e.target.checked })} />
                    <Checkbox label="I agree to the Privacy Policy and Terms of Service" name="agree" checked={formData.agreeToTerms} onChange={e => setFormData({ ...formData, agreeToTerms: e.target.checked })} required />
                    {errors.agreeToTerms && <p className="text-sm text-accent-600">{errors.agreeToTerms}</p>}
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full rounded-full bg-primary text-white hover:bg-primary-700" disabled={!formData.agreeToTerms || loading}>
                      {loading ? 'Submitting...' : 'Register Your Interest'}
                    </Button>
                    {errors.submit && <p className="text-sm text-accent-600 mt-2">{errors.submit}</p>}
                    <p className="text-xs text-neutral-600 text-center mt-3">By submitting this form you agree to our Privacy Policy and Terms of Service.</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader className="border-b">
                <h3 className="text-xl font-semibold">Why Register with CALMA?</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="rounded-lg bg-white p-4 shadow">
                  <h4 className="font-medium">Exclusive Access</h4>
                  <p className="text-sm text-neutral-700">Be the first to know about luxury properties.</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <h4 className="font-medium">Personalized Service</h4>
                  <p className="text-sm text-neutral-700">Receive tailored recommendations.</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <h4 className="font-medium">Market Insights</h4>
                  <p className="text-sm text-neutral-700">Exclusive market reports and trends.</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <h4 className="font-medium">VIP Events</h4>
                  <p className="text-sm text-neutral-700">Invitations to exclusive viewings and launches.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
