import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fName: string;
  lName: string;
  email: string;
  password: string;
  gender: string;
  birthDate: Date;
  constructor() { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  fNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  lNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  birthDateFormControl = new FormControl('', [
    Validators.required,
  ]);

  genderFormControl = new FormControl('', [
    Validators.required,
  ]);


  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }

  registerAction() {
    console.log(this.fName);
    console.log(this.lName);
    console.log(this.email);
    console.log(this.password);
    console.log(this.gender);
    console.log(this.birthDate);
  }

}
