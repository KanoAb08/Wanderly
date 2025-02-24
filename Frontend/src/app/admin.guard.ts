import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);

  const role = cookieService.get('role');

  if (role === 'Admin') {
    return true;
  } else {
    return false;
  }
};
