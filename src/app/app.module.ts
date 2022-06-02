import { OgrenciOdevEkleDialogComponent } from './components/dialogs/ogrenci-odev-ekle-dialog/ogrenci-odev-ekle-dialog.component';
import { OdevlerimComponent } from './components/odevlerim/odevlerim.component';

import { OdevDialogComponent } from './components/dialogs/odev-dialog/odev-dialog.component';

import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { FotoyukleDialogComponent } from './components/dialogs/fotoyukle-dialog/fotoyukle-dialog.component';

import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { ConfirmmDialogComponent } from './components/dialogs/confirmm-dialog/confirmm-dialog.component';
import { AlerttDialogComponent } from './components/dialogs/alertt-dialog/alertt-dialog.component';

import { DersComponent } from './components/ders/ders.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';

import { MyAlertService } from './services/myAlert.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    OgrenciComponent,
    DersComponent,
    DerslisteleComponent,
    OdevlerimComponent,

 

    
    
    

    //Dialoglar
    AlerttDialogComponent,
    ConfirmmDialogComponent,
    OgrenciDialogComponent,
    FotoyukleDialogComponent,
    DersDialogComponent,
    OdevDialogComponent,
    OgrenciOdevEkleDialogComponent
    
  



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    AlerttDialogComponent,
    ConfirmmDialogComponent,
    OgrenciDialogComponent,
    FotoyukleDialogComponent,
    DersDialogComponent,
    OdevDialogComponent,
    OgrenciOdevEkleDialogComponent,

  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
