import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-default-select',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './default-select.component.html',
  styleUrl: './default-select.component.css'
})
export class DefaultSelectComponent {
@Input() label: string = '';
@Input() options: any[] = [];
@Output() inputValueChange = new EventEmitter<number>();
@Input() value: any = 0;

onInputChange() {
  this.inputValueChange.emit(this.value);
}
}
