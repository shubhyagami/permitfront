import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Hourglass, ChevronRight, Mail } from 'lucide-react'
import { documentApi } from '../api/document.api'
import { mailApi } from '../api/mail.api'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useCountdown } from '../hooks/useCountdown'
import { RetroBadge } from '../components/ui/RetroBadge'
import { RetroButton } from '../components/ui/RetroButton'
import { EmptyState } from '../components/ui/EmptyState'
import { ShimmerCard } from '../components/ui/ShimmerCard'
import { BottomNav } from '../components/layout/BottomNav'
import type { DocumentResponse } from '../types'
import toast from 'react-hot-toast'

export function ExpiringPage() {
  const navigate = useNavigate()
  const [docs, setDocs] = useState<DocumentResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useDocumentTitle('Expiring Documents')

  useEffect(() => {
    documentApi.getDocuments({ size: 100 }).then(r => {
      setDocs(r.content.filter(d => d.status === 'EXPIRING_SOON'))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const sendAll = async () => {
    setSending(true)
    try {
      const res = await mailApi.sendReminders()
      toast.success(res.message || 'Reminders sent!', { style: { borderLeft: '4px solid #FFB000' } })
    } catch { toast.error('Failed to send reminders') }
    setSending(false)
  }

  return (
    <div className="min-h-screen bg-br-dark">
      <div className="md:ml-64 pb-20 md:pb-8 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
              <Hourglass className="w-6 h-6 text-br-amber" /> Expiring
            </h1>
            {docs.length > 0 && (
              <RetroButton variant="blade" onClick={sendAll} loading={sending}>
                <Mail className="w-4 h-4" /> Send Reminders
              </RetroButton>
            )}
          </div>
          <p className="font-worksans text-sm text-br-cyan/50 mb-6">Documents expiring within 30 days</p>

          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map(i => <ShimmerCard key={i} blade />)}</div>
          ) : docs.length === 0 ? (
            <EmptyState
              icon={<AlertTriangle className="w-20 h-20 text-br-cyan/20" />}
              title="All clear!"
              description="No documents are expiring soon."
              action={<RetroButton variant="blade" onClick={() => navigate('/dashboard')}>Back to Dashboard</RetroButton>}
            />
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {docs.map((doc, i) => (
                  <ExpiringRow key={doc.id} doc={doc} index={i} onClick={() => navigate(`/documents/${doc.id}/edit`)} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <BottomNav expiringCount={docs.length} />
    </div>
  )
}

function ExpiringRow({ doc, index, onClick }: { doc: DocumentResponse; index: number; onClick: () => void }) {
  const display = useCountdown(doc.expiryDate)
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="blade-card p-4 flex items-center gap-4 cursor-pointer hover:border-br-cyan/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <h4 className="font-playfair text-base text-white">{doc.documentName}</h4>
        <p className="font-space text-[10px] text-br-cyan/40 mt-0.5">
          {doc.documentType && `${doc.documentType} · `}Expires: {doc.expiryDate || 'N/A'}
          {doc.permitNumber && ` · ${doc.permitNumber}`}
        </p>
      </div>
      <div className="text-right">
        <span className="font-space font-bold text-base text-br-amber whitespace-nowrap">{display}</span>
      </div>
      <div className="flex-shrink-0">
        <RetroBadge status={doc.status} />
      </div>
      <ChevronRight className="w-4 h-4 text-br-cyan/30" />
    </motion.div>
  )
}
