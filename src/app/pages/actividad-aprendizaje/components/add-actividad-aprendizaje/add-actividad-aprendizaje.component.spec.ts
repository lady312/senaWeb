import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActividadAprendizajeComponent } from './add-actividad-aprendizaje.component';

describe('AddActividadAprendizajeComponent', () => {
  let component: AddActividadAprendizajeComponent;
  let fixture: ComponentFixture<AddActividadAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActividadAprendizajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActividadAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
