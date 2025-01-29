import { Component, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

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

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.action = data.action;
  }

  actionModal() {
    this.action();
    this.dialogRef.close();
  }
}
