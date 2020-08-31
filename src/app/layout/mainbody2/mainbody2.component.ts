import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../School.service';
import {School} from '../School.model';


@Component({
  selector: 'app-mainbody2',
  templateUrl: './mainbody2.component.html',
  styleUrls: ['./mainbody2.component.css']
})
export class Mainbody2Component implements OnInit {
  public schoolModels: School[] = [];
  constructor(private schoolService:SchoolService) { }

  ngOnInit() {
    this.schoolService.index().subscribe((response)=>{
      this.schoolModels=response['data'];
    })
    // console.log(this.schoolService.resultSchool)
  }
  setSchoolID(id:any){
    this.schoolService.schoolID=id;
    // console.log( this.schoolService.schoolID)
  }

}
