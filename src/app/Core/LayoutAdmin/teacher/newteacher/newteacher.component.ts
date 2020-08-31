import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-newteacher',
  templateUrl: './newteacher.component.html',
  styleUrls: ['./newteacher.component.scss'],
  providers: [MessageService]
})
export class NewteacherComponent implements OnInit {
  userform: FormGroup;
  submitted: boolean;
  mardak: SelectItem[];
  constructor(private fb: FormBuilder, private messageService: MessageService) {

    this.mardak = [
      {label:'فوق دیپلم', value:'فوق دیپلم'},
      {label:'کارشناسی', value:'کارشناسی'},
      {label:'کارشناسی ارشد', value:'کارشناسی ارشد'},
      {label:'دکتری', value:'دکتری'},
    ];
  }

  ngOnInit() {
    this.userform = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'nationalCode': new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      'mobile': new FormControl('',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl('',Validators.compose([Validators.required, Validators.minLength(8)])),
      'profileImage': new FormControl('', Validators.required),
      'madrak': new FormControl('', Validators.required),
      'field': new FormControl('', Validators.required),
      'cv': new FormControl('', Validators.required)
    });
  }
  onSubmit(value: string) {
    this.submitted = true;
    console.log(JSON.stringify(this.userform.value));
    this.messageService.add({severity: 'success', summary: 'ثبت با موفقیت انجام شد', detail: 'مشخصات مقاله با موفقیت ثبت شد'});
  }
}
