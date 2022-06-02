import { Odev } from 'src/app/models/Odev';
import { Kayit } from 'src/app/models/kayit';
import { Ogrenci } from './../models/Ogrenci';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ders } from '../models/Ders';
import { OgrFoto } from '../models/OgrFoto';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  OdevListele() {
    throw new Error('Method not implemented.');
  }
apiUrl = "http://localhost:11183/api/";
siteUrl ="http://localhost:11183/";
constructor(
  public http:HttpClient
) { }

//Ogrenci

 OgrenciListe(){
   return this.http.get(this.apiUrl+"ogrenciliste");
 }

 OgrenciById(ogrId:string){
   return this.http.get(this.apiUrl+"ogrencibyid/"+ogrId);
 }

 OgrenciEkle(ogr: Ogrenci){
   return this.http.post(this.apiUrl+"ogrenciekle", ogr);
 }

 OgrenciDuzenle(ogr:Ogrenci){
  return this.http.put(this.apiUrl+"ogrenciduzenle",ogr);
}

OgrenciSil(ogrId:string){
  return this.http.delete(this.apiUrl+"ogrencisil/"+ogrId);
}

OgrFotoGUNCELLE(ogrfoto: OgrFoto){
  return this.http.post(this.apiUrl+"ogrfotoguncelle", ogrfoto);
}

//Ders

DersListe(){
  return this.http.get(this.apiUrl+"dersliste");
}

DersById(dersId:string){
  return this.http.get(this.apiUrl+"dersbyid/"+dersId);
}

DersEkle(ders: Ders){
  return this.http.post(this.apiUrl+"dersekle",ders);
}

DersDuzenle(ders: Ders){
 return this.http.put(this.apiUrl+"dersduzenle",ders);
}

DersSil(dersId:string){
 return this.http.delete(this.apiUrl+"derssil/"+dersId);
}

OdevListeByDersId(dersId:string){
  return this.http.get(this.apiUrl+"odevlistebydersıd/"+dersId);
}

//Odev

OdevListe(){
  return this.http.get(this.apiUrl+"Odevliste");
}

OdevById(odevId:string){
  return this.http.get(this.apiUrl+"odevbyid/"+odevId);
}

OdevEkle(odev: Odev){
  return this.http.post(this.apiUrl+"odevekle/",odev);
}

OdevDuzenle(odev: Odev){
 return this.http.put(this.apiUrl+"odevduzenle", Odev);
}

OdevSil(odevId:string){
 return this.http.delete(this.apiUrl+"odevsil/"+odevId);
}

//Kayit

OgrenciOdevListe(ogrId:string){
  return this.http.get(this.apiUrl+"ogrenciodevliste/"+ogrId);
}

OdevOgrenciListe(odevId:string){
  return this.http.get(this.apiUrl+"odevogrenciliste/"+odevId);
}

KayitEkle(kayit: Kayit){
  return this.http.post(this.apiUrl+"kayitekle",kayit);
}

kayitSil(kayitId:string){
 return this.http.delete(this.apiUrl+"kayitsil/"+kayitId);
}


}
