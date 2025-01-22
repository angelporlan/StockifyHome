import { Component } from '@angular/core';
import { InfoBoxesComponent } from '../../../components/dashboard/main-content/info-boxes/info-boxes.component';
import { TitleComponent } from '../../../components/dashboard/title/title.component';

@Component({
  selector: 'app-main-content',
  imports: [InfoBoxesComponent, TitleComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

}
