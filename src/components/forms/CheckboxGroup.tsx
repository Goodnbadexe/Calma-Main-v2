import React from 'react'
import Checkbox from './Checkbox'

type Item = {
  label: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  description?: string
}

type Props = {
  title?: string
  items: Item[]
  className?: string
}

export default function CheckboxGroup({ title, items, className = '' }: Props) {
  return (
    <div className={`space-y-3 ${className}`}>
      {title && <div className="text-sm font-semibold text-neutral-800">{title}</div>}
      {items.map((item) => (
        <Checkbox key={item.name} {...item} />
      ))}
    </div>
  )
}

