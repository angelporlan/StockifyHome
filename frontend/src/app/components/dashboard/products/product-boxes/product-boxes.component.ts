import { Component, inject, Input } from '@angular/core';
import { ProductStore } from '../../../../store/product.store';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../title/title.component';
import { Product } from '../../../../interfaces/product';

@Component({
  selector: 'app-product-boxes',
  imports: [ItemCardComponent, CommonModule, TitleComponent],
  templateUrl: './product-boxes.component.html',
  styleUrl: './product-boxes.component.css'
})
export class ProductBoxesComponent {
  productStore = inject(ProductStore);
  text: string = 'Not products found in this house, try adding one!';
  @Input() searchText: string = '';

  filterProducts(products: Product[]) {
    if (this.searchText === '') {
      return products;
    }
    const searchTextLower = this.searchText.toLowerCase();
    return products.filter((product: any) => product.name.toLowerCase().includes(searchTextLower));
  }
}
