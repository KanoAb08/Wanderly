import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/userService/user.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ICompletedTrips, IUpcomingTrips, IUserDashboardData } from '../../types';

@Component({
  selector: 'app-user-dashboard',
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  usersrv = inject(UserService);
  upcomingTrips: IUpcomingTrips[]  = [];
  completedTrips: ICompletedTrips[] = [];

  ngOnInit(): void {
    this.usersrv.getUserTrips()?.subscribe({
      next: (res: IUserDashboardData) => {
        console.log('Api Response : ', res);
        this.upcomingTrips = res.upcomingTrips;
        this.completedTrips = res.completedTrips;
      },
      error: (err) => console.log('Api Error : ', err),
    });
  }
}
