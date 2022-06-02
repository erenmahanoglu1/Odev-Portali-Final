import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kayit } from 'src/app/models/kayit';
import { Odev } from 'src/app/models/Odev';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmmDialogComponent } from '../dialogs/confirmm-dialog/confirmm-dialog.component';
import { OdevDialogComponent } from '../dialogs/odev-dialog/odev-dialog.component';

@Component({
  selector: 'app-odevlerim',
  templateUrl: './odevlerim.component.html',
  styleUrls: ['./odevlerim.component.scss']
})
export class OdevlerimComponent implements OnInit {
  odevler:Odev[];
  kayitlar:Kayit[];
  kayitOdevId:string;
  odevId:string;
  dataSource:any;
  displayedColumns=['odevAdi','detay'];  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator; 
  dialogRef: MatDialogRef<OdevDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog,
  ) { }

  ngOnInit() {
    this.OdevListele();
  }

  
  OdevListele(){
    this.apiServis.OdevListe().subscribe((d: Odev[]) => {
      this.odevler= d;
      console.log(d);
      this.dataSource=new MatTableDataSource(this.odevler);
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
      var yeniKayit:Odev= new Odev();
      this.dialogRef=this.matDialog.open(OdevDialogComponent,{
        width:'400px',
        data:{
          kayit : yeniKayit,
          islem: 'ekle'
        }
  
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if(d){
          this.apiServis.OdevEkle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if(s.islem){
              this.OdevListele();
            }


          });
        }
      });

      
    }
    Duzenle(kayit:Odev){
      this.dialogRef = this.matDialog.open(OdevDialogComponent,{
        width: '400px',
        data: {
          kayit:kayit,
          islem:'duzenle'
  
        }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d){
          d.odevId=kayit.odevId;
          this.apiServis.OdevDuzenle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if(s.islem){
              this.OdevListele();
            }
      
      
          });
  
        }
      });

      
     
      
    }

    Sil(kayit:Odev){
      this.confirmDialogRef=this.matDialog.open(ConfirmmDialogComponent,{
        width: '500px'
      });
      this.confirmDialogRef.componentInstance.dialogMesaj=kayit.odevAdi +" İsimli Ödev Silinecektir Onaylıyor Musunuz ? "
      this.confirmDialogRef.afterClosed().subscribe(d=>{
        if(d){
          this.apiServis.OdevSil(kayit.odevId).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem){
              this.OdevListele();
            }
          });
        }
      });
  
  
    }

  

}
