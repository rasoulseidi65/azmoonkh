import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentdashboardstudComponent } from './contentdashboardstud.component';

describe('ContentdashboardstudComponent', () => {
  let component: ContentdashboardstudComponent;
  let fixture: ComponentFixture<ContentdashboardstudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentdashboardstudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentdashboardstudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
