import { Component, inject, Input } from '@angular/core';
import { ProductDetail } from '../../../../../interfaces/product-detail';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter/counter.component';
import { ProductService } from '../../../../../services/product/product.service';
import { ProductStore } from '../../../../../store/product.store';

@Component({
  selector: 'app-details-table',
  imports: [CommonModule, CounterComponent],
  templateUrl: './details-table.component.html',
  styleUrl: './details-table.component.css'
})
export class DetailsTableComponent {
  @Input() productId: number | undefined = 0;
  @Input() details: ProductDetail[] | undefined = [{
    id: 0,
    quantity: 0,
    expiration_date: ''
  }];

  isLoading: boolean[] = [];
  productStore = inject(ProductStore);

  constructor(private productService: ProductService) {}
  
  getFormattedDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  updateDetail(event: any): void {
    this.isLoading[event.id] = true;
    this.productService.updateProductDetail(event).subscribe({
      next: () => {
        if (this.productId !== undefined) {
          console.log(this.productId);
          console.log(event.id);
          console.log(event.quantity);
          this.productStore.updateProductDetail(this.productId, event.id, event.quantity);
        }
        this.isLoading[event.id] = false;
      }

    });
  }
}
