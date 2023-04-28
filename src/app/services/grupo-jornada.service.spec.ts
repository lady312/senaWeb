import { TestBed } from '@angular/core/testing';

import { GrupoJornadaService } from './grupo-jornada.service';

describe('GrupoJornadaService', () => {
  let service: GrupoJornadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoJornadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
