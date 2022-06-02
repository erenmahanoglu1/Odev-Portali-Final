import { OdevlerimComponent } from './components/odevlerim/odevlerim.component';

import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { DersComponent } from './components/ders/ders.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [

  {
    path:'ogrenci',
    component:OgrenciComponent
  },
  {
    path:'ders',
    component:DersComponent
  },
  {
    path:'derslistele/:ogrId',
    component:DerslisteleComponent
  },
  {
    path:'odevlerim',
    component:OdevlerimComponent
  },
  
  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
