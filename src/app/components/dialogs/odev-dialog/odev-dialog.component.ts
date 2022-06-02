import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ders } from 'src/app/models/Ders';
import { Odev } from 'src/app/models/Odev';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-odev-dialog',
  templateUrl: './odev-dialog.component.html',
  styleUrls: ['./odev-dialog.component.css']
})
export class OdevDialogComponent implements OnInit {
  dialogBaslik: string;
  odevler:Odev[];
  islem: string;
  frm:FormGroup;
  yeniKayit: Odev;

  constructor(
    public apiServis:ApiService,
    public matDialog: MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<OdevDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem== "ekle"){
      this.dialogBaslik="Odev Ekle";
      this.yeniKayit = new Odev();
  }
  if(this.islem=="duzenle"){
    this.dialogBaslik="Ödev Düzenle";
    this.yeniKayit = data.kayit;
  
 }
 this.frm=this.FormOlustur();
}

  ngOnInit() {
    this.OdevListele();
    
  }

  FormOlustur(){
    return this.frmBuild.group({
      odevAdi:[this.yeniKayit.odevAdi],
      odevDersId:[this.yeniKayit.odevDersId],
      odevId:[this.yeniKayit.odevId],

    });
  }

  OdevListele(){
    this.apiServis.OdevListe().subscribe((d: Odev[])=>{
      this.odevler = d;
    });
  }

}
