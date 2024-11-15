import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseImagesPage } from './house-images.page';

const routes: Routes = [
  {
    path: '',
    component: HouseImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseImagesPageRoutingModule {}
