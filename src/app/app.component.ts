import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMenu: boolean = true;
  pageTitle: string;

  constructor(private router: Router, private title: Title, private  meta: Meta) {
  }

  ngOnInit(): void {
    this.pageTitle = 'آکادمی همراه دانش';
    // this.title.getTitle(this.pageTitle);
    this.meta.addTag({keywords:'آکادمی آموزشی همراه دانش ، همراه دانش،'});

  }
}
