import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quick-action',
  imports: [],
  templateUrl: './quick-action.component.html',
  styleUrl: './quick-action.component.css'
})
export class QuickActionComponent {
  @Input() title: string = '';
}
