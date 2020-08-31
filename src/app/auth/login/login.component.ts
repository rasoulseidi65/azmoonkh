import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {StudentService} from '../Student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedMethodsService} from '../../sharedService/sharedMethods.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  @ViewChild('ngOtpInput', {static: true}) ngOtpInputRef: any;
  userform: FormGroup;
  submitted: boolean;
  display: boolean = false;
  public getCodeSmS: '';
  otdCode: '';
  public payment = {
    schoolID: '',
    nationalCode: '',
    mobile: ''
  };
  public invalidSMS: boolean = false;
  public timeLeft: number = 90;
  public interval;
  resendSMS: boolean = false;
  public validationBtnPay: boolean = true;
  public statePayment: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService,
              private UserService: StudentService, private activatedRoute: ActivatedRoute,
              private router: Router, private sharedService: SharedMethodsService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>
      this.payment.schoolID = params.get('id'));
    this.userform = this.fb.group({
      'mobile': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
      'nationalCode': new FormControl('', Validators.compose([this.sharedService.validateNationalCode, Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
    });
  }

  onSubmit() {
    this.UserService.checkStatePayment(this.userform.value).subscribe((response) => {
      if (response['success'] === true) {
        let result = response['data'];
        this.statePayment = true;
        this.router.navigate(['/auth/register/' + result['resNumber']]);
      } else {
        if (this.statePayment === false) {
          this.onPayment();
          // this.resendSMS = false;
          // this.timeLeft = 90;
          // this.startTimer();
          // this.UserService.sendSms(this.userform.value).subscribe((response) => {
          //   if (response['success'] === true) {
          //     this.getCodeSmS = response['data'];
          //   }
          // });
        }
      }
    });

  }


  onOtpChange(otp) {
    this.otdCode = otp;
    if (this.otdCode.length === 5) {
      if (this.otdCode !== this.getCodeSmS) {
        this.invalidSMS = true;
        this.validationBtnPay = true;
      } else {
        this.invalidSMS = false;
        this.validationBtnPay = false;
      }
    }
  }


  onPayment() {
    // if (this.otdCode === this.getCodeSmS) {
    //   this.invalidSMS = false;
      this.UserService.onPayment(this.payment).subscribe((response) => {
        let url = response['data'];
        document.location.href = url;
      });
    // } else {
    //   this.invalidSMS = true;
    // }
  }

  startTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.resendSMS = true;
        this.timeLeft = 0;
      }

    }, 1000);
  }

  showDialog() {

    this.display = true;
  }
}
