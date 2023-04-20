import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendario3Component } from './add-calendario3.component';

describe('AddCalendario3Component', () => {
  let component: AddCalendario3Component;
  let fixture: ComponentFixture<AddCalendario3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalendario3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalendario3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
