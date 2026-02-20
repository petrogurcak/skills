---
name: keyword-research
description: Use when researching keywords for SEO, content strategy, or new projects - systematic framework for discovering, analyzing, and prioritizing keywords using free tools
---

# Keyword Research

**When to use this skill:**

- Starting new website/project and need keyword strategy
- Planning content calendar based on search demand
- Finding low-competition opportunities (quick wins)
- Analyzing competitor keyword gaps
- Building topic clusters for SEO

**When NOT to use:**

- Already have keywords, need to optimize page → use `seo-optimization`
- Writing content → use `web-copy`
- Setting up analytics → use `analytics-setup`

---

## Quick Router

| User says...                            | Go to...                |
| --------------------------------------- | ----------------------- |
| "najdi klíčová slova", "keyword ideas"  | Phase 1: Discovery      |
| "long-tail keywords", "rozšíř seznam"   | Phase 2: Expansion      |
| "difficulty", "volume", "analyzuj"      | Phase 3: Analysis       |
| "prioritizuj", "quick wins", "co cílit" | Phase 4: Prioritization |
| "kompletní keyword research"            | All phases sequentially |

---

## Free Tools Stack

| Nástroj                    | Účel                      | Limit       | URL                                                                                  |
| -------------------------- | ------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| **Google Keyword Planner** | Volume, competition       | Unlimited\* | [ads.google.com/keyword-planner](https://ads.google.com/home/tools/keyword-planner/) |
| **Ubersuggest**            | Volume, difficulty, ideas | 3/den       | [neilpatel.com/ubersuggest](https://neilpatel.com/ubersuggest/)                      |
| **AlsoAsked**              | PAA questions, mind maps  | 3/den       | [alsoasked.com](https://alsoasked.com/)                                              |
| **Google Trends**          | Seasonality, trends       | Unlimited   | [trends.google.com](https://trends.google.com/)                                      |
| **AnswerThePublic**        | Question keywords         | 3/den       | [answerthepublic.com](https://answerthepublic.com/)                                  |
| **Google Search Console**  | Existing rankings         | Unlimited   | [search.google.com/search-console](https://search.google.com/search-console)         |
| **Keywords Everywhere**    | Chrome extension          | $10/rok     | [keywordseverywhere.com](https://keywordseverywhere.com/)                            |

\*Vyžaduje Google Ads účet (nemusíš utratit peníze)

**Tip:** Kombinuj nástroje - žádný free tool nedá kompletní obraz.

---

## Phase 1: Discovery (Seed Keywords)

### Cíl

Vytvořit počáteční seznam 20-50 seed keywords.

### Metody

**1.1 Brain Dump**

```
Odpověz na tyto otázky:
- Co prodáváš/nabízíš?
- Jaké problémy řešíš?
- Jak by tě zákazník hledal?
- Jaké jsou synonyma pro tvůj produkt/službu?
- Jaké otázky zákazníci často kladou?
```

**1.2 Competitor Mining**

```
1. Najdi 3-5 konkurentů v Google
2. Podívej se na jejich:
   - Title tagy
   - H1 nadpisy
   - URL strukturu
   - Menu/navigaci
3. Zapiš klíčová slova která používají
```

**1.3 Google Autocomplete**

```
1. Zadej seed keyword do Google
2. Zapiš všechny autocomplete suggestions
3. Přidej písmena a-z za keyword pro více návrhů
   "keyword a", "keyword b", ...
4. Zkus "keyword vs", "keyword pro", "keyword jak"
```

**1.4 Google "Related Searches"**

```
1. Vyhledej seed keyword
2. Scrolluj na konec SERP
3. Zapiš "Related searches" / "Podobné vyhledávání"
```

**1.5 People Also Ask (PAA)**

```
1. Vyhledej seed keyword
2. Rozbal PAA boxy
3. Každá otázka = potenciální keyword
4. Klikni na otázky → objeví se další
```

### Output Phase 1

- [ ] 20-50 seed keywords v spreadsheet
- [ ] Kategorizované podle tématu

---

## Phase 2: Expansion (Long-tail & LSI)

### Cíl

Rozšířit seed keywords na 100-500+ variant.

### Metody

**2.1 Ubersuggest Expansion**

```
1. Jdi na neilpatel.com/ubersuggest
2. Zadej seed keyword
3. Exportuj "Keyword Ideas"
4. Exportuj "Related Keywords"
5. Opakuj pro top 10 seed keywords
```

**2.2 AlsoAsked Mind Maps**

```
1. Jdi na alsoasked.com
2. Zadej seed keyword
3. Exportuj mind mapu otázek
4. Každá větev = content cluster
```

**2.3 AnswerThePublic**

```
1. Jdi na answerthepublic.com
2. Zadej seed keyword
3. Stáhni vizualizaci
4. Fokus na:
   - Questions (kdo, co, kdy, kde, proč, jak)
   - Prepositions (pro, s, bez, versus)
   - Comparisons (vs, nebo, proti)
```

**2.4 Google Keyword Planner**

```
1. Jdi do Google Ads → Keyword Planner
2. "Discover new keywords"
3. Zadej seed keywords
4. Filtruj podle relevance
5. Stáhni CSV
```

**2.5 Search Console (existing site)**

```
1. Performance → Search results
2. Export všechny queries
3. Najdi keywords kde jsi na pozici 5-20
   → Optimization opportunities
```

### Output Phase 2

- [ ] 100-500 keywords v spreadsheet
- [ ] Zahrnuje long-tail varianty
- [ ] Zahrnuje question keywords

---

## Phase 3: Analysis (Metrics)

### Cíl

Obohatit keywords o metriky pro prioritizaci.

### Klíčové metriky

| Metrika                | Co znamená                       | Ideální hodnota              |
| ---------------------- | -------------------------------- | ---------------------------- |
| **Search Volume**      | Měsíční hledanost                | 100-10,000 (záleží na niche) |
| **Keyword Difficulty** | Obtížnost rankování              | <30 pro quick wins           |
| **CPC**                | Cena za klik (indikátor hodnoty) | Vyšší = hodnotnější          |
| **Search Intent**      | Záměr uživatele                  | Match s tvým obsahem         |
| **Trend**              | Roste/klesá?                     | Stabilní nebo rostoucí       |

### Search Intent Types

| Intent            | Popis               | Příklad                   | Typ obsahu         |
| ----------------- | ------------------- | ------------------------- | ------------------ |
| **Informational** | Chce vědět          | "jak vařit rýži"          | Blog, guide        |
| **Navigational**  | Hledá web           | "facebook login"          | Homepage           |
| **Commercial**    | Zkoumá před nákupem | "nejlepší notebooky 2025" | Comparison, review |
| **Transactional** | Chce koupit         | "koupit iPhone 15"        | Product page       |

### Analýza v Ubersuggest

```
Pro každý keyword zjisti:
1. Search Volume (SV)
2. SEO Difficulty (SD)
3. Paid Difficulty (PD)
4. CPC

Zapiš do spreadsheet.
```

### SERP Analysis

```
Pro top 20 keywords:
1. Vyhledej v Google
2. Analyzuj top 3 výsledky:
   - Typ obsahu (blog, product, tool?)
   - Délka obsahu
   - Domain Authority
3. Můžeš konkurovat?
```

### Google Trends Validation

```
1. Zadej keyword do Google Trends
2. Nastav období na 12 měsíců
3. Zkontroluj:
   - Je trend stabilní nebo klesající?
   - Jsou sezónní výkyvy?
   - Porovnej s alternativními keywords
```

### Output Phase 3

- [ ] Spreadsheet s metrikami pro každý keyword
- [ ] Search intent určen
- [ ] SERP analysis pro top keywords

---

## Phase 4: Prioritization

### Cíl

Vybrat keywords pro první vlnu obsahu.

### Opportunity Score Formula

```
Opportunity Score = (Volume × Intent Match) / Difficulty

Vysoké skóre = priorita
```

### Prioritization Matrix

| Kategorie      | Volume   | Difficulty | Akce             |
| -------------- | -------- | ---------- | ---------------- |
| **Quick Wins** | 100-1000 | <30        | ✅ Okamžitě      |
| **Strategic**  | 1000+    | 30-60      | 📅 Plánuj        |
| **Long-term**  | 5000+    | 60+        | 🎯 S backlinking |
| **Skip**       | <50      | Any        | ❌ Ignoruj       |

### Content Clustering

```
1. Seskup keywords podle tématu
2. Vyber 1 "pillar" keyword pro cluster
3. Ostatní = supporting keywords
4. Vytvoř topic cluster mapu:

   [Pillar Page]
        │
   ┌────┼────┐
   │    │    │
[Sub1][Sub2][Sub3]
```

### Final Checklist

- [ ] Top 10 quick wins (low difficulty, decent volume)
- [ ] Top 5 strategic keywords (high volume, worth the effort)
- [ ] 3-5 topic clusters defined
- [ ] Content calendar draft

---

## Output Templates

### Keyword Research Spreadsheet

| Keyword                 | Volume | Difficulty | CPC   | Intent | Cluster   | Priority  |
| ----------------------- | ------ | ---------- | ----- | ------ | --------- | --------- |
| best vegetarian recipes | 5400   | 42         | $0.80 | Info   | Recipes   | Strategic |
| easy vegetarian dinner  | 1900   | 28         | $0.65 | Info   | Recipes   | Quick Win |
| vegetarian meal prep    | 880    | 25         | $0.70 | Info   | Meal Prep | Quick Win |

### Topic Cluster Map

```
PILLAR: "Vegetarian Diet Guide"
├── Cluster: Recipes
│   ├── easy vegetarian dinner
│   ├── vegetarian lunch ideas
│   └── vegetarian breakfast
├── Cluster: Meal Prep
│   ├── vegetarian meal prep
│   └── weekly vegetarian menu
└── Cluster: Nutrition
    ├── vegetarian protein sources
    └── vegetarian vitamins
```

---

## Quick Reference

### Keyboard Shortcuts (Google)

| Akce                | Shortcut                    |
| ------------------- | --------------------------- |
| Autocomplete bypass | Keyword + space před Enter  |
| Exact match search  | "keyword v uvozovkách"      |
| Exclude term        | keyword -exclude            |
| Site-specific       | site:competitor.com keyword |

### Difficulty Benchmarks

| Difficulty Score | Interpretace                                 |
| ---------------- | -------------------------------------------- |
| 0-20             | Velmi snadné - můžeš rankovat rychle         |
| 21-40            | Snadné - solidní šance                       |
| 41-60            | Střední - potřebuješ kvalitní obsah + odkazy |
| 61-80            | Těžké - potřebuješ autoritu                  |
| 81-100           | Velmi těžké - velké brandy dominují          |

---

## Common Mistakes

1. **Pouze high-volume keywords** → Začni s low difficulty
2. **Ignorování search intent** → Match obsah s intentem
3. **Žádná SERP analýza** → Vždy zkontroluj kdo rankuje
4. **Jednorázový research** → Opakuj každé 3-6 měsíců
5. **Příliš mnoho keywords na stránku** → 1 primary + 2-3 secondary max
6. **Žádné clustering** → Topic clusters > random articles

---

## Integration

- **Po keyword research:** `seo-optimization` pro on-page SEO
- **Pro psaní obsahu:** `web-copy`
- **Pro měření výsledků:** `analytics-setup` + Google Search Console

---

## Resources

- [SEMrush Keyword Research Checklist](https://www.semrush.com/blog/keyword-research-checklist/)
- [Siege Media 10-Step Guide](https://www.siegemedia.com/strategy/keyword-research)
- [Zapier Best Free Tools](https://zapier.com/blog/best-keyword-research-tool/)
- [Google Keyword Planner Help](https://support.google.com/google-ads/answer/7337243)
