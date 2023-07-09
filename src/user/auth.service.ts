import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {delay, map, Observable} from "rxjs";

export  interface IUser{
  uid:string,
  name:string,
  email:string,
  age:string,
  phoneNumber:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection:AngularFirestoreCollection<IUser>
  //naming convention ako ima $ onda je observable
  public isAuthenticated$:Observable<boolean>
  public isAthenticatedWithDelat$:Observable<boolean>
  constructor(private auth:AngularFireAuth,private firestore:AngularFirestore) {

    this.userCollection=firestore.collection("users");
    //ako se emit user on je login
    //kada kreiramo account on autmatkski radi i login
    // auth.user.subscribe()
    this.isAuthenticated$=auth.user.pipe(
      map(user=> !!user)
    )
    this.isAthenticatedWithDelat$=this.isAuthenticated$.pipe(
      delay(1000)
    )
  }

  public async registerUser(email:string,password:string){
    return await this.auth.createUserWithEmailAndPassword(email,password);
  }

  public async loginUser(email:string,password:string){
    let userCredential = await this.auth.signInWithEmailAndPassword(email,password);


  }
  public  async  createUser(user:IUser){

    //insert into db but you dont have controll over id
    // await this.userCollection.add(user);
    //Ovo je bolje jer imamo vise kontrole
    await  this.userCollection.doc(user.uid).set(user);

  }

  async logout() {
     await this.auth.signOut();
  }
}
