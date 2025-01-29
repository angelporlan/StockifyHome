import { Component, inject, Input } from '@angular/core';
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
  productStore = inject(ProductStore);

  constructor(private dialog: MatDialog, private productService: ProductService, private router: Router, private matSnackBarService: MatSnackBarService) {}

  ngOnInit(): void {
    this.validProduct();
  }

  validProduct(): void {
    if (this.product) {
      this.realProduct = this.product;
      console.log(this.product);
    }
  }

  openDialog(): void {
    this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: 'Eliminar producto',
        message: '¿Estás seguro de que quieres eliminar este producto?',
        action: () => this.deleteProduct()  
      }
    });
  }

  deleteProduct() {
    return this.productService.deleteProduct(this.realProduct.id).pipe(
      tap(() => {
        this.productStore.deleteProduct(this.realProduct.id);
        this.router.navigate(['/dashboard/products']);
        this.matSnackBarService.showSuccess('Producto eliminado correctamente');
      }),
      catchError((error) => {
        this.matSnackBarService.showError('Error al eliminar el producto');
        return throwError(() => error);
      })
    );
  }

}
