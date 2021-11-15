import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-gamer',
  templateUrl: './profile-gamer.component.html',
  styleUrls: ['./profile-gamer.component.css']
})
export class ProfileGamerComponent implements OnInit {

  summoner: any;

  constructor() {
  }

  ngOnInit(): void {

    this.summoner = sessionStorage.getItem("summoner");

    if (!this.summoner) {
      this.summoner = localStorage.getItem("summoner");
    }

    this.summoner = JSON.parse(this.summoner);

    console.log(this.summoner);
    console.log(this.summoner.match);


  }

}
