import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import Typed from 'typed.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {

    const options = {
      strings: [
        '"Certains combattent pour l\'honneur, d\'autres pour la gloire. Qu\'importe, du moment qu\'ils combattent."',
        '"Je suis la fureur du blizzard, la morsure du vent, le froid de la glace. Je suis Freljord."',
        '"Ces lieux brûleront, pas en raison de cendres portées par le vent ou du souffle des braises, mais en raison de la vengeance que portent mes mains."',
        '"Son nom est Corki. Il est la mort venue d\'en haut."',
        '"Le soleil n\'offre aucune vérité. Sa lumière seulement nous brûle et nous aveugle."',
        '"Le \'meilleur\' dépend de mes exigences du jour."',
        '"Pas le temps d\'étudier des grimoires moisis quand on explore la crypte où se trouvent ces grimoires moisis"',
        '"Je suis venue en quête d\'une épreuve. Est-ce là tout ce que vous pouvez m\'offrir ?"',
        '"Ohé, abattez-moi cet homme. Ou tirez-lui dans le dos et volez-lui son butin, au moins."',
        '"Ne vous laissez pas endormir par la beauté de Janna. Derrière le masque de la brise se cache la brutalité de l\'ouragan."',
        '"Regarde, j\'ouvre ma boîte de compassion ! Oh, elle est vide !"',
      ],
      typeSpeed: 15,
      backSpeed: 15,
      showCursor: true,
      backDelay: 3000,
      cursorChar: ' |',
      loop: true
    };

    const typed = new Typed('.typed-element', options);

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

    gsap.to('.slider', 1, {
      delay: 3.8,
      opacity: 1,
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


}
