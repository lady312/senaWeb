import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActividadAprendizajeComponent } from './list-actividad-aprendizaje.component';

describe('ListActividadAprendizajeComponent', () => {
  let component: ListActividadAprendizajeComponent;
  let fixture: ComponentFixture<ListActividadAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActividadAprendizajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActividadAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
