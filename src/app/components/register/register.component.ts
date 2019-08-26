import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from 'src/app/services/login.service';
import { IUserDetails } from 'src/app/models/IUserDetails';
import { Router } from '@angular/router';


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

  constructor(private loginService: LoginService, private router: Router) { }

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
    if (this.emailFormControl.hasError('required') || this.emailFormControl.hasError('email') || this.passwordFormControl.hasError('required') || this.passwordFormControl.hasError('minlength')
      || this.fNameFormControl.hasError('required') || this.lNameFormControl.hasError('required') || this.birthDateFormControl.hasError('required') || this.genderFormControl.hasError('required'))
      return;

    this.loginService.register(new IUserDetails(0, this.fName, this.lName, this.email, this.password, this.birthDate, this.gender)).subscribe(
      (response: IUserDetails) => {
        console.log(response);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
