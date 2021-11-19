import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateAndRewriteCoreSymbol} from "@angular/compiler-cli/src/ngtsc/imports";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any;
  closeResult = "";
  updatePassword !: FormGroup;
  updateInformations !: FormGroup;
  idToUpdate : any;

  constructor(
    public userService: UserService,
    public toastr: ToastrService,
    public router: Router,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this.userService.getUserProfil().subscribe(value => {

      // @ts-ignore
      const roles = value.roles;

      if (roles[0] === "ROLE_ADMIN" || roles[1] === "ROLE_ADMIN") {
        if (sessionStorage.getItem('welcomeAdm') !== "false") {
          // @ts-ignore
          this.toastr.success('Bienvenue sur l\'espace d\'administration ')
          sessionStorage.setItem("welcomeAdm", "false");
        }
      } else {
        this.router.navigate(['']);
        this.toastr.error('You can\'t reach this page');
      }
    });

    this.userService.getAllUser().subscribe(users => {
      this.users = users;

      this.initPasswordForm();
    });
  }

  /*Password update*/

  initPasswordForm() {
    this.updatePassword = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!.:,;^%*?&µù%=&])[A-Za-z\d$@$!.:,;^%*?&µù%=&].{8,}')]],
      verifNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!.:,;^%*?&µù%=&])[A-Za-z\d$@$!.:,;^%*?&µù%=&].{8,}')]],
    });
  }

  onSubmitUpdatePassword() {
    if (this.updatePassword.valid){
      const typedPassword = this.updatePassword.get('newPassword')?.value;
      const typedVerifPassword = this.updatePassword.get('verifNewPassword')?.value;
      if (typedPassword === typedVerifPassword) {
        this.userService.updateAdminUserPassword(this.idToUpdate, typedPassword, typedVerifPassword).subscribe( value => {
          // @ts-ignore
          this.toastr.success(value);
          setTimeout(() => {
            location.reload();
          },1000);
        }, error => {
          // @ts-ignore
          this.toastr.success(error.error);
        });
      } else {
        this.toastr.error("Les mots de passe ne correspondent pas");
      }
    } else {
      this.toastr.error("Formulaire invalide");
    }
  }

  /*End Password Update*/

  /*New password Auto*/

  generateNewPasswordAuto() {
    this.userService.updateAdminUserPasswordAuto(this.idToUpdate).subscribe(value => {
      // @ts-ignore
      this.toastr.success(value);
    }, error => {
      this.toastr.error(error.error);
    });
  }


  /* End new password Auto*/

  /* New Informations update */

  initInformationsForm() {
    // @ts-ignore
    let us = this.users.find(el => el.id === this.idToUpdate);

    this.updateInformations = this.formBuilder.group({
      email: [us.email, [Validators.required, Validators.email]],
      username: [us.userpseudo, Validators.required],
    });
  }

  submitInformationsForm() {
    if (this.updateInformations.valid) {

      const email = this.updateInformations.get('email')?.value;
      const username = this.updateInformations.get('username')?.value;

      if (email && username) {
        this.userService.updateAdminUserInformations(this.idToUpdate,username, email).subscribe(value => {
          // @ts-ignore
          this.toastr.success(value);
          setTimeout(() => {
            location.reload();
          },1000);
        }, error => {
          this.toastr.error(error.error);
        })
      } else {
        this.toastr.error("Merci de saisir le formulaire correctement");
      }
    }else {
      this.toastr.error("Formulaire incomplet");
    }
  }

  /* End informations update */


  delete(val: number) {
    this.userService.deleteUser(val).subscribe(value => {
      // @ts-ignore
      this.toastr.success(value);
      setTimeout(() => {
        location.reload();
      },1000);
    });
  }

  activateAccount(val: number) {
    this.userService.setUserActiveAccount(val,'activate').subscribe(value => {
      // @ts-ignore
      this.toastr.success(value);
      setTimeout(() => {
        location.reload();
      },1000);
    });
  }

  unactiveAccount(val: number) {
    this.userService.setUserActiveAccount(val,'unactivate').subscribe(value => {
      // @ts-ignore
      this.toastr.success(value);
      setTimeout(() => {
        location.reload();
      },1000);
    });
  }

  banAccount(val: number) {
    this.userService.setUserBan(val,'ban').subscribe(value => {
      // @ts-ignore
      this.toastr.success(value);
      setTimeout(() => {
        location.reload();
      },1000);
    });
  }

  unbanAccount(val: number) {
    this.userService.setUserBan(val,'unban').subscribe(value => {
      // @ts-ignore
      this.toastr.success(value);
      setTimeout(() => {
        location.reload();
      },1000);
    });
  }

  logOut() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['']);
  }
  // Modal

  // @ts-ignore
  open(content, parameter: number) {

    this.idToUpdate = parameter;
    this.initInformationsForm();

    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Close with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}

