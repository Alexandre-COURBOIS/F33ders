import { Component, OnInit } from '@angular/core';
import {Champion} from "../../Models/champion";
import {ChampionService} from "../../Services/champion.service";
import {count} from "rxjs/operators";

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {

  champions: Champion[] | undefined;

  constructor(private championService: ChampionService) { }

  ngOnInit(): void {
    this.championService.getAllChampions().subscribe(champions => {
      this.champions = champions;
      console.log(champions);

    });


  }

}
