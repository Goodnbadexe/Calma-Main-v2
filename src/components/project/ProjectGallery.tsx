import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function ProjectGallery({ images }: { images: string[] }) {
  return (
    <Section ariaLabel="Project gallery" className="bg-slate-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, i) => (
            <motion.figure key={src} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-xl">
              <img src={src} alt={`Project image ${i + 1}`} className="w-full h-64 md:h-80 object-cover" />
            </motion.figure>
          ))}
        </div>
      </Container>
    </Section>
  )
}

