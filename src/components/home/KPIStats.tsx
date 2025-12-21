import AnimatedNumber from '@/components/ui/AnimatedNumber'

export default function KPIStats() {
  return (
    <section className="section kpi-section reveal-block" aria-label="Key performance indicators">
      <div className="section-inner">
        <h2 className="showcase-title">Impact By The Numbers</h2>
        <div className="kpi-grid">
          <div className="stat-item">
            <AnimatedNumber value={28} className="stat-number" delay={120} />
            <span className="stat-label">Landmark Projects</span>
          </div>
          <div className="stat-item">
            <AnimatedNumber value="77,097" className="stat-number" delay={180} />
            <span className="stat-label">Total Land Area (m²)</span>
          </div>
          <div className="stat-item">
            <AnimatedNumber value="130,000+" className="stat-number" delay={240} />
            <span className="stat-label">Built Area (m²)</span>
          </div>
          <div className="stat-item">
            <AnimatedNumber value="700+" className="stat-number" delay={300} />
            <span className="stat-label">Units Delivered</span>
          </div>
        </div>
      </div>
    </section>
  )
}

