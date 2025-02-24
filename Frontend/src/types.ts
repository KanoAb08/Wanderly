export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  name: string;
  email: string;
  password: string;
}
export interface IHistory {
  destination: string;
  endDate: string;
  expense: number;
  expenseType: 'Hotel' | 'Flight' | 'Both';
  purpose: string;
  startDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface IUserRequest {
  destination: string;
  endDate: string;
  expense: number;
  expenseType: 'Hotel' | 'Flight' | 'Both';
  purpose: string;
  startDate: string;
  userName: string;
  _id: string;
}

export interface IBookTravelForm {
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  expenseType: string;
  expense: number;
}

export interface IDashboardData {
  totalAcceptedRequests: number;
  totalExpense: number;
  totalPendingRequests: number;
  totalRequests: number;
}

export interface IRequest {
  requestId: string;
  status: 'Approved' | 'Rejected' | null;
}

export interface IExpenseReport {
  destination: string
  expense: number
  expenseType: string
  userName: string
  _id: string
}

export interface IUsers {
  email:string,
  name:string,
  role:string,
  userId:string
}

export interface IUserDashboardData{
  upcomingTrips:IUpcomingTrips[],
  completedTrips:ICompletedTrips[]
}

export interface IUpcomingTrips{
  destination: string;
  status: 'Upcoming' | 'Completed';
  endDate: string;
  startDate: string;
}
export interface ICompletedTrips{
  destination: string;
  status: 'Upcoming' | 'Completed';
  endDate: string;
  startDate: string;
}