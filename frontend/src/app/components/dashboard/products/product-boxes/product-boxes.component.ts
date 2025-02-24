import { Component, inject, Input } from '@angular/core';
import { ProductStore } from '../../../../store/product.store';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../title/title.component';
import { Product } from '../../../../interfaces/product';
import { HouseStore } from '../../../../store/house.store';
import { TranslatePipe } from '@ngx-translate/core';
import { LoaderModalComponent } from '../../../general/modals/loader-modal/loader-modal.component';

@Component({
  selector: 'app-product-boxes',
  imports: [ItemCardComponent, CommonModule, TitleComponent, TranslatePipe, LoaderModalComponent],
  templateUrl: './product-boxes.component.html',
  styleUrl: './product-boxes.component.css'
})
export class ProductBoxesComponent {
  productStore = inject(ProductStore);

  @Input() searchText: string = '';
  houseStore = inject(HouseStore);

  ngOnInit(): void {
    if (this.productStore.selectedProducts())
      console.log(this.productStore.selectedProducts());
    }

  filterProducts(products: Product[]) {
    if (this.searchText === '') {
      return products;
    }
    const searchTextLower = this.searchText.toLowerCase();
    return products.filter((product: any) => product.name.toLowerCase().includes(searchTextLower));
  }
}
