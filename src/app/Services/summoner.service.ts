import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Token} from "../Models/token";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SummonerService {

  constructor(private httpClient : HttpClient) { }

  setDataIntoDb(playername: string) {
    return this.httpClient.post<any>(environment.API_URL + 'api/userdata/insert-history', {username: playername});
  }

}
