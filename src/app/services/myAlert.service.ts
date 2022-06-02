import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';
import { AlerttDialogComponent } from '../components/dialogs/alertt-dialog/alertt-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
apiUrl="http://localhost:11183/api/";
alertDialogRef: MatDialogRef<AlerttDialogComponent>;
constructor(
  public matDialog:MatDialog
) { }
AlertUygula(s: Sonuc){
  var baslik="";
  if (s.islem){
    baslik = "İşlem Tamam";
  } else {
    baslik = "Hata";
  }

  this.alertDialogRef=this.matDialog.open(AlerttDialogComponent,{
    width:'300px'
  });
  this.alertDialogRef.componentInstance.dialogBaslik=baslik;
  this.alertDialogRef.componentInstance.dialogMesaj=s.mesaj;
  this.alertDialogRef.componentInstance.dialogIslem=s.islem;

  this.alertDialogRef.afterClosed().subscribe(d=>{
    this.alertDialogRef = null;
  });

}
}
