import { motion } from 'framer-motion'

export default function MissionVision() {
  return (
    <section className="section showcase-strips" aria-label="Mission and Vision">
      <div className="section-inner luxury-section-inner">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Mission & Vision
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: '#fff', border: '1px solid rgba(7,30,31,0.1)', borderRadius: 12, padding: '24px' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: '#071e1f', marginBottom: 12 }}>Mission</h3>
            <p style={{ fontSize: '1.05rem', color: 'rgba(7,30,31,0.85)', lineHeight: 1.7 }}>
              To craft purposeful, future-ready communities that balance material honesty, human experience, and enduring quality.
              We design with precision, build sustainably, and deliver spaces that feel timeless in the urban fabric.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: '#fff', border: '1px solid rgba(7,30,31,0.1)', borderRadius: 12, padding: '24px' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: '#071e1f', marginBottom: 12 }}>Vision</h3>
            <p style={{ fontSize: '1.05rem', color: 'rgba(7,30,31,0.85)', lineHeight: 1.7 }}>
              To set new benchmarks in modern living across KSA — integrating sustainability, elegant design, and innovation in line with Vision 2030.
              Where every development inspires, endures, and elevates daily life.
            </p>
          </motion.div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginTop: 32 }}>
          {[
            { title: 'Sustainability', text: 'Energy-conscious systems and responsible stewardship embedded in design.' },
            { title: 'Timelessness', text: 'Material honesty and crafted details that age with grace.' },
            { title: 'Urban Innovation', text: 'Thoughtful progress shaping future-ready living in the city.' },
          ].map((item) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: '#f8f9fa', border: '1px solid rgba(7,30,31,0.08)', borderRadius: 12, padding: '20px' }}
            >
              <h4 style={{ fontSize: '1.1rem', color: '#071e1f', marginBottom: 8 }}>{item.title}</h4>
              <p style={{ fontSize: '0.95rem', color: '#4a4a4a', lineHeight: 1.6 }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
