import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCalendario1Component } from './list-calendario1.component';

describe('ListCalendario1Component', () => {
  let component: ListCalendario1Component;
  let fixture: ComponentFixture<ListCalendario1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCalendario1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCalendario1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
