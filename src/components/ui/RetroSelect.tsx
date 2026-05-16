import type { SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  blade?: boolean
}

export function RetroSelect({ label, blade, className = '', children, ...props }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label className={blade ? 'blade-label' : 'retro-label'}>
          {label}
        </label>
      )}
      <select
        {...props}
        className={`${blade ? 'blade-input' : 'retro-input'} ${className}`}
      >
        {children}
      </select>
    </div>
  )
}
