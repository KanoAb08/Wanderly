import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IDashboardData, IExpenseReport, IRequest, IUserRequest, IUsers } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<IDashboardData>{
    return this.http.get<IDashboardData>(`${environment.baseUrl}/api/admin/dashboard`,{withCredentials: true})
  }

  getAllBookings(): Observable<IUserRequest[]>{
    return this.http.get<IUserRequest[]>(`${environment.baseUrl}/api/admin/pending-req`,{withCredentials: true})
  }

  acceptBooking(data: IRequest){
    return this.http.post(`${environment.baseUrl}/api/admin/accept-reject-req`,data,{withCredentials: true})
  }

  rejectBooking(data: IRequest){
    return this.http.post(`${environment.baseUrl}/api/admin/accept-reject-req`,data,{withCredentials: true})
  }

  getExpenseReport(filterType: "monthly" | "weekly"): Observable<IExpenseReport[]>{    
    return this.http.post<IExpenseReport[]>(`${environment.baseUrl}/api/admin/expense-reports`,{filterType},{withCredentials: true})
  }

  getAllUsers(): Observable<IUsers[]>{
    return this.http.get<IUsers[]>(`${environment.baseUrl}/api/admin/all-users`,{withCredentials: true})
  }

  toggleUserRole(userId: string){
    return this.http.get(`${environment.baseUrl}/api/admin/admin-rights/${userId}`,{withCredentials: true})
  }
}
