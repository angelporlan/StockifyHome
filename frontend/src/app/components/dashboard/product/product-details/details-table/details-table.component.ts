import { Component, inject, Input } from '@angular/core';
import { ProductDetail } from '../../../../../interfaces/product-detail';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter/counter.component';
import { ProductService } from '../../../../../services/product/product.service';
import { ProductStore } from '../../../../../store/product.store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../../general/modals/confirm-modal/confirm-modal.component';
import { catchError, tap, throwError } from 'rxjs';
import { MatSnackBarService } from '../../../../../services/matSnackBar/mat-snack-bar.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details-table',
  imports: [CommonModule, CounterComponent, TranslatePipe],
  templateUrl: './details-table.component.html',
  styleUrl: './details-table.component.css'
})
export class DetailsTableComponent {
  @Input() productId: number | undefined = 0;
  @Input() details: ProductDetail[] | undefined = [{
    id: 0,
    quantity: 0,
    expiration_date: ''
  }];

  isLoading: boolean[] = [];
  productStore = inject(ProductStore);

  constructor(private productService: ProductService, private dialog: MatDialog, private matSnackBarService: MatSnackBarService, private translate: TranslateService) {}
  
  ngOnInit(): void {
    console.log(this.details);
  }

  getFormattedDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  updateDetail(event: any): void {
    if (this.productId !== undefined) {
      this.productStore.updateProductDetail(this.productId, event.id, event.quantity);
    }
    this.productService.updateProductDetail(event).subscribe({

    });
  }

  openDialog(id: number): void {
    this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: this.translate.instant('DASHBOARD.PRODUCT.PRODUCT_DETAILS.DETAILS_TABLE.DELETE_DETAIL_MODAL.TITLE'),
        message: this.translate.instant('DASHBOARD.PRODUCT.PRODUCT_DETAILS.DETAILS_TABLE.DELETE_DETAIL_MODAL.MESSAGE'),
        action: () => this.deleteDetail(id)  
      }
    });
  }

  deleteDetail(id: number) {
    return this.productService.deleteProductDetail(id).pipe(
      tap(() => {
        this.productStore.deleteProductDetail(this.productId ? this.productId : 0, id);
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBAR.SUCCESS.PRODUCT_DETAILS_DELETED'));
      }),
      catchError((error) => {
        this.matSnackBarService.showError(this.translate.instant('SNACKBAR.ERROR.PRODUCT_DETAILS_DELETE'));
        return throwError(() => error);
      })
    );
  }

}
