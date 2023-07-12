import {ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {IClip} from "../model/iclip";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUser} from "../../user/auth.service";

@Injectable({
  providedIn:"root"
})
export class clipResolver implements Resolve<IClip>{

  constructor(private firestore:AngularFirestore,private router:Router) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

    return   this.firestore.collection<IClip>("clips").doc(route.params['id']).get()
      .pipe(
        map(snapshot=>{
            const clip=snapshot.data();

          if(!clip){
              this.router.navigate(['/'])

            }
            return clip as IClip
          }
        )
      )

  }

}
