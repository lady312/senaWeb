import { TestBed } from '@angular/core/testing';

import { CompetenciaRapService } from './competencia-rap.service';

describe('CompetenciaRapService', () => {
  let service: CompetenciaRapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetenciaRapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
