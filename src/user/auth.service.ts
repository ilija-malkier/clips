import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

export  interface IUser{
  name:string,
  email:string,
  age:string,
  phoneNumber:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularAuthFire:AngularFireAuth,private angularFirestore:AngularFirestore) { }

  public async registerUser(email:string,password:string){
    this.angularAuthFire.createUserWithEmailAndPassword(email,password);

  }
  public  async  createUser(user:IUser){
  }
}
