import React from 'react'

type Props = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
  error?: string
  dir?: 'ltr' | 'rtl'
  className?: string
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
  error,
  dir,
  className = ''
}: Props) {
  const describedById = error ? `${name}-error` : undefined
  const base =
    'block w-full rounded-xl border border-neutral-300 bg-white/90 px-4 py-3 text-neutral-900 placeholder-neutral-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-neutral-400'

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-neutral-800">
        <span className="align-middle">{label}</span>
        {required && <span className="ml-1 text-accent-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedById}
        dir={dir}
        className={`${base} ${className}`}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-accent-600">
          {error}
        </p>
      )}
    </div>
  )
}

