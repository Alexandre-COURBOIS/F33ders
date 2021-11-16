import { Component, OnInit } from '@angular/core';
import {gsap} from "gsap";

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.css']
})
export class ChampionDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    gsap.from('.img', 1, {
      delay: 0.3,
      duration: 1,
      opacity: 0,
      y: 250,
      ease: Expo.easeInOut
    });
    gsap.from('.nameOne', 1, {
      delay: 0.8,
      duration: 1.5,
      opacity: 0,
      x: 100,
      y: 100,
      ease: Expo.easeInOut
    });
    gsap.from('.nameTwo', 1, {
      delay: 0.8,
      opacity: 0,
      duration: 1.5,
      x: -100,
      y: -100,
      ease: Expo.easeInOut
    });
    gsap.from('.sectionTwo', 1, {
      delay: 1.2,
      opacity: 0,
      y: 250,
      ease: Expo.easeInOut
    });
  }

}
