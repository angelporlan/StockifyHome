import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../../store/auth.store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = 'http://127.0.0.1:3000/api/cate';
  authStore = inject(AuthStore);
  private token = this.authStore.token();
  
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${this.apiUrl}`, { 
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
}
