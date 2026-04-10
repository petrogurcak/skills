# legal:ecommerce Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Czech e-commerce legal compliance skill with audit, compliance check, and planning modes.

**Architecture:** SKILL.md (~1500 words) handles process/routing/format. Knowledge base lives in 15 `references/` files loaded on-demand via Read tool. Orchestrator gets routing update with priority rules.

**Tech Stack:** Markdown skill files, no code dependencies.

**Spec:** `docs/superpowers/specs/2026-04-09-legal-ecommerce-design.md`
**Research:** `docs/research/2026-04-09-czech-ecommerce-legislation.md`

---

### Task 1: Create SKILL.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/SKILL.md`

- [ ] **Step 1: Create the skill file**

```markdown
---
name: ecommerce
description: Ceska e-commerce legislativa — posuzuje pravni compliance e-shopu, obchodni podminky, odstoupeni od smlouvy, reklamace, cookies, GDPR v kontextu e-shopu, ceny/DPH/Omnibus, pristupnost, ADR, GPSR. Tri mody — audit otazky (konkretni pravni dotaz), compliance check (systematicky audit vsech oblasti), planning (checklist pro novy e-shop). Trigger phrases — "e-shop legislativa", "obchodni podminky", "reklamace", "odstoupeni od smlouvy", "cookie lista", "compliance e-shopu", "co musim mit na e-shopu", "zakladam e-shop".
---

# E-commerce — ceska legislativa

Posuzuje pravni compliance ceskeho e-shopu. Pokryva vsechny zakonne povinnosti pro provoz online obchodu v CR.

**Oznameni:** "Pouzivam ecommerce skill k posouzeni pravni compliance e-shopu."

## Detekce modu

Podle klicovych slov v dotazu zvol mod:

| Mod | Keywords | Popis |
|-----|----------|-------|
| **Planning** | chystam, zakladam, planuji, novy e-shop, pred spustenim, co budu potrebovat | Build checklist pro novy e-shop |
| **Compliance check** | audit, zkontroluj, compliance, co musim, co potrebuju, checklist, zkontrolovat | Systematicky audit vsech 13 oblasti |
| **Audit** (default) | vsechno ostatni | Odpoved na konkretni pravni otazku |

## Zakonova baze

| Zkratka | Plny nazev | Cislo |
|---------|------------|-------|
| OZ | Obcansky zakonik | 89/2012 Sb. |
| ZOS | Zakon o ochrane spotrebitele | 634/1992 Sb. |
| GDPR | Obecne narizeni o ochrane osobnich udaju | EU 2016/679 |
| ZEK | Zakon o elektronickych komunikacich | 127/2005 Sb. |
| ZObS | Zakon o nekterych sluzbach informacni spolecnosti | 480/2004 Sb. |
| ZDPH | Zakon o DPH | 235/2004 Sb. |
| ZPrist | Zakon o pristupnosti | 424/2023 Sb. |
| GPSR | Zakon o obecne bezpecnosti vyrobku | 387/2024 Sb. |

## Mapovani oblasti na references/

Kdyz potrebujes informace k dane oblasti, nacti prislusny soubor pres Read tool z `references/` adresare (relativne k tomuto SKILL.md):

| Oblast | Soubor |
|--------|--------|
| Informacni povinnosti webu | `references/informacni-povinnosti.md` |
| Obchodni podminky | `references/obchodni-podminky.md` |
| Odstoupeni od smlouvy | `references/odstoupeni-od-smlouvy.md` |
| Reklamace a zaruka | `references/reklamace-zaruka.md` |
| Ceny, DPH, Omnibus | `references/ceny-dph-omnibus.md` |
| Cookies | `references/cookies.md` |
| Osobni udaje v e-shopu | `references/osobni-udaje-eshop.md` |
| Marketing a obchodni sdeleni | `references/marketing-obchodni-sdeleni.md` |
| Pristupnost (EAA) | `references/pristupnost-eaa.md` |
| ADR | `references/adr.md` |
| Doruceni a prechod rizika | `references/doruceni-riziko.md` |
| Bezpecnost vyrobku (GPSR) | `references/gpsr-bezpecnost.md` |
| Objednavkovy proces | `references/objednavkovy-proces.md` |
| Compliance checklist | `references/checklist.md` |
| Pripravovane zmeny | `references/upcoming.md` |

## Proces

### Audit mod (default)

1. Identifikuj ktere oblasti se dotaz tyka
2. Nacti prislusne reference soubory pres Read tool
3. Nacti `references/upcoming.md` pokud se tema tyka oblasti s chystanymi zmenami
4. Odpovez ve formatu nize (verdikt + ustanoveni + analyza + doporuceni)

### Compliance check mod

1. Nacti `references/checklist.md`
2. Projdi systematicky vsech 13 oblasti
3. Pro kazdy bod checklistu zjisti stav (OK / CHYBI / RIZIKO)
4. Pokud potrebujes detail k oblasti, nacti prislusny reference soubor
5. Na konci zmin relevantni pripravovane zmeny z `references/upcoming.md`

### Planning mod

1. Nacti `references/checklist.md`
2. Preformuluj checklist jako build checklist — co pripravit pred spustenim
3. Rozrad do kategorii: pravni dokumenty, technicke pozadavky, provozni procesy
4. Na konci zmin pripravovane zmeny z `references/upcoming.md`

## Response format

### Audit mod

\```
## Pravni posouzeni: [tema]

**Verdikt:** KOMPATIBILNI / RIZIKO / NEKOMPATIBILNI

### Relevantni ustanoveni
- § XX odst. Y [zkratka] (zakon c. XX/YYYY Sb.): [pravidlo]

### Analyza
[jak se to vztahuje na konkretni situaci]

### Doporuceni
1. [konkretni akce]

### Upozorneni
Toto neni pravni porada. Overte s pravnikem.
\```

### Compliance check mod

\```
## E-shop compliance audit

| Oblast | Verdikt | Poznamka |
|--------|---------|----------|
| Informacni povinnosti | OK/CHYBI/RIZIKO | ... |
| ... | ... | ... |

### Chybejici polozky
1. [co chybi + reference na zakon]

### Upozorneni
Toto neni pravni porada. Overte s pravnikem.
\```

### Planning mod

\```
## E-shop — co pripravit pred spustenim

### 1. Pravni dokumenty k vytvoreni
- [ ] ...

### 2. Technicke pozadavky na web
- [ ] ...

### 3. Provozni procesy
- [ ] ...

### Upozorneni
Toto neni pravni porada. Overte s pravnikem.
\```

## Verdikt pravidla

- **KOMPATIBILNI** — reseni je v souladu se zakonem
- **RIZIKO** — zavisi na konkretni implementaci, neni jednoznacne
- **NEKOMPATIBILNI** — porusuje konkretni ustanoveni zakona

## Rules

- Nikdy nefabrikovat cisla paragrafu — pouzivat jen to co je v references/ souborech
- Pro hloubkovy GDPR rozbor (DPIA, zpracovatelske smlouvy, prava subjektu dat) odkazat na `legal:gdpr`
- Pro pracovnepravni otazky (brigadnici, smlouvy se zamestnanci) odkazat na `legal:labor-law`
- Vzdy uvest disclaimer "Toto neni pravni porada. Overte s pravnikem."
- Kdyz otazka presahuje scope knowledge base, rici to explicitne
- Verdikt RIZIKO pouzit kdyz odpoved zavisi na konkretni implementaci
- Upcoming changes vzdy zminit pokud se tykaji dotazu
- Pokud dotaz nesouvisí s e-commerce, odmitni a navrhni spravny skill
```

- [ ] **Step 2: Verify word count is under 2000**

Run: `wc -w plugins/legal/skills/ecommerce/SKILL.md`
Expected: under 2000 words

- [ ] **Step 3: Commit**

```bash
git add plugins/legal/skills/ecommerce/SKILL.md
git commit -m "feat: add legal:ecommerce skill — process, routing, format"
```

---

### Task 2: Create references — informacni-povinnosti.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/informacni-povinnosti.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Informacni povinnosti e-shopu

## Zakony

- OZ §435 (obchodni firma na webovych strankach)
- OZ §1811 (informace pred uzavrenim smlouvy)
- OZ §1820 (informace u distancnich smluv — 19 povinnych bodu)
- ZOS §9-13 (informace o vyrobcich a sluzbach)
- Zakon c. 455/1991 Sb. (zivnostensky zakon)

## Povinne udaje na webu

- Obchodni jmeno / jmeno a prijmeni (OSVC)
- ICO (identifikacni cislo)
- DIC (danove identifikacni cislo, pokud je platce DPH)
- Sidlo (adresa registrovaneho sidla)
- Zapis v rejstriku: "zapsana v obchodnim rejstriku vedenem u [soud], oddil [X], vlozka [Y]"
- Kontakt: email, telefon, postovni adresa
- Dozorovy organ: "Ceska obchodni inspekce, Ustredni inspektorat, Stepanska 567/15, 120 00 Praha 2"

## Informace u produktu (ZOS §9-11)

- Cena v CZK vcetne DPH (§12)
- Vlastnosti vyrobku, navod k pouziti
- Vsechny informace v ceskem jazyce (§11)
- Upozorneni na nebezpeci pri nespravnem pouziti

## Predsmlouvni informace pro distancni prodej (OZ §1820)

19 povinnych bodu, mj.:
1. Totoznost prodejce (jmeno, ICO, sidlo)
2. Oznaceni zbozi/sluzby a popis hlavnich vlastnosti
3. Cena vcetne DPH a vsech poplatku
4. Zpusob platby, dodani, plneni
5. Naklady na dodani (pokud je nelze stanovit predem, udaj ze mohou byt uctovany)
6. Udaje o pravech z vadneho plneni a zaruce
7. Doba trvani smlouvy, podminky ukonceni
8. Udaje o pravu na odstoupeni od smlouvy (lhuta, podminky, formular)
9. Udaje o nakladech na vraceni zbozi pri odstoupeni
10. Informace o mimosoudnim reseni sporu (ADR)

## Tlacitko objednavky

Od roku 2023 musi objednavkove tlacitko jasne vyjadrovat platebni zavazek:
- Spravne: "Objednat a zaplatit", "Objednavka zavazujici k platbe"
- Spatne: "Objednat", "Potvrdit", "Odeslat"

## Sankce

- Pokuta az 5 000 000 CZK nebo 4 % rocniho obratu (ZOS §24-24a)
- COI muze narizeni napravna opatreni

## Prakticke poznamky

- Udaje musi byt snadno dohledatelne (paticka, stranka "O nas", kontakt)
- Email kontakt je povinny — nestaci jen kontaktni formular
- Pro OSVC staci jmeno + ICO + sidlo (neni nutny OR zapis)
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/informacni-povinnosti.md
git commit -m "feat(ecommerce): add informacni-povinnosti reference"
```

---

### Task 3: Create references — obchodni-podminky.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/obchodni-podminky.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Obchodni podminky e-shopu

## Zakony

- OZ §1751-1753 (vseobecne obchodni podminky)
- OZ §1810-1820 (spotrebitelske smlouvy, informacni povinnosti)
- OZ §1813-1815 (zakaz znacne nerovnovahy — neplatne klauze)
- ZOS §13 (informace o reklamacnim postupu)

## Povinny obsah

Obchodni podminky MUSI obsahovat:
1. Identifikace prodejce (obchodni firma/jmeno, ICO, DIC, sidlo, OR zapis)
2. Popis zbozi/sluzeb a jejich hlavni vlastnosti
3. Celkova cena vcetne DPH a vsech poplatku, naklady na doruceni
4. Zpusoby platby, zpusoby a lhuty dodani
5. Reklamacni rad (postup, lhuty, kontakt)
6. Pravo na odstoupeni od smlouvy: podminky, 14denni lhuta, postup, vzorovy formular
7. Vyjimky kde odstoupeni neni mozne (§1837)
8. Informace o ADR/mimosoudnim reseni sporu
9. Informace o zpracovani osobnich udaju
10. Doba trvani smlouvy, podminky ukonceni (u prubeznych smluv)

## Zakaz nerovnovaznych klauzi (§1813-1815)

Neplatne jsou klauze ktere vytvarejí "znacnou nerovnovahu" v neprospech spotrebitele. Priklady neplatnych klauzi:
- Vylouceni prava na reklamaci
- Jednostranna zmena podminky bez souhlasu
- Smluvni pokuty pro spotrebitele
- Automaticke prodluzovani smlouvy bez jasneho upozorneni

Tyto klauze jsou neplatne i kdyz s nimi spotrebitel souhlasil.

## Jak spravne pouzivat

- Obchodni podminky musi byt zverejneny na webu a snadno dohledatelne
- Kupujici musi souhlasit v ramci objednavkoveho procesu (checkbox)
- Prodejce musi zaslat podminky emailem spolu s potvrzenim objednavky
- Zmena obchodnich podminek se nevztahuje na jiz uzavrene smlouvy

## Sankce

- Pokuta az 5 000 000 CZK nebo 4 % rocniho obratu (ZOS §24-24a)

## Prakticke poznamky

- Sablony z internetu casto nesplnuji vsech 19 bodu §1820 — vzdy overit kompletnost
- Obchodni podminky by mely byt v PDF ke stazeni (trvaly nosic)
- Pri zmene podminky informovat stávající zakazniky a dat jim moznost odstoupit
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/obchodni-podminky.md
git commit -m "feat(ecommerce): add obchodni-podminky reference"
```

---

### Task 4: Create references — odstoupeni-od-smlouvy.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/odstoupeni-od-smlouvy.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Odstoupeni od smlouvy

## Zakony

- OZ §1829-1837 (odstoupeni od distancni smlouvy)
- OZ §1820 odst. 1 pism. f)-j) (informacni povinnosti k odstoupeni)

## 14denni lhuta (§1829)

- Spotrebitel muze odstoupit do **14 dnu** od prevzeti zbozi bez udani duvodu
- U sluzeb: 14 dnu od uzavreni smlouvy
- U vicedilne objednavky: od prevzeti posledni polozky
- Forma: jakekoliv jednoznacne prohlaseni (email staci), ale prodejce MUSI poskytnout vzorovy formular

## Vraceni penez (§1832)

- Prodejce musi vratit **vsechny platby** vcetne puvodniho postovneho do **14 dnu** od odstoupeni
- Stejnym zpusobem platby, pokud se spotrebitel nedohodne jinak
- Prodejce MUZE pozadrzet vraceni do prevzeti zbozi zpet nebo prokazu odeslani (§1832 odst. 4)

## Naklady na vraceni

- Spotrebitel nese naklady na vraceni zbozi
- VYJIMKA: pokud prodejce neinformoval o teto povinnosti dle §1820 odst. 1 pism. j) — pak naklady nese prodejce

## Prodlouzeni lhuty

- Pokud prodejce neinformoval o pravu na odstoupeni: lhuta se prodluzuje na **1 rok + 14 dnu** (§1829 odst. 4)
- Pokud prodejce informuje dodatecne v prubehu tohoto roku: 14 dnu od informovani

## Vyjimky — spotrebitel NEMUZE odstoupit (§1837)

- (a) Sluzby plne poskytnute pred uplynutim lhuty, s predchozim souhlasem
- (b) Zbozi s cenou zavislou na financnim trhu
- (d) Zbozi na zakazku / na miru
- (e) Zbozi podlehajici rychle zkaze
- (g) Zapecetene hygienicke zbozi po otevreni
- (h) Zapecetene audio/video/software po otevreni
- (i) Noviny, periodika
- (j) Ubytovani, doprava, stravovani, volny cas na konkretni datum
- (l) Digitalni obsah po zahajeni plneni se souhlasem

## Vzorovy formular

Prodejce MUSI poskytnout vzorovy formular pro odstoupeni (priloha OZ). Formular musi obsahovat:
- Oznaceni prodejce (jmeno, adresa, email)
- Prohlaseni o odstoupeni
- Datum objednavky / prevzeti
- Jmeno spotrebitele
- Podpis (jen u papirove formy)
- Datum

## NOVINKA (ucinnost 19.6.2026)

**Snadne odstoupeni:** Pokud lze smlouvu uzavrit jednim kliknutim, musi byt i odstoupeni stejne snadne. E-shopy musi pridat one-click tlacitko pro odstoupeni.

## Sankce

- Pokuta az 5 000 000 CZK nebo 4 % rocniho obratu (ZOS §24-24a)
- Neinformovani o pravu = prodlouzeni lhuty na 1 rok + 14 dnu

## Prakticke poznamky

- Vzorovy formular umistit na web + prilozit do emailu s potvrzenim objednavky
- Informaci o vyjimkach (§1837) uvest v obchodnich podminkach u kazde relevantni kategorie
- Idealne potvrdit prijeti odstoupeni emailem s instrukcemi pro vraceni zbozi
- Pripravit se na one-click odstoupeni do cervna 2026
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/odstoupeni-od-smlouvy.md
git commit -m "feat(ecommerce): add odstoupeni-od-smlouvy reference"
```

---

### Task 5: Create references — reklamace-zaruka.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/reklamace-zaruka.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Reklamace a zaruka

## Zakony

- OZ §2099-2117 (prava z vadneho plneni — obecne)
- OZ §2161-2174 (prava z vadneho plneni — spotrebitelsky prodej)
- ZOS §13 (informacni povinnosti k reklamacim)
- ZOS §19 (postup pri reklamaci, 30denni lhuta)

## Zakonni zaruka — 24 mesicu (§2165)

- Spotrebitel muze uplatnit vadu ktera se projevi v **24 mesicich** od prevzeti
- Toto NENI "zaruka" v komercnim smyslu — jde o prava z vadneho plneni

## Obrocene dukazi bremeno — prvnich 12 mesicu (§2161 odst. 2)

- Vada ktera se projevi v **prvnich 12 mesicich** se PREDPOKLADA ze existovala uz pri prevzeti
- Prodejce musi prokazat opak, chce-li reklamaci zamitnout
- Zmeneno z 6 mesicu na 12 mesicu novelou 374/2022 Sb. (ucinnost 6.1.2023)

## Lhuta na vyrizeni — 30 dnu (ZOS §19)

- Prodejce musi reklamaci vyridit do **30 dnu** od uplatneni
- O prijeti reklamace musi rozhodnout do **3 pracovnich dnu**
- Pokud nevyridi ve 30 dnech: spotrebitel muze odstoupit od smlouvy

## Napravne prostredky (§2169)

Spotrebitel ma pravo na:
1. Opravu
2. Vymenu za novou vec
3. Primerenou slevu
4. Odstoupeni od smlouvy (vraceni penez)

Volba napravneho prostredku je primarne na spotrebiteli.

## Reklamace zdarma

- Reklamace musi byt pro spotrebitele **bezplatna**
- Prodejce nese naklady na dopravu reklamovaneho zbozi

## Reklamacni rad

E-shop MUSI zverejnit reklamacni rad obsahujici:
- Rozsah a podminky reklamace
- Kde a jak reklamaci uplatnit (kontaktni udaje)
- Lhuty (30 dnu na vyrizeni)
- Zpusob informovani o vysledku

## NOVINKA (ucinnost zari 2026)

**Prodlouzeni zaruky pri oprave:** Pokud spotrebitel zvoli OPRAVU, zarucni doba se prodluzuje z 24 na **36 mesicu** (3 roky).

## Sankce

- Pokuta az 5 000 000 CZK nebo 4 % rocniho obratu (ZOS §24-24a)
- Nedodrzeni 30denni lhuty = pravo spotrebitele na odstoupeni

## Prakticke poznamky

- Reklamacni rad zverejnit na webu (paticka nebo sekce "Reklamace")
- Potvrzeni o prijeti reklamace zaslat emailem s odhadem doby vyrizeni
- Evidovat vsechny reklamace (datum, predmet, vysledek) — COI muze kontrolovat
- Neomezovat reklamace nad ramec zakona (napr. "reklamace jen s originalnim obalem" je neplatne)
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/reklamace-zaruka.md
git commit -m "feat(ecommerce): add reklamace-zaruka reference"
```

---

### Task 6: Create references — ceny-dph-omnibus.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/ceny-dph-omnibus.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Ceny, DPH a Omnibus smernice

## Zakony

- ZDPH zakon c. 235/2004 Sb. (dan z pridane hodnoty)
- ZOS §12 (zobrazovani cen)
- ZOS §12a (srovnavaci ceny — Omnibus)

## Sazby DPH (od 1.1.2024)

- **21 %** zakladni sazba (vetsina zbozi a sluzeb)
- **12 %** snizena sazba (potraviny, voda, leky, knihy, nektere sluzby)

## Zobrazovani cen (§12)

- Vsechny ceny pro spotrebitele (B2C) MUSI obsahovat DPH
- Ceny MUSI byt v CZK
- Jednotkova cena musi byt viditelna v miste prodeje

## Omnibus — srovnavaci ceny u slev (§12a, ucinnost 6.1.2023)

Pri inzerci slevy MUSI prodejce zobrazit **nejnizsi cenu za poslednich 30 dnu**.

Pravidla:
- Referenci cena = nejnizsi cena za ktere bylo zbozi prodavano v poslednich 30 dnech pred slevou
- Pokud je zbozi na trhu kratsi dobu nez 30 dnu: nejnizsi cena od zacatku prodeje
- Prodejce musi vest **evidenci cen** (cenova historie) pro kontrolu COI
- Platí pro vsechny formy cenoveho zvyhodneni (sleva, akce, vyprodej, Black Friday...)

Co neni sleva:
- Mnozstevni sleva (kup 3, zaplat 2)
- Vernostni program (body, kupony)
- Prvni nakup s kodem

## Sankce

- Pokuta az **5 000 000 CZK** nebo **4 % rocniho obratu** (ZOS §24-24a)
- COI aktivne kontroluje — v dubnu 2025 reportovano 80 % nesouladu u kontrolovanych e-shopu

## Prakticke poznamky

- Na produktove strance u slevy zobrazovat: puvodni cena (= nejnizsi za 30 dni), slevnena cena, procento slevy
- Implementovat cenovou historii v databazi — uchovavat zmeny cen s timestampy
- Pozor na dynamicke ceny (A/B testy cen) — kazda zmena se pocita do 30denni historie
- Flash sales / limitovane akce podlehaji stejnym pravidlum
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/ceny-dph-omnibus.md
git commit -m "feat(ecommerce): add ceny-dph-omnibus reference"
```

---

### Task 7: Create references — cookies.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/cookies.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Cookies

## Zakony

- ZEK §89 odst. 3 (zakon c. 127/2005 Sb., novela 374/2021 Sb., ucinnost 1.1.2022)
- GDPR cl. 6, cl. 7 (souhlas se zpracovanim osobnich udaju)

## Opt-in rezim (od 1.1.2022)

### Bez souhlasu (technicke/nezbytne cookies)

- Session cookies pro prihlaseni
- Kosikove cookies
- Bezpecnostni cookies (CSRF)
- Cookie pro ulozeni volby cookie souhlasu

### Souhlas NUTNY (pred aktivaci)

- Analyticke cookies (Google Analytics, Hotjar...)
- Preferencni cookies (jazyk, region)
- Marketingove cookies (remarketing, Facebook Pixel, Google Ads)

## Pozadavky na cookie banner

- **Opt-in:** Neesencialni cookies MUSI byt blokovany pred udelenim souhlasu
- **Rovnocenne tlacitka:** "Prijmout" a "Odmitnout" musi byt stejne vyrazna (velikost, barva, umisteni)
- **Zadne predzaskrtnute boxy:** Vsechny neesencialni kategorie musi byt defaultne vypnute
- **Zavreni banneru ≠ souhlas:** Kliknuti na krizek nebo ignorovani banneru NENI platny souhlas
- **Cookie walls ZAKAZANY:** Nelze podminovat pristup k webu souhlasem s cookies
- **Granularni volba:** Uzivatel musi moci zvolit kategorie (analytika vs. marketing)
- **Platnost souhlasu:** ~12 mesicu, pak znovu pozadat
- **Opakovane dotazovani po odmitnuti:** Minimum 6 mesicu pred dalsim dotazem

## Souhlas musi byt (dle UOOU)

- **Svobodny** — bez natlaku, bez cookie walls
- **Konkretni** — pro kazdy ucel zvlast
- **Informovany** — uzivatel vi co odsouhlasuje
- **Jednoznacny** — aktivni ukony (kliknuti), ne pasivni (scrollovani)

## Sankce

- UOOU muze ulozit pokuty v radech statisicu CZK i mensim webum
- GDPR pokuty az 20 000 000 EUR nebo 4 % globalniho obratu (teoreticky, v CZ praxis nizsi)

## Prakticke poznamky

- Pouzivat cookie consent platformu (Cookiebot, CookieYes, vlastni reseni)
- Google Consent Mode v2 — nutny pro zachovani Google Ads konverzi
- Google Analytics 4 bez cookies: pouziva modelovani, ale zakladni mereni stale vyzaduje souhlas
- Cookie policy jako samostatna stranka s prehledem vsech cookies (nazev, ucel, expirace, poskytovatel)
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/cookies.md
git commit -m "feat(ecommerce): add cookies reference"
```

---

### Task 8: Create references — osobni-udaje-eshop.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/osobni-udaje-eshop.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Osobni udaje v e-shopu

## Zakony

- GDPR (EU 2016/679) — cl. 6, cl. 7, cl. 12-22, cl. 28, cl. 30
- Zakon c. 110/2019 Sb. (ZZOOU — ceska adaptace GDPR)

## Pravni zaklady zpracovani v e-shopu

| Ucel | Pravni zaklad | Udaje |
|------|---------------|-------|
| Plneni objednavky | Plneni smlouvy cl. 6(1)(b) | Jmeno, adresa, email, telefon |
| Uctovani a dane | Pravni povinnost cl. 6(1)(c) | Fakturacni udaje |
| Prevence podvodu | Opravneny zajem cl. 6(1)(f) | IP adresa, platebni data |
| Zakladni analytika | Opravneny zajem cl. 6(1)(f) | Anonymizovane navstevnosti |
| Marketingove emaily | Souhlas cl. 6(1)(a) | Email (viz marketing-obchodni-sdeleni.md) |
| Remarketingove cookies | Souhlas cl. 6(1)(a) | Cookie ID, browsing data |

## Povinny obsah privacy policy

Zasady ochrany osobnich udaju MUSI obsahovat:
1. Totoznost a kontakt spravce udaju
2. Ktere udaje se zbirai a proc (ucely)
3. Pravni zaklad pro kazdy ucel zpracovani
4. Doby uchovani udaju
5. Prijemci / treti strany (dopravci, platebni brany, analytika)
6. Prava subjektu udaju (pristup, oprava, vymazani, prenositelnost, namitka)
7. Pravo podat stiznost u UOOU
8. Zda je poskytovani udaju povinne nebo dobrovolne
9. Automatizovane rozhodovani (pokud existuje)

## Zpracovatelske smlouvy (cl. 28)

Povinne s kazdym dodavatelem ktery zpracovava zakaznicke udaje:
- Platebni brany (Stripe, GoPay, Comgate)
- Dopravci (PPL, DPD, Zasilkovna)
- Emailove platformy (Mailchimp, Ecomail)
- Analytika (Google Analytics)
- Hosting provider
- CRM systemy

## Reakce na zadosti subjektu

- Lhuta: **30 dnu** od doruceni zadosti
- Prodlouzeni: mozne o dalsi 2 mesice u slozitych pripadu (informovat do 30 dnu)
- Bezplatne (prvni zadost, dalsi opakovan mohou byt zpoplatneny)

## Sankce

- UOOU: pokuta az **10 000 000 CZK** (cesky zakon)
- GDPR: az 20 000 000 EUR nebo 4 % globalniho obratu

## Prakticke poznamky

- Privacy policy = samostatna stranka, odkaz v paticce a pri registraci/objednavce
- Pro hloubkovy GDPR rozbor (DPIA, slozite zpracovani) pouzijte skill `legal:gdpr`
- ZZOOU (110/2019) nerozporuje GDPR, jen upresne nektere aspekty (vek souhlasu: 15 let v CZ)
- Uchovani udaju po objednavce: 10 let (uctovani), pak smazat nebo anonymizovat
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/osobni-udaje-eshop.md
git commit -m "feat(ecommerce): add osobni-udaje-eshop reference"
```

---

### Task 9: Create references — marketing-obchodni-sdeleni.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/marketing-obchodni-sdeleni.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Marketing a obchodni sdeleni

## Zakony

- Zakon c. 480/2004 Sb. o nekterych sluzbach informacni spolecnosti (ZObS)
- GDPR cl. 6(1)(a) (souhlas)

## Opt-in pro ne-zakazniky

- Marketingove emaily NELZE posilat bez predchoziho souhlasu (opt-in)
- Souhlas musi byt svobodny, konkretni, informovany a jednoznacny
- Predzaskrtnuty checkbox NENI platny souhlas
- Souhlas musi byt prokazatelny (evidence)

## Soft opt-out pro stavajici zakazniky

VYJIMKA: existujicim zakaznikum lze posilat bez predchoziho souhlasu, pokud:
- Jde o **podobne zbozi/sluzby** jako predchozi nakup
- Zakaznik dostal moznost se odhlasit pri kazdem kontaktu
- Zakaznik nebyl pres odhlaseni kontaktovan
- Email ziskan v ramci prodeje (ne z jineho zdroje)

## Povinnosti kazdeho obchodniho sdeleni

- Jasne oznaceno jako obchodni sdeleni
- Identifikace odesilatele (kdo posila)
- Mechanismus pro **snadne odhlaseni** v kazdem emailu (jeden klik)
- Nesmi skryvat totoznost odesilatele
- Nesmi pouzivat klamave udaje

## SMS marketing

- Stejne pravidla jako email — opt-in nutny
- Odhlaseni musi byt mozne odpovedi (napr. "STOP")

## Sankce

- Pokuta az **10 000 000 CZK** (UOOU vymaha)
- Kazdy jednotlivy nevyzadany email je samostatny prestupek

## Prakticke poznamky

- Opt-in formular: jasne rici CO bude zakaznik dostavat a JAK casto
- Double opt-in (potvrzovaci email) neni zakonny pozadavek, ale je best practice (prokazatelnost)
- Odhlasovaci odkaz MUSI fungovat — nefunkcni unsubscribe = poruseni zakona
- Soft opt-out: neplati pro SMS, jen pro email
- Evidence souhlasu: datum, cas, IP adresa, text souhlasu, zdroj
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/marketing-obchodni-sdeleni.md
git commit -m "feat(ecommerce): add marketing-obchodni-sdeleni reference"
```

---

### Task 10: Create references — pristupnost-eaa.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/pristupnost-eaa.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Pristupnost — European Accessibility Act (EAA)

## Zakony

- Zakon c. 424/2023 Sb. o pozadavcich na pristupnost (implementace EU 2019/882)
- Norma EN 301 549 (technicke pozadavky)

## Casovy harmonogram

- **28.6.2025:** Vsechny NOVE digitalni produkty/sluzby musi splnovat pristupnost
- **28.6.2030:** Vsechny STAVAJICI produkty musi splnovat pristupnost

## Vyjimka — mikropodniky

Povinnost se NEVZTAHUJE na mikropodniky:
- Mene nez **10 zamestnancu** A zaroven
- Rocni obrat pod **2 miliony EUR**

Oba podminky musi byt splneny soucasne.

## Technicke pozadavky (WCAG 2.1 Level AA)

- **Kontrast:** Minimalne 4.5:1 pro text
- **Klavesnice:** Vsechny funkce dostupne pres klavesnici (bez mysi)
- **Fokus:** Viditelne indikatory fokusu pri navigaci klavesnici
- **Alt texty:** Alternativni popisy pro vsechny informativni obrazky
- **Formulare:** Pristupne formulare s labely, chybovymi hlaskami
- **Zoom:** Obsah citelny pri 200% zvetseni
- **Blikani:** Zadny obsah neblikajici vice nez 3x za sekundu
- **Nadpisy:** Spravna hierarchie (h1-h6)
- **Jazyk:** Deklarovany jazyk stranky (lang atribut)

## Prohlaseni o pristupnosti

E-shop MUSI zverejnit prohlaseni o pristupnosti obsahujici:
- Uroven shody (uplna / castecna / zadna)
- Nepristupne casti a duvody
- Kontakt pro zpetnou vazbu k pristupnosti
- Datum posledni aktualizace prohlaseni

## Dozor

- Ceska obchodni inspekce (COI)
- Varovani, napravna opatreni, financni sankce

## Prakticke poznamky

- Audit pristupnosti: pouzit nastroje (axe, Lighthouse, WAVE) + manualni testovani
- Nejcastejsi problemy e-shopu: chybejici alt texty u produktovych fotek, nepristupne filtry, checkout bez klavesnicove navigace
- Pozor na vlastni UI komponenty (modaly, dropdowny, carousely) — musi byt ARIA pristupne
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/pristupnost-eaa.md
git commit -m "feat(ecommerce): add pristupnost-eaa reference"
```

---

### Task 11: Create references — adr.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/adr.md`

- [ ] **Step 1: Create the reference file**

```markdown
# ADR — mimosoudni reseni sporu

## Zakony

- ZOS §14 (informacni povinnost)
- ZOS §20d-20n (postup ADR)

## Povinnosti e-shopu

E-shop MUSI na webu informovat o subjektu mimosoudniho reseni sporu:

**Povinny text (nebo jeho obdoba):**
> Ceska obchodni inspekce
> Ustredni inspektorat — oddeleni ADR
> Stepanska 567/15
> 120 00 Praha 2
> https://adr.coi.cz

Tuto informaci uvest:
- V obchodnich podminkach
- Na webu (sekce kontakt nebo patcicka)

## ODR platforma — ZRUSENA

- EU ODR platforma (ec.europa.eu/odr) byla **uzavrena 20.7.2025**
- Povinnost odkazovat na ODR platformu SKONCILA k tomuto datu
- **E-shopy by mely ODSTRANIT odkaz na ODR platformu** pokud ho jeste maji

## Sankce

- Pokuta az **1 000 000 CZK** za nesplneni informacni povinnosti o ADR

## Prakticke poznamky

- Staci jednoduchy odstavec v obchodnich podminkach + odkaz na adr.coi.cz
- ADR je pro spotrebitele bezplatne
- Zkontrolovat a smazat starey ODR odkazy z paticek a obchodnich podminek
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/adr.md
git commit -m "feat(ecommerce): add adr reference"
```

---

### Task 12: Create references — doruceni-riziko.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/doruceni-riziko.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Doruceni a prechod rizika

## Zakony

- OZ §2090-2095 (zasilkovy prodej)
- OZ §2121 (prechod nebezpeci skody)
- OZ §2159-2160 (spotrebitelsky prodej)

## Prechod rizika na spotrebitele (§2121 + spotrebitelska ochrana)

- Riziko prech na spotrebitele AZ pri **fyzickem prevzeti zbozi**
- NE pri predani dopravci — to je obecne pravidlo §2090, ale spotrebitelska ochrana ho prebiiji
- Poskozeni pri preprave = zodpovednost PRODEJCE

## Lhuta doruceni

- Musi byt uvedena v obchodnich podminkach
- Pokud neni stanovena: obecne do **30 dnu** (§1824 ve spojeni s EU smernici)
- Pokud neni zbozi doruceno ve lhute: spotrebitel muze poskytnout dodatecnou primerent lhutu
- Pokud ani pak neni doruceno: pravo na odstoupeni od smlouvy

## Naklady na doruceni

- Musi byt jasne uvedeny PRED dokoncenim objednavky (§1820)
- Pokud nelze predem urcit: uvest ze mohou byt uctovany a jakym zpusobem
- Pri odstoupeni od smlouvy: prodejce vraci i naklady na puvodni doruceni (nejlevnejsi nabizena varianta)

## Prakticke poznamky

- Na produktove strance uvest odhadovanou dobu doruceni
- V kosiku/checkoutu zobrazit vsechny naklady na doruceni pred potvrzenim objednavky
- Pri poskozeni zasilky: resit s dopravcem, ale vuci spotrebiteli je zodpovedny prodejce
- Sledovaci cislo (tracking) neni zakonny pozadavek, ale je doporuceno
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/doruceni-riziko.md
git commit -m "feat(ecommerce): add doruceni-riziko reference"
```

---

### Task 13: Create references — gpsr-bezpecnost.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/gpsr-bezpecnost.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Bezpecnost vyrobku — GPSR

## Zakony

- Zakon c. 387/2024 Sb. o obecne bezpecnosti vyrobku (implementace EU 2023/988)
- Ucinnost: od 13.12.2024

## Povinnosti e-shopu

### Identifikace vyrobku na listingu

- Nazev vyrobku, typ, serie, sarze
- Fotografie vyrobku
- Nazev a kontakt vyrobce
- Nazev a kontakt EU odpovedne osoby (pokud vyrobce neni z EU)

### Bezpecnostni informace

- Bezpecnostni upozorneni v **ceskem jazyce**
- Vekove omezeni (pokud relevantni)
- Navod k pouziti (pokud relevantni)

### Proces pri nebezpecnem vyrobku

- Zastavit prodej nebezpecneho vyrobku
- Informovat dotcene zakazniky
- Spolupracovat s dozorovym organem (COI)

## Dozor

- Ceska obchodni inspekce (COI)
- Zakon je novy (2024), enforcement praxe se teprve formuje

## Prakticke poznamky

- Doplnit na produktove stranky: vyrobce, zemi puvodu, EU odpovednou osobu
- U importovaneho zbozi z Ciny/mimo EU: overit ze existuje EU odpovedna osoba
- Uchovavat dokumentaci k bezpecnosti vyrobku pro pripadnou kontrolu
- Sledovat Safety Gate (RAPEX) pro stazeni nebezpecnych vyrobku z trhu
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/gpsr-bezpecnost.md
git commit -m "feat(ecommerce): add gpsr-bezpecnost reference"
```

---

### Task 14: Create references — objednavkovy-proces.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/objednavkovy-proces.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Objednavkovy proces

## Zakony

- OZ §1824 (potvrzeni na trvalem nosici)
- OZ §1825 (review step, oprava chyb)
- OZ §1826 (archivace textu smlouvy)
- OZ §1827 (kopia smlouvy spotrebiteli)

## Potvrzeni objednavky (§1824)

- Ihned po uzavreni smlouvy musi prodejce poskytnout potvrzeni na **trvalem nosici** (email)
- Potvrzeni musi obsahovat vsechny predsmlouvni informace (§1820)
- U digitalniho obsahu: potvrdit souhlas spotrebitele se zahajenim plneni pred uplynutim lhuty pro odstoupeni

## Review step pred potvrzenim (§1825)

Objednavkovy proces MUSI obsahovat:
- **Krok kontroly:** Spotrebitel musi moci zkontrolovat objednavku pred finalnim potvrzenim
- **Moznost opravy chyb:** Spotrebitel musi moci opravit udaje (mnozstvi, adresa, platba) pred odeslanim
- **Shruti objednavky:** Prehled zbozi, cen, doruceni, celkove castky

V praxi: stranky "Shruti objednavky" / "Kontrola objednavky" pred tlacitkem "Objednat a zaplatit".

## Archivace smlouvy (§1826)

- Text smlouvy (obchodnich podminek) musi byt **archivovan** a pristupny spotrebiteli
- Spotrebitel musi mit moznost si smlouvu reproduce a ulozit
- Prakticky: obchodni podminky v PDF priloze emailu s potvrzenim

## Kopia smlouvy (§1827)

- Kopia smlouvy / potvrzeni objednavky musi byt zaslana spotrebiteli **bez zbytecneho odkladu** na jeho email

## Prakticke poznamky

- Checkout flow: Kosik → Doruceni → Platba → **Shruti** → Objednat a zaplatit → Dekujeme + email
- Review step NESMI byt preskocen (napr. one-click purchase musi mit alespon modal s prehledem)
- Potvrzovaci email: objednavka + obchodni podminky (PDF) + reklamacni rad + formular pro odstoupeni
- Archivace: uchovavat verzi obchodnich podminek platnou v dobe objednavky
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/objednavkovy-proces.md
git commit -m "feat(ecommerce): add objednavkovy-proces reference"
```

---

### Task 15: Create references — checklist.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/checklist.md`

- [ ] **Step 1: Create the reference file**

```markdown
# E-shop compliance checklist

Kompletni checklist vsech zakonnych povinnosti ceskeho e-shopu.

## 1. Informacni povinnosti webu

- [ ] Obchodni jmeno / jmeno a prijmeni, ICO, DIC (pokud platce DPH), sidlo
- [ ] Zapis v rejstriku (OR nebo ZR)
- [ ] Kontakt: email, telefon, postovni adresa
- [ ] Dozorovy organ: COI s adresou
- Sankce: az 5 000 000 CZK / 4 % obratu

## 2. Obchodni podminky

- [ ] Vsech 19 polozek dle §1820 OZ (identifikace, zbozi, ceny, platby, dodani, reklamace, odstoupeni, ADR, osobni udaje)
- [ ] Zadne neplatne klauze (§1813-1815 — znacna nerovnovaha)
- [ ] Zverejneny na webu, odkaz v checkoutu
- [ ] Souhlas kupujiciho v objednavkovem procesu (checkbox)
- [ ] Zasilany emailem s potvrzenim objednavky (PDF)
- Sankce: az 5 000 000 CZK / 4 % obratu

## 3. Odstoupeni od smlouvy

- [ ] 14denni lhuta jasne popsana v obchodnich podminkach
- [ ] Vzorovy formular pro odstoupeni na webu i v emailu
- [ ] Vyjimky (§1837) uvedeny u relevantních kategorii
- [ ] Proces vraceni penez do 14 dnu
- [ ] NOVINKA 19.6.2026: One-click tlacitko pro snadne odstoupeni
- Sankce: az 5 000 000 CZK / 4 % obratu; neinformovani = lhuta 1 rok + 14 dnu

## 4. Reklamace a zaruka

- [ ] Reklamacni rad zverejnen na webu
- [ ] 24mesicni lhuta pro uplatneni vad
- [ ] Vyrizeni do 30 dnu
- [ ] Reklamace zdarma pro spotrebitele
- [ ] Evidence reklamaci (datum, predmet, vysledek)
- [ ] NOVINKA zari 2026: Zaruka 36 mesicu pri oprave
- Sankce: az 5 000 000 CZK / 4 % obratu

## 5. Ceny, DPH, Omnibus

- [ ] Vsechny ceny v CZK vcetne DPH
- [ ] U slev: nejnizsi cena za poslednich 30 dnu (§12a ZOS)
- [ ] Cenova evidence (historie cen)
- [ ] Naklady na doruceni zobrazeny pred checkout
- Sankce: az 5 000 000 CZK / 4 % obratu

## 6. Cookies

- [ ] Cookie consent banner s opt-in
- [ ] Neesencialni cookies blokovany pred souhlasem
- [ ] Rovnocenne tlacitka Prijmout / Odmitnout
- [ ] Zadne predzaskrtnute boxy
- [ ] Zadne cookie walls
- [ ] Granularni volba (analytika vs marketing)
- [ ] Cookie policy s prehledem vsech cookies
- Sankce: statisice CZK (UOOU); GDPR az 20 000 000 EUR / 4 %

## 7. Ochrana osobnich udaju

- [ ] Privacy policy (zasady ochrany osobnich udaju) na webu
- [ ] Pravni zaklad pro kazdy ucel zpracovani
- [ ] Doby uchovani udaju
- [ ] Prava subjektu udaju (pristup, oprava, vymazani, prenositelnost)
- [ ] Zpracovatelske smlouvy s dodavateli (platebni brana, dopravci, emailing, hosting)
- Sankce: az 10 000 000 CZK (UOOU); GDPR az 20 000 000 EUR / 4 %

## 8. Marketing a obchodni sdeleni

- [ ] Opt-in souhlas pro ne-zakazniky
- [ ] Snadne odhlaseni v kazdem emailu (jeden klik)
- [ ] Oznaceni jako obchodni sdeleni
- [ ] Identifikace odesilatele
- [ ] Evidence souhlasu (datum, cas, zdroj)
- Sankce: az 10 000 000 CZK; kazdy nevyzadany email = samostatny prestupek

## 9. Pristupnost (EAA)

- [ ] WCAG 2.1 Level AA (od 28.6.2025 pro NOVE, od 28.6.2030 pro STAVAJICI)
- [ ] Prohlaseni o pristupnosti na webu
- [ ] Vyjimka: mikropodniky (<10 zamestnancu A <2M EUR obrat)
- Sankce: COI — varovani, napravna opatreni, financni sankce

## 10. ADR

- [ ] Informace o mimosoudnim reseni sporu na webu a v obchodnich podminkach
- [ ] Kontakt na COI — oddeleni ADR (Stepanska 567/15, 120 00 Praha 2, https://adr.coi.cz)
- [ ] ODSTRANIT odkaz na ODR platformu (zrusena 20.7.2025)
- Sankce: az 1 000 000 CZK

## 11. Doruceni a prechod rizika

- [ ] Lhuta doruceni uvedena v obchodnich podminkach
- [ ] Naklady na doruceni zobrazeny pred checkout
- [ ] Riziko az pri fyzickem prevzeti (ne pri predani dopravci)
- Bez specificke sankce (obecne ZOS)

## 12. Bezpecnost vyrobku (GPSR)

- [ ] Identifikace vyrobku na listingu (nazev, typ, vyrobce)
- [ ] EU odpovedna osoba (u importu mimo EU)
- [ ] Bezpecnostni upozorneni v cestine
- Sankce: COI, formuje se

## 13. Objednavkovy proces

- [ ] Review step pred potvrzenim (shruti objednavky)
- [ ] Moznost opravy chyb pred odeslanim
- [ ] Tlacitko "Objednat a zaplatit" (jasny platebni zavazek)
- [ ] Potvrzovaci email ihned po objednavce
- [ ] Obchodni podminky prilozeny k emailu (PDF)
- [ ] Archivace textu smlouvy pristupna spotrebiteli
- Sankce: az 5 000 000 CZK / 4 % obratu
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/checklist.md
git commit -m "feat(ecommerce): add compliance checklist reference"
```

---

### Task 16: Create references — upcoming.md

**Files:**
- Create: `plugins/legal/skills/ecommerce/references/upcoming.md`

- [ ] **Step 1: Create the reference file**

```markdown
# Pripravovane zmeny — e-commerce legislativa

> **Udrzba:** Po nabyti ucinnosti presunout pravidlo z teto tabulky do prislusneho reference souboru.

| Zmena | Ucinnost | Zakon/zdroj | Dotcena oblast |
|-------|----------|-------------|----------------|
| Snadne odstoupeni — one-click tlacitko pro odstoupeni | 19.6.2026 | Novela OZ | odstoupeni-od-smlouvy.md |
| Zakaz greenwashingu — zakazana nepodlozena environmentalni tvrzeni | zari 2026 | Novela ZOS + OZ (EU 2024/825) | obchodni-podminky.md |
| Informace o opravitelnosti a zivotnosti vyrobku | zari 2026 | Novela ZOS + OZ (EU 2024/825) | gpsr-bezpecnost.md |
| Prodlouzeni zaruky na 36 mesicu pri oprave | zari 2026 | Novela OZ | reklamace-zaruka.md |
| EET 2.0 (planovane, jeste neschvaleno) | 1.1.2027 | Navrh zakona MF CR | novy soubor |
| Zakon o digitalni ekonomice (DSA adaptace) | ocekavano 2026 | Vladni navrh | novy soubor |

## Detail: Snadne odstoupeni (19.6.2026)

Pokud lze smlouvu uzavrit jednim kliknutim, musi byt i odstoupeni stejne snadne. E-shopy musi pridat tlacitko pro snadne odstoupeni — napr. v zakaznickem uctu u objednavky.

## Detail: Greenwashing (zari 2026)

- Zakaz obecnych environmentalnich tvrzeni bez dukazu ("ekologicke", "setrne k zivotnimu prostredi")
- Povinnost podlozit kazde tvrzeni konkretnimi daty
- Zakaz odkazovat na offsetove programy jako dukaz ekologicnosti

## Detail: Opravitelnost a zivotnost (zari 2026)

- Povinnost informovat o predpokladane zivotnosti vyrobku
- Povinnost informovat o dostupnosti nahradnich dilu
- Index opravitelnosti (u vybranych kategorii)
- Zakaz planovaneho zastaravani

## Detail: Zaruka 36 mesicu (zari 2026)

Pokud spotrebitel u reklamace zvoli OPRAVU (misto vymeny), zarucni doba se automaticky prodluzuje z 24 na 36 mesicu.

## Detail: EET 2.0 (1.1.2027, planovano)

- Zatim neschvaleno — navrh zakona v Poslanecke snemovne (od unora 2026)
- Pokryva "pokladni prijmy" (ne vsechny primy)
- Vyjimky pro nejmenci podnikatele
- Pro e-shopy relevantni hlavne pri kombinaci s kamennym prodejem / osobnim vydejem
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/ecommerce/references/upcoming.md
git commit -m "feat(ecommerce): add upcoming changes reference"
```

---

### Task 17: Update legal-orchestrator routing

**Files:**
- Modify: `plugins/legal/skills/legal-orchestrator/SKILL.md`

- [ ] **Step 1: Add ecommerce routing and priority rule**

In `plugins/legal/skills/legal-orchestrator/SKILL.md`, add a new row to the routing table and a priority rule.

Add this row to the existing routing table:

```markdown
| e-shop, eshop, obchodni podminky, odstoupeni, reklamace, zaruka, vraceni, sleva, Omnibus, cookie lista, DPH, cena, pristupnost, WCAG, ADR, COI, doruceni, zasilka, spotrebitel, distancni, checkout, newsletter, obchodni sdeleni, zbozi, objednavka | `legal:ecommerce` |
```

Add this priority rule after the routing table:

```markdown
**Priorita e-commerce vs. GDPR:** Pokud dotaz matchne keywords pro ecommerce I gdpr zaroven a obsahuje e-shop kontext (e-shop, eshop, obchod, checkout, objednavka, zbozi, zasilka), routuj na `legal:ecommerce`. GDPR skill pouzij jen pro ciste datove otazky bez e-shop kontextu.
```

Update the "BOTH areas" section to include ecommerce:

```markdown
**If query touches BOTH areas** (e.g. "mohu sledovat GPS polohu zaměstnanců během směny", "jak zpracovavat GDPR data na e-shopu"):
1. Apply priority rules (ecommerce context → ecommerce; pure data → gdpr)
2. If still ambiguous: invoke both specialists in parallel
3. **Merge step:** Take the strictest verdict, combine citations
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/skills/legal-orchestrator/SKILL.md
git commit -m "feat(orchestrator): add ecommerce routing with priority rules"
```

---

### Task 18: Update plugin.json

**Files:**
- Modify: `plugins/legal/.claude-plugin/plugin.json`

- [ ] **Step 1: Update description**

Change the description in `plugins/legal/.claude-plugin/plugin.json` from:

```json
"description": "Czech legal compliance — labor law, GDPR, contract validation"
```

to:

```json
"description": "Czech legal compliance — labor law, GDPR, e-commerce legislation, contract validation"
```

- [ ] **Step 2: Commit**

```bash
git add plugins/legal/.claude-plugin/plugin.json
git commit -m "feat(legal): add ecommerce to plugin description"
```

---

### Task 19: Verify and final commit

- [ ] **Step 1: Verify file structure**

Run: `find plugins/legal/skills/ecommerce -type f | sort`

Expected output:
```
plugins/legal/skills/ecommerce/SKILL.md
plugins/legal/skills/ecommerce/references/adr.md
plugins/legal/skills/ecommerce/references/ceny-dph-omnibus.md
plugins/legal/skills/ecommerce/references/checklist.md
plugins/legal/skills/ecommerce/references/cookies.md
plugins/legal/skills/ecommerce/references/doruceni-riziko.md
plugins/legal/skills/ecommerce/references/gpsr-bezpecnost.md
plugins/legal/skills/ecommerce/references/informacni-povinnosti.md
plugins/legal/skills/ecommerce/references/marketing-obchodni-sdeleni.md
plugins/legal/skills/ecommerce/references/obchodni-podminky.md
plugins/legal/skills/ecommerce/references/objednavkovy-proces.md
plugins/legal/skills/ecommerce/references/odstoupeni-od-smlouvy.md
plugins/legal/skills/ecommerce/references/osobni-udaje-eshop.md
plugins/legal/skills/ecommerce/references/pristupnost-eaa.md
plugins/legal/skills/ecommerce/references/reklamace-zaruka.md
plugins/legal/skills/ecommerce/references/upcoming.md
```

Total: 16 files (1 SKILL.md + 15 references)

- [ ] **Step 2: Verify SKILL.md word count**

Run: `wc -w plugins/legal/skills/ecommerce/SKILL.md`

Expected: under 2000 words

- [ ] **Step 3: Verify orchestrator has all 3 routing rows**

Run: `grep -c "legal:" plugins/legal/skills/legal-orchestrator/SKILL.md`

Expected: 3 (labor-law, gdpr, ecommerce)

- [ ] **Step 4: Verify plugin.json mentions ecommerce**

Run: `grep "e-commerce" plugins/legal/.claude-plugin/plugin.json`

Expected: matches

- [ ] **Step 5: Update Claude Code cache**

```bash
cp -r ~/Projects/skills/plugins/legal/. ~/.claude/plugins/cache/skills/legal/1.0.0/
```

- [ ] **Step 6: Create Cowork symlink**

```bash
COWORK="$HOME/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/803e4d51-6951-4e8b-86ba-07e2a6118f12/a8e7d198-e221-402c-b591-385eb8ba7245/skills"
ln -sf ~/Projects/skills/plugins/legal/skills/ecommerce "$COWORK/"
```

- [ ] **Step 7: Push to remote**

```bash
git push origin main
```
