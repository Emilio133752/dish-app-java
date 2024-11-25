import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

export const clienteGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticateService);
  const router = inject(Router);

  const role = authService.getRole();
  if (role === 'cliente' || role === 'gerente') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
