import { Component, Input } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { TitleComponent } from '../../title/title.component';
import { ProductDetail } from '../../../../interfaces/product-detail';
import { DetailsTableComponent } from './details-table/details-table.component';

@Component({
  selector: 'app-product-details',
  imports: [TitleComponent, DetailsTableComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input() product: Product | undefined = undefined;
  details: ProductDetail[] = [{
    id: 0,
    quantity: 0,
    expiration_date: ''
  }];

  ngOnInit(): void {
    this.getDetailsProduct();
  }

  getDetailsProduct(): void {
    if (this.product) {
      this.product.ProductDetails.length > 0 ? this.details = this.product.ProductDetails : null;
    }
  }
}
