import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function ProjectCTA({ text }: { text: string }) {
  return (
    <Section ariaLabel="Call to action" className="bg-white">
      <Container>
        <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-12 flex items-center justify-between gap-6 flex-wrap">
          <p className="text-xl md:text-2xl font-light">{text}</p>
          <a href="#contact" className="inline-flex items-center rounded-full bg-white text-slate-900 px-5 py-3 text-sm md:text-base font-medium hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            Contact Us
          </a>
        </div>
      </Container>
    </Section>
  )
}

