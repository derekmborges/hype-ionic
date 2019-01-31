import { TestBed } from '@angular/core/testing';

import { Authentication } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Authentication = TestBed.get(Authentication);
    expect(service).toBeTruthy();
  });
});
