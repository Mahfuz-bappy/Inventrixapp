import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { AppHideIfClaimsNotMetDirective } from '../../shared/app-hide-if-claims-not-met.directive';

export const claimrequestfunc = {
  isAdmin: (claims: any) => {
    // Check for "Owner" role based on the provided token structure
    const roleClaim = claims["UserName"];
    return roleClaim === "Office Admin" || roleClaim === "Owner"; // Assuming "Owner" is equivalent to "Admin" in your context, or adjust as needed.
  },
  isCEO: (claims: any) => { 
    const userTypeClaim = claims["UserType"];
    return userTypeClaim === "AppOwner" || userTypeClaim === "AppOwner"; // Replace "Teacher" and "SomeTeacherUserType" with actual values if different.
    
  },
   
};


@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,RouterLink,AppHideIfClaimsNotMetDirective],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent  implements OnInit{
  userName: string | undefined; 
  // claimReq:any=claimrequestfunc;
  claimReq: typeof claimrequestfunc = claimrequestfunc; 
  constructor(private router: Router,
    private authService: AuthService) {  console.log("checkme"); }
    


    ngOnInit(): void {
      const claims = this.authService.getClaims();
      console.log(claims);
      console.log(claims.UserName);     
      if (claims && claims.UserName) {
        this.userName = claims.UserName;
      } else {
        console.error('Claims object is invalid or does not contain userName');
      }
    }

  onLogout() {
    this.authService.deleteToken();
    this.authService.deleteRefreshToken();
    this.router.navigateByUrl('/signin');
  }
}
