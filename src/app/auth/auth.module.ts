import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {NgOtpInputModule} from 'ng-otp-input';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import {SharedmoduleModule} from '../SharedModule/sharedmodule.module';
import { NgxPersianModule} from 'ngx-persian';



@NgModule({
  declarations: [LoginComponent,RegisterComponent, StudentloginComponent, AdminloginComponent ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedmoduleModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    DpDatePickerModule,
    NgOtpInputModule,

    NgxPersianModule,
  ],

})
export class AuthModule { }
