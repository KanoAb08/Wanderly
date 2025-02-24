import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { UserService } from '../services/userService/user.service';
import { IHistory } from '../../types';

@Component({
  selector: 'app-history',
  imports: [NgClass, NgIf, NgFor, DecimalPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  history: IHistory[] = [];
  usersrv = inject(UserService);
  ngOnInit(): void {
    this.usersrv.getHistory().subscribe({
      next: (res: IHistory[]) => {
        console.log('Api Response : ', res);
        this.history = res;
      },
      error: (err) => console.log('Api Error : ', err),
    });
  }
}
