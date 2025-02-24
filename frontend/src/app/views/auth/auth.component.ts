import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { AuthStore } from '../../store/auth.store';
import { MatSnackBarService } from '../../services/matSnackBar/mat-snack-bar.service';
import { LoaderModalComponent } from '../../components/general/modals/loader-modal/loader-modal.component';
import { TranslateService } from '@ngx-translate/core';

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
  email = '';
  password = '';
  username = '';
  authStore = inject(AuthStore);
  submitText = this.getSubmitText();

  constructor(private router: Router, private authService: AuthService, private matSnackBarService: MatSnackBarService, private translate: TranslateService) { }
  
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
      error: (err) => this.handleError(this.translate.instant('SNACKBARS.ERROR.LOGIN'), err),
    });
  }

  private handleLoginSuccess(token: string): void {
    this.authService.logout();
    this.authStore.setToken(token);
    this.authService.profile().subscribe({
      next: (profile) => {
        this.authStore.setProfile(profile);
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.LOGIN'));
        this.navigateTo('dashboard/houses');
      },
      error: (err) => this.handleError(this.translate.instant('SNACKBARS.ERROR.LOGIN'), err),
    });
  }

  register(): void {
    this.startLoading();
    this.authService.register(this.email, this.password, this.username).subscribe({
      next: () => {
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.REGISTER'));
        this.loginActive = true;
        this.stopLoading();
      },
      error: (err) => this.handleError(this.translate.instant('SNACKBARS.ERROR.REGISTER'), err),
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
    this.matSnackBarService.showError(message);
    this.stopLoading();
  }
}
