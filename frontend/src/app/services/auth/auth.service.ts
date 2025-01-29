import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthStore } from '../../store/auth.store';
import { HouseStore } from '../../store/house.store';
import { ProductStore } from '../../store/product.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://127.0.0.1:3000/api/users';
  authStore = inject(AuthStore);
  houseStore = inject(HouseStore);
  productStore = inject(ProductStore);

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      delay(2000)
    );
  }

  register(email: string, password: string, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, username }).pipe(
      delay(2000)
    );
  }

  profile(): Observable<any> {
    const token = this.authStore.token();
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateProfile(username?: string, email?: string, password?: string): Observable<any> {
    const token = this.authStore.token();
    const body: any = {};
    if (username) body.username = username;
    if (email) body.email = email;
    if (password) body.password = password;
    return this.http.put(`${this.apiUrl}/profile`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      delay(2000));
  }

  logout(): void {
    this.authStore.deleteToken();
    this.houseStore.resetState();
    this.productStore.resetState();
  }
}
