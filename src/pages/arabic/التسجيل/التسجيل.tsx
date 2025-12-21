import { useState } from 'react'
import { motion } from 'framer-motion'
import { FormField, SelectField, TextareaField, Checkbox } from '../../../components/forms'
import Button from '../../../components/ui/button'
import SEOHead from '../../../components/seo/SEOHead'
import { useTelemetry } from '@/utils/telemetry'

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!formData.firstName) nextErrors.firstName = 'الاسم الأول مطلوب'
    if (!formData.lastName) nextErrors.lastName = 'اسم العائلة مطلوب'
    if (!formData.email) nextErrors.email = 'البريد الإلكتروني مطلوب'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'يرجى إدخال بريد صحيح'
    if (!formData.privacy) nextErrors.privacy = 'يجب الموافقة على سياسة الخصوصية'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setIsLoading(true)
    const start = performance.now()
    try {
      await new Promise(r => setTimeout(r, 2000))
      setSuccess(true)
      trackPerformance('register_interest', performance.now() - start, 'ms')
    } catch (err: any) {
      trackError('form_submission_error', String(err?.message || 'فشل الإرسال'))
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  return (
    <main className="bg-neutral-50" dir="rtl" lang="ar">
      <SEOHead
        title="سجّل اهتمامك"
        description="انضم إلى CALMA للحصول على وصول حصري إلى فرص العقارات الفاخرة وتوصيات مخصصة."
        locale="ar"
      />
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-serif text-neutral-900">سجّل اهتمامك</h1>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-700">
            انضم إلى مجتمع CALMA وكن من أوائل من يكتشف فرصنا في التطوير العقاري الفاخر.
          </p>
        </motion.div>
      </section>

      {/* Registration Form */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-neutral-900">عرّفنا بنفسك</h2>
            <p className="mt-2 text-neutral-700">ساعدنا في فهم تفضيلاتك لنقدم توصيات مُخصصة</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <motion.div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
              <FormField label="الاسم الأول" name="firstName" value={formData.firstName} onChange={handleInputChange as any} required placeholder="ادخل اسمك الأول" error={errors.firstName} />
              <FormField label="اسم العائلة" name="lastName" value={formData.lastName} onChange={handleInputChange as any} required placeholder="ادخل اسم العائلة" error={errors.lastName} />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
              <FormField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleInputChange as any} required placeholder="example@domain.com" dir="ltr" error={errors.email} />
              <FormField label="رقم الهاتف" name="phone" type="tel" value={formData.phone} onChange={handleInputChange as any} placeholder="+966 5XXXXXXXX" dir="ltr" />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
              <FormField label="المدينة" name="city" value={formData.city} onChange={handleInputChange as any} placeholder="ادخل مدينتك" />
              <SelectField
                label="الدولة"
                name="country"
                value={formData.country}
                onChange={handleInputChange as any}
                options={[
                  { value: '', label: 'اختر الدولة' },
                  { value: 'SA', label: 'المملكة العربية السعودية' },
                  { value: 'AE', label: 'الإمارات العربية المتحدة' },
                  { value: 'QA', label: 'قطر' },
                  { value: 'KW', label: 'الكويت' },
                  { value: 'BH', label: 'البحرين' },
                  { value: 'OM', label: 'عُمان' },
                  { value: 'US', label: 'الولايات المتحدة' },
                  { value: 'UK', label: 'المملكة المتحدة' },
                  { value: 'CA', label: 'كندا' },
                  { value: 'other', label: 'أخرى' },
                ]}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
              <SelectField
                label="نوع العقار المرغوب"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange as any}
                options={[
                  { value: '', label: 'اختر نوع العقار' },
                  { value: 'residential', label: 'سكني' },
                  { value: 'commercial', label: 'تجاري' },
                  { value: 'luxury-villa', label: 'فيلا فاخرة' },
                  { value: 'apartment', label: 'شقة' },
                  { value: 'penthouse', label: 'بنتهاوس' },
                  { value: 'office', label: 'مكاتب' },
                  { value: 'retail', label: 'مساحات تجارية' },
                  { value: 'mixed-use', label: 'متعدد الاستخدامات' },
                ]}
              />
              <SelectField
                label="الميزانية"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange as any}
                options={[
                  { value: '', label: 'اختر الميزانية' },
                  { value: 'under-1m', label: 'أقل من 1M$' },
                  { value: '1m-5m', label: '1M$ - 5M$' },
                  { value: '5m-10m', label: '5M$ - 10M$' },
                  { value: '10m-25m', label: '10M$ - 25M$' },
                  { value: '25m-50m', label: '25M$ - 50M$' },
                  { value: 'over-50m', label: 'أكثر من 50M$' },
                  { value: 'flexible', label: 'مرنة' },
                ]}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
              <SelectField
                label="المدة الزمنية للشراء"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange as any}
                options={[
                  { value: '', label: 'اختر المدة الزمنية' },
                  { value: 'immediate', label: 'فوري (0-3 أشهر)' },
                  { value: 'short-term', label: 'قصير (3-6 أشهر)' },
                  { value: 'medium-term', label: 'متوسط (6-12 شهرًا)' },
                  { value: 'long-term', label: 'طويل (أكثر من سنة)' },
                  { value: 'exploring', label: 'استكشاف فقط' },
                ]}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
              <TextareaField
                label="معلومات إضافية"
                name="message"
                value={formData.message}
                onChange={handleInputChange as any}
                placeholder="اذكر متطلباتك أو تفضيلاتك أو أي أسئلة ترغب بطرحها..."
                rows={4}
              />
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2 space-y-3" variants={itemVariants}>
              <Checkbox label="اشترك في النشرة للحصول على رؤى السوق وفرص حصرية" name="newsletter" checked={formData.newsletter} onChange={handleInputChange as any} />
              <Checkbox label="استقبل تحديثات حول المشاريع والفرص الاستثمارية الجديدة" name="updates" checked={formData.updates} onChange={handleInputChange as any} />
              <Checkbox label="أوافق على سياسة الخصوصية وشروط الاستخدام" name="privacy" checked={formData.privacy} onChange={handleInputChange as any} required />
              {errors.privacy && <p className="text-sm text-accent-600">{errors.privacy}</p>}
            </motion.div>

            <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
              <Button
                type="submit"
                className="w-full rounded-full bg-primary text-white hover:bg-primary-700 focus-visible:ring-accent-500"
                disabled={isLoading || !formData.privacy}
              >
                {isLoading ? 'جاري الإرسال...' : 'سجّل اهتمامك'}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </section>
      <section className="mx-auto max-w-4xl px-6 pb-8" dir="rtl" lang="ar">
        <p className="text-sm text-neutral-700">
          بإرسال هذا النموذج فإنك توافق على{' '}
          <a href="/privacy" className="text-primary underline">سياسة الخصوصية</a>{' '}
          و{' '}
          <a href="/terms" className="text-primary underline">شروط الاستخدام</a>.
        </p>
        {/* TODO: إنشاء صفحات /privacy و /terms أو ربط خارجي */}
      </section>

      {success && (
        <section className="mx-auto max-w-3xl px-6 pb-12" aria-live="polite">
          <div className="rounded-xl bg-white p-6 text-center shadow-luxury" role="status">
            <h3 className="text-xl font-semibold text-neutral-900">شكرًا لاهتمامك</h3>
            <p className="mt-2 text-neutral-700">سنتواصل معك قريبًا.</p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-center text-2xl font-semibold text-neutral-900">لماذا التسجيل مع CALMA؟</h2>
        </motion.div>
        <motion.div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div className="rounded-xl bg-white p-6 shadow-luxury" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-neutral-900">وصول حصري</h3>
            <p className="mt-2 text-neutral-700">كن أول من يعرف عن العقارات الفاخرة والفرص الاستثمارية قبل طرحها للعامة.</p>
          </motion.div>
          <motion.div className="rounded-xl bg-white p-6 shadow-luxury" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-neutral-900">خدمة مخصصة</h3>
            <p className="mt-2 text-neutral-700">احصل على توصيات مصممة وفقًا لتفضيلاتك وأهدافك الاستثمارية.</p>
          </motion.div>
          <motion.div className="rounded-xl bg-white p-6 shadow-luxury" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-neutral-900">رؤى السوق</h3>
            <p className="mt-2 text-neutral-700">تقارير حصرية وتحليلات الاتجاهات وفرص الاستثمار من خبرائنا.</p>
          </motion.div>
          <motion.div className="rounded-xl bg-white p-6 shadow-luxury" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-neutral-900">فعاليات VIP</h3>
            <p className="mt-2 text-neutral-700">دعوات لزيارات عقارية حصرية وفعاليات إطلاق ومناسبات للتواصل.</p>
          </motion.div>
    </motion.div>
  </section>

    </main>
  )
}
