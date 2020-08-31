import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  showMenu: boolean= true;
  constructor(private router: Router,) {
    if (this.router.url != '/') {
      this.showMenu = false;
    }
  }

  ngOnInit() {

  }

}
