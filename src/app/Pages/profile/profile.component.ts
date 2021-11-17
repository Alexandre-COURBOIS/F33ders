import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    private userService: UserService
  ) {
  }


  ngOnInit(): void {
    this.userService.getUserProfil().subscribe(value => {
      this.user = value;
      console.log(this.user);
    });

  }

}
