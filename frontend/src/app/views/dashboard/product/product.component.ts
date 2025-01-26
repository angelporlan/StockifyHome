import { Component, inject } from '@angular/core';
import { DetailsComponent } from '../../../components/dashboard/product/details/details.component';
import { ProductStore } from '../../../store/product.store';
import { ProductDetailsComponent } from '../../../components/dashboard/product/product-details/product-details.component';

@Component({
  selector: 'app-product',
  imports: [DetailsComponent, ProductDetailsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productStore = inject(ProductStore);
  
  getIdFromUrl(): number {
    const url = window.location.href;
    const segments = url.split('/');
    return parseInt(segments[segments.length - 1]);
  }

  getProductById(id: number) {
    const products = this.productStore.selectedProducts();
    return products.find(p => p.id === id);;
  }
}
