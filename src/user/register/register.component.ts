import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, IUser} from "../auth.service";
import {RegisterValidators} from "../../app/validators/register-validators";
import {EmailTaken} from "../../app/validators/email-taken";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //ako stavimo ovako u njega sve komponente onda ce on da prepozna to kao AbstractControl,pa bolje je da napravimo posebne instance pa da ih ubacimo jer ce ih gledati onda FormControl

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('',
    [Validators.email, Validators.required],[this.emailTakenValidator.validate]
  );
  age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)])

  password = new FormControl('', [Validators.minLength(6), Validators.required, Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9]).+$")])

  configrm_password = new FormControl('', [Validators.minLength(4), Validators.required])

  phoneNumber = new FormControl('', [Validators.required])
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.configrm_password,
    phoneNumber: this.phoneNumber

  },[RegisterValidators.match('password','confirm_password')]);

    showAlert = false;
    alertMessage = 'Please wait! Your account is being created.';
    alertColor = 'blue';

  public isLoading:boolean=false;
  constructor(public authService: AuthService,private emailTakenValidator:EmailTaken) {
  }

  async register() {

    this.showAlert = true;
    this.alertMessage = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';

    try {
      let userCredential = await this.authService.registerUser(this.email.value as string,this.password.value as string);
      let user:IUser =this.registerForm.value as IUser;
      user.uid=<string>userCredential.user?.uid;
      user.displayName=this.name.value!;
      await this.authService.createUser(user);
      //moramo da update user-a u atuhentication da ima display name,nije isto ,imamo 2 jedan u firestore i jedan u authentication,a mi gledamo ovaj iz authentication kada izvlacimo user-a da li je logionvan
      userCredential.user?.updateProfile({
        displayName: user.displayName
      })

    } catch (e) {

      this.alertMessage = "An unexprected error occurred.Please try again alter";
      this.showAlert = true;
      this.alertColor = 'red';

      return;
    }
    finally {
      this.isLoading=false;

    }
    this.alertMessage = "Success! Your account has been created.";
    this.showAlert = true;
    this.alertColor = 'green';


  }

}
