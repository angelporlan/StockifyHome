import { Component, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  imports: [MatDialogModule, MatButton, CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';  
  @Input() action: Function = () => {};
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.action = data.action;
  }

  actionModal() {
    this.isLoading = true; 
  
    const result = this.action();
  
    if (result instanceof Promise) {
      result
        .then(() => this.dialogRef.close()) 
        .catch(() => (this.isLoading = false));
    } else if (result instanceof Observable) {
      result.subscribe({
        next: () => this.dialogRef.close(),
        error: () => (this.isLoading = false),
      });
    } else {
      this.dialogRef.close();
    }
  }
}
