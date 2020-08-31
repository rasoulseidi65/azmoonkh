import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentAdminModel} from '../../../LayoutAdmin/StudentAdmin.model';
import {SchoolAdminService} from '../../../LayoutAdmin/schoolAdmin.service';
import {ActivatedRoute} from '@angular/router';
import * as xlsx from 'xlsx';
import {SelectItem} from 'primeng/api';
import {SchoolService} from '../../../../layout/School.service';
import {SchoolMasterService} from '../../schoolMaster.service';

@Component({
  selector: 'app-list-all-result',
  templateUrl: './list-all-result.component.html',
  styleUrls: ['./list-all-result.component.scss']
})
export class ListAllResultComponent implements OnInit {
  @ViewChild('epltable', {static: false}) epltable: ElementRef;
  public dataRecived = {
    schoolID: '',
  };
  public resultTest: any[] = [];
  public studentModels: StudentAdminModel[] = [];
  cols: any[];
  public resultData: boolean = true;
  school: SelectItem[];
  base: SelectItem[];
  public inputSchoolNameSearch;
  public resultSchool;

  constructor(private schoolMasterservice: SchoolMasterService, private Service: SchoolAdminService, private schoolService: SchoolService, private activatedRoute: ActivatedRoute) {

    this.school = [

      {label: 'رضوان', value: 'رضوان'},
      {label: 'گلپایگانی', value: 'گلپایگانی'},
      {label: 'فرهنگ پسر', value: 'فرهنگ پسر'},
      {label: 'فرهنگ دختر', value: 'فرهنگ دختر'},
    ];
    this.base = [
      {label: 'هفتم', value: 'هفتم'},
      {label: 'دهم', value: 'دهم'},

    ];
  }

  ngOnInit() {

    this.cols = [
      {field: 'candidateNumber', header: 'شماره داوطلب'},
      {field: 'nationalCode', header: 'شماره ملی'},
      {field: 'firstName', header: 'نام'},
      {field: 'lastName', header: 'نام خانوادگی'},
      {field: 'fatherName', header: 'نام پدر'},
      {field: 'mobile', header: 'شماره همراه '},

    ];

    // this.loadDataSchool();
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  searchSchool() {
    this.resultData = true;
    this.studentModels.splice(0, this.studentModels.length);
    // if (this.inputSchoolNameSearch !== 'همه') {
      this.schoolService.index().subscribe((response) => {
        if (response['success'] === true) {
          this.resultSchool = response;
          for (var i = 0; i < this.resultSchool['data'].length; i++) {
            if (this.inputSchoolNameSearch === this.resultSchool['data'][i].schoolName.trim()) {
              let data = {schoolID: this.resultSchool['data'][i]._id};
              this.schoolMasterservice.allStudentBySchool(data).subscribe((response) => {
                if (response['success'] === true) {
                  // alert(this.inputSchoolNameSearch)
                  this.resultData = false;
                  this.studentModels = response['data'];
                }
              });
            }
          }
        }
      });
    // }
    // else
    // {
    //   this.loadDataSchool();
    // }
  }

  loadDataSchool() {
    this.Service.allStudentAcception().subscribe((response) => {
      if (response['success'] === true) {
        this.resultData = false;
        this.studentModels = response['data'];

      }
    });

  }
}
