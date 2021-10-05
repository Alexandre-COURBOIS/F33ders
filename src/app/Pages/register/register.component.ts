import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";
import {RegisterService} from "../../Services/register.service";
import {User} from "../../Models/user";
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public submitted: boolean = false;

  registerForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })


  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    })

  }

  onSubmit() {
    this.submitted = true;

    if (!this.registerForm.invalid) {

      const result: User = this.registerForm.value
      console.log(result, 'eeeeeeee')
      this.registerService.createUser(result)
      console.log(result, 'rrrrrrr')
      this.router.navigate(['login'])

    } else {
      console.log(this.registerForm.value)
    }

  }

  // get username() {
  //   return this.registerForm.get('username');
  // }
  //
  // get email() {
  //   return this.registerForm.get('email')?.value;
  // }
  //
  // get password() {
  //   return this.registerForm.get('password')?.value;
  // }

  get f() {
    return this.registerForm.controls;
  }

}
