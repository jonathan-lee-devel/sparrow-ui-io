import { TestBed } from '@angular/core/testing';

import { OrganizationInterceptor } from './organization.interceptor';

describe('OrganizationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OrganizationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OrganizationInterceptor = TestBed.inject(OrganizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
