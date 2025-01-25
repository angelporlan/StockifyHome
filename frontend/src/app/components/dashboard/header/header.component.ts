import { Component, inject, Input } from '@angular/core';
import { HouseStore } from '../../../store/house.store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = 'Dashboard';
  public houseName: string = 'No house selected';
  public houseStore = inject(HouseStore);

  constructor() { }

  ngOnInit(): void {
  }

}
