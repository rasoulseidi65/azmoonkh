import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {StudentloginComponent} from './studentlogin/studentlogin.component';
import {AuthGuard} from './Guards/auth.guard';
import {AdminloginComponent} from './adminlogin/adminlogin.component';

const routes: Routes = [
  {
    path: 'login/:id',
    component: LoginComponent
  },
  {
    path: 'register/:id',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminloginComponent
  },
  {
    path: 'stud',
    component: StudentloginComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
