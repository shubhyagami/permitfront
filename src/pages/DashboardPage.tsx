import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDashboardStore } from '../store/dashboard.store'
import { useAuthStore } from '../store/auth.store'
import { useDebounce } from '../hooks/useDebounce'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { StatsCard } from '../components/ui/StatsCard'
import { RetroCard } from '../components/ui/RetroCard'
import { RetroBadge } from '../components/ui/RetroBadge'
import { RetroCountdown } from '../components/ui/RetroCountdown'
import { RetroSearchBar } from '../components/ui/RetroSearchBar'
import { RetroAlert } from '../components/ui/RetroAlert'
import { RetroButton } from '../components/ui/RetroButton'
import { EmptyState } from '../components/ui/EmptyState'
import { ShimmerCard } from '../components/ui/ShimmerCard'
import { RetroFAB } from '../components/layout/RetroFAB'
import { RetroFABSheet } from '../components/layout/RetroFABSheet'
import { RetroModal } from '../components/ui/RetroModal'
import { AdsBar } from '../components/ui/AdsBar'
import { BottomNav } from '../components/layout/BottomNav'
import { useNavigate, useLocation } from 'react-router-dom'
import { FileText, Edit2, Trash2, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

export function DashboardPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const { documents, stats, isLoading, error, fetchDocuments, deleteDocument, sendReminders, refreshStatuses } = useDashboardStore()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [fabOpen, setFabOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useDocumentTitle('Dashboard')

  useEffect(() => { fetchDocuments() }, [])
  useEffect(() => { if (debouncedSearch !== undefined) fetchDocuments(debouncedSearch || undefined) }, [debouncedSearch])

  const isAdmin = useAuthStore(s => s.isAdmin)
  const navHidden = ['/admin', '/upload'].some(p => path.startsWith(p))

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteDocument(deleteId)
      toast.success('Document deleted', { style: { borderLeft: '4px solid #00E5FF' } })
    } catch { toast.error('Delete failed') }
    setDeleteId(null)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshStatuses()
    setRefreshing(false)
    toast.success('Statuses refreshed', { style: { borderLeft: '4px solid #00E5FF' } })
  }

  const handleReminders = async () => {
    try {
      const msg = await sendReminders()
      toast.success(msg || 'Reminders sent', { style: { borderLeft: '4px solid #FFB000' } })
    } catch { toast.error('Failed to send reminders') }
    setFabOpen(false)
  }

  const expiringSoon = documents.filter(d => d.status === 'EXPIRING_SOON' && !d.expired)

  return (
    <div className="min-h-screen bg-br-dark">
      <AdsBar />
      <div className="md:ml-64 pb-20 md:pb-8 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatsCard label="Total" value={stats.total} color="text-white" delay={0} blade />
            <StatsCard label="Active" value={stats.active} color="text-teal" delay={0.05} blade />
            <StatsCard label="Expiring" value={stats.expiring} color="text-br-amber" delay={0.1} blade />
            <StatsCard label="Expired" value={stats.expired} color="text-red-500" delay={0.15} blade />
          </div>

          {/* Alert */}
          <RetroAlert show={expiringSoon.length > 0 && !search} variant="warning">
            <strong>{expiringSoon.length}</strong> document{expiringSoon.length !== 1 ? 's' : ''} expiring soon.
            <button onClick={() => navigate('/expiring')} className="underline ml-1 font-semibold">Review now</button>
          </RetroAlert>

          {/* Search */}
          <div className="flex items-center justify-between mb-4 mt-4">
            <h2 className="font-orbitron text-lg text-white tracking-wider">Documents</h2>
            <RetroSearchBar value={search} onChange={setSearch} blade />
          </div>

          {/* Loading */}
          {isLoading && documents.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => <ShimmerCard key={i} blade />)}
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="blade-card p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="font-worksans text-red-400">{error}</p>
              <RetroButton variant="blade" onClick={() => fetchDocuments()} className="mt-4">Retry</RetroButton>
            </div>
          )}

          {/* Document Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {documents.length === 0 ? (
                  <div className="col-span-full">
                    <EmptyState
                      icon={<FileText className="w-20 h-20 text-br-cyan/20" />}
                      title="No documents yet"
                      description="Upload your first permit or certificate to get started."
                      action={<RetroButton variant="blade" onClick={() => navigate('/upload')}>Upload Now</RetroButton>}
                    />
                  </div>
                ) : documents.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="blade-card p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-playfair text-base text-white leading-tight flex-1 mr-2">{doc.documentName}</h3>
                      <RetroBadge status={doc.expired ? 'EXPIRED' : doc.status} />
                    </div>
                    <div className="space-y-1.5 mb-3">
                      {doc.documentType && (
                        <div className="flex justify-between">
                          <span className="font-space text-[10px] uppercase text-br-cyan/50">Type</span>
                          <span className="font-worksans text-xs text-white/70">{doc.documentType}</span>
                        </div>
                      )}
                      {doc.permitNumber && (
                        <div className="flex justify-between">
                          <span className="font-space text-[10px] uppercase text-br-cyan/50">Permit#</span>
                          <span className="font-worksans text-xs text-white/70 font-mono">{doc.permitNumber}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="font-space text-[10px] uppercase text-br-cyan/50">Expires</span>
                        <span className="font-worksans text-xs text-white/70">{doc.expiryDate || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="border-t border-br-cyan/10 pt-3 mb-3">
                      <RetroCountdown expiryDate={doc.expiryDate} status={doc.expired ? 'EXPIRED' : doc.status} />
                    </div>
                    <div className="flex gap-2">
                      <RetroButton variant="blade" className="flex-1 !py-2 !text-[10px]" onClick={() => navigate(`/documents/${doc.id}/edit`)}>
                        <Edit2 className="w-3 h-3" /> Edit
                      </RetroButton>
                      <RetroButton variant="red" className="flex-1 !py-2 !text-[10px]" onClick={() => setDeleteId(doc.id)}>
                        <Trash2 className="w-3 h-3" /> Delete
                      </RetroButton>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Load more indicator */}
          {!isLoading && documents.length > 0 && (
            <p className="text-center font-space text-[10px] text-br-cyan/30 uppercase tracking-widest mt-6">
              {documents.length} document{documents.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      <RetroModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Document"
        message="This action cannot be undone."
      />

      {/* FAB */}
      <RetroFAB onClick={() => setFabOpen(!fabOpen)} hidden={navHidden} />
      <RetroFABSheet
        isOpen={fabOpen}
        onClose={() => setFabOpen(false)}
        onUpload={() => { navigate('/upload'); setFabOpen(false) }}
        onReminders={handleReminders}
        onRefresh={handleRefresh}
      />

      {/* Bottom Nav */}
      <BottomNav expiringCount={stats.expiring} hidden={navHidden} />
    </div>
  )
}
