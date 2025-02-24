import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../services/adminService/admin.service';
import { IUsers } from '../../types';

@Component({
  selector: 'app-admin-rights',
  imports: [NgFor],
  templateUrl: './admin-rights.component.html',
  styleUrl: './admin-rights.component.css',
})
export class AdminRightsComponent implements OnInit {
  allUsers: IUsers[] = [];
  adminsrv = inject(AdminService);

  ngOnInit(): void {
    this.adminsrv.getAllUsers().subscribe({
      next: (res: IUsers[]) => {
        this.allUsers = res;
      },
      error: (err) => console.log('API Error:', err),
    });
  }

  toggleAdminAccess(userId: string) {
    const user = this.allUsers.find((u) => u.userId === userId);
    if (!user) return;

    const previousRole = user.role;
    user.role = user.role === 'Admin' ? 'Employee' : 'Admin';

    this.adminsrv.toggleUserRole(userId).subscribe({
      next: (res) => {
        console.log('Role updated:', res);
      },
      error: (err) => {
        console.log('Error updating role:', err);
        user.role = previousRole;
      },
    });
  }
}
