import {Component, OnInit} from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
//ako hocemo da uzmemo jwt jer firebase cuva info o useru-u,u tom objektu imamo stsTokenManager i tu su ti kljucevi
  credentials={
    email:'',
    password:''
  }
  constructor(private authService:AuthService) {
  }
  ngOnInit(): void {
  }


  login() {
    this.authService.loginUser(this.credentials.email,this.credentials.password);
  }

  test(loginForm: NgForm) {
    console.log(loginForm.invalid);
  }
}
