import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { entregadorGuardGuard } from './entregador-guard.guard';

describe('entregadorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => entregadorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
