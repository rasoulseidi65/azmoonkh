import { Component, OnInit } from '@angular/core';

import {MessageService, SelectItem} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {TeacherService} from '../teacher.service';
import {Teacher} from '../teacher.model';

@Component({
  selector: 'app-teacherlist',
  templateUrl: './teacherlist.component.html',
  styleUrls: ['./teacherlist.component.scss'],
  providers:[MessageService]
})
export class TeacherlistComponent implements OnInit {
  display: boolean = false;
  displayEdit :boolean =false;
  public teacherModels: Teacher[] = [];
  cols: any[];
  mardak: SelectItem[];
  date: number;
  userform: FormGroup;
  submitted: boolean;
  description: string;
  constructor(private teacherService: TeacherService,private messageService: MessageService,private fb: FormBuilder) {
    this.mardak = [
      {label:'فوق دیپلم', value:'فوق دیپلم'},
      {label:'کارشناسی', value:'کارشناسی'},
      {label:'کارشناسی ارشد', value:'کارشناسی ارشد'},
      {label:'دکتری', value:'دکتری'},
    ];
  }

  ngOnInit() {
    this.teacherService.index().subscribe(res => {
      this.teacherModels = res['data'];

    });
    this.userform = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'nationalCode': new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      'mobile': new FormControl('',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl(''),
      'profileImage': new FormControl('', Validators.required),
      'madrak': new FormControl('', Validators.required),
      'cv': new FormControl('', Validators.required)
    });

    this.cols = [
      { field: 'firstName', header: 'نام' },
      { field: 'lastName', header: 'فامیلی' },
      { field: 'mobile', header: 'موبایل' },
      { field: 'madrak', header: 'مدرک' },
      { field: 'field', header: 'رشته' }
    ];

  }
  onSubmit(value: string) {
    this.submitted = true;
    console.log(JSON.stringify(this.userform.value));
    this.messageService.add({severity: 'success', summary: 'ثبت با موفقیت انجام شد', detail: 'مشخصات مقاله با موفقیت ثبت شد'});
  }
  showDialog() {
    this.display = true;
  }
  showDialogEdit() {
    this.displayEdit = true;
  }
}
