import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import homeImpactImage from '@/assets/Images/Home/Calma_KSR_ex03_Final02_2025-05-28.JPG'
import aboutHeaderImage from '@/assets/Images/About/About-Header.jpg'

//import React from 'react'
import { motion, circOut } from 'framer-motion'
import anime from 'animejs'
import { useSplash } from '@/components/system/SplashProvider'

import calmaTV from '@/assets/Videos/Calma_TV.mp4'
import { homeEn } from '@/pages/content/home.en'
import './Home.css'

import FeaturedProjectsCarousel from '@/components/home/FeaturedProjectsCarousel'
import TrustStrip from '@/components/home/TrustStrip'
import ProjectPreviewGrid from '@/components/home/ProjectPreviewGrid'
import MissionVision from '@/components/home/MissionVision'
import AboutCalma from '@/components/home/AboutCalma'
import Excellence from '@/components/home/Excellence'
import Pillars from '@/components/home/Pillars'
import KPIStats from '@/components/home/KPIStats'
import TestimonialsBand from '@/components/home/TestimonialsBand'

export default function EnglishHome() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const [heroReady, setHeroReady] = useState(false)
  const [videoSrc, setVideoSrc] = useState<string | undefined>(calmaTV)
  const [contentVisible, setContentVisible] = useState(false)
  // keep src stable; signal splash readiness on media load
  const { signalReady } = useSplash()
  const showMicroContent = true

  useEffect(() => {
    const el = heroVideoRef.current
    if (!el) return
    const onMeta = () => setHeroReady(true)
    el.addEventListener('loadedmetadata', onMeta, { once: true })
    return () => { el.removeEventListener('loadedmetadata', onMeta) }
  }, [])

  useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setContentVisible(true)
      return
    }
    if (!heroReady) return
    setContentVisible(true)
    anime.timeline({ easing: 'easeOutQuad', duration: 500 })
      .add({
        targets: '.luxury-hero-content',
        opacity: [0, 1],
        translateY: [16, 0],
      })
      .add({
        targets: '.reveal-block',
        opacity: [0, 1],
        translateY: [8, 0],
        delay: anime.stagger(120),
      })
  }, [heroReady])
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
  useEffect(() => {
    const id = setTimeout(() => {
      if (!contentVisible) setContentVisible(true)
    }, 1500)
    return () => clearTimeout(id)
  }, [contentVisible])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: circOut }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: circOut }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: circOut }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section with Video */}
      <motion.section 
        className="hero luxury-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
      >
        {/* Background video */}
        <div className="hero-media">
          <video 
            ref={heroVideoRef}
            className="hero-video"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={aboutHeaderImage}
            aria-label="Calma TV hero video"
            onLoadedData={() => {
              try { heroVideoRef.current?.play() } catch {}
              signalReady()
            }}
          />
        </div>
        <div className="hero-overlay luxury-overlay" />

        {/* Hero content */}
        <motion.div 
          className="hero-content luxury-hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="hero-badge"><span className="badge-text">CALMA REAL ESTATE</span></div>
          <h1 className="hero-title luxury-title animate-fade-in-up">{homeEn.heroTitle}</h1>
          <p className="hero-subtitle luxury-subtitle animate-fade-in-up">
            {homeEn.heroSubtitle}
          </p>
          <div className="hero-actions">
            <motion.a 
              href="/projects"
              className="button-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hero-button luxury-button">Explore Our Projects</span>
            </motion.a>
            <motion.a 
              href="/brochure"
              className="button-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hero-button-secondary">Get Brochure</span>
            </motion.a>
          </div>
        </motion.div>
        <div className="scroll-cue" aria-hidden="true">
          <span className="scroll-cue-dot" />
        </div>
      </motion.section>

      {/* Redefining Luxury Living — Dual Split (placed directly below hero) */}
      <motion.section 
        className="dual-split section showcase-strips"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="dual-split-grid">
          <motion.div className="dual-split-text" variants={fadeInLeft}>
            <h2 className="dual-split-title">Redefining Luxury Living</h2>
            <p className="dual-split-description">
              We ground bold vision in crafted realism — designing spaces that feel poetic yet purposeful.
              Every decision balances material truth with human experience.
            </p>
            <div className="cta-row">
              <a className="button-link" href="/projects">
                <Button variant="secondary" className="luxury-button">
                  Explore Our Projects
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="dual-split-image" 
            variants={fadeInRight}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <picture>
              <source srcSet={homeImpactImage} type="image/jpeg" />
              <img src={homeImpactImage} alt="Calma impact" className="dual-image" loading="lazy" decoding="async" width={1600} height={1200} />
            </picture>
          </motion.div>
        </div>
        {showMicroContent && (
          <motion.div className="micro-tagline" variants={fadeInUp}>
            Designed for elegant living.
          </motion.div>
        )}
      </motion.section>

      <main className={`main-content ${contentVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
        <AboutCalma />
        <Excellence />
        <Pillars />
        <MissionVision />
        <KPIStats />
        {/* Temporarily hide cluttered band to streamline home page */}
        <TrustStrip />
        <TestimonialsBand />
        <ProjectPreviewGrid />
      </main>
    </div>
  )
}
