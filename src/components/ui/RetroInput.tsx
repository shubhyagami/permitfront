import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  blade?: boolean
  error?: string
}

export function RetroInput({ label, blade, error, className = '', ...props }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label className={blade ? 'blade-label' : 'retro-label'}>
          {label}
        </label>
      )}
      <input
        {...props}
        className={`${blade ? 'blade-input' : 'retro-input'} ${error ? 'border-red-500' : ''} ${className}`}
      />
      {error && (
        <p className="font-space text-[10px] uppercase tracking-wider text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}
