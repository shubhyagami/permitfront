import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  show: boolean
  onClose?: () => void
  variant?: 'warning' | 'error' | 'success'
  children: ReactNode
}

const styles = {
  warning: 'bg-alert-yellow border-mustard text-navy',
  error: 'bg-alert-red border-red-500 text-red-800',
  success: 'bg-alert-green border-teal text-teal-dark',
}

export function RetroAlert({ show, onClose, variant = 'warning', children }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`border-2 rounded-xl p-3 flex items-start gap-3 ${styles[variant]}`}
        >
          <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1 font-worksans text-sm">{children}</div>
          {onClose && (
            <button onClick={onClose} className="hover:opacity-70">
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
