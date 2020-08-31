import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MenuItem} from 'primeng/api';
import {StudentService} from '../../../auth/Student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../../../auth/Student.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: MenuItem[];
  public studentID: string;
  public student: Student[];
  public profilImage;
  public activeCart: boolean = false;
  public activeCartFarhang:boolean=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private studentService: StudentService,
              private router: Router, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.student = this.studentService.currentStudent['data'];
    this.studentID=this.studentService.currentStudent['data']['id'];

    if(this.student['schoolID']==="5eefe9f61340b80d48d8d2f7" || this.student['schoolID']==="5eefea141340b80d48d8d2f8"){
      this.activeCart=true
    }
    if(this.student['schoolID']==="5eefea291340b80d48d8d2f9" || this.student['schoolID']==="5eefea2f1340b80d48d8d2fa"){
      this.activeCartFarhang=true
    }
    this.profilImage = this.sanitizer.bypassSecurityTrustUrl(this.studentService.currentStudent['data']['image']);
    // this.profilImage=this.studentService.currentStudent['data']['image'];
    this.items = [
      {
        label: 'خروج',
        icon: 'pi pi-power-off',
        command: (event: Event) => {
          this.studentService.tokenStudent = null;
          this.router.navigate(['/']);
        }
      }
    ];


  }
}
