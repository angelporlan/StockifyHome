import { Component } from '@angular/core';
import { InputSearchComponent } from '../../../components/dashboard/input-search/input-search.component';
import { HouseBoxesComponent } from '../../../components/dashboard/houses/house-boxes/house-boxes.component';
import { ActionButtonComponent } from '../../../components/dashboard/action-button/action-button.component';

@Component({
  selector: 'app-houses',
  imports: [InputSearchComponent, HouseBoxesComponent, ActionButtonComponent],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.css'
})
export class HousesComponent {
  inputText: string = '';

  onSearchChange(event: any) {
    this.inputText = event
  }
}
