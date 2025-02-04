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
import { EditProductModalComponent } from '../../../general/modals/edit-product-modal/edit-product-modal.component';

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

  openDeleteDialog(): void {
    this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: 'Delete product',
        message: 'Are you sure you want to delete this product?',
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
        // image: this.product ? this.product.image : this.realProduct.image,
        categoryId: this.product ? this.product.Category.id : this.realProduct.Category.id,
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
