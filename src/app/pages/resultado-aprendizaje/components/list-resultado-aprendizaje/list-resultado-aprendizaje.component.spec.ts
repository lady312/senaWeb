import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResultadoAprendizajeComponent } from './list-resultado-aprendizaje.component';

describe('ListResultadoAprendizajeComponent', () => {
  let component: ListResultadoAprendizajeComponent;
  let fixture: ComponentFixture<ListResultadoAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResultadoAprendizajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListResultadoAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
