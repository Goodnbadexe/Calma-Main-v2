import { ReactNode } from 'react'

type Props = { id?: string; ariaLabel?: string; className?: string; children: ReactNode }

export default function Section({ id, ariaLabel, className, children }: Props) {
  return (
    <section id={id} aria-label={ariaLabel} className={['py-12 md:py-20', className].filter(Boolean).join(' ')}>
      {children}
    </section>
  )
}

