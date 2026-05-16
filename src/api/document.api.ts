import api from './client'
import type { DocumentResponse, DocumentUpdateRequest, DocumentUploadResult, PageResponse } from '../types'

export const documentApi = {
  getDocuments: (params?: { q?: string; page?: number; size?: number }) =>
    api.get<PageResponse<DocumentResponse>>('/documents', { params }).then(r => r.data),

  upload: (file: File, onProgress?: (pct: number) => void) => {
    const fd = new FormData()
    fd.append('file', file)
    return api.post<DocumentUploadResult>('/documents/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => onProgress?.(Math.round((e.loaded / (e.total ?? 1)) * 100)),
    }).then(r => r.data)
  },

  update: (id: number, data: DocumentUpdateRequest) =>
    api.put<DocumentResponse>(`/documents/${id}`, data).then(r => r.data),

  delete: (id: number) => api.delete(`/documents/${id}`),

  getExpiring: () =>
    api.get<DocumentResponse[]>('/documents/expiring').then(r => r.data),
}
