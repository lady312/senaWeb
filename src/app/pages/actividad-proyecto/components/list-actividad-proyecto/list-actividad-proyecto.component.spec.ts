import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActividadProyectoComponent } from './list-actividad-proyecto.component';

describe('ListActividadProyectoComponent', () => {
  let component: ListActividadProyectoComponent;
  let fixture: ComponentFixture<ListActividadProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActividadProyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActividadProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
