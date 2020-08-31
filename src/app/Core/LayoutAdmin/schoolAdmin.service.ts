import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {SchoolMasterModel} from '../LayoutMaster/SchoolMaster.model';


@Injectable({
  providedIn: 'root'
})
export class SchoolAdminService {
  public tokenStudent:string;
  public currentSchoolStudent;
  public resultSchool;
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
  index(schoolID:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/admin/schoolStudent',schoolID).pipe(
      (map(result =>this.currentSchoolStudent= result))
    );
  }

  listSchool(): Observable<SchoolMasterModel[]> {
    return this.http.get<SchoolMasterModel[]>('http://194.5.175.25:3003/api/v1/school').pipe(
      (map((result) =>this.resultSchool= result))
    );
  }
  allStudentAcceptionBySchool(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/admin/allStudentAcceptionBySchool',data).pipe(
      (map((result) => result))
    );
  }
  allStudentAcception() {
    return this.http.get('http://194.5.175.25:3003/api/v1/admin/allStudentAcception').pipe(
      (map((result) => result))
    );
  }
  allStudentAbsent(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/admin/allStudentAbsent', data).pipe(
      (map((result) => result))
    );
  }
  allStudentBySchool(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/admin/allStudentBySchool/',data).pipe(
      (map(result => result))
    );
  }
}
