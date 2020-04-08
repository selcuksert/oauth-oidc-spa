import { TestBed } from '@angular/core/testing';

import { AuthV1Service } from './auth-v1.service';

describe('AuthService', () => {
  let service: AuthV1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthV1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
