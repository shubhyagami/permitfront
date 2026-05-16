import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { RetroSpinner } from '../ui/RetroSpinner'

interface Props {
  onClick: () => void
  isLoading?: boolean
  disabled?: boolean
  hidden?: boolean
}

export function RetroFAB({ onClick, isLoading, disabled, hidden }: Props) {
  if (hidden) return null

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="fixed bottom-20 right-4 md:bottom-8 z-40 w-14 h-14"
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <div className="absolute inset-0 rounded-full bg-br-amber/40" />
      <div className="absolute inset-[3px] rounded-full bg-br-amber flex items-center justify-center blade-glow-amber">
        {isLoading ? (
          <RetroSpinner className="w-6 h-6 text-br-dark" />
        ) : (
          <Plus className="w-7 h-7 text-br-dark font-bold" strokeWidth={3} />
        )}
      </div>
    </motion.button>
  )
}
