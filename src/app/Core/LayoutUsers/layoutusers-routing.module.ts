import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboardUser/dashboard.component';
import {ContentdashboardstudComponent} from './contentdashboardstud/contentdashboardstud.component';
import {TransactionStudComponent} from './transaction-stud/transaction-stud.component';
import {AuthGuard} from '../../auth/Guards/auth.guard';
import {StudenteditComponent} from './studentedit/studentedit.component';
import {CardazmoonComponent} from './cardazmoon/cardazmoon.component';
import {TestResultComponent} from './test-result/test-result.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate:[AuthGuard],
    children: [{
      path: '',
      component:ContentdashboardstudComponent
  }],

  },
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'edit',
      component:StudenteditComponent
    }]},
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'card',
      component:CardazmoonComponent
    }]},
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'testResult/:id',
      component:TestResultComponent
    }]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutUsersRoutingModule {
}
