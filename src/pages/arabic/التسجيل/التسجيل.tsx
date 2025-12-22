import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTelemetry } from '@/utils/telemetry'
import { submitLead } from '@/services/api'
import SEOHead from '@/components/seo/SEOHead'
import { Check, Loader2, ArrowLeft, Building2, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroImage from '@/assets/Images/Home/Asset-1.JPG'

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
  message: string
  newsletter: boolean
  updates: boolean
  privacy: boolean
}

export default function ArabicRegister() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '', city: '', country: '',
    propertyType: '', budget: '', timeline: '', message: '',
    newsletter: false, updates: false, privacy: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { trackPerformance, trackError } = useTelemetry()

  const validate = () => {
    const next: Record<string, string> = {}
    if (!formData.firstName) next.firstName = 'الاسم الأول مطلوب'
    if (!formData.lastName) next.lastName = 'اسم العائلة مطلوب'
    if (!formData.email) next.email = 'البريد الإلكتروني مطلوب'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'يرجى إدخال بريد صحيح'
    if (!formData.privacy) next.privacy = 'يجب الموافقة على سياسة الخصوصية'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    const start = performance.now()
    try {
      await submitLead({ ...formData, locale: 'ar' })
      setSuccess(true)
      trackPerformance('register_interest', performance.now() - start, 'ms')
    } catch (err: any) {
      const msg = String(err?.message || 'فشل الإرسال')
      trackError('form_submission_error', msg)
      setErrors(prev => ({ ...prev, submit: msg === 'LEADS_API_URL_MISSING' ? 'خطأ في النظام. يرجى التواصل مع الدعم.' : 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.' }))
    } finally {
      setIsLoading(false)
    }
  }

  const InputField = ({ label, name, type = 'text', required = false, placeholder, dir = 'rtl', className }: any) => (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold text-neutral-900 mb-2 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        value={(formData as any)[name]}
        onChange={e => setFormData({ ...formData, [name]: e.target.value })}
        placeholder={placeholder}
        dir={dir}
        className={`w-full px-4 py-3 rounded-lg bg-white border text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 ${errors[name] ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 hover:border-neutral-300'}`}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-500 font-medium">{errors[name]}</p>}
    </div>
  )

  const SelectField = ({ label, name, options, className }: any) => (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold text-neutral-900 mb-2 block">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          value={(formData as any)[name]}
          onChange={e => setFormData({ ...formData, [name]: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 appearance-none pl-10 hover:border-neutral-300"
        >
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-neutral-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  )

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6" dir="rtl">
        <SEOHead title="تم التسجيل بنجاح - كالما" description="شكرًا لتسجيل اهتمامك." locale="ar" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-neutral-100"
        >
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">تم استلام طلبك</h2>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            شكرًا لتسجيل اهتمامك في كالما. سيتواصل معك فريقنا قريباً.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="w-full py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-xl transition-all duration-200"
          >
            تسجيل اهتمام آخر
          </button>
        </motion.div>
      </main>
    )
  }

  return (
    <div className="min-h-screen flex w-full bg-neutral-50 font-sans" dir="rtl">
      <SEOHead title="سجّل اهتمامك - كالما" description="انضم إلى مجتمع كالما الحصري." locale="ar" />
      
      {/* Visual Side (Right in RTL because of flex row and dir=rtl) */}
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
          <Link to="/ar" className="text-white text-3xl font-serif tracking-widest font-bold">كالما</Link>
          
          <div className="space-y-8">
            <div className="space-y-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500 inline-block ml-1" />
              ))}
            </div>
            <blockquote className="space-y-6">
              <p className="text-2xl xl:text-3xl font-medium text-white leading-tight font-serif">
                "نحن لا نبني منازل فحسب؛ نحن نصيغ أسلوب حياة تلتقي فيه الفخامة بالهدوء في تناغم تام."
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">وعد كالما</div>
                  <div className="text-neutral-400 text-sm">التميز في كل التفاصيل</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Form Side (Left in RTL) */}
      <div className="w-full lg:w-7/12 flex flex-col">
        {/* Mobile Header Image */}
        <div className="lg:hidden relative h-48 sm:h-64 bg-neutral-900">
           <img 
            src={HeroImage} 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
             <Link to="/ar" className="text-white text-2xl font-serif tracking-widest font-bold">كالما</Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6 lg:px-12 lg:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 lg:mb-10 text-center lg:text-right">
              <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-2 md:mb-4 tracking-tight font-serif">سجّل اهتمامك</h1>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl">انضم إلى قائمتنا الحصرية للحصول على أولوية الوصول إلى العقارات المميزة.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
              
              {/* Section 1: Personal Details */}
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-300">
                 <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-neutral-100 pb-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900 text-white text-base md:text-lg font-bold shadow-md">1</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900">البيانات الشخصية</h3>
                    <p className="text-neutral-500 text-xs md:text-sm mt-0.5">أخبرنا قليلاً عن نفسك</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6">
                  <InputField label="الاسم الأول" name="firstName" required placeholder="الاسم الأول" />
                  <InputField label="اسم العائلة" name="lastName" required placeholder="اسم العائلة" />
                  <InputField label="البريد الإلكتروني" name="email" type="email" required placeholder="name@example.com" dir="ltr" className="md:col-span-2" />
                  <InputField label="رقم الهاتف" name="phone" type="tel" placeholder="+966 5X XXX XXXX" dir="ltr" className="md:col-span-2" />
                </div>
              </div>

              {/* Section 2: Location */}
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-300">
                 <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-neutral-100 pb-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900 text-white text-base md:text-lg font-bold shadow-md">2</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900">الموقع</h3>
                    <p className="text-neutral-500 text-xs md:text-sm mt-0.5">أين تتواجد حالياً؟</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6">
                  <InputField label="المدينة" name="city" placeholder="المدينة" />
                  <SelectField
                    label="الدولة"
                    name="country"
                    options={[
                      { value: '', label: 'اختر الدولة' },
                      { value: 'SA', label: 'المملكة العربية السعودية' },
                      { value: 'AE', label: 'الإمارات العربية المتحدة' },
                      { value: 'QA', label: 'قطر' },
                      { value: 'KW', label: 'الكويت' },
                      { value: 'other', label: 'أخرى' },
                    ]}
                  />
                </div>
              </div>

              {/* Section 3: Preferences */}
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-300">
                 <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-neutral-100 pb-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900 text-white text-base md:text-lg font-bold shadow-md">3</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900">التفضيلات</h3>
                    <p className="text-neutral-500 text-xs md:text-sm mt-0.5">ما الذي تبحث عنه؟</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6">
                   <SelectField
                    label="نوع العقار"
                    name="propertyType"
                    options={[
                      { value: '', label: 'اختر النوع' },
                      { value: 'residential', label: 'سكني' },
                      { value: 'commercial', label: 'تجاري' },
                      { value: 'luxury-villa', label: 'فيلا فاخرة' },
                    ]}
                  />
                  <SelectField
                    label="الميزانية"
                    name="budget"
                    options={[
                      { value: '', label: 'اختر الميزانية' },
                      { value: 'under-1m', label: 'أقل من 1M$' },
                      { value: '1m-5m', label: '1M$ - 5M$' },
                      { value: 'over-5m', label: 'أكثر من 5M$' },
                    ]}
                  />
                   <SelectField
                    label="المدة الزمنية"
                    name="timeline"
                    options={[
                      { value: '', label: 'اختر المدة' },
                      { value: 'immediate', label: 'فوري' },
                      { value: 'short-term', label: '3-6 أشهر' },
                      { value: 'long-term', label: 'أكثر من سنة' },
                    ]}
                    className="md:col-span-2"
                  />
                </div>
                <div className="pt-4 md:pt-6 mt-2">
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">رسالة إضافية</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 resize-none hover:border-neutral-300 focus:bg-white"
                    placeholder="هل لديك أي متطلبات خاصة؟"
                  />
                </div>
              </div>

              {/* Footer Section */}
              <div className="bg-neutral-50 p-5 md:p-8 rounded-2xl border border-neutral-200">
                <div className="space-y-4 mb-6 md:mb-8">
                  <label className="flex items-center gap-3 cursor-pointer group select-none p-3 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all shadow-sm -mr-2">
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
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">الاشتراك في النشرة الإخبارية</span>
                  </label>

                  <label className={`flex items-center gap-3 cursor-pointer group select-none p-3 bg-white rounded-xl border transition-all shadow-sm -mr-2 ${errors.privacy ? 'border-red-300 bg-red-50/10' : 'border-neutral-200 hover:border-neutral-300'}`}>
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={formData.privacy}
                        onChange={e => setFormData({ ...formData, privacy: e.target.checked })}
                      />
                      <div className={`w-5 h-5 border-2 rounded peer-checked:bg-neutral-900 peer-checked:border-neutral-900 transition-all duration-200 ${errors.privacy ? 'border-red-500' : 'border-neutral-300'}`} />
                      <Check className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                        أوافق على <Link to="/privacy" className="font-medium underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 text-neutral-900">سياسة الخصوصية</Link>
                      </span>
                      {errors.privacy && <p className="text-xs text-red-500 font-medium mt-1">{errors.privacy}</p>}
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white text-lg font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <>
                      سجّل اهتمامك
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
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
