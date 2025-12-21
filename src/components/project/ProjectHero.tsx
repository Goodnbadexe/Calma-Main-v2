import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

export default function ProjectHero({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <header className="relative">
      <img src={image} alt={`${title} hero image`} className="w-full h-[60vh] md:h-[80vh] object-cover" />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      <Container>
        <div className="md:sticky md:top-24 lg:top-28">
          <motion.h1 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 md:mt-10 text-white text-4xl md:text-6xl font-light">
            {title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 text-white/90 text-lg md:text-xl max-w-2xl">
            {subtitle}
          </motion.p>
        </div>
      </Container>
    </header>
  )
}

