# QueryMind — Vercel Deploy Rehberi
# Sıfırdan canlıya: ~15 dakika

## ADIM 1 — Supabase Tablosunu Güncelle

Daha önce tablo oluşturduysan:
1. Supabase → SQL Editor → New query
2. supabase-schema.sql içeriğini yapıştır → RUN
   (DROP TABLE IF EXISTS ile eski tablo silinip yenisi oluşur)

Değişkenler aynı, dokunmana gerek yok:
   NEXT_PUBLIC_SUPABASE_URL   = (aynı)
   SUPABASE_SERVICE_ROLE_KEY  = (aynı)


## ADIM 2 — GitHub'a Güncellemeyi Gönder

Terminalde projenin klasöründe:

   git add .
   git commit -m "form guncellendi"
   git push

Vercel otomatik yeniden deploy eder (~60 saniye).


## ADIM 3 — Vercel Environment Variables

Artık sadece 2 değişken gerekli (Resend artık yok):

   NEXT_PUBLIC_SUPABASE_URL   = https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY  = eyJhbGci...

Vercel'de fazladan RESEND_API_KEY varsa silebilirsin,
ama bıraksan da sorun olmaz.


## ADIM 4 — Test Et

1. Sitenize gidin, formu doldurun
2. Supabase → Table Editor → waitlist_users
   → Kayıt geldi mi kontrol edin

## Kayıtları CSV Olarak İndirme (Mail Göndermek İçin)

Supabase → Table Editor → waitlist_users
→ Sağ üstte "Export" → CSV indir
→ Mailchimp / Gmail'e yükle


## Sorun Giderme

Deploy hatası  → Vercel → Functions sekmesinden log'lara bakın
DB hatası      → Supabase → Logs bölümünü kontrol edin
"409 Conflict" → Bu mail zaten kayıtlı demektir
