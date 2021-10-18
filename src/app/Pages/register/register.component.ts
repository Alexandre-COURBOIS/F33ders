import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";
import {RegisterService} from "../../Services/register.service";
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {RecaptchaService} from "../../Services/recaptcha.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public submitted: boolean = false;
  recaptchaVerif: Object = false;

  registerForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })


  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService,
    private recaptchaService: RecaptchaService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!.:,;^%*?&µù%=&])[A-Za-z\d$@$!.:,;^%*?&µù%=&].{8,}')]],
    })

  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {

      const username = this.registerForm.get('username')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      this.registerService.createUser(username, email, password).subscribe(registerRequest => {

        // @ts-ignore
        this.toastr.success(registerRequest);

        this.router.navigate(['login']);

      }, error => {
        console.log(error);

      });


    } else {
      this.submitted = false;
      this.toastr.error("Merci de renseigner le formulaire d'inscription");
    }

  }

  resolved(captchaResponse: string) {
    this.recaptchaService.testToken(captchaResponse).subscribe(value => {
      this.recaptchaVerif = value;
    })
  }
  
  get f() {
    return this.registerForm.controls;
  }

}
