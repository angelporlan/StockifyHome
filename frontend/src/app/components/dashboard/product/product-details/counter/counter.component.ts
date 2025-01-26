import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input() number: number = 0;

  increment(): void {
    this.number++;
  }

  decrement(): void {
    this.number--;
  }
}
