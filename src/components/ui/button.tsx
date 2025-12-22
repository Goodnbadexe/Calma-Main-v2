import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'primary' | 'secondary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size
  variant?: Variant
  loading?: boolean
}

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}
const variants: Record<Variant, string> = {
  primary:
    'bg-black text-white hover:bg-neutral-800 focus-visible:ring-black ring-offset-white dark:ring-offset-black',
  secondary:
    'bg-white text-black border border-neutral-200 hover:bg-neutral-100 focus-visible:ring-neutral-400 ring-offset-white dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800',
  ghost:
    'bg-transparent text-black hover:bg-neutral-100 focus-visible:ring-neutral-300 ring-offset-white dark:text-white dark:hover:bg-neutral-800',
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { size = 'md', variant = 'primary', loading, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(base, sizes[size], variants[variant], className)}
      aria-busy={loading || undefined}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
