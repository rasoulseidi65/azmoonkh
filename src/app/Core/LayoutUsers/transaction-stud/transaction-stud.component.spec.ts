import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStudComponent } from './transaction-stud.component';

describe('TransactionStudComponent', () => {
  let component: TransactionStudComponent;
  let fixture: ComponentFixture<TransactionStudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionStudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionStudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
