import { Component, Input } from '@angular/core';
import { ProductDetail } from '../../../../../interfaces/product-detail';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-details-table',
  imports: [CommonModule, CounterComponent],
  templateUrl: './details-table.component.html',
  styleUrl: './details-table.component.css'
})
export class DetailsTableComponent {
  @Input() details: ProductDetail[] = [{
    id: 0,
    quantity: 0,
    expiration_date: ''
  }];
  

  getFormattedDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
}
