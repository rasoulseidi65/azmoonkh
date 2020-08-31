import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardmasterComponent} from './dashboardmaster/dashboardmaster.component';
import {StudentListComponent} from '../LayoutMaster/student/student-list/student-list.component';
import {SchoollistComponent} from './school/schoollist/schoollist.component';
import {ReportComponent} from './report/report.component';
import {ListAllResultComponent} from './student/list-all-result/list-all-result.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardmasterComponent
  },
  {
    path: '',
    component: DashboardmasterComponent,
    children: [
      {
        path: 'student',
        component: StudentListComponent
      }

    ]
  },

  {
    path: '',
    component: DashboardmasterComponent,
    children: [
      {
        path: 'school',
        component: SchoollistComponent
      }

    ]
  },
  {
    path:'',
    component:DashboardmasterComponent,
    children:[
      {
        path:'result',
        component:ListAllResultComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutMasterRoutingModule {
}
