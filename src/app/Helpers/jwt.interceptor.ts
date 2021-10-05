import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../Services/login.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginService.getToken()}`
      }
    });

    return next.handle(request);
  }
}
