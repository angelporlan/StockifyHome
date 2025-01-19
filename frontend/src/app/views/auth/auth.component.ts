import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoading: boolean = false;
  loginActive: boolean = true;
  email: any;
  password: any;
  username: any;
  submitText: string = 'Login';
  
  constructor(private router: Router,
    private authService: AuthService,
    // private snackBar: MatSnackBar
  ) { }

  showMessage(message: string): void {
    // this.snackBar.open(message, 'Close', {
    //   duration: 3000,
    //   verticalPosition: 'top',
    //   horizontalPosition: 'center'
    // });
  }

  toggleAuth(value: boolean): void {
    this.loginActive = value;
    this.submitText = value ? 'Login' : 'Register';
  }

  login(): void {

  }

  register(): void {

  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}
