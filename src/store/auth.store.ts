import { create } from 'zustand'
import { authApi } from '../api/auth.api'
import { userApi } from '../api/user.api'
import type { UserResponse, SignupRequest, LoginRequest } from '../types'

interface AuthState {
  token: string | null
  user: UserResponse | null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  login: (data: LoginRequest) => Promise<void>
  signup: (data: SignupRequest) => Promise<void>
  logout: () => void
  loadProfile: () => Promise<void>
  updateUser: (data: Partial<UserResponse>) => void
}

const savedToken = localStorage.getItem('permitiq_token')
const savedUser = localStorage.getItem('permitiq_user')

export const useAuthStore = create<AuthState>((set, get) => ({
  token: savedToken,
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedToken,
  isAdmin: savedUser ? JSON.parse(savedUser).role === 'ROLE_ADMIN' : false,
  loading: false,

  login: async (data: LoginRequest) => {
    set({ loading: true })
    try {
      const res = await authApi.login(data)
      const user: UserResponse = {
        id: res.userId, name: res.name, email: res.email,
        role: res.role, phoneNumber: null, company: null,
        age: null, gender: null, createdAt: '',
      }
      localStorage.setItem('permitiq_token', res.accessToken)
      localStorage.setItem('permitiq_user', JSON.stringify(user))
      set({ token: res.accessToken, user, isAuthenticated: true, isAdmin: res.role === 'ROLE_ADMIN', loading: false })
    } catch (e) {
      set({ loading: false })
      throw e
    }
  },

  signup: async (data: SignupRequest) => {
    set({ loading: true })
    try {
      await authApi.signup(data)
      set({ loading: false })
    } catch (e) {
      set({ loading: false })
      throw e
    }
  },

  logout: () => {
    localStorage.removeItem('permitiq_token')
    localStorage.removeItem('permitiq_user')
    set({ token: null, user: null, isAuthenticated: false, isAdmin: false })
  },

  loadProfile: async () => {
    try {
      const user = await userApi.getProfile()
      localStorage.setItem('permitiq_user', JSON.stringify(user))
      set({ user, isAdmin: user.role === 'ROLE_ADMIN' })
    } catch { /* ignore */ }
  },

  updateUser: (data: Partial<UserResponse>) => {
    const current = get().user
    if (!current) return
    const updated = { ...current, ...data }
    localStorage.setItem('permitiq_user', JSON.stringify(updated))
    set({ user: updated })
  },
}))
