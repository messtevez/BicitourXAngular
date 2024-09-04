import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  return () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true;
    }
    router.navigate(['/ingreso']);
    return false;
  };
};
