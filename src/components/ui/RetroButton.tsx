import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
  variant?: 'teal' | 'mustard' | 'outline' | 'red' | 'blade' | 'blade-amber'
  disabled?: boolean
  type?: 'button' | 'submit'
  className?: string
  loading?: boolean
}

export function RetroButton({ children, onClick, variant = 'teal', disabled, type = 'button', className = '', loading }: Props) {
  const classes = {
    teal: 'retro-btn-teal',
    mustard: 'retro-btn-mustard',
    outline: 'retro-btn-outline',
    red: 'retro-btn-red',
    blade: 'blade-btn-primary',
    'blade-amber': 'blade-btn-amber',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className={`${classes[variant]} ${className} ${loading ? 'opacity-70' : ''}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <RetroSpinner className="w-4 h-4" />
          {children}
        </span>
      ) : children}
    </motion.button>
  )
}

function RetroSpinner({ className = '' }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
