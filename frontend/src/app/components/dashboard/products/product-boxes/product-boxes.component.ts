import { Component, inject } from '@angular/core';
import { ProductStore } from '../../../../store/product.store';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../title/title.component';

@Component({
  selector: 'app-product-boxes',
  imports: [ItemCardComponent, CommonModule, TitleComponent],
  templateUrl: './product-boxes.component.html',
  styleUrl: './product-boxes.component.css'
})
export class ProductBoxesComponent {
  productStore = inject(ProductStore);
  text: string = 'Not products found in this house, try adding one!';
}
