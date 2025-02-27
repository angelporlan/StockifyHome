import { Component, inject, Input, OnInit } from '@angular/core';
import { House } from '../../../interfaces/house';
import { Product } from '../../../interfaces/product';
import { HouseStore } from '../../../store/house.store';
import { ProductStore } from '../../../store/product.store';
import { MatSnackBarService } from '../../../services/matSnackBar/mat-snack-bar.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HouseService } from '../../../services/house/house.service';
import { catchError, tap, throwError } from 'rxjs';
import { InputModalComponent } from '../../general/modals/input-modal/input-modal.component';
import { ConfirmModalComponent } from '../../general/modals/confirm-modal/confirm-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent implements OnInit {
  @Input() isProduct = false;
  @Input() product: Product = this.initializeProduct();
  @Input() house: House = this.initializeHouse();

  private houseStore = inject(HouseStore);
  private productStore = inject(ProductStore);
  isDetailProduct = false;
  private categories: { id: number; name: string }[] = [];

  constructor(
    private snackBar: MatSnackBarService,
    private router: Router,
    private dialog: MatDialog,
    private houseService: HouseService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.isDetailProduct = this.router.url.includes('product') && !this.router.url.includes('products');
  }

  private initializeProduct(): Product {
    return { id: 0, name: '', image: '', createdAt: '', updatedAt: '', houseId: 0, categoryId: 0, Category: { id: 0, name: '' }, ProductDetails: [] };
  }

  private initializeHouse(): House {
    return { id: 0, name: '', createdAt: '', updatedAt: '', UserId: 0 };
  }

  private loadCategories() {
    this.translate.get('CATEGORIES').subscribe(translations => {
      this.categories = Object.entries(translations).map(([id, name]) => ({ id: Number(id), name: name as string }));
    });
  }

  getCategoryName(): string | undefined {
    return this.categories.find(category => category.id === this.product.Category.id)?.name;
  }

  onSelectItem() {
    if (!this.isProduct) {
      this.selectHouse();
    } else {
      this.router.navigate([`dashboard/product/${this.product.id}`]);
    }
  }

  private selectHouse() {
    this.houseStore.setHouseSelected(this.house);
    this.productStore.resetState();
    this.router.navigate(['dashboard/products']);
    this.snackBar.showSuccess(`${this.translate.instant('DASHBOARD.HOUSES.HOUSE')} ${this.house.name} ${this.translate.instant('DASHBOARD.HOUSES.SELECTED')}`);
  }

  getLatestProductDetailDate(): string {
    if (!this.product.ProductDetails.length) return this.translate.instant('DASHBOARD.PRODUCT.NO_DATES');

    const latestDate = new Date(Math.max(...this.product.ProductDetails.map(d => new Date(d.expiration_date).getTime())));
    return `${latestDate.getDate()}-${latestDate.getMonth() + 1}-${latestDate.getFullYear()}`;
  }

  getTheDaysToExpire(): string {
    if (!this.product.ProductDetails.length) return this.translate.instant('DASHBOARD.PRODUCT.NO_DATES');

    const latestDate = new Date(Math.max(...this.product.ProductDetails.map(d => new Date(d.expiration_date).getTime())));
    const days = Math.ceil((latestDate.getTime() - Date.now()) / (1000 * 3600 * 24));

    if (days < 0) return `${this.translate.instant('DASHBOARD.PRODUCT.EXPIRED')} ${Math.abs(days)} ${this.translate.instant('DASHBOARD.PRODUCT.DAYS_AGO')}`;
    if (days === 0) return this.translate.instant('DASHBOARD.PRODUCT.EXPIRES_TODAY');
    if (days === 1) return this.translate.instant('DASHBOARD.PRODUCT.EXPIRES_TOMORROW');
    return `${days} ${this.translate.instant('DASHBOARD.PRODUCT.DAYS_TO_EXPIRE')}`;
  }

  getAllQuantity(): number {
    return this.product.ProductDetails.reduce((total, d) => total + d.quantity, 0);
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

  private deleteHouse() {
    this.houseService.deleteHouse(this.house.id).pipe(
      tap(() => {
        this.houseStore.deleteHouse(this.house.id);
        this.snackBar.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.HOUSE_DELETED'));
      }),
      catchError(error => {
        this.snackBar.showError(this.translate.instant('SNACKBARS.ERROR.HOUSE_DELETE'));
        return throwError(() => error);
      })
    ).subscribe();
  }

  private updateHouseName(newName: string) {
    this.houseService.updateHouse(this.house.id, { name: newName }).pipe(
      tap(() => {
        this.houseStore.updateHouse({ ...this.house, name: newName });
        this.snackBar.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.HOUSE_UPDATED'));
      }),
      catchError(error => {
        this.snackBar.showError(this.translate.instant('SNACKBARS.ERROR.HOUSE_UPDATE'));
        return throwError(() => error);
      })
    ).subscribe();
  }
}
