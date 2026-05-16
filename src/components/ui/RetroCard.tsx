import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  blade?: boolean
  className?: string
  delay?: number
}

export function RetroCard({ children, blade, className = '', delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`${blade ? 'blade-card' : 'retro-card'} ${className}`}
    >
      {children}
    </motion.div>
  )
}
