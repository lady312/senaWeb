import { TestBed } from '@angular/core/testing';

import { Calendario1Service } from './calendario1.service';

describe('Calendario1Service', () => {
  let service: Calendario1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Calendario1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
