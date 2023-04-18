import { TestBed } from '@angular/core/testing';

import { TipoProgramaService } from './tipo-programa.service';

describe('TipoProgramaService', () => {
  let service: TipoProgramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProgramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
