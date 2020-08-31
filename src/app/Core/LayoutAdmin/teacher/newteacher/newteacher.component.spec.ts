import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewteacherComponent } from './newteacher.component';

describe('NewteacherComponent', () => {
  let component: NewteacherComponent;
  let fixture: ComponentFixture<NewteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
