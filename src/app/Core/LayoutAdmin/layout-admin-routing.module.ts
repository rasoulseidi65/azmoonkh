import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContentdashboardComponent} from './contentdashboard/contentdashboard.component';
import {AdminGuard} from '../../auth/Guards/admin.guard';
import {StudentlistComponent} from './student/studentlist/studentlist.component';
import {ListResultComponent} from './student/list-result/list-result.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
   // canActivate:[AdminGuard],
    children: [{
      path: '',
      component: ContentdashboardComponent
    }]
  },
  {
    path: '',
    component: DashboardComponent,
    //canActivate:[AdminGuard],
    children: [{
      path: 'list',
      component: StudentlistComponent
    }]
  },
  {
    path: '',
    component: DashboardComponent,
    //canActivate:[AdminGuard],
    children: [{
      path: 'listResult/:id',
      component: ListResultComponent
    }]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAdminRoutingModule {
}
