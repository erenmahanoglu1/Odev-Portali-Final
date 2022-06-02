import { Ogrenci } from 'src/app/models/Ogrenci';
import { Odev } from './Odev';
import {Ders} from './Ders';

export class Kayit{
    
    kayitId:string;
    kayitDersId:string;
    kayitOdevId:string;
    kayitOgrId:string;             
    odevBilgi:Odev;           
    ogrBilgi:Ogrenci;
    odevAdi:Odev;
    odevId: string;
    odevDersId: string;
    dersId:string;
    odevDersAdi: Odev;

}