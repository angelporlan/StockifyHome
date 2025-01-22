import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  imports: [FormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.css'
})
export class InputSearchComponent {
  searchOption: string = '';
  
  @Input() placeholder: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchOption = input.value;
    this.searchChange.emit(this.searchOption);
  }
}
