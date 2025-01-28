import { Component, inject } from '@angular/core';
import { ProductStore } from '../../../../store/product.store';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-boxes',
  imports: [ItemCardComponent, CommonModule],
  templateUrl: './product-boxes.component.html',
  styleUrl: './product-boxes.component.css'
})
export class ProductBoxesComponent {
  productStore = inject(ProductStore);
}
