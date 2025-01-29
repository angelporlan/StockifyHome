import { Component, Input } from '@angular/core';
import { TitleComponent } from '../../title/title.component';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { Product } from '../../../../interfaces/product';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../general/modals/confirm-modal/confirm-modal.component';

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

  constructor(private dialog: MatDialog) {}

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
        action: () => { console.log('Producto eliminado'); } 
      }
    });
  }

}
