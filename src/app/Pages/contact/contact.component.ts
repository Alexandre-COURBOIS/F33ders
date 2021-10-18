import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../../Services/contact.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public submitted: boolean = false;

  contactForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    message: new FormControl()
  })

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      const name = this.contactForm.get('name')?.value;
      const surname = this.contactForm.get('surname')?.value;
      const email = this.contactForm.get('email')?.value;
      const message = this.contactForm.get('message')?.value;
      const createdAt = new Date();

      this.contactService.sendContactMessage(name, surname, email, message, createdAt).subscribe(value => {
        // @ts-ignore
        this.toastr.success(value);

        this.router.navigate(['']);
      }, error => {
        console.log(error)
      });
    } else {
      this.submitted = false;
      this.toastr.error("Merci de renseigner le formulaire de contact")
    }
  }

  get f() {
    return this.contactForm.controls;
  }

}
