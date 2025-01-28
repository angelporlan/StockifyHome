import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInputNumberComponent } from './default-input-number.component';

describe('DefaultInputNumberComponent', () => {
  let component: DefaultInputNumberComponent;
  let fixture: ComponentFixture<DefaultInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultInputNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
