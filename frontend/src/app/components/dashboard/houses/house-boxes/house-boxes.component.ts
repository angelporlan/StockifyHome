import { Component, inject, Input } from '@angular/core';
import { HouseStore } from '../../../../store/house.store';
import { ItemCardComponent } from '../../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { House } from '../../../../interfaces/house';

@Component({
  selector: 'app-house-boxes',
  imports: [ItemCardComponent, CommonModule],
  templateUrl: './house-boxes.component.html',
  styleUrl: './house-boxes.component.css'
})
export class HouseBoxesComponent {
  houseStore = inject(HouseStore);
  @Input() searchText: string = '';
  
  filterHouses(houses: House[]) {
    if (this.searchText === '') {
      return houses;
    }
    const searchTextLower = this.searchText.toLowerCase();
    return houses.filter((house: any) => house.name.toLowerCase().includes(searchTextLower));
  }
}
