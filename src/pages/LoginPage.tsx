import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'
import { DotGrid } from '../components/patterns/DotGrid'
import toast from 'react-hot-toast'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, loading } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('All fields required'); return }
    try {
      await login({ email, password })
      toast.success('Welcome back!', { style: { borderLeft: '4px solid #00E5FF' } })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center relative overflow-hidden p-4">
      <DotGrid blade />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-br-dark-card border border-br-cyan/30 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-orbitron text-2xl font-bold text-white tracking-wider">
              PERMIT<span className="text-br-cyan">IQ</span>
            </h1>
            <p className="font-space text-xs text-br-cyan/40 tracking-[0.2em] mt-2 uppercase">Sign in to continue</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6"
            >
              <p className="font-space text-xs text-red-400 text-center">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="blade-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="blade-input w-full"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="blade-label">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="blade-input w-full pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-br-cyan/50 hover:text-br-cyan"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="w-full blade-btn-primary py-4 text-sm"
            >
              {loading ? 'CONNECTING...' : 'SIGN IN'}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-br-cyan/20" />
            <span className="font-space text-[10px] text-br-cyan/40 tracking-widest">OR</span>
            <div className="flex-1 border-t border-br-cyan/20" />
          </div>

          <p className="text-center font-worksans text-sm text-br-cyan/50">
            No account?{' '}
            <Link to="/signup" className="text-br-cyan hover:text-neon-cyan transition-colors font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
