import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {delay, filter, map, Observable, of, switchMap, tap} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ModalService} from "../app/services/modal.service";

export  interface IUser{
  uid:string,
  name:string,
  email:string,
  age:string,
  phoneNumber:string,
  displayName:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirect=false;
  private userCollection:AngularFirestoreCollection<IUser>
  //naming convention ako ima $ onda je observable
  public isAuthenticated$:Observable<boolean>
  public isAthenticatedWithDelay$:Observable<boolean>
  public shouldShowModal:boolean=false;
  constructor(private router:Router,private activeRoute:ActivatedRoute, private auth:AngularFireAuth,private firestore:AngularFirestore,public modalService:ModalService) {
    this.userCollection=firestore.collection("users");
    //ako se emit user on je login
    //kada kreiramo account on autmatkski radi i login
    // auth.user.subscribe()
    this.isAuthenticated$=auth.user.pipe(
      map(user=>{
        return !!user;
      } )
    )
    this.isAthenticatedWithDelay$=this.isAuthenticated$.pipe(
      delay(1000),
    )
    this.isAthenticatedWithDelay$.subscribe(next=>{
      if(next){
    //svaki put kada refresh ovo ce da se napravi i kako je next true on ce da omoguci toggleModal
        modalService.closeModal('auth');
      }
    })
    this.router.events
      .pipe(
        filter(e=> e instanceof  NavigationEnd),
        map(e=> this.activeRoute.firstChild),
        //?? ako je ovo null onda vrati ovo
        //of vraca novu observable
        switchMap(route=>route?.data ?? of({}))
      )
      .subscribe(data=>{
        // @ts-ignore
        this.redirect=data.authOnly ?? false
      });
  }

  public async registerUser(email:string,password:string){
    return await this.auth.createUserWithEmailAndPassword(email,password);
  }

  public  loginUser(email:string,password:string){
    return  this.auth.signInWithEmailAndPassword(email,password);


  }
  public  async  createUser(user:IUser){

    //insert into db but you dont have controll over id
    // await this.userCollection.add(user);
    //Ovo je bolje jer imamo vise kontrole
    await  this.userCollection.doc(user.uid).set(user);


  }

  async logout() {


     await this.auth.signOut();
    if(this.redirect){
      this.router.navigateByUrl("/")

    }
  }
}
