import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Button } from '../../../components/ui/button'
import CeoPortrait from '@/components/about/CeoPortrait'
import './About-responsive.css'

// Import images
import heroImage1 from '@/assets/Images/About/Hero-1.JPG'
import heroImage2 from '@/assets/Images/About/Hero-2.JPG'
import visionBgImage from '@/assets/Images/About/CTA-BG.JPG'
import ceoMessageBg from '@/assets/Images/About/CTA.JPG'
import asset1Image from '@/assets/Images/About/Asset-1.JPG'
import asset2Image from '@/assets/Images/About/Asset-2.JPG'
import asset3Image from '@/assets/Images/About/Asset-3.JPG'
import asset4Image from '@/assets/Images/About/Asset-4.JPG'
import asset5Image from '@/assets/Images/About/Asset-5.jpg'
import asset6Image from '@/assets/Images/About/Asset-6.JPG'
import asset9Image from '@/assets/Images/About/Asset-9.JPG'
import asset12Image from '@/assets/Images/About/Asset-12.jpg'
import asset14Image from '@/assets/Images/About/Asset-14.jpg'
import TrustStrip from '@/components/home/TrustStrip'
import ProjectPreviewGrid from '@/components/home/ProjectPreviewGrid'

// Project showcase images
import ksrImage1 from '@/assets/Images/About/Calma_KSR_ex01_Final02_2025-05-28.JPG'
import ksrImage2 from '@/assets/Images/About/Calma_KSR_ex03_Final02_2025-05-28.JPG'
import ksrImage3 from '@/assets/Images/About/Calma_KSR_ex07_Final02_2025-05-28.JPG'
import ys200Image1 from '@/assets/Images/About/YS200--KALMA-2-1-1.JPG'
import ys200Image2 from '@/assets/Images/About/YS200--KALMA-2-1-3.JPG'
import ys200Image3 from '@/assets/Images/About/Asset-1.JPG'

export default function AboutImproved() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const ceoRef = useRef<HTMLDivElement>(null)
  const leadershipRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  // In-view hooks for animations
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" })
  const ceoInView = useInView(ceoRef, { once: true, margin: "-100px" })
  const leadershipInView = useInView(leadershipRef, { once: true, margin: "-100px" })
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" })

  // State for dynamic content
  const [, setCurrentImageIndex] = useState(0)

  // Brand values data from documentation
  const brandValues = [
    {
      title: "Masterful Precision",
      description: "Crafted precision at every scale.",
      image: asset1Image
    },
    {
      title: "Visionary Leadership", 
      description: "Measured progress and clear direction.",
      image: asset2Image
    },
    {
      title: "Responsible Stewardship",
      description: "Sustainability embedded with intent.",
      image: asset3Image
    },
    {
      title: "Commanding Standards",
      description: "Reliable delivery and governance.",
      image: asset4Image
    }
  ]

  // Stats data
  const statsData = [
    { number: "28", label: "Successfully Delivered Projects", suffix: "+", image: asset1Image },
    { number: "2000", label: "Families Call Our Developments Home", suffix: "+", image: asset2Image },
    { number: "700", label: "Housing Units Delivered", suffix: "+", image: asset5Image },
    { number: "500000", label: "m² of Possibilities Unfolding", suffix: "", image: asset6Image }
  ]

  // Project showcase gallery
  const projectGallery = [
    { image: ksrImage1, title: "KSR Development", category: "Residential" },
    { image: ksrImage2, title: "KSR Complex", category: "Mixed-Use" },
    { image: ksrImage3, title: "KSR Tower", category: "Commercial" },
    { image: ys200Image1, title: "YS200 Project", category: "Luxury" },
    { image: ys200Image2, title: "YS200 Amenities", category: "Lifestyle" },
    { image: ys200Image3, title: "YS200 Views", category: "Premium" }
  ]

  // Hero gallery images
  const heroGallery = [heroImage1, heroImage2, asset9Image, asset12Image, asset14Image]

  // Leadership pillars
  const leadershipPillars = [
    {
      title: "Elevating Modern Saudi Living",
      description: "Our leaders combine deep market expertise with forward-thinking innovation, ensuring that every CALMA development not only meets today's standards but defines tomorrow's possibilities.",
      image: asset2Image
    },
    {
      title: "Designing Future-Ready Living Spaces",
      description: "Through strategic presence in key cities and diverse project portfolios, our leadership team maintains multi-sector expertise while inspiring new destinations.",
      image: asset3Image
    },
    {
      title: "Crafting Distinctive Saudi Homes",
      description: "With 700+ housing units delivered and diverse residential offerings, our leadership ensures that every development becomes a living destination where communities flourish.",
      image: asset4Image
    },
    {
      title: "The Art of Purposeful Design",
      description: "Our leadership team oversees 500,000 SQM of possibilities unfolding, ensuring that every CALMA development pulses with the energy of progress and possibility.",
      image: asset5Image
    }
  ]

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroGallery.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroGallery.length])

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="hero-section"
      >
        {/* Dynamic Background Gallery */}
        <div className="hero-background">
          <div className="hero-gallery">
            {heroGallery.slice(0, 3).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 1.5, delay: index * 0.2 }}
                className="hero-gallery-item"
              >
                <img 
                  src={image} 
                  alt={`Calma Project ${index + 1}`}
                  className="hero-gallery-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-transparent" />
              </motion.div>
            ))}
          </div>
          
          <div className="hero-overlay" />
          
          {/* Floating geometric elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="floating-element absolute top-20 right-20 w-32 h-32 border border-accent rounded-full"
              style={{ y }}
            />
            <motion.div
              className="floating-element-reverse absolute bottom-32 left-16 w-24 h-24 border-2 border-secondary rotate-45"
              style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-8"
          >
            <span className="hero-badge">
              Excellence in Real Estate
            </span>
            
            <h1 className="hero-title">
              BUILDING VALUE, SHAPING TOMORROW
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            Where visionary architecture meets uncompromising excellence. We don't just build properties—we craft legacies that define skylines and transform communities across the Kingdom.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-buttons"
          >
            <Button className="hero-button-primary">
              DISCOVER OUR VISION
            </Button>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="scroll-indicator"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
            </div>
          </div>
        </motion.div>
      </motion.section>
      
      {/* Closing Section */}
      <motion.section 
        className="section closing-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Looking Ahead</h2>
          <p className="section-description">
            Aligned with Vision 2030, we continue building composed, people-first places across the Kingdom—
            shaping daily life with quiet confidence and enduring quality.
          </p>
          <div className="cta-row" style={{ textAlign: 'center' }}>
            <a className="button-link" href="/brochure">
              <Button variant="secondary" className="luxury-button">
                Learn About Our Approach
              </Button>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Impact / Stats — mid-page */}
      <TrustStrip />

      {/* Mission Section */}
      <motion.section 
        className="section mission-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <div className="dual-split-grid">
            <div className="dual-split-image">
              <img 
                src={asset12Image} 
                alt="Daily execution and delivery" 
                className="dual-image" 
                loading="lazy" 
                decoding="async" 
              />
            </div>
            <div className="dual-split-text">
              <p className="dual-split-description">
                We execute with discipline every day—clear processes, honest materials, and precise
                delivery. Our mission is reliable progress: developments that serve families, respect
                context, and work with confidence from plan to handover.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section 
        className="section our-story-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="dual-split-grid">
            <div className="dual-split-image">
              <picture>
                <source srcSet={asset9Image} type="image/jpeg" />
                <img 
                  src={asset9Image} 
                  alt="Calma team and city context" 
                  className="dual-image" 
                  loading="lazy" 
                  decoding="async" 
                />
              </picture>
            </div>
            <div className="dual-split-text">
              <span className="section-badge">OUR STORY</span>
              <h2 className="dual-split-title">Why CALMA Exists</h2>
              <p className="dual-split-description">
                CALMA was founded to bring grounded clarity to real estate development in Saudi Arabia.
                We focus on dignified, human-centered living—balancing material honesty with thoughtful
                urban design. The problem we solve is simple: projects that feel premium, work every day,
                and age with confidence within the fabric of our cities.
              </p>
              <p className="dual-split-description">
                From vision to delivery, our approach is measured, transparent, and precise. We create 
                places where families thrive and city life feels composed—quietly elevating daily routines
                through purposeful architecture and reliable execution.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section 
        ref={visionRef}
        className="section vision-section"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">VISION & VISIONARY</h2>
            <div className="dual-split-grid">
              <div className="dual-split-image">
                <img 
                  src={visionBgImage} 
                  alt="Future-focused urban context" 
                  className="dual-image" 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
              <div className="dual-split-text">
                <p className="dual-split-description">
                  We look forward—building a legacy across Saudi Arabia’s cities. Our vision
                  is measured progress: places that feel composed, enduring, and purposeful
                  within the national ambition, quietly elevating daily life for generations.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CEO Message Section */}
      <motion.section 
        ref={ceoRef}
        className="section ceo-section"
      >
        <div className="container ceo-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={ceoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title mb-12">
              A Composed Message from Our CEO
            </h2>
            
            <div className="ceo-grid">
              <div className="ceo-portrait metallic-card">
                <span className="metallic-badge">METALLIC</span>
                <CeoPortrait
                  src={asset6Image}
                  alt="Musab Al-Majed, CEO of CALMA"
                  ratio="4/3"
                />
              </div>
              <div className="ceo-text">
                <p className="ceo-message">
                  CALMA was created to build places that feel dignified and lasting. We focus on clarity, disciplined process, and quiet confidence—so every project serves people well and stands calmly within our cities.
                </p>
                <p className="ceo-message">
                  Our greatest measure is human—families who call our developments home. We deliver with precision, transparency, and respect for context, expanding across the Kingdom with composed ambition.
                </p>
                <blockquote className="ceo-quote">
                  “We build quietly confident places—crafted with intention and made to endure.”
                </blockquote>
                
                <div className="ceo-signature">
                  <div className="ceo-name">Musab Al-Majed</div>
                  <div className="ceo-title">Chief Executive Officer, CALMA</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Leadership Section */}
      <motion.section 
        ref={leadershipRef}
        className="leadership-section"
      >
        <div className="leadership-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              PROGRESSIVE LEADERSHIP
            </h2>
            <p className="section-subtitle">
              BUILDING TOMORROW'S COMMUNITIES TODAY
            </p>
            <p className="section-description">
              At CALMA, leadership isn't just about guiding projects to completion – it's about pioneering architectural solutions and digital technologies that elevate the entire real estate development experience.
            </p>
            
            <div className="leadership-grid">
              {leadershipPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`leadership-card ${index === 0 ? 'leadership-card--primary' : ''}`}
                >
                  <img src={pillar.image} alt={pillar.title} className="leadership-card-image" loading="lazy" decoding="async" />
                  <h3 className="leadership-title">{pillar.title}</h3>
                  <p className="leadership-description">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Brand Values Section */}
      <motion.section 
        ref={valuesRef}
        className="brand-values-section"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              DISTINCTIVE SPACES WITH VISION
            </h2>
            <p className="section-description">
              Our leadership philosophy centers on four core pillars that define our approach to every project and strategic decision.
            </p>
            
              <div className="brand-values-grid">
                {brandValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="brand-value-card"
                  >
                    <img 
                      src={value.image} 
                      alt={value.title}
                      className="brand-value-image"
                    />
                    <div className="brand-value-overlay">
                      <h3 className="brand-value-title">{value.title}</h3>
                      <p className="brand-value-description">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Preview (curated) */}
      <motion.section ref={galleryRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }}>
        <ProjectPreviewGrid />
      </motion.section>
    </div>
  )
}
