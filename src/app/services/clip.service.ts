import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot
} from "@angular/fire/compat/firestore";
import {IClip} from "../model/iclip";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject, combineLatest, map, of, switchMap} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection:AngularFirestoreCollection<IClip>;
  public pageClips:IClip[]=[];
  private pendingReq=false;
  constructor(private storage:AngularFireStorage,private db:AngularFirestore,private auth:AngularFireAuth) {
    this.clipsCollection=db.collection('clips');
  }

   createClip(data:IClip):Promise<DocumentReference<IClip>>{
     return  this.db.collection<IClip>('clips').add(data);
  }

  getUserClips(sort$: BehaviorSubject<string>){
    return combineLatest([this.auth.user,sort$])
     .pipe(

      switchMap(values=> {
        const[user,sort]=values;
        if(!user){
         return of([])
        }
        const query=this.clipsCollection.ref.where(
          'uid','==',user.uid
        ).orderBy('timeStamp',sort==='1'?'desc':'asc');

        return query.get()
      }),
      map((snapshot)=>
        (snapshot as QuerySnapshot<IClip>).docs
      )

    )

  }


  updateClip(id:string,title:string){
   return  this.clipsCollection.doc(id).update({
      title
    })
  }

 async deleteClip(clip: IClip) {
    const clipRef=this.storage.ref(`clips/${clip.fileName}`);
    const screenshotRef=this.storage.ref(`screenshots/${clip.screenshotFileName}`);

    await clipRef.delete();
    await screenshotRef.delete();
    await this.clipsCollection.doc(clip.docID).delete();

  }

   async getClips(){
    if(this.pendingReq){return;}
    this.pendingReq=true;
    let query=this.clipsCollection.ref.orderBy('timeStamp','desc').limit(6);
    const{length}=this.pageClips;
    if(length){
      const lastDocumentId=this.pageClips[length-1].docID
      const lastDoc=await  this.clipsCollection.doc(lastDocumentId).get().toPromise()
      query=query.startAfter(lastDoc)

    }

    const snapshot=await  query.get()
     snapshot.forEach(doc=>{
       this.pageClips.push({
         docID:doc.id,
         ...doc.data()
       })
     })
     this.pendingReq=false;

   }
}
