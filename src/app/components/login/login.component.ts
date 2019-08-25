import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


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

  username: string = "";
  password: string = "";

  spinner: boolean;
  errorMsg: string;

  constructor(private loginService: LoginService) {
    this.spinner = false;
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
      (response: IUserDetails) => {
        console.log(response.Email);
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
