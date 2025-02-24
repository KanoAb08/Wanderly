import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../services/adminService/admin.service';
import { IDashboardData, IExpenseReport } from '../../types';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NgIf,NgFor,DecimalPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  totalExpense: number = 0;
  totalRequest: number = 0;
  acceptedRequest: number = 0;
  pendingRequest: number = 0;

  filteredExpenses: IExpenseReport[] = [];
  selectedFilter: 'weekly' | 'monthly' = 'weekly';
  userName: string = ''

  adminsrv = inject(AdminService);

  ngOnInit(): void {

    this.adminsrv.getDashboardData().subscribe({
      next: (res: IDashboardData) => {
        console.log('Api Response : ', res);
        this.totalExpense = res.totalExpense;
        this.totalRequest = res.totalRequests;
        this.acceptedRequest = res.totalAcceptedRequests;
        this.pendingRequest = res.totalPendingRequests;
      },
      error: (err) => console.log('Api Error : ', err),
    });

    this.adminsrv.getExpenseReport('weekly').subscribe({
      next: (res: IExpenseReport[]) => {
        console.log('Api Response : ', res);
        this.filteredExpenses = res;
      },
      error: (err) => console.log('Api Error : ', err),
    });

    const userData = localStorage.getItem('userData');
    if (!userData) {
      console.error('User not found in local storage');
      return;
    }

    this.userName = JSON.parse(userData).user.name;
  }

  filterExpenses(filter: 'monthly' | 'weekly') {
    this.selectedFilter = filter;
    this.adminsrv.getExpenseReport(filter).subscribe({
      next: (res: IExpenseReport[]) => {
        console.log('Api Response : ', res);
        this.filteredExpenses = res;
      },
      error: (err) => console.log('Api Error : ', err),
    });
  }
}
