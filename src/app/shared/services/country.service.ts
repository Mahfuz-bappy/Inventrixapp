import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TOKEN_KEY } from '../constants';
import { HttpClient, HttpParams } from '@angular/common/http';
 
import { Observable } from 'rxjs';
import { City, Country, State } from '../interfaces/country.interface';
import { ReferenceOption, UserType,Role } from '../interfaces/user.model';
 
@Injectable({
  providedIn: 'root'
})
export class CountryService {
    constructor(private http: HttpClient) { }
    apiUrl = environment.apiBaseUrl;
    

    getCountries(): Observable<Country[]> {
      return this.http.get<Country[]>(this.apiUrl + '/Country');
    }

    getStates(countryId?: string): Observable<State[]> {
      let params = new HttpParams();
      if (countryId) {
        params = params.set('countryId', countryId); // Add countryId as query parameter if available
      }
      // return this.http.get<State[]>(this.apiUrl + '/State/State/country', { params });
      return this.http.get<State[]>(`${this.apiUrl}/State/country/${countryId}`);
    }

    
  getCities(stateId: number | string): Observable<City[]> { // stateId can be number or string from ng-select value
    const apiUrl = `${this.apiUrl}/District/state/${stateId}`; // Construct API URL with stateId path parameter
    console.log(apiUrl);
    return this.http.get<City[]>(apiUrl);
  }
  

  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${this.apiUrl}/UserTypes`);
  }

  getReferenceOptions(): Observable<ReferenceOption[]> {
    return this.http.get<ReferenceOption[]>(`${this.apiUrl}/Person`);
 
}

getRoles(): Observable<Role[]> {
  return this.http.get<Role[]>(`${this.apiUrl}/Role`);
}

postUser(userData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/Users`, userData);
}
 

}