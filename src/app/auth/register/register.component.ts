import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

import {MobilePhoneNumberService} from 'ngx-persian';
import {HttpClient} from '@angular/common/http';
import {MatStepper} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../Student.service';
import {SchoolService} from '../../layout/School.service';
import {School} from '../../layout/School.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  student = {
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
    addressSchool: '',
    tellSchool: '',
    schoolName: '',
    quotaTitle: '',
    quotaPriority: ''
  };
  public dataTracCode = {code: '', mobile: '', candidateNumber: ''};
  public dataSms = {mobile: '', message: ''};
  public radif: string;
  public seri: string;
  public serial: string;
  formGroup: FormGroup;
  public schoolModels: School[] = [];
  public traceCode: string;
  public activeStepper2: string;
  public resNumber: string;
  public candidateNumber: string;
  public trackingCode: string;
  public quota: boolean = false;

  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }


  constructor(private mobilePhoneNumberService: MobilePhoneNumberService, private messageService: MessageService, private _formBuilder: FormBuilder, private http: HttpClient, private router: Router
    , private studentService: StudentService, private activatedRoute: ActivatedRoute, private  schoolService: SchoolService) {
  }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params =>
      this.resNumber = params.get('id'));
    let data = {resNumber: this.resNumber};
    this.studentService.getResNumber(data).subscribe((response) => {
      if (response['success'] === true) {
        let result = response['data'][0];
        console.log(result['refID']);
        this.dataSms.message = 'تراکش با موفقیت انجام شد.'  + 'و کد پیگیری تراکنش شما:' + result['refID']+ 'می باشد.';
        this.dataSms.mobile = result['mobile'];
        // this.studentService.sendSmsByMessage( this.dataSms).subscribe((response) => {
        // });
        // let result = response['data'][0];
        this.student.nationalCode = result['nationalCode'];
        this.student.mobile = result['mobile'];
        this.student.schoolID = result['schoolID'];
        this.schoolService.index().subscribe((response) => {
          let result = response['data'];
          for (var i = 0; i < result.length; i++) {
            if (this.student.schoolID === response['data'][i]._id) {
              console.log(response);
              this.student.addressSchool = response['data'][i].address;
              this.student.tellSchool = response['data'][i].tell;
              this.student.schoolName = response['data'][i].schoolName;
              this.student.gender = response['data'][i].gender;
              if (response['data'][i].quota === true) {
                this.quota = true;
              } else {
                console.log(response['data'][i].quota);
              }
            }

          }
        });
      } else {
        this.router.navigate(['/']);
      }
    });


    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          image: new FormControl(['', Validators.required]),
        }),
        this._formBuilder.group({
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
        }),
        this._formBuilder.group({
          previous: ['g']
        }),
        this._formBuilder.group({
          uploadFile: ['']
        }),
      ])
    });

  }

  setQuota() {
    if (this.student.quotaPriority === '1') {
      this.student.quotaTitle = 'فرزندان شاهد';
    }
    if (this.student.quotaPriority === '2') {
      this.student.quotaTitle = 'فرزندان جانباز 50 درصد به بالا و آزادگان با بیش از 3 سال سابقه اسارت';
    }
    if (this.student.quotaPriority === '3') {
      this.student.quotaTitle = 'فرزندان جانباز 25 درصد تا 49 درصد و آزادگان با بیش از 6 ماه سابقه اسارت';
    }
    if (this.student.quotaPriority === '4') {
      this.student.quotaTitle = 'فرزندان جانباز زیر 25 درصد  و آزادگان با کمتر از 6 ماه سابقه اسارت';
    }
    if (this.student.quotaPriority === '5') {
      this.student.quotaTitle = 'هیچکدام';
    }
  }

  f(i: any) {
    return (this.formGroup.get('formArray.0') as FormArray).controls[i];
  }

  f1(i: any) {
    return (this.formGroup.get('formArray.1') as FormArray).controls[i];
  }

  f2(i: any) {
    return (this.formGroup.get('formArray.2') as FormArray).controls[i];
  }

  onUpload(event) {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('image', event.files[i], event.files[i]['name']);
    }
    this.studentService.uploadFile(formData).subscribe((response) => {
      if (response['success'] === true) {
        this.student.image = response['imagePath'];
      } else {
        console.log(response);
      }
    });
  }


  setValueStepper2() {
    this.activeStepper2 = 'ok';
  }

  onSubmit(stepper: MatStepper) {
    stepper.next();
    this.student.serialNumber = this.radif + this.seri + this.serial;
    this.studentService.register(this.student).subscribe((response) => {
      if (response['success'] === true) {
        this.traceCode = response['data'];
        this.dataTracCode.code = this.traceCode['trackingCode'];
        this.dataTracCode.mobile = this.student.mobile;
        this.dataTracCode.candidateNumber = this.traceCode['candidateNumber'];
        this.candidateNumber = this.traceCode['candidateNumber'];
        this.trackingCode = this.traceCode['trackingCode'];
        // console.log(this.dataTracCode);
        // let text="با تشکر از انتخاب سامانه ثبت نام آنلاین آزمون مدارس نمونه آموزش و پرورش ناحیه یک خرم آباد.کد رهگیری شما:"+this.traceCode['trackingCode']+'و کد داوطلبی شما:'+this.traceCode['candidateNumber'];
        // let dataSMS={'mobile':this.student.mobile, 'message':text};
        this.dataSms.message = 'با تشکر از انتخاب سامانه ثبت نام آنلاین آزمون مدارس نمونه آموزش و پرورش ناحیه یک خرم آباد.کد رهگیری شما:' + this.traceCode['trackingCode'] + 'و کد داوطلبی شما:' + this.traceCode['candidateNumber'];
        this.dataSms.mobile = this.student.mobile;
        // this.studentService.sendSmsByMessage(this.dataSms).subscribe((res) => {
        // });
        // this.studentService.trackingCodeSMS(this.dataTracCode).subscribe((res) => {
        // });
      }
    });

  }


}
