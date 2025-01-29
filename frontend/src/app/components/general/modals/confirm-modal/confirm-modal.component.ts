import { Component, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  imports: [MatDialogModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';  
  @Input() action: Function = () => {};

  actionModal() {
    this.action();
  }
}
