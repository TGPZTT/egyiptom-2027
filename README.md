# Egyiptom 2027

[Útitervek és költségek](https://tgpztt.github.io/egyiptom-2027/)

Magyar nyelvű utazástervező tíz rögzített, 2027-es egyiptomi útitervvel. Márciusi,április–májusi és őszi csomagok;költségbontás,fizetési ütemezés,napi program,összehasonlítás,térképek és valódi helyszínfotók. A részletes Excel közvetlenül az oldalról letölthető.

A csomagoldalak sorrendje:helyszínek 40 valódi fotóval,napi program,szállás,források,költségbontás,fizetési ütemezés. Az összehasonlítás zöld pipái a tartalmazott programokat,a piros vonalak a kihagyott helyszíneket jelzik. A helyi utazás buszokkal és sofőrös transzferekkel készül.

Az árak6felnőttre vetített,10%tartalékot tartalmazó becslések,a2026. november 15–16-i kutatási pillanatkép alapján. Nem megvásárolt vagy garantált utazási csomagok. A pontos szolgáltatói feltételek és ellenőrzési korlátok minden csomagnál szerepelnek.

Az őszi Abu Szimbel–Szakkara kör két szállásváltozatban szerepel: 350 ezer Ft alatti Amenophis, illetve 365 ezer Ft alatti New Memnon medencés szállással. A kulturális program azonos. Minden kijelölt szállás hat valódi egyszemélyes ágyat, saját fürdőt, légkondicionálást és reggelit kínál; az elérhetőség és az érkezési feltételek foglalás előtt újraellenőrizendők. A Pyramids Sunshine külön árazott alternatívaként is megmaradt. A program és az útvonal egyes állomásai külön lenyithatók.

A dátumos repülőárak utolsó sikeres ellenőrzése november 15.; a november 16-i Wizz-ellenőrzés szolgáltatói hibával végződött, ezért abból új árat vagy járattörlést nem állítunk. A november 6–14-i poggyászár saját tervezési keret. A márciusi Nefertiti kerete a látható Genius/Booking kedvezményhez kötött; a más szállásoknál szereplő áthúzott eredeti árak referenciaértékek, nem külön kijelentkezett kosarak.

## Szerkesztés és ellenőrzés

Nincs fordítási lépés vagy telepítendő függőség. Az `index.html` és a mellette lévő fájlok közvetlenül kiszolgálhatók. Az alkalmazás adatai a `trip-data.json`,a költség- és fizetési modell a `model.mjs`,a megjelenítés az `app.mjs` és `style.css` fájlban található. A munkafüzet: `egyiptom-2027.xlsx`.

Ellenőrzés Node.js22vagy újabb verzióval:

```sh
npm test
npm run verify
```

A tesztek a naptári napokat,szabadságigényt,órablokkokat,költségkereteket,szállásösszegeket,fizetési részleteket és a deviza/létszám változásának hatását ellenőrzik.

## GitHub Pages

Forrás: `main` ág,gyökérkönyvtár(`/`). A `.nojekyll` miatt a GitHub a statikus fájlokat változatlanul szolgálja ki. A relatív hivatkozások a projekt `/egyiptom-2027/` címe alatt is működnek. A `main` ágra feltöltött változások automatikusan frissítik az oldalt.

## Képek és térkép

A fotók szerzői,eredeti forrásai és licencei a képkártyákon,valamint a `photos/credits.json` fájlban olvashatók. A Wikimedia Commons képek az ott megjelölt saját feltételeik szerint használhatók. A tengerparti kép helyszínfotó,nem lefoglalt strand;a maszk fotója korábbi kiállítási környezetet mutat.

A Leaflet1.9.4 a `vendor` könyvtárban található,a mellékelt BSD-2-Clause licenccel. A térképcsempék OpenStreetMap forrásból érkeznek,forrásjelzéssel. A helyszínkedvelések a látogató böngészőjében maradnak.
