import {Component, OnInit} from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ModalService} from "../../app/services/modal.service";
import {log} from "util";

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
  public  isLoading=false;
  public errorMessage:string="";
  public showErrorMessage:boolean=false;

  constructor(public authService:AuthService,private modalService:ModalService) {
  }
  ngOnInit(): void {
  }


 async login(loginForm: NgForm) {
    this.isLoading=true;
    this.showErrorMessage=false;
    this.errorMessage="";

    try {
     await this.authService.loginUser(this.credentials.email, this.credentials.password);
      loginForm.resetForm();
    }
    catch (e){
      this.showErrorMessage=true;
      this.errorMessage="User does not exist,please register first";

    }
    finally {
      this.isLoading=false;

    }

  }


}
