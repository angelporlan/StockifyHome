import { Component, Inject, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DefaultInputComponent } from '../../inputs/default-input/default-input.component';
import { LoaderModalComponent } from '../loader-modal/loader-modal.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSnackBarService } from '../../../../services/matSnackBar/mat-snack-bar.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-input-modal',
  imports: [MatDialogModule, MatButton, DefaultInputComponent, LoaderModalComponent, CommonModule, TranslatePipe],
  templateUrl: './input-modal.component.html',
  styleUrl: './input-modal.component.css'
})
export class InputModalComponent {
  @Input() title: string = '';
  @Input() labelInput: string = '';
  @Input() placeholderInput: string = '';
  @Input() action: Function = () => {};

  value: string = '';
  isLoading: boolean = false;

  constructor(
    private matSnackBarService: MatSnackBarService,
    public dialogRef: MatDialogRef<InputModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.labelInput = data.labelInput;
    this.placeholderInput = data.placeholderInput;
    this.action = data.action;
    this.value = data.password || ''; 
  }

  actionModal() {
    this.isLoading = true;
    
    if (!this.value) {
      this.matSnackBarService.showError('Please fill the input');
      this.isLoading = false;
      return;
    }

    const result = this.action(this.value); 

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
