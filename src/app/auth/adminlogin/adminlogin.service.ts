import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';
import {AdminloginModel} from './adminlogin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {
  public tokenStudent:string;
  public currentAdmin;
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
    return this.http.post<AdminloginModel[]>('http://194.5.175.25:3003/api/v1/admin/login', data)
      .pipe(map(result =>this.currentAdmin= result));
  }

}
