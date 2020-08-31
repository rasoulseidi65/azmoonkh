import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardazmoonComponent } from './cardazmoon.component';

describe('CardazmoonComponent', () => {
  let component: CardazmoonComponent;
  let fixture: ComponentFixture<CardazmoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardazmoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardazmoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
