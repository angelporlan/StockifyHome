import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoading = false;
  loginActive = true;
  email = 'angel@gmail.com';
  password = '1234';
  username = '';
  authStore = inject(AuthStore);
  submitText = this.getSubmitText();

  constructor(private router: Router, private authService: AuthService) {}

  toggleAuth(value: boolean): void {
    this.loginActive = value;
    this.submitText = this.getSubmitText();
  }

  private getSubmitText(): string {
    return this.loginActive ? 'Login' : 'Register';
  }

  login(): void {
    this.startLoading();
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => this.handleLoginSuccess(res.token),
      error: (err) => this.handleError('Login failed', err),
    });
  }

  private handleLoginSuccess(token: string): void {
    this.authStore.setToken(token);
    this.authService.profile().subscribe({
      next: (profile) => {
        this.authStore.setProfile(profile);
        this.navigateTo('dashboard');
      },
      error: (err) => this.handleError('Profile fetch failed', err),
    });
  }

  register(): void {
    this.startLoading();
    this.authService.register(this.email, this.password, this.username).subscribe({
      next: () => {
        this.loginActive = true;
        this.stopLoading();
      },
      error: (err) => this.handleError('Registration failed', err),
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  private startLoading(): void {
    this.isLoading = true;
  }

  private stopLoading(): void {
    this.isLoading = false;
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.stopLoading();
  }
}
