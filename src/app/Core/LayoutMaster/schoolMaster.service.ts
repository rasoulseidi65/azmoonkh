import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SchoolMasterService {
  public tokenStudent:string;
  public currentSchoolStudent;
  http: HttpClient;
  headers={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(http: HttpClient) {
    this.http = http;
    this.tokenStudent;
  }
  index() {
    return this.http.get('http://194.5.175.25:3003/api/v1/admin/allstudent').pipe(
      (map(result =>this.currentSchoolStudent= result))
    );
  }
  indexOfSchoolID(schoolID:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/admin/schoolStudent',schoolID).pipe(
      (map(result =>this.currentSchoolStudent= result))
    );
  }
  register(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/admin/register',data).pipe(
      (map(result => result))
    );
  }
  indexAllUser() {
    return this.http.get('http://194.5.175.25:3003/api/v1/admin/alladmin').pipe(
      (map(result =>this.currentSchoolStudent= result))
    );
  }
  delete(userID:any) {
    return this.http.delete('http://194.5.175.25:3003/api/v1/admin/deleteAdmin/'+userID).pipe(
      (map(result => result))
    );
  }
  updateUser(userID:any) {
    return this.http.delete('http://194.5.175.25:3003/api/v1/admin/updateAdmin/'+userID).pipe(
      (map(result => result))
    );
  }
  allStudentBySchool(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/admin/allStudentBySchool/',data).pipe(
      (map(result => result))
    );
  }

}
