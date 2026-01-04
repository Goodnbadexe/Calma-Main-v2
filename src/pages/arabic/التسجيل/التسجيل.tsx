import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTelemetry } from '@/utils/telemetry'
import { submitLead } from '@/services/api'
import { isValidEmail } from '@/utils/validation-arabic'
import SEOHead from '@/components/seo/SEOHead'
import { Check, Loader2, ArrowRight, Building2, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroImage from '@/assets/Images/Home/Asset-1.JPG'

// Standardized form options
const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'luxury-villa', label: 'Luxury Villa' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail' },
  { value: 'mixed-use', label: 'Mixed Use' },
]

const BUDGET_RANGES = [
  { value: 'under-1m', label: 'Under $1M' },
  { value: '1m-5m', label: '$1M - $5M' },
  { value: '5m-10m', label: '$5M - $10M' },
  { value: '10m-25m', label: '$10M - $25M' },
  { value: '25m-50m', label: '$25M - $50M' },
  { value: 'over-50m', label: 'Over $50M' },
  { value: 'flexible', label: 'Flexible' },
]

const TIMELINES = [
  { value: 'immediate', label: 'Immediate (0-3 months)' },
  { value: 'short-term', label: 'Short Term (3-6 months)' },
  { value: 'medium-term', label: 'Medium Term (6-12 months)' },
  { value: 'long-term', label: 'Long Term (1+ year)' },
  { value: 'exploring', label: 'Just Exploring' },
]

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  country: string
  propertyType: string
  budget: string
  timeline: string
  additionalInfo: string
  newsletter: boolean
  updates: boolean
  agreeToTerms: boolean
  hp?: string
}

export default function Register() {
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
    additionalInfo: '',
    newsletter: false,
    updates: false,
    agreeToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cooldown, setCooldown] = useState(false)
  const { trackPerformance, trackError } = useTelemetry()

  const setField = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value } as any))
    validateField(name, value as any)
  }

  const validateField = (name: string, value: string) => {
    setErrors(prev => {
      const next = { ...prev }
      if (name === 'firstName' && !value) next.firstName = 'First name is required'
      if (name === 'lastName' && !value) next.lastName = 'Last name is required'
      if (name === 'email') {
        if (!value) next.email = 'Email is required'
        else if (!isValidEmail(value)) next.email = 'Enter a valid email'
        else delete next.email
      }
      if (name === 'agreeToTerms') {
        if (!value) next.agreeToTerms = 'You must agree to the Privacy Policy'
        else delete next.agreeToTerms
      }
      if (name === 'firstName' && value) delete next.firstName
      if (name === 'lastName' && value) delete next.lastName
      return next
    })
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!formData.firstName) next.firstName = 'First name is required'
    if (!formData.lastName) next.lastName = 'Last name is required'
    if (!formData.email) next.email = 'Email is required'
    if (formData.email && !isValidEmail(formData.email)) next.email = 'Enter a valid email'
    if (!formData.agreeToTerms) next.agreeToTerms = 'You must agree to the Privacy Policy'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.hp) return
    if (!validate()) return
    setLoading(true)
    setCooldown(true)
    const start = performance.now()
    try {
      await submitLead({ ...formData, locale: 'en' })
      setSubmitted(true)
      trackPerformance('register_interest', performance.now() - start, 'ms')
    } catch (err: any) {
      const msg = String(err?.message || 'Submission failed')
      trackError('form_submission_error', msg)
      setErrors(prev => ({ ...prev, submit: msg === 'LEADS_API_URL_MISSING' ? 'System configuration error. Please contact support.' : 'Failed to submit. Please try again.' }))
    } finally {
      setLoading(false)
      setTimeout(() => setCooldown(false), 2000)
    }
  }

  const InputField = ({ label, name, type = 'text', required = false, placeholder, className }: any) => (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold text-neutral-900 mb-2 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        value={(formData as any)[name]}
        onChange={e => setField(name, e.target.value)}
        onBlur={e => validateField(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-white border text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 ${errors[name] ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 hover:border-neutral-300'}`}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-500 font-medium">{errors[name]}</p>}
    </div>
  )

  const SelectField = ({ label, name, options, required = false, className }: any) => (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold text-neutral-900 mb-2 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          value={(formData as any)[name]}
          onChange={e => setField(name, e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 appearance-none pr-10 hover:border-neutral-300"
        >
          <option value="">Select...</option>
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  )

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
        <SEOHead title="Registration Successful - CALMA" description="Thank you for registering." locale="en" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-neutral-100"
        >
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">You're on the list</h2>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            Thank you for registering your interest in CALMA. Our concierge team will be in touch with you shortly.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-xl transition-all duration-200"
          >
            Register another interest
          </button>
        </motion.div>
      </main>
    )
  }

  return (
    <div className="min-h-screen flex w-full bg-neutral-50 font-sans">
      <SEOHead title="Register Your Interest - CALMA" description="Join the exclusive CALMA community." locale="en" />
      
      {/* Left Side - Visual & Testimonial (Desktop Only) */}
      <div className="hidden lg:flex w-5/12 relative bg-neutral-900 overflow-hidden sticky top-0 h-screen">
        <div className="absolute inset-0">
          <img 
            src={HeroImage} 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 xl:p-16">
          <Link to="/" className="text-white text-3xl font-serif tracking-widest font-bold">CALMA</Link>
          
          <div className="space-y-8">
            <div className="space-y-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500 inline-block mr-1" />
              ))}
            </div>
            <blockquote className="space-y-6">
              <p className="text-2xl xl:text-3xl font-medium text-white leading-tight font-serif italic">
                "We don't just build homes; we curate lifestyles where luxury meets tranquility in perfect harmony."
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">The CALMA Promise</div>
                  <div className="text-neutral-400 text-sm">Excellence in every detail</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-7/12 flex flex-col">
        {/* Mobile Header Image */}
        <div className="lg:hidden relative h-48 sm:h-64 bg-neutral-900">
           <img 
            src={HeroImage} 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
             <Link to="/" className="text-white text-2xl font-serif tracking-widest font-bold">CALMA</Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6 lg:px-12 lg:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 lg:mb-10 text-center lg:text-left">
              <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-2 md:mb-4 tracking-tight font-serif">Register Interest</h1>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl">Join our exclusive list for early access to premium properties and tailored investment opportunities.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
              
              {/* Section 1: Personal Details */}
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-neutral-100 pb-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900 text-white text-base md:text-lg font-bold shadow-md">1</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900">Personal Details</h3>
                    <p className="text-neutral-500 text-xs md:text-sm mt-0.5">Tell us a bit about yourself</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6">
                  <InputField label="First Name" name="firstName" required placeholder="John" />
                  <InputField label="Last Name" name="lastName" required placeholder="Doe" />
                  <InputField label="Email Address" name="email" type="email" required placeholder="john@example.com" className="md:col-span-2" />
                  <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="md:col-span-2" />
                </div>
              </div>

              {/* Section 2: Location */}
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-neutral-100 pb-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900 text-white text-base md:text-lg font-bold shadow-md">2</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900">Location</h3>
                    <p className="text-neutral-500 text-xs md:text-sm mt-0.5">Where are you located?</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6">
                  <InputField label="City" name="city" placeholder="New York" />
                  <InputField label="Country" name="country" placeholder="USA" />
                </div>
              </div>

              {/* Section 3: Preferences */}
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-neutral-100 pb-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900 text-white text-base md:text-lg font-bold shadow-md">3</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900">Preferences</h3>
                    <p className="text-neutral-500 text-xs md:text-sm mt-0.5">What are you looking for?</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6">
                  <SelectField label="Property Type" name="propertyType" options={PROPERTY_TYPES} />
                  <SelectField label="Budget Range" name="budget" options={BUDGET_RANGES} />
                  <SelectField label="Timeline" name="timeline" options={TIMELINES} className="md:col-span-2" />
                </div>
                <div className="pt-4 md:pt-6 mt-2">
                   <label className="block text-sm font-semibold text-neutral-900 mb-2">Additional Information</label>
                   <textarea
                    value={formData.additionalInfo}
                    onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 resize-none hover:border-neutral-300 focus:bg-white"
                    placeholder="Tell us more about your specific requirements..."
                  />
                </div>
              </div>

              {/* Footer Section */}
              <div className="bg-neutral-50 p-5 md:p-8 rounded-2xl border border-neutral-200">
                <div className="space-y-4 mb-6 md:mb-8">
                  <label className="flex items-center gap-3 cursor-pointer group select-none p-3 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all shadow-sm">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={formData.newsletter}
                        onChange={e => setFormData({ ...formData, newsletter: e.target.checked })}
                      />
                      <div className="w-5 h-5 border-2 border-neutral-300 rounded peer-checked:bg-neutral-900 peer-checked:border-neutral-900 transition-all duration-200" />
                      <Check className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                    </div>
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Subscribe to our newsletter for market insights</span>
                  </label>

                  <label className={`flex items-center gap-3 cursor-pointer group select-none p-3 bg-white rounded-xl border transition-all shadow-sm ${errors.agreeToTerms ? 'border-red-300 bg-red-50/10' : 'border-neutral-200 hover:border-neutral-300'}`}>
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={formData.agreeToTerms}
                        onChange={e => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      />
                      <div className={`w-5 h-5 border-2 rounded peer-checked:bg-neutral-900 peer-checked:border-neutral-900 transition-all duration-200 ${errors.agreeToTerms ? 'border-red-500' : 'border-neutral-300'}`} />
                      <Check className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                        I agree to the <Link to="/privacy" className="font-medium underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 text-neutral-900">Privacy Policy</Link> and <Link to="/terms" className="font-medium underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 text-neutral-900">Terms of Service</Link>
                      </span>
                      {errors.agreeToTerms && <p className="text-xs text-red-500 font-medium mt-1">{errors.agreeToTerms}</p>}
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || cooldown}
                  className="group w-full flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white text-lg font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <>
                      Register Interest
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <div aria-live="polite" className="sr-only">
                  {loading ? 'Submitting' : submitted ? 'Submitted successfully' : errors.submit ? errors.submit : ''}
                </div>
                {errors.submit && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium"
                  >
                    {errors.submit}
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
