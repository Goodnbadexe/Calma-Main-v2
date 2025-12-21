import { motion, circOut } from 'framer-motion'
import asset2Image from '@/assets/Images/About/Asset-2.JPG'
import asset4Image from '@/assets/Images/About/Asset-4.JPG'
import asset3Image from '@/assets/Images/About/Asset-3.JPG'
import { Button } from '@/components/ui/button'

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: circOut } } }
const fadeInLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: circOut } } }
const fadeInRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: circOut } } }
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } }

export default function Pillars() {
  return (
    <motion.section 
      className="calma-way-section section showcase-strips reveal-block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="calma-way-inner">
        <motion.div variants={fadeInUp}>
          <h2 className="calma-way-title">The Calma Way</h2>
          <p className="calma-way-subtitle">We design communities with precision, purpose, and vision.</p>
        </motion.div>
        <div className="calma-way-grid">
          <motion.div className="way-card" variants={fadeInLeft}>
            <div className="way-bg" style={{ backgroundImage: `url(${asset2Image})` }} />
            <div className="way-content">
              <h3 className="way-title">Precision</h3>
              <p className="way-text">Architected clarity in every line and join.</p>
            </div>
          </motion.div>
          <motion.div className="way-card" variants={fadeInUp}>
            <div className="way-bg" style={{ backgroundImage: `url(${asset4Image})` }} />
            <div className="way-content">
              <h3 className="way-title">Excellence</h3>
              <p className="way-text">Premium quality that endures and elevates.</p>
            </div>
          </motion.div>
          <motion.div className="way-card" variants={fadeInRight}>
            <div className="way-bg" style={{ backgroundImage: `url(${asset3Image})` }} />
            <div className="way-content">
              <h3 className="way-title">Innovation</h3>
              <p className="way-text">Thoughtful progress shaping future living.</p>
            </div>
          </motion.div>
        </div>
        <div className="cta-row">
          <a className="button-link" href="/about">
            <Button variant="secondary" className="luxury-button">
              Learn About Our Approach
            </Button>
          </a>
        </div>
      </div>
    </motion.section>
  )
}

