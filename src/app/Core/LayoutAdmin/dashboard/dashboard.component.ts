import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MenuItem} from 'primeng/api';
import {StudentService} from '../../../auth/Student.service';
import {Router} from '@angular/router';
import {AdminloginService} from '../../../auth/adminlogin/adminlogin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public currentAdmin;
  items: MenuItem[];
  public schoolID;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private adminLoginService: AdminloginService,
              private router: Router) {
    this.currentAdmin = adminLoginService.currentAdmin;
    this.schoolID=this.currentAdmin['data']['schoolID']
  }

  ngOnInit(): void {
    this.items = [
      {
        label: this.currentAdmin['data']['schoolName'],

        items: [
          {separator: true},
          {
            label: 'خروج',
            icon: 'pi pi-power-off',
            command: (event: Event) => {

              this.router.navigate(['']);
            }
          }
        ]
      }
    ];
  }
}
