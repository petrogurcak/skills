# Design: legal:ecommerce skill

## Ucel

Skill pro posouzeni pravni compliance ceskeho e-shopu. Pokryva vsechny zakonne povinnosti pro provoz online obchodu v CR.

## Tri mody

### 1. Audit otazky (default)

Uzivatel polozi konkretni otazku ("musim ukazovat nejnizsi cenu za 30 dni?"). Skill odpovi s verdiktem + referencemi na ceske zakony.

### 2. Compliance check

Uzivatel rekne "zkontroluj e-shop" / "compliance audit" / "co vsechno musim mit". Skill projede systematicky vsech 13 oblasti a vypise co chybi.

### 3. Planning mode

Uzivatel planuje novy e-shop ("chystam e-shop", "co budu potrebovat", "zakladam obchod"). Skill vypise pozadavky jako build checklist — co pripravit pred spustenim, ne co chybi.

**Detekce modu:**
- Planning: "chystam", "zakladam", "planuji", "novy e-shop", "pred spustenim", "co budu potrebovat"
- Compliance check: "audit", "zkontroluj", "compliance", "co musim", "co potrebuju", "checklist"
- Default: audit otazka

## Architektura

### Vztah k ostatnim skills

- **Self-contained** pro vsechny e-shop otazky (vcetne GDPR/cookies v kontextu e-shopu)
- Pro hloubkovy GDPR rozbor (DPIA, zpracovatelske smlouvy, prava subjektu dat) odkazuje na `legal:gdpr`
- Pro pracovnepravni otazky (brigadnici v e-shopu) odkazuje na `legal:labor-law`
- Orchestrator (`legal:legal-orchestrator`) routuje e-shop dotazy sem

### Progressive disclosure — knowledge base v references/

SKILL.md obsahuje **jen** proces, detekci modu, response format a rules (~1500 slov).
Knowledge base je v `references/` souborech — skill je cte pres Read tool az kdyz je potrebuje.

```
plugins/legal/skills/ecommerce/
├── SKILL.md                          # Proces, routing, format, rules
└── references/
    ├── informacni-povinnosti.md      # OZ §435, §1811, §1820; ZOS §9-13
    ├── obchodni-podminky.md          # OZ §1751-1753, §1810-1826
    ├── odstoupeni-od-smlouvy.md      # OZ §1829-1837
    ├── reklamace-zaruka.md           # OZ §2099-2174; ZOS §13, §19
    ├── ceny-dph-omnibus.md           # ZDPH; ZOS §12, §12a
    ├── cookies.md                    # ZEK §89; GDPR
    ├── osobni-udaje-eshop.md         # GDPR, ZObS
    ├── marketing-obchodni-sdeleni.md # ZObS zakon 480/2004
    ├── pristupnost-eaa.md            # ZPrist zakon 424/2023
    ├── adr.md                        # ZOS §14, §20d-20n
    ├── doruceni-riziko.md            # OZ §2090-2095, §2121
    ├── gpsr-bezpecnost.md            # GPSR zakon 387/2024
    ├── objednavkovy-proces.md        # OZ §1824-1826 (review step, archivace)
    ├── checklist.md                  # Compliance checklist (vsechny oblasti)
    └── upcoming.md                   # Pripravovane zmeny 2026-2027
```

**Proc:** Anthropic skills guide doporucuje SKILL.md pod 5000 slov. Knowledge base pro 13 oblasti by prekrocila limit. References se ctou on-demand — audit otazka na cookies nacte jen `cookies.md`, compliance check nacte `checklist.md`.

## Jazyk

Cely skill v **cestine** — instrukce, pravidla, response format, references. Ceska legislativa, cesky uzivatel.

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
3. Detekce modu (audit vs. compliance check vs. planning)
4. Mapovani oblasti na references/ soubory
5. Proces pro kazdy mod:
   - Audit: identifikuj oblast → Read prislusny reference → odpovez
   - Compliance: Read checklist.md → projdi systematicky
   - Planning: Read checklist.md → preformuluj jako build checklist
6. Response format (verdikt + reference + doporuceni + disclaimer)
7. Rules
```

## Obsah references/ souboru

Kazdy reference soubor obsahuje:
- **Zakony:** Presne reference (zakon, paragraf)
- **Pravidla:** Co zakon vyzaduje, v bodech
- **Vyjimky:** Kde se pravidla neuplatni
- **Sankce:** Vyse pokut (konkretni castky)
- **Prakticke poznamky:** Jak to implementovat na e-shopu

### Oblast 4.13 (nova): Objednavkovy proces

Pokryva OZ §1824-1826:
- §1824: Potvrzeni na trvalem nosici ihned po uzavreni smlouvy
- §1825: Objednavkovy proces musi obsahovat review step pred potvrzenim, moznost opravy chyb
- §1826: Text smlouvy musi byt archivovan a pristupny spotrebiteli

### Compliance checklist (checklist.md)

Strukturovany checklist vsech povinnosti vcetne sankci. Pouziva se v compliance check i planning modu.

### Upcoming changes (upcoming.md)

Separatni soubor pro snadnou aktualizaci:

| Zmena | Ucinnost | Zdroj |
|-------|----------|-------|
| Snadne odstoupeni (one-click tlacitko) | 19.6.2026 | Novela OZ |
| Zakaz greenwashingu, informace o opravitelnosti | zari 2026 | Novela ZOS + OZ (EU 2024/825) |
| Prodlouzeni zaruky na 3 roky pri oprave | zari 2026 | Novela OZ |
| EET 2.0 (planovane) | 1.1.2027 | Navrh zakona MF CR |

**Udrzba:** Po ucinnosti zakona presunout z upcoming.md do prislusneho reference souboru.

## Response format

### Audit mod

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

### Compliance check mod

```markdown
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

```markdown
## E-shop — co pripravit pred spustenim

### 1. Pravni dokumenty k vytvoreni
- [ ] Obchodni podminky (§1820 OZ — 19 povinnych bodu)
- [ ] ...

### 2. Technicke pozadavky na web
- [ ] Cookie consent banner (§89 ZEK)
- [ ] ...

### 3. Provozni procesy
- [ ] Postup reklamace (§19 ZOS — 30 dnu)
- [ ] ...

### Upozorneni
Toto neni pravni porada. Overte s pravnikem.
```

## Rules

- Nikdy nefabrikovat cisla paragrafu — pouzivat jen to co je v references/
- Pro hloubkovy GDPR rozbor odkazat na `legal:gdpr`
- Pro pracovnepravni otazky odkazat na `legal:labor-law`
- Vzdy uvest disclaimer "Toto neni pravni porada"
- Kdyz otazka presahuje scope knowledge base, rici to explicitne
- Verdikt RIZIKO pouzit kdyz odpoved zavisi na konkretni implementaci
- Upcoming changes vzdy zminit pokud se tykaji dotazu

## Orchestrator update

Upravit routing tabulku v `legal-orchestrator/SKILL.md`:

1. **Pridat ecommerce radek** s e-shop keywords
2. **Pridat prioritni pravidlo:** Pokud dotaz obsahuje e-shop kontext (e-shop, eshop, obchod, checkout, objednavka, zbozi, zasilka), routuj na `legal:ecommerce` — i kdyz obsahuje GDPR/cookies keywords. GDPR skill se pouzije jen pro ciste datove otazky bez e-shop kontextu.

```
| e-shop, eshop, obchodni podminky, odstoupeni, reklamace, zaruka, vraceni, sleva, Omnibus, cookie lista, DPH, cena, pristupnost, WCAG, ADR, COI, doruceni, zasilka, spotrebitel, distancni, checkout, newsletter, obchodni sdeleni, zbozi, objednavka | `legal:ecommerce` |
```

**Priorita:** Pokud dotaz matchne keywords pro ecommerce I gdpr zaroven a obsahuje e-shop kontext → ecommerce. Bez e-shop kontextu → gdpr.

## Soubory k vytvoreni/upravit

1. **Novy:** `plugins/legal/skills/ecommerce/SKILL.md` — hlavni skill (~1500 slov)
2. **Novy:** `plugins/legal/skills/ecommerce/references/` — 15 souboru knowledge base
3. **Upravit:** `plugins/legal/skills/legal-orchestrator/SKILL.md` — pridat routing + prioritu
4. **Upravit:** `plugins/legal/.claude-plugin/plugin.json` — pridat ecommerce do popisu

## Zdrojova data

Research: `docs/research/2026-04-09-czech-ecommerce-legislation.md`

## Review log

- **2026-04-09:** Plan-challenger review — 2 CRITICAL, 4 WARNING, 3 INFO
- **Opravy:** C1 (progressive disclosure), C2 (routing priorita), W1 (+objednavkovy proces), W2 (+planning mode), W4 (upcoming do references/)
