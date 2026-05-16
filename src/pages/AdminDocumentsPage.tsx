import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Edit2 } from 'lucide-react'
import { adminApi } from '../api/admin.api'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { RetroBadge } from '../components/ui/RetroBadge'
import { RetroCountdown } from '../components/ui/RetroCountdown'
import { RetroButton } from '../components/ui/RetroButton'
import { RetroModal } from '../components/ui/RetroModal'
import { RetroSpinner } from '../components/ui/RetroSpinner'
import type { DocumentResponse } from '../types'
import toast from 'react-hot-toast'

export function AdminDocumentsPage() {
  const navigate = useNavigate()
  const [docs, setDocs] = useState<DocumentResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useDocumentTitle('All Documents')

  useEffect(() => {
    adminApi.getDocuments().then(r => {
      setDocs(r.content)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await adminApi.deleteDocument(deleteId)
      setDocs(d => d.filter(x => x.id !== deleteId))
      toast.success('Document deleted', { style: { borderLeft: '4px solid #00E5FF' } })
    } catch { toast.error('Delete failed') }
    setDeleteId(null)
  }

  return (
    <div className="min-h-screen bg-br-dark">
      <div className="md:ml-64 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 font-space text-xs text-br-cyan/50 hover:text-br-cyan mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Admin
          </button>

          <h1 className="font-orbitron text-xl text-white tracking-wider mb-6">All Documents</h1>

          {loading ? (
            <div className="flex justify-center py-12"><RetroSpinner blade className="w-8 h-8" /></div>
          ) : docs.length === 0 ? (
            <p className="font-worksans text-sm text-br-cyan/40 text-center py-12">No documents found</p>
          ) : (
            <div className="space-y-3">
              {docs.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="blade-card p-4 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-playfair text-base text-white">{doc.documentName}</h3>
                    <p className="font-space text-[10px] text-br-cyan/40 mt-0.5">
                      {doc.documentType && `${doc.documentType} · `}Expires: {doc.expiryDate || 'N/A'}
                      {doc.permitNumber && ` · ${doc.permitNumber}`}
                    </p>
                  </div>
                  <RetroBadge status={doc.expired ? 'EXPIRED' : doc.status} />
                  <RetroCountdown expiryDate={doc.expiryDate} status={doc.expired ? 'EXPIRED' : doc.status} />
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/documents/${doc.id}/edit`)} className="text-br-cyan hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteId(doc.id)} className="text-red-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <RetroModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Document"
        message="This action cannot be undone."
      />
    </div>
  )
}
