import { Component, inject, Input, Output } from '@angular/core';
import { TitleComponent } from '../../title/title.component';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { ProductStore } from '../../../../store/product.store';
import { Product } from '../../../../interfaces/product';

@Component({
  selector: 'app-details',
  imports: [TitleComponent, ItemCardComponent, ActionButtonComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() product: Product | undefined = undefined;
  realProduct: Product = {
    id: 0,
    name: '',
    image: '',
    createdAt: '',
    updatedAt: '',
    houseId: 0,
    categoryId: 0,
    Category: {
      id: 0,
      name: ''
    },
    ProductDetails: []
  }

  constructor() {}

  ngOnInit(): void {
    this.validProduct();
  }

  validProduct(): void {
    if (this.product) {
      this.realProduct = this.product;
      console.log(this.product);
    }
  }

}
