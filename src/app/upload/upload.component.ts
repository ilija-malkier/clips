import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import { v4 as uuidv4 } from 'uuid';
import {combineLatest, combineLatestWith, forkJoin, last, switchMap} from "rxjs";
import firebase from "firebase/compat/app";
import {AuthService} from "../../user/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ClipService} from "../services/clip.service";
import {Router} from "@angular/router";
import {FfmpegService} from "../services/ffmpeg.service";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements  OnDestroy{

  isDragover=false;
  file:File | null=null;
  nextStep=false;
  showAlert=false;
  alertColor='blue';
  alertMessage='Please wait!Your clip is beegin uploaded'
  inSubmission=false;
  title=new FormControl('',[Validators.required,Validators.minLength(3)]);
  uploadForm=new FormGroup((
    {
      title: this.title
    }
  ))
  percentage=0;
  showPercentage=false;
  user:firebase.User | null =null;
  task:AngularFireUploadTask | null=null;
  screenshots:string[] =[]
  selectedScreenshots='';
  screenshotTask:AngularFireUploadTask|null=null;
  async storeFile(event: Event) {
    if(this.ffmpegService.isRunning){
      return;
    }
    this.isDragover=false;
    this.file=
      (event as DragEvent).dataTransfer?
      (event as DragEvent).dataTransfer?.files.item(0) ??  null
        :
        (event.target as HTMLInputElement).files?.item(0)??null
    if(!this.file || this.file.type!=='video/mp4'){
      return
    }
  this.screenshots= await this.ffmpegService.getScreenshots(this.file);
   this.selectedScreenshots=this.screenshots[0];
    this.nextStep=true;
    this.title.setValue(this.file.name);

  }

  constructor(public ffmpegService:FfmpegService,private router:Router,private clipService:ClipService,private firestore:AngularFireStorage,private auth:AngularFireAuth) {

    this.auth.user.subscribe(user=>{
      this.user=user;
    })
    this.ffmpegService.init();
  }

  async uploadFile(){

    this.uploadForm.disable();
    this.showAlert=true;
    this.alertColor='blue';
    this.alertMessage='Please wait!Your clip is being uploaded';
    this.inSubmission=true;
    this.showPercentage=true;


    //firebase ne nudi resernje ako ubacimo 2 fajla istog imenadrugi koji se ubaci ce da overide prvi
    const clipFileName=uuidv4();
    const clipPath=`clips/${clipFileName}.mp4`;
    const screenshotBlob=await this.ffmpegService.blobFromURL(this.selectedScreenshots);
    const clipRef=this.firestore.ref(clipPath)

    const screenshotPath=`screenshots/${clipFileName}.png`;

    this.task = this.firestore.upload(clipPath,this.file);

    this.screenshotTask=  this.firestore.upload(screenshotPath,screenshotBlob);
    //razlika je u tipu informacija koje salju metode kao observable
    const screenshotRef=this.firestore.ref(screenshotPath);
    combineLatest([
      this.task.percentageChanges(),
      this.screenshotTask.percentageChanges()
    ])
      .subscribe((progress)=>{
      const [clipProgress,screensotProgress]=progress
      if(!clipProgress || !screensotProgress){
        return
      }
      const total=clipProgress+screensotProgress
      this.percentage=(total as number)/200;
    });
    forkJoin([
      this.task.snapshotChanges(),
      this.screenshotTask.snapshotChanges()
    ]).pipe(

      switchMap(()=>forkJoin([clipRef.getDownloadURL(),screenshotRef.getDownloadURL()]))
    ).subscribe({
      next: async (url)=>{
        const[clipUrl,screenshotURL]=url;
        const clip={
          uid:this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value as string,
          fileName: `${clipFileName}.mp4`,
          //moramo da kreiramo referencu
          url:clipUrl,
          screenshotURL:screenshotURL,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          screenshotFileName:`${clipFileName}.png`
        }
        this.alertColor='green';
        this.alertMessage='Success!';
        this.showPercentage=false;
        const clipDocumentRef= await  this.clipService.createClip(clip);
        setTimeout(()=>{
          this.router.navigate([
            'clip',clipDocumentRef.id
          ])
        },1000);

     },
      error: (error)=>{
        this.uploadForm.enable();
        this.alertColor='red';
        this.alertMessage='Upload failed!';
        this.inSubmission=true;
        this.showPercentage=false;
      },
      complete:()=>{}

    })

  }


  ngOnDestroy(): void {
    this.task?.cancel();
  }

  selectScreenshoot(screenshot: string) {
    this.selectedScreenshots=screenshot;
  }
}
