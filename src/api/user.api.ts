import api from './client'
import type { UserResponse, ProfileUpdateRequest } from '../types'

export const userApi = {
  getProfile: () =>
    api.get<UserResponse>('/users/me').then(r => r.data),

  updateProfile: (data: ProfileUpdateRequest) =>
    api.put<UserResponse>('/users/me', data).then(r => r.data),
}
