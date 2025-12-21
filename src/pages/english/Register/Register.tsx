import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Bell, Gift } from 'lucide-react';
import { FormField, SelectField, TextareaField, Checkbox } from '../../../components/forms';
import Button from '../../../components/ui/button';
import SEOHead from '../../../components/seo/SEOHead';
import { submitLead } from '@/services/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTelemetry } from '@/utils/telemetry'

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  propertyType: string;
  budget: string;
  timeline: string;
  message: string;
  newsletter: boolean;
  updates: boolean;
  privacy: boolean;
  website?: string;
}

export default function Register() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    propertyType: '',
    budget: '',
    timeline: '',
    message: '',
    newsletter: false,
    updates: false,
    privacy: false,
    website: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { trackPerformance, trackError } = useTelemetry()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {}
    if (!formData.firstName) nextErrors.firstName = 'First name is required'
    if (!formData.lastName) nextErrors.lastName = 'Last name is required'
    if (!formData.email) nextErrors.email = 'Email is required'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email'
    if (!formData.privacy) nextErrors.privacy = 'You must agree to the privacy policy'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    if (formData.website && formData.website.trim().length > 0) {
      return
    }
    const last = localStorage.getItem('lead-submit-ts')
    const now = Date.now()
    if (last && now - Number(last) < 15000) {
      setSubmitError('Please wait a moment before submitting again')
      return
    }
    setIsLoading(true);
    setSubmitError(null)
    
    try {
      const start = performance.now()
      await submitLead({ ...formData })
      localStorage.setItem('lead-submit-ts', String(now))
      setSuccess(true)
      trackPerformance('register_interest', performance.now() - start, 'ms')
    } catch (err: any) {
      const msg = err?.message === 'LEADS_API_URL_MISSING'
        ? 'Missing lead API configuration'
        : (err?.message || 'Submission failed')
      setSubmitError(msg)
      trackError('form_submission_error', msg)
    } finally {
      setIsLoading(false)
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="bg-neutral-50">
      <SEOHead
        title="Register Your Interest"
        description="Join CALMA to receive exclusive access to luxury real estate opportunities and personalized recommendations."
        locale="en"
        canonical="/register"
        alternates={[
          { hrefLang: 'ar', href: '/ar/register' },
          { hrefLang: 'en', href: '/register' }
        ]}
      />
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-serif text-neutral-900">Register Your Interest</h1>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-700">
            Join the exclusive CALMA community and be the first to discover our luxury real estate opportunities.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-neutral-900">Tell Us About Yourself</h2>
            <p className="mt-2 text-neutral-700">
              Help us understand your preferences to provide personalized recommendations
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange as any}
              aria-hidden="true"
              tabIndex={-1}
              className="hidden"
            />
            <motion.div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
              <FormField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="Enter your first name"
                error={errors.firstName}
                aria-invalid={!!errors.firstName}
              />
              <FormField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Enter your last name"
                error={errors.lastName}
                aria-invalid={!!errors.lastName}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                error={errors.email}
                aria-invalid={!!errors.email}
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+966 5X XXX XXXX"
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
              <FormField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
              />
              <SelectField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange as any}
                options={[
                  { value: '', label: 'Select your country' },
                  { value: 'SA', label: 'Saudi Arabia' },
                  { value: 'AE', label: 'United Arab Emirates' },
                  { value: 'QA', label: 'Qatar' },
                  { value: 'KW', label: 'Kuwait' },
                  { value: 'BH', label: 'Bahrain' },
                  { value: 'OM', label: 'Oman' },
                  { value: 'US', label: 'United States' },
                  { value: 'UK', label: 'United Kingdom' },
                  { value: 'CA', label: 'Canada' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
              <SelectField
                label="Property Type of Interest"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange as any}
                options={[
                  { value: '', label: 'Select property type' },
                  { value: 'residential', label: 'Residential' },
                  { value: 'commercial', label: 'Commercial' },
                  { value: 'luxury-villa', label: 'Luxury Villa' },
                  { value: 'apartment', label: 'Apartment' },
                  { value: 'penthouse', label: 'Penthouse' },
                  { value: 'office', label: 'Office Space' },
                  { value: 'retail', label: 'Retail Space' },
                  { value: 'mixed-use', label: 'Mixed Use' },
                ]}
              />
              <SelectField
                label="Budget Range"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange as any}
                options={[
                  { value: '', label: 'Select budget range' },
                  { value: 'under-1m', label: 'Under $1M' },
                  { value: '1m-5m', label: '$1M - $5M' },
                  { value: '5m-10m', label: '$5M - $10M' },
                  { value: '10m-25m', label: '$10M - $25M' },
                  { value: '25m-50m', label: '$25M - $50M' },
                  { value: 'over-50m', label: 'Over $50M' },
                  { value: 'flexible', label: 'Flexible' },
                ]}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
              <SelectField
                label="Purchase Timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange as any}
                options={[
                  { value: '', label: 'Select timeline' },
                  { value: 'immediate', label: 'Immediate (0-3 months)' },
                  { value: 'short-term', label: 'Short term (3-6 months)' },
                  { value: 'medium-term', label: 'Medium term (6-12 months)' },
                  { value: 'long-term', label: 'Long term (1+ years)' },
                  { value: 'exploring', label: 'Just exploring' },
                ]}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
              <TextareaField
                label="Additional Information"
                name="message"
                value={formData.message}
                onChange={handleInputChange as any}
                placeholder="Tell us more about your requirements, preferences, or any specific questions you have..."
                rows={4}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2 space-y-3" variants={itemVariants}>
              <Checkbox
                label="Subscribe to our newsletter for market insights and exclusive opportunities"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange as any}
              />
              <Checkbox
                label="Receive updates about new projects and investment opportunities"
                name="updates"
                checked={formData.updates}
                onChange={handleInputChange as any}
              />
              <Checkbox
                label="I agree to the Privacy Policy and Terms of Service"
                name="privacy"
                checked={formData.privacy}
                onChange={handleInputChange as any}
                required
              />
              {errors.privacy && <p className="text-sm text-accent-600">{errors.privacy}</p>}
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
              <Button
                type="submit"
                className="w-full rounded-full bg-primary text-white hover:bg-primary-700 focus-visible:ring-accent-500"
                disabled={isLoading || !formData.privacy}
              >
                {isLoading ? t('common.loading') : t('actions.register')}
              </Button>
              {submitError && <p className="mt-3 text-sm text-accent-600" role="alert">{submitError}</p>}
            </motion.div>
          </form>
        </motion.div>
      </section>
      <section className="mx-auto max-w-4xl px-6 pb-8">
        <p className="text-sm text-neutral-700">
          By submitting this form you agree to our{' '}
          <a href="/privacy" className="text-primary underline">Privacy Policy</a> and{' '}
          <a href="/terms" className="text-primary underline">Terms of Service</a>.
        </p>
        {/* TODO: Implement /privacy and /terms pages or link to external URLs */}
      </section>

      {success && (
        <section className="mx-auto max-w-3xl px-6 pb-12" aria-live="polite">
          <div className="rounded-xl bg-white p-6 text-center shadow-luxury" role="status">
            <h3 className="text-xl font-semibold text-neutral-900">{t('common.success')}</h3>
            <p className="mt-2 text-neutral-700">We will contact you soon.</p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-2xl font-semibold text-neutral-900">Why Register with CALMA?</h2>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="rounded-xl bg-white p-6 shadow-luxury" variants={itemVariants}>
            <Star className="h-6 w-6 text-accent-500" />
            <h3 className="mt-3 text-lg font-semibold text-neutral-900">Exclusive Access</h3>
            <p className="mt-2 text-neutral-700">
              Be the first to know about new luxury properties and investment opportunities before they go public.
            </p>
          </motion.div>

          <motion.div className="rounded-xl bg-white p-6 shadow-luxury" variants={itemVariants}>
            <Shield className="h-6 w-6 text-accent-500" />
            <h3 className="mt-3 text-lg font-semibold text-neutral-900">Personalized Service</h3>
            <p className="mt-2 text-neutral-700">
              Receive tailored recommendations based on your preferences and investment goals.
            </p>
          </motion.div>

          <motion.div className="rounded-xl bg-white p-6 shadow-luxury" variants={itemVariants}>
            <Bell className="h-6 w-6 text-accent-500" />
            <h3 className="mt-3 text-lg font-semibold text-neutral-900">Market Insights</h3>
            <p className="mt-2 text-neutral-700">
              Get exclusive market reports, trends analysis, and investment insights from our experts.
            </p>
          </motion.div>

          <motion.div className="rounded-xl bg-white p-6 shadow-luxury" variants={itemVariants}>
            <Gift className="h-6 w-6 text-accent-500" />
            <h3 className="mt-3 text-lg font-semibold text-neutral-900">VIP Events</h3>
            <p className="mt-2 text-neutral-700">
              Invitations to exclusive property viewings, launch events, and networking opportunities.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
