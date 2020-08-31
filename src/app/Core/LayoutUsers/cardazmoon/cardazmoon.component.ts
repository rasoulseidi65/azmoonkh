import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../auth/Student.service';
import {Student} from '../../../auth/Student.model';
import {DomSanitizer} from '@angular/platform-browser';
import {SchoolService} from '../../../layout/School.service';

@Component({
  selector: 'app-cardazmoon',
  templateUrl: './cardazmoon.component.html',
  styleUrls: ['./cardazmoon.component.scss']
})
export class CardazmoonComponent implements OnInit {
  public student: Student[];
  public profilImage;
  public schoolID;
  public schoolName:string
  constructor(private studentService: StudentService,private sanitizer: DomSanitizer, private schoolService: SchoolService) {

    this.student = this.studentService.currentStudent['data'];
    this.schoolID = this.studentService.currentStudent['data']['schoolID'];
  }
  printToCart(printSectionId: string){
    let popupWinindow;
    let innerContents = document.getElementById(printSectionId).innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }
  ngOnInit() {
    this.profilImage = this.sanitizer.bypassSecurityTrustUrl(this.studentService.currentStudent['data']['image']);
    this.schoolService.index().subscribe((response) => {

      let result = response['data'];
      for (var i = 0; i < result.length; i++) {
        if (this.schoolID === response['data'][i]._id) {
          this.schoolName = response['data'][i].schoolName;
        }

      }
    });
  }

}
