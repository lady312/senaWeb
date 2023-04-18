import { TestBed } from '@angular/core/testing';

import { ProyectoFormativoService } from './proyecto-formativo.service';

describe('ProyectoFormativoService', () => {
  let service: ProyectoFormativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectoFormativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
