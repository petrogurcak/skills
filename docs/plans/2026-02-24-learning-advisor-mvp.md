---
status: superseded
created: 2026-02-24
tasks_total: 7
tasks_done: 0
type: agent-setup
effort: multi-session
superseded_by:
  - 2026-02-24-learning-advisor-plan-a.md
  - 2026-02-24-learning-advisor-plan-b.md
---

> **SUPERSEDED:** Tento plan byl nahrazen dvema mensimi plany po review.
> Viz `2026-02-24-learning-advisor-plan-a.md` (Spike + Infrastructure) a `2026-02-24-learning-advisor-plan-b.md` (Template + Run).

# Learning Advisor MVP — Implementation Plan

**Goal:** Vytvorit learning advisor agenta ktery mesicne skenuje zdroje relevatni pro analytics-monitor agenta, cte jeho learning proposals z memory, a generuje schvalovaci navrhy pro Petra.

**Architecture:** Config + templates + shell script. Stejny pattern jako `~/Projects/agents/analytics-monitor/`. Agent bezi headless pres `claude -p`, cte template s instrukcemi, pouziva WebFetch na zdroje, generuje proposals do `proposals/pending/`.

**Pilot scope:** Pouze analytics-monitor agent. Zadne multi-agent features, zadny cron (rucne spousteni).

> **Source design:** docs/plans/2026-02-24-learning-advisor-design.md

---

### Task 1: Directory Structure

**Files:**

- Create: `~/Projects/agents/learning-advisor/`
- Create: vsechny podslozky

**Step 1:** Vytvorit adresarovou strukturu:

```bash
mkdir -p ~/Projects/agents/learning-advisor/{sources,proposals/{pending,approved,archive},templates,logs}
```

Vysledek:

```
~/Projects/agents/learning-advisor/
├── config.yaml
├── sources/
│   └── analytics-monitor.yaml
├── proposals/
│   ├── pending/
│   ├── approved/
│   └── archive/
├── templates/
│   └── scan-sources.md
├── logs/
└── run-scan.sh
```

**Step 2:** Overit ze struktura existuje (`ls -R`).

---

### Task 2: Global Config

**Files:**

- Create: `~/Projects/agents/learning-advisor/config.yaml`

**Step 1:** Vytvorit config.yaml:

```yaml
# Learning Advisor Agent — Global Config
# Mesicne skenuje zdroje a navrhuje vzdelavani pro agenty.

agent:
  name: learning-advisor
  version: "0.1.0"
  description: "Proaktivni vzdelavaci poradce pro AI agenty"

defaults:
  model: sonnet # Pro scheduled scany (levnejsi)
  max_turns: 30 # Vic turns nez analytics — WebFetch je pomaly
  scan_frequency: monthly # Jak casto spoustet scan

proposal:
  id_prefix: "LP" # Learning Proposal prefix
  id_format: "LP-{year}-{month}-{seq}" # Napr. LP-2026-03-001
  types:
    - article # Blog post, clanek — syntetizovat a updatnout template/memory
    - book # Kniha — navrhnout ke koupi, NotebookLM upload
    - tool_capability # Nova schopnost nastroje — updatnout template
    - framework # Analyticky/business framework — pridat do skills
    - best_practice # Lepssi postup — updatnout template/memory
  priorities:
    - vysoka # Primo ovlivnuje kvalitu reportu
    - stredni # Zlepseni, ale report funguje i bez
    - nizka # Nice-to-have, neni urgentni

agents:
  - analytics-monitor # Pilot
  # - seo-monitor         # Budouci
  # - growth-advisor      # Budouci

paths:
  agents_root: "~/Projects/agents"
  skills_root: "~/Projects/skills/plugins"
```

---

### Task 3: Analytics Monitor Sources Config

**Files:**

- Create: `~/Projects/agents/learning-advisor/sources/analytics-monitor.yaml`

**Step 1:** Identifikovat skills pouzivane analytics agentem:

- `development:analytics-report` — hlavni skill (generovani reportu, ICE scoring, AARRR funnel)
- `marketing:analytics-setup` — nastaveni GTM/GA4 trackingu

**Step 2:** Vytvorit sources config:

```yaml
# Sources pro analytics-monitor agenta
# Learning advisor skenuje tyto zdroje mesicne a navrhuje co se agent ma naucit.

agent: analytics-monitor
agent_path: ~/Projects/agents/analytics-monitor

# Skills ktere agent pouziva (pro kontext — co uz umi)
skills:
  - plugin: development
    skill: analytics-report
    path: ~/Projects/skills/plugins/development/skills/analytics-report/SKILL.md
  - plugin: marketing
    skill: analytics-setup
    path: ~/Projects/skills/plugins/marketing/skills/analytics-setup/SKILL.md

# Agent memory (obsahuje learning proposals od agenta samotneho)
memory_files:
  - path: ~/Projects/etapa/menu-editor/.claude/agents/analytics.md
    project: editor-menu
    what_to_look_for: "## Learning proposals — reaktivni navrhy od agenta"

# Template ktery agent pouziva (pro pochopeni co agent dela)
template: ~/Projects/agents/analytics-monitor/templates/weekly-report.md

# --- Externi zdroje ---

sources:
  - name: "GA4 Blog (Google)"
    url: "https://blog.google/products/marketingplatform/analytics/"
    type: changelog
    frequency: monthly
    what_to_look_for: >
      Nove metriky a dimenze v GA4, zmeny v API (runReport, Funnel Exploration),
      deprecations starych features, nove integrace (BigQuery, Looker),
      zmeny v UI ktere ovlivnuji interpretaci dat.
    relevance: >
      Agent pouziva runReport MCP tool. Nove API funkce = nove queries v template.
      Deprecated features = aktualizovat template aby nepouzival stare.

  - name: "Simo Ahava"
    url: "https://www.simoahava.com/"
    type: expert_blog
    frequency: monthly
    what_to_look_for: >
      GTM advanced patterny, GA4 measurement protocol, server-side tagging,
      consent mode implementace, debugging techniky, custom dimensions.
    relevance: >
      Agent doporucuje GTM zmeny v reportu. Lepssi znalost GTM = presnejsi doporuceni.
      Simo je #1 autorita na GTM/GA4 technicke implementace.

  - name: "Analytics Mania (Julius Fedorovicius)"
    url: "https://www.analyticsmania.com/post/"
    type: tutorial
    frequency: monthly
    what_to_look_for: >
      GA4 how-to guides, GTM recepty pro specifické eventy,
      e-commerce tracking patterny, form tracking, scroll tracking.
    relevance: >
      Prakticke tutorialy ktere muze agent primo pouzit pro doporuceni
      v reportech (napr. "jak implementovat scroll tracking").

# --- Knihy k zvazeni ---

books_to_consider:
  - title: "Lean Analytics"
    authors: "Alistair Croll, Benjamin Yoskovitz"
    why: >
      One Metric That Matters framework, stage-based metriky (Empathy → Stickiness → Virality → Revenue → Scale).
      Agent by lepe vybiral ktere metriky zduraznit podle stadia projektu.
    priority: vysoka

  - title: "Measure What Matters"
    authors: "John Doerr"
    why: >
      OKR framework pro goals-driven analyzu. Agent uz pouziva goals z project config,
      ale OKR by pridal strukturu pro mereni progress a nastaveni ambicioznich cilu.
    priority: stredni
```

---

### Task 4: Scan Template (hlavni prompt)

**Files:**

- Create: `~/Projects/agents/learning-advisor/templates/scan-sources.md`

**Step 1:** Vytvorit kompletni prompt template. Toto je klicovy soubor — ekvivalent `weekly-report.md` pro analytics agenta.

```markdown
# Learning Advisor — Source Scan Instructions

You are a learning advisor agent. Your job is to scan knowledge sources relevant to a specific AI agent, identify what's new and useful, and generate learning proposals for the human operator to approve.

## Your Process

### Phase 1: Understand the Agent

1. Read the agent's sources config YAML (provided in prompt)
2. Read the agent's current template to understand what the agent already knows and does
3. Read the agent's memory files to find:
   - Existing learning proposals (reactive — from the agent itself)
   - Open issues that might benefit from new knowledge
   - Context about what the agent struggles with

### Phase 2: Scan External Sources

For each source in the config:

1. **WebFetch** the source URL
2. Identify NEW content since the last scan (check the `last_scan` field in config, or if first scan, look at content from the last 30 days)
3. For each new article/post/update, evaluate:
   - Is this relevant to what the agent does?
   - Would this improve the agent's output quality?
   - Is this actionable (can we update template/memory/skill)?
4. Skip content that is:
   - Too basic (agent already knows this)
   - Too niche (not applicable to current projects)
   - Marketing fluff with no actionable insight

### Phase 3: Process Reactive Proposals

Read the agent's memory files. Look for `## Learning proposals` section.

For each reactive proposal (from the agent itself):

1. Assess: is this a real gap or a one-off situation?
2. If real gap: find a source that could fill it (WebFetch relevant docs/articles)
3. Create a proposal that combines the agent's request with a concrete learning source

### Phase 4: Generate Proposals

For each finding worth proposing, create a proposal file in this EXACT format:
```

# {ID}: {Title}

**Pro agenta:** {agent_name}
**Typ:** {article | book | tool_capability | framework | best_practice}
**Zdroj:** {URL or book reference}
**Priorita:** {vysoka | stredni | nizka}
**Nalezeno:** {source_name} (proaktivni) | agent memory (reaktivni)

## Proc

{2-3 sentences: Proc je toto relevantni pro agenta? Co by se zlepsilo?
Reference konkretni cast agentovy prace — template, report sekci, doporuceni.}

## Co by se zmenilo

{Konkretne: ktery soubor/template/sekce by se updatoval a jak.
Ne vague "agent by lepe analyzoval" ale "template by dostal novy Query 7: Funnel Exploration
ktery automaticky pocita conversion rates mezi kroky funnelu."}

## Akce po schvaleni

1. {Konkretni krok — co presne udelat}
2. {Konkretni krok}
3. {Konkretni krok}

## Status: pending

```

### Proposal ID Convention

Format: `LP-{YYYY}-{MM}-{sequence}`
Example: `LP-2026-03-001`, `LP-2026-03-002`

Start sequence from 001 for each month.

### Phase 5: Write Output

1. **Save each proposal** as a separate file:
   `{advisor_path}/proposals/pending/{id}.md`

   Example: `proposals/pending/LP-2026-03-001.md`

2. **Write scan summary** to stdout (this is what Petr sees in terminal):

```

=== Learning Advisor — {YYYY-MM} scan ===
Agent: {agent_name}
Zdroje skenovano: {count}
Clanku nalezeno: {count new articles}
Reaktivnich navrhu: {count from agent memory}

Navrhy:

1. [{priority}] {title} ({type}) — {1 sentence proc}
2. [{priority}] {title} ({type}) — {1 sentence proc}
   ...

Proposals ulozeny do: {advisor_path}/proposals/pending/
Schvaleni: presun soubor z pending/ do approved/

````

3. **Update last_scan date** — write a small `last-scan.yaml` file:
   `{advisor_path}/sources/.last-scan-{agent}.yaml`

```yaml
agent: {agent_name}
date: {YYYY-MM-DD}
sources_scanned: {count}
proposals_generated: {count}
articles_found: {count}
````

## Rules

- Write proposals in Czech (technical terms can stay in English)
- NEVER hallucinate content. If WebFetch fails on a source, note "zdroj nedostupny" and skip
- Be selective — max 5 proposals per scan. Quality over quantity.
- Prioritize proposals that would directly improve report quality over nice-to-have knowledge
- For books: only propose if clearly high-value. Kniha = investice casu.
- For articles: only propose if actionable. "Zajimave cteni" neni duvod pro proposal.
- Reference specific parts of the agent's template/workflow that would change
- If no new relevant content found, say so honestly: "Zadne relevantni novinky tento mesic."
- Do NOT process approved proposals — that's a separate workflow

````

---

### Task 5: Run Script

**Files:**
- Create: `~/Projects/agents/learning-advisor/run-scan.sh`

**Step 1:** Vytvorit run-scan.sh (pattern z analytics-monitor/run-weekly.sh):

```bash
#!/bin/bash
# Learning advisor — monthly source scan
# Usage: ./run-scan.sh [agent]
# Default: runs for all agents in config.yaml

set -e
cd "$(dirname "$0")"

AGENT="${1:-analytics-monitor}"
DATE=$(date +%Y-%m-%d)
MONTH=$(date +%Y-%m)

mkdir -p proposals/pending proposals/approved proposals/archive logs

echo "[$(date)] Starting learning scan for $AGENT" >> logs/scan.log

# Verify sources config exists
if [ ! -f "sources/$AGENT.yaml" ]; then
  echo "ERROR: sources/$AGENT.yaml not found"
  exit 1
fi

claude -p "Read $(pwd)/templates/scan-sources.md for instructions. \
Read $(pwd)/config.yaml for global config. \
Read $(pwd)/sources/$AGENT.yaml for sources to scan. \
Run a monthly learning scan for agent '$AGENT'. \
Today is $DATE, scan month is $MONTH. \
Save proposals to $(pwd)/proposals/pending/. \
The advisor root path is $(pwd)." \
  --allowedTools "WebFetch,WebSearch,Bash,Read,Write,Glob,Grep" \
  --dangerously-skip-permissions \
  --max-turns 30 \
  --model sonnet \
  2>> logs/scan.log

echo ""
echo "[$(date)] Scan complete for $AGENT" >> logs/scan.log
echo "Pending proposals:"
ls -1 proposals/pending/ 2>/dev/null || echo "  (zadne nove)"
echo ""
echo "Schvaleni: presun soubor z proposals/pending/ do proposals/approved/"
````

**Step 2:** `chmod +x ~/Projects/agents/learning-advisor/run-scan.sh`

---

### Task 6: Approval Workflow Docs

**Files:**

- Create: `~/Projects/agents/learning-advisor/README.md`

**Step 1:** Vytvorit strucny README s workflow:

````markdown
# Learning Advisor Agent

Mesicne skenuje zdroje a navrhuje co se AI agenty maji naucit.

## Spusteni

```bash
./run-scan.sh                    # Scan pro vsechny agenty
./run-scan.sh analytics-monitor  # Scan jen pro analytics agenta
```
````

## Schvalovaci workflow

1. **Scan vygeneruje proposals** do `proposals/pending/`
2. **Petr si precte** navrhy (v terminalu nebo `cat proposals/pending/*.md`)
3. **Schvaleni:** `mv proposals/pending/LP-2026-03-001.md proposals/approved/`
4. **Zamitnuti:** `rm proposals/pending/LP-2026-03-001.md` (nebo nech a ignoruj)
5. **Zpracovani:** `./run-process.sh` (Phase 2b — zatim manualne)

## Manualni zpracovani (do Phase 2b)

Po presunuti do `approved/`, zpracuj rucne podle typu:

### Clanek (article / best_practice)

1. `claude -p "Read proposals/approved/LP-XXX.md, WebFetch zdroj, syntetizuj poznatky, updatni agent template/memory podle instrukci v proposal."`
2. Presun do `archive/`

### Kniha (book)

1. Kup/stahni knihu
2. `nlm source add --notebook "Analytics Knowledge" --file kniha.pdf`
3. Presun do `archive/`

### Tool capability

1. `claude -p "Read proposals/approved/LP-XXX.md, WebFetch dokumentaci, updatni agent template s novym query/prikazem."`
2. Otestuj v pristim behu agenta
3. Presun do `archive/`

## Struktura

```
learning-advisor/
├── config.yaml              # Globalni nastaveni
├── sources/
│   ├── analytics-monitor.yaml  # Zdroje pro analytics agenta
│   └── .last-scan-*.yaml       # Zaznam posledniho scanu
├── proposals/
│   ├── pending/             # Cekajici na schvaleni
│   ├── approved/            # Schvalene, cekajici na zpracovani
│   └── archive/             # Zpracovane
├── templates/
│   └── scan-sources.md      # Hlavni prompt template
├── logs/
│   └── scan.log             # Log behu
├── run-scan.sh              # Spusti mesicni scan
└── README.md
```

````

---

### Task 7: Smoke Test

**Files:** (zadne nove)

**Step 1:** Overit ze vsechny soubory existuji:

```bash
ls -la ~/Projects/agents/learning-advisor/
ls -la ~/Projects/agents/learning-advisor/sources/
ls -la ~/Projects/agents/learning-advisor/templates/
ls -la ~/Projects/agents/learning-advisor/proposals/pending/
````

**Step 2:** Dry-run — manualne overit ze `run-scan.sh` nezhavaruje na syntax error:

```bash
cd ~/Projects/agents/learning-advisor
bash -n run-scan.sh  # Syntax check
```

**Step 3:** Spustit prvni scan (skutecny test):

```bash
cd ~/Projects/agents/learning-advisor
./run-scan.sh analytics-monitor
```

**Step 4:** Zkontrolovat output:

- Jsou proposals v `proposals/pending/`?
- Ma kazdy proposal spravny format (ID, typ, zdroj, akce)?
- Je `sources/.last-scan-analytics-monitor.yaml` vytvoreny?
- Je v `logs/scan.log` zaznam?

**Step 5:** Pokud vse OK, zkusit approval workflow:

```bash
# Schvalit jeden proposal
mv proposals/pending/LP-2026-03-001.md proposals/approved/
# Overit ze je v approved/
ls proposals/approved/
```

---

## Post-MVP (co dal)

Po uspesnem smoke testu a prvnim realnem scanu:

1. **run-process.sh** — automaticke zpracovani schvalenych proposals (Phase 2b)
2. **Cron** — mesicni automaticky scan (`crontab -e`)
3. **Dalsi agenty** — pridat `sources/seo-monitor.yaml`, `sources/growth-advisor.yaml`
4. **NotebookLM integrace** — Phase 3 z design dokumentu
