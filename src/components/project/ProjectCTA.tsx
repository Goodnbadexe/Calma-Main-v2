import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import RegisterInterestButton from '@/components/register/RegisterInterestButton'

export default function ProjectCTA({ text }: { text: string }) {
  return (
    <Section ariaLabel="Call to action" className="bg-white">
      <Container>
        <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-12 flex items-center justify-between gap-6 flex-wrap">
          <p className="text-xl md:text-2xl font-light">{text}</p>
          <RegisterInterestButton label="Talk to sales" />
        </div>
      </Container>
    </Section>
  )
}
