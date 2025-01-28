import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authStore = inject(AuthStore);

  constructor(private router: Router, public dialog: MatDialog) {}

  closeSession(): void {
    this.authStore.deleteToken();
    this.router.navigate(['/login']);
  }

  openDialog(): void {

  }
}
