import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/userService/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-travel',
  imports: [ReactiveFormsModule],
  templateUrl: './book-travel.component.html',
  styleUrl: './book-travel.component.css'
})
export class BookTravelComponent {
  travelForm: FormGroup = new FormGroup({
      destination: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      purpose: new FormControl(),
      expenseType: new FormControl(),
      expense: new FormControl(),   
  })

  usersrv = inject(UserService)
  toast = inject(ToastrService)

  onSave(){
    this.travelForm.disable()
    const bookTravelForm = this.travelForm.value;    
    this.usersrv.bookTravel(bookTravelForm).subscribe({
      next: (res) => {
        console.log('Api Response : ', res);
        this.toast.success("Travel Booked Successfully!")
        this.travelForm.reset()
        this.travelForm.enable()
      },
      error: (err) => {
        console.log('Api Error : ', err)
        this.toast.error(err.error.message)
        this.travelForm.enable()
      },
    });
  }
}
