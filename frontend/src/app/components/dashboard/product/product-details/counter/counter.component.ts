import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  imports: [CommonModule]
})
export class CounterComponent {
  @Input() id: number = 0;
  @Input() quantity: number = 0;
  @Input() isLoading: boolean = true;
  @Output() numberChange: EventEmitter<{ id: number, quantity: number }> = new EventEmitter<{ id: number, quantity: number }>();
  lastId: number = 0;

  increment(): void {
    this.quantity++;
    this.lastId = this.id;
    this.numberChange.emit({ id: this.id, quantity: this.quantity });
  }

  decrement(): void {
    this.quantity--;
    this.lastId = this.id;
    this.numberChange.emit({ id: this.id, quantity: this.quantity });
  }
}
