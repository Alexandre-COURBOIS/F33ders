import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.css']
})
export class TeamBuilderComponent implements OnInit {
  player!: any;

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getTeam();
  }

  getTeam() {
    // this.httpClient.get(environment.API_URL + 'api/algo/process').subscribe(value => {
    //   // console.log(value);
    //   this.lane = value;
    // });
    let username = 'Druxys';
    this.httpClient.post(environment.API_URL + 'api/algo/find-team',
      { username: username})
      .subscribe(value => {
        this.player = value;
      });
  }

}
