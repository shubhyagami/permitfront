import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/auth.store'
import { userApi } from '../api/user.api'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { RetroButton } from '../components/ui/RetroButton'
import { DotGrid } from '../components/patterns/DotGrid'
import toast from 'react-hot-toast'
import type { Gender } from '../types'

export function EditProfilePage() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuthStore()
  const [form, setForm] = useState({ name: '', phone: '', company: '', age: '', gender: '' as Gender | '' })
  const [saving, setSaving] = useState(false)

  useDocumentTitle('Edit Profile')

  useEffect(() => {
    if (user) setForm({ name: user.name, phone: user.phoneNumber || '', company: user.company || '', age: user.age?.toString() || '', gender: user.gender || '' })
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return
    setSaving(true)
    try {
      const updated = await userApi.updateProfile({
        name: form.name,
        phoneNumber: form.phone || null,
        company: form.company || null,
        age: form.age ? parseInt(form.age) : undefined,
        gender: form.gender || undefined,
      })
      updateUser(updated)
      toast.success('Profile updated!', { style: { borderLeft: '4px solid #00E5FF' } })
      navigate('/profile')
    } catch { toast.error('Update failed') }
    setSaving(false)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center p-4">
      <DotGrid blade />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-br-dark-card border border-br-cyan/30 rounded-3xl p-8">
          <h1 className="font-orbitron text-xl text-white tracking-wider mb-6">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="blade-label">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="blade-input w-full" required />
            </div>
            <div>
              <label className="blade-label">Phone</label>
              <input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="blade-input w-full" />
            </div>
            <div>
              <label className="blade-label">Company</label>
              <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="blade-input w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="blade-label">Age</label>
                <input type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} className="blade-input w-full" min="13" max="120" />
              </div>
              <div>
                <label className="blade-label">Gender</label>
                <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value as Gender }))} className="blade-input w-full">
                  <option value="" className="bg-br-dark">Select...</option>
                  <option value="MALE" className="bg-br-dark">Male</option>
                  <option value="FEMALE" className="bg-br-dark">Female</option>
                  <option value="OTHER" className="bg-br-dark">Other</option>
                  <option value="PREFER_NOT_TO_SAY" className="bg-br-dark">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <RetroButton type="submit" variant="blade" loading={saving} className="flex-1">Save Changes</RetroButton>
              <RetroButton variant="outline" onClick={() => navigate('/profile')} className="!text-white !border-white/20">Cancel</RetroButton>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
