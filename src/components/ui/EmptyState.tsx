import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className="text-center py-16"
    >
      <div className="flex justify-center mb-4">
        {icon || <FileText className="w-20 h-20 text-olive/30" />}
      </div>
      <h3 className="font-playfair text-xl text-navy">{title}</h3>
      {description && (
        <p className="font-worksans text-sm text-olive mt-2 max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}
