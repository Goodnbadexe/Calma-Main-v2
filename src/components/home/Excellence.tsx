import { motion, circOut } from 'framer-motion'
import brandValuesImage from '@/assets/Images/About/Brand-Values-1.JPG'
import statsImage1 from '@/assets/Images/About/Stats-77097-sqm.JPG'
import statsImage2 from '@/assets/Images/About/Stats130000-sqm.JPG'
import { shuffle } from '@/utils/shuffle'
import { Button } from '@/components/ui/button'

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: circOut } },
}
const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: circOut } },
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

export default function Excellence() {
  const images = [
    { src: brandValuesImage, alt: 'Excellence Showcase', cls: 'primary', delay: 0 },
    { src: statsImage1, alt: 'Development Excellence', cls: 'secondary', delay: 0.2 },
    { src: statsImage2, alt: 'Project Innovation', cls: 'tertiary', delay: 0.4 },
  ]
  const shuffled = shuffle(images, 20251217)
  return (
    <motion.section 
      className="section content-section luxury-content-section showcase-strips reveal-block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="section-inner luxury-section-inner">
        <motion.div className="content-showcase" variants={staggerContainer}>
          <motion.div className="showcase-content" variants={fadeInLeft}>
            <span className="section-badge gold">EXCELLENCE</span>
            <h2 className="content-title luxury-content-title">
              MASTERFULLY CRAFTED.<br />
              UNIQUELY YOURS.
            </h2>
            <p className="content-body luxury-content-body">
              CALMA represents the pinnacle of real estate excellence. Where visionary development 
              meets uncompromising standards, we don't just raise skylines—we elevate lifestyles. 
              Expanding across the KSA, we set new benchmarks in luxury development, creating 
              landmarks that inspire and endure for generations.
            </p>
              <div className="excellence-highlights">
                <div className="highlight-item">
                  <span className="highlight-number">28+</span>
                  <span className="highlight-text">Delivered Projects</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">+2,000</span>
                  <span className="highlight-text">Families Served</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">3</span>
                  <span className="highlight-text">Major Cities</span>
                </div>
              </div>
            <div className="cta-row">
              <a className="button-link" href="/projects">
                <Button variant="secondary" className="luxury-button">
                  Discover Our Projects
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div className="showcase-images" variants={fadeInRight}>
            <div className="image-grid">
              {shuffled.map((img, i) => (
                <motion.img
                  key={img.alt}
                  src={img.src}
                  alt={img.alt}
                  className={`grid-image ${img.cls}`}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: img.delay }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
