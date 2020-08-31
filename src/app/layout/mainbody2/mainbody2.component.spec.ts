import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mainbody2Component } from './mainbody2.component';

describe('Mainbody2Component', () => {
  let component: Mainbody2Component;
  let fixture: ComponentFixture<Mainbody2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mainbody2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mainbody2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
