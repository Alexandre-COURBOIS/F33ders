import { Component, OnInit } from '@angular/core';
import {gsap} from "gsap";

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    gsap.from('.header', 1, {
      delay: 0.3,
      duration:1,
      opacity: 0,
      x: -50,
      ease: Expo.easeInOut
    });

    gsap.from('.gridChampions', 1, {
      delay: 0.8,
      duration:1,
      opacity: 0,
      y: 50,
      ease: Expo.easeInOut
    });
  }

}
