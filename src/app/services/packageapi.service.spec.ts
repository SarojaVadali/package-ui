import { TestBed } from '@angular/core/testing';

import { PackageapiService } from './packageapi.service';

describe('PackageapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackageapiService = TestBed.get(PackageapiService);
    expect(service).toBeTruthy();
  });
});
