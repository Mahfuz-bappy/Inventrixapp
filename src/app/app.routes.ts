import { Routes } from '@angular/router';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PageNotFoundComponent } from './wildNavigate/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',   component: UserComponent,  // Default route
        children: [  
            // Child routes for login and register
          {
            path: 'login', component: LoginComponent
          },
          {
            path: 'register', component: RegisterComponent
          },
        ]
    },
    {
        path: '**', component: PageNotFoundComponent    // Wildcard route for a 404 page
    }
    

];
