import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,private jwtHelper: JwtHelperService,) { }

/*    httpOption = {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.jwtHelper.tokenGetter()}`)
    }

  httpOption = {
    headers: new HttpHeaders({
      'Content-type' : 'application/json'
    })
  }*/


  getUser() {
    return this.httpClient.get(environment.API_URL + 'api/get_user');
  }


}
