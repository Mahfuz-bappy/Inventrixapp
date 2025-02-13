import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../constants';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
    constructor(private http: HttpClient) { }
  
    createUser(formData: any) {
      //WARNING!
      //default value for Role, Gender, Age, LibraryID?
      //instead of registration form, there should some other
      //form to update these details of the user
      formData.role = "Teacher"
      formData.gender = "Female"
      formData.age = 35
      return this.http.post(environment.apiBaseUrl + '/signup', formData);
    }
  
    signin(formData: any) {
      return this.http.post(environment.apiBaseUrl + '/Auth/login', formData);
    }
  
    isLoggedIn() {
      return this.getToken() != null ? true : false;
    }
  
    saveToken(token: string) {
      localStorage.setItem(TOKEN_KEY, token)
    }
    saveRefreshToken(token: string) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token)
    }
  
    getToken() {
      return localStorage.getItem(TOKEN_KEY);
    }
    getRefreshToken() {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
  
    deleteToken() {
      localStorage.removeItem(TOKEN_KEY);
    }
    deleteRefreshToken() {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  
    getClaims(){
     return JSON.parse(window.atob(this.getToken()!.split('.')[1]))
    }
}
