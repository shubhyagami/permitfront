export type DocumentStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED'
export type Role = 'ROLE_USER' | 'ROLE_ADMIN'
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'

export interface SignupRequest {
  name: string; email: string; password: string
  phoneNumber?: string | null; company?: string | null
  age: number; gender: Gender
}

export interface LoginRequest { email: string; password: string }

export interface JwtResponse {
  tokenType: string; accessToken: string; userId: number
  name: string; email: string; role: Role
}

export interface UserResponse {
  id: number; name: string; email: string
  phoneNumber: string | null; company: string | null
  age: number | null; gender: Gender | null
  role: Role; createdAt: string
}

export interface DocumentResponse {
  id: number; documentName: string; documentType: string | null
  permitNumber: string | null; issueDate: string | null
  expiryDate: string | null; authorityName: string | null
  originalFileName: string | null; uploadTime: string | null
  status: DocumentStatus; remainingDays: number
  remainingHours: number; remainingMinutes: number; expired: boolean
}

export interface DocumentUpdateRequest {
  documentName: string; documentType?: string | null
  permitNumber?: string | null; issueDate?: string | null
  expiryDate?: string | null; authorityName?: string | null
}

export interface DocumentUploadResult {
  document: DocumentResponse; emailStatus: string | null
}

export interface PageResponse<T> {
  content: T[]; totalPages: number; totalElements: number
  size: number; number: number
}

export interface ProfileUpdateRequest {
  name?: string; phoneNumber?: string | null
  company?: string | null; age?: number; gender?: string
}

export interface UserUpdateRequest {
  name: string; phoneNumber?: string | null
  company?: string | null; age?: number | null; role?: Role | null
}

export interface MailResult {
  success: boolean; message: string; count: number
}

export interface ApiError {
  timestamp: string; status: number; error: string
  message: string; path: string; validationErrors: Record<string, string> | null
}

export interface AdminStats {
  users: number; documents: number
}
