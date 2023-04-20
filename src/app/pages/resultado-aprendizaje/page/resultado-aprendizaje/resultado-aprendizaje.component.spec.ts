import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoAprendizajeComponent } from './resultado-aprendizaje.component';

describe('ResultadoAprendizajeComponent', () => {
  let component: ResultadoAprendizajeComponent;
  let fixture: ComponentFixture<ResultadoAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoAprendizajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
