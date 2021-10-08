import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient: HttpClient) {
  }

  sendMailForgotPassword(email: string) {
    return this.httpClient.post(`${environment.API_URL}forgot/password`, {email: email});
  }

  getTokenInformations(token: string, date: string | null) {
    return this.httpClient.post(`${environment.API_URL}reset/password`, {token: token, date: date});
  }

  updatePassword(email: string, password: string, passwordVerif: string) {
    return this.httpClient.post(`${environment.API_URL}reset-password/update-password`, {
      email: email,
      password: password,
      passwordVerif: passwordVerif
    });
  }

}
