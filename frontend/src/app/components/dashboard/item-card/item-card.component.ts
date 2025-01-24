import { Component, Input } from '@angular/core';
import { House } from '../../../interfaces/house';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() isProduct: boolean = false;
  @Input() product: Product = {
    id: 0,
    name: '',
    image: '',
    createdAt: '',
    updatedAt: '',
    houseId: 0,
    categoryId: 0,
    category: {
      id: 0,
      name: ''
    },
    productDetails: []
  }
    ;
  @Input() house: House = {
    id: 0,
    name: '',
    createdAt: '',
    updatedAt: '',
    UserId: 0
  }

}
