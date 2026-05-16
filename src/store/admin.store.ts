import { create } from 'zustand'
import { adminApi } from '../api/admin.api'
import type { AdminStats, UserResponse, DocumentResponse } from '../types'

interface AdminState {
  stats: AdminStats | null
  users: UserResponse[]
  documents: DocumentResponse[]
  isLoading: boolean
  error: string | null
  fetchStats: () => Promise<void>
  fetchUsers: () => Promise<void>
  fetchDocuments: () => Promise<void>
  deleteUser: (id: number) => Promise<void>
  deleteDocument: (id: number) => Promise<void>
}

export const useAdminStore = create<AdminState>((set, get) => ({
  stats: null,
  users: [],
  documents: [],
  isLoading: false,
  error: null,

  fetchStats: async () => {
    try {
      const stats = await adminApi.getStats()
      set({ stats })
    } catch { /* stats optional */ }
  },

  fetchUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const users = await adminApi.getUsers()
      set({ users, isLoading: false })
    } catch (e: any) {
      set({ isLoading: false, error: e?.response?.data?.message || e.message })
    }
  },

  fetchDocuments: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await adminApi.getDocuments()
      set({ documents: res.content, isLoading: false })
    } catch (e: any) {
      set({ isLoading: false, error: e?.response?.data?.message || e.message })
    }
  },

  deleteUser: async (id: number) => {
    await adminApi.deleteUser(id)
    set(state => ({ users: state.users.filter(u => u.id !== id) }))
  },

  deleteDocument: async (id: number) => {
    await adminApi.deleteDocument(id)
    set(state => ({ documents: state.documents.filter(d => d.id !== id) }))
  },
}))
