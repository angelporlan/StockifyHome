import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInputFileComponent } from './default-input-file.component';

describe('DefaultInputFileComponent', () => {
  let component: DefaultInputFileComponent;
  let fixture: ComponentFixture<DefaultInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultInputFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
