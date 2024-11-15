import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImagesPage } from './upload-images.page';

const routes: Routes = [
  {
    path: '',
    component: UploadImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadImagesPageRoutingModule {}
