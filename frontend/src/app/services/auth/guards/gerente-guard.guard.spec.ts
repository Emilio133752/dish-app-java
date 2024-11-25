import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gerenteGuardGuard } from './gerente-guard.guard';

describe('gerenteGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gerenteGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
