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

export const routes: Routes = [
  { path: '', redirectTo: '/storeboard', pathMatch: 'full' },
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
    path:'',component:ClientLayoutComponent,
    children:[
    {path: 'storeboard', component: ClientdashboardComponent},
    { path: 'dashboard', component: ClientdashboardComponent }, // Route for /dashboard
    { path: 'users', component: UsersComponent },         // Route for /users
    { path: 'settings', component: SettingsComponent },   // Route for /settings
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect r
    ]

  },
  {
    path: '**',
    component: PageNotFoundComponent, // Wildcard route for a 404 page
  },
];
