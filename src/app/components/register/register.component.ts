import { Component, OnInit } from '@angular/core';

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
