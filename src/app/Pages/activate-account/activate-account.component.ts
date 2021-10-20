import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../Services/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    const token: string = this.route.snapshot.params['token'];

    if (token && token.length == 43) {

      this.accountService.activateAccount(token).subscribe(value => {

        // @ts-ignore
        this.toastr.success(value);
        this.router.navigate(['login']);

      }, error => {
        this.toastr.error("Page inaccessible");
        this.router.navigate(['login']);
      })
    } else {
      this.toastr.error("Page inaccessible");
      this.router.navigate(['login']);
    }
  }

}
