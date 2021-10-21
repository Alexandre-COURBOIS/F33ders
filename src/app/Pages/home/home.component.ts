import {Component, OnInit} from '@angular/core';
import {gsap} from 'gsap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {SummonerService} from "../../Services/summoner.service";
import {isArray, isObject} from "rxjs/internal-compatibility";
import {count} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getPlayerForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private summonerService: SummonerService,
  ) {
  }

  ngOnInit(): void {

    this.initSearchPlayerForm();

    gsap.from('.logo', 1, {
      delay: 1.2,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.from('.menu-links ul li', 1, {
      delay: 1.2,
      opacity: 0,
      x: -20,
      ease: Power4.easeInOut
    })

    gsap.from('.search', 1, {
      delay: 1.6,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.from('.cart', 1, {
      delay: 1.8,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.to('.border-bottom', 1, {
      delay: 1.4,
      width: '100%',
      ease: Expo.easeInOut
    })

    gsap.from('.subtitle', 1, {
      delay: 2.8,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.to('.title', 1, {
      delay: 2.2,
      width: '100%',
      ease: Expo.easeInOut
    })

    gsap.from('.desc', 1, {
      delay: 2.8,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.from('.readmore', 1, {
      delay: 2.8,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.from('.champ-names p', 1, {
      delay: 3.8,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.from('.cover-img', 1, {
      delay: 3.4,
      opacity: 0,
      y: -50,
      ease: Expo.easeInOut
    })

    gsap.to('.slider', 1, {
      delay: 3.8,
      opacity: 1,
      ease: Expo.easeInOut
    })

    gsap.to('.img-3', 1, {
      delay: 2.2,
      width: '300px',
      ease: Expo.easeInOut
    })

    gsap.to('.first', 1.5, {
      delay: .2,
      left: '-100%',
      ease: Expo.easeInOut
    })

    gsap.to('.second', 1.5, {
      delay: .4,
      left: '-100%',
      ease: Expo.easeInOut
    })

    gsap.to('.third', 1.5, {
      delay: .6,
      left: '-100%',
      ease: Expo.easeInOut
    })

  }

  initSearchPlayerForm() {
    this.getPlayerForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  submitGetPlayerForm() {

    if (this.getPlayerForm.valid) {

      const surname = this.getPlayerForm.get('username')?.value;

      if (surname) {

        this.summonerService.setDataIntoDb(surname).subscribe(value => {

          if (value.statusCode === 400) {
            this.toastr.error("Nous ne disposons d'aucun match correspond à ce profil");
          }

          if (JSON.stringify(value).length > 50000) {

            localStorage.setItem('summoner', JSON.stringify(value));
            sessionStorage.setItem('summoner', JSON.stringify(value));

            this.toastr.success('Les données du joueur ' + surname + ' sont maintenant disponibles');
          }

          if (value === "Data has been set succesfully") {
            this.summonerService.setDataIntoDb(surname).subscribe(value1 => {

              localStorage.setItem('summoner', JSON.stringify(value1));
              sessionStorage.setItem('summoner', JSON.stringify(value1));

              this.toastr.success('Les données du joueur ' + surname + ' sont maintenant disponibles');

            }, error => {
              this.toastr.error("Nous ne disposons d'aucun match correspond à ce profil");
            });
          }
        }, error1 => {
          this.toastr.error("Nous ne disposons d'aucun match correspond à ce profil");
        });
      } else {
        this.toastr.error("Aucun nom d'invocateur n'est renseigné !");
      }
    }

  }

}



