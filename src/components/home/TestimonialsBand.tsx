import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'A. Al-Faisal',
    role: 'Homeowner, Riyadh',
    quote: 'Calma delivered more than a residence — it delivered a feeling of belonging.',
  },
  {
    name: 'N. Al-Saud',
    role: 'Investor, Jeddah',
    quote: 'Precision and trust at every milestone. The experience felt premium and effortless.',
  },
  {
    name: 'R. Al-Harbi',
    role: 'Resident, KSA',
    quote: 'Thoughtful spaces, timeless details, and a community that truly feels alive.',
  },
]

export default function TestimonialsBand() {
  return (
    <section className="section showcase-strips" aria-label="Testimonials">
      <div className="section-inner luxury-section-inner">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Stories From Our Community
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '24px', width: '100%' }}>
          {testimonials.map((t) => (
            <motion.figure 
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: '#fff',
                border: '1px solid rgba(7,30,31,0.1)',
                borderRadius: 12,
                padding: '24px',
                boxShadow: '0 8px 24px rgba(7,30,31,0.08)',
              }}
            >
              <blockquote style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(7,30,31,0.85)', marginBottom: 12 }}>
                “{t.quote}”
              </blockquote>
              <figcaption style={{ fontSize: '0.95rem', color: '#63523d', fontWeight: 600 }}>
                {t.name} · <span style={{ fontWeight: 500, color: '#8b7355' }}>{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
