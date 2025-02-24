import { Component, inject, Input } from '@angular/core';
import { House } from '../../../interfaces/house';
import { Product } from '../../../interfaces/product';
import { HouseStore } from '../../../store/house.store';
import { MatSnackBarService } from '../../../services/matSnackBar/mat-snack-bar.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../general/modals/confirm-modal/confirm-modal.component';
import { HouseService } from '../../../services/house/house.service';
import { catchError, tap, throwError } from 'rxjs';
import { InputModalComponent } from '../../general/modals/input-modal/input-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { ProductStore } from '../../../store/product.store';

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
  private productStore = inject(ProductStore);
  categories: { id: number; name: string }[] = [];

  constructor(private matSnackBarService: MatSnackBarService, private router: Router, private dialog: MatDialog, private houseService: HouseService, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('CATEGORIES').subscribe((translations: any) => {
      this.categories = Object.keys(translations).map(id => ({
        id: Number(id),
        name: translations[id]
      }));
    });
  }

  getCategoryName() {
    return this.categories.find(category => category.id === this.product.Category.id)?.name;
  }

  onSelectItem() {
    if (!this.isProduct) {
      this.houseStore.setHouseSelected(this.house);
      this.productStore.resetState();
      this.router.navigate([`dashboard/products`]);
      this.matSnackBarService.showSuccess(`${this.translate.instant('DASHBOARD.HOUSES.HOUSE')} ${this.house.name} ${this.translate.instant('DASHBOARD.HOUSES.SELECTED')}`);
    } else {
      this.router.navigate([`dashboard/product/${this.product.id}`]);
    }
  }

  getLatestProductDetailDate(): String {
    if (this.product.ProductDetails.length === 0) {
      return this.translate.instant('DASHBOARD.PRODUCT.NO_DATES');
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
      return this.translate.instant('DASHBOARD.PRODUCT.NO_DATES');
    }
    let latestDate = new Date(this.product.ProductDetails[0].expiration_date);
    let today = new Date();
    let difference = latestDate.getTime() - today.getTime();
    let days = Math.ceil(difference / (1000 * 3600 * 24));
    
    if (days < 0) {
      return `${this.translate.instant('DASHBOARD.PRODUCT.EXPIRED')} ${Math.abs(days)} ${this.translate.instant('DASHBOARD.PRODUCT.DAYS_AGO')}`;
    } else if (days === 0) {
      return this.translate.instant('DASHBOARD.PRODUCT.EXPIRES_TODAY');
    } else if (days === 1) {
      return this.translate.instant('DASHBOARD.PRODUCT.EXPIRES_TOMORROW');
    }
    return `${days} ${this.translate.instant('DASHBOARD.PRODUCT.DAYS_TO_EXPIRE')}`;
  }

  getAllQuantity(): number {
    return this.product.ProductDetails.reduce((total, productDetail) => total + productDetail.quantity, 0);
  }

  openEditModal() {
    this.dialog.open(InputModalComponent, {
      width: '400px',
      data: {
        title: this.translate.instant('DASHBOARD.HOUSES.EDIT_HOUSE_DIALOG.TITLE'),
        labelInput: this.translate.instant('DASHBOARD.HOUSES.EDIT_HOUSE_DIALOG.LABEL_INPUT'),
        placeholderInput: this.translate.instant('DASHBOARD.HOUSES.EDIT_HOUSE_DIALOG.PLACEHOLDER_INPUT'),
        action: (newName: string) => this.updateHouseName(newName)
      }
    });
  }

  openDeleteModal() {
    this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: this.translate.instant('DASHBOARD.HOUSES.DELETE_HOUSE_DIALOG.TITLE'),
        message: this.translate.instant('DASHBOARD.HOUSES.DELETE_HOUSE_DIALOG.MESSAGE'),
        action: () => this.deleteHouse()
      }
    });
  }

  deleteHouse() {
    return this.houseService.deleteHouse(this.house.id).pipe(
      tap(() => {
        this.houseStore.deleteHouse(this.house.id);
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.HOUSE_DELETED'));
      }),
      catchError((error) => {
        this.matSnackBarService.showError(this.translate.instant('SNACKBARS.ERROR.HOUSE_DELETE'));
        return throwError(() => error);
      }
    ));
  }

  updateHouseName(newName: string) {
    return this.houseService.updateHouse(this.house.id, { name: newName }).pipe(
      tap(() => {
        this.houseStore.updateHouse({ ...this.house, name: newName });
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.HOUSE_UPDATED'));
      }),
      catchError((error) => {
        this.matSnackBarService.showError(this.translate.instant('SNACKBARS.ERROR.HOUSE_UPDATE'));
        return throwError(() => error);
      })
    );
  }

}