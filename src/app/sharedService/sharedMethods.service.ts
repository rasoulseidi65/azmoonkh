import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {
  public token:string;
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  validateNationalCode(control: AbstractControl): { [key: string]: any } | null {
    var allDigitEqual = ['0000000000', '1111111111', '2222222222', '3333333333', '4444444444', '5555555555', '6666666666', '7777777777', '8888888888', '9999999999'];
    if (control.value.length < 10) {
      return {'validateNationalCode': true};
    } else {
      var index = allDigitEqual.indexOf(control.value);
    }
    if (index > -1) {
      return {'validateNationalCode': true};

    } else {
      var num0: number = (control.value.substring(0, 1)) * 10;
    }
    var num2: number = (control.value.substring(1, 2)) * 9;
    var num3: number = (control.value.substring(2, 3)) * 8;
    var num4: number = (control.value.substring(3, 4)) * 7;
    var num5: number = (control.value.substring(4, 5)) * 6;
    var num6: number = (control.value.substring(5, 6)) * 5;
    var num7: number = (control.value.substring(6, 7)) * 4;
    var num8: number = (control.value.substring(7, 8)) * 3;
    var num9: number = (control.value.substring(8, 9)) * 2;
    var a: number = (control.value.substring(9, 10));
    var b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
    var c = b % 11;
    if (((c < 2) && (a == c)) || ((c >= 2) && (11 - c) == a)) {
      return null;
    } else {
      return {'validateNationalCode': true};
    }

  }
}
