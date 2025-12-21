import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import AnimatedNumber from '@/components/ui/AnimatedNumber'

// Import images
import heroImage1 from '@/assets/Images/About/Hero-1.JPG'
import heroImage2 from '@/assets/Images/About/Hero-2.JPG'
import visionBgImage from '@/assets/Images/About/CTA-BG.JPG'
import ceoMessageBg from '@/assets/Images/About/CTA.JPG'
import corporateCultureBg from '@/assets/Images/About/Brand-Values-1.JPG'
import brandValuesImage from '@/assets/Images/About/Brand-Values-1.JPG'
import statsImage1 from '@/assets/Images/About/Stats-77097-sqm.JPG'
import statsImage2 from '@/assets/Images/About/Stats130000-sqm.JPG'
import asset1Image from '@/assets/Images/About/Asset-1.JPG'
import asset2Image from '@/assets/Images/About/Asset-2.JPG'
import asset3Image from '@/assets/Images/About/Asset-3.JPG'
import asset4Image from '@/assets/Images/About/Asset-4.JPG'
import asset5Image from '@/assets/Images/About/Asset-5.jpg'
import asset6Image from '@/assets/Images/About/Asset-6.JPG'
import asset9Image from '@/assets/Images/About/Asset-9.JPG'
import asset12Image from '@/assets/Images/About/Asset-12.jpg'
import asset14Image from '@/assets/Images/About/Asset-14.jpg'

// Project showcase images
import ksrImage1 from '@/assets/Images/About/Calma_KSR_ex01_Final02_2025-05-28.JPG'
import ksrImage2 from '@/assets/Images/About/Calma_KSR_ex03_Final02_2025-05-28.JPG'
import ksrImage3 from '@/assets/Images/About/Calma_KSR_ex07_Final02_2025-05-28.JPG'
import ys200Image1 from '@/assets/Images/About/YS200--KALMA-2-1-1.JPG'
import ys200Image2 from '@/assets/Images/About/YS200--KALMA-2-1-3.JPG'
import ys200Image3 from '@/assets/Images/About/Asset-1.JPG'

export default function About() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const ceoRef = useRef<HTMLDivElement>(null)
  const leadershipRef = useRef<HTMLDivElement>(null)
  const cultureRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const brandValuesCardsRef = useRef<HTMLDivElement[]>([])
  const floatingElementsRef = useRef<HTMLDivElement[]>([])
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null)
  const statsCardsRef = useRef<HTMLDivElement[]>([])
  
  
  // In-view hooks for animations
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" })
  const ceoInView = useInView(ceoRef, { once: true, margin: "-100px" })
  const leadershipInView = useInView(leadershipRef, { once: true, margin: "-100px" })
  const cultureInView = useInView(cultureRef, { once: true, margin: "-100px" })
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })

  // Brand values data from documentation
  const brandValues = [
    {
      title: "Masterful Precision",
      description: "Every detail meticulously crafted. Every standard exceeded. We build distinguished projects through unwavering attention to quality at every stage of development.",
      icon: "🎯",
      image: asset1Image
    },
    {
      title: "Visionary Leadership", 
      description: "Pioneering the future of real estate. We lead with innovative architectural solutions and cutting-edge digital technologies that redefine the development experience.",
      icon: "🚀",
      image: asset2Image
    },
    {
      title: "Responsible Stewardship",
      description: "Building for tomorrow, today. Our commitment to environmentally conscious practices and resource efficiency aligns with Vision 2030's transformative environmental goals.",
      icon: "🌱",
      image: asset3Image
    },
    {
      title: "Commanding Standards",
      description: "Excellence without compromise. We ensure absolute transparency and compliance through rigorous internal audit systems and uncompromising governance standards.",
      icon: "⭐",
      image: asset4Image
    }
  ]

  // Stats data
  const statsData = [
    { number: "28", label: "Successfully Delivered Projects", suffix: "+", image: statsImage1 },
    { number: "2000", label: "Families Call Our Developments Home", suffix: "+", image: statsImage2 },
    { number: "700", label: "Housing Units Delivered", suffix: "+", image: asset5Image },
    { number: "500000", label: "SQM of Possibilities Unfolding", suffix: "", image: asset6Image }
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

  // Anime.js initialization effects
  useEffect(() => {
    // if (!anime) return

    // Luxury page entrance animation
    // anime({
    //   targets: '.about-page-container',
    //   opacity: [0, 1],
    //   translateY: [30, 0],
    //   duration: 1200,
    //   easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
    //   delay: 200
    // })

    // Floating elements animation
    // if (floatingElementsRef.current.length > 0) {
    //   anime({
    //     targets: floatingElementsRef.current,
    //     rotate: [0, 360],
    //     scale: [1, 1.1, 1],
    //     duration: 20000,
    //     easing: 'linear',
    //     loop: true,
    //     delay: (el, i) => i * 2000
    //   })
    // }
  }, [])

  // Hero section animations
  useEffect(() => {
    // if (!heroInView || !anime) return

    // Hero title animation with luxury easing
    // if (heroTitleRef.current) {
    //   anime({
    //     targets: heroTitleRef.current,
    //     opacity: [0, 1],
    //     translateY: [50, 0],
    //     scale: [0.9, 1],
    //     duration: 1000,
    //     easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
    //     delay: 300
    //   })
    // }

    // Hero subtitle animation
    // if (heroSubtitleRef.current) {
    //   anime({
    //     targets: heroSubtitleRef.current,
    //     opacity: [0, 1],
    //     translateY: [30, 0],
    //     duration: 800,
    //     easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
    //     delay: 600
    //   })
    // }
  }, [heroInView])

  // Stats cards animations
  useEffect(() => {
    // if (!visionInView || !anime || statsCardsRef.current.length === 0) return

    // anime({
    //   targets: statsCardsRef.current,
    //   opacity: [0, 1],
    //   translateY: [40, 0],
    //   scale: [0.8, 1],
    //   duration: 800,
    //   easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
    //   delay: (el, i) => 400 + (i * 150)
    // })
  }, [visionInView])

  // Brand values cards animations
  useEffect(() => {
    // if (!valuesInView || !anime || brandValuesCardsRef.current.length === 0) return

    // anime({
    //   targets: brandValuesCardsRef.current,
    //   opacity: [0, 1],
    //   translateY: [50, 0],
    //   rotateY: [15, 0],
    //   duration: 1000,
    //   easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
    //   delay: (el, i) => 300 + (i * 200)
    // })
  }, [valuesInView])

  return (
    <div className="min-h-screen about-page-container" style={{ 
      background: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)'
    }}>
      {/* Hero Section with Dynamic Gallery */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic Background Gallery */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-3 h-full">
            {heroGallery.slice(0, 3).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 1.5, delay: index * 0.2 }}
                className="relative h-full overflow-hidden"
              >
                <img 
                  src={image} 
                  alt={`Calma Project ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(7, 30, 31, 0.7), rgba(7, 30, 31, 0.5), transparent)' }} />
              </motion.div>
            ))}
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(7, 30, 31, 0.9), rgba(7, 30, 31, 0.7), rgba(7, 30, 31, 0.9))' }} />
          
          {/* Floating geometric elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              ref={(el) => {
                if (el && !floatingElementsRef.current.includes(el)) {
                  floatingElementsRef.current[0] = el
                }
              }}
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 right-20 w-32 h-32 border rounded-full"
              style={{ borderColor: 'var(--color-accent)' }}
            />
            <motion.div
              ref={(el) => {
                if (el && !floatingElementsRef.current.includes(el)) {
                  floatingElementsRef.current[1] = el
                }
              }}
              animate={{ 
                rotate: -360,
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-32 left-16 w-24 h-24 border-2 rotate-45"
              style={{ borderColor: 'var(--color-secondary)' }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-8"
          >
            <span className="inline-block px-6 py-2 rounded-full font-medium mb-6 border backdrop-blur-sm" style={{
              backgroundColor: 'rgba(var(--color-accent-rgb), 0.2)',
              color: 'var(--color-accent)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
            }}>
              Excellence in Real Estate
            </span>
            
            <h1 ref={heroTitleRef} className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              BUILDING VALUE,{' '}
              <span className="bg-gradient-to-r from-accent via-accent-light to-secondary bg-clip-text text-transparent" style={{
                background: `linear-gradient(to right, var(--color-accent), var(--color-accent-light), var(--color-secondary))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                SHAPING TOMORROW
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            ref={heroSubtitleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto"
            style={{ color: 'var(--color-accent-light)' }}
          >
            Where visionary architecture meets uncompromising excellence. We don't just build properties—we craft legacies that define skylines and transform communities across the Kingdom.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'var(--color-secondary)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              }}
            >
              DISCOVER OUR VISION
            </Button>
            <Button 
              size="lg" 
              className="border-2 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 backdrop-blur-sm"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'var(--color-neutral-100)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              VIEW PROJECTS
            </Button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {statsData.map((stat, index) => (
              <div 
                key={index} 
                ref={(el) => {
                  if (el && !statsCardsRef.current.includes(el)) {
                    statsCardsRef.current[index] = el
                  }
                }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>
                  <AnimatedNumber value={`${stat.number}${stat.suffix}`} suffix="" triggerOnView={false} />
                </div>
                <div className="text-sm leading-tight" style={{ color: 'var(--color-neutral-300)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              <div className="w-1 h-3 rounded-full mt-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Vision Section */}
      <motion.section 
        ref={visionRef}
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(rgba(7, 30, 31, 0.85), rgba(7, 30, 31, 0.85)), url(${visionBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-32 left-10 w-16 h-16 border rounded-full opacity-20"
            style={{ borderColor: 'var(--color-accent)' }}
          />
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-20 h-20 border-2 rotate-45 opacity-30"
            style={{ borderColor: 'var(--color-secondary)' }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 rounded-full font-medium mb-6 border backdrop-blur-sm" style={{
              backgroundColor: 'rgba(var(--color-accent-rgb), 0.2)',
              color: 'var(--color-accent)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
            }}>
              Our Vision
            </span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--color-neutral-100)' }}>
              OUR VISION &{' '}
              <span style={{ color: 'var(--color-accent)' }}>VISION MANIFESTO</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--color-accent-light)' }}>
              To be the defining force in Saudi Arabia's real estate renaissance—where visionary design meets strategic excellence. 
              We don't just develop properties; we architect the Kingdom's future, creating sustainable landmarks that become 
              the heartbeat of thriving communities and the foundation of generational wealth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-16"
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>
                Vision Manifesto
              </h3>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                  Every project we undertake becomes a masterpiece of modern living—where architectural brilliance 
                  converges with environmental stewardship, and where innovation becomes the catalyst for 
                  transformative growth that echoes through generations.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                  We transcend traditional development to forge lasting legacies for our stakeholders, 
                  championing the Kingdom's Vision 2030 while establishing unprecedented benchmarks 
                  in luxury real estate excellence.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                  Our vision manifesto is rooted in the belief that exceptional real estate development requires more than just construction—it demands a deep understanding of community needs, environmental responsibility, and the creation of spaces that inspire and endure for generations to come.
                </p>
              </div>
              
              {/* Vision highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-lg backdrop-blur-sm border" style={{
                  backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                  borderColor: 'rgba(var(--color-accent-rgb), 0.2)'
                }}>
                  <div className="text-2xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>2030</div>
                  <div className="text-sm" style={{ color: 'var(--color-neutral-300)' }}>Vision Alignment</div>
                </div>
                <div className="p-4 rounded-lg backdrop-blur-sm border" style={{
                  backgroundColor: 'rgba(var(--color-secondary-rgb), 0.1)',
                  borderColor: 'rgba(var(--color-secondary-rgb), 0.2)'
                }}>
                  <div className="text-2xl font-bold mb-2" style={{ color: 'var(--color-secondary)' }}>100%</div>
                  <div className="text-sm" style={{ color: 'var(--color-neutral-300)' }}>Sustainable Focus</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={visionInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative"
              >
                <img 
                  src={asset5Image} 
                  alt="Vision" 
                  className="w-full h-96 object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent rounded-lg"></div>
                
                {/* Overlay content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="p-4 rounded-lg backdrop-blur-md" style={{
                    backgroundColor: 'rgba(var(--color-primary-rgb), 0.8)'
                  }}>
                    <h4 className="font-bold mb-2" style={{ color: 'var(--color-accent)' }}>
                      Excellence in Development
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-neutral-200)' }}>
                      Creating spaces that inspire and endure
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
            
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg backdrop-blur-sm border" style={{
                  backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                  borderColor: 'rgba(var(--color-accent-rgb), 0.2)'
                }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>
                  <AnimatedNumber value={`${stat.number}${stat.suffix}`} suffix="" triggerOnView={false} />
                </div>
                <div className="text-sm md:text-base" style={{ color: 'var(--color-neutral-300)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Project Showcase Section */}
      <motion.section 
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 rounded-full font-medium mb-6 border" style={{
              backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
              color: 'var(--color-accent)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.2)'
            }}>
              Our Portfolio
            </span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>
              EXCEPTIONAL{' '}
              <span style={{ color: 'var(--color-accent)' }}>DEVELOPMENTS</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Discover our portfolio of premium developments that showcase our commitment to excellence, 
              innovation, and creating spaces that inspire.
            </p>
          </motion.div>

          {/* Project Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectGallery.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3" style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-primary)'
                    }}>
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-neutral-100)' }}>
                      {project.title}
                    </h3>
                    <div className="w-12 h-0.5 mb-3" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--color-neutral-200)' }}>
                      Exceptional design meets premium quality
                    </p>
                  </div>

                  {/* Hover icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" style={{
                    backgroundColor: 'rgba(var(--color-accent-rgb), 0.9)'
                  }}>
                    <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'var(--color-secondary)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              }}
            >
              VIEW ALL PROJECTS
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* CEO Message Section */}
      <motion.section 
        ref={ceoRef}
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(rgba(7, 30, 31, 0.9), rgba(7, 30, 31, 0.8)), url(${ceoMessageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* CEO Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={ceoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src={asset6Image} 
                  alt="CEO" 
                  className="w-full h-96 object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent rounded-lg"></div>
                
                {/* CEO Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="p-4 rounded-lg backdrop-blur-md" style={{
                    backgroundColor: 'rgba(var(--color-primary-rgb), 0.9)'
                  }}>
                    <h4 className="font-bold text-xl mb-1" style={{ color: 'var(--color-accent)' }}>
                      Musab Al-Majed
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-neutral-200)' }}>
                      Chief Executive Officer, CALMA
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 rounded-full opacity-30" style={{ borderColor: 'var(--color-accent)' }}></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 rotate-45 opacity-20" style={{ borderColor: 'var(--color-secondary)' }}></div>
            </motion.div>

            {/* CEO Message Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={ceoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-6 py-2 rounded-full font-medium mb-6 border backdrop-blur-sm" style={{
                  backgroundColor: 'rgba(var(--color-accent-rgb), 0.2)',
                  color: 'var(--color-accent)',
                  borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
                }}>
                  CEO's Message
                </span>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: 'var(--color-neutral-100)' }}>
                  WHERE 2,000 DREAMS{' '}
                  <span style={{ color: 'var(--color-accent)' }}>FIND THEIR ADDRESS</span>
                </h2>
              </div>

              <div className="text-lg leading-relaxed space-y-6" style={{ color: 'var(--color-neutral-200)' }}>
                <blockquote className="relative pl-6 border-l-4" style={{ borderColor: 'var(--color-accent)' }}>
                  <p className="italic">
                    "When I founded CALMA, I envisioned more than just a real estate development company. I saw an opportunity 
                    to redefine what it means to create spaces that truly matter – spaces where vision takes shape and where potential flourishes."
                  </p>
                </blockquote>
                
                <p>
                  Today, as I reflect on our journey of 28 successfully delivered projects across the cities of Riyadh and Jeddah, 
                  I'm reminded that our greatest achievement isn't measured in square meters or construction milestones, but in the 
                  2,000+ families who now call our developments home.
                </p>
                
                <p>
                  At CALMA, our foundation is built on unwavering reliability and proven credibility. Every project, every deadline, 
                  every promise – delivered with precision and pride. This commitment to excellence has earned us the trust of people 
                  across Saudi Arabia, and it drives everything we do as we expand our footprint across the Kingdom.
                </p>

                <p>
                  Our commitment extends beyond construction to creating lasting value for our stakeholders. We believe in transparency, 
                  innovation, and the power of strategic partnerships that drive sustainable growth and community development.
                </p>

                <p className="font-semibold" style={{ color: 'var(--color-accent-light)' }}>
                  This is more than real estate; this is the future of refined living. This is CALMA – committed to your calm.
                </p>
              </div>

              {/* Key achievements */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-lg backdrop-blur-sm border" style={{
                  backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
                  borderColor: 'rgba(var(--color-accent-rgb), 0.2)'
                }}>
                  <div className="text-2xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>28+</div>
                  <div className="text-sm" style={{ color: 'var(--color-neutral-300)' }}>Projects Delivered</div>
                </div>
                <div className="p-4 rounded-lg backdrop-blur-sm border" style={{
                  backgroundColor: 'rgba(var(--color-secondary-rgb), 0.1)',
                  borderColor: 'rgba(var(--color-secondary-rgb), 0.2)'
                }}>
                  <div className="text-2xl font-bold mb-2" style={{ color: 'var(--color-secondary)' }}>2000+</div>
                  <div className="text-sm" style={{ color: 'var(--color-neutral-300)' }}>Families Served</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Leadership Section */}
      <motion.section 
        ref={leadershipRef}
        className="py-20"
        style={{ backgroundColor: 'var(--color-neutral-100)' }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>
              VISIONARY & PROGRESSIVE LEADERSHIP
            </h2>
            <p className="text-xl mb-8" style={{ color: 'var(--color-secondary)' }}>
              BUILDING TOMORROW'S COMMUNITIES TODAY
            </p>
            <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--color-text-secondary)' }}>
              At CALMA, leadership isn't just about guiding projects to completion – it's about pioneering architectural 
              solutions and digital technologies that elevate the entire real estate development experience. Our leadership 
              team embodies the perfect balance of visionary thinking and practical execution.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={leadershipInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-left"
              >
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
                  ELEVATING MODERN SAUDI LIVING
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Our leaders combine deep market expertise with forward-thinking innovation, ensuring that every CALMA 
                  development not only meets today's standards but defines tomorrow's possibilities. With over 77,097 sqm 
                  of total land area and 130,000+ sqm of building area, we're actively shaping Saudi Arabia's urban landscape.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={leadershipInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-left"
              >
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
                  DESIGNING FUTURE-READY LIVING SPACES
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Through strategic presence in key cities and diverse project portfolios, our leadership team maintains 
                  multi-sector expertise while inspiring new destinations. We're not just following market trends – we're creating them.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Corporate Culture Section */}
      <motion.section 
        ref={cultureRef}
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(rgba(7, 30, 31, 0.9), rgba(7, 30, 31, 0.8)), url(${corporateCultureBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-accent) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, var(--color-secondary) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={cultureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 rounded-full font-medium mb-6 border backdrop-blur-sm" style={{
              backgroundColor: 'rgba(var(--color-accent-rgb), 0.2)',
              color: 'var(--color-accent)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
            }}>
              Our Culture
            </span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--color-neutral-100)' }}>
              THOUGHTFUL SPACES,{' '}
              <span style={{ color: 'var(--color-accent)' }}>LASTING VALUE</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <p className="text-xl mb-8" style={{ color: 'var(--color-accent-light)' }}>
              WHERE SOPHISTICATION FINDS ITS PEACE
            </p>
            <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--color-neutral-200)' }}>
              CALMA's corporate culture is built on the foundation that excellence isn't just an outcome – it's a way of being. 
              Our culture transforms the real estate experience from mere development to a state of tranquility, where every 
              team member contributes to creating spaces that inspire and endure.
            </p>
          </motion.div>

          {/* Culture Grid with Images */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "MASTERFUL PRECISION",
                subtitle: "IN EVERYTHING WE DO",
                description: "We believe that building distinguished projects requires meticulous attention to quality at every stage of development.",
                image: asset1Image,
                icon: "🎯"
              },
              {
                title: "EXCEPTIONAL EXPERIENCES",
                subtitle: "LASTING RELATIONSHIPS",
                description: "Our culture prioritizes exceptional customer experience and tailored solutions delivery.",
                image: asset2Image,
                icon: "🤝"
              },
              {
                title: "RESPONSIBLE STEWARDSHIP",
                subtitle: "FOR FUTURE GENERATIONS",
                description: "Environmental consciousness and Vision 2030 alignment aren't just corporate policies – they're cultural values.",
                image: asset3Image,
                icon: "🌱"
              },
              {
                title: "PERFECTION MEETS",
                subtitle: "TIMELESSNESS",
                description: "We understand that creating landmarks that inspire and endure requires a culture that values both innovation and tradition.",
                image: asset4Image,
                icon: "⭐"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={cultureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                {/* Background Image */}
                <div className="relative h-80">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/60 to-primary-900/30 group-hover:from-primary-900/95 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-3xl mb-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-accent)' }}>
                        {item.title}
                      </h3>
                      <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-accent-light)' }}>
                        {item.subtitle}
                      </h4>
                      <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                      <p className="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--color-neutral-200)' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" style={{
                    backgroundColor: 'rgba(var(--color-accent-rgb), 0.9)'
                  }}>
                    <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>+</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Culture Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cultureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="p-8 rounded-lg backdrop-blur-md border" style={{
              backgroundColor: 'rgba(var(--color-primary-rgb), 0.8)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
            }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
                Building Tomorrow's Communities Today
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                Our corporate culture isn't just about how we work – it's about how we create lasting value 
                for our communities, our partners, and the future generations who will call our developments home.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Brand Values Section */}
      <motion.section 
        ref={valuesRef}
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(rgba(7, 30, 31, 0.95), rgba(7, 30, 31, 0.9)), url(${brandValuesImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Floating geometric elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-32 w-20 h-20 border rounded-full opacity-20"
            style={{ borderColor: 'var(--color-accent)' }}
          />
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-32 left-20 w-16 h-16 border-2 rotate-45 opacity-30"
            style={{ borderColor: 'var(--color-secondary)' }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 rounded-full font-medium mb-6 border backdrop-blur-sm" style={{
              backgroundColor: 'rgba(var(--color-accent-rgb), 0.2)',
              color: 'var(--color-accent)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
            }}>
              Our Foundation
            </span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--color-neutral-100)' }}>
              BRAND{' '}
              <span style={{ color: 'var(--color-accent)' }}>VALUES</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--color-accent-light)' }}>
              Our brand values represent the core principles that define who we are and how we operate. 
              They guide our decisions, shape our culture, and ensure we consistently deliver exceptional value to our stakeholders.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandValues.map((value, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  if (el && !brandValuesCardsRef.current.includes(el)) {
                    brandValuesCardsRef.current[index] = el
                  }
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                {/* Background Image */}
                <div className="relative h-80">
                  <img 
                    src={value.image} 
                    alt={value.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/60 to-primary-900/30 group-hover:from-primary-900/95 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-4xl mb-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-accent)' }}>
                        {value.title}
                      </h3>
                      <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                      <p className="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--color-neutral-200)' }}>
                        {value.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" style={{
                    backgroundColor: 'rgba(var(--color-accent-rgb), 0.9)'
                  }}>
                    <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>+</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Values Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="max-w-3xl mx-auto p-8 rounded-lg backdrop-blur-md border" style={{
              backgroundColor: 'rgba(var(--color-primary-rgb), 0.8)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
            }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
                Values in Action
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                These values aren't just words on a wall – they're the foundation of every project we deliver, 
                every relationship we build, and every community we create.
              </p>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-accent)' }}>
              500,000 SQM OF POSSIBILITIES UNFOLDING
            </h3>
            <p className="text-lg mb-8" style={{ color: 'var(--color-neutral-200)' }}>
              We're building vibrant communities where businesses thrive and families flourish
            </p>
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'var(--color-secondary)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              }}
            >
              EXPLORE OUR PROJECTS
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Guiding Principles Section */}
      <motion.section 
        className="py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 rounded-full font-medium mb-6 border backdrop-blur-sm" style={{
              backgroundColor: 'rgba(var(--color-accent-rgb), 0.2)',
              color: 'var(--color-accent)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
            }}>
              Our Framework
            </span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--color-neutral-100)' }}>
              GUIDING{' '}
              <span style={{ color: 'var(--color-accent)' }}>PRINCIPLES</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--color-accent-light)' }}>
              These principles form the foundation of our approach to real estate development, 
              ensuring every project reflects our commitment to excellence and innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Design Excellence */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="relative p-8 rounded-lg backdrop-blur-md border transition-all duration-300 hover:shadow-2xl" style={{
                backgroundColor: 'rgba(var(--color-primary-rgb), 0.8)',
                borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
              }}>
                <div className="text-4xl mb-6" style={{ color: 'var(--color-accent)' }}>🎨</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
                  Design Excellence
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                  We believe that exceptional design is the cornerstone of memorable spaces. Our commitment to design excellence ensures that every project reflects innovative thinking, aesthetic sophistication, and functional brilliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Innovative architectural solutions that push creative boundaries</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Aesthetic sophistication that creates lasting visual impact</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Functional brilliance that enhances daily living experiences</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Technical Mastery */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="relative p-8 rounded-lg backdrop-blur-md border transition-all duration-300 hover:shadow-2xl" style={{
                backgroundColor: 'rgba(var(--color-primary-rgb), 0.8)',
                borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
              }}>
                <div className="text-4xl mb-6" style={{ color: 'var(--color-accent)' }}>⚙️</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
                  Technical Mastery
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                  Our technical expertise ensures that every project is built to the highest standards of quality, safety, and durability. We leverage cutting-edge technology and proven methodologies to deliver superior results.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Advanced construction techniques and materials</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Rigorous quality control and safety protocols</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Integration of smart building technologies</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Customer Focus */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className="relative p-8 rounded-lg backdrop-blur-md border transition-all duration-300 hover:shadow-2xl" style={{
                backgroundColor: 'rgba(var(--color-primary-rgb), 0.8)',
                borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
              }}>
                <div className="text-4xl mb-6" style={{ color: 'var(--color-accent)' }}>👥</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
                  Customer Focus
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                  Our customers are at the heart of everything we do. We are committed to understanding their needs, exceeding their expectations, and building lasting relationships based on trust and satisfaction.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Deep understanding of customer needs and preferences</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Personalized service and attention to detail</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Long-term relationships built on trust and transparency</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Sustainable Development */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className="relative p-8 rounded-lg backdrop-blur-md border transition-all duration-300 hover:shadow-2xl" style={{
                backgroundColor: 'rgba(var(--color-primary-rgb), 0.8)',
                borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
              }}>
                <div className="text-4xl mb-6" style={{ color: 'var(--color-accent)' }}>🌱</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
                  Sustainable Development
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--color-neutral-200)' }}>
                  We are committed to sustainable development practices that protect the environment, conserve resources, and create healthier communities for current and future generations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Environmentally responsible construction practices</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Energy-efficient building systems and renewable energy integration</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>•</span>
                    <span style={{ color: 'var(--color-neutral-300)' }}>Community-centered development that enhances quality of life</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Principles Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="max-w-4xl mx-auto p-8 rounded-lg backdrop-blur-md border" style={{
              backgroundColor: 'rgba(var(--color-primary-rgb), 0.8)',
              borderColor: 'rgba(var(--color-accent-rgb), 0.3)'
            }}>
              <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-accent)' }}>
                Principles in Practice
              </h3>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-neutral-200)' }}>
                These guiding principles are not just aspirational statements – they are the practical framework 
                that shapes every decision we make, from initial concept to final delivery. They ensure that 
                every CALMA project represents the highest standards of excellence, innovation, and responsibility.
              </p>
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)'
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)'
                }}
              >
                SEE OUR PRINCIPLES IN ACTION
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
