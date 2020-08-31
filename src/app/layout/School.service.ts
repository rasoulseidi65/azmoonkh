import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {School} from './School.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  public token:string;
  public schoolID:string;
  public resultSchool;
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }
  index(): Observable<School[]> {
    return this.http.get<School[]>('http://194.5.175.25:3003/api/v1/school').pipe(
      (map((result) =>this.resultSchool= result))
    );
  }
}
