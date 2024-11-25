import { CanActivateFn, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { inject } from '@angular/core';

export const entregadorGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticateService);
  const router = inject(Router);

  const role = authService.getRole();
  if (role === 'entregador' || role === 'gerente') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
