import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllResultComponent } from './list-all-result.component';

describe('ListAllResultComponent', () => {
  let component: ListAllResultComponent;
  let fixture: ComponentFixture<ListAllResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
