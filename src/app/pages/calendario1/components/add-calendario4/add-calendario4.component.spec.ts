import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendario4Component } from './add-calendario4.component';

describe('AddCalendario4Component', () => {
  let component: AddCalendario4Component;
  let fixture: ComponentFixture<AddCalendario4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalendario4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalendario4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
