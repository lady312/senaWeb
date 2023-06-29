import { TestBed } from '@angular/core/testing';

import { AsignacionParticipantesService } from './asignacion-participantes.service';

describe('AsignacionParticipantesService', () => {
  let service: AsignacionParticipantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionParticipantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
