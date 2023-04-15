import { TestBed } from '@angular/core/testing';

import { DiaJornadaService } from './dia-jornada.service';

describe('DiaJornadaService', () => {
  let service: DiaJornadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaJornadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
