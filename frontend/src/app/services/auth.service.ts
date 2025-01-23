import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://127.0.0.1:3000/api/users';
  authStore = inject(AuthStore);
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, username });
  }

  profile(): Observable<any> {
    const token = this.authStore.token();
    return this.http.get(`${this.apiUrl}/profile`, { 
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
