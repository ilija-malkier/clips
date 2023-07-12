import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {UserModule} from "../user/user.module";
import {environment} from "../environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UploadComponent } from './upload/upload.component';
import { ManageComponent } from './manage/manage.component';
import { VideoComponent } from './video/video.component';
import { ClipComponent } from './clip/clip.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {EventBLockerDirective} from "./shared/event-blocker.directive";
import {SharedModule} from "./shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { EditVideoComponent } from './edit-video/edit-video.component';
import { SafeURLPipe } from './pipes/safe-url.pipe';
import { ClipListComponent } from './clip-list/clip-list.component';
import { FbTimestampPipe } from './pipes/fb-timestamp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    UploadComponent,
    ManageComponent,
    VideoComponent,
    ClipComponent,
    NotfoundComponent,
    EditVideoComponent,
    SafeURLPipe,
    ClipListComponent,
    FbTimestampPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
