import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadProyectoComponent } from './actividad-proyecto.component';

describe('ActividadProyectoComponent', () => {
  let component: ActividadProyectoComponent;
  let fixture: ComponentFixture<ActividadProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadProyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
