import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  authService: AuthService;
  claimvalue: any;

  constructor(authService: AuthService) {
    this.authService = authService; //injecting AuthService
  }
  ngOnInit(): void { 
    this.claimvalue=this.authService.getClaimUserName();
    console.log(this.claimvalue); 
  }

}
