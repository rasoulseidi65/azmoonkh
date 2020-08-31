import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutAdminRoutingModule} from './layout-admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatButtonModule, MatIconModule, MatListModule, MatRadioModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {AccordionModule} from 'primeng/accordion';
import {
  DialogModule,
  DropdownModule, EditorModule,
  FieldsetModule, FileUploadModule, InputMaskModule, InputTextareaModule,
  InputTextModule, KeyFilterModule, MenubarModule,
  MessageModule,
  OverlayPanelModule,
  PanelModule, PasswordModule, ProgressSpinnerModule, RadioButtonModule,
  SplitButtonModule,
  ToolbarModule, TreeTableModule
} from 'primeng/primeng';
import {ContentdashboardComponent} from './contentdashboard/contentdashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {QuillModule} from 'ngx-quill';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {TableModule} from 'primeng/table';
import {NewteacherComponent} from './teacher/newteacher/newteacher.component';
import {TeacherlistComponent} from './teacher/teacherlist/teacherlist.component';
import {IRCurrencyPipe} from 'ngx-persian';
import { StudentlistComponent } from './student/studentlist/studentlist.component';
import {SharedmoduleModule} from '../../SharedModule/sharedmodule.module';
import { ListResultComponent } from './student/list-result/list-result.component';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [DashboardComponent, ContentdashboardComponent,   NewteacherComponent, TeacherlistComponent, StudentlistComponent, ListResultComponent,],
  imports: [
    CommonModule,

    LayoutAdminRoutingModule,
    MatButtonModule,
    AccordionModule,
    ToolbarModule,
    SplitButtonModule,
    OverlayPanelModule,
    PanelModule,
    InputTextModule,
    FieldsetModule,
    MatRadioModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
    DropdownModule,
    InputTextareaModule,
    EditorModule,
    DpDatePickerModule,
    QuillModule.forRoot(),
    FileUploadModule,
    TableModule,
    DialogModule,
    PasswordModule,
    KeyFilterModule,
    InputMaskModule,
    MenubarModule,
    TreeTableModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    NgxPrintModule,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [DashboardComponent]
})
export class LayoutAdminModule {
}
