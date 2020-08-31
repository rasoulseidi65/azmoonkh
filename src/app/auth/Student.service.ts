import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Student} from './Student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
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
  register(data:any): Observable<Student[]> {
    return this.http.post<Student[]>('http://194.5.175.25:3003/api/v1/register', data);
  }
  uploadFile(image:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/image', image);
  }
  sendSms(mobileNumber:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/sendsms',mobileNumber);
  }
  onPayment(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/payment',data).pipe(map(result => result));
  }
  trackingCodeSMS(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/trakingCode',data).pipe(map(result => result));
  }
  getResNumber(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/getResNumber',data).pipe(map(result => result));
  }
  sendSmsByMessage(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/sendSmsByMessage',data).pipe(map(result => result));
  }
  checkStatePayment(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/checkStatePayment',data).pipe(map(result => result));
  }
  login(data:any) {
    return this.http.post<Student>('http://194.5.175.25:3003/api/v1/login',data).pipe(map(
      (result) =>this.currentStudent=result));
  }
  index(id:any) {
    return this.http.get('http://194.5.175.25:3003/api/v1/showstudent/'+id).pipe(map(result => result));
  }
  updateStudent(id:any,data:any) {
    return this.http.put('http://194.5.175.25:3003/api/v1/updatestudent/'+id,data).pipe(map(result => result));
  }
  studentByResult(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/studentByResult/',data).pipe(map(result => result));
  }
}
