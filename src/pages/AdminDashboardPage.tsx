import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Users, FileText, Trash2, Eye } from 'lucide-react'
import { useAdminStore } from '../store/admin.store'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { StatsCard } from '../components/ui/StatsCard'
import { RetroBadge } from '../components/ui/RetroBadge'
import { RetroButton } from '../components/ui/RetroButton'
import { RetroModal } from '../components/ui/RetroModal'
import { RetroSpinner } from '../components/ui/RetroSpinner'
import { WavyDivider } from '../components/ui/WavyDivider'
import { BottomNav } from '../components/layout/BottomNav'
import type { UserResponse } from '../types'
import toast from 'react-hot-toast'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const { stats, users, isLoading, fetchStats, fetchUsers, deleteUser } = useAdminStore()
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useDocumentTitle('Admin')

  useEffect(() => { fetchStats(); fetchUsers() }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteUser(deleteId)
      toast.success('User deleted', { style: { borderLeft: '4px solid #00E5FF' } })
    } catch { toast.error('Delete failed') }
    setDeleteId(null)
  }

  return (
    <div className="min-h-screen bg-br-dark">
      <div className="md:ml-64 pb-20 md:pb-8 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-br-amber" />
            <h1 className="font-orbitron text-xl text-white tracking-wider">Admin Panel</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <StatsCard label="Users" value={stats?.users || 0} color="text-br-cyan" blade />
            <StatsCard label="Documents" value={stats?.documents || 0} color="text-br-amber" blade />
          </div>

          <WavyDivider blade />

          {/* Users Table */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-orbitron text-base text-white tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-br-cyan" /> Users
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><RetroSpinner blade className="w-8 h-8" /></div>
          ) : (
            <div className="blade-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-br-cyan/10">
                      {['ID', 'Name', 'Email', 'Company', 'Role', 'Actions'].map(h => (
                        <th key={h} className="font-space text-[10px] uppercase tracking-wider text-br-cyan/50 p-3 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u: UserResponse) => (
                      <tr key={u.id} className="border-b border-br-cyan/5 hover:bg-br-cyan/5 transition-colors">
                        <td className="p-3 font-space text-xs text-br-cyan/40">{u.id}</td>
                        <td className="p-3 font-worksans text-sm text-white">{u.name}</td>
                        <td className="p-3 font-worksans text-xs text-br-cyan/70">{u.email}</td>
                        <td className="p-3 font-worksans text-xs text-white/50">{u.company || '-'}</td>
                        <td className="p-3">
                          <span className={`font-space text-[9px] uppercase tracking-wider px-2 py-0.5 rounded ${
                            u.role === 'ROLE_ADMIN' ? 'bg-br-amber/20 text-br-amber' : 'bg-teal/20 text-teal'
                          }`}>
                            {u.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button onClick={() => navigate(`/admin/users/${u.id}`)}
                              className="flex items-center gap-1 font-space text-[10px] uppercase text-br-cyan hover:text-white transition-colors">
                              <Eye className="w-3 h-3" /> View
                            </button>
                            {u.role !== 'ROLE_ADMIN' && (
                              <button onClick={() => setDeleteId(u.id)}
                                className="flex items-center gap-1 font-space text-[10px] uppercase text-red-500 hover:text-red-400 transition-colors">
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-8">
            <RetroButton variant="blade" onClick={() => navigate('/admin/documents')} className="w-full">
              <FileText className="w-4 h-4" /> View All Documents
            </RetroButton>
          </div>

          <div className="mt-4">
            <RetroButton variant="outline" onClick={() => navigate('/dashboard')} className="w-full !text-white !border-white/20">
              Back to Dashboard
            </RetroButton>
          </div>
        </div>
      </div>

      <RetroModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message="All their documents will also be permanently deleted."
      />

      <BottomNav expiringCount={0} />
    </div>
  )
}
