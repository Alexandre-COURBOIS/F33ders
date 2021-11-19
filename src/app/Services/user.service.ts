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

  getUserProfil() {
    return this.httpClient.get<User>(environment.API_URL + 'api/get_user_profil');
  }

  deleteUser(id: number) {
    return this.httpClient.post(environment.API_URL + 'api/delete_user', {
      id: id,
    });
  }

  setUserBan(id: number,informations: string) {
    return this.httpClient.post(environment.API_URL + 'api/ban_user', {
      id: id,
      informations : informations,
    });
  }

  setUserActiveAccount(id: number,informations: string) {
    return this.httpClient.post(environment.API_URL + 'api/activate_user_account_admin', {
      id: id,
      informations : informations,
    });
  }

  updateUserInformations(username: String) {
    return this.httpClient.patch(environment.API_URL + 'api/update_username', {
      username: username,
    });
  }

  updateAdminUserInformations(id: number,username : String, email : String) {
    return this.httpClient.post(environment.API_URL + 'api/admin_update_user_informations', {
      id: id,
      username : username,
      email : email,
    });
  }

  updateAdminUserPassword(id: number,newPassword : String, verifNewPassword : String) {
    return this.httpClient.post(environment.API_URL + 'api/admin_update-user-password', {
      id: id,
      password : newPassword,
      verifNewPassword : verifNewPassword,
    });
  }

  updateAdminUserPasswordAuto(id: number) {
    return this.httpClient.post(environment.API_URL + 'api/admin_update_password_automatically', {
      id: id,
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
