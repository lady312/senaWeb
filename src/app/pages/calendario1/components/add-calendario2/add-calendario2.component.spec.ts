import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendario2Component } from './add-calendario2.component';

describe('AddCalendario2Component', () => {
  let component: AddCalendario2Component;
  let fixture: ComponentFixture<AddCalendario2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalendario2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalendario2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
