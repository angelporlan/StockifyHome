import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../../store/auth.store';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { HouseStore } from '../../store/house.store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProductUrl: string = 'http://localhost:3000/api/products';
  private apiProductDetailUrl: string = 'http://localhost:3000/api/productDetails';
  authStore = inject(AuthStore);
  houseStore = inject(HouseStore);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiProductUrl}/house/${this.houseStore.selectedHouse()?.id}`, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }

  createProduct(product: any): Observable<any> {
    const house_id = this.houseStore.selectedHouse()?.id;
    product.house_id = house_id;
    return this.http.post(`${this.apiProductUrl}`, product, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    }).pipe(
      delay(2000)
      );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiProductUrl}/${id}`, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    }).pipe(
      delay(1000)
    );
  }

  updateProductDetail(productDetail: any): Observable<any> {
    return this.http.put(`${this.apiProductDetailUrl}/${productDetail.id}`, productDetail, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    }).pipe(
      delay(2000)
    );
  }

  createProductDetail(productDetail: any): Observable<any> {
    return this.http.post(`${this.apiProductDetailUrl}`, productDetail, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    });
  }

  deleteProductDetail(id: number): Observable<any> {
    return this.http.delete(`${this.apiProductDetailUrl}/${id}`, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    }).pipe(
      delay(1000)
      );
  }

  updateProduct(product: any): Observable<any> {
    const house_id = this.houseStore.selectedHouse()?.id;
    product.house_id = house_id;
    console.log('product: ', product);
    return this.http.put(`${this.apiProductUrl}/${product.id}`, product, { 
      headers: { Authorization: `Bearer ${this.authStore.token()}` }
    }).pipe(
      delay(2000)
    );
  }
}
