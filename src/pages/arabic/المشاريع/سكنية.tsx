import ParallaxSlider from '@/components/ui/ParallaxSlider'
import Parallax1Slider from '@/components/ui/Parallax1Slider'
import { resolveAssetUrl, resolveAssetUrls } from '@/utils/assetResolver'
import { ParallaxText, ParallaxContainer, ParallaxReveal, ParallaxBackground, ParallaxGrid } from '@/components/ui/ParallaxElements'
import '../../../styles/smooth-slider.css'

const residentialSlides = [
  {
    id: 'calma-nr100',
    title: 'CALMA NR100',
    subtitle: 'معلم سكني بارز',
    description: 'مشروع سكني بارز في حي النرجس يضم 112 وحدة بتشطيبات دقيقة وواجهات أنيقة ومعايير بناء عالية.',
    image: '/src/assets/Images/About/Asset-1_1.JPG',
    parallaxElements: [
      { content: 'NR100', speed: 0.5, position: { x: 10, y: 20 } }
    ]
  }
]

export default function ArabicResidential() {
  return (
    <main className="residential-page" dir="rtl" lang="ar">
      <section className="w-full">
        <Parallax1Slider 
          title="المشاريع السكنية"
          description="اكتشف مشاريع CALMA السكنية في أحياء مرموقة بالرياض بمعايير بناء متقدمة وتشطيبات دقيقة."
          features={["جودة بناء عالية", "تشطيبات دقيقة", "واجهات معمارية جميلة", "مواقع استراتيجية"]}
          className="min-h-screen flex flex-col justify-center"
          slideCount={12}
          enableAutoPlay={true}
          autoPlayDelay={6000}
          images={resolveAssetUrls([
            '/src/assets/Images/About/Asset-1_1.JPG',
            '/src/assets/Images/About/Asset-2_1.JPG',
            '/src/assets/Images/About/Asset-3_1.JPG',
            '/src/assets/Images/About/Asset-4_1.JPG',
            '/src/assets/Images/About/Asset-5_1.jpg'
          ])}
        />
      </section>

      <ParallaxSlider
        slides={residentialSlides.map(s => ({ ...s, image: resolveAssetUrl(s.image) }))}
        autoPlay={true}
        autoPlayDelay={6000}
        infinite={true}
        showControls={true}
        showDots={true}
        className="residential-slider"
      />

      <section className="py-20 relative overflow-hidden">
        <ParallaxBackground speed={0.5} className="bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="absolute inset-0 opacity-40" />
        </ParallaxBackground>

        <ParallaxContainer className="max-w-7xl mx-auto px-8 relative">
          <div className="text-center mb-16">
            <ParallaxText speed={0.3} className="block mb-6">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800">تميز CALMA السكني</h2>
            </ParallaxText>
            <ParallaxReveal direction="up" delay={0.2}>
              <p className="text-xl text-slate-600 leading-relaxed">
                نقدم مساكن مصممة بعناية في مواقع مختارة بعناية، تجمع بين الجودة العالية وجمال التفاصيل.
              </p>
            </ParallaxReveal>
          </div>

          <ParallaxGrid className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <ParallaxText speed={0.1} className="block mb-4">
                <h3 className="text-2xl font-medium text-slate-800">تصميم مخصص</h3>
              </ParallaxText>
              <p className="text-slate-600 leading-relaxed">تشطيبات مُصممة بعناية لتناسب أسلوب حياتك.</p>
            </div>
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <ParallaxText speed={0.15} className="block mb-4">
                <h3 className="text-2xl font-medium text-slate-800">مواقع مميزة</h3>
              </ParallaxText>
              <p className="text-slate-600 leading-relaxed">قرب من الوجهات الحيوية والخدمات.</p>
            </div>
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <ParallaxText speed={0.2} className="block mb-4">
                <h3 className="text-2xl font-medium text-slate-800">استدامة</h3>
              </ParallaxText>
              <p className="text-slate-600 leading-relaxed">أنظمة فعالة ومواد مستدامة وتقنيات مبتكرة.</p>
            </div>
          </ParallaxGrid>
        </ParallaxContainer>
      </section>
    </main>
  )
}
