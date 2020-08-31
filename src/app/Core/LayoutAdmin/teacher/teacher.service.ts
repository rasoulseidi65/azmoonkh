import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Teacher} from './teacher.model';
// import {Users} from '../../../auth/Student.model';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  index(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>('http://api.hd724.com/api/v1/teacher/index');
  }
}
