import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TitleComponent } from '../../title/title.component';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { Product } from '../../../../interfaces/product';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../general/modals/confirm-modal/confirm-modal.component';
import { ProductService } from '../../../../services/product/product.service';
import { Router } from '@angular/router';
import { MatSnackBarService } from '../../../../services/matSnackBar/mat-snack-bar.service';
import { ProductStore } from '../../../../store/product.store';
import { catchError, tap, throwError } from 'rxjs';
import { EditProductModalComponent } from '../../../general/modals/edit-product-modal/edit-product-modal.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [TitleComponent, ItemCardComponent, ActionButtonComponent, TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnChanges {
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
  };
  totalQuantity: number = 0;
  productStore = inject(ProductStore);

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private router: Router,
    private matSnackBarService: MatSnackBarService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.validProduct();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.validProduct();
    }
  }

  validProduct(): void {
    if (this.product) {
      this.realProduct = this.product;
      this.calculateTotalQuantity();
    }
  }

  private calculateTotalQuantity(): void {
    this.totalQuantity = this.realProduct.ProductDetails.reduce((acc, detail) => acc + detail.quantity, 0);
    this.cdr.markForCheck();
  }

  openDeleteDialog(): void {
    this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: this.translate.instant('DASHBOARD.PRODUCT.DETAILS.DELETE_MODAL.TITLE'),
        message: this.translate.instant('DASHBOARD.PRODUCT.DETAILS.DELETE_MODAL.MESSAGE'),
        action: () => this.deleteProduct()
      }
    });
  }

  openEditDialog(): void {
    this.dialog.open(EditProductModalComponent, {
      width: '400px',
      data: {
        id: this.product ? this.product.id : this.realProduct.id,
        name: this.product ? this.product.name : this.realProduct.name,
        categoryId: this.product ? this.product.Category.id : this.realProduct.Category.id,
      }
    });
  }

  deleteProduct() {
    return this.productService.deleteProduct(this.realProduct.id).pipe(
      tap(() => {
        this.productStore.deleteProduct(this.realProduct.id);
        this.router.navigate(['/dashboard/products']);
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.PRODUCT_DELETED'));
      }),
      catchError((error) => {
        this.matSnackBarService.showError(this.translate.instant('SNACKBARS.ERROR.PRODUCT_DELETE'));
        return throwError(() => error);
      })
    );
  }
}