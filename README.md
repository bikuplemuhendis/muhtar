# Teslim — Muhtarlık evrak sistemi

Gelen evrakların şahıslara dağıtımını ve teslim durumunu takip eden, **mobile-first** ve **çok kiracılı (SaaS)** bir uygulama.

Vatandaş evrakının hangi muhtarlıkta olduğunu, muhtar telefonunu ve adresi görür. Evrak görüntüsü sisteme yüklenmez; T.C. kimlik numarası HMAC ile saklanır, ekranda yalnızca son 4 hane durur.

## Çalıştırma

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Tarayıcı: [http://localhost:3000](http://localhost:3000)

## Deneme hesapları

| Rol | E-posta | Parola |
| --- | --- | --- |
| Caddebostan muhtarı | `muhtar@caddebostan.ornek` | `Teslim123!` |
| Personel | `personel@caddebostan.ornek` | `Teslim123!` |
| Alsancak muhtarı | `muhtar@alsancak.ornek` | `Teslim123!` |
| Vatandaş (Ahmet) | `ahmet@ornek.com` | `Teslim123!` |
| Vatandaş (Elif) | `elif@ornek.com` | `Teslim123!` |

Kamu sorgusu: takip kodu `EVK-26DEMO1`, T.C. son 4 hane `0146`.

Ahmet’in deneme T.C. kimlik no’su: `10000000146` (yalnızca yerel tohum veri).

## Ne işe yarar?

- **Muhtarlık ofisi:** hızlı evrak kaydı, teslime hazır / teslim edildi, personel, kamu iletişim sayfası
- **Vatandaş üyeliği:** kimlik özetine eşlenen evraklar, ofis telefonu ve adres
- **Misafir sorgusu:** takip kodu + son 4 hane; ad soyad ve içerik yok
- **SaaS:** her muhtarlık ayrı kiracı (`/muhtarlik-olustur`)
- **KVKK tedbirleri:** veri minimizasyonu, maskeleme, onay, denetim kaydı, veri indirme ve anonimleştirme

## Test

```bash
npm test
npm run lint
```
