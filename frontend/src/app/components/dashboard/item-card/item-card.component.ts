import { Component, inject, Input } from '@angular/core';
import { House } from '../../../interfaces/house';
import { Product } from '../../../interfaces/product';
import { HouseStore } from '../../../store/house.store';
import { MatSnackBarService } from '../../../services/matSnackBar/mat-snack-bar.service';

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
  private houseStore = inject(HouseStore);

  constructor(private matSnackBarService: MatSnackBarService) { }

  onSelectItem() {
    if (!this.isProduct) {
      this.houseStore.setHouseSelected(this.house);
      this.matSnackBarService.showSuccess(`House ${this.house.name} selected`);
    }
  }
}
