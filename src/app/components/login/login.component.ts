import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserDetails } from 'src/app/models/UserDetails';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _username: string = "";
  _password: string = "";

  spinner: boolean;
  errorMsg: string;
  successfulRegistration: string;

  constructor(private loginService: LoginService) {
    this.spinner = false;
    this.successfulRegistration = this.loginService.successfulRegistration;
  }


  public set username(v: string) {
    this._username = v;
    this.errorMsg = undefined
  }

  public set password(v: string) {
    this.errorMsg = undefined;
    this._password = v;
  }

  public get username(): string {
    return this._username
  }

  public get password(): string {
    return this._password
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }

  loginAction() {
    if (this.emailFormControl.hasError('required') || this.emailFormControl.hasError('email') || this.passwordFormControl.hasError('required') || this.passwordFormControl.hasError('minlength'))
      return;

    this.spinner = true;
    this.loginService.validateCredentials(this.username, this.password).subscribe(
      (response: UserDetails) => {
        console.log(response);
        this.spinner = false;
      },
      (error) => {
        console.log(error);
        this.spinner = false;
        this.errorMsg = "Wrong email or password";
      }
    )
  }
}
