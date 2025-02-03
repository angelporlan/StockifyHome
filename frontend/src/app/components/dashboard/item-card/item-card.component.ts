import { Component, inject, Input } from '@angular/core';
import { House } from '../../../interfaces/house';
import { Product } from '../../../interfaces/product';
import { HouseStore } from '../../../store/house.store';
import { MatSnackBarService } from '../../../services/matSnackBar/mat-snack-bar.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule],
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
    Category: {
      id: 0,
      name: ''
    },
    ProductDetails: []
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

  constructor(private matSnackBarService: MatSnackBarService, private router: Router) { }

  onSelectItem() {
    if (!this.isProduct) {
      this.houseStore.setHouseSelected(this.house);
      this.matSnackBarService.showSuccess(`House ${this.house.name} selected`);
    } else {
      this.router.navigate([`dashboard/product/${this.product.id}`]);
    }
  }

  getLatestProductDetailDate(): String {
    if (this.product.ProductDetails.length === 0) {
      return 'No expiration date';
    }
    let latestDate = new Date(this.product.ProductDetails[0].expiration_date);
    this.product.ProductDetails.forEach((productDetail) => {
      const expirationDate = new Date(productDetail.expiration_date);
      if (expirationDate > latestDate) {
        latestDate = expirationDate;
      }
    });
    return latestDate.getDate() + '-' + (latestDate.getMonth() + 1) + '-' + latestDate.getFullYear();
  }
  
  getTheDaysToExpire(): string {
    if (this.product.ProductDetails.length === 0) {
      return 'No expiration date';
    }
    let latestDate = new Date(this.product.ProductDetails[0].expiration_date);
    let today = new Date();
    let difference = latestDate.getTime() - today.getTime();
    let days = Math.ceil(difference / (1000 * 3600 * 24));
    if (days < 0) {
      return 'Expired ' + Math.abs(days) + ' days ago';
    }
    return days + ' days to expire';
  }

  getAllQuantity(): number {
    return this.product.ProductDetails.reduce((total, productDetail) => total + productDetail.quantity, 0);
  }
}