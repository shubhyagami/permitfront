import api from './client'
import type { AdminStats, UserResponse, DocumentResponse, DocumentUpdateRequest, UserUpdateRequest, DocumentUploadResult, PageResponse } from '../types'

export const adminApi = {
  getStats: () =>
    api.get<AdminStats>('/admin/stats').then(r => r.data),

  getUsers: () =>
    api.get<UserResponse[]>('/admin/users').then(r => r.data),

  getUser: (id: number) =>
    api.get<UserResponse>(`/admin/users/${id}`).then(r => r.data),

  updateUser: (id: number, data: UserUpdateRequest) =>
    api.put<UserResponse>(`/admin/users/${id}`, data).then(r => r.data),

  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),

  getDocuments: () =>
    api.get<PageResponse<DocumentResponse>>('/admin/documents').then(r => r.data),

  getDocument: (id: number) =>
    api.get<DocumentResponse>(`/admin/documents/${id}`).then(r => r.data),

  getUserDocuments: (userId: number) =>
    api.get<DocumentResponse[]>(`/admin/users/${userId}/documents`).then(r => r.data),

  updateDocument: (id: number, data: DocumentUpdateRequest) =>
    api.put<DocumentResponse>(`/admin/documents/${id}`, data).then(r => r.data),

  deleteDocument: (id: number) => api.delete(`/admin/documents/${id}`),

  uploadDocumentForUser: (userId: number, file: File, onProgress?: (pct: number) => void) => {
    const fd = new FormData()
    fd.append('file', file)
    return api.post<DocumentUploadResult>(`/admin/documents/upload?userId=${userId}`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => onProgress?.(Math.round((e.loaded / (e.total ?? 1)) * 100)),
    }).then(r => r.data)
  },
}
