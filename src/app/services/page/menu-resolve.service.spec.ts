import { TestBed } from '@angular/core/testing';

import { MenuResolveService } from './menu-resolve.service';

describe('MenuResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuResolveService = TestBed.get(MenuResolveService);
    expect(service).toBeTruthy();
  });
});
