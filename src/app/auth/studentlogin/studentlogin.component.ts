import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedMethodsService} from '../../sharedService/sharedMethods.service';
import {StudentService} from '../Student.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.scss']
})
export class StudentloginComponent implements OnInit {
  studentForm1: FormGroup;
  studentForm2: FormGroup;
  public notFoundStud2: boolean = false;
  public notFoundStud1: boolean = false;
  public form2={
    candidateNumber:'',
    password:''
  }
  constructor(private sharedService: SharedMethodsService, private fb: FormBuilder, private studentService: StudentService, private router:Router) {
  }

  ngOnInit() {
    this.studentForm1 = this.fb.group({
      'mobile': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
      'password': new FormControl('', Validators.compose([this.sharedService.validateNationalCode, Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
    });
    this.studentForm2 = this.fb.group({
      'candidateNumber': new FormControl('', [Validators.required,]),
      'password': new FormControl('', Validators.compose([this.sharedService.validateNationalCode, Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
    });
  }

  onSubmit1() {
    this.studentService.login(this.studentForm1.value).subscribe((response) => {
      if (response['success'] === true) {
       let result=response['data']
        this.studentService.tokenStudent=result['token'];
        this.router.navigate(['/stud/panel/'])
        this.notFoundStud1 = false;
      } else {
        this.notFoundStud1 = true;

      }
    });
  }

  onSubmit2() {
    this.studentService.login(this.form2).subscribe((response) => {
      if (response['success'] === true) {
        let result=response['data'];
        this.studentService.tokenStudent=result['token'];
        this.router.navigate(['/stud/panel'])
        this.notFoundStud2 = false;
      } else {
        this.notFoundStud2 = true;

      }
    });
  }
}
