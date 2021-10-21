import { Component, OnInit } from '@angular/core';
import {gsap} from "gsap";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
    gsap.from('.profile-dropdown', 1, {
      delay: 1.8,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.from('.cart', 1, {
      delay: 2.0,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    gsap.to('.border-bottom', 1, {
      delay: 1.4,
      width: '100%',
      ease: Expo.easeInOut
    })

  }

}
