import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Odev } from 'src/app/models/Odev';
import { ApiService } from 'src/app/services/api.service';
import { OdevDialogComponent } from '../odev-dialog/odev-dialog.component';

@Component({
  selector: 'app-ogrenci-odev-ekle-dialog',
  templateUrl: './ogrenci-odev-ekle-dialog.component.html',
  styleUrls: ['./ogrenci-odev-ekle-dialog.component.scss']
})
export class OgrenciOdevEkleDialogComponent implements OnInit {
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
