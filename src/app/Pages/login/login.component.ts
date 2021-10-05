import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../Models/user";
import {LoginService} from "../../Services/login.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm !: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initAuthForm();
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

        this.loginService.login(email,password).subscribe(value => {
          console.log(value);
          this.submitted = false;
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

}
