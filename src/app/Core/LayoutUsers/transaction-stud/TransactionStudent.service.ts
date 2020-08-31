import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

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

  }
  getResNumber(data:any) {
    return this.http.post('http://194.5.175.25:3003/api/v1/getResNumber',data).pipe(map(result => result));
  }


}
