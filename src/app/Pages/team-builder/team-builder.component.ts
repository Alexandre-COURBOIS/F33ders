import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.css']
})
export class TeamBuilderComponent implements OnInit {
  private data: any;
  private lane: Object | undefined;
  private agressevity: boolean = false;
  private vulnerable: boolean = false;
  private arrayLane: Array<any> = [];
  // private playerLane: string;

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // this.httpClient.get(environment.API_URL + 'api/algo/process').subscribe(value => {
    //   // console.log(value);
    //   this.lane = value;
    // });
    let username = 'Druxys';
    this.httpClient.post(environment.API_URL + 'api/algo/process',
      { username: username})
      .subscribe(value => {
        console.log(value);
        this.data = value;

        if(this.data.mainRole == 'ADC') {

        }
      });
  }

}
