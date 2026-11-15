# Egyiptom 2027

[Útitervek és költségek](https://tgpztt.github.io/egyiptom-2027/)

Magyar nyelvű utazástervező kilenc rögzített,2027-es egyiptomi útitervvel. Márciusi,április–májusi és őszi csomagok;költségbontás,fizetési ütemezés,napi program,összehasonlítás,térképek és valódi helyszínfotók. A részletes Excel közvetlenül az oldalról letölthető.

Az árak6felnőttre vetített,10%tartalékot tartalmazó becslések,a2026.november15-i kutatási pillanatkép alapján. Nem megvásárolt vagy garantált utazási csomagok. A pontos szolgáltatói feltételek és ellenőrzési korlátok minden csomagnál szerepelnek.

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
