import {Component, OnInit} from '@angular/core';
import {gsap} from "gsap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {SummonerService} from "../../Services/summoner.service";
import {EncryptService} from "../../Services/encrypt.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  getPlayerForm !: FormGroup;
  submitted = false;
  timeExec = false;
  token: any;
  isLogged: any;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private summonerService: SummonerService,
    private encryptService: EncryptService
  ) {
  }

  ngOnInit(): void {

    this.isLogged = sessionStorage.getItem("_logged");

    if (this.isLogged) {
      this.isLogged = this.encryptService.decode(this.isLogged);
    }

    this.token = sessionStorage.getItem('_token');

    this.initSearchPlayerForm();


    gsap.from('.logo', 1, {
      delay: 1.2,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    });
    gsap.from('.menu-links ul li', 1, {
      delay: 1.2,
      opacity: 0,
      x: -20,
      ease: Power4.easeInOut
    });
    gsap.from('.search', 1, {
      delay: 1.6,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    });
    gsap.from('.profile-dropdown', 1, {
      delay: 1.8,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    });
    gsap.from('.cart', 1, {
      delay: 2.0,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    });
    gsap.to('.border-bottom', 1, {
      delay: 1.4,
      width: '100%',
      ease: Expo.easeInOut
    });
  }

  initSearchPlayerForm() {
    this.getPlayerForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  submitGetPlayerForm() {

    if (this.getPlayerForm.valid) {

      if (this.token && this.isLogged) {
        this.submitted = true;
        this.timeExec = true;

        const surname = this.getPlayerForm.get('username')?.value;

        if (surname) {

          this.summonerService.setDataIntoDb(surname).subscribe(value => {

            if (value.statusCode === 400 || value.statusCode === 404) {
              this.toastr.error("Nous ne disposons d'aucun match correspond à ce profil");
              this.timeExec = false;
              this.submitted = false;
            }


            if (JSON.stringify(value).length > 50000) {
              this.submitted = false;
              localStorage.setItem('summoner', JSON.stringify(value));
              sessionStorage.setItem('summoner', JSON.stringify(value));

              this.toastr.success('Les données du joueur ' + surname + ' sont maintenant disponibles');

              if (value) {
                this.timeExec = false;
                this.submitted = false;
              }
            }

            if (value === "Data has been set succesfully") {

              this.summonerService.setDataIntoDb(surname).subscribe(value1 => {

                if (value.statusCode === 400 || value.statusCode === 404) {
                  this.toastr.error("Nous ne disposons d'aucun match correspond à ce profil");
                  this.timeExec = false;
                  this.submitted = false;
                } else {
                  this.timeExec = false;
                  this.submitted = false;

                  localStorage.setItem('summoner', JSON.stringify(value1));
                  sessionStorage.setItem('summoner', JSON.stringify(value1));

                  this.toastr.success('Les données du joueur ' + surname + ' sont maintenant disponibles');
                }

              }, error => {
                this.timeExec = false;
                this.submitted = false;
                this.toastr.error("Nous ne disposons d'aucun match correspond à ce profil");
              });
            }
          }, error1 => {
            this.timeExec = false;
            this.submitted = false;
            this.toastr.error("Nous ne disposons d'aucun match correspond à ce profil");
          });
        } else {
          this.timeExec = false;
          this.submitted = false;
          this.toastr.error("Aucun nom d'invocateur n'est renseigné !");
        }
      } else {
        this.toastr.error("Afin d'utiliser cette fonctionnalité veuillez vous connecter");
      }
    }
  }

}
