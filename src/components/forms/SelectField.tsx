import React from 'react'

type Option = { value: string; label: string }

type Props = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Option[]
  required?: boolean
  placeholder?: string
  error?: string
  dir?: 'ltr' | 'rtl'
  className?: string
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
  placeholder,
  error,
  dir,
  className = ''
}: Props) {
  const describedById = error ? `${name}-error` : undefined
  const base =
    'block w-full rounded-xl border border-neutral-300 bg-white/90 px-4 py-3 text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-neutral-400'

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-neutral-800">
        <span className="align-middle">{label}</span>
        {required && <span className="ml-1 text-accent-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedById}
        dir={dir}
        className={`${base} ${className}`}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="text-sm text-accent-600">
          {error}
        </p>
      )}
    </div>
  )
}

