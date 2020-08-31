import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessageModule} from 'primeng/message';
import {
  AccordionModule,
  CaptchaModule,
  CheckboxModule,
  DialogModule, DropdownModule,
  FieldsetModule,
  FileUploadModule,
  InputMaskModule,
  InputTextareaModule, MenubarModule,
  PanelModule, ProgressSpinnerModule,
  RadioButtonModule, SplitButtonModule, ToolbarModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {MatButtonModule} from '@angular/material';
import {CarouselModule} from 'ngx-bootstrap/carousel';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    KeyFilterModule,
    MessageModule,
    RadioButtonModule,
    PanelModule,
    InputTextModule,
    InputMaskModule,
    DialogModule,
    FileUploadModule,
    InputTextareaModule,
    FieldsetModule,
    ProgressSpinnerModule,
    CheckboxModule,
    TableModule,
    CaptchaModule,
    DropdownModule,
    AccordionModule,
    ToolbarModule,
    MatButtonModule,
    MenubarModule,
    ToastModule,
    SplitButtonModule,
    CarouselModule
  ],
  exports: [
    CommonModule,
    InputTextModule,
    SplitButtonModule,
    CarouselModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    KeyFilterModule,
    MessageModule,
    RadioButtonModule,
    PanelModule,
    InputTextModule,
    InputMaskModule,
    DialogModule,
    FileUploadModule,
    InputTextareaModule,
    FieldsetModule,
    ProgressSpinnerModule,
    CheckboxModule,
    TableModule,
    CaptchaModule,
    DropdownModule,
    AccordionModule,
    ToolbarModule,
    MatButtonModule,
    MenubarModule,
    ToastModule,
  ],
})
export class PrimNgComponentModule { }
