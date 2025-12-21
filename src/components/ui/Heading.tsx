import { ReactNode } from 'react'

type Size = 'xl' | '2xl' | '3xl' | '4xl'

export default function Heading({ size = '3xl', children, center = false, className }: { size?: Size; children: ReactNode; center?: boolean; className?: string }) {
  const map: Record<Size, string> = {
    xl: 'text-2xl md:text-3xl',
    '2xl': 'text-3xl md:text-4xl',
    '3xl': 'text-4xl md:text-5xl',
    '4xl': 'text-5xl md:text-6xl'
  }
  return <h2 className={[map[size], center ? 'text-center' : '', 'tracking-tight font-light', className].filter(Boolean).join(' ')}>{children}</h2>
}

