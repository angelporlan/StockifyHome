import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-default-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.css'
})
export class DefaultInputComponent {
@Input() label: string = '';
@Input() placeholder: string = '';
@Output() inputValueChange = new EventEmitter<string>();
  value: string = ''; 

  onInputChange() {
    this.inputValueChange.emit(this.value);
  }
}
