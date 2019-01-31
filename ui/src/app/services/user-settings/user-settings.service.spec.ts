import { TestBed } from '@angular/core/testing';

import { UserSettings } from './user-settings.service';

describe('UserSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSettings = TestBed.get(UserSettings);
    expect(service).toBeTruthy();
  });
});
