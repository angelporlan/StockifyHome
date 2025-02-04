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

@Component({
  selector: 'app-edit-product-modal',
  imports: [MatDialogModule, DefaultInputComponent, DefaultSelectComponent, CommonModule, MatButton, LoaderModalComponent],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.css'
})
export class EditProductModalComponent {
  id: number = 0;
  title: string = 'Edit product';
  // image: string = '';
  name: string = '';
  categoryId: number = 0;
  isLoading: boolean = false;
  productStore = inject(ProductStore);
  private dialogRef = inject(MatDialogRef<ProductModalComponent>);

  categories = [
    { id: 1, name: "Oil, spices, and sauces" },
    { id: 2, name: "Water and soft drinks" },
    { id: 3, name: "Snacks" },
    { id: 4, name: "Rice, legumes, and pasta" },
    { id: 5, name: "Sugar, candies, and chocolate" },
    { id: 6, name: "Baby" },
    { id: 7, name: "Winery" },
    { id: 8, name: "Cocoa, coffee, and infusions" },
    { id: 9, name: "Meat" },
    { id: 10, name: "Cereals and cookies" },
    { id: 11, name: "Deli and cheese" },
    { id: 12, name: "Frozen foods" },
    { id: 13, name: "Preserves, broths, and creams" },
    { id: 14, name: "Hair care" },
    { id: 15, name: "Facial and body care" },
    { id: 16, name: "Phytotherapy and pharmacy" },
    { id: 17, name: "Fruits and vegetables" },
    { id: 18, name: "Eggs, milk, and butter" },
    { id: 19, name: "Cleaning and home" },
    { id: 20, name: "Makeup" },
    { id: 21, name: "Seafood and fish" },
    { id: 22, name: "Pets" },
    { id: 23, name: "Bakery and pastries" },
    { id: 24, name: "Desserts and yogurts" },
    { id: 25, name: "Juices" }
  ];

  constructor(private productService: ProductService,
    private matSnackBarService: MatSnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.name = data.name;
    // this.image = data.image;
    this.categoryId = data.categoryId;
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
        this.productStore.updateProduct(product);
        this.matSnackBarService.showSuccess('Product updated successfully');
        this.dialogRef.close();
      }),
      catchError((error) => {
        this.isLoading = false;
        this.matSnackBarService.showError(error.error.error);
        throw error;
      })
    )
    .subscribe();
  }
}
