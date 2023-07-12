import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ClipService} from "../services/clip.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css'],
  providers: [DatePipe]
})
export class ClipListComponent implements  OnInit,OnDestroy{

 @Input() scrollable=true;
  constructor(public clipService:ClipService) {
    this.clipService.getClips()
  }
  ngOnInit(): void {
    if(this.scrollable) {
      //imamo pristup window objektu
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  private handleScroll=() => {

//imamo pristup ovome direktno
    const {scrollTop,offsetHeight}= document.documentElement
    const {innerHeight} = window;
    const bottomOfWindow=Math.round(scrollTop)+innerHeight==offsetHeight;
    if(bottomOfWindow){
      //bottom of window request more data
      this.clipService.getClips();
    }
  }

  ngOnDestroy(): void {
    if(this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    this.clipService.pageClips=[];
  }
}
