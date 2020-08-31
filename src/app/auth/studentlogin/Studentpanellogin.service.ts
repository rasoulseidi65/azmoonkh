import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentpanelloginService {
  public tokenStudent:string;

  public currentStudent;
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

  login(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/login',data).pipe(map(
      result =>{this.currentStudent= result;}
    ));
  }
  index(id:any) {
    return this.http.get('http://194.5.175.25:3003/api/v1/showstudent/'+id).pipe(map(result => result));
  }
  updateStudent(id:any,data:any) {
    return this.http.put('http://194.5.175.25:3003/api/v1/updatestudent/'+id,data).pipe(map(result => result));
  }
}
