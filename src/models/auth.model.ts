import { User } from './user.model'

export interface RegisterRequest {
  name: string
  username: string
  password: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  expiresAt: string
  user: User
}
