using OdevPortaliSon.Models;
using OdevPortaliSon.ViewModel;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace OdevPortaliSon.Controllers
{
    
    public class ServisController : ApiController
    {
        DB01Entities db = new DB01Entities();
        SonucModel sonuc = new SonucModel();


        #region ders
        [HttpGet]
        [Route("api/dersliste")]
        public List<DersModel> DersListe()
        {
            List<DersModel> liste = db.Ders.Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersKodu = x.dersKodu,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/dersbyid/{derslerId}")]
        public DersModel DersById(string derslerId)
        {
            DersModel kayit = db.Ders.Where(s => s.dersId == derslerId).Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersKodu = x.dersKodu,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,

            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/dersekle")]
        public SonucModel DersEkle(DersModel model)
        {
            if (db.Ders.Count(s => s.dersKodu == model.dersKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kodu Kayıtlıdır!";
                return sonuc;
            }
            Ders yeni = new Ders();
            yeni.dersId = Guid.NewGuid().ToString();
            yeni.dersKodu = model.dersKodu;
            yeni.dersAdi = model.dersAdi;
            yeni.dersKredi = model.dersKredi;
            db.Ders.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Eklendi";
            return sonuc;
        }

        [HttpGet]
        [Route("api/odevlistebydersıd/{derslerId}")]
        public List<OdevModel> OdevListeByDersId(string derslerId)
        {
            List<OdevModel> liste = db.Odev.Where(s => s.odevDersId == derslerId).Select(x => new OdevModel()
            {
                odevId = x.odevId,
                odevAdi = x.odevAdi,
                odevDersId = x.odevDersId,

            }).ToList();
            return liste;
        }

        [HttpPut]
        [Route("api/dersduzenle")]
        public SonucModel DersDuzenle(DersModel model)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == model.dersId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.dersKodu = model.dersKodu;
            kayit.dersAdi = model.dersAdi;
            kayit.dersKredi = model.dersKredi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/derssil/{derslerId}")]
        public SonucModel DersSil(string derslerId)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == derslerId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }


            db.Ders.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi";
            return sonuc;
        }
        #endregion



        [HttpGet]
        [Route("api/ogrenciliste")]
        public List<OgrenciModel> OgrenciListe()
        {
            List<OgrenciModel> liste = db.Ogrenci.Select(x => new OgrenciModel()
            {
                ogrId = x.ogrId,
                ogrNo = x.ogrNo,
                ogrAdSoyad = x.ogrAdSoyad,
                ogrDogTarih = x.ogrDogTarih,
                ogrFoto=x.ogrFoto,
                ogrDersSayisi = x.Kayit.Count()


            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/ogrencibyid/{ogrId}")]
        public OgrenciModel OgrenciById(string ogrId)
        {
            OgrenciModel kayit = db.Ogrenci.Where(s => s.ogrId == ogrId).Select(x => new OgrenciModel()
            {
                ogrId = x.ogrId,
                ogrNo = x.ogrNo,
                ogrAdSoyad = x.ogrAdSoyad,
                ogrDogTarih = x.ogrDogTarih,
                ogrFoto = x.ogrFoto,
                ogrDersSayisi = x.Kayit.Count()
            }).SingleOrDefault();
            return kayit;
        }



        [HttpPost]
        [Route("api/ogrenciekle")]
        public SonucModel OgrenciEkle(OgrenciModel model)
        {
            if (db.Ogrenci.Count(s => s.ogrNo == model.ogrNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Öğrenci Numarası Kayıtlıdır!";
                return sonuc;
            }

            Ogrenci yeni = new Ogrenci();
            yeni.ogrId = Guid.NewGuid().ToString();
            yeni.ogrNo = model.ogrNo;
            yeni.ogrAdSoyad = model.ogrAdSoyad;
            yeni.ogrDogTarih = model.ogrDogTarih;
            yeni.ogrFoto = model.ogrFoto;
            db.Ogrenci.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/ogrenciduzenle")]
        public SonucModel OgrenciDuzenle(OgrenciModel model)
        {
            Ogrenci kayit = db.Ogrenci.Where(s => s.ogrId == model.ogrId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.ogrNo = model.ogrNo;
            kayit.ogrAdSoyad = model.ogrAdSoyad;
            kayit.ogrDogTarih = model.ogrDogTarih;
            kayit.ogrFoto = model.ogrFoto;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/ogrencisil/{ogrId}")]
        public SonucModel OgrenciSil(string ogrId)
        {
            Ogrenci kayit = db.Ogrenci.Where(s => s.ogrId == ogrId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayitOgrId == ogrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci Üzerinde Ders Kaydı Olduğu İçin Öğrenci Silinemez!";
                return sonuc;
            }
            db.Ogrenci.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Silindi";
            return sonuc;
        }

        [HttpPost]
        [Route("api/ogrfotoguncelle")]
        public SonucModel OgrFotoGuncelle(ogrFotoModel model)
        {
            Ogrenci ogr = db.Ogrenci.Where(s => s.ogrId == model.ogrId).SingleOrDefault();
            if (ogr == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            if(ogr.ogrFoto != "profil.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/"+
                    ogr.ogrFoto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',')+1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = ogr.ogrId + model.fotoUzanti.Replace("image/",
                ".");
            using (var ms=new MemoryStream(imgbytes,0,imgbytes.Length))
            {
                Image img = Image.FromStream(ms,true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" +
                   dosyaAdi ));
            }
            ogr.ogrFoto = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Fotoğraf Güncellendi";
            return sonuc;
        }




        #region odev

        [HttpPost]
        [Route("api/odevekle/{dersId}")]
        public SonucModel OdevEkle([FromBody]OdevModel model, [FromUri] string dersId)
        {
            if (db.Odev.Any(x => x.odevAdi == model.odevAdi))
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ödev Kayıtlıdır!";
                return sonuc;
            }

            Odev yeni = new Odev();
            yeni.odevId = Guid.NewGuid().ToString();
            yeni.odevAdi = model.odevAdi;
            yeni.odevDersId = dersId;


            db.Odev.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Odev Eklendi";
            return sonuc;
        }

        [HttpGet]
        [Route("api/odevbyid/{odevId}")]
        public OdevModel OdevById(string odevId)
        {
            OdevModel kayit = db.Odev.Where(s => s.odevId == odevId).Select(x => new OdevModel()
            {
                odevAdi = x.odevAdi,
                odevDersId = x.odevDersId,
                odevId = x.odevId

            }).SingleOrDefault();
            return kayit;
        }

        [HttpGet]
        [Route("api/odevliste")]
        public List<OdevModel> OdevListe()
        {
            List<OdevModel> liste = db.Odev.Select(x => new OdevModel()
            {
                odevAdi = x.odevAdi,
                odevId = x.odevId,
                odevDersId = x.odevDersId,

            }).ToList();
            return liste;
        }

        [HttpDelete]
        [Route("api/odevsil/{odevId}")]
        public SonucModel OdevSil(string odevId)
        {
            Odev kayit = db.Odev.Where(s => s.odevId == odevId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.Odev.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/odevduzenle")]
        public SonucModel OdevDuzenle(OdevModel model)
        {
            Odev kayit = db.Odev.Where(s => s.odevId == model.odevId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ödev Bulunamadı!";
                return sonuc;
            }
            kayit.odevAdi = model.odevAdi;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Düzenlendi";
            return sonuc;
        }

     


        [HttpGet]
        [Route("api/ogrenciodevliste/{ogrId}")]
        public List<KayitModel> OgrenciOdevListe(string ogrId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitOgrId == ogrId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitOdevId = x.kayitOdevId,
                kayitOgrId = x.kayitOgrId,
            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrenciById(kayit.kayitOgrId);
                kayit.odevBilgi = OdevById(kayit.kayitOdevId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/odevogrenciliste/{odevId}")]
        public List<KayitModel> OdevOgrenciListe(string odevId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitOdevId == odevId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitOdevId = x.kayitOdevId,
                kayitOgrId = x.kayitOgrId,
                
            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrenciById(kayit.kayitOgrId);
                kayit.odevBilgi = OdevById(kayit.kayitOdevId);
            }
            return liste;
        }

        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitOdevId == model.kayitOdevId && s.kayitOgrId == model.kayitOgrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Öğrenci Ödeve Önceden Kayıtlıdır!";
                return sonuc;
            }
            Kayit yeni = new Kayit();

            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitOgrId = model.kayitOgrId;
            yeni.kayitOdevId = model.kayitOdevId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Kaydı Silindi";
            return sonuc;
        }
    }

    #endregion
}
