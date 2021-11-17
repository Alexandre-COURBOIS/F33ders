import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-gamer',
  templateUrl: './profile-gamer.component.html',
  styleUrls: ['./profile-gamer.component.css']
})
export class ProfileGamerComponent implements OnInit {

  summoner: any;
  match: any;
  overed = false;
  showable = false;

  constructor(el: ElementRef) {
  }

  ngOnInit(): void {



    this.summoner = sessionStorage.getItem("summoner");

    if (!this.summoner) {
      this.summoner = localStorage.getItem("summoner");
    }

    this.summoner = JSON.parse(this.summoner);
    console.log(this.summoner);

    this.match = this.summoner.match;
    console.log(this.match)

  }

  onMouseHover(){
    console.log("toto");
  }

}
