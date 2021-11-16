import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Champion} from "../Models/champion";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  constructor(private httpClient: HttpClient) { }

  public getAllChampions(): Observable<Champion[]> {
    return this.httpClient.get<Champion[]>(environment.API_URL + 'api/get-all-champion/database');
  }
}
