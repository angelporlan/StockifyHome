import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-button',
  imports: [],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent {
  @Input() text: string = 'Button';
  @Input() actionType: 'addHouse' | 'editHouse' | 'deleteHouse' | 
  'addProduct' | 'addProductDetail' | 'editProduct' | 'deleteProduct' = 'addHouse';
}
