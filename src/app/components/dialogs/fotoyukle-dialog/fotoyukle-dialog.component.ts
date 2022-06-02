import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { OgrFoto } from 'src/app/models/OgrFoto';
import { Ogrenci } from 'src/app/models/Ogrenci';


@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.scss']
})
export class FotoyukleDialogComponent implements OnInit {
  secilenFoto:any;
  ogrFoto:OgrFoto=new OgrFoto();
  secOgrenci:Ogrenci;

  constructor(
    public  fotoDialogRef:MatDialogRef <FotoyukleDialogComponent> ,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public apiServis:ApiService,


  ) {
    this.secOgrenci=this.data;

  }

  ngOnInit() {
  }

  FotoSec(e){
    var fotolar=e.target.files;
    var foto=fotolar[0];
    
    var fr=new FileReader();
    fr.onloadend=()=>{
      this.secilenFoto=fr.result;
      this.ogrFoto.fotoData=fr.result.toString();
      this.ogrFoto.fotoUzanti=foto.type;
    };
    fr.readAsDataURL(foto);
  }

}
