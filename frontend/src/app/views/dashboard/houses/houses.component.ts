import { Component } from '@angular/core';
import { InputSearchComponent } from '../../../components/dashboard/input-search/input-search.component';
import { HouseBoxesComponent } from '../../../components/dashboard/houses/house-boxes/house-boxes.component';

@Component({
  selector: 'app-houses',
  imports: [InputSearchComponent, HouseBoxesComponent],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.css'
})
export class HousesComponent {

  onSearchChange(event: any) {
    console.log(event);
  }
}
