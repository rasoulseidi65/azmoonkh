import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserMasterModel} from '../../userMaster.model';
import {SchoolMasterService} from '../../schoolMaster.service';
import {MessageService, SelectItem} from 'primeng/api';
import {SchoolService} from '../../../../layout/School.service';

import {Router} from '@angular/router';
//declare var Stimulsoft: any;
//declare var require: any;

@Component({
  selector: 'app-schoollist',
  templateUrl: './schoollist.component.html',
  styleUrls: ['./schoollist.component.scss'],
  providers: [MessageService]
})
export class SchoollistComponent implements OnInit {

  public formGroup: FormGroup;
  public userAdmin = {
    username: '',
    password: '',
    role: '',
    schoolID: '',
    schoolName: '',
    adminName: '',
    // image: ''
  };
  public users: UserMasterModel[] = [];
  public role: SelectItem[];
  public school: SelectItem[];
  public cols: any[];
  public resultSchool;
  public userID;
  public displayEdit: boolean = false;


 // viewer: any = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
  constructor(private router: Router,private messageService: MessageService, private _formBuilder: FormBuilder, private masterService: SchoolMasterService, private schoolService: SchoolService) {
   // Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkcgIvwL0jnpsDqRpWg5FI5kt2G7A0tYIcUygBh1sPs7koivWV0htru4Pn2682yhdY3+9jxMCVTKcKAjiEjgJzqXgLFCpe62hxJ7/VJZ9Hq5l39md0pyydqd5Dc1fSWhCtYqC042BVmGNkukYJQN0ufCozjA/qsNxzNMyEql26oHE6wWE77pHutroj+tKfOO1skJ52cbZklqPm8OiH/9mfU4rrkLffOhDQFnIxxhzhr2BL5pDFFCZ7axXX12y/4qzn5QLPBn1AVLo3NVrSmJB2KiwGwR4RL4RsYVxGScsYoCZbwqK2YrdbPHP0t5vOiLjBQ+Oy6F4rNtDYHn7SNMpthfkYiRoOibqDkPaX+RyCany0Z+uz8bzAg0oprJEn6qpkQ56WMEppdMJ9/CBnEbTFwn1s/9s8kYsmXCvtI4iQcz+RkUWspLcBzlmj0lJXWjTKMRZz+e9PmY11Au16wOnBU3NHvRc9T/Zk0YFh439GKd/fRwQrk8nJevYU65ENdAOqiP5po7Vnhif5FCiHRpxgF";
    //Property.ReportData = require('src/assets/json/d.json');
    this.role = [
      {label: 'مدیر اصلی', value: 'master'},
      {label: 'مدیر مدرسه', value: 'schoolAdmin'},

    ];
    this.school = [
      {label: '', value: ''},

    ];
    this.cols = [
      {field: 'userName', header: 'شماره داوطلب'},
      {field: 'password', header: 'شماره ملی'},
      {field: 'role', header: 'نام'},
      {field: 'schoolID', header: 'نام خانوادگی'},
      {field: 'schoolName', header: 'نام پدر'},
      {field: 'adminName', header: 'شماره همراه '},
      {field: 'image', header: 'تاریخ تولد  '},
    ];
  }

  ngOnInit() {

    this.formGroup = this._formBuilder.group({
      username: new FormControl(['']),
      password: new FormControl(['']),
      role: new FormControl(['']),
      schoolID: new FormControl(['']),
      schoolName: new FormControl(['']),
      adminName: new FormControl(['']),
      // image: new FormControl(['']),
    });
    this.loadDataUsers();
    this.schoolService.index().subscribe((response) => {
      if (response['success'] === true) {
        this.school.pop();
        this.resultSchool = response;
        for (var i = 0; i < response['data'].length; i++) {
          this.school.push({label: response['data'][i].schoolName, value: response['data'][i].schoolName});
        }
      }
    });
  }

  onSubmit() {

    this.masterService.register(this.userAdmin).subscribe((resonse) => {
      if (resonse['success'] === true) {
        this.loadDataUsers();
        this.messageService.add({severity: 'success', summary: 'مدیر ', detail: 'کاربر با موفقیت ثبت شد'});

      }
    });
  }

  setSchool() {
    for (var i = 0; i < this.resultSchool['data'].length; i++) {
      if (this.userAdmin.schoolName.trim() === this.resultSchool['data'][i].schoolName.trim()) {
        this.userAdmin.schoolName = this.resultSchool['data'][i].schoolName.trim();
        this.userAdmin.schoolID = this.resultSchool['data'][i]._id.trim();
      }
    }

  }

  loadDataUsers() {
    this.masterService.indexAllUser().subscribe((response) => {
      if (response['success'] === true) {
        this.users = response['data'];
      }
    });
  }

  showDialogEdit(id: any) {
    this.displayEdit = !this.displayEdit;
    this.userID = id;
  }

  showConfirm(id: any) {
    this.userID = id;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'برای حذف کاربر مطمئن هستید؟'});
  }

  onConfirm() {
    this.masterService.delete(this.userID).subscribe((response) => {
      if (response['success'] === true) {
        this.messageService.clear();
        this.loadDataUsers();
      }
    });

    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  onUpdate() {
    this.masterService.updateUser(this.userAdmin).subscribe((resonse) => {
      if (resonse['success'] === true) {
      }
    });
  }
  SetReport() {
    this.router.navigate(['/report']);
  }
  printToCart(printSectionId: string){
    let popupWinindow;
    let innerContents = document.getElementById(printSectionId).innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }
}
