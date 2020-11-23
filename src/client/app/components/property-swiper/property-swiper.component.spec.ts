import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySwiperComponent } from './property-swiper.component';

describe('PropertySwiperComponent', () => {
  let component: PropertySwiperComponent;
  let fixture: ComponentFixture<PropertySwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertySwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
