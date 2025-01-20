import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoading: boolean = false;
  loginActive: boolean = true;
  email: string = '';
  password: string = '';
  username: string = '';
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
    this.isLoading = true;
    console.log(this.email, this.password);
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        this.isLoading = false;
        console.log(res)
        console.log('Login successful');
        console.log('home');
      },
      (err) => {
        this.isLoading = false;
        console.log('Login failed', err);
      }
    );
  }

  register(): void {
    this.isLoading = true;
    console.log(this.email, this.password, this.username);
    this.authService.register(this.email, this.password, this.username).subscribe(
      (res) => {
        this.isLoading = false;
        console.log(res)
        console.log('Registration successful');
        console.log('home');
      },
      (err) => {
        this.isLoading = false;
        console.log('Registration failed');
      }
    );
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}
