import { createElement } from 'react'
import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

type Level = 1 | 2 | 3 | 4 | 5 | 6

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level?: Level
}

const base = 'font-semibold tracking-tight text-neutral-900 dark:text-neutral-100'
const sizes: Record<Level, string> = {
  1: 'text-3xl md:text-4xl',
  2: 'text-2xl md:text-3xl',
  3: 'text-xl md:text-2xl',
  4: 'text-lg md:text-xl',
  5: 'text-base md:text-lg',
  6: 'text-sm md:text-base',
}

export default function Heading({ level = 2, className, children, ...props }: Props) {
  const tag = (`h${level}` as unknown) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return createElement(tag, { className: clsx(base, sizes[level], className), ...props }, children)
}
