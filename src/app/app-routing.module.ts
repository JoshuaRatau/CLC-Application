import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UploadImagesPage } from './upload-images/upload-images.page'; 
import { HouseImagesPage } from './house-images/house-images.page'; 


const routes: Routes = [ 




  {
    path: '',
    redirectTo: 'home',  // Default route set to 'home'
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'house',
    loadChildren: () => import('./house/house.module').then(m => m.HousePageModule)
  },
  { path: 'upload-images/:houseId', loadComponent: () => import('./upload-images/upload-images.page').then(m => m.UploadImagesPage) },
  {
    path: 'house-images',
    loadChildren: () => import('./house-images/house-images.module').then( m => m.HouseImagesPageModule)
  },
  { path: 'house-images/:houseId', component: HouseImagesPage },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

