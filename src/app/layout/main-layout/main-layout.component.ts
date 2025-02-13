import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  constructor(private router: Router,
    private authService: AuthService) {  console.log("checkme"); }
    

  onLogout() {
    this.authService.deleteToken();
    this.authService.deleteRefreshToken();
    this.router.navigateByUrl('/signin');
  }
}
