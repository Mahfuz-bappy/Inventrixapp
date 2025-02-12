import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import {  NgSelectModule } from '@ng-select/ng-select';
//#region country and state interfaces
// Define interfaces for Country and State objects to provide type safety
interface Country {
  id: string; // Unique identifier for the country (e.g., 'USA', 'CAN')
  name: string; // Display name of the country (e.g., 'United States', 'Canada')
}

interface State {
  id: string; // Unique identifier for the state (e.g., 'CA_USA', 'NY_USA')
  countryId: string; // ID of the country to which this state belongs
  name: string; // Display name of the state (e.g., 'California', 'New York')
}
//#endregion

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink,NgSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  //#region country and state initialization and data
  countries: Country[] = [
    // Static array of countries (in real app, fetch from API)
    { id: 'USA', name: 'United States' },
    { id: 'CAN', name: 'Canada' },
    { id: 'UK', name: 'United Kingdom' },
    // Add more countries as needed
  ];
  states: State[] = [
    // Static array of states (in real app, fetch from API - often based on country selection)
    { id: 'CA_USA', countryId: 'USA', name: 'California' },
    { id: 'NY_USA', countryId: 'USA', name: 'New York' },
    { id: 'ON_CAN', countryId: 'CAN', name: 'Ontario' },
    { id: 'QC_CAN', countryId: 'CAN', name: 'Quebec' },
    { id: 'ENG_UK', countryId: 'UK', name: 'England' },
    { id: 'SCT_UK', countryId: 'UK', name: 'Scotland' },
    // Add more states for each country
  ];
  filteredStates: State[] = []; // Array to hold states filtered based on the selected country
  loadingStates = false;

  //#region
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  isSubmitted: boolean = false;
  form: any;

  //password validation
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({ passwordMismatch: true });
    else confirmPassword?.setErrors(null);

    return null;
  };

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/),
          ],
        ],
        confirmPassword: [''],
        country: ['', Validators.required], // FormControl for Country, required validation
        state: [{ value: '', disabled: true }, Validators.required], // FormControl for State, required validation (initially will be empty until country selected)
      },
      { validators: this.passwordMatchValidator }
    );

    // Subscribe to value changes of the 'country' FormControl to implement cascading dropdown logic
    this.form
      .get('country')
      ?.valueChanges.pipe(
        // switchMap: When a new country is selected, it cancels any previous state loading and starts a new one.
        switchMap((countryId:string) => {
          this.filteredStates = []; // Clear previously filtered states when country changes

          if (countryId) {
            // If a country is selected (countryId is not null/undefined)
            this.loadingStates = true; // Set loading state to true, can be used to show a loading indicator
            this.form.get('state')?.enable(); // Enable the state dropdown when a country is selected
            // Simulate an API call delay using 'of' and 'delay' (replace with actual API call in real application)
            return of(this.getStatesForCountry(countryId)).pipe(delay(500)); // Simulate asynchronous data fetch
          } else {
            return of([]); // If no country selected, return an empty array of states (no states to display)
          }
        })
      )
      .subscribe((states:State[]) => {
        // Subscribe to the Observable returned by switchMap to handle the emitted states
        this.filteredStates = states; // Update filteredStates array with the states fetched for the selected country
        this.loadingStates = false; // Reset loading state to false once states are loaded
        this.form.get('state')?.reset(''); // Reset the state dropdown when the country changes (optional - you might want to keep the state selected if it is still valid for the new country)
      });
  }
  // Function to filter states based on the selected countryId
  getStatesForCountry(countryId: string): State[] {
    return this.states.filter((state) => state.countryId === countryId); // Filter the 'states' array to only include states that match the given countryId
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      console.log('Form Value:', this.form.value); // Log the form values to the console (replace with actual submission logic)
    }
  }

  saveUserData() {  
    this.service.createUser(this.form.value).subscribe({
      next: (res: any) => {
        if (res.succeeded) {
          this.form.reset();
          this.isSubmitted = false;
          this.toastr.success('New user created!', 'Registration Successful');
        }
      },
      error: (err) => {
        if (err.error.errors)
          err.error.errors.forEach((x: any) => {
            switch (x.code) {
              case 'DuplicateUserName':
                break;

              case 'DuplicateEmail':
                this.toastr.error(
                  'Email is already taken.',
                  'Registration Failed'
                );
                break;

              default:
                this.toastr.error(
                  'Contact the developer',
                  'Registration Failed'
                );
                console.log(x);
                break;
            }
          });
        else console.log('error:', err);
      },
    });

  }
}
