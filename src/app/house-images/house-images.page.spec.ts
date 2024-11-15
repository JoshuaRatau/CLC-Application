import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseImagesPage } from './house-images.page';

describe('HouseImagesPage', () => {
  let component: HouseImagesPage;
  let fixture: ComponentFixture<HouseImagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
