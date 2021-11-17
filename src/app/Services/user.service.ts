import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../Models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  getUser() {
    return this.httpClient.get<User>(environment.API_URL + 'api/get_user');
  }

  getUserProfil() {
    return this.httpClient.get<User>(environment.API_URL + 'api/get_user_profil');
  }

  updateUserInformations(username: String) {
    return this.httpClient.patch(environment.API_URL + 'api/update_username', {
      username: username,
    });
  }

  updateUserPasswordInformation(oldPassword : String, password : String, verifPassword : String) {
    return this.httpClient.patch(environment.API_URL + 'api/update_password', {
      oldPassword : oldPassword,
      password : password,
      verifPassword : verifPassword
    });
  }


}
