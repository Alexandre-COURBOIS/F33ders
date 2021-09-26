import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../Models/user";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = "http://localhost:8000/"

  httpOption = {
    headers: new HttpHeaders(
      {
        'Content-type': 'application/json'
      })
  }

  constructor(private http: HttpClient) {
  }

  registration(user: User): void{
    this.http.post<User>(`${this.url}register/user`, user, this.httpOption).subscribe()
  }
}
