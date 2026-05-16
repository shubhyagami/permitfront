import { create } from 'zustand'
import { documentApi } from '../api/document.api'
import { mailApi } from '../api/mail.api'
import type { DocumentResponse } from '../types'

interface DashboardState {
  documents: DocumentResponse[]
  stats: { total: number; active: number; expiring: number; expired: number }
  searchQuery: string
  page: number
  isLoading: boolean
  error: string | null
  fetchDocuments: (query?: string) => Promise<void>
  deleteDocument: (id: number) => Promise<void>
  sendReminders: () => Promise<string>
  refreshStatuses: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  documents: [],
  stats: { total: 0, active: 0, expiring: 0, expired: 0 },
  searchQuery: '',
  page: 0,
  isLoading: false,
  error: null,

  fetchDocuments: async (query?: string) => {
    set({ isLoading: true, error: null })
    try {
      const q = query ?? get().searchQuery
      const res = await documentApi.getDocuments({ q, page: get().page, size: 50 })
      const docs = res.content
      set({
        documents: docs,
        stats: {
          total: docs.length,
          active: docs.filter(d => d.status === 'ACTIVE' && !d.expired).length,
          expiring: docs.filter(d => d.status === 'EXPIRING_SOON').length,
          expired: docs.filter(d => d.expired || d.status === 'EXPIRED').length,
        },
        isLoading: false,
      })
    } catch (e: any) {
      set({ isLoading: false, error: e?.response?.data?.message || e.message })
    }
  },

  deleteDocument: async (id: number) => {
    await documentApi.delete(id)
    set(state => ({
      documents: state.documents.filter(d => d.id !== id),
    }))
    get().fetchDocuments()
  },

  sendReminders: async () => {
    const res = await mailApi.sendReminders()
    return res.message
  },

  refreshStatuses: async () => {
    set({ isLoading: true })
    await get().fetchDocuments()
  },
}))
