import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameFoodsBoxComponent } from './name-foods-box.component';

describe('NameFoodsBoxComponent', () => {
  let component: NameFoodsBoxComponent;
  let fixture: ComponentFixture<NameFoodsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameFoodsBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameFoodsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
