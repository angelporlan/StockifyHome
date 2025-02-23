import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InputModalComponent } from '../../../components/general/modals/input-modal/input-modal.component';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBarService } from '../../../services/matSnackBar/mat-snack-bar.service';
import { catchError, tap, throwError } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DefaultSelectComponent } from '../../../components/general/inputs/default-select/default-select.component';

@Component({
  selector: 'app-profile',
  imports: [TranslateModule, DefaultSelectComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authStore = inject(AuthStore);

  languages = [
    { id: 'en', name: 'English' },
    { id: 'es', name: 'Español' }
  ];

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private matSnackBarService: MatSnackBarService, private translate: TranslateService) {}

  changeLanguage(lang: any): void {
    this.authStore.updateLanguagePreference(lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  closeSession(): void {
    this.authStore.deleteToken();
    this.router.navigate(['/login']);
  }

  openDialog(): void {
    this.dialog.open(InputModalComponent, {
      width: '400px',
      data: {
        title: this.translate.instant('PROFILE.CHANGE_PASSWORD_MODAL.TITLE'),
        labelInput: this.translate.instant('PROFILE.CHANGE_PASSWORD_MODAL.PASSWORD'),
        placeholderInput: this.translate.instant('PROFILE.CHANGE_PASSWORD_MODAL.NEW_PASSWORD_LABEL'),
        action: (newPassword: string) => this.updateProfile(newPassword)
      }
    });
  }

  updateProfile(newPassword: string) {
    return this.authService.updateProfile(undefined, undefined, newPassword).pipe(
      tap(() => {
        this.authService.updateProfile(newPassword);
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.PROFILE_UPDATED'));
      }),
      catchError((error) => {
        this.matSnackBarService.showError(this.translate.instant('SNACKBARS.ERROR.PROFILE_UPDATE'));
        return throwError(() => new Error(error));
      })
    );
  }
}
