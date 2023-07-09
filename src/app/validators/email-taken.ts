import {AuthService} from "../../user/auth.service";
import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
//ako nema Injectable ne moze da inject AuthService niti EmailTaken da se inject negde
//Ako hocemo da koristimo custom Validator moramo da impl ovu klasu
@Injectable(
  {
    providedIn: 'root'
  }
)
export class EmailTaken implements  AsyncValidator{

  constructor(private auth:AngularFireAuth) {
  }

  //Mora da bude arrow funkcije,jer to primaju validacije
 public validate =(control: AbstractControl): Promise<ValidationErrors | null> =>{

   return  this.auth.fetchSignInMethodsForEmail(control.value).then(
      response => response.length? {emailTaken: true} : null
    );
  }

}
