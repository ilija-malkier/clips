import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IClip} from "../model/iclip";
import {FbTimestampPipe} from "../pipes/fb-timestamp.pipe";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation:ViewEncapsulation.None,
  providers:[DatePipe]
})
export class ClipComponent implements OnInit{

  //drugi param za viewchild je options ,kazemo da je static kako bi ga pozvali u ngoninit,da nismo to stavili ne bi mogli da ga pozovemo tu
  @ViewChild("videoPlayer",{static:true})  target?:ElementRef
  // @ts-ignore
  clip?:IClip
  constructor(public route:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.data.subscribe(snapshot=>{
      this.clip=snapshot as IClip
    })

  }



}
