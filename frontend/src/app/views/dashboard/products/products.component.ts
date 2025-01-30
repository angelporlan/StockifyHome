import { Component } from '@angular/core';
import { InputSearchComponent } from '../../../components/dashboard/input-search/input-search.component';
import { ActionButtonComponent } from "../../../components/dashboard/action-button/action-button.component";
import { ProductBoxesComponent } from '../../../components/dashboard/products/product-boxes/product-boxes.component';
import { ProductModalComponent } from '../../../components/general/modals/product-modal/product-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  imports: [InputSearchComponent, ActionButtonComponent, ProductBoxesComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(public dialog: MatDialog) {}
  inputText: string = '';

  onSearchChange(event: any) {
    this.inputText = event
  }

  openDialog() {
    this.dialog.open(ProductModalComponent, {
      width: '400px', 
    });
  }
}
