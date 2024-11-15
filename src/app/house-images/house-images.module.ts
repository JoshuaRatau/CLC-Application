import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HouseImagesPageRoutingModule } from './house-images-routing.module';

import { HouseImagesPage } from './house-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HouseImagesPageRoutingModule
  ],
  declarations: [HouseImagesPage]
})
export class HouseImagesPageModule {}
