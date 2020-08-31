import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../auth/Student.service';
import {Student} from '../../../auth/Student.model';
import {StudentInterface} from '../../../auth/student-interface';

@Component({
  selector: 'app-transaction-stud',
  templateUrl: './transaction-stud.component.html',
  styleUrls: ['./transaction-stud.component.scss']
})
export class TransactionStudComponent implements OnInit {
  public student: Student[];
  public std:StudentInterface;
  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    console.log(this.std.firstName.toString());
    // this.studentService.checkStatePayment().subscribe((response) => {
    //   if (response['success'] === true) {
    //
    //   }
    // })
  }
}
