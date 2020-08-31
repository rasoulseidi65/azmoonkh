import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedMethodsService} from '../../sharedService/sharedMethods.service';
import {AdminloginService} from './adminlogin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  userform: FormGroup;
  public existAdmin: boolean = false;
  public resultData: boolean = false;

  constructor(private fb: FormBuilder, private adminService: AdminloginService, private router: Router) {
  }

  ngOnInit() {
    this.userform = this.fb.group({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    });


  }

  onSubmit() {
    this.resultData = true;
    this.adminService.login(this.userform.value).subscribe((response) => {

      if (response['success'] === true) {
        this.resultData = false;
        if (response['data']['role'] === "schoolAdmin"){
          this.router.navigate(['/admin/panel']);
        }
        if (response['data']['role'] === 'master') {
          this.router.navigate(['master/panel']);
        }
        // else {
        //   this.router.navigate(['/home']);this.existAdmin = true;
        // }
      }
    });
  }
}
