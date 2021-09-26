import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterService} from "../../Services/register.service";
import {User} from "../../Models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.:,;^%*?&µù%=&])[A-Za-z\d@$!.:,;^%*?&µù%=&]{8,}$/")]]
  })

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const result: User = this.registerForm.value;
    this.registerService.registration(result);
  }

}
