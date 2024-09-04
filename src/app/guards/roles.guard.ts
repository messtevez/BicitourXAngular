import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return (route: any) => {
    const expectedRole = route.data.expectedRole;
    const userRole = authService.getRole();

    if (userRole !== expectedRole) {
      router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  };
};
