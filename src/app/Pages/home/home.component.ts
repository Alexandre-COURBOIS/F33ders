import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

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

}
