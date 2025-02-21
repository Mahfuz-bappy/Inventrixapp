import { Routes } from '@angular/router';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PageNotFoundComponent } from './wildNavigate/page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientdashboardComponent } from './clientdashboard/clientdashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { EmployeeLeaveComponent } from './admin/employee-leave/employee-leave.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { UsersComponent } from './layout/client-layout/users/users.component';
import { SettingsComponent } from './layout/client-layout/settings/settings.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { CompanyEntryComponent } from './admin/settings/company-entry/company-entry.component';
import { SubscriptionEntryComponent } from './admin/settings/subscription-entry/subscription-entry.component';
import { StateEntryComponent } from './admin/settings/state-entry/state-entry.component';
import { CountryEntryComponent } from './admin/settings/country-entry/country-entry.component';
import { SubscriptionApprovalComponent } from './admin/transaction/subscription-approval/subscription-approval.component';
import { EmployeeResignationComponent } from './admin/transaction/employee-resignation/employee-resignation.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/storeboard', pathMatch: 'full' },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'signup', component: RegisterComponent },
      { path: 'signin', component: LoginComponent },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'employeeleave', component: EmployeeLeaveComponent },
    ],
  },
   
  { 
    path:'storeboard',component:ClientLayoutComponent,
    children:[
    {path: 'dashboard', component: ClientdashboardComponent}, 
    {path: 'settings', component: SettingsComponent}, 
    {path: 'Users', component: UserComponent}, 
    {path: 'storeboard1', component: PageNotFoundComponent}, 
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect r
    ]

  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'settings/company-entry', component: CompanyEntryComponent },
      { path: 'settings/subscription-entry', component: SubscriptionEntryComponent },
      { path: 'settings/state-entry', component: StateEntryComponent },
      { path: 'settings/country-entry', component: CountryEntryComponent },
      { path: 'transaction/subscription-approval', component: SubscriptionApprovalComponent },
      { path: 'transaction/employee-leave', component: EmployeeLeaveComponent },
      { path: 'transaction/employee-resignation', component: EmployeeResignationComponent },
    ]
  },
  
  {
    path: '**',
    component: PageNotFoundComponent, // Wildcard route for a 404 page
  },
];
