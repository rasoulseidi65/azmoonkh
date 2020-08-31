import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../../../../auth/Student.service';
import {ActivatedRoute} from '@angular/router';
import {SchoolAdminService} from '../../schoolAdmin.service';
import {StudentAdminModel} from '../../StudentAdmin.model';
import * as xlsx from 'xlsx';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-list-result',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.scss']
})
export class ListResultComponent implements OnInit {
  @ViewChild('epltable', {static: false}) epltable: ElementRef;
  public dataRecived = {
    schoolID: '',
  };
  public resultTest: any[] = [];
  public studentModels: StudentAdminModel[] = [];
  cols: any[];
  public resultData: boolean = true;
  val2: string = 'Option 2';
  items: MenuItem[];
  constructor(private Service: SchoolAdminService, private activatedRoute: ActivatedRoute) {
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
    this.activatedRoute.paramMap.subscribe((params) => {
      this.dataRecived.schoolID = params.get('id');
    });
    this.onAll();
  }

  onAcception() {
    this.studentModels.splice(0,this.studentModels.length)
    this.resultData = true;
    this.Service.allStudentAcceptionBySchool(this.dataRecived).subscribe((response) => {
      if (response['success'] === true) {
        this.resultData = false;
        this.studentModels = response['data'];
      }
    });

  }

  onAbsent() {
    this.resultData = true;
    this.studentModels.splice(0,this.studentModels.length)
    this.Service.allStudentAbsent(this.dataRecived).subscribe((response) => {
      if (response['success'] === true) {
        this.resultData = false;
        this.studentModels = response['data'];
      }
    });

  }
  onAll(){
    this.resultData = true;
    this.studentModels.splice(0,this.studentModels.length)
    this.Service.allStudentBySchool(this.dataRecived).subscribe((response) => {

      if (response['success'] === true) {
        this.resultData = false;
        this.studentModels = response['data'];
      }
    });
  }
  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }
}
