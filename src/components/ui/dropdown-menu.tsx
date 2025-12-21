import type { PropsWithChildren } from 'react'

export function DropdownMenu({ children }: PropsWithChildren) {
  return <details className="dropdown">{children}</details>
}

export function DropdownMenuTrigger({ children }: PropsWithChildren) {
  return <summary className="dropdown-trigger">{children}</summary>
}

export function DropdownMenuContent({ children }: PropsWithChildren) {
  return <div className="dropdown-menu">{children}</div>
}

export function DropdownMenuItem({ children }: PropsWithChildren) {
  // Use a div to allow nested links without invalid anchor nesting
  return <div className="dropdown-item">{children}</div>
}