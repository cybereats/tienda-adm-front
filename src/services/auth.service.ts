import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, timeout, catchError, of } from 'rxjs'
import { AuthResponse, LoginRequest, RegisterRequest, UserProfile } from '../models/auth.model'
import { HTTPService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authRoute: string = '/api/auth'
  private userSubject = new BehaviorSubject<UserProfile | null>(null)
  public user$ = this.userSubject.asObservable()

  constructor(private httpService: HTTPService) { }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.httpService.post<AuthResponse>(`${this.authRoute}/register`, request)
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.httpService.post<AuthResponse>(`${this.authRoute}/login`, request)
  }

  verifyToken(): Observable<UserProfile> {
    return this.httpService.getById<UserProfile>(`${this.authRoute}/verify`).pipe(
      timeout(5000),
      catchError(error => {
        console.log('Error verificando token:', error)
        throw error
      })
    )
  }

  setUser(user: UserProfile): void {
    this.userSubject.next(user)
  }

  getUser(): UserProfile | null {
    return this.userSubject.value
  }

  clearUser(): void {
    this.userSubject.next(null)
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  logout(): void {
    this.clearUser()
    localStorage.removeItem('auth_token')
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  isAdmin(): boolean {
    const user = this.getUser()
    return user?.role === 'ADMIN'
  }
}
