import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  variant?: 'danger' | 'warning'
}

export function RetroModal({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Delete', variant = 'danger' }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/60 z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-br-dark-card border border-br-cyan/30 rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full ${variant === 'danger' ? 'bg-red-500/20' : 'bg-br-amber/20'}`}>
                  <AlertTriangle className={`w-5 h-5 ${variant === 'danger' ? 'text-red-500' : 'text-br-amber'}`} />
                </div>
                <h3 className="font-playfair text-lg text-white">{title}</h3>
              </div>
              <p className="font-worksans text-sm text-br-cyan/60 mb-6">{message}</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="retro-btn-outline text-white border-white/20 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className={variant === 'danger' ? 'retro-btn-red' : 'blade-btn-amber'}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
