import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'

export default function ProjectIntro({ title, description }: { title: string; description: string }) {
  return (
    <Section ariaLabel="Project introduction" className="bg-white">
      <Container>
        <Heading size="3xl" className="text-slate-900">{title}</Heading>
        <p className="mt-6 text-slate-700 text-lg leading-relaxed max-w-3xl">{description}</p>
      </Container>
    </Section>
  )
}

