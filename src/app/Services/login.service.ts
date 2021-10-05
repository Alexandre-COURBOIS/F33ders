import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Token} from "../Models/token";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public getToken() {
    return sessionStorage.getItem('_token');
  }

  login(email: string, password: string) {
    return this.httpClient.post<Token>(environment.API_URL + 'api/login_check', {username: email, password: password});
  }

}
