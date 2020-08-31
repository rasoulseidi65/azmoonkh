import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AdminloginService} from '../adminlogin/adminlogin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminMasterGuard implements CanActivate {
  public currentUser;
  constructor(private router: Router, private AdminService: AdminloginService){
    this.currentUser = AdminService.currentAdmin;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.currentUser.success) {
      if (this.currentUser.data['role'] === 'master')
        return true;
    }
    else { this.router.navigate(['/home']);
      return false;
    }
  }

}
