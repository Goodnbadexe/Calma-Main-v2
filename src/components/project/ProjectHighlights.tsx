import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function ProjectHighlights({ items }: { items: string[] }) {
  return (
    <Section ariaLabel="Project highlights" className="bg-slate-50">
      <Container>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" aria-hidden="true" />
              <span className="text-slate-800 leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

