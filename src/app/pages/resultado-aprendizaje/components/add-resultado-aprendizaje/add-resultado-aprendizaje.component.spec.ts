import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultadoAprendizajeComponent } from './add-resultado-aprendizaje.component';

describe('AddResultadoAprendizajeComponent', () => {
  let component: AddResultadoAprendizajeComponent;
  let fixture: ComponentFixture<AddResultadoAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResultadoAprendizajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResultadoAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
