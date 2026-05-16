import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, User } from 'lucide-react'
import { adminApi } from '../api/admin.api'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { RetroBadge } from '../components/ui/RetroBadge'
import { RetroButton } from '../components/ui/RetroButton'
import { RetroCountdown } from '../components/ui/RetroCountdown'
import { RetroModal } from '../components/ui/RetroModal'
import { RetroSpinner } from '../components/ui/RetroSpinner'
import { WavyDivider } from '../components/ui/WavyDivider'
import type { UserResponse, DocumentResponse } from '../types'
import toast from 'react-hot-toast'

export function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserResponse | null>(null)
  const [docs, setDocs] = useState<DocumentResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useDocumentTitle('User Detail')

  useEffect(() => {
    if (!id) return
    Promise.all([
      adminApi.getUser(parseInt(id)).then(setUser),
      adminApi.getUserDocuments(parseInt(id)).then(setDocs),
    ]).finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!id) return
    setDeleting(true)
    try {
      await adminApi.deleteUser(parseInt(id))
      toast.success('User deleted', { style: { borderLeft: '4px solid #00E5FF' } })
      navigate('/admin')
    } catch { toast.error('Delete failed') }
    setDeleting(false)
    setShowDelete(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center">
      <RetroSpinner blade className="w-10 h-10" />
    </div>
  )

  if (!user) return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center">
      <p className="font-worksans text-br-cyan/50">User not found</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-br-dark">
      <div className="md:ml-64 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 font-space text-xs text-br-cyan/50 hover:text-br-cyan mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Admin
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="blade-card p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-br-cyan/20 flex items-center justify-center">
                <User className="w-6 h-6 text-br-cyan" />
              </div>
              <div>
                <h1 className="font-playfair text-xl text-white">{user.name}</h1>
                <p className="font-worksans text-sm text-br-cyan/60">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'ID', value: user.id },
                { label: 'Company', value: user.company || 'N/A' },
                { label: 'Phone', value: user.phoneNumber || 'N/A' },
                { label: 'Age', value: user.age?.toString() || 'N/A' },
                { label: 'Gender', value: user.gender || 'N/A' },
                { label: 'Role', value: user.role === 'ROLE_ADMIN' ? 'Admin' : 'User' },
                { label: 'Joined', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' },
              ].map(f => (
                <div key={f.label}>
                  <p className="font-space text-[9px] uppercase tracking-widest text-br-cyan/40">{f.label}</p>
                  <p className="font-worksans text-sm text-white">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <RetroButton variant="red" onClick={() => setShowDelete(true)} loading={deleting}>
                <Trash2 className="w-4 h-4" /> Delete User
              </RetroButton>
            </div>
          </motion.div>

          <WavyDivider blade />

          <h2 className="font-orbitron text-base text-white tracking-wider mb-4">
            Documents ({docs.length})
          </h2>

          {docs.length === 0 ? (
            <p className="font-worksans text-sm text-br-cyan/40 text-center py-8">No documents</p>
          ) : (
            <div className="space-y-3">
              {docs.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="blade-card p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-playfair text-base text-white">{doc.documentName}</h3>
                      <p className="font-space text-[10px] text-br-cyan/40 mt-1">
                        {doc.documentType && `${doc.documentType} · `}Expires: {doc.expiryDate || 'N/A'}
                      </p>
                    </div>
                    <RetroBadge status={doc.expired ? 'EXPIRED' : doc.status} />
                  </div>
                  <div className="mt-2">
                    <RetroCountdown expiryDate={doc.expiryDate} status={doc.expired ? 'EXPIRED' : doc.status} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <RetroModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Delete "${user.name}" and all their documents?`}
      />
    </div>
  )
}
