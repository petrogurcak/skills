---
status: design
created: 2026-02-24
type: agent-design
---

# Learning Advisor Agent — Design

**Goal:** Proaktivne vzdelavat tym AI agentu — monitorovat zdroje, navrhovat co se ktery agent ma doucit, a po schvaleni zajistit nacteni znalosti.

## Architektura

```
Tri kanaly vzdelavani:

1. REAKTIVNI (agent sam)
   Agent → narazi na gap → zapise "Learning proposal" do sve memory
   Uz implementovano v analytics-monitor template.

2. PROAKTIVNI (learning advisor)
   Learning advisor → monitoruje zdroje → navrhne agentovi
   → User schvali → agent se nauci

3. MANUAL (Petr)
   Petr → inbox/primo → "nauč X agenta tohle"
   → Agent zpracuje
```

## Zdroje znalosti

### Knihy
- **Kdo najde:** Learning advisor navrhne relevatni knihu
- **Kdo ziska:** Petr koupi/stahne
- **Jak se agent nauci:** Petr nahraje do NotebookLM pres `notebooklm-cli` → agent ma notebook jako znalostni bazi → query pri behu
- **Priklad:** "Analytics agent by mel znat 'Lean Analytics' (Croll) — obsahuje One Metric That Matters framework"

### Blogy a clanky
- **Kdo najde:** Learning advisor monitoruje zdroje referencovane ve skills
- **Jak:** WebFetch na zname URL, RSS feedy, changelogy
- **Jak se agent nauci:** Advisor precte clanek, syntetizuje klicove poznatky, navrhne update template/memory
- **Priklad:** "GA4 blog: nova Funnel Exploration API — analytics agent by mel pouzivat misto manualniho pocitani drop-offu"

### Petr navrhne
- **Jak:** Posle pres inbox skill (email) nebo primo rekne v session
- **Format:** URL + poznamka "tohle by mel znat [agent]"
- **Priklad:** "nauč analytics agenta tohle: https://article-about-cohort-analysis.com"

## Learning Advisor Agent

### Lokace
```
~/Projects/agents/learning-advisor/
├── config.yaml              # globalni nastaveni
├── sources/
│   ├── analytics.yaml       # zdroje pro analytics agenta
│   ├── seo.yaml             # zdroje pro SEO agenta
│   └── growth.yaml          # zdroje pro growth agenta
├── proposals/
│   ├── pending/             # cekajici na schvaleni
│   ├── approved/            # schvalene, cekajici na zpracovani
│   └── archive/             # zpracovane
├── templates/
│   └── scan-sources.md      # template pro advisor beh
└── run-scan.sh              # spusti scan (mesicne)
```

### Sources config (priklad)
```yaml
# sources/analytics.yaml
agent: analytics-monitor
skills:
  - growth:analytics-monitoring
  - marketing:analytics-setup

sources:
  - name: "GA4 Blog"
    url: "https://blog.google/products/marketingplatform/analytics/"
    type: changelog
    frequency: monthly
    what_to_look_for: "nove metriky, API zmeny, deprecations"

  - name: "Simo Ahava"
    url: "https://www.simoahava.com/"
    type: expert_blog
    frequency: monthly
    what_to_look_for: "GTM patterny, GA4 advanced features, measurement protocol"

  - name: "Analytics Mania"
    url: "https://www.analyticsmania.com/"
    type: tutorial
    frequency: monthly
    what_to_look_for: "GA4 how-to, GTM recepty, nove eventy"

books_to_consider:
  - "Lean Analytics (Croll & Yoskovitz) — One Metric That Matters, stage-based metrics"
  - "Measure What Matters (Doerr) — OKR framework pro goals-driven analysis"
```

### Advisor beh (mesicne)
1. Pro kazdeho agenta precte `sources/{agent}.yaml`
2. WebFetch na kazdy zdroj — co je noveho od posledniho scanu?
3. Pro kazdy relevantni clanek/update:
   - Precte a syntetizuje
   - Vyhodnoti: je to relevantni pro agenta? Proc?
   - Zapise proposal do `proposals/pending/`
4. Precte `learning proposals` ze vsech agent memory souboru (reaktivni navrhy)
5. Spoji: reaktivni gaps + proaktivni zdroje
6. Vystup: summary pro Petra

### Proposal format
```markdown
# LP-2026-03-001: GA4 Funnel Exploration API

**Pro agenta:** analytics-monitor
**Typ:** tool_capability (kniha | clanek | tool_capability | framework | best_practice)
**Zdroj:** https://blog.google/.../funnel-exploration-api
**Priorita:** stredni

## Proc
Analytics agent pouziva jen `runReport` API. Funnel Exploration umoznuje
vizualizovat drop-offy primo v GA4 — zlepsi sekci "Plneni cilu" v reportu.

## Co by se zmenilo
Template by dostal novy GA4 Query (Query 7: Funnel Exploration)
ktery automaticky pocita conversion rates mezi kroky funnelu.

## Akce po schvaleni
1. Precist dokumentaci Funnel Exploration API
2. Pridat Query 7 do weekly-report.md template
3. Otestovat v pristim reportu

## Status: pending
```

### Schvalovaci workflow
```
Petr dostane summary (email nebo v terminalu):

  Learning Advisor — 2026-03 scan
  3 navrhy pro 2 agenty:

  1. [analytics] GA4 Funnel Exploration API (stredni)
  2. [analytics] Kniha: Lean Analytics (vysoka)
  3. [seo] Core Web Vitals v GSC (nizka)

  Schvalit: edituj proposals/pending/ → presun do approved/
```

Petr schvali (presune soubor nebo oznaci v souboru).

### Zpracovani schvaleneho
Po schvaleni, learning advisor (nebo agent sam):

**Clanek/blog:**
1. WebFetch + syntetizuj klicove poznatky
2. Updatni agent template nebo memory
3. Presun proposal do archive/

**Kniha:**
1. Petr ziska knihu
2. `nlm source add --notebook {agent-notebook} --file kniha.pdf`
3. Agent pouziva NotebookLM queries pri behu
4. Presun proposal do archive/

**Tool capability:**
1. Precti dokumentaci (WebFetch)
2. Updatni template s novym query/prikazem
3. Otestuj v pristim behu
4. Presun proposal do archive/

## NotebookLM jako znalostni baze

Kazdy agent muze mit svuj NotebookLM notebook:

| Agent | Notebook | Obsah |
|---|---|---|
| analytics-monitor | "Analytics Knowledge" | knihy o analytics, GA4 docs, klicove clanky |
| seo-monitor | "SEO Knowledge" | SEO knihy, GSC docs, algorithm updates |
| growth-advisor | "Growth Knowledge" | growth knihy, PLG frameworky |

Agent pri behu muze:
```bash
nlm query "How to measure activation rate for SaaS?" --notebook "Analytics Knowledge"
```

## Implementacni plan

### Phase 1: Reaktivni (HOTOVO)
- [x] Learning proposals sekce v agent template
- [x] Agent memory s kontextem

### Phase 2: Advisor MVP
- [ ] Vytvorit `~/Projects/agents/learning-advisor/`
- [ ] Config se zdroji pro analytics agenta (pilot)
- [ ] Template pro source scan
- [ ] `run-scan.sh` script
- [ ] Proposal format + workflow

### Phase 3: NotebookLM integrace
- [ ] Vytvorit NotebookLM notebook pro analytics agenta
- [ ] Pridat `nlm query` do analytics template (kde je relevantni)
- [ ] Dokumentovat workflow: kniha → NotebookLM → agent query

### Phase 4: Scale
- [ ] Pridat zdroje pro dalsi agenty (SEO, growth)
- [ ] Automaticky scan (cron mesicne)
- [ ] Summary do inboxu
