import './الرئيسية.css'
import panoramaImage from '../../../assets/Backgrounds/Abou-1-p-1600.jpg'
import aboutHeaderImage from '../../../assets/Images/About/About-Header.jpg'
import brandValuesImage from '../../../assets/Images/About/Brand-Values-1.JPG'
import statsImage1 from '../../../assets/Images/About/Stats-77097-sqm.JPG'
import statsImage2 from '../../../assets/Images/About/Stats130000-sqm.JPG'
import asset1Image from '../../../assets/Images/About/Asset-1.JPG'
import asset2Image from '../../../assets/Images/About/Asset-2.JPG'
import asset3Image from '../../../assets/Images/About/Asset-3.JPG'
import asset4Image from '../../../assets/Images/About/Asset-4.JPG'
import asset5Image from '../../../assets/Images/About/Asset-5.jpg'
import asset6Image from '../../../assets/Images/About/Asset-6.JPG'
import possibilitiesIcon from '../../../assets/Icons/500000-sqm-of-possibilities-unfolding..png'
import calmaTV from '../../../assets/Videos/Calma_TV.mp4'
import { Button } from '../../../components/ui/button'
import VisionCounter from '../../../components/ui/VisionCounter'
import AnimatedNumber from '../../../components/ui/AnimatedNumber'
import { useEffect, useRef, useState } from 'react'
import { motion, circOut, easeInOut } from 'framer-motion'
import { useSplash } from '../../../components/system/SplashProvider'
import fullLockupLogo from '../../../assets/Logos/BRANDMARK_01-p-2000.png'
import { homeAr } from '@/pages/content/home.ar'
import FeaturedProjectsCarousel from '@/components/home/FeaturedProjectsCarousel'

export default function ArabicHome() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const [heroReady, setHeroReady] = useState(false)
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined)
  const { signalReady } = useSplash()

  const [currentImageSet, setCurrentImageSet] = useState(0)
  const imageSets = [
    { primary: brandValuesImage, secondary: statsImage1, tertiary: statsImage2 },
    { primary: asset1Image, secondary: asset2Image, tertiary: asset3Image },
    { primary: asset4Image, secondary: asset5Image, tertiary: asset6Image }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 1) % imageSets.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [imageSets.length])

  useEffect(() => {
    const el = heroVideoRef.current
    if (!el) return
    const onMeta = () => setHeroReady(true)
    el.addEventListener('loadedmetadata', onMeta, { once: true })
    return () => { el.removeEventListener('loadedmetadata', onMeta) }
  }, [])

  useEffect(() => {
    const el = heroVideoRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && heroReady) {
          try { el.play() } catch {}
        } else {
          try { el.pause() } catch {}
        }
      })
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [heroReady])
  useEffect(() => {
    const el = heroVideoRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !videoSrc) {
          setVideoSrc(calmaTV)
        }
      })
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [videoSrc])

  const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: circOut } } }
  const fadeInLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: circOut } } }
  const fadeInRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: circOut } } }
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } }
  const floatingAnimation = { y: [0, -10, 0], transition: { duration: 3, repeat: Infinity, ease: easeInOut } }

  return (
    <div className="home-page" dir="rtl" lang="ar">
      <motion.section 
        className="hero luxury-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-media">
          <video 
            ref={heroVideoRef}
            className="hero-video"
            src={videoSrc}
            muted
            playsInline
            preload="none"
            poster={aboutHeaderImage}
            aria-label="فيديو مقدمة كالما"
            onLoadedData={() => {
              try { heroVideoRef.current?.play() } catch {}
              signalReady()
            }}
          />
        </div>
        <div className="hero-overlay luxury-overlay" />

        <motion.div 
          className="hero-content luxury-hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          dir="rtl"
        >
          <div className="hero-badge"><span className="badge-text">CALMA REAL ESTATE</span></div>
          <h1 className="hero-title luxury-title">{homeAr.heroTitle}</h1>
          <p className="hero-subtitle luxury-subtitle">{homeAr.heroSubtitle}</p>
          <motion.button 
            className="hero-button luxury-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            اكتشف مشاريعنا
          </motion.button>
        </motion.div>
      </motion.section>

      <main className="main-content">
        <div className="container">
          <motion.section 
            className="welcome-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            dir="rtl"
          >
            <h2 className="welcome-title">إعادة تعريف مفهوم الفخامة</h2>
            <p className="welcome-description">
              في كالما، نؤمن ببناء مساحات تُلهم وترتقي بأسلوب الحياة. التزامنا بالتميّز يدفعنا لتقديم حلول عقارية استثنائية تتجاوز التوقعات وتخلق قيمة مستدامة لعملائنا.
            </p>
          </motion.section>

          <motion.section 
            id="panorama" 
            className="section panorama luxury-panorama"
            style={{ backgroundImage: `url(${panoramaImage})` }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            dir="rtl"
          >
            <div className="panorama-overlay luxury-panorama-overlay">
              <div className="panorama-content">
                <motion.img 
                  src={possibilitiesIcon}
                  alt="أيقونة الإمكانات"
                  className="vision-icon"
                  animate={floatingAnimation}
                />
                <VisionCounter target={500000} heading="حيث تأخذ الرؤية شكلها" label="متر مربع من الإمكانات" suffix="+" locale="ar" />
                <motion.div className="panorama-stats" variants={staggerContainer} dir="rtl">
                  <motion.div className="stat-item" variants={fadeInLeft}>
                    <AnimatedNumber value={28} className="stat-number" delay={300} />
                    <span className="stat-label">مشاريع محورية</span>
                  </motion.div>
                  <motion.div className="stat-item" variants={fadeInRight}>
                    <AnimatedNumber value="2000+" className="stat-number" delay={600} />
                    <span className="stat-label">سكان مخدومون</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <motion.section 
            id="about" 
            className="section luxury-about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            dir="rtl"
          >
            <div className="section-inner luxury-section-inner">
              <motion.div className="content-grid" variants={staggerContainer}>
                <motion.div className="content-text" variants={fadeInLeft}>
                  <span className="section-badge">عن كالما</span>
                  <h2 className="section-title luxury-section-title">نهندس مستقبل السكن الحضري</h2>
                  <p className="section-description">
                    في كالما، لا نطوّر عقارات فحسب؛ بل نُهندس مستقبل المعيشة الحضرية. مع 28 مشروعًا بارزًا وعدة مشاريع قيد التنفيذ، نُدمج أحدث ممارسات الاستدامة لنصنع مجتمعات تُلهم وتدوم.
                  </p>
                  <div className="content-features">
                    <div className="feature-item"><span className="feature-text">تطوير مستدام</span></div>
                    <div className="feature-item"><span className="feature-text">جودة فائقة</span></div>
                    <div className="feature-item"><span className="feature-text">ابتكار عمراني</span></div>
                  </div>
                </motion.div>
                <motion.div className="content-image" variants={fadeInRight}>
                  <img src={aboutHeaderImage} alt="تطوير كالما" className="luxury-image" loading="lazy" decoding="async" />
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            className="section content-section luxury-content-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            dir="rtl"
          >
            <div className="section-inner luxury-section-inner">
              <motion.div className="content-showcase" variants={staggerContainer}>
                <motion.div className="showcase-content" variants={fadeInLeft}>
                  <span className="section-badge gold">التميّز</span>
                  <h2 className="content-title luxury-content-title">مصمم بإتقان.<br />فريد لك.</h2>
                  <p className="content-body luxury-content-body">
                    تمثل CALMA ذروة التميز العقاري حيث تلتقي الرؤية بمعايير لا تقبل المساومة. لا نرفع الأفق العمراني فحسب، بل نرتقي بأسلوب الحياة ونبني معالم تلهم لأجيال.
                  </p>
                  <div className="excellence-highlights">
                    <div className="highlight-item"><span className="highlight-number">28+</span><span className="highlight-text">مشاريع مُسلّمة</span></div>
                    <div className="highlight-item"><span className="highlight-number">2,000+</span><span className="highlight-text">عائلات مخدومة</span></div>
                    <div className="highlight-item"><span className="highlight-number">3</span><span className="highlight-text">مدن رئيسية</span></div>
                  </div>
                  <div className="cta-row">
                    <a className="button-link" href="/ar/projects">
                      <Button variant="secondary" className="luxury-button">اكتشف مشاريعنا</Button>
                    </a>
                  </div>
                </motion.div>
                <motion.div className="showcase-images" variants={fadeInRight}>
                  <div className="image-grid">
                    <motion.img key={`primary-${currentImageSet}`} src={imageSets[currentImageSet].primary} alt="عرض التميز" className="grid-image primary" loading="lazy" decoding="async" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
                    <motion.img key={`secondary-${currentImageSet}`} src={imageSets[currentImageSet].secondary} alt="تميز التطوير" className="grid-image secondary" loading="lazy" decoding="async" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }} />
                    <motion.img key={`tertiary-${currentImageSet}`} src={imageSets[currentImageSet].tertiary} alt="ابتكار المشروع" className="grid-image tertiary" loading="lazy" decoding="async" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            className="section content-section luxury-community-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            dir="rtl"
          >
            <div className="section-inner luxury-section-inner">
              <motion.div className="community-content" variants={staggerContainer}>
                <motion.div className="community-text" variants={fadeInUp}>
                  <span className="section-badge silver">القيادة</span>
                  <h2 className="content-title luxury-content-title">قيادة رؤيوية وتقدمية</h2>
                  <p className="content-body luxury-content-body">
                    في CALMA، القيادة تتجاوز إنجاز المشاريع إلى ابتكار حلول معمارية وتقنيات رقمية تُعزز تجربة التطوير بأكملها.
                  </p>
                  <div className="community-stats">
                    <div className="community-stat"><AnimatedNumber value="77,097" className="stat-number" delay={200} /><span className="stat-label">متر مربع مساحة أرض</span></div>
                    <div className="community-stat"><AnimatedNumber value="130,000+" className="stat-number" delay={400} /><span className="stat-label">متر مربع مساحة بناء</span></div>
                    <div className="community-stat"><AnimatedNumber value="700+" className="stat-number" delay={600} /><span className="stat-label">وحدات سكنية</span></div>
                  </div>
                  <div className="cta-row">
                    <a className="button-link" href="/ar/about#leadership">
                      <Button variant="secondary" className="luxury-button">تعرف على قيادتنا</Button>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            className="section ceo-message-section luxury-ceo-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            dir="rtl"
          >
            <div className="ceo-background-container">
              <div className="ceo-main-content">
                <motion.div className="ceo-message" variants={fadeInUp}>
                  <div className="message-content">
                    <span className="section-badge platinum" style={{textAlign:'center'}}>رسالة الرئيس التنفيذي</span>
                    <h2 className="content-title luxury-content-title">حيث تجد 2,000 حلم عنوانه</h2>
                    <p className="message-greeting">أعزّاء شركائنا وسكاننا المستقبليين،</p>
                    <p>حين أسّست CALMA، رأيت فرصة لإعادة تعريف معنى المساحات التي تصنع فرقًا حقيقيًا.</p>
                    <p>مساحات تتشكّل فيها الرؤية وتزدهر الإمكانات، لتصنع قيمة دائمة للمجتمع وأصحاب المصلحة.</p>
                    <p>اليوم، ومع 28 مشروعًا مُسلّمًا عبر الرياض وجدة، نفخر بأن إنجازنا الحقيقي يُقاس بالعائلات التي وجدت في مشاريعنا وطنًا.</p>
                  </div>
                  <div className="ceo-info-side">
                    <div className="ceo-signature">
                      <img src={fullLockupLogo} alt="شعار كالما" className="ceo-logo" loading="lazy" decoding="async" style={{ imageRendering: 'crisp-edges' }} />
                      <p className="signature-name"><strong>مصعب الماجد</strong></p>
                      <p className="signature-title">الرئيس التنفيذي، CALMA</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
          <FeaturedProjectsCarousel />
        </div>
      </main>
    </div>
  )
}
