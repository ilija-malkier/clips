import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, IUser} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //ako stavimo ovako u njega sve komponente onda ce on da prepozna to kao AbstractControl,pa bolje je da napravimo posebne instance pa da ih ubacimo jer ce ih gledati onda FormControl

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('',
    [Validators.email, Validators.required]
  );
  age = new FormControl('', [Validators.required,Validators.min(18),Validators.max(120)])

  password = new FormControl('', [Validators.minLength(6), Validators.required,Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9]).+$")])

  configrm_password = new FormControl('', [Validators.minLength(4), Validators.required])

  phoneNumber = new FormControl('', [Validators.required])
  registerForm = new FormGroup({
    name:this.name,
    email:this.email,
    age:this.age,
    password:this.password,
    confirm_password:this.configrm_password,
    phoneNumber:this.phoneNumber

  });

  showAlert=false;
  alertMessage='Please wait! Your account is being created.';
  alertColor='blue';


  constructor(private authService:AuthService) {
  }
  async register(){
    console.log(this.registerForm);
    this.showAlert=true;
    this.alertMessage='Please wait! Your account is being created.';
    this.alertColor='blue';

    try{
   //   await this.authService.registerUser(this.email.value as string,this.password.value as string);
     // await this.authService.createUser(this.registerForm.value as IUser);
    }catch (e){

      this.alertMessage="An unexprected error occurred.Please try again alter";
      this.showAlert=true;
      this.alertColor='red';
      console.log(e);
      return;
    }
    this.alertMessage="Success! Your account has been created.";
    this.showAlert=true;
    this.alertColor='green';



  }

}
