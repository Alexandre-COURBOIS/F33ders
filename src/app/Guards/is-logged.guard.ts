import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {EncryptService} from "../Services/encrypt.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  logged : any;
  token : any;
  summoner: any;

  constructor(private encryptService: EncryptService, private jwtHelperService: JwtHelperService, private router: Router, private toastr: ToastrService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {

      this.logged = sessionStorage.getItem("_logged");
      this.token = sessionStorage.getItem("_token");

      if (this.token) {

        this.encryptService.decode(this.logged);

        let res = this.encryptService.decode(this.logged);

        if (res === "true" && this.token) {

          let resToken = this.jwtHelperService.decodeToken(this.token);

          if (Object.keys(resToken).length === 4 && resToken.username && resToken.exp > Math.round(Date.now() / 1000)) {

            let urlToGo = window.location.href.split('/')[3];

            if (urlToGo === "player") {

              this.summoner = sessionStorage.getItem('summoner');
              this.summoner = localStorage.getItem('summoner');

              if (this.summoner) {
                resolve(true);
              } else {
                this.toastr.error('Merci de rechercher un joueur');
                this.router.navigate(['']);
              }
            } else {
              resolve(true);
            }
          } else {
            resolve(false);
            this.toastr.error('Connexion requise');
            this.router.navigate(['login']);
          }
        } else {
          resolve(false);
          this.toastr.error('Connexion requise');
          this.router.navigate(['login']);
        }
      } else {
        resolve(false);
        this.toastr.error('Connexion requise');
        this.router.navigate(['login']);
      }
    })
  }


}
