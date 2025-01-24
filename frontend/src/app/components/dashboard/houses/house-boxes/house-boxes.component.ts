import { Component, inject } from '@angular/core';
import { HouseStore } from '../../../../store/house.store';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-boxes',
  imports: [ItemCardComponent, CommonModule],
  templateUrl: './house-boxes.component.html',
  styleUrl: './house-boxes.component.css'
})
export class HouseBoxesComponent {
  private houseStore = inject(HouseStore);
  public houses = this.houseStore.houses();

}
