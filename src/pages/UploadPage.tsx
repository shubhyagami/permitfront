import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileUp, Image, Camera, File, X, Upload as UploadIcon } from 'lucide-react'
import { useUploadStore } from '../store/upload.store'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { RetroButton } from '../components/ui/RetroButton'
import { BottomNav } from '../components/layout/BottomNav'
import toast from 'react-hot-toast'

export function UploadPage() {
  const navigate = useNavigate()
  const { upload, isUploading, progress, error, reset } = useUploadStore()
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useDocumentTitle('Upload')

  const handleFile = (f: File | null) => {
    if (!f) return
    const ext = f.name.split('.').pop()?.toLowerCase()
    const allowed = ['pdf', 'jpg', 'jpeg', 'png']
    if (!ext || !allowed.includes(ext)) { toast.error('Only PDF, JPG, PNG allowed'); return }
    if (f.size > 10 * 1024 * 1024) { toast.error('File exceeds 10MB limit'); return }
    setFile(f)
  }

  const handleUpload = async () => {
    if (!file) return
    try {
      const res = await upload(file)
      toast.success('Document uploaded & processed!', { style: { borderLeft: '4px solid #00E5FF' } })
      navigate(`/documents/${res.document.id}/edit`)
    } catch {
      toast.error('Upload failed')
    }
  }

  return (
    <div className="min-h-screen bg-br-dark">
      <div className="md:ml-64 pb-20 md:pb-8 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-2xl mx-auto">
          <h1 className="font-orbitron text-xl text-white tracking-wider mb-2">Upload Document</h1>
          <p className="font-worksans text-sm text-br-cyan/50 mb-8">Upload a permit, certificate, or license</p>

          {/* Drop Zone */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="border-2 border-dashed border-br-cyan/30 rounded-2xl p-12 text-center cursor-pointer hover:border-br-cyan/60 hover:bg-br-cyan/5 transition-all"
            onClick={() => inputRef.current?.click()}
          >
            <FileUp className="w-12 h-12 text-br-cyan/40 mx-auto mb-4" />
            <h3 className="font-worksans text-lg text-white mb-2">Tap to browse files</h3>
            <p className="font-space text-xs text-br-cyan/30">PDF, JPG, PNG — Max 10MB</p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={e => handleFile(e.target.files?.[0] || null)}
            />
          </motion.div>

          {/* Upload Source Buttons */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <button onClick={() => { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.onchange = () => handleFile(i.files?.[0] || null); i.click() }}
              className="blade-btn-primary !py-3 flex-col gap-1 text-[9px]">
              <Image className="w-4 h-4" /> Gallery
            </button>
            <button onClick={() => { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.capture = 'environment' as any; i.onchange = () => handleFile(i.files?.[0] || null); i.click() }}
              className="blade-btn-amber !py-3 flex-col gap-1 text-[9px]">
              <Camera className="w-4 h-4" /> Camera
            </button>
            <button onClick={() => { const i = document.createElement('input'); i.type = 'file'; i.accept = '.pdf'; i.onchange = () => handleFile(i.files?.[0] || null); i.click() }}
              className="blade-btn-primary !py-3 flex-col gap-1 text-[9px]">
              <File className="w-4 h-4" /> PDF
            </button>
          </div>

          {/* File Preview */}
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="blade-card p-4 mt-6"
              >
                <div className="flex items-center gap-3">
                  <File className="w-8 h-8 text-br-cyan" />
                  <div className="flex-1 min-w-0">
                    <p className="font-worksans text-sm text-white truncate">{file.name}</p>
                    <p className="font-space text-xs text-br-cyan/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="text-red-500 hover:text-red-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress */}
                {isUploading && (
                  <div className="mt-4">
                    <div className="h-1.5 bg-br-cyan/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-br-cyan rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="font-space text-xs text-br-cyan/50 mt-1">{progress}% uploaded</p>
                  </div>
                )}

                {error && (
                  <p className="font-space text-xs text-red-400 mt-2">{error}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Button */}
          {file && !isUploading && (
            <RetroButton variant="blade-amber" onClick={handleUpload} className="w-full mt-4 !py-4 !text-sm">
              <UploadIcon className="w-4 h-4" /> Upload &amp; Process
            </RetroButton>
          )}
        </div>
      </div>
      <BottomNav expiringCount={0} />
    </div>
  )
}
