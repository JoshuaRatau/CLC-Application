import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './registration.page'; // Change this to RegisterPage

const routes: Routes = [
  {
    path: '',
    component: RegisterPage // Change this to RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationPageRoutingModule {}

