---
name: brand-voice
description: Guides you through creating a complete Brand Voice document — personality, voice attributes, tone adaptation, style rules, terminology, brand codes (recurring language signals), e-shop touchpoint mapping, and strategic word exclusion. Use when defining a new brand voice, auditing existing voice for consistency, auditing e-shop language across all touchpoints, or documenting voice guidelines for AI/copywriters/team. Trigger phrases: "define brand voice", "brand guidelines", "how should my brand sound", "voice consistency", "e-shop voice audit", "brand codes". Do NOT use for writing actual copy (use copywriting skills) or positioning/UVP work (use uvp-optimization).
metadata:
  author: Petr
  version: 2.0.0
---

# Brand Voice - Definice a Prosazeni Hlasu Znacky

## Overview

Tento skill te provede tvorbou kompletniho Brand Voice dokumentu -- od definice osobnosti znacky az po konkretni pravidla pro kazdy kanal. Vysledek: zivouci dokument, ktery zajisti konzistentni komunikaci, at uz pises sam, deleguje na AI, nebo najimas copywritera.

**Pro koho:** Solopreneur / maly tym, ktery komunikuje na vice kanalech (web, e-shop, email, Instagram) a potrebuje konzistentni hlas.

**Announce:** "Pouzivam brand-voice skill k definici / auditovani hlasu znacky."

## When to Use

**USE this skill:**

- Zakladas novou znacku a potrebujes definovat, jak bude komunikovat
- Mas existujici znacku, ale komunikace je nekonzistentni
- Chces dokumentovat brand voice pro budouci pouziti (AI, copywriter, tym)
- Pripravujes briefing pro copywriting skills a chybi ti jasny hlas
- Expandujes do noveho kanalu (napr. newsletter) a potrebujes adaptovat ton

**DON'T use this skill:**

- Pises konkretni copy (pouzij copywriting skills)
- Resis UVP/pozicovani (pouzij `uvp-optimization`)
- Potrebujes jen upravit ton existujiciho textu (to zvladnes i bez frameworku)

## Integration with Other Skills

```
brand-voice (DEFINES the voice)
    |
    ├── web-copy (APPLIES voice to website)
    ├── product-copy (APPLIES voice to e-shop)
    ├── newsletter (APPLIES voice to email)
    ├── instagram-content (APPLIES voice to social)
    └── uvp-optimization (FEEDS positioning into voice)
```

**Workflow:** Brand Voice dokument se vytvori JEDNOU a pak ho referencuji vsechny copywriting skills jako vstup do briefingu.

---

## Workshop: Brand Voice za Jeden Vecer

Cely proces je rozdeleny do 7 kroku. Kazdy krok konci konkretnim vystupy. Muzes projit vsechno najednou (2-3 hodiny) nebo rozdelit do vice session.

---

### Step 1: Brand Personality -- Znacka Jako Clovek

**Cil:** Definovat osobnost znacky tak, aby kazdy (vc. AI) vedel, "kdo mluvi."

**Exercise: Predstav si znacku jako cloveka**

Odpovez na tyto otazky:

| Otazka                     | Tvoje odpoved |
| -------------------------- | ------------- |
| Kolik mu/ji je let?        |               |
| Jak se obleka?             |               |
| Jak mluvi s kamarady?      |               |
| Co ho/ji stve?             |               |
| Co ho/ji bavi o vikendech? |               |
| Jakou muziku posloucha?    |               |
| Jaky drink si objedna?     |               |
| Jak reaguje na reklamaci?  |               |

**Priklad -- Flat White:**

> Chlap kolem 30, nosi ciste streetwear, vari si specialni kavu doma. Mluvi primo, bez bullshitu. O vikendu grinduje recept na perfektni espresso. Posloucha lo-fi. Objedna si flat white, samozrejme. Na reklamaci reaguje vecne: "Jasne, vyresime to. Co se stalo?"

**Priklad -- Menu Editor:**

> Pragmaticky produktak kolem 35. Nosi jednoduche, funkcni obleceni. Mluvi jasne, bez zbytecnych slov. Stve ho, kdyz veci nefunguji intuitivne. O vikendu optimalizuje neco doma. Na reklamaci: "Diky za report, mrknem na to."

**Output:** 3-5 vet popisujicich osobnost znacky.

---

### Step 2: Voice Attributes -- Co Jsme a Co Nejsme

**Cil:** Definovat 3-5 klicovych atributu hlasu pomoci "Jsme / Nejsme" paru.

**Voice Attribute Pairs -- Tabulka**

Pro kazdy atribut vyplnit vsechny 4 sloupce:

| Atribut | Co JSME | Co NEJSME | Zni jako | Nezni jako |
| ------- | ------- | --------- | -------- | ---------- |
| 1.      |         |           |          |            |
| 2.      |         |           |          |            |
| 3.      |         |           |          |            |
| 4.      |         |           |          |            |
| 5.      |         |           |          |            |

**Priklad -- Flat White (technologie pro kavovary):**

| Atribut   | Co JSME                             | Co NEJSME                   | Zni jako                                                   | Nezni jako                                        |
| --------- | ----------------------------------- | --------------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| Primo     | Mluvime na rovinu, zadne omacky     | Hruby nebo arogantni        | "Tohle espresso je kysele. Tady je proc a jak to opravit." | "Nas unikatni pristup k optimalizaci extrakce..." |
| Expertni  | Vime, o cem mluvime, a ukazujeme to | Povysenecky nebo exkluzivni | "Mleci cas 25s, pomer 1:2, teplota 93C."                   | "Pokud jste opravdovy znalec, vite ze..."         |
| Prakticky | Vsechno ma konkretni pouziti        | Teoreticky nebo abstraktni  | "Nastavte tlak na 9 bar. Hotovo."                          | "V kontextu moderniho pristup ke kave..."         |
| Lidsky    | Jsme lidi co milujou kavu           | Korporatni nebo roboticky   | "Tenhle recept jsme testovali 2 tydny."                    | "Drazime se nejprisnejsich standardu kvality."    |

**Pravidlo:** Pokud mas vic nez 5 atributu, prioritizuj. 3-4 silne > 7 slabych.

**Kontrolni otazka:** Kdyz si prectu jen sloupec "Zni jako" -- poznam, o jakou znacku jde?

---

### Step 3: Audience Awareness -- Kdo Posloucha

**Cil:** Definovat, KDO je tvoje publikum, co je zajima, a jak s nimi mluvit.

**Pro kazdy segment vyplnit:**

| Dimenze              | Popis                             |
| -------------------- | --------------------------------- |
| **Kdo jsou**         | (demografie, role, situace)       |
| **Co resi**          | (hlavni problem/potreba)          |
| **Co je zajima**     | (temata, motivace)                |
| **Uroven expertise** | (zacatecnik / pokrocily / expert) |
| **Jak nas nasli**    | (kanal, touchpoint)               |
| **V jakem jazyce**   | (CZ / EN / oba)                   |

**Priklad -- Flat White:**

| Segment          | Popis                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| **Kavovy novic** | Ma Delonghi, chce lepsi kavu doma. Zajima ho "jak na to." Nasli nas na Instagramu. CZ.             |
| **Home barista** | Ma pakomat/lelit, hraje si s nastavenim. Zajima ho presnost a vybaveni. Instagram + e-shop. CZ/EN. |
| **Kavarna**      | Provozovatel, hleda spolehlivost a kvalitu. Zajima ho cena, servis, dostupnost. Primo kontakt. CZ. |

**Dulezite:** Pro kazdy segment muze byt trochu jiny ton (viz Step 5), ale HLAS (atributy) zustava stejny.

---

### Step 4: Core Messaging Pillars -- O Cem Mluvime

**Cil:** Definovat 3-5 klicovych temat, kolem kterych se toci veskera komunikace.

**Format:**

```
PILLAR: [Nazev]
Proc na tom zalezi: [1 veta]
Jak o tom mluvime: [konkretni pristup]
Jak o tom NEMLUVIME: [co se vyhybame]
```

**Priklad -- Flat White:**

```
PILLAR 1: Preciznost
Proc na tom zalezi: Dobra kava = presne parametry, ne nahoda.
Jak o tom mluvime: Konkretni cisla, nastaveni, recepty. "93C, 25s, 18g in."
Jak o tom NEMLUVIME: Vague faze jako "dokonala chut" nebo "vyjimecny zazitek."

PILLAR 2: Pristupnost
Proc na tom zalezi: Skvela kava neni jen pro snobs -- kazdy se to muze naucit.
Jak o tom mluvime: Jednoduche navody, krok po kroku, bez zbytecneho zargonu.
Jak o tom NEMLUVIME: "Pro opravdove znalce..." nebo "Pokrocila technika..."

PILLAR 3: Komunita
Proc na tom zalezi: Sdilena vasne spojuje lidi.
Jak o tom mluvime: UGC, reposty, "ukazte nam svoji kavu." Lidsky.
Jak o tom NEMLUVIME: "Nase komunita..." jako korporatni faze.
```

**Priklad -- Menu Editor:**

```
PILLAR 1: Jednoduchost
Proc: Majitel restaurace nema cas na slozity software.
Jak: "3 kliky a menu je online." Kratce, vecne.
Ne: "Nase intuitivni platforma..."

PILLAR 2: Kontrola
Proc: Chces mit menu pod kontrolou bez IT cloveka.
Jak: "Zmena ceny? 10 sekund." Demonstrace moci.
Ne: "Komplexni sprava obsahu..."

PILLAR 3: Profesionalita
Proc: Menu = vizitka restaurace.
Jak: "Vase menu bude vypadat jako od designera."
Ne: "Enterprise-grade reseni..."
```

---

### Step 5: Tone Spectrum -- Jak Se Hlas Adaptuje

**Cil:** Definovat, jak se TON meni podle kanalu a situace, zatimco HLAS zustava stejny.

**Dulezity rozdil:**

- **Voice (hlas)** = KDO jsi (nemenime, viz Step 2)
- **Tone (ton)** = JAK to rikas v danem kontextu (adaptujeme)

#### Tone by Channel -- Tabulka

| Kanal            | Ton                  | Formalita     | Typicky format                 | Priklad                                                                                                  |
| ---------------- | -------------------- | ------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Instagram**    | Hravy, energicky     | Nizka         | Kratke posty, stories, reels   | "Pondeli rano. Mlynek jede. Ty taky?"                                                                    |
| **E-shop**       | Vecny, duveryhodny   | Stredni       | Popisy produktu, parametry     | "Mlynek s 64mm kaminky. Mleci cas 25s. Retence pod 0.5g."                                                |
| **Email**        | Osobni, primo        | Stredni       | Newsletter, flow               | "Ahoj, minuly tyden jsi koukal na Comandante. Tady je 3-minutovy recept, ktery z neho dostanes maximum." |
| **Web**          | Jasny, profesionalni | Stredni-vyssi | Homepage, about, landing pages | "Vsechno pro domaci kavu. Od zrna po salky."                                                             |
| **Podpora**      | Lidsky, resici       | Stredni       | Tickety, chat                  | "Mrzí nás to. Poslete foto a vyresime to do 24h."                                                        |
| **B2B/Partneri** | Vecny, partnersky    | Vyssi         | Emaily, nabidky                | "Nabizime velkoobchodni program pro kavarny. Tady jsou podminky."                                        |

#### Tone by Situation

| Situace             | Adaptace tonu                                                 |
| ------------------- | ------------------------------------------------------------- |
| **Launch produktu** | Nadsensi, energicky. "Konecne tu je!"                         |
| **Reklamace**       | Empaticky, vecny. Bez vymluv. Reseni hned.                    |
| **Edukacni obsah**  | Trpelivy, krok-po-kroku. Bez povysenosti.                     |
| **Akce/sleva**      | Primo, bez pretvarky. "20% sleva. 3 dny. Hotovo."             |
| **Spatna zprava**   | Uprímny, lidsky. "Pokazili jsme to. Tady je co s tim delame." |

**Kontrolni otazka:** Precti si priklady ze vsech kanalu za sebou. Poznas, ze mluvi stejna znacka?

---

### Step 6: Style Rules -- Gramatika a Formatovani

**Cil:** Konkretni pravidla pro psani, aby kazdy text vypadal konzistentne.

#### Zakladni pravidla

| Pravidlo               | Standard                            | Priklad                                                           |
| ---------------------- | ----------------------------------- | ----------------------------------------------------------------- |
| **Headline bez tecky** | Nikdy tecka za headlinem            | "Kavovary pro domaci baristy" (ne "Kavovary pro domaci baristy.") |
| **Odstavce**           | Max 3 radky                         | Kratke, skenovatelne bloky                                        |
| **Cisla**              | 1-9 slovem, 10+ cislici             | "tri druhy" vs. "15 variant"                                      |
| **Seznamy**            | Odrazky pro 3+ polozek              | Prehlednost nad prosakem                                          |
| **Emoji**              | Dle kanalu (viz nize)               | Instagram: ano. Web: minimalne. Email: stridme.                   |
| **Tykan/Vykan**        | Dle segmentu                        | B2C: tykan. B2B: vykan (nebo partnerske tykan).                   |
| **Velkost pismen**     | Sentence case (CZ), Title Case (EN) | "Jak na lepsi kavu" / "How to Make Better Coffee"                 |

#### Emoji Usage

| Kanal     | Emoji     | Pravidlo                                 |
| --------- | --------- | ---------------------------------------- |
| Instagram | Ano       | Max 3-5 na post. Ucenne, ne nahodne.     |
| E-shop    | Minimalne | Jen u akci/novinek, pokud vubec.         |
| Email     | Stridme   | Max 1 v subjektu. V tele spis ne.        |
| Web       | Ne        | Profesionalni dojem. Ikonky misto emoji. |
| Podpora   | Situacne  | Priatelske zpravy ano, formalni ne.      |

#### Formatovani textu

- **Tucne** pro klicove pojmy a benefity
- _Kurziva_ pro cizojazycne terminy a zvyrazneni
- `Kod` pro technicke parametry (napr. `18g in / 36g out / 25s`)
- Odrazky pro vycty, cislovane seznamy pro kroky/navody

---

### Step 7: Terminology Management -- Slovnik Znacky

**Cil:** Definovat preferovane terminy, zakazana slova a konzistentni jazyk.

#### Preferred vs. Banned Terms

| Kategorie    | Pouzivame       | Nepouzivame | Proc         |
| ------------ | --------------- | ----------- | ------------ |
| **Produkt**  | (tvoje terminy) | (zakazane)  | (vysvetleni) |
| **Proces**   |                 |             |              |
| **Zakaznik** |                 |             |              |
| **Hodnota**  |                 |             |              |

**Priklad -- Flat White:**

| Kategorie | Pouzivame                  | Nepouzivame               | Proc                   |
| --------- | -------------------------- | ------------------------- | ---------------------- |
| Produkt   | mlynek, kavavar, pakomat   | pristroj, zarizeni        | Konkretni > obecne     |
| Proces    | priprava, extrakce, varime | kreativni proces, vyroba  | Kavova terminologie    |
| Zakaznik  | home barista, kavomil      | zakaznik, klient          | Komunita, ne transakce |
| Hodnota   | presnost, chut, kontrola   | kvalita, premium, luxusni | Konkretni > buzzwords  |

**Priklad -- Menu Editor:**

| Kategorie | Pouzivame                   | Nepouzivame                     | Proc                    |
| --------- | --------------------------- | ------------------------------- | ----------------------- |
| Produkt   | editor, aplikace            | platforma, reseni, system       | Jednoduche > korporatni |
| Proces    | upravit, zmenit, publikovat | spravovat, administrovat        | Akcni slovesa           |
| Zakaznik  | restaurace, majitel         | uzivatel, klient                | Lidsky, specificky      |
| Hodnota   | jednoduche, rychle          | komplexni, robustni, synergicke | Jasne > buzzwords       |

#### Universal Banned Words

Slova, ktera NIKDY nepouzivame (plati pro vsechny znacky):

- "komplexni" / "comprehensive"
- "unikatni" / "unique" (pokud neni opravdu unikatni)
- "inovativni" / "innovative"
- "synergicky" / "synergistic"
- "cutting-edge"
- "best-in-class"
- "revolucni" / "revolutionary"
- "holisticky" / "holistic"
- "vyuzijte potencial" / "leverage"

**Pravidlo:** Pokud slovo muze pouzit kazda firma v tvem oboru, je prilis obecne. Bud specificky.

#### Strategic Exclusion -- Kategoriova Analyza

Univerzalni banned words nestaci. Kazda kategorie ma vlastni "saturovane" terminy -- slova, ktera pouziva KAZDY konkurent a uz nic neznamenaji.

**Proces:**

1. **Poslechni trh:** Otevri 5-10 konkurentu ve sve kategorii. Projdi homepage, produkty, CTA.
2. **Vyextrahuj opakovana slova:** Ktere faze se opakuji u vsech? ("kvalita", "spolehlivost", "reseni", "budoucnost")
3. **Rozhodnutí o vylouceni:** Vedome se rozhodni, ktera z tech slov NEBUDS pouzivat -- ne protoze jsou spatna, ale protoze **uz nic nerikaji**.
4. **Zvol vlastni jazykovy prostor:** Pokud cely segment mluvi o "budoucnosti", ukotvi se v pritomnosti. Pokud konkurenti slibuji "nejlepsi reseni", nabidni jasne odpovedi misto superlativu.

**Priklad -- E-shop s kavou:**

| Saturovane v kategorii | Nase alternativa                       | Proc               |
| ---------------------- | -------------------------------------- | ------------------ |
| "kvalitni zrna"        | "etiopska Yirgacheffe, prazena 12. 3." | Konkretni > obecne |
| "pro narocne"          | "pro lidi co si merou gramy"           | Specificky segment |
| "siroky vyber"         | "23 single-origin z 8 fariem"          | Cisla > vague      |
| "rychle doruceni"      | "do 24h, prazeno na objednavku"        | Fakt > slib        |

**Test:** Precti si svoji homepage. Kolik slov bys mohl vymenit za JAKEKOLIV jine v oboru, a nikdo by nepoznal rozdil? Tohle jsou slova k vylouceni.

#### Inclusive Language

| Misto                            | Pouzij                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------- |
| "Vážení zákazníci"               | "Ahoj" / "Zdravíme"                                                               |
| "pro podnikatele a podnikatelky" | "pro podnikatele" (generické maskulinum CZ, nebo přeformuluj na "pro vaši firmu") |
| "guys" (EN)                      | "everyone" / "folks" / "team"                                                     |

**Pristup:** Nedelej z toho vedu. Pis prirozene, respektuj lidi, vyhni se archaismum.

---

## CZ/EN Dual-Language Branding

**Kontext:** Ceske firmy casto komunikuji v obou jazycich -- CZ pro domaci trh, EN pro mezinarodni/tech komunitu.

### Strategie: Jeden Hlas, Dva Jazyky

| Rozhodnuti            | Moznosti                                 | Doporuceni                                                                     |
| --------------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| **Nazev znacky**      | CZ nazev / EN nazev / jazykove neutralni | Jazykove neutralni je nejflexibilnejsi (napr. "Flat White", "ShiftStreak")     |
| **Claim/slogan**      | Jeden jazyk / oba                        | Zvol hlavni jazyk podle primarnich zakazniku. Neprekladej doslova.             |
| **Technicke terminy** | Prekladat / nechat EN                    | V tech/kavovem svete: nech EN terminy (espresso, flat white, SaaS, API)        |
| **Ton**               | Stejny / adaptovany                      | Ton muze byt v EN mirne formalnejsi nez v CZ (cestina je prirozene neformalni) |

### Pravidla pro CZ/EN

1. **Neprekladej, reinterpretuj.** CZ a EN maji jiny rytmus. Co zni dobre cesky, muze v anglictine pusobit divne a naopak.

2. **Zachovej atributy, ne formulace.** Pokud je hlas "primo a expertni" v CZ, musi byt "direct and knowledgeable" v EN -- ale konkretni vety budou jine.

3. **Technicke terminy nech v originale.** V kavovem, tech a SaaS svete se EN terminy neprikladaji (extraction, grind size, churn rate, onboarding).

4. **CZ = prirozene neformalni.** Cestina ma silnejsi tradici tykani a neformality. EN verze muze byt o stupen formalnejsi, aniz by ztratila lidskost.

5. **Vytvor slovnik pro oba jazyky.** Ne preklad, ale paralelni terminologii:

| CZ                           | EN                          | Poznamka                 |
| ---------------------------- | --------------------------- | ------------------------ |
| "Ahoj, jak ti muzem pomoct?" | "Hey, how can we help?"     | CZ prirozene tykan       |
| "pakomat"                    | "espresso machine"          | CZ ma vlastni termin     |
| "Zmena ceny? 10 sekund."     | "Price update? 10 seconds." | Stejna struktura funguje |

### Red Flags v Dual-Language

- Cesky text, ktery zni jako preklad z anglictiny ("Jsme vasenou pohaneni...")
- Anglicky text s ceskym slovosledem
- Mix jazyku v jednom textu bez duvodu ("Nase cutting-edge reseni pro vas business")
- Ruzne osobnosti v ruznych jazycich (CZ hravy, EN korporatni)

---

### Step 8: Brand Codes -- Jazykove Signaly Znacky

**Cil:** Definovat opakovane jazykove signaly, ktere delaji znacku rozpoznatelnou i BEZ loga.

**Co jsou brand codes:**

Brand codes jsou slova, metafory, postoje a vyrazy, ktere se OPAKOVANE objevuji napric webem, produkty, headlines, CTA a microcopy. Nejsou to slogany ani popisky tonu ("pratelsky", "profesionalni"). Jsou to konkretni jazykove vzory, ktere zakaznik po case zacne podvedome spojovat s tvoji znackou.

**Rozdil oproti Terminology (Step 7):**

- Terminology = co rikam a co nerikam (slovnik)
- Brand codes = jake VYZNAMY opakovane komunikuju (vzory)

**Typy brand codes:**

| Typ               | Popis                           | Priklad (Flat White)             |
| ----------------- | ------------------------------- | -------------------------------- |
| **Klicova slova** | Slova, ktera opakovane pouzivas | "presnost", "kontrola", "recept" |
| **Metafory**      | Obrazy, ktere se vraceji        | Kava jako "craft" / rucni prace  |
| **Postoj**        | Typicka reakce/nazor            | "Cisla nelzou" (data > nazory)   |
| **Struktura**     | Opakovany format vety           | "X sekund. Y gramu. Hotovo."     |
| **Ritualy**       | Faze spojene s opakovanou akci  | "Pondeli rano. Mlynek jede."     |

**Exercise: Najdi sve brand codes**

1. **Projdi svoji stavajici komunikaci** (web, emaily, Instagram, popisy produktu)
2. **Oznac slova a faze, ktere se opakuji** -- ne nahodou, ale protoze vyjadrují to, cemu veris
3. **Zapis 5-10 brand codes** do tabulky:

| Brand Code | Kde se objevuje | Proc je dulezity |
| ---------- | --------------- | ---------------- |
|            |                 |                  |

**Priklad -- Flat White:**

| Brand Code          | Kde se objevuje        | Proc je dulezity           |
| ------------------- | ---------------------- | -------------------------- |
| "X sekund, Y gramu" | Produkty, IG, emaily   | Presnost jako identita     |
| "Cisla nelzou"      | Blog, edukace          | Data-driven pristup        |
| "Pondeli rano"      | IG stories, newsletter | Ritualni moment = komunita |
| "Hotovo."           | CTA, navody, popisy    | Strucnost, zadne omacky    |
| "Od zrna po salek"  | Homepage, about        | Celistvost procesu         |

**Test: Poznal by zakaznik tvoji znacku bez loga?**

Seber 5 vet z ruznych kanalu (web, email, IG, produkt, podpora). Smichej je s 5 vetami konkurenta. Ukaz to kolegovi/kamaradovi.

- Pozna, ktere jsou tvoje? → Brand codes funguji.
- Nepozna? → Tve texty jsou zamenitelne. Vrat se k tomuto kroku.

**Pravidlo:** Znacka se nebuduje originalitou, ale OPAKOVANIM vyznamu. Nemas se bat, ze se opakujes -- mas se bat, ze jsi zamenitelny.

---

### Step 9: E-shop Touchpoints -- Kde Vsude Musi Znit Vas Hlas

**Cil:** Namapovat brand voice na 6 klicovych mist e-shopu, kde vetsina znacek selhava.

**Proc:** Vetsina e-shopu resi brand voice jen na homepage a v kampanich. Ale kategorie, produkty, CTA, checkout a chybove hlasky zustavaji genericke. Vysledek: zakaznik pozna znacku na Instagramu, ale na webu ji nepozna.

| Touchpoint    | Role hlasu                                                      | Co vetsina dela spatne                     | Jak na to                                                                            |
| ------------- | --------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| **Homepage**  | Nastavuje jazykove ocekavani                                    | Generic "Vitejte v nasem obchode"          | Prvni veta = brand code. Zakaznik musi do 3 sekund vedet, KDO mluvi.                 |
| **Kategorie** | Pomaha s orientaci, snizuje kognitivni zatez                    | Zadny text, nebo SEO-optimalizovany blabol | Konzistentni jazyk mezi kategoriemi. Neprodava, ale naviguje.                        |
| **Produkty**  | Prodava jazykem znacky, ne jen parametry                        | Kopie od vyrobce, zadna osobnost           | Ne kazdy produkt potrebuje unikatni text, ale KAZDY musi mluvit stejnym jazykem.     |
| **CTA**       | Potvrzuje identitu v malem prostoru                             | "Pridat do kosiku", "Pokracovat"           | I jednoduche "pokracovat" / "vybrat" / "pridat" muze potvrdit identitu.              |
| **Checkout**  | Buduje duveru v rozhodujicim momentu                            | Suchy, systemovy jazyk                     | Konzistentni komunikace snizuje stres a posiluje pocit kontroly.                     |
| **Microcopy** | Nejvyssi potencial -- chybove hlasky, prazdne stavy, notifikace | "Nastala chyba. Zkuste to znovu."          | Kdyz znacka zni konzistentne i v detailech, web se stava zazitkem s vlastnim hlasem. |

**Exercise: E-shop Voice Audit**

Pro kazdy touchpoint:

1. Otevri svuj e-shop
2. Screenshotni aktualni text
3. Ohodnot: Poznam z tohoto textu, JAKA znacka mluvi? (1-5)
4. Prepis slabe mista s pouzitim brand codes (Step 8) a voice attributes (Step 2)

**Priklad -- Flat White e-shop:**

| Touchpoint                | Pred                                    | Po                                                               |
| ------------------------- | --------------------------------------- | ---------------------------------------------------------------- |
| Homepage                  | "Vitejte v nasem e-shopu s kavou"       | "Vsechno pro domaci kavu. Od zrna po salek."                     |
| Kategorie (Mlynky)        | "Mlynky na kavu"                        | "Presnost zacina tady. Mlynky pro lidi, co meri gramy."          |
| Produkt                   | "Kvalitni mlynek s keramickymi kaminky" | "Comandante C40. 64mm kaminky. Mleci cas 25s. Retence pod 0.5g." |
| CTA                       | "Pridat do kosiku"                      | "Chci ho" / "Pridat"                                             |
| Checkout                  | "Zkontrolujte objednavku"               | "Vsechno sedi? Posledni krok."                                   |
| Microcopy (prazdny kosik) | "Vas kosik je prazdny"                  | "Nic tu neni. Jeste. Zacni tady →"                               |

**Dulezite:** Design muze byt moderni, SEO technicky perfektni, UX bezchybny. Ale pokud web nema vlastni jazyk, zustane jen dalsi e-shop v rade.

---

## Brand Voice Document -- Sablona

Po dokonceni workshopu vytvor tento dokument (uloz ho tam, kde ho najdes -- Notion, Google Doc, repo):

```markdown
# [NAZEV ZNACKY] -- Brand Voice Guide

## Osobnost

[3-5 vet z Step 1]

## Voice Attributes

[Tabulka z Step 2]

## Nase publikum

[Segmenty z Step 3]

## O cem mluvime (Pillars)

[Pillars z Step 4]

## Ton podle kanalu

[Tabulka z Step 5]

## Style rules

[Pravidla z Step 6]

## Slovnik

[Tabulky z Step 7]

## CZ/EN pravidla

[Pokud relevantni]

## Brand Codes

[5-10 opakovanych jazykovych signalu z Step 8]

## E-shop Touchpoints

[Audit 6 touchpointu z Step 9, pokud relevantni]

---

Posledni aktualizace: [DATUM]
Revidovat za: 6 mesicu
```

**Dulezite:** Tento dokument je ZIVY. Reviduj ho, kdyz:

- Spoustis novy kanal
- Menis positioning/UVP
- Najimas noveho copywritera nebo nastavujes AI
- Vidis nekonzistenci v komunikaci
- Uplynulo 6 mesicu od posledni revize

---

## Quality Gate: Brand Voice Audit

Po vytvoreni dokumentu (nebo pri revizi) projdi tento checklist:

```
[ ] Osobnost: Poznam znacku z popisu? (test na kolegu/kamarada)
[ ] Atributy: Mam 3-5 paru "Jsme/Nejsme" s priklady?
[ ] Atributy: Sloupec "Zni jako" je specificky (ne genericke faze)?
[ ] Publikum: Vim, kdo jsou moji lide a jak s nimi mluvit?
[ ] Pillars: Mam 3-5 temat, kolem kterych se toci komunikace?
[ ] Ton: Umim adaptovat ton podle kanalu, aniz bych zmenil hlas?
[ ] Ton: Precetl jsem priklady ze vsech kanalu -- poznam stejnou znacku?
[ ] Style: Mam jasna pravidla pro formatovani a gramatiku?
[ ] Slovnik: Vim, co rikam a co nerikam?
[ ] CZ/EN: Mam paralelni terminologii (ne preklady)?
[ ] Exclusion: Mam kategorove saturovane terminy k vylouceni (ne jen univerzalni)?
[ ] Brand codes: Mam 5-10 opakovanych jazykovych signalu?
[ ] Brand codes: Prosly "logo testem" -- pozna je kolega bez kontextu?
[ ] E-shop: Prosel jsem 6 touchpointu a kazdy zni jako moje znacka?
[ ] Dokument: Je ulozeny tam, kde ho najdu?
[ ] Dokument: Ma datum a termin revize?
```

---

## Common Mistakes

**Prilis vague atributy:**

- "Jsme profesionalni" -- to rika kazdy. CO presne to znamena pro TEBE?
- Fix: Pridej sloupec "Zni jako" s konkretni vetou.

**Ton = Hlas zamena:**

- Menis osobnost znacky na Instagramu vs. webu misto toho, abys menil jen ton.
- Fix: Hlas (atributy) je konstantni. Adaptuj jen formalitu a energii.

**Dokument, ktery nikdo necte:**

- 20 stranek brand guidelines, ktere nikdo neotevrel.
- Fix: Max 2 strany. Tabulky > prozaicky text. Priklady > pravidla.

**Copywriting-by-committee:**

- "Jeste bych tam dal trochu vic profesionality." "A co trochu humoru?" "Ale ne moc."
- Fix: Jedna osoba vlastni brand voice. Ostatni daji feedback, ale nerozhoduji.

**Prekladovy brand voice:**

- CZ verze zni jako strojovy preklad EN corporate guidelines.
- Fix: Vytvor CZ a EN verze nezavisle, s odkazem na stejne atributy.

---

## Quick Reference

| Krok             | Cas         | Output                          |
| ---------------- | ----------- | ------------------------------- |
| 1. Osobnost      | 15 min      | 3-5 vet                         |
| 2. Atributy      | 20 min      | Tabulka 3-5 paru                |
| 3. Publikum      | 15 min      | Segmenty                        |
| 4. Pillars       | 20 min      | 3-5 temat                       |
| 5. Ton           | 20 min      | Tabulka kanal/situace           |
| 6. Style         | 15 min      | Pravidla                        |
| 7. Slovnik       | 15 min      | Tabulky termin + exclusion list |
| 8. Brand Codes   | 20 min      | 5-10 codes + logo test          |
| 9. E-shop Touchp | 20 min      | Audit 6 touchpointu             |
| **Celkem**       | **~2.5-3h** | **Brand Voice Document**        |

---

## Integration Notes

**Pred psanim copy:** Nacti Brand Voice dokument a predej ho jako kontext do copywriting skills.

**Briefing rozsirent:** K standardnim 8 otazkam (CO, JAK, CIM, KDE, KOMU, KDO, KAM, PROC) pridej:

- **JAKYM HLASEM:** Odkaz na Brand Voice dokument

**AI konzistence:** Pokud pouzivas AI pro generovani copy, vloz Brand Voice dokument (nebo jeho zkracenou verzi) do system promptu / kontextu.

**Revizni cyklus:** Kazdy novy text prezen pres Voice Attributes tabulku -- splnuje "Zni jako" a nesplnuje "Nezni jako"?
