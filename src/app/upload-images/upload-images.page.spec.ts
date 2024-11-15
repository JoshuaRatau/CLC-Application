import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadImagesPage } from './upload-images.page';

describe('UploadImagesPage', () => {
  let component: UploadImagesPage;
  let fixture: ComponentFixture<UploadImagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
