import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-input-file',
  imports: [CommonModule],
  templateUrl: './default-input-file.component.html',
  styleUrl: './default-input-file.component.css'
})
export class DefaultInputFileComponent {
  imageUrl: string | ArrayBuffer | null = null;
  @Output() imageSelected = new EventEmitter<string>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.imageSelected.emit(this.imageUrl as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
