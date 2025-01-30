import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStore } from '../../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private apiUrl: string = 'http://127.0.0.1:3000/api/houses';
  authStore = inject(AuthStore);

  constructor(private http: HttpClient) { }

  getHouses(): Observable<any> {

    return this.http.get(`${this.apiUrl}`, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }
}
