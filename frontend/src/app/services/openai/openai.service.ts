import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  // private apiUrl: string = 'http://127.0.0.1:3000/api/openai';
  private apiUrl: string = 'https://stockifyhome.onrender.com/api/openai';
  authStore = inject(AuthStore);
  
  constructor(private http: HttpClient) { }

  getRecipe(ingredients: string[], lg: string): Promise<any> {
    const body = {
      food: ingredients,
      lg: lg
    }
    const headers = {
      Authorization: `Bearer ${this.authStore.token()}`
    };
    return this.http.post(`${this.apiUrl}/recipe`, body, { headers }).toPromise();
  }
}
