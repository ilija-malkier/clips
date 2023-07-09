import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {AboutComponent} from "../about/about.component";
import {UploadComponent} from "../upload/upload.component";
import {ManageComponent} from "../manage/manage.component";


const routes:Routes=[
  {path:'',component: HomeComponent},
  {path:'about',component: AboutComponent},
  {path:'manage',component: ManageComponent},
  {path: 'upload',component: UploadComponent,data:{authOnly:true}}

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
