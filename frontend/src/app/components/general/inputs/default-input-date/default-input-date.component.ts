import { ChangeDetectionStrategy, Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-default-input-date',
  providers: [provideNativeDateAdapter(), {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DefaultInputDateComponent),
    multi: true,
  }],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
  templateUrl: './default-input-date.component.html',
  styleUrls: ['./default-input-date.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultInputDateComponent implements ControlValueAccessor {
  @Output() inputValueChange = new EventEmitter<string>();
  value: Date | null = null;

  onInputChange() {
    if (this.value) {
      const formattedDate = this.value.toISOString().split('T')[0];
      this.onChange(formattedDate);
      this.inputValueChange.emit(formattedDate);
    } else {
      this.onChange('');
      this.inputValueChange.emit('');
    }
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.value = new Date(value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
