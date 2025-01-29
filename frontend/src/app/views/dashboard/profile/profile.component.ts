import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InputModalComponent } from '../../../components/general/modals/input-modal/input-modal.component';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBarService } from '../../../services/matSnackBar/mat-snack-bar.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authStore = inject(AuthStore);

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private matSnackBarService: MatSnackBarService) {}

  closeSession(): void {
    this.authStore.deleteToken();
    this.router.navigate(['/login']);
  }

  openDialog(): void {
    this.dialog.open(InputModalComponent, {
      width: '400px',
      data: {
        title: 'Change password',
        labelInput: 'Password',
        placeholderInput: 'Enter your new password',
        action: (newPassword: string) => this.updateProfile(newPassword)
      }
    });
  }

  updateProfile(newPassword: string) {
    return this.authService.updateProfile(undefined, undefined, newPassword).pipe(
      tap(() => {
        this.authService.updateProfile(newPassword);
        this.matSnackBarService.showSuccess('Profile updated successfully');
      }),
      catchError((error) => {
        this.matSnackBarService.showError(error.error.error);
        return throwError(() => new Error('Error updating profile'));
      })
    );
  }
}
