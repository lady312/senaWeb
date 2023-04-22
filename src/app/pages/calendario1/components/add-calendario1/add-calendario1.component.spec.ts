import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendario1Component } from './add-calendario1.component';

describe('AddCalendario1Component', () => {
  let component: AddCalendario1Component;
  let fixture: ComponentFixture<AddCalendario1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalendario1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalendario1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
