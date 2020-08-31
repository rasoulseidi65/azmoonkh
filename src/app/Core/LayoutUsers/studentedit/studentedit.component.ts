import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../../auth/Student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SchoolService} from '../../../layout/School.service';
import {Student} from '../../../auth/Student.model';
import {MessageService, SelectItem} from 'primeng/api';
import {response} from 'express';

@Component({
  selector: 'app-studentedit',
  templateUrl: './studentedit.component.html',
  styleUrls: ['./studentedit.component.scss'],
  providers: [MessageService]
})
export class StudenteditComponent implements OnInit {
  public studentID: string;
  public schoolID: string;
  public addressSchool: string;
  public tellSchool: string;
  public schoolName: string;
  formGroup: FormGroup;
  school: SelectItem[];
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
  public student: Student[];
  public resultSchool;
  display: boolean = false;
  public schoolNameUpdate;
  public quotaSchol:boolean=false;
  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute
    , private schoolService: SchoolService, private router: Router, private _formBuilder: FormBuilder, private messageService: MessageService) {
    this.school = [
      {label: 'انتخاب کنید', value: 'انتخاب کنید'},
    ];
    this.schoolID = this.studentService.currentStudent['data']['schoolID'];
  }

  ngOnInit() {
    this.loadDataStudent();

    this.schoolService.index().subscribe((response) => {
      this.resultSchool = response;
      let result = response['data'];
      for (var i = 0; i < result.length; i++) {
        this.school.push({label: response['data'][i].schoolName, value: response['data'][i].schoolName});
        if (this.schoolID === response['data'][i]._id) {
          this.addressSchool = response['data'][i].address;
          this.tellSchool = response['data'][i].tell;
          this.schoolName = response['data'][i].schoolName;
          this.quotaSchol=response['data'][i].quota;
        }

      }
    });
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

  loadDataStudent() {
    this.studentForm.firstName = this.studentService.currentStudent['data']['firstName'];
    this.studentForm.lastName = this.studentService.currentStudent['data']['lastName'];
    this.studentForm.fatherName = this.studentService.currentStudent['data']['fatherName'];
    this.studentForm.address = this.studentService.currentStudent['data']['address'];
    this.studentForm.postalCode = this.studentService.currentStudent['data']['postalCode'];
    this.studentForm.previousSchool = this.studentService.currentStudent['data']['previousSchool'];
    this.studentForm.gender = this.studentService.currentStudent['data']['gender'];
    this.studentForm.serialNumber = this.studentService.currentStudent['data']['serialNumber'];
    this.studentForm.birthday = this.studentService.currentStudent['data']['birthday'];
    this.studentForm.nationalCode = this.studentService.currentStudent['data']['nationalCode'];
    this.studentForm.mobile = this.studentService.currentStudent['data']['mobile'];
    this.studentForm.quotaPriority = this.studentService.currentStudent['data']['quotaPriority'];
    this.studentForm.quotaTitle = this.studentService.currentStudent['data']['quotaTitle'];
    this.studentForm.image = this.studentService.currentStudent['data']['image'];

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
    this.studentService.updateStudent(this.studentService.currentStudent['data']['id'], this.studentForm).subscribe((response) => {
        if (response['success'] === true) {
          this.messageService.add({severity: 'success', summary: 'داوطلب گرامی', detail: 'ویرایش با موفقیت انجام شد'});

          let query = {
            'password': this.studentForm.nationalCode,
            'mobile': this.studentForm.mobile
          };

          this.studentService.login(query).subscribe((res) => {

            this.loadDataStudent();

          });

        }

      },
      (error) => console.log(error));
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
}
