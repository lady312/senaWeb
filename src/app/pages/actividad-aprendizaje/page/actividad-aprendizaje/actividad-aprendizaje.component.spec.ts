import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadAprendizajeComponent } from './actividad-aprendizaje.component';

describe('ActividadAprendizajeComponent', () => {
  let component: ActividadAprendizajeComponent;
  let fixture: ComponentFixture<ActividadAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadAprendizajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
