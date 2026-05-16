import { create } from 'zustand'
import { documentApi } from '../api/document.api'
import type { DocumentUploadResult } from '../types'

interface UploadState {
  progress: number
  isUploading: boolean
  error: string | null
  result: DocumentUploadResult | null
  upload: (file: File) => Promise<DocumentUploadResult>
  reset: () => void
}

export const useUploadStore = create<UploadState>((set) => ({
  progress: 0,
  isUploading: false,
  error: null,
  result: null,

  upload: async (file: File) => {
    set({ isUploading: true, error: null, progress: 0 })
    try {
      const res = await documentApi.upload(file, (pct) => set({ progress: pct }))
      set({ isUploading: false, result: res, progress: 100 })
      return res
    } catch (e: any) {
      const msg = e?.response?.data?.message || e.message
      set({ isUploading: false, error: msg })
      throw e
    }
  },

  reset: () => set({ progress: 0, isUploading: false, error: null, result: null }),
}))
