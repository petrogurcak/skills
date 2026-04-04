---
status: complete
created: 2026-02-24
completed: 2026-02-25
tasks_total: 4
tasks_done: 4
type: agent-setup
effort: single-session
depends_on: null
---

# Learning Advisor — Plan A: Spike + Infrastructure

**Goal:** Overit ze WebFetch a RSS funguji v headless `claude -p` modu, a pripravit adresarovou strukturu + konfigurace.

**Casovy odhad:** 1 vecer (20:00-24:00)

> **Source design:** docs/plans/2026-02-24-learning-advisor-design.md

---

### Task 1: Spike Test — WebFetch + RSS v headless modu

**Files:** zadne (jen terminál)

**Proc:** Cely agent stoji na schopnosti fetchnout RSS XML a precist clanky. Pokud to nefunguje headless, nema smysl pokracovat.

**Step 1:** Otestovat fetch konkretniho clanku:

```bash
claude -p "Use WebFetch to fetch https://www.simoahava.com/analytics/server-side-tagging-google-tag-manager/ and tell me the article title and date." \
  --allowedTools "WebFetch" \
  --dangerously-skip-permissions \
  --max-turns 5 \
  --model sonnet
```

**Ocekavany vysledek:** Agent vrati title a datum clanku. Pokud WebFetch vrati HTML, overit ze agent dokaze extrahovat obsah.

**Step 2:** Otestovat fetch RSS feedu:

```bash
claude -p "Use WebFetch to fetch https://www.simoahava.com/feed/ — this is an RSS/XML feed. Parse the XML and list the 5 most recent article titles with their publication dates and URLs." \
  --allowedTools "WebFetch" \
  --dangerously-skip-permissions \
  --max-turns 5 \
  --model sonnet
```

**Ocekavany vysledek:** Agent vrati 5 titulu s daty a URL. RSS XML by mel byt parsovatelny primo.

**Step 3:** Otestovat druhy RSS feed (overit ze to neni nahodny uspech):

```bash
claude -p "Use WebFetch to fetch https://www.analyticsmania.com/feed/ — this is an RSS/XML feed. Parse the XML and list the 5 most recent article titles with their publication dates and URLs." \
  --allowedTools "WebFetch" \
  --dangerously-skip-permissions \
  --max-turns 5 \
  --model sonnet
```

**Rozhodnuti po spike:**

- Oba feedy + clanek OK → pokracuj na Task 2
- RSS OK ale clanek ne → pouzij RSS pro discovery, clanek link do proposal (Petr si precte sam)
- RSS nefunguje → zkus homepage scraping jako fallback, dokumentuj limitace
- Nic nefunguje → STOP, dokumentuj co presne selhalo, plan B jinou cestou

---

### Task 2: Directory Structure

**Files:**

- Create: `~/Projects/agents/learning-advisor/` a vsechny podslozky

**Step 1:**

```bash
mkdir -p /Users/petrogurcak/Projects/agents/learning-advisor/{sources,proposals/{pending,approved,archive},templates,logs}
```

**Step 2:** Overit:

```bash
ls -R /Users/petrogurcak/Projects/agents/learning-advisor/
```

Ocekavany vysledek:

```
/Users/petrogurcak/Projects/agents/learning-advisor/:
logs/  proposals/  sources/  templates/

proposals:
approved/  archive/  pending/
```

---

### Task 3: Global Config

**Files:**

- Create: `/Users/petrogurcak/Projects/agents/learning-advisor/config.yaml`

```yaml
# Learning Advisor Agent — Global Config
# Mesicne skenuje zdroje a navrhuje vzdelavani pro agenty.

agent:
  name: learning-advisor
  version: "0.1.0"

defaults:
  model: sonnet
  max_turns: 50

paths:
  agents_root: "/Users/petrogurcak/Projects/agents"
  skills_root: "/Users/petrogurcak/Projects/skills/plugins"

agents:
  - analytics-monitor
  # - seo-monitor         # Budouci
  # - growth-advisor      # Budouci
```

**Poznamky k designu:**

- **Absolutni cesty** — zadne `~` tildy, `run-scan.sh` pouzije `$(pwd)` kde potrebuje relativni
- **Zadne `proposal` typy/priority** — Plan B template pouziva zjednoduseny format (jen `read`/`buy`)
- **`max_turns: 50`** — WebFetch je pomaly, RSS parsing + vice clanku = vic turns nez analytics agent
- **Zadne `scan_frequency`** — script neplanuje sam sebe, cron je budouci faze

---

### Task 4: Sources Config — Analytics Monitor

**Files:**

- Create: `/Users/petrogurcak/Projects/agents/learning-advisor/sources/analytics-monitor.yaml`

```yaml
# Sources pro analytics-monitor agenta
# Learning advisor skenuje tyto zdroje mesicne a navrhuje co se agent ma naucit.

agent: analytics-monitor
agent_path: "/Users/petrogurcak/Projects/agents/analytics-monitor"

# Skills ktere agent pouziva (pro kontext — co uz umi)
skills:
  - plugin: development
    skill: analytics-report
    path: "/Users/petrogurcak/Projects/skills/plugins/development/skills/analytics-report/SKILL.md"
  - plugin: marketing
    skill: analytics-setup
    path: "/Users/petrogurcak/Projects/skills/plugins/marketing/skills/analytics-setup/SKILL.md"

# Agent memory (obsahuje learning proposals od agenta samotneho)
memory_files:
  - path: "/Users/petrogurcak/Projects/etapa/menu-editor/.claude/agents/analytics.md"
    project: editor-menu
    what_to_look_for: "## Learning proposals — reaktivni navrhy od agenta"

# Template ktery agent pouziva (pro pochopeni co agent dela)
template: "/Users/petrogurcak/Projects/agents/analytics-monitor/templates/weekly-report.md"

# --- Externi zdroje ---
# RSS feedy jako PRIMARY source — agent parsuje XML a hleda nove clanky podle data.
# Homepage URL jako fallback pokud RSS nefunguje.

sources:
  - name: "Simo Ahava"
    rss: "https://www.simoahava.com/index.xml"
    homepage: "https://www.simoahava.com/"
    what_to_look_for: >
      GTM advanced patterny, GA4 measurement protocol, server-side tagging,
      consent mode implementace, debugging techniky, custom dimensions.
    relevance: >
      Agent doporucuje GTM zmeny v reportu. Lepssi znalost GTM = presnejsi doporuceni.
      Simo je #1 autorita na GTM/GA4 technicke implementace.

  - name: "Analytics Mania (Julius Fedorovicius)"
    rss: "https://www.analyticsmania.com/feed/"
    homepage: "https://www.analyticsmania.com/post/"
    what_to_look_for: >
      GA4 how-to guides, GTM recepty pro specifické eventy,
      e-commerce tracking patterny, form tracking, scroll tracking.
    relevance: >
      Prakticke tutorialy ktere muze agent primo pouzit pro doporuceni
      v reportech (napr. "jak implementovat scroll tracking").

  - name: "GA4 Blog (Google)"
    rss: "https://blog.google/products/marketingplatform/analytics/rss/"
    homepage: "https://blog.google/products/marketingplatform/analytics/"
    what_to_look_for: >
      Nove metriky a dimenze v GA4, zmeny v API (runReport, Funnel Exploration),
      deprecations starych features, nove integrace (BigQuery, Looker),
      zmeny v UI ktere ovlivnuji interpretaci dat.
    relevance: >
      Agent pouziva runReport MCP tool. Nove API funkce = nove queries v template.
      Deprecated features = aktualizovat template aby nepouzival stare.
```

**Zmeny oproti puvodnimu planu:**

- **RSS feedy jako `rss` field** — primarni zdroj, homepage je fallback
- **Zadne `books_to_consider`** — to je staticka TODO lista, ne automaticky discovery. Knihy navrhne agent az najde gap, nebo Petr rucne.
- **Absolutni cesty vsude** — zadne `~/`
- **Zadne `type`/`frequency` fieldy** — script neplánuje per-source frekvenci, vsechno se skenuje pri behu

---

## Checkpoint: Co mam po Plan A

```
/Users/petrogurcak/Projects/agents/learning-advisor/
├── config.yaml                          # Globalni config
├── sources/
│   └── analytics-monitor.yaml           # Zdroje + memory files
├── proposals/
│   ├── pending/
│   ├── approved/
│   └── archive/
├── templates/                           # Prazdne — Plan B
├── logs/                                # Prazdne — Plan B
└── (run-scan.sh)                        # Plan B
```

Plus: spike test vysledky — vim jestli WebFetch + RSS funguje headless.
