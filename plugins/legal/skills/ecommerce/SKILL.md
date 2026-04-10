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

```
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
```

### Compliance check mod

```
## E-shop compliance audit

| Oblast | Verdikt | Poznamka |
|--------|---------|----------|
| Informacni povinnosti | OK/CHYBI/RIZIKO | ... |
| ... | ... | ... |

### Chybejici polozky
1. [co chybi + reference na zakon]

### Upozorneni
Toto neni pravni porada. Overte s pravnikem.
```

### Planning mod

```
## E-shop — co pripravit pred spustenim

### 1. Pravni dokumenty k vytvoreni
- [ ] ...

### 2. Technicke pozadavky na web
- [ ] ...

### 3. Provozni procesy
- [ ] ...

### Upozorneni
Toto neni pravni porada. Overte s pravnikem.
```

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
