import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'
import { RainEffect } from '../components/patterns/RainEffect'
import { Scanlines } from '../components/patterns/Scanlines'

export function SplashPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer)
          return 100
        }
        return p + 1
      })
    }, 25)

    const timeout = setTimeout(() => {
      navigate(isAuthenticated ? '/dashboard' : '/login', { replace: true })
    }, 2800)

    return () => { clearTimeout(timeout); clearInterval(timer) }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center relative overflow-hidden">
      <RainEffect />
      <Scanlines />
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 8, stiffness: 200 }}
            className="font-orbitron text-5xl md:text-7xl font-black text-white tracking-[0.2em]"
          >
            PERMIT<span className="text-br-cyan text-neon-cyan">IQ</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="h-0.5 bg-br-cyan mx-auto mt-4 blade-glow"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="font-space text-sm text-br-cyan/50 tracking-[0.3em] mt-4 uppercase"
          >
            Document Compliance Platform
          </motion.p>
        </motion.div>

        <div className="mt-12 max-w-xs mx-auto">
          <div className="h-1 bg-br-cyan/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-br-cyan rounded-full blade-glow"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
