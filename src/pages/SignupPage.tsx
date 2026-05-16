import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/auth.store'
import { DotGrid } from '../components/patterns/DotGrid'
import toast from 'react-hot-toast'
import type { Gender } from '../types'

export function SignupPage() {
  const navigate = useNavigate()
  const { signup, loading } = useAuthStore()
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', gender: '' as Gender | '', phone: '', company: '' })
  const [error, setError] = useState('')

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const pwStrength = () => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password || !form.age || !form.gender) {
      setError('All required fields must be filled'); return
    }
    try {
      await signup({
        name: form.name, email: form.email, password: form.password,
        age: parseInt(form.age), gender: form.gender as Gender,
        phoneNumber: form.phone || null, company: form.company || null,
      })
      toast.success('Account created! Please sign in.', { style: { borderLeft: '4px solid #00E5FF' } })
      navigate('/login')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center relative overflow-hidden p-4">
      <DotGrid blade />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-br-dark-card border border-br-cyan/30 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-orbitron text-2xl font-bold text-white tracking-wider">
              PERMIT<span className="text-br-cyan">IQ</span>
            </h1>
            <p className="font-space text-xs text-br-cyan/40 tracking-[0.2em] mt-2 uppercase">Create your account</p>
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
              <label className="blade-label">Full Name *</label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className="blade-input w-full" placeholder="John Doe" />
            </div>
            <div>
              <label className="blade-label">Email *</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="blade-input w-full" placeholder="your@email.com" />
            </div>
            <div>
              <label className="blade-label">Password *</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} className="blade-input w-full" placeholder="Min 8 characters" />
              {form.password && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                      pwStrength() >= i ? i <= 2 ? 'bg-red-500' : i === 3 ? 'bg-br-amber' : 'bg-br-cyan' : 'bg-br-cyan/10'
                    }`} />
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="blade-label">Age *</label>
                <input type="number" value={form.age} onChange={e => update('age', e.target.value)} className="blade-input w-full" placeholder="25" min="13" max="120" />
              </div>
              <div>
                <label className="blade-label">Gender *</label>
                <select value={form.gender} onChange={e => update('gender', e.target.value)} className="blade-input w-full">
                  <option value="" className="bg-br-dark">Select...</option>
                  <option value="MALE" className="bg-br-dark">Male</option>
                  <option value="FEMALE" className="bg-br-dark">Female</option>
                  <option value="OTHER" className="bg-br-dark">Other</option>
                  <option value="PREFER_NOT_TO_SAY" className="bg-br-dark">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="blade-label">Phone</label>
                <input type="text" value={form.phone} onChange={e => update('phone', e.target.value)} className="blade-input w-full" placeholder="Optional" />
              </div>
              <div>
                <label className="blade-label">Company</label>
                <input type="text" value={form.company} onChange={e => update('company', e.target.value)} className="blade-input w-full" placeholder="Optional" />
              </div>
            </div>
            <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
              className="w-full blade-btn-amber py-4 text-sm"
            >
              {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
            </motion.button>
          </form>

          <p className="text-center font-worksans text-sm text-br-cyan/50 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-br-cyan hover:text-neon-cyan transition-colors font-semibold">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
