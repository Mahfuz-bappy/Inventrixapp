import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Directive({
  selector: '[appHideIfClaimsNotMet]'
})
export class AppHideIfClaimsNotMetDirective implements OnInit {
  @Input("appHideIfClaimsNotMet") claimReq!: Function;
  constructor(private authService: AuthService,
    private elementRef: ElementRef) { }


    
  ngOnInit(): void {
    const claims = this.authService.getClaims();
    console.log("diretive call", claims);
    console.log("this.claimReq", this.claimReq);
    
    if (!this.claimReq(claims))
      this.elementRef.nativeElement.style.display = "none";
    else 
    {
      this.elementRef.nativeElement.style.display = "block";
    }
  }

}
