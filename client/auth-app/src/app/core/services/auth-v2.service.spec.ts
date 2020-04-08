import { TestBed } from '@angular/core/testing';

import { AuthV2Service } from './auth-v2.service';

describe('AuthV2Service', () => {
  let service: AuthV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
