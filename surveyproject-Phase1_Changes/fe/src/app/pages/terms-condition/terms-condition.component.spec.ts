import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionComponent } from './terms-condition.component';

describe('TermsConditionComponent', () => {
  let component: TermsConditionComponent;
  let fixture: ComponentFixture<TermsConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
