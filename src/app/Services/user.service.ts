import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../Models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClient: HttpClient) {
  }


  getUser() {
    return this.httpClient.get<User>(environment.API_URL + 'api/get_user');
  }

  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.API_URL}api/get_all_user`)
  }

  deleteUser(id: any) {
    return this.httpClient.delete(`${environment.API_URL}api/delete_user/${id}`)
  }


}
