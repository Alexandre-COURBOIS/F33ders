import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any;

  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // this.userService.getUser(id).subscribe((id) => {
    //   console.log(id, 'id user')
    // })
    this.userService.getAllUser().subscribe(users => {
      console.log(users, 'users');
      this.users = users;
    })


  }

  delete() {
    // const userId = this.route.snapshot.params['id'];
    const userId = this.users.id;
    console.log(userId, 'UserId')
    // this.userService.deleteUser(userId).subscribe(userId =>{
    //   this.router.navigate(['admin'])
    // })
  }


}

