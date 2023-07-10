import { TestBed } from '@angular/core/testing';

import { AprendicestmpService } from './aprendicestmp.service';

describe('AprendicestmpService', () => {
  let service: AprendicestmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprendicestmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
