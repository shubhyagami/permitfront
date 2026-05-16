import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Shield, Settings, Upload, Mail, Building2, Phone, Calendar, Award } from 'lucide-react'
import { useAuthStore } from '../store/auth.store'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { AvatarCircle } from '../components/ui/AvatarCircle'
import { RetroButton } from '../components/ui/RetroButton'
import { WavyDivider } from '../components/ui/WavyDivider'
import { BottomNav } from '../components/layout/BottomNav'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, isAdmin } = useAuthStore()

  useDocumentTitle('Profile')

  if (!user) return null

  const fields = [
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Phone, label: 'Phone', value: user.phoneNumber || 'N/A' },
    { icon: Building2, label: 'Company', value: user.company || 'N/A' },
    { icon: Award, label: 'Age', value: user.age?.toString() || 'N/A' },
    { icon: User, label: 'Gender', value: user.gender || 'N/A' },
    { icon: Calendar, label: 'Joined', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' },
  ]

  return (
    <div className="min-h-screen bg-br-dark">
      <div className="md:ml-64 pb-20 md:pb-8 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-2xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="blade-card p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <AvatarCircle name={user.name} size={56} blade />
              <div>
                <h1 className="font-playfair text-2xl text-white">{user.name}</h1>
                <span className={`inline-block font-space text-[10px] uppercase tracking-wider px-2.5 py-1 rounded mt-1 ${
                  isAdmin ? 'bg-br-amber/20 text-br-amber' : 'bg-teal/20 text-teal'
                }`}>
                  {isAdmin ? 'Administrator' : 'User'}
                </span>
              </div>
            </div>

            <WavyDivider blade />

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {fields.map(f => (
                <div key={f.label} className="flex items-center gap-3">
                  <f.icon className="w-4 h-4 text-br-cyan/50" />
                  <div>
                    <p className="font-space text-[9px] uppercase tracking-widest text-br-cyan/40">{f.label}</p>
                    <p className="font-worksans text-sm text-white">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <RetroButton variant="blade" onClick={() => navigate('/profile/edit')} className="flex-1">
                <Settings className="w-4 h-4" /> Edit Profile
              </RetroButton>
              {isAdmin && (
                <RetroButton variant="blade-amber" onClick={() => navigate('/admin')} className="flex-1">
                  <Shield className="w-4 h-4" /> Admin Panel
                </RetroButton>
              )}
              <RetroButton variant="outline" onClick={() => navigate('/upload')} className="flex-1 !text-white !border-white/20 hover:!bg-white/5">
                <Upload className="w-4 h-4" /> Upload
              </RetroButton>
            </div>
          </motion.div>
        </div>
      </div>
      <BottomNav expiringCount={0} />
    </div>
  )
}
