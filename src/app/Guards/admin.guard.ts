import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {EncryptService} from "../Services/encrypt.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from "ngx-toastr";
import {decimalDigest} from "@angular/compiler/src/i18n/digest";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  logged : any;
  token : any;


  constructor(private encryptService: EncryptService, private jwtHelperService: JwtHelperService, private router: Router, private toastr: ToastrService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve =>  {

      this.logged = sessionStorage.getItem("_logged");
      this.token = sessionStorage.getItem("_token");

      if (this.logged && this.token) {
        if (this.encryptService.decode(this.logged) === "true") {

          const decodedToken = this.jwtHelperService.decodeToken(this.token);

          if (decodedToken['roles'][0] === "ROLE_ADMIN" || decodedToken['roles'][1] === "ROLE_ADMIN") {
            resolve(true);
          } else {
            resolve(false);
            this.router.navigate(['']);
          }
        } else {
          resolve(false);
          this.router.navigate(['']);
        }
      } else {
        resolve(false);
        this.router.navigate(['']);
      }

    });
  }

}
