import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {window} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user !: any | undefined;
  submitted = false;

  username !: string;
  updateInformations !: FormGroup;

  updatePassword !: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.userService.getUserProfil().subscribe(value => {
      this.user = value;
    });

    this.updateInformationsForm();
    this.updatePasswordForm();
  }

  /* Update informations */

  updateInformationsForm() {
    this.updateInformations = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  submitInformationsForm() {
    this.submitted = true;

    if (this.updateInformations.valid) {
      const username = this.updateInformations.get('username')?.value;

      this.userService.updateUserInformations(username).subscribe(value => {
        this.submitted = false;

        this.user = value;

        this.toastr.success("Votre nom d'utilisateur a bien été mis à jour.")

        setTimeout(() => {
          location.reload();
        },1000);

      }, error => {
        this.submitted = false;
        this.toastr.error(error.error);
      });
    } else {
      this.toastr.error("Veuillez renseigner le formulaire.");
      this.submitted = false;
    }

  }

  get fInformations() {
    return this.updateInformations.controls;
  }

/* Update password */

  updatePasswordForm() {
    this.updatePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      newPasswordVerif: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  submitPasswordForm() {
    this.submitted = true;

    if (this.updatePassword.valid) {

      const oldTypedPassword = this.updatePassword.get('oldPassword')?.value;
      const newTypedPassword = this.updatePassword.get('newPassword')?.value;
      const newTypedPasswordVerif = this.updatePassword.get('newPasswordVerif')?.value;

      if (newTypedPassword === newTypedPasswordVerif) {

        this.userService.updateUserPasswordInformation(oldTypedPassword, newTypedPassword, newTypedPasswordVerif).subscribe(
          (value) => {

            this.submitted = false;
            // @ts-ignore
            this.toastr.success(value);
          },
          (error => {
            this.submitted = false;
            this.toastr.error(error);
          })
        );
      } else {
        this.submitted = false;
        this.toastr.error('Les nouveaux mot de passe ne correspondent pas');
      }
    } else {
      this.submitted = false;
      this.toastr.error('Merci de renseigner correctement le formulaire');
    }
  }

  get fPassword() {
    return this.updatePassword.controls;
  }

}
