import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SchoolAdminService} from '../../schoolAdmin.service';
import {StudentAdminModel} from '../../StudentAdmin.model';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AdminloginService} from '../../../../auth/adminlogin/adminlogin.service';
import {SchoolService} from '../../../../layout/School.service';
import {StudentService} from '../../../../auth/Student.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss'],
  providers: [MessageService]
})
export class StudentlistComponent implements OnInit {
  display: boolean = false;
  displayEdit: boolean = false;
  public studentModels: StudentAdminModel[] = [];
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
  constructor(private messageService: MessageService,private studentService:StudentService, private schoolService: SchoolService, private _formBuilder: FormBuilder, private schoolAdminservice: SchoolAdminService, private adminLoginService: AdminloginService) {
    this.currentAdmin = adminLoginService.currentAdmin;
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
    console.log(this.adminLoginService.currentAdmin);
    let data = {schoolID: this.adminLoginService.currentAdmin['data']['schoolID']};
    this.schoolAdminservice.index(data).subscribe((response) => {
      if (response['success'] === true) {
        this.resultData = false;
        this.studentModels = response['data'];
      }
    });
  }
}
