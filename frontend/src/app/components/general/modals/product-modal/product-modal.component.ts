import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DefaultInputComponent } from '../../inputs/default-input/default-input.component';
import { DefaultSelectComponent } from '../../inputs/default-select/default-select.component';
import { DefaultInputFileComponent } from '../../inputs/default-input-file/default-input-file.component';
import { CommonModule } from '@angular/common';
import { ProductDetailsModalComponent } from './product-details-modal/product-details-modal.component';
import { MatButton } from '@angular/material/button';
import { ProductService } from '../../../../services/product/product.service';
import { MatSnackBarService } from '../../../../services/matSnackBar/mat-snack-bar.service';
import { ProductStore } from '../../../../store/product.store';

@Component({
  selector: 'app-product-modal',
  imports: [MatDialogModule, DefaultInputComponent, DefaultSelectComponent, DefaultInputFileComponent, CommonModule, ProductDetailsModalComponent, MatButton],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {
  expirationDetails: { date: string, quantity: number }[] = [];
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

  name: string = '';
  categoryId: number = 0;
  image: string = '';
  details: { date: string; quantity: number }[] = [];
  productStore = inject(ProductStore);
  private dialogRef = inject(MatDialogRef<ProductModalComponent>);

  constructor(private productService: ProductService, private matSnackBarService: MatSnackBarService) {}

  createProduct() {

    const product: { name: string; category_id: number; image?: string; product_details: { date: string; quantity: number }[] } = {
      name: this.name,
      category_id: this.categoryId,
      image: this.image,
      product_details: this.details
    };

    if (product.image === '') {
      delete product.image;
    }


    this.productService.createProduct(product).subscribe(
      (response) => {
        this.matSnackBarService.showSuccess('Product created successfully');
        this.getProducts();
        this.dialogRef.close(); 
      },
      (error) => {
        this.matSnackBarService.showError('Failed to create product');
      }
    );
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('products: ', products);
        this.productStore.setProducts(products);
      },
      error: (err) => {
        console.error('error product ' + err);
      }});
  }
}