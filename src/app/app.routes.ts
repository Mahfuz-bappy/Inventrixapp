import { Routes } from '@angular/router';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PageNotFoundComponent } from './wildNavigate/page-not-found/page-not-found.component';

export const routes: Routes = [
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
    path: '**',
    component: PageNotFoundComponent, // Wildcard route for a 404 page
  },
];
