import { motion, AnimatePresence } from 'framer-motion'
import { FolderOpen, Bell, RefreshCw, ChevronRight, X } from 'lucide-react'
import { WavyDivider } from '../ui/WavyDivider'

interface Props {
  isOpen: boolean
  onClose: () => void
  onUpload: () => void
  onReminders: () => void
  onRefresh: () => void
}

export function RetroFABSheet({ isOpen, onClose, onUpload, onReminders, onRefresh }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-br-dark-card rounded-t-3xl border-t border-br-cyan/30"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron text-lg text-white tracking-wider">Quick Actions</h3>
                <button onClick={onClose} className="text-br-cyan/50 hover:text-br-cyan">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <WavyDivider blade />
              {[
                { icon: FolderOpen, label: 'Upload Document', color: 'text-br-cyan', onClick: onUpload },
                { icon: Bell, label: 'Send Reminders', color: 'text-br-amber', onClick: onReminders },
                { icon: RefreshCw, label: 'Refresh Statuses', color: 'text-teal', onClick: onRefresh },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between py-4 px-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="font-worksans text-sm text-white">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-br-cyan/40" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
