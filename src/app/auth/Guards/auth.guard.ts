import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {StudentService} from '../Student.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private Student: StudentService) {
console.log(Student.tokenStudent)
  }
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ((this.Student.tokenStudent === null) || (this.Student.tokenStudent === undefined)){
      console.log('not login')
      this.router.navigate(['/']);
      return false;
    } else {
      // this.router.navigate(['/stud/panel']);
      return true;
    }

  }
}
