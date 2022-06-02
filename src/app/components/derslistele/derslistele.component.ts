import { OgrenciOdevEkleDialogComponent } from './../dialogs/ogrenci-odev-ekle-dialog/ogrenci-odev-ekle-dialog.component';
import { Odev } from 'src/app/models/Odev';
import { OdevDialogComponent } from './../dialogs/odev-dialog/odev-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Kayit } from './../../models/kayit';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { ConfirmmDialogComponent } from '../dialogs/confirmm-dialog/confirmm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog ,MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.scss']
})
export class DerslisteleComponent implements OnInit {
dersler:Ders[];
secOgrenci:Ogrenci;
ogrId:string;
dersUd:string;
displayedColumns=['odevBilgi','odevDersAdi','islemler'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator; 
  dialogRef: MatDialogRef<OgrenciOdevEkleDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmmDialogComponent>;
  dataSource:any;
  kayitlar:Kayit[];
  odevAdi:Odev;
  
  


  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute,
    public MatDialog:MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if (p){
        this.ogrId=p.ogrId;
        this.OgrenciGetir();
        this.DersListele();
        this.OdevListele();
      }
    });
  }
  
  OgrenciGetir(){
    this.apiServis.OgrenciById(this.ogrId).subscribe((d:Ogrenci)=>{
      this.secOgrenci=d;
    });
  }

  DersListele(){
    this.apiServis.DersListe().subscribe((d:Ders[])=>{
     this.dersler = d;
     this.dataSource=new MatTableDataSource(this.dersler);
    });
  }

  OdevListele(){
    this.apiServis.OgrenciOdevListe(this.ogrId).subscribe((d: Kayit[]) => {
      this.kayitlar= d;
      console.log(d);
      this.dataSource=new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  Ekle(){
    var yeniKayit:Odev= new Odev();
    this.dialogRef=this.MatDialog.open(OgrenciOdevEkleDialogComponent,{
      width:'400px',
      data:{
        kayit : yeniKayit,
        islem: 'ekle'
      }

    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
       yeniKayit = d;
       console.log(d);

        this.apiServis.OdevEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.OdevListele();
          }
        });
      }
    });
  }
 

}
