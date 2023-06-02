import { TestBed } from '@angular/core/testing';

import { TipoResultadoService } from './tipo-resultado.service';

describe('TipoResultadoService', () => {
  let service: TipoResultadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoResultadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
