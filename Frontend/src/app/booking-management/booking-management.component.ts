import { Component, inject, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IRequest, IUserRequest } from '../../types';
import { AdminService } from '../services/adminService/admin.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-booking-management',
  imports: [NgIf, NgFor, DatePipe,DecimalPipe],
  templateUrl: './booking-management.component.html',
  styleUrl: './booking-management.component.css',
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-10px)' })),
      transition('in => out', [animate('0.5s ease-in-out')])
    ])
  ]
})
export class BookingManagementComponent implements OnInit {
  allRequest: IUserRequest[] = [];
  removedRequests: { [key: string]: boolean } = {}; 

  obj: IRequest = {
    requestId: '',
    status: null,
  };

  adminsrv = inject(AdminService);
  toast = inject(ToastrService);

  ngOnInit(): void {
    this.adminsrv.getAllBookings().subscribe({
      next: (res: IUserRequest[]) => {
        this.allRequest = res;
      },
      error: (err) => {
        console.log('Api Error : ', err);
      }
    });
  }

  onAccept(id: string) {
    this.obj.requestId = id;
    this.obj.status = 'Approved';

    this.adminsrv.acceptBooking(this.obj).subscribe({
      next: (res) => {
        console.log('Api Response : ', res);
        this.toast.success('Accepted!');
        this.fadeOutRequest(id);
      },
      error: (err) => {
        console.log('Api Error : ', err);
        this.toast.error(err.error.message);
      },
    });
  }

  onReject(id: string) {
    this.obj.requestId = id;
    this.obj.status = 'Rejected';

    this.adminsrv.rejectBooking(this.obj).subscribe({
      next: (res) => {
        console.log('Api Response : ', res);
        this.toast.error('Rejected!');
        this.fadeOutRequest(id);
      },
      error: (err) => {
        console.log('Api Error : ', err);
        this.toast.error(err.error.message);
      },
    });
  }

  fadeOutRequest(id: string) {
    this.removedRequests[id] = true; 
    setTimeout(() => {
      this.allRequest = this.allRequest.filter(request => request._id !== id);
      delete this.removedRequests[id]; 
    }, 500); 
  }
}
