import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-modal',
  imports: [CommonModule],
  templateUrl: './loader-modal.component.html',
  styleUrl: './loader-modal.component.css'
})
export class LoaderModalComponent {
  @Input() isBig: boolean = false;
}
