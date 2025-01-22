import { Component } from '@angular/core';
import { InputSearchComponent } from '../../../components/dashboard/input-search/input-search.component';

@Component({
  selector: 'app-products',
  imports: [InputSearchComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  onSearchChange(event: any) {
    console.log(event);
  }
}
