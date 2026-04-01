---
name: brand-strategy
description: Use when building a new brand, repositioning an existing brand, or defining brand identity before naming or visual design. Trigger phrases — "brand strategy", "brand identity", "brand positioning", "buduj znacku", "brand archetyp", "positioning", "brand prism", "znackova strategie".
---

# Brand Strategy

Strategic foundation for brands — from customer insight through positioning, narrative, personality, to distinctive assets. Synthesizes Dunford, Neumeier, Miller, Kapferer, Pearson/Mark, Sharp, Wheeler, Aaker, and Behavio into one actionable process.

## Overview

Brand strategy defines WHO the brand is, WHY it exists, and HOW it shows up. This skill walks through 5 steps that produce a complete Brand Strategy Document — the foundation for all downstream work (naming, voice, visual identity, copy).

## When to Use

- Building a new brand from scratch (startup, product, service)
- Redefining/repositioning an existing brand
- Creating strategic foundation before naming or visual identity
- Defining brand personality, archetypes, and positioning

## When NOT to Use

- Just naming a brand (use `brand-naming`)
- Just defining tone of voice (use `brand-voice` from copywriting)
- Just designing a logo (use `logo-design`)

## Quick Reference

| Step | Focus                  | Key Frameworks                                            | Output                                                      |
| ---- | ---------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| 1    | Customer & Competition | Dunford Positioning, Miller SB7                           | Customer persona, competitive alternatives, 3-level problem |
| 2    | Positioning            | Dunford 5-Component, Neumeier Onliness, Blue Ocean ERRC   | ERRC grid, value map, Onliness Statement                    |
| 3    | Narrative              | Miller SB7 BrandScript, Kapferer Prism                    | BrandScript, One-Liner, relationship profile                |
| 4    | Personality            | Pearson/Mark Archetypes, Aaker 5 Dimensions               | 70/30 archetype mix, personality matrix                     |
| 5    | Assets                 | Sharp Distinctive Assets, Wheeler Cognition, Behavio CEPs | Asset grid, CEP map, visual brief                           |

## Common Mistakes

- Starting with visual identity before strategy (logo before positioning)
- Picking archetype by "what sounds cool" instead of customer motivation
- Writing Onliness Statement that isn't actually unique (test: does "JEDINA" ring true?)
- Skipping internal problem in SB7 (customers buy solutions to INTERNAL problems)
- Too many CEPs — focus on 5-7 where you can realistically win

## Integration

| Skill                          | Relationship                                                           |
| ------------------------------ | ---------------------------------------------------------------------- |
| `brand-naming`                 | OUTPUT -> feeds naming brief (Step 2 positioning + Step 4 personality) |
| `brand-voice` (copywriting)    | OUTPUT -> feeds voice definition (Step 4 personality matrix)           |
| `logo-design`                  | OUTPUT -> feeds visual brief (Step 5 distinctive assets)               |
| `uvp-optimization` (marketing) | INPUT -> existing UVP can inform Step 2                                |
| `storytelling` (copywriting)   | OUTPUT -> Step 3 BrandScript feeds story-driven content                |

---

## Process

### Step 0: Load Existing Context

```
Does a brand brief, brand-voice doc, or previous strategy exist?
|- YES -> Load it, extract what's already decided, skip resolved steps
|- NO -> Start from Step 1
```

---

### Step 1: Customer Insight & Competitive Context

**Goal:** Understand the customer's world and the real competitive landscape before defining the brand.

**Frameworks:** Dunford 10-Step Positioning (Steps 1, 4), Miller SB7 (Principles 1-2), Wheeler Phase 1

**Ask one question at a time:**

1. **Who loves you?** "Kdo jsou lide, kteri uz vas produkt/sluzbu pouzivaji a maji ho radi? Pokud zatim nemáte — kdo je vas idealni zakaznik?" (Dunford Step 1)

2. **What would they use instead?** "Kdyby vas produkt zitra zmizel, co by zakaznici pouzili misto nej? Nejen prime konkurenty — i Excel, pen-and-paper, nebo 'nic nedělat'." (Dunford Step 4)

3. **Three-level problem:**
   - **External:** "Jaky hmatatelny problem zakaznik resi?" (napr. kapajici kohoutek)
   - **Internal:** "Jak se kvuli tomu citi?" (napr. frustrace, pocit neschopnosti)
   - **Philosophical:** "Proc je nespravedlive, ze tento problem maji?" (napr. "Nemeli byste travit vikendy opravami")
     (Miller SB7 Principles 1-2)

4. **Target market psychographics:** "Jaka je psychografie vasich zakazniku? (postoje, hodnoty, chovani — ne jen demografie)" (Wheeler Phase 1)

```
[WAIT FOR ANSWERS]
```

**Output:** Uloz jako strukturovany dokument:

```markdown
## Customer Insight & Competitive Context

### Target Customer

- Popis:
- Psychografie:

### Competitive Alternatives

1. [Alternative] — proc by ji zvolili
2. [Alternative] — proc by ji zvolili
3. "Nedelat nic" — proc je to real option

### 3-Level Problem

- External: [hmatatelny problem]
- Internal: [jak se kvuli tomu citi]
- Philosophical: [proc je to nespravedlive]
- Villain: [kdo/co ztělesňuje problém]
```

---

### Step 2: Core Value & Market Positioning

**Goal:** Differentiate the brand and claim a specific market position.

**Frameworks:** Dunford 5-Component Positioning (Steps 5-8), Neumeier Onliness Statement + Zag, Blue Ocean ERRC Grid, Neumeier 5 Disciplines (Differentiate)

**2a. ERRC Grid (Blue Ocean)**

Prezentuj 4 otazky o oborovych standardech:

| Akce          | Otazka                                                                |
| ------------- | --------------------------------------------------------------------- |
| **Eliminate** | Ktere faktory, ktere obor bere za samozrejme, muzete UPLNE ODSTRANIT? |
| **Reduce**    | Ktere faktory muzete VYRAZNE SNIZIT pod oborovy standard?             |
| **Raise**     | Ktere faktory muzete VYRAZNE ZVYSIT nad oborovy standard?             |
| **Create**    | Ktere faktory, ktere obor nikdy nenabidl, muzete VYTVORIT?            |

```
[WAIT FOR ANSWERS — vyplnte grid]
```

**2b. Unique Attributes -> Value Mapping (Dunford)**

Na zaklade ERRC gridu a competitive alternatives z Step 1:

1. "Jake unikatni vlastnosti mate, ktere vase alternativy nemaji?" (Dunford Step 5)
2. "Jaky prinos tyto vlastnosti doruci zakaznikovi? Vlastnost = co to dela. Hodnota = co z toho zakaznik ma." (Dunford Step 6)
3. "Komu na teto hodnote zalezi NEJVIC?" (Dunford Step 7)

**2c. Market Category (Dunford)**

Prezentuj 3 typy framovani trhu:

| Typ                      | Kdy pouzit                                                | Riziko                           |
| ------------------------ | --------------------------------------------------------- | -------------------------------- |
| **Head to Head**         | Mate jasnou prevahu v existujici kategorii                | Vysoke — musíte porazit lidera   |
| **Big Fish, Small Pond** | Nemuzete porazit lidera, ale muzete dominovat podsegmentu | Nizke — nejbezpecnejsi cesta     |
| **Create New Category**  | Produkt nedava smysl v zadne existujici kategorii         | Velmi vysoke — musíte edukat trh |

"Ktery typ nejlepe popisuje vasi situaci?" (Dunford Step 8)

```
[WAIT FOR ANSWER]
```

**2d. Onliness Statement (Neumeier)**

Na zaklade vsech predchozich odpovedi formuluj:

> "Nase znacka je JEDINA **[kategorie]**, ktera **[benefit/rozdil]** pro **[publikum]** v **[lokalita/kontext]**, kteri chteji **[potreba/touha]**."

**Test spravnosti:** Pokud slovo "JEDINA" nezni pravdive, je strategie slaba. Bud zuzit kategorii, nebo inovovat produkt.

**Output:**

```markdown
## Positioning

### ERRC Grid

| Eliminate | Reduce | Raise | Create |
| --------- | ------ | ----- | ------ |
| ...       | ...    | ...   | ...    |

### Value Mapping

- Unique Attribute -> Value:
  1. [attribute] -> [value for customer]
  2. [attribute] -> [value for customer]

### Market Category

- Typ: [Head to Head / Big Fish Small Pond / New Category]
- Kategorie: [nazev]

### Onliness Statement

> "[vyplneny statement]"
```

---

### Step 3: Brand Narrative & Customer Relationship

**Goal:** Pretvořit strategii do příběhu, definovat jak znacka interaguje se zakaznikem.

**Frameworks:** Miller StoryBrand SB7 (Principles 3-7), Kapferer Brand Identity Prism (Culture, Relationship, Reflection, Self-Image), Freytag Drama Arc

**3a. StoryBrand BrandScript**

Vyplnte 7 prvku SB7 s pouzitim dat z Step 1 a 2:

| SB7 Prvek       | Otazka                                | Odpoved                                                   |
| --------------- | ------------------------------------- | --------------------------------------------------------- |
| **1. Hrdina**   | Co presne hrdina chce?                | (ze Step 1 — target customer)                             |
| **2. Problem**  | Kdo je padouch? Ext/Int/Phil problem? | (ze Step 1 — 3-level problem)                             |
| **3. Pruvodce** | Jak ukazete EMPATII a AUTORITU?       | "Chapeme, jake to je..." + "Pomohli jsme 500 klientum..." |
| **4. Plan**     | Jake 3 kroky vedou k vysledku?        | 1. **_ 2. _** 3. \_\_\_                                   |
| **5. CTA**      | Jaka je prima vyzva k akci?           | [hlavni tlacitko]                                         |
| **6. Sazky**    | Co se stane kdyz si nekoupi?          | [negativni dusledky]                                      |
| **7. Uspech**   | Jak vypada zivot "pote"?              | [3 benefity + identity transformation]                    |

```
[WAIT — vyplnte BrandScript]
```

**3b. One-Liner Formula (Miller)**

Na zaklade BrandScriptu formuluj:

> "Mnoho **[cilova skupina]** bojuje s **[padouch/problem]**. My nabizime **[produkt/sluzba]**, diky kteremu **[uspesny vysledek]**."

**3c. Brand Relationship & Culture (Kapferer)**

1. **Culture:** "Co je 'duse' vasi znacky? Z jakych hodnot, ideologie nebo tradice cerpate?" (Kapferer)
2. **Relationship:** "Jaky typ vztahu chcete mit se zakaznikem? (mentor, pritel, sluha, inspirator, tymovy hrac)" (Kapferer)
3. **Reflection:** "Jak vypada stereotypni uzivatel vasi znacky v ocich ostatnich?" (Kapferer — pozor: ne kdo zakaznik JE, ale jak ho znacka vykresluje)
4. **Self-Image:** "Jak se zakaznik CITI sam o sobe, kdyz vas produkt pouziva?" (Kapferer)

**3d. Identity Transformation (Miller)**

"Kym je vas zakaznik PRED pouzitim vaseho produktu, a kym se STANE pote?"

| Pred            | Po            |
| --------------- | ------------- |
| [identita pred] | [identita po] |

**Output:**

```markdown
## Brand Narrative

### BrandScript (SB7)

1. Hrdina: ...
2. Problem (Ext/Int/Phil): ...
3. Pruvodce (Empatie + Autorita): ...
4. Plan (3 kroky): ...
5. CTA: ...
6. Sazky: ...
7. Uspech: ...

### One-Liner

> "..."

### Kapferer Relationship

- Culture: ...
- Relationship type: ...
- Reflection: ...
- Self-Image: ...

### Identity Transformation

| Pred | Po  |
| ---- | --- |
| ...  | ... |
```

---

### Step 4: Brand Personality & Archetypes

**Goal:** Definovat psychologicky charakter znacky. Vystup primo napojen na brand-voice skill.

**Frameworks:** Pearson & Mark 12 Brand Archetypes, Aaker 5 Dimensions of Brand Personality, Kapferer Prism (Personality)

**4a. Archetyp Selection**

Prezentuj 4 kvadranty a pomoz uzivateli vybrat:

**Motivace -> Archetyp:**

| Motivace         | Cíl                    | Archetypy                     |
| ---------------- | ---------------------- | ----------------------------- |
| **Stability**    | Kontrola, poradek      | Tvurce, Pecovatel, Vladce     |
| **Independence** | Seberealizace, svoboda | Nevinatko, Objevitel, Mudrc   |
| **Belonging**    | Spojeni s ostatnimi    | Vsedni clovek, Milenec, Klaun |
| **Mastery**      | Riziko, zmena          | Rebel, Mag, Hrdina            |

**Rozhodovaci strom:**

1. "Kdo je vas uhlavni nepritel?"
   - Chaos -> Stability
   - Nuda/Omezeni -> Independence
   - Osamelost -> Belonging
   - Slabost/Stagnace -> Mastery

2. "Jaka je vase cenova hladina?"
   - Exkluzivni -> Vladce, Milenec, Mag
   - Dostupna -> Vsedni clovek, Nevinatko, Klaun

3. "Jak se chováte v krizi?"
   - Analyzujeme -> Mudrc
   - Bojujeme -> Hrdina
   - Pecujeme -> Pecovatel
   - Inovujeme -> Tvurce

**70/30 Rule:** Zvolte jeden **Core Archetype** (70% osobnosti) a jeden **Influencer Archetype** (30% pro diferenciaci).

```
[WAIT — uzivatel vybere]
```

**Pro vybrany archetyp prezentuj:**

- Motivace, cil, strategie, strach, dark side
- 3-5 znacek jako priklady
- Dopad na ton of voice, vizual, storytelling

**4b. Brand Personality Dimensions (Aaker)**

Na zaklade archetypu ohodnot 5 dimenzi 1-5:

| Dimenze            | Facety                            | Score 1-5 |
| ------------------ | --------------------------------- | --------- |
| **Sincerity**      | Prizemnost, poctivost, srdecnost  |           |
| **Excitement**     | Odvaha, energie, predstavivost    |           |
| **Competence**     | Spolehlivost, inteligence, uspech |           |
| **Sophistication** | Sarm, elegance, prestiz           |           |
| **Ruggedness**     | Outdoorovost, houževnatost, sila  |           |

Top 1-2 dimenze urcuji brand voice smer.

**4c. Kapferer Personality Summary**

Na zaklade vsech predchozich odpovedi — "Kdyby znacka byla clovek":

- Jak by mluvila?
- Jake by mela obleceni?
- Kde by travila volny cas?
- Koho by mela za pratele?

**Output:**

```markdown
## Brand Personality

### Archetypes

- Core (70%): [archetyp] — [kratky popis]
- Influencer (30%): [archetyp] — [kratky popis]

### Aaker Dimensions

| Dimenze                     | Score |
| --------------------------- | ----- |
| Sincerity                   | X/5   |
| Excitement                  | X/5   |
| Competence                  | X/5   |
| Sophistication              | X/5   |
| Ruggedness                  | X/5   |
| **Dominant:** [top dimenze] |

### Personality Profile

- Mluvi jako: ...
- Obleka: ...
- Travi cas: ...
- Pratele: ...
```

---

### Step 5: Distinctive Assets & Mental Availability

**Goal:** Pretvořit strategickou identitu do rozpoznatelnych, zapamatovatelnych prvku.

**Frameworks:** Sharp/Romaniuk Distinctive Asset Grid + CEPs, Wheeler Sequence of Cognition + Phase 3, Kapferer Prism (Physique), Behavio 4 Levels

**5a. Sequence of Cognition (Wheeler)**

Mozek rozpoznava v tomto poradi:

1. **Shape** (tvar) — nejrychlejsi, cteni neni potreba
2. **Color** (barva) — spousti emoci a asociaci
3. **Form/Content** (text) — nejpomalejsi, vyzaduje dekodovani

"Na zaklade osobnosti z Step 4:

- Jaky primarni tvar nejlepe reprezentuje vasi znacku? (geometricky, organicky, ostrý, měkký)
- Jaka signaturni barva? (a proc — co evokuje?)
- Jaky typograficky styl?" (Wheeler Phase 3)

**5b. Kapferer Physique**

"Jake jsou hmatatelne fyzicke vlastnosti vasi znacky? Co zakaznik VIDI, SLYSI, CITI?"

- Vizualni prvky (logo shape, barva, font)
- Zvukove prvky (jingle, sound logo, hlas)
- Hmatove/senzorické (textura, material, vune)

**5c. Distinctive Asset Grid (Sharp/Romaniuk)**

Pro kazdy navrzeny asset ohodnot:

| Asset            | Fame (znamost) | Uniqueness (unikatnost) | Akce                       |
| ---------------- | -------------- | ----------------------- | -------------------------- |
| Logo shape       | Low/Med/High   | Low/Med/High            | Invest / Maintain / Retire |
| Signaturni barva |                |                         |                            |
| Font             |                |                         |                            |
| Zvuk/jingle      |                |                         |                            |
| Maskot/postava   |                |                         |                            |
| Slogan/tagline   |                |                         |                            |

**Cil:** Vsechny assety v pravo nahore (High Fame + High Uniqueness).

- High Unique, Low Fame -> Investovat do povedomí
- High Fame, Low Unique -> Genericky, potreba diferenciace
- Low/Low -> Retirovat nebo redesignovat

**5d. Category Entry Points (Sharp/Behavio)**

"V jakych SITUACICH by si mel zakaznik na vas vzpomenout?"

Definuj 5-7 CEPs:

| CEP (situace)          | Spojeni se znackou? | Akce    |
| ---------------------- | ------------------- | ------- |
| "Potrebuji [X]..."     | Slabe/Stredni/Silne | Budovat |
| "Hledam [Y]..."        |                     |         |
| "Mam problem s [Z]..." |                     |         |

**Behavio 4 Levels Check:**

1. Poznaji me? (Distinctive Assets) -> Step 5b
2. Pamatuji si me? (Mental Availability) -> Step 5d CEPs
3. Vyberou si me? (Preference) -> Step 2 positioning
4. Stoji jim za to? (Value) -> Step 2 value mapping

**Output:**

```markdown
## Distinctive Assets & Mental Availability

### Sequence of Cognition

- Primary Shape: ...
- Signature Color: ... (evokuje: ...)
- Typography: ...

### Physique (Kapferer)

- Visual: ...
- Sound: ...
- Sensory: ...

### Distinctive Asset Grid

| Asset | Fame | Uniqueness | Action |
| ----- | ---- | ---------- | ------ |
| ...   | ...  | ...        | ...    |

### Category Entry Points

| CEP | Current Strength | Action |
| --- | ---------------- | ------ |
| ... | ...              | ...    |
```

---

### Step 6: Final Deliverable — Brand Strategy Document

Kompiluj vsechny vystupy do jednoho dokumentu:

```markdown
# Brand Strategy: [NAZEV ZNACKY]

## 1. Customer Insight

[ze Step 1]

## 2. Positioning

[ze Step 2 — ERRC, Value Mapping, Market Category, Onliness Statement]

## 3. Brand Narrative

[ze Step 3 — BrandScript, One-Liner, Kapferer Relationship, Transformation]

## 4. Brand Personality

[ze Step 4 — Archetypes 70/30, Aaker Dimensions, Personality Profile]

## 5. Distinctive Assets

[ze Step 5 — Sequence of Cognition, Asset Grid, CEPs]

---

## Dalsi kroky

- [ ] **Naming:** Pouzij `brand-naming` skill s timto briefem
- [ ] **Brand Voice:** Pouzij `brand-voice` skill s personality profilem
- [ ] **Logo:** Pouzij `logo-design` skill s distinctive asset briefem
- [ ] **Web Copy:** Pouzij `storytelling` nebo `web-copy` skill s BrandScriptem
- [ ] **Trademark check:** EUIPO/USPTO pro vybrany nazev
```

"Chces nektery krok projit znovu, nebo upravit neco v dokumentu?"

---

## Reference

### Klicove frameworky

| Framework              | Autor                         | Kniha                      | Pouziti v skillu                                                        |
| ---------------------- | ----------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| 10-Step Positioning    | April Dunford                 | Obviously Awesome          | Step 1-2 — competitive alternatives, positioning                        |
| StoryBrand SB7         | Donald Miller                 | Building a StoryBrand      | Step 1 (problem), Step 3 (narrative)                                    |
| Onliness Statement     | Marty Neumeier                | Zag                        | Step 2 — radical differentiation                                        |
| 5 Disciplines          | Marty Neumeier                | The Brand Gap              | Step 2 (differentiate), Step 5 (validate)                               |
| ERRC Grid              | Kim & Mauborgne               | Blue Ocean Strategy        | Step 2 — value innovation                                               |
| Brand Identity Prism   | Jean-Noel Kapferer            | Strategic Brand Management | Step 3 (culture, relationship), Step 4 (personality), Step 5 (physique) |
| 12 Brand Archetypes    | Margaret Mark & Carol Pearson | The Hero and the Outlaw    | Step 4 — archetype selection                                            |
| 5 Dimensions           | Jennifer Aaker                | Brand Personality (1997)   | Step 4 — personality scoring                                            |
| Distinctive Asset Grid | Byron Sharp & Jenni Romaniuk  | How Brands Grow            | Step 5 — asset fame/uniqueness                                          |
| Sequence of Cognition  | Alina Wheeler                 | Designing Brand Identity   | Step 5 — shape > color > form                                           |
| 5-Phase Process        | Alina Wheeler                 | Designing Brand Identity   | Overall structure inspiration                                           |
| CBBE Pyramid           | Kevin Lane Keller             | Strategic Brand Management | Step 5 — brand equity levels                                            |
| 4 Levels of Brand      | Behavio                       | Atlas znacek               | Step 5 — Czech market context                                           |

### Neumeier Zag — 17 Checkpoints (validation)

Use after Step 5 as final validation checklist:

1. Kdo jste? (zakladni vasen)
2. Co delate? (core kompetence)
3. Jaka je vase vize?
4. V cem jste JEDINI? (Onliness Statement)
5. Co vynechate? (co NEbudete delat)
6. Kdo je vas nepritel?
7. Jak vam rikaji? (nazev)
8. Jak o sobe mluvite? (tagline)
9. Jak vypadate? (designovy kod)
10. Kdo je vas kmen? (zakaznici)
11. Kdo jsou vasi partneri?
12. Jak se o vas lide dozvi?
13. Jak si vas lide oblibi?
14. Jak se udrzite v pameti?
15. Jak si ziskate duveru?
16. Jak se rozsirite?
17. Jak se ochranite?
