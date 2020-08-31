import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/Guards/auth.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    data: { title: 'home', breadcrumb: 'home'}
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin/panel',
    loadChildren: () => import('./Core/LayoutAdmin/layout-admin.module').then(m => m.LayoutAdminModule),

  },
  {
    path: 'master/panel',
    loadChildren: () => import('./Core/LayoutMaster/layout-master.module').then(m => m.LayoutMasterModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'stud/panel',
    loadChildren: () => import('./Core/LayoutUsers/layoutusers.module').then(m => m.LayoutusersModule),

  },

  // { path: '**',
  //   loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  //   data: { title: 'home', breadcrumb: 'home'}  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
