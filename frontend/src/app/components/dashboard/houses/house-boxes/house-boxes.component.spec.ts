import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseBoxesComponent } from './house-boxes.component';

describe('HouseBoxesComponent', () => {
  let component: HouseBoxesComponent;
  let fixture: ComponentFixture<HouseBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseBoxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
