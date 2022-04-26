import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListingComponent } from './form-listing.component';

describe('FormListingComponent', () => {
  let component: FormListingComponent;
  let fixture: ComponentFixture<FormListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
