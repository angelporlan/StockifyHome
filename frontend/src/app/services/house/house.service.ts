import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStore } from '../../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  // private apiUrl: string = 'http://127.0.0.1:3000/api/houses';
  private apiUrl: string = 'https://stockifyhome.onrender.com/api/houses';
  authStore = inject(AuthStore);

  constructor(private http: HttpClient) { }

  getHouses(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }

  updateHouse(id: number, house: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, house, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }

  createHouse(house: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, house, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }
}
