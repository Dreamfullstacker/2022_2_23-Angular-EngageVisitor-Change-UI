import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbComponentComponent } from './db-component.component';

describe('DbComponentComponent', () => {
  let component: DbComponentComponent;
  let fixture: ComponentFixture<DbComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
