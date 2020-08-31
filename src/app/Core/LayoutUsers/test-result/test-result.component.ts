import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../auth/Student.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  public dataRecived = {
    studentID: '',
  };
  public resultSuccess = false;
  public resultNotSuccess = false;
  public resultTestStudent: any[] = [];
  public resultTest: any[] = [];

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.dataRecived.studentID = params.get('id');
    });
    this.studentService.studentByResult(this.dataRecived).subscribe((response) => {
      // console.log(response)
      if (response['success'] === true) {
        if (response['data']['result'].length > 0) {
          this.resultSuccess = true;
          this.resultNotSuccess = false;
          this.resultTestStudent = response['data'];
          this.resultTest = response['data']['result'][0];
        } else {
          this.resultSuccess = false;
          this.resultNotSuccess = true;
        }
      }
    });
  }

}
