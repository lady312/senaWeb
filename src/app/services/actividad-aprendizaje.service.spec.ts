import { TestBed } from '@angular/core/testing';

import { ActividadAprendizajeService } from './actividad-aprendizaje.service';

describe('ActividadAprendizajeService', () => {
  let service: ActividadAprendizajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadAprendizajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
