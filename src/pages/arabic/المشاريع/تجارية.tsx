import ParallaxSlider from '@/components/ui/ParallaxSlider'
import Parallax1Slider from '@/components/ui/Parallax1Slider'
import { resolveAssetUrl, resolveAssetUrls } from '@/utils/assetResolver'
import { ParallaxText, ParallaxContainer, ParallaxReveal, ParallaxBackground, ParallaxGrid } from '@/components/ui/ParallaxElements'
import '../../../styles/smooth-slider.css'

const commercialSlides = [
  {
    id: 'one-by-calma-tower',
    title: 'One By Calma Tower',
    subtitle: 'مجمع مكاتب فاخر',
    description: 'تطوير تجاري رائد في حي الياسمين مع وصول مباشر لطريق الملك سلمان. يضم برجين و76 مساحة مكتبية حديثة تلبي احتياجات الأعمال العصرية.',
    image: '/src/assets/Images/About/Asset-1.JPG',
    parallaxElements: [
      { content: 'ONE BY', speed: 0.4, position: { x: 15, y: 25 } },
      { content: 'CALMA', speed: -0.5, position: { x: 80, y: 70 } },
      { content: 'TOWER', speed: 0.6, position: { x: 10, y: 80 } }
    ]
  },
  {
    id: 'calma-tower',
    title: 'برج CALMA',
    subtitle: 'برج سكني',
    description: 'معلم سكني مميز في حي الصحافة بالقرب من شارع العليا، يضم 39 وحدة سكنية ومرافق متكاملة تشمل صالة راقية ونادٍ صحي ومسبح بإطلالة بانورامية.',
    image: '/src/assets/Images/About/Asset-2.JPG',
    parallaxElements: [
      { content: 'CALMA', speed: 0.3, position: { x: 70, y: 30 } },
      { content: 'TOWER', speed: -0.4, position: { x: 20, y: 60 } },
      { content: 'RESIDENTIAL', speed: 0.7, position: { x: 85, y: 20 } }
    ]
  }
]

export default function ArabicCommercials() {
  return (
    <main className="commercials-page" dir="rtl" lang="ar">
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="w-full">
          <Parallax1Slider
            title="المشاريع التجارية"
            description="اكتشف مشاريع CALMA التجارية في أحياء مرموقة، بأنظمة ذكية وتصميم مستدام يلبي احتياجات الأعمال الحديثة."
            features={["مواقع استراتيجية", "أنظمة مبانٍ ذكية", "تصميم معماري مستدام", "مرافق أعمال عصرية"]}
            className="w-full"
            slideCount={12}
            enableAutoPlay={true}
            autoPlayDelay={6000}
            images={resolveAssetUrls([
              '/src/assets/Images/About/Asset-1.JPG',
              '/src/assets/Images/About/Asset-2.JPG',
              '/src/assets/Images/About/Asset-3.JPG',
              '/src/assets/Images/About/Asset-4.JPG',
              '/src/assets/Images/About/Asset-5.jpg',
              '/src/assets/Images/About/Asset-6.JPG',
              '/src/assets/Images/About/Hero-1.JPG',
              '/src/assets/Images/About/Hero-2.JPG'
            ])}
          />
        </div>
      </section>

      <ParallaxSlider
        slides={commercialSlides.map(s => ({ ...s, image: resolveAssetUrl(s.image) }))}
        autoPlay={true}
        autoPlayDelay={6000}
        infinite={true}
        showControls={true}
        showDots={true}
        className="commercials-slider"
      />

      <section className="py-20 relative overflow-hidden">
        <ParallaxBackground speed={0.5} className="bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="absolute inset-0 opacity-40" />
        </ParallaxBackground>

        <ParallaxContainer className="max-w-7xl mx-auto px-8 relative">
          <div className="text-center mb-16">
            <ParallaxText speed={0.3} className="block mb-6">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800">تميز CALMA التجاري</h2>
            </ParallaxText>
            <ParallaxReveal direction="up" delay={0.2}>
              <p className="text-xl text-slate-600 leading-relaxed">
                مشاريعنا التجارية تقدّم بيئات عمل مبتكرة بمواقع مرموقة، مع أنظمة ذكية وتصميم مستدام يواكب تطلعات الأعمال.
              </p>
            </ParallaxReveal>
          </div>

          <ParallaxGrid className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <ParallaxText speed={0.1} className="block mb-4">
                <h3 className="text-2xl font-medium text-slate-800">مواقع استراتيجية</h3>
              </ParallaxText>
              <p className="text-slate-600 leading-relaxed">عقارات تجارية في أحياء حيوية مع اتصال ممتاز ورؤية بارزة.</p>
            </div>
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <ParallaxText speed={0.15} className="block mb-4">
                <h3 className="text-2xl font-medium text-slate-800">بُنى تحتية ذكية</h3>
              </ParallaxText>
              <p className="text-slate-600 leading-relaxed">أنظمة حديثة واتصال سريع وأتمتة تلائم احتياجات الأعمال.</p>
            </div>
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <ParallaxText speed={0.2} className="block mb-4">
                <h3 className="text-2xl font-medium text-slate-800">تصميم قابل للتخصيص</h3>
              </ParallaxText>
              <p className="text-slate-600 leading-relaxed">مساحات قابلة للتكيّف لتلبية متطلبات متنوعة من المكاتب إلى التجزئة.</p>
            </div>
          </ParallaxGrid>
        </ParallaxContainer>
      </section>
    </main>
  )
}
