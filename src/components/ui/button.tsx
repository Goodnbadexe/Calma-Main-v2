import * as React from 'react'

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'default' | 'ghost' | 'secondary' | 'outline'
  size?: 'default' | 'icon' | 'sm' | 'lg'
  asChild?: boolean
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  // Base classes controlled by Button props; exclude incoming className here
  const baseClasses = [
    'inline-flex items-center justify-center',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    size === 'icon' ? 'h-9 w-9' : size === 'sm' ? 'h-8 px-3 py-1 text-sm' : size === 'lg' ? 'h-12 px-6 py-3 text-lg' : 'h-9 px-4 py-2',
    variant === 'ghost' ? 'bg-transparent' : '',
    variant === 'secondary' ? 'bg-neutral-800 text-white' : '',
    variant === 'outline' ? 'border border-gray-300 bg-transparent hover:bg-gray-50' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (asChild) {
    // Render child element but pass computed className and props along
    const { children, className: userClassName, ...rest } = props as any
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: [baseClasses, userClassName, className].filter(Boolean).join(' '),
        ...rest,
      })
    }
  }

  // Combine base classes with user-provided className
  const finalClassName = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <button
      className={finalClassName}
      {...props}
    />
  )
}

export default Button