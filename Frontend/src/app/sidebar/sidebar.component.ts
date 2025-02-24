import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  router = inject(Router);
  authsrv = inject(AuthService);
  cookieService = inject(CookieService);

  userName: string = '';
  userMail: string = '';

  isAdmin: boolean = false;

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      console.error('User not found in local storage');
      return;
    }

    const user = JSON.parse(userData).user;
    this.userName = user.name;
    this.userMail = user.email;

    const role = this.cookieService.get('role');

    if (role === 'Admin') {
      this.isAdmin = true;
    }
  }

  logout() {
    this.authsrv.logout().subscribe({
      next: (res) => {
        console.log('Api Response : ', res);
        localStorage.removeItem('userData');
        this.router.navigateByUrl('/auth');
      },
      error: (err) => console.log('Api Error : ', err),
    });
  }
}
