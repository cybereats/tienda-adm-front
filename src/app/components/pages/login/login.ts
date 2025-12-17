import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../../../services/auth.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup
  isLoading = false
  errorMessage = ''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.isLoading = true
    this.errorMessage = ''

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token)
        // this.authService.verifyToken().subscribe({
        //   next: (user) => {
        //     this.authService.setUser(user)
        //     this.router.navigate(['/admin'])
        //   },
        //   error: () => {
        //     this.isLoading = false
        //     this.errorMessage = 'Error al verificar la sesión. Inténtalo de nuevo.'
        //   }
        // })
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessage = error.error?.message || 'Error al iniciar sesión. Por favor revisa tus credenciales.'
        console.error('Login error:', error)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }
}
