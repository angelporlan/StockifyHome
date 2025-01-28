import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../../store/auth.store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HouseStore } from '../../store/house.store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = 'http://localhost:3000/api/products';
  authStore = inject(AuthStore);
  houseStore = inject(HouseStore);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/house/${this.houseStore.selectedHouse()?.id}`, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }

  createProduct(product: any): Observable<any> {
    const house_id = this.houseStore.selectedHouse()?.id;
    product.house_id = house_id;
    console.log(product);
    return this.http.post(`${this.apiUrl}`, product, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }
}
