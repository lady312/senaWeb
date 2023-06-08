import { TestBed } from '@angular/core/testing';

import { GestiondocumentoService } from './gestiondocumento.service';

describe('GestiondocumentoService', () => {
  let service: GestiondocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestiondocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
