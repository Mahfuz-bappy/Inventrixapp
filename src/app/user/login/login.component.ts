import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService) {

      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
      // this.router.navigateByUrl('/dashboard');
    }
  }
  isSubmitted: boolean = false;

  form: any;
 

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value);
   
    if (this.form.valid) {
      const formData = this.form.value;
      const userData = {
        userName: formData.email,
        password: formData.password         
      };



      this.service.signin(userData).subscribe({
        next: (res: any) => {
          console.log(res);         
          this.service.saveToken(res.accessToken);
          this.service.saveRefreshToken(res.refreshToken);
          if(this.service.IsClient()){  
            this.router.navigateByUrl('/storeboard');
          }
          else{
            this.router.navigateByUrl('/dashboard');
          } 
          return;
        },
        error: err => {
          if (err.status == 400)
            this.toastr.error('Incorrect email or password.', 'Login failed')
          else if (err.status == 401)
          {
            this.toastr.error('Incorrect email or password.', 'Login failed')
          }
          else
            console.log('error during login:\n', err);
        }
      })
    }
  }





}
