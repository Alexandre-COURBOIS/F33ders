import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {LoginService} from "../../Services/login.service";
import {ToastrService} from "ngx-toastr";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {EncryptService} from "../../Services/encrypt.service";
import {UserService} from "../../Services/user.service";
import {ResetPasswordService} from "../../Services/reset-password.service";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // AuthentificationForm
  authForm !: FormGroup;
  submitted: boolean = false;

  // ResetPasswordForm
  closeResult = "";
  submittedReset: boolean = false;
  resetPasswordForm = new FormGroup({email: new FormControl()});


  constructor(
    private formBuilder: FormBuilder, private loginService: LoginService,
    private toastr: ToastrService, private jwtHelper: JwtHelperService,
    private router: Router, private encryptService: EncryptService,
    private userService: UserService, private resetPasswordService: ResetPasswordService,
    private modal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.initAuthForm();
    this.initResetPasswordForm();
  }

  /*Formulaire de connexion*/
  initAuthForm() {

    /*Vérification des champs du formulaire de connexion*/

    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!.:,;^%*?&µù%=&])[A-Za-z\d$@$!.:,;^%*?&µù%=&].{8,}')]]
    });
  }


  submitAuthForm() {

    this.submitted = true;

    if (this.authForm.valid) {

      const email = this.authForm.get('email')?.value;
      const password = this.authForm.get('password')?.value;

      if (email && password) {
        this.loginService.login(email, password).subscribe(value => {

          this.submitted = false;

          sessionStorage.setItem("_token", value['token']);
          sessionStorage.setItem("_refresh_token", value['refresh_token']);
          sessionStorage.setItem("_logged", this.encryptService.encode("true"));

          this.userService.getUser().subscribe(user => {

            const decodJwt = this.jwtHelper.decodeToken(value['token']);

            console.log(decodJwt.roles.length);

            if (!user.isActive) {
              this.toastr.error("Merci d'activer votre compte via l'email qui vous a été envoyé lors de votre inscription");
              sessionStorage.clear();
            }else if(user.isBanned) {
              this.toastr.error("Votre compte a été suspendu suite à une violation de notre politique d'utilisation. Contactez-nous pour plus d'informations");
              sessionStorage.clear();
            } else if (decodJwt.roles.length === 1) {
              this.toastr.success("Bienvenue " + user.userpseudo);
              this.router.navigate(['']);
            }else if (decodJwt.roles.length > 1) {
              this.router.navigate(['auth/admin']);
            }
          }, error => {
            this.toastr.error('Email ou mot de passe incorrect');
            this.submitted = false;
          })
        }, error => {
          this.toastr.error('Email ou mot de passe incorrect');
          this.submitted = false;
        });

      } else {
        this.toastr.error('Tiens ? Les informations renseignées ne sont pas correct !', 'Oups une erreur ?');
        this.submitted = false;
      }
    } else {
      this.toastr.error('Tiens ? Les informations renseignées ne sont pas correct !', 'Oups une erreur ?');
      this.submitted = false;
    }


  }

  get f() {
    return this.authForm.controls;
  }

  /*Fin du traitement du formulaire de connexion*/

  // ResetPassword

  initResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  submitResetPassWordForm() {
    this.submittedReset = true;
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;

      if (email) {
        this.resetPasswordService.sendMailForgotPassword(email).subscribe(value => {
          // @ts-ignore
          this.toastr.success(value, 'Vérifiez vos emails !');
        }, error => {
          this.toastr.error(error.error, "Il semblerait qu'il y ait un problème !")
        });
      }
    }
  }

  // Modal

  // @ts-ignore
  open(content) {
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

  get fp() {
    return this.resetPasswordForm.controls;
  }

}
