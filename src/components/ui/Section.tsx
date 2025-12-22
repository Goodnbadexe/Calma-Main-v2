import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = HTMLAttributes<HTMLElement> & {
  max?: 'sm' | 'md' | 'lg' | 'xl'
}

const maxToClass = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
}

export default function Section({ className, children, max = 'xl', ...props }: Props) {
  return (
    <section
      className={clsx('px-4 md:px-6', className)}
      {...props}
    >
      <div className={clsx('mx-auto', maxToClass[max])}>{children}</div>
    </section>
  )
}
