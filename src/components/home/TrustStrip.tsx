import AnimatedNumber from '@/components/ui/AnimatedNumber'

export default function TrustStrip() {
  return (
    <section className="luxury-stats-showcase section showcase-strips" aria-label="Calma Trust Metrics">
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-number"><AnimatedNumber value={28} /></div>
          <div className="stat-label">Landmark Projects</div>
          <div className="stat-sublabel">Delivered across KSA</div>
        </div>
        <div className="stat-item">
          <div className="stat-number"><AnimatedNumber value={77097} /></div>
          <div className="stat-label">Total Land Area (m²)</div>
          <div className="stat-sublabel">Measured precision</div>
        </div>
        <div className="stat-item">
          <div className="stat-number"><AnimatedNumber value={130000} /></div>
          <div className="stat-label">Built Area (m²)</div>
          <div className="stat-sublabel">Crafted with intent</div>
        </div>
        <div className="stat-item">
          <div className="stat-number"><AnimatedNumber value={700} /></div>
          <div className="stat-label">Units Delivered</div>
          <div className="stat-sublabel">Families served</div>
        </div>
      </div>
    </section>
  )
}
