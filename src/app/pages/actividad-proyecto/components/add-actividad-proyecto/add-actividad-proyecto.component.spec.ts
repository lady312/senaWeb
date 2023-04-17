import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActividadProyectoComponent } from './add-actividad-proyecto.component';

describe('AddActividadProyectoComponent', () => {
  let component: AddActividadProyectoComponent;
  let fixture: ComponentFixture<AddActividadProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActividadProyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActividadProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
