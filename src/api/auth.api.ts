import api from './client'
import type { SignupRequest, LoginRequest, JwtResponse, UserResponse } from '../types'

export const authApi = {
  signup: (data: SignupRequest) =>
    api.post<UserResponse>('/auth/signup', data).then(r => r.data),

  login: (data: LoginRequest) =>
    api.post<JwtResponse>('/auth/login', data).then(r => r.data),
}
