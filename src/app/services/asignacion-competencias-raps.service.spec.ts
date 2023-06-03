import { TestBed } from '@angular/core/testing';

import { AsignacionCompetenciasRapsService } from './asignacion-competencias-raps.service';

describe('AsignacionCompetenciasRapsService', () => {
  let service: AsignacionCompetenciasRapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionCompetenciasRapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
