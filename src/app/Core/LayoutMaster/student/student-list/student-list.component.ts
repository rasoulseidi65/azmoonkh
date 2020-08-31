import { Component, OnInit } from '@angular/core';
import {StudentAdminModel} from '../../../LayoutAdmin/StudentAdmin.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';
import {StudentService} from '../../../../auth/Student.service';
import {SchoolService} from '../../../../layout/School.service';
import {AdminloginService} from '../../../../auth/adminlogin/adminlogin.service';
import {SchoolMasterService} from '../../schoolMaster.service';
import {StudentMasterModel} from '../../StudentMaster.model';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [MessageService]
})
export class StudentListComponent implements OnInit {
  display: boolean = false;
  displayEdit: boolean = false;
  public studentModels: StudentMasterModel[] = [];
  cols: any[];
  public resultData: boolean = true;
  date: number;
  userform: FormGroup;
  submitted: boolean;
  description: string;
  public currentAdmin;
  public formGroup: FormGroup;
  studentForm = {
    firstName: '',
    lastName: '',
    nationalCode: '',
    fatherName: '',
    mobile: '',
    postalCode: '',
    birthday: '',
    gender: '',
    serialNumber: '',
    image: '',
    address: '',
    schoolID: '',
    previousSchool: '',
    quotaTitle: '',
    quotaPriority: ''
  };
  public schoolID: string;
  public studentID:string;
  public addressSchool: string;
  public tellSchool: string;
  public schoolName: string;
  public quotaSchool:boolean=false;
  public resultSchool;
  public schoolNameUpdate:string;
  school: SelectItem[];
  public inputSchoolNameSearch;
  constructor(private messageService: MessageService,private studentService:StudentService, private schoolService: SchoolService, private _formBuilder: FormBuilder, private schoolMasterservice: SchoolMasterService, private adminLoginService: AdminloginService) {
    this.currentAdmin = adminLoginService.currentAdmin;

    this.school = [
      {label:'همه', value:'همه'},
      {label:'رضوان', value:'رضوان'},
      {label:'گلپایگانی', value:'گلپایگانی'},
      {label:'فرهنگ پسر', value:'فرهنگ پسر'},
      {label:'فرهنگ دختر', value:'فرهنگ دختر'},
    ];
  }

  ngOnInit() {
    this.loadDataSchool();
    this.cols = [
      {field: 'candidateNumber', header: 'شماره داوطلب'},
      {field: 'nationalCode', header: 'شماره ملی'},
      {field: 'firstName', header: 'نام'},
      {field: 'lastName', header: 'نام خانوادگی'},
      {field: 'fatherName', header: 'نام پدر'},
      {field: 'mobile', header: 'شماره همراه '},
      {field: 'birthday', header: 'تاریخ تولد  '},
      {field: 'serialNumber', header: 'سریال شناسنامه'}
    ];
    this.formGroup = this._formBuilder.group({
      nationalCode: new FormControl(['']),
      firstName: new FormControl(['']),
      lastName: new FormControl(['']),
      fatherName: new FormControl(['']),
      mobile: new FormControl(['']),
      birthday: new FormControl(['']),
      gender: new FormControl(['']),
      radif: new FormControl(['']),
      seri: new FormControl(['']),
      serialNumber: new FormControl(['']),
      postalCode: new FormControl(['']),
      previousSchool: new FormControl(['']),
      address: new FormControl(['']),
      quotaTitle: new FormControl(['']),
      quotaPriority: new FormControl(['']),
    });
  }
  showDialogEdit(studentID: any) {
    for (var i = 0; i < this.studentModels.length; i++) {
      if (this.studentModels[i]['_id'] === studentID) {
        this.studentID=this.studentModels[i]['_id'];
        this.schoolID = this.studentModels[i]['schoolID'];
        this.studentForm.firstName = this.studentModels[i]['firstName'];
        this.studentForm.lastName = this.studentModels[i]['lastName'];
        this.studentForm.fatherName = this.studentModels[i]['fatherName'];
        this.studentForm.address = this.studentModels[i]['address'];
        this.studentForm.postalCode = this.studentModels[i]['postalCode'];
        this.studentForm.previousSchool = this.studentModels[i]['previousSchool'];
        this.studentForm.gender = this.studentModels[i]['gender'];
        this.studentForm.serialNumber = this.studentModels[i]['serialNumber'];
        this.studentForm.birthday = this.studentModels[i]['birthday'];
        this.studentForm.nationalCode = this.studentModels[i]['nationalCode'];
        this.studentForm.mobile = this.studentModels[i]['mobile'];
        this.studentForm.quotaPriority = this.studentModels[i]['quotaPriority'];
        this.studentForm.quotaTitle = this.studentModels[i]['quotaTitle'];
        this.studentForm.image = this.studentModels[i]['image'];

      }
    }
    this.schoolService.index().subscribe((response) => {
      if (response['success'] === true) {
        this.resultSchool = response;
        let result = response['data'];
        for (var i = 0; i < result.length; i++) {
          // this.school.push({label: response['data'][i].schoolName, value: response['data'][i].schoolName});
          if (this.schoolID === response['data'][i]._id) {
            this.addressSchool = response['data'][i].address;
            this.tellSchool = response['data'][i].tell;
            this.schoolName = response['data'][i].schoolName;
            this.quotaSchool = response['data'][i].quota;
          }
        }
      }
    });


    this.displayEdit = true;
  }

  showDialog() {
    this.display = !this.display;
  }
  updateSchool() {
    for (var i = 0; i < this.resultSchool['data'].length; i++) {
      if (this.schoolNameUpdate === this.resultSchool['data'][i].schoolName.trim()) {
        this.schoolID=this.resultSchool['data'][i]._id;
        this.addressSchool = this.resultSchool['data'][i].address;
        this.tellSchool = this.resultSchool['data'][i].tell;
        this.schoolName = this.resultSchool['data'][i].schoolName;
      }

    }
  }
  setQuota() {
    if ( this.studentForm.quotaPriority === '1') {
      this.studentForm.quotaTitle = 'فرزندان شاهد';
    }
    if ( this.studentForm.quotaPriority === '2') {
      this.studentForm.quotaTitle = 'فرزندان جانباز 50 درصد به بالا و آزادگان با بیش از 3 سال سابقه اسارت';
    }
    if ( this.studentForm.quotaPriority === '3') {
      this.studentForm.quotaTitle = 'فرزندان جانباز 25 درصد تا 49 درصد و آزادگان با بیش از 6 ماه سابقه اسارت';
    }
    if ( this.studentForm.quotaPriority === '4') {
      this.studentForm.quotaTitle = 'فرزندان جانباز زیر 25 درصد  و آزادگان با کمتر از 6 ماه سابقه اسارت';
    }
    if ( this.studentForm.quotaPriority === '5') {
      this.studentForm.quotaTitle = 'هیچکدام';
    }
  }

  onSubmit() {
    this.studentForm.schoolID = this.schoolID;
    this.studentService.updateStudent(this.studentID, this.studentForm).subscribe((response) => {
        if (response['success'] === true) {
          this.loadDataSchool();
          this.displayEdit=! this.displayEdit;
          this.messageService.add({severity: 'success', summary: 'مدیر ', detail: 'ویرایش با موفقیت انجام شد'});
        }

      },
      (error) => console.log(error));
  }

  loadDataSchool(){
    //this.adminLoginService.currentAdmin['data']['schoolID']
    // ObjectId("5eefe9f61340b80d48d8d2f7")
    // console.log(this.adminLoginService.currentAdmin);

    this.schoolMasterservice.index().subscribe((response) => {
      if (response['success'] === true) {
        this.resultData = false;
        this.studentModels = response['data'];
        for(var i=0;i<response['data'].length;i++){
          // console.log(this.studentModels[i].firstName)
         // data[i].firstName= this.studentModels[i].firstName;
        }
       // console.log(data)
      }
    });
  }

  searchSchool(){
    if(this.inputSchoolNameSearch!=='همه') {
      this.schoolService.index().subscribe((response) => {
        if (response['success'] === true) {
          this.resultSchool = response;
          for (var i = 0; i < this.resultSchool['data'].length; i++) {
            if (this.inputSchoolNameSearch === this.resultSchool['data'][i].schoolName.trim()) {
              let data = {schoolID: this.resultSchool['data'][i]._id};
              this.schoolMasterservice.indexOfSchoolID(data).subscribe((response) => {
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
    }
    else
    {
      this.loadDataSchool();
    }
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
