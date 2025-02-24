import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  toast = inject(ToastrService);
  cookieService = inject(CookieService);
  location = inject(Location)

  constructor() {}

  canActivate(): boolean {
    const role = this.cookieService.get('role');
    if (role === 'Admin') {
      return true;
    } else {
      this.toast.error("Can't access Admin routes without permission!!");
      this.location.back()
      return false;
    }
  }
}
