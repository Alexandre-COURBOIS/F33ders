import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  activateAccount(token: string) {
    return this.httpClient.post(environment.API_URL + '/account_activation', {token: token});
  }
}
