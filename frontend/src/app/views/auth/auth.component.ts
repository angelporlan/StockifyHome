import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { AuthStore } from '../../store/auth.store';
import { MatSnackBarService } from '../../services/matSnackBar/mat-snack-bar.service';
import { LoaderModalComponent } from '../../components/general/modals/loader-modal/loader-modal.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderModalComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoading = false;
  loginActive = true;
  email = 'prueba@gmail.com';
  password = '123456';
  username = '';
  authStore = inject(AuthStore);
  submitText = this.getSubmitText();

  constructor(private router: Router, private authService: AuthService, private matSnackBarService: MatSnackBarService) { }
  
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
    this.authService.logout();
    this.authStore.setToken(token);
    this.authService.profile().subscribe({
      next: (profile) => {
        this.authStore.setProfile(profile);
        this.matSnackBarService.showSuccess('Login successful!');
        this.navigateTo('dashboard/houses');
      },
      error: (err) => this.handleError('Profile fetch failed', err),
    });
  }

  register(): void {
    this.startLoading();
    this.authService.register(this.email, this.password, this.username).subscribe({
      next: () => {
        this.matSnackBarService.showSuccess('Registration successful!');
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
    this.matSnackBarService.showError(error.error.error || message);
    this.stopLoading();
  }
}
