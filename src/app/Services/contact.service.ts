import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  sendContactMessage(name: string, surname: string, email: string, message: string, createdAt: Date) {
    return this.httpClient.post(`${environment.API_URL}contact/send/message`, {
      name: name,
      surname: surname,
      email: email,
      message: message,
      createdAt: createdAt
    })

  }


}
