import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DefaultInputComponent } from '../../inputs/default-input/default-input.component';
import { DefaultSelectComponent } from '../../inputs/default-select/default-select.component';
import { DefaultInputFileComponent } from '../../inputs/default-input-file/default-input-file.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { LoaderModalComponent } from '../loader-modal/loader-modal.component';
import { ProductService } from '../../../../services/product/product.service';
import { MatSnackBarService } from '../../../../services/matSnackBar/mat-snack-bar.service';
import { catchError, tap } from 'rxjs';
import { ProductStore } from '../../../../store/product.store';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-product-modal',
  imports: [MatDialogModule, DefaultInputComponent, DefaultSelectComponent, CommonModule, MatButton, LoaderModalComponent, TranslatePipe],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.css'
})
export class EditProductModalComponent {
  id: number = 0;
  title: string = this.translate.instant('DASHBOARD.PRODUCT.DETAILS.EDIT_MODAL.TITLE');
  // image: string = '';
  name: string = '';
  categoryId: number = 0;
  isLoading: boolean = false;
  productStore = inject(ProductStore);
  private dialogRef = inject(MatDialogRef<ProductModalComponent>);

  categories: { id: number; name: string }[] = [];

  constructor(private productService: ProductService,
    private translate: TranslateService,
    private matSnackBarService: MatSnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.name = data.name;
    // this.image = data.image;
    this.categoryId = data.categoryId;
  }

  ngOnInit() {
    this.translate.get('CATEGORIES').subscribe((translations: any) => {
      this.categories = Object.keys(translations).map(id => ({
        id: Number(id),
        name: translations[id]
      }));
    });
  }

  updateProduct() {
    this.isLoading = true;
    const product = {
      id: this.id,
      name: this.name,
      // image: this.image,
      category_id: this.categoryId
    };
  this.productService.updateProduct(product)
    .pipe(
      tap(() => {
        this.isLoading = false;
        this.productStore.updateProduct(product, this.categories);
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.PRODUCT_UPDATED'));
        this.dialogRef.close();
      }),
      catchError((error) => {
        this.isLoading = false;
        this.matSnackBarService.showError(this.translate.instant('SNACKBARS.ERROR.PRODUCT_UPDATE'));
        throw error;
      })
    )
    .subscribe();
  }
}
