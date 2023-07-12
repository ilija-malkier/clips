import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {AboutComponent} from "../about/about.component";
import {UploadComponent} from "../upload/upload.component";
import {ManageComponent} from "../manage/manage.component";
import {ClipComponent} from "../clip/clip.component";
import {NotfoundComponent} from "../notfound/notfound.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {resolve} from "@angular/compiler-cli";
import {clipResolver} from "../services/clip-resolver.resolver";

const redirectunauthorizedToHome=()=>redirectUnauthorizedTo('/');

const routes:Routes=[
  {path:'',component: HomeComponent},
  {path:'about',component: AboutComponent},
  {path: 'upload',component: UploadComponent,data:{authOnly:true,authGuardPipe: redirectunauthorizedToHome},canActivate:[AngularFireAuthGuard]},
  {path:'manage',component: ManageComponent,data:{authOnly: true,authGuardPipe: redirectunauthorizedToHome},canActivate:[AngularFireAuthGuard]},
  {path:'clip/:id',component: ClipComponent,resolve:{ clip:clipResolver }},
  {path:'**',component: NotfoundComponent}

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule]
})


export class AppRoutingModule {


}
