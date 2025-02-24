import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BookTravelComponent } from './book-travel/book-travel.component';
import { HistoryComponent } from './history/history.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { AuthComponent } from './auth/auth.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { adminGuard } from './admin.guard';
import { AdminRightsComponent } from './admin-rights/admin-rights.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path: 'book-travel',
                component: BookTravelComponent
            },
            {
                path: 'history',
                component: HistoryComponent
            },{
                path: 'user-dashboard',
                component: UserDashboardComponent
            },
            {
                path: 'admin-dashboard',
                component: AdminDashboardComponent,
                canActivate: [adminGuard]
            },
            {
                path: 'booking-management',
                component: BookingManagementComponent,
                canActivate: [adminGuard]
            },
            {
                path: 'admin-rights',
                component: AdminRightsComponent,
                canActivate: [adminGuard]
            }
        ]
    }
];
