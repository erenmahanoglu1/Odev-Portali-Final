import { OgrFoto } from './../../models/OgrFoto';
import { FotoyukleDialogComponent } from './../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { ConfirmmDialogComponent } from './../dialogs/confirmm-dialog/confirmm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { AlerttDialogComponent } from './../dialogs/alertt-dialog/alertt-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OgrenciDialogComponent } from './../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {
ogrenciler: Ogrenci[];
displayedColumns=['ogrFoto','ogrAdSoyad','ogrDogTarih','ogrNo', 'ogrDersSayisi', 'islemler'];
dataSource: any;
@ViewChild(MatSort) sort:MatSort;
@ViewChild(MatPaginator) paginator:MatPaginator;
dialogRef:MatDialogRef<OgrenciDialogComponent>;
fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>;
confirmDialogRef: MatDialogRef<ConfirmmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit(): void {
    this.OgrenciListele();
  }
  
  OgrenciListele(){
    this.apiServis.OgrenciListe().subscribe((d: Ogrenci[]) => {
      this.ogrenciler= d;
      console.log(d);
      this.dataSource=new MatTableDataSource(this.ogrenciler);
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
    var yeniKayit:Ogrenci= new Ogrenci();
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:'400px',
      data:{
        kayit : yeniKayit,
        islem: 'ekle'
      }

    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiServis.OgrenciEkle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.OgrenciListele();
        }

      });
      }
    });
  }

  Duzenle(kayit: Ogrenci){
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:'400px',
      data:{
        kayit : kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
      kayit.ogrAdSoyad=d.ogrAdSoyad;
      kayit.ogrDogTarih=d.ogrDogTarih;
      kayit.ogrNo=d.ogrNo;

      this.apiServis.OgrenciDuzenle(kayit).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
      });
    }
      });
  }
  

  Sil(kayit: Ogrenci){
    this.confirmDialogRef=this.matDialog.open(ConfirmmDialogComponent,{
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.ogrAdSoyad +" İsimli Öğrenci Silinecektir Onaylıyor Musunuz ? "

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.OgrenciSil(kayit.ogrId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.OgrenciListele();
          }
        });
      }

    });

  }

  FotoGuncelle(kayit:Ogrenci){
    this.fotoDialogRef=this.matDialog.open(FotoyukleDialogComponent,{
      width: "400px",
      data:kayit
    });
    this.fotoDialogRef.afterClosed().subscribe((d:OgrFoto)=>{
      if(d){
        d.ogrId=kayit.ogrId;
        this.apiServis.OgrFotoGUNCELLE(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.OgrenciListele();
          }
        });
      }
    })
  
  }
}
