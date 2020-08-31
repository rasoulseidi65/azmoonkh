import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutMasterRoutingModule } from './layout-master-routing.module';
import {DashboardmasterComponent} from './dashboardmaster/dashboardmaster.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SchoollistComponent } from './school/schoollist/schoollist.component';
import { ReportComponent } from './report/report.component';
import {SharedmoduleModule} from '../../SharedModule/sharedmodule.module';
import {NgxPrintModule} from 'ngx-print';
import { ListAllResultComponent } from './student/list-all-result/list-all-result.component';


@NgModule({
  declarations: [DashboardmasterComponent, StudentListComponent, SchoollistComponent, ReportComponent, ListAllResultComponent],
  imports: [
    CommonModule,
    LayoutMasterRoutingModule,
    SharedmoduleModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule,


  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[DashboardmasterComponent]
})
export class LayoutMasterModule { }
