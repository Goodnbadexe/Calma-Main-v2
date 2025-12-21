import * as React from 'react'

type DivProps = React.ComponentProps<'div'>

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card"
      className={
        [
          'bg-card text-card-foreground rounded-xl border border-primary/30 shadow-sm',
          'overflow-hidden',
          className || '',
        ].join(' ').trim()
      }
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-header"
      className={[
        'px-6 py-4 border-b border-primary/20',
        className || '',
      ].join(' ').trim()}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-title"
      className={[
        'text-lg font-semibold',
        className || '',
      ].join(' ').trim()}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-description"
      className={[
        'text-sm text-muted-foreground',
        className || '',
      ].join(' ').trim()}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-content"
      className={[
        'px-6 py-4',
        className || '',
      ].join(' ').trim()}
      {...props}
    />
  )
}

export function CardFooter({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="card-footer"
      className={[
        'px-6 py-4 border-t border-primary/20 flex items-center gap-2',
        className || '',
      ].join(' ').trim()}
      {...props}
    />
  )
}