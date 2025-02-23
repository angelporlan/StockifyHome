import { Component, inject, Input } from '@angular/core';
import { HouseStore } from '../../../store/house.store';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../../../store/product.store';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = 'Dashboard';
  public houseName: string = 'No house selected';
  public houseStore = inject(HouseStore);
  public productStore = inject(ProductStore);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    window.history.back();
  }

  removeHouseSelected(): void {
    this.houseStore.deleteHouseSelected();
    this.productStore.deleteProducts();
    this.router.navigate(['/dashboard/houses']);
  }
}
