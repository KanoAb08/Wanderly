import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookTravelForm, IHistory, IUserDashboardData } from '../../../types';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  bookTravel(FormData: IBookTravelForm) {
    return this.http.post(
      `${environment.baseUrl}/api/users/create-req`,
      FormData,
      { withCredentials: true }
    );
  }

  getHistory(): Observable<IHistory[]> {
    return this.http.get<IHistory[]>(
      `${environment.baseUrl}/api/users/history`,
      { withCredentials: true }
    );
  }

  getUserTrips(){
    const userData = localStorage.getItem('userData');
    if (!userData) {
      console.error('User not found in local storage');
      return;
    }

    const userId = JSON.parse(userData).user.userId;

    return this.http.get<IUserDashboardData>(
      `${environment.baseUrl}/api/users/user-trips/${userId}`,
      { withCredentials: true }
    );
  }
}
