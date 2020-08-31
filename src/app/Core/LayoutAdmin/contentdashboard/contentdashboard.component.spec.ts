import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentdashboardComponent } from './contentdashboard.component';

describe('ContentdashboardComponent', () => {
  let component: ContentdashboardComponent;
  let fixture: ComponentFixture<ContentdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
