import React from 'react'

type Props = {
  label: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  description?: string
  className?: string
}

export default function Checkbox({
  label,
  name,
  checked,
  onChange,
  required,
  description,
  className = ''
}: Props) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <span className="relative mt-1">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          className="peer appearance-none h-5 w-5 rounded-md border border-neutral-400 bg-white checked:bg-accent-500 checked:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
        <span className="pointer-events-none absolute inset-0 grid place-items-center text-white">
          <svg
            className="h-3 w-3 opacity-0 peer-checked:opacity-100"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.5a1 1 0 0 1-1.42.006l-3.5-3.5a1 1 0 1 1 1.414-1.414l2.793 2.793 6.793-6.793a1 1 0 0 1 1.414-.006Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </span>
      <span className="flex-1">
        <span className="text-sm font-medium text-neutral-800">{label}</span>
        {required && <span className="ml-1 text-accent-500">*</span>}
        {description && <div className="text-sm text-neutral-600">{description}</div>}
      </span>
    </label>
  )
}

