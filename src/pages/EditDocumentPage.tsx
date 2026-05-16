import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { documentApi } from '../api/document.api'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { RetroButton } from '../components/ui/RetroButton'
import { RetroModal } from '../components/ui/RetroModal'
import { RetroSpinner } from '../components/ui/RetroSpinner'
import toast from 'react-hot-toast'
import type { DocumentResponse } from '../types'

export function EditDocumentPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [doc, setDoc] = useState<DocumentResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [form, setForm] = useState({ documentName: '', documentType: '', permitNumber: '', issueDate: '', expiryDate: '', authorityName: '' })

  useDocumentTitle('Edit Document')

  useEffect(() => {
    if (!id) return
    documentApi.getDocuments({ size: 100 }).then(r => {
      const d = r.content.find(d => d.id === parseInt(id!))
      if (d) {
        setDoc(d)
        setForm({
          documentName: d.documentName,
          documentType: d.documentType || '',
          permitNumber: d.permitNumber || '',
          issueDate: d.issueDate || '',
          expiryDate: d.expiryDate || '',
          authorityName: d.authorityName || '',
        })
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setSaving(true)
    try {
      await documentApi.update(parseInt(id), {
        documentName: form.documentName,
        documentType: form.documentType || null,
        permitNumber: form.permitNumber || null,
        issueDate: form.issueDate || null,
        expiryDate: form.expiryDate || null,
        authorityName: form.authorityName || null,
      })
      toast.success('Document updated!', { style: { borderLeft: '4px solid #00E5FF' } })
      navigate('/dashboard')
    } catch { toast.error('Update failed') }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!id) return
    try {
      await documentApi.delete(parseInt(id))
      toast.success('Document deleted', { style: { borderLeft: '4px solid #00E5FF' } })
      navigate('/dashboard')
    } catch { toast.error('Delete failed') }
    setShowDelete(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center">
      <RetroSpinner blade className="w-10 h-10" />
    </div>
  )

  if (!doc) return (
    <div className="min-h-screen bg-br-dark flex items-center justify-center">
      <p className="font-worksans text-br-cyan/50">Document not found</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-br-dark">
      <div className="md:ml-64 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="blade-card p-6 md:p-8">
            <h1 className="font-orbitron text-lg text-white tracking-wider mb-1">Edit Document</h1>
            <p className="font-worksans text-sm text-br-cyan/50 mb-6">{doc.documentName}</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="blade-label">Document Name *</label>
                <input type="text" value={form.documentName} onChange={e => setForm(f => ({ ...f, documentName: e.target.value }))} className="blade-input w-full" required />
              </div>
              <div>
                <label className="blade-label">Document Type</label>
                <input type="text" value={form.documentType} onChange={e => setForm(f => ({ ...f, documentType: e.target.value }))} className="blade-input w-full" placeholder="e.g. Insurance, PUC, License" />
              </div>
              <div>
                <label className="blade-label">Permit Number</label>
                <input type="text" value={form.permitNumber} onChange={e => setForm(f => ({ ...f, permitNumber: e.target.value }))} className="blade-input w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="blade-label">Issue Date</label>
                  <input type="date" value={form.issueDate} onChange={e => setForm(f => ({ ...f, issueDate: e.target.value }))} className="blade-input w-full" />
                </div>
                <div>
                  <label className="blade-label">Expiry Date</label>
                  <input type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} className="blade-input w-full" />
                </div>
              </div>
              <div>
                <label className="blade-label">Authority Name</label>
                <input type="text" value={form.authorityName} onChange={e => setForm(f => ({ ...f, authorityName: e.target.value }))} className="blade-input w-full" />
              </div>

              <div className="flex gap-3 pt-4">
                <RetroButton type="submit" variant="blade-amber" loading={saving} className="flex-1">Save Changes</RetroButton>
                <RetroButton variant="outline" onClick={() => navigate('/dashboard')} className="!text-white !border-white/20">Cancel</RetroButton>
              </div>
              <RetroButton variant="red" onClick={() => setShowDelete(true)} className="w-full">Delete Document</RetroButton>
            </form>
          </motion.div>
        </div>
      </div>

      <RetroModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Document"
        message={`Are you sure you want to delete "${doc.documentName}"? This cannot be undone.`}
      />
    </div>
  )
}
