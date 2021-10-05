import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../Models/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {
  }

  createUser(username: string,email: string,password: string) {
   return this.httpClient.post<User>(environment.API_URL + 'register/user',{username : username, email : email, password: password});
  }
}
