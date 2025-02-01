import { Component, Input } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { TitleComponent } from '../../title/title.component';
import { ProductDetail } from '../../../../interfaces/product-detail';
import { DetailsTableComponent } from './details-table/details-table.component';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../../../general/modals/product-modal/product-modal.component';

@Component({
  selector: 'app-product-details',
  imports: [TitleComponent, DetailsTableComponent, ActionButtonComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input() product: Product | undefined = undefined;
  details: ProductDetail[] = [{
    id: 0,
    quantity: 0,
    expiration_date: ''
  }];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDetailsProduct();
  }

  getDetailsProduct(): void {
    if (this.product) {
      this.product.ProductDetails.length > 0 ? this.details = this.product.ProductDetails : null;
    }
  }

  openDialog() {
    this.dialog.open(ProductModalComponent, {
      width: '400px',
      data: { isProduct: false }
    });
  }
}
