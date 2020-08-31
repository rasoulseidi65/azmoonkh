import {Component, Input, OnInit} from '@angular/core';
import {StudentService} from '../../../auth/Student.service';
import {Student} from '../../../auth/Student.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SchoolService} from '../../../layout/School.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contentdashboardstud',
  templateUrl: './contentdashboardstud.component.html',
  styleUrls: ['./contentdashboardstud.component.scss']
})
export class ContentdashboardstudComponent implements OnInit {
  public studentID: string;
  public student: Student[];
  public addressSchool: string;
  public tellSchool: string;
  public schoolName: string;
  public schoolID: string;
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
    addressSchool: '',
    tellSchool: '',
    schoolName: '',
    quotaTitle: '',
    quotaPriority: ''
  };
  formGroup: FormGroup;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute
    , private schoolService: SchoolService, private router: Router, private _formBuilder: FormBuilder
  ) {
    this.student = this.studentService.currentStudent['data'];
 //console.log(this.student['id'])
  }

  ngOnInit() {
    this.schoolService.index().subscribe((res) => {
      this.schoolID = this.studentService.currentStudent['data']['schoolID'];
      let result = res['data'];
      for (var i = 0; i < result.length; i++) {
        if (this.schoolID === result[i]._id) {
          this.addressSchool = result[i].address;
          this.tellSchool = result[i].tell;
          this.schoolName = result[i].schoolName;
        }
      }
    });
    // } else {
    //   this.router.navigate(['/']);
    // }
    // });


    // });
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

  onSubmitEdit() {

  }
}
