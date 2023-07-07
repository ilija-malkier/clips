import {Component, OnInit} from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credentials={
    email:'',
    password:''
  }
  ngOnInit(): void {
  }


  login() {
    console.log(this.credentials);
  }

  test(loginForm: NgForm) {
    console.log(loginForm.invalid);
  }
}
