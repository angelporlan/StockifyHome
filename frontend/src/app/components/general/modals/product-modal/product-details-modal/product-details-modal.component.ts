import { Component, EventEmitter, Output } from '@angular/core';
import { DefaultInputDateComponent } from '../../../inputs/default-input-date/default-input-date.component';
import { DefaultInputNumberComponent } from '../../../inputs/default-input-number/default-input-number.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details-modal',
  imports: [DefaultInputDateComponent, DefaultInputNumberComponent, MatIconModule, CommonModule, FormsModule, TranslatePipe],
  templateUrl: './product-details-modal.component.html',
  styleUrl: './product-details-modal.component.css'
})
export class ProductDetailsModalComponent {
  @Output() productDetailsChange = new EventEmitter<{ expiration_date: string; quantity: number }[]>();
  
  productDetails: { expiration_date: string; quantity: number }[] = [
    { expiration_date: '', quantity: 0 },
  ];

  addDetail() {
    this.productDetails.push({ expiration_date: '', quantity: 0 });
    console.log(this.productDetails);
  }

  removeDetail(index: number) {
    if (this.productDetails.length > 1) {
      this.productDetails.splice(index, 1);
      console.log(this.productDetails);
    }
  }

  onDetailChange<K extends keyof typeof this.productDetails[number]>(
    index: number,
    field: K,
    value: typeof this.productDetails[number][K]
  ) {
    this.productDetails[index][field] = value;
    this.productDetailsChange.emit(this.productDetails);
  }
}
