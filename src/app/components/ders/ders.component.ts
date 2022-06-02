import { Kayit } from 'src/app/models/kayit';
import { Odev } from 'src/app/models/Odev';
import { Sonuc } from 'src/app/models/Sonuc';
import { DersDialogComponent } from './../dialogs/ders-dialog/ders-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ders } from 'src/app/models/Ders';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmmDialogComponent } from '../dialogs/confirmm-dialog/confirmm-dialog.component';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
  dersler:Ders[];
  odevler:Odev[];
  kayitlar:Kayit[];
  kayitOdevId:string;
  DerslerinId:string;
  derslerId:string;
  odevId:string;
  dataSource:any;
  displayedColumns=['dersAdi','dersKredi','dersKodu','detay'];  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator; 
  dialogRef: MatDialogRef<DersDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmmDialogComponent>;
  

  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog,


  ) { }

  ngOnInit() {
  this.DersListele();
  }



  

  DersListele(){
    this.apiServis.DersListe().subscribe((d: Ders[]) => {
      this.dersler= d;
      console.log(d);
      this.dataSource=new MatTableDataSource(this.dersler);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
  


  Filtrele(e){
    var deger = e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  

  Ekle(){
    var yeniKayit:Ders= new Ders();
    this.dialogRef=this.matDialog.open(DersDialogComponent,{
      width:'400px',
      data:{
        kayit : yeniKayit,
        islem: 'ekle'
      }

    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.DersEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.DersListele();
          }


        });
      }
    });
  }

  Duzenle(kayit:Ders){
    this.dialogRef = this.matDialog.open(DersDialogComponent,{
      width: '400px',
      data: {
        kayit:kayit,
        islem:'duzenle'

      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        d.dersId=kayit.dersId;
        this.apiServis.DersDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.DersListele();
          }
    
    
        });

      }
    });
   
    
  }

  Sil(kayit:Ders){
    this.confirmDialogRef=this.matDialog.open(ConfirmmDialogComponent,{
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.dersAdi +" İsimli Ders Silinecektir Onaylıyor Musunuz ? "
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.DersSil(kayit.dersId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.DersListele();
          }
        });
      }
    });


  }
  

}
