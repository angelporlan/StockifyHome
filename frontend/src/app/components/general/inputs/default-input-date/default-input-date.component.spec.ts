import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInputDateComponent } from './default-input-date.component';

describe('DefaultInputDateComponent', () => {
  let component: DefaultInputDateComponent;
  let fixture: ComponentFixture<DefaultInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultInputDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
