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

@Component({
  selector: 'app-details-table',
  imports: [CommonModule, CounterComponent],
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

  constructor(private productService: ProductService, private dialog: MatDialog, private matSnackBarService: MatSnackBarService) {}
  
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
        title: 'Delete detail',
        message: '¿Are you sure you want to delete this detail?',
        action: () => this.deleteDetail(id)  
      }
    });
  }

  deleteDetail(id: number) {
    return this.productService.deleteProductDetail(id).pipe(
      tap(() => {
        this.productStore.deleteProductDetail(this.productId ? this.productId : 0, id);
        this.matSnackBarService.showSuccess('Detail deleted correctly');
      }),
      catchError((error) => {
        this.matSnackBarService.showError('Error deleting detail');
        return throwError(() => error);
      })
    );
  }

    // deleteProduct() {
    //   return this.productService.deleteProduct(this.realProduct.id).pipe(
    //     tap(() => {
    //       this.productStore.deleteProduct(this.realProduct.id);
    //       this.router.navigate(['/dashboard/products']);
    //       this.matSnackBarService.showSuccess('Producto eliminado correctamente');
    //     }),
    //     catchError((error) => {
    //       this.matSnackBarService.showError('Error al eliminar el producto');
    //       return throwError(() => error);
    //     })
    //   );
    // }
}
