import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, IRegister } from '../../../types';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData: ILogin){
    return this.http.post(`${environment.baseUrl}/api/users/login`,loginData, { withCredentials: true })
  }

  register(registerData: IRegister){
    return this.http.post(`${environment.baseUrl}/api/users/register`,registerData, { withCredentials: true })
  }

  logout(){
    return this.http.post(`${environment.baseUrl}/api/users/logout`,{},{withCredentials: true})
  }
}
