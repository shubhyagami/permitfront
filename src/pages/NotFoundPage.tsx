import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileQuestion } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <FileQuestion className="w-24 h-24 text-br-cyan/20 mx-auto mb-6" />
        <h1 className="font-orbitron text-4xl font-black text-white tracking-wider mb-2">404</h1>
        <p className="font-space text-sm text-br-cyan/50 tracking-widest uppercase mb-2">Lost Signal</p>
        <div className="w-16 h-0.5 bg-br-cyan/50 mx-auto mb-6" />
        <p className="font-worksans text-br-cyan/40 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 blade-btn-primary px-8 py-3"
        >
          Return to Dashboard
        </Link>
      </motion.div>
    </div>
  )
}
