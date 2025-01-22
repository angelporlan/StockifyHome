import { Component } from '@angular/core';
import { InfoBoxesComponent } from '../../../components/dashboard/main-content/info-boxes/info-boxes.component';
import { TitleComponent } from '../../../components/dashboard/title/title.component';
import { QuickActionsComponent } from '../../../components/dashboard/main-content/quick-actions/quick-actions.component';

@Component({
  selector: 'app-main-content',
  imports: [InfoBoxesComponent, TitleComponent, QuickActionsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

}
