import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBoxesComponent } from './product-boxes.component';

describe('ProductBoxesComponent', () => {
  let component: ProductBoxesComponent;
  let fixture: ComponentFixture<ProductBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBoxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
