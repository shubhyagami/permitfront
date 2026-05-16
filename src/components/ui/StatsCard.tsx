import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  label: string
  value: number
  color: string
  delay?: number
  blade?: boolean
}

export function StatsCard({ label, value, color, delay = 0, blade }: Props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (value === 0) { setCount(0); return }
    const duration = 1500
    const steps = 30
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.round(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`${blade ? 'blade-card p-4' : 'retro-card p-3'}`}
    >
      <p className={`font-space text-[10px] uppercase tracking-wider ${blade ? 'text-br-cyan/60' : 'text-olive'}`}>
        {label}
      </p>
      <p className={`font-playfair font-bold text-[28px] ${color}`}>{count}</p>
    </motion.div>
  )
}
