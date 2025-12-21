import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

type Feature = { icon: string; title: string; description: string }

export default function ProjectFeatures({ features }: { features: Feature[] }) {
  return (
    <Section ariaLabel="Project features" className="bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-slate-200 p-6 bg-white">
              <div className="flex items-start gap-4">
                <img src={f.icon} alt="" aria-hidden="true" className="h-8 w-8" />
                <div>
                  <h3 className="text-slate-900 text-lg font-medium">{f.title}</h3>
                  <p className="mt-2 text-slate-700 leading-relaxed">{f.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

