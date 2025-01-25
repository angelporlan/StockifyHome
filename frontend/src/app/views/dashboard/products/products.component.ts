import { Component } from '@angular/core';
import { InputSearchComponent } from '../../../components/dashboard/input-search/input-search.component';
import { ActionButtonComponent } from "../../../components/dashboard/action-button/action-button.component";

@Component({
  selector: 'app-products',
  imports: [InputSearchComponent, ActionButtonComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  onSearchChange(event: any) {
    console.log(event);
  }
}
