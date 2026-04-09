# Design: legal:ecommerce skill

## Ucel

Skill pro posouzeni pravni compliance ceskeho e-shopu. Pokryva vsechny zakonne povinnosti pro provoz online obchodu v CR.

## Dva mody

### 1. Audit otazky (default)

Uzivatel polozi konkretni otazku ("musim ukazovat nejnizsi cenu za 30 dni?"). Skill odpovi s verdiktem + referencemi na ceske zakony.

### 2. Compliance check

Uzivatel rekne "zkontroluj e-shop" / "compliance audit" / "co vsechno musim mit". Skill projede systematicky vsech 12 oblasti a vypise co chybi.

**Detekce modu:** Pokud dotaz obsahuje "audit", "zkontroluj", "compliance", "co musim", "co potrebuju", "checklist" — compliance check. Jinak audit otazka.

## Architektura

### Vztah k ostatnim skills

- **Self-contained** pro vsechny e-shop otazky (vcetne GDPR/cookies v kontextu e-shopu)
- Pro hloubkovy GDPR rozbor (DPIA, zpracovatelske smlouvy, prava subjektu dat) odkazuje na `legal:gdpr`
- Pro pracovnepravni otazky (brigadnici v e-shopu) odkazuje na `legal:labor-law`
- Orchestrator (`legal:legal-orchestrator`) routuje e-shop dotazy sem

### Bez corpusu

Vsechna pravidla embedded v SKILL.md jako knowledge base s referencemi na paragrafy. Duvody:
- E-commerce pokryva 10+ zakonu (ne 1 jako u gdpr/labor-law)
- Vetsi cast dotazu je checklistoveho typu
- Pro presne citace GDPR uz existuje `gdpr` skill s corpusem
- Jednodussi udrzba

## Jazyk

Cely skill v **cestine** — instrukce, pravidla, response format. Ceska legislativa, cesky uzivatel.

## Zakonova baze

| Zkratka | Plny nazev | Cislo |
|---|---|---|
| OZ | Obcansky zakonik | 89/2012 Sb. |
| ZOS | Zakon o ochrane spotrebitele | 634/1992 Sb. |
| GDPR | Obecne narizeni o ochrane osobnich udaju | EU 2016/679 |
| ZEK | Zakon o elektronickych komunikacich | 127/2005 Sb. |
| ZObS | Zakon o nekterych sluzbach informacni spolecnosti | 480/2004 Sb. |
| ZDPH | Zakon o DPH | 235/2004 Sb. |
| ZPrist | Zakon o pristupnosti | 424/2023 Sb. |
| GPSR | Zakon o obecne bezpecnosti vyrobku | 387/2024 Sb. |

## Struktura SKILL.md

```
1. YAML frontmatter (name, description, trigger phrases)
2. Announce
3. Detekce modu (audit vs. compliance check)
4. KNOWLEDGE BASE — 12 oblasti:
   4.1  Informacni povinnosti (OZ §435, §1811, §1820; ZOS §9-13)
   4.2  Obchodni podminky (OZ §1751-1753, §1810-1820)
   4.3  Odstoupeni od smlouvy (OZ §1829-1837)
   4.4  Reklamace a zaruka (OZ §2099-2174; ZOS §13, §19)
   4.5  Ceny, DPH, Omnibus (ZDPH; ZOS §12, §12a)
   4.6  Cookies (ZEK §89; GDPR)
   4.7  Ochrana osobnich udaju v e-shopu (GDPR, ZObS)
   4.8  Marketing a obchodni sdeleni (ZObS zakon 480/2004)
   4.9  Pristupnost / EAA (ZPrist zakon 424/2023)
   4.10 ADR (ZOS §14, §20d-20n)
   4.11 Doruceni a prechod rizika (OZ §2090-2095, §2121)
   4.12 Bezpecnost vyrobku / GPSR (GPSR zakon 387/2024)
5. COMPLIANCE CHECKLIST — strukturovany checklist vsech povinnosti
6. UPCOMING CHANGES — zmeny 2026-2027
7. Response format
8. Rules
```

### 4. Knowledge base — obsah kazde oblasti

Kazda oblast obsahuje:
- **Zakony:** Presne reference (zakon, paragraf)
- **Pravidla:** Co zakon vyzaduje, v bodech
- **Vyjimky:** Kde se pravidla neuplatni
- **Sankce:** Vyse pokut
- **Prakticke poznamky:** Jak to implementovat na e-shopu

### 5. Compliance checklist

Strukturovany checklist pro compliance check mod:

```markdown
### Web musi zobrazovat:
- [ ] Obchodni jmeno, ICO, DIC, sidlo
- [ ] Zapisy v rejstriku
- [ ] Kontakt: email, telefon, adresa
- [ ] Ceny v CZK vcetne DPH
- [ ] Naklady na doruceni pred checkout
- [ ] Tlacitko "Objednat a zaplatit"

### Pravni dokumenty:
- [ ] Obchodni podminky (19 polozek dle §1820 OZ)
- [ ] Reklamacni rad
- [ ] Vzorovy formular pro odstoupeni
- [ ] Zasady ochrany osobnich udaju
- [ ] Cookie policy + consent banner

### Cookie banner:
- [ ] Blokuje neesencialni cookies pred souhlasem
- [ ] Rovnocenne tlacitko Prijmout/Odmitnout
- [ ] Zadne predzaskrtnute boxy
- [ ] Zadne cookie walls
- [ ] Granularni volba (analytika vs marketing)

### Prava spotrebitele:
- [ ] 14denni odstoupeni bez udani duvodu
- [ ] Vraceni penez do 14 dnu od odstoupeni
- [ ] 24mesicni lhuta na reklamaci
- [ ] Vyrizeni reklamace do 30 dnu
- [ ] Reklamace zdarma
- [ ] ADR info s kontaktem na COI

### Slevy a ceny:
- [ ] Nejnizsi cena za poslednich 30 dni u slev
- [ ] Evidence cen

### Pristupnost (od 28.6.2025, krome mikropodniku):
- [ ] WCAG 2.1 AA
- [ ] Prohlaseni o pristupnosti

### Marketingove emaily:
- [ ] Opt-in souhlas pro ne-zakazniky
- [ ] Snadne odhlaseni v kazdem emailu
- [ ] Oznaceni jako obchodni sdeleni

### Bezpecnost vyrobku (GPSR):
- [ ] Identifikace vyrobku na listingu
- [ ] EU odpovedna osoba
- [ ] Bezpecnostni upozorneni v cestine
```

### 6. Upcoming changes

| Zmena | Ucinnost | Zdroj |
|-------|----------|-------|
| Snadne odstoupeni (one-click tlacitko) | 19.6.2026 | Novela OZ |
| Zakaz greenwashingu, informace o opravitelnosti | zari 2026 | Novela ZOS + OZ (EU 2024/825) |
| Prodlouzeni zaruky na 3 roky pri oprave | zari 2026 | Novela OZ |
| EET 2.0 (planovane) | 1.1.2027 | Navrh zakona MF CR |

### 7. Response format

```markdown
## Pravni posouzeni: [tema]

**Verdikt:** KOMPATIBILNI / RIZIKO / NEKOMPATIBILNI

### Relevantni ustanoveni
- § XX odst. Y [zkratka zakona] (zakon c. XX/YYYY Sb.): [pravidlo]

### Analyza
[jak se to vztahuje na konkretni situaci]

### Doporuceni
1. [konkretni akce]

### Upozorneni
Toto neni pravni porada. Overte s pravnikem.
```

Pro compliance check mod: tabulka oblasti s verdiktem + seznam chybejicich polozek.

### 8. Rules

- Nikdy nefabrikovat cisla paragrafu — pouzivat jen to co je v knowledge base
- Pro hloubkovy GDPR rozbor odkazat na `legal:gdpr`
- Pro pracovnepravni otazky odkazat na `legal:labor-law`
- Vzdy uvest disclaimer "Toto neni pravni porada"
- Kdyz otazka presahuje scope knowledge base, rici to explicitne
- Verdikt RIZIKO pouzit kdyz odpoved zavisi na konkretni implementaci

## Orchestrator update

Pridat radek do routing tabulky v `legal-orchestrator/SKILL.md`:

```
| e-shop, eshop, obchodni podminky, odstoupeni, reklamace, zaruka, vraceni, sleva, Omnibus, cookie, DPH, cena, pristupnost, WCAG, ADR, COI, doruceni, zasilka, spotrebitel, distancni, checkout, newsletter, obchodni sdeleni | `legal:ecommerce` |
```

## Soubory k vytvoreni/upravit

1. **Novy:** `plugins/legal/skills/ecommerce/SKILL.md` — hlavni skill
2. **Upravit:** `plugins/legal/skills/legal-orchestrator/SKILL.md` — pridat routing
3. **Upravit:** `plugins/legal/.claude-plugin/plugin.json` — overit ze skills discovery funguje

## Zdrojova data

Research: `docs/research/2026-04-09-czech-ecommerce-legislation.md`
