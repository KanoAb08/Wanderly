import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ILogin, IRegister } from '../../types';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isActive = false;
  email: string = '';
  password: string = '';
  name: string = '';

  router = inject(Router);
  authsrv = inject(AuthService);

  onRegisterClick(): void {
    this.isActive = true;
  }

  onLoginClick(): void {
    this.isActive = false;
  }

  loginUser() {
    const loginData: ILogin = {
      email: this.email,
      password: this.password,
    };

    this.authsrv.login(loginData).subscribe({
      next: (res) => {
        console.log('Api Response : ', res);
        localStorage.setItem('userData', JSON.stringify(res));
        this.router.navigateByUrl('/book-travel');
      },
      error: (err) => console.log('Api Error : ', err),
    });
  }

  registerUser() {
    const registerData: IRegister = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.authsrv.register(registerData).subscribe({
      next: (res) => {
        console.log('Api Response : ', res);
        localStorage.setItem('userData', JSON.stringify(res));
        this.router.navigateByUrl('/book-travel');
      },
      error: (err) => console.log('Api Error : ', err),
    });
  }
}
