import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {IClip} from "../model/iclip";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClipService} from "../services/clip.service";

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements  OnInit,OnDestroy,OnChanges{

  @Input() activeClip:IClip |null=null;
  clipID=new FormControl('')
  title=new FormControl('',[Validators.required,Validators.minLength(3)]);
  editForm=new FormGroup((
    {
      title: this.title,
      id: this.clipID
    }
  ))
  showAlert=false;
  alertColor='blue';
  alertMessage='Please wait!Updating your clip'
  percentage=0;
  showPercentage=false;
  inSubmission=false;
  @Output() updateEmitter:EventEmitter<IClip>=new EventEmitter();

  constructor(
    private clipService:ClipService,
    private modal:ModalService) {
  }

  ngOnInit(): void {
    this.modal.register("editClip");
  }

  ngOnDestroy(): void {
    this.modal.unregister("editClip");

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.activeClip){
      return;
    }
    this.inSubmission=false;
    this.showAlert=false;
    this.clipID.setValue(this.activeClip.docID!);
    this.title.setValue(this.activeClip.title);
  }

  async  submit() {
    if(!this.activeClip){
      return;
    }
    this.inSubmission=true;
    this.showAlert=true;
    this.alertColor='blue';
    this.alertMessage='Please wait!Updating your clip';
    try{
    await  this.clipService.updateClip(this.clipID.value!,this.title.value!);
      }
      catch (e){
      this.inSubmission=false;
      this.alertColor='red';
      this.alertMessage='Something went wrong.Try again alter';
      return
      }
      this.activeClip.title=this.title.value!;
    this.updateEmitter.emit(this.activeClip!);

    this.inSubmission=false;
    this.alertColor='green';
    this.alertMessage="Success!";
  }
}
