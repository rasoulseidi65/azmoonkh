import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutUsersRoutingModule } from './layoutusers-routing.module';
import {DashboardComponent} from './dashboardUser/dashboard.component';

import {LayoutModule} from "../../layout/layout.module";
import { ContentdashboardstudComponent } from './contentdashboardstud/contentdashboardstud.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TransactionStudComponent } from './transaction-stud/transaction-stud.component';
import { StudenteditComponent } from './studentedit/studentedit.component';
import {ToastModule} from 'primeng/toast';
import {SharedmoduleModule} from '../../SharedModule/sharedmodule.module';
import { CardazmoonComponent } from './cardazmoon/cardazmoon.component';
import {NgxPrintModule} from 'ngx-print';
import { TestResultComponent } from './test-result/test-result.component';


@NgModule({
  declarations: [DashboardComponent, ContentdashboardstudComponent, TransactionStudComponent, StudenteditComponent, CardazmoonComponent, TestResultComponent],
  imports: [
    CommonModule,
    LayoutUsersRoutingModule,
    SharedmoduleModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule

  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LayoutusersModule { }
