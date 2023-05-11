import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCentroFormacionComponent } from './add-centro-formacion.component';

describe('AddCentroFormacionComponent', () => {
  let component: AddCentroFormacionComponent;
  let fixture: ComponentFixture<AddCentroFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCentroFormacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCentroFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
