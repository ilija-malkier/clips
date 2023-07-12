import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClipService} from "../services/clip.service";
import {IClip} from "../model/iclip";
import {ModalService} from "../services/modal.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit,OnDestroy{
  videoOrder='1';
  clips:IClip[]=[];
  activeClip: IClip | null=null;
  sort$:BehaviorSubject<string>
  constructor(
    private modal:ModalService,
    private clipService:ClipService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
  this.sort$=new BehaviorSubject<string>(this.videoOrder);
  }

  sort($event: Event) {
    const{value}=($event.target as HTMLSelectElement)
    this.router.navigate([],{
      relativeTo:this.activatedRoute,
      queryParams:{
        sort:value
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((data)=>{
      let  extractedSortData= data.get('sort');
      this.videoOrder= extractedSortData==='2'? extractedSortData:'1';
      this.sort$.next(this.videoOrder);
    });
    this.clipService.getUserClips(this.sort$).subscribe(docs=>{
      this.clips=[];
      docs.forEach(doc=>{
        this.clips.push({
          docID:doc.id,
          ...doc.data()

        })
      })
    })
  }

  openModal($event: Event, clip: IClip) {
      $event.preventDefault();
      this.activeClip=clip;
      this.modal.toggleModal("editClip");

  }

  updateClip($event: IClip) {
    this.clips.forEach((element,index)=>{
      if(element.docID==$event.docID){
        this.clips[index]=$event;
      }
    });
  }

  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault();
    this.clipService.deleteClip(clip);

    this.clips.forEach((element,index)=>{
      if(element.docID==clip.docID){
        this.clips.splice(index,1);
      }
    });
  }

  ngOnDestroy(): void {
  }


}
