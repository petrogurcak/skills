---
status: complete
created: 2026-02-24
completed: 2026-02-25
tasks_total: 4
tasks_done: 4
type: agent-setup
effort: single-session
depends_on: 2026-02-24-learning-advisor-plan-a.md
---

# Learning Advisor — Plan B: Template + Run

**Goal:** Vytvorit scan template, run script, a otestovat cely workflow end-to-end.

**Casovy odhad:** 1 vecer (20:00-24:00)

**Predpoklad:** Plan A dokonceny — spike uspesny, adresarova struktura existuje, konfigurace hotove.

> **Source design:** docs/plans/2026-02-24-learning-advisor-design.md

---

### Task 1: Scan Template

**Files:**

- Create: `/Users/petrogurcak/Projects/agents/learning-advisor/templates/scan-sources.md`

```markdown
# Learning Advisor — Source Scan Instructions

You are a learning advisor agent. Your job is to scan knowledge sources relevant to a specific AI agent, identify what's new and useful, and generate learning proposals for the human operator to approve.

## Phase 1: Read Agent Context

1. Read the agent's sources config YAML (provided in prompt) — understand what sources to scan, what skills the agent uses, where its memory is
2. Read the agent's current template (path in sources config) to understand what the agent already knows and does
3. Read the agent's memory files (paths in sources config) to find:
   - Existing learning proposals (reactive — from the agent itself)
   - Open issues that might benefit from new knowledge
   - Context about what the agent struggles with

## Phase 2: Scan External Sources

For each source in the config:

### Step 1: Fetch RSS feed

1. **WebFetch** the `rss` URL from the source config
2. Parse the XML — extract article titles, publication dates, and URLs
3. Check `.last-scan-{agent}.yaml` (path provided in prompt) for previously seen URLs
4. Filter to only NEW articles (not in last-scan, or published after last scan date)
5. If RSS fails, try `homepage` URL as fallback and look for recent posts

### Step 2: Evaluate and fetch relevant articles

For each new article from RSS:

1. Evaluate title against `what_to_look_for` and `relevance` from source config
2. Skip articles that are clearly irrelevant (off-topic, marketing, basic tutorials the agent already covers)
3. For articles that LOOK relevant (max 3 per source): **WebFetch** the full article URL
4. Read the article and assess:
   - Is this actionable for the agent? (can we update template/memory/skill?)
   - Does this fill a gap the agent has?
   - Would this improve report quality?
5. Skip content that is:
   - Too basic (agent already knows this — check template)
   - Too niche (not applicable to current projects)
   - Marketing fluff with no actionable insight

## Phase 3: Process Reactive Proposals

Read the agent's memory files (from sources config `memory_files`).
Look for `## Learning proposals` section.

For each reactive proposal (from the agent itself):

1. Assess: is this a real gap or a one-off situation?
2. If real gap: find a source that could fill it (WebFetch relevant docs/articles)
3. Create a proposal that combines the agent's request with a concrete learning source

## Phase 4: Generate Proposals

**Before creating any proposals:** Read all existing files in `{advisor_path}/proposals/pending/` and `{advisor_path}/proposals/approved/` to avoid duplicates. If a topic is already covered by an existing proposal, skip it.

For each finding worth proposing, create a proposal file.

### Proposal types — only 2:

- `read` — Agent can process this autonomously (article, docs, API changelog). Po schvaleni agent precte a updatne template/memory.
- `buy` — Requires human action (book purchase, paid course, manual setup). Petr musi neco udelat.

### Proposal format

File name: `{advisor_path}/proposals/pending/LP-{YYYY}-{MM}-{seq}.md`
Example: `proposals/pending/LP-2026-03-001.md`
```

# LP-{YYYY}-{MM}-{seq}: {Title}

**Pro agenta:** {agent_name}
**Typ:** {read | buy}
**Zdroj:** {URL}

## Proc

{2-3 sentences: Proc je toto relevantni pro agenta? Co by se zlepsilo?
Reference konkretni cast agentovy prace — template, report sekci, doporuceni.}

## Co by se zmenilo

{Konkretne: ktery soubor/template/sekce by se updatoval a jak.
Ne vague "agent by lepe analyzoval" ale "template by dostal novy Query 7
ktery automaticky pocita conversion rates mezi kroky funnelu."}

## Akce po schvaleni

1. {Konkretni krok}
2. {Konkretni krok}
3. {Konkretni krok}

## Status: pending

```

### Proposal rules

- Max 5 proposals per scan — quality over quantity
- Start ID sequence from 001 for each month
- Only propose if actionable — "zajimave cteni" neni duvod pro proposal
- For `buy` type: explain WHY it's worth the money/time
- Reference specific parts of the agent's template that would change

## Phase 5: Write Output + Tracking

1. **Save each proposal** as a separate file in `{advisor_path}/proposals/pending/`

2. **Write scan summary** to stdout (this is what Petr sees in terminal):

```

=== Learning Advisor — {YYYY-MM} scan ===
Agent: {agent_name}
Zdroje skenovano: {count}
Novych clanku: {count}
Reaktivnich navrhu z memory: {count}

Navrhy:

1. [{type}] {title} — {1 sentence proc}
2. [{type}] {title} — {1 sentence proc}
   ...

Proposals: {advisor_path}/proposals/pending/
Schvaleni: mv proposals/pending/LP-XXX.md proposals/approved/

````

3. **Update last-scan tracker** — write/overwrite:
   `{advisor_path}/sources/.last-scan-{agent}.yaml`

```yaml
agent: {agent_name}
date: {YYYY-MM-DD}
sources_scanned: {count}
proposals_generated: {count}
articles_found: {count}
seen_urls:
  - {url1}
  - {url2}
  - ...
````

Include ALL article URLs seen in this scan (both relevant and skipped) so next scan can filter them out.

## Rules

- Write proposals in Czech (technical terms can stay in English)
- NEVER hallucinate content. If WebFetch fails on a source, note "zdroj nedostupny" and skip
- Be selective — max 5 proposals per scan. Quality over quantity.
- Prioritize proposals that would directly improve report quality over nice-to-have knowledge
- For `buy` type: only propose if clearly high-value. Kniha = investice casu.
- For `read` type: only propose if actionable — clanek musi vést k update template/memory.
- Reference specific parts of the agent's template/workflow that would change
- If no new relevant content found, say so honestly: "Zadne relevantni novinky tento mesic."
- Do NOT process approved proposals — that's a separate workflow

````

---

### Task 2: Run Script

**Files:**

- Create: `/Users/petrogurcak/Projects/agents/learning-advisor/run-scan.sh`

```bash
#!/bin/bash
# Learning advisor — monthly source scan
# Usage: ./run-scan.sh [agent]
# Default: analytics-monitor

set -euo pipefail
trap 'echo "[$(date)] ERROR: scan failed for $AGENT (exit $?)" >> "$LOG_DIR/scan.log"' ERR

cd "$(dirname "$0")"

AGENT="${1:-analytics-monitor}"
DATE=$(date +%Y-%m-%d)
MONTH=$(date +%Y-%m)
LOG_DIR="$(pwd)/logs"
LOG_FILE="$LOG_DIR/$DATE-$AGENT.log"

# Read max_turns from config or default to 50
MAX_TURNS=$(grep "max_turns:" "$(pwd)/config.yaml" 2>/dev/null | head -1 | sed 's/.*max_turns: *//' || echo "50")

mkdir -p proposals/pending proposals/approved proposals/archive logs

echo "[$(date)] Starting learning scan for $AGENT" | tee -a "$LOG_DIR/scan.log"

# Verify sources config exists
if [ ! -f "sources/$AGENT.yaml" ]; then
  echo "ERROR: sources/$AGENT.yaml not found"
  exit 1
fi

# Verify template exists
if [ ! -f "templates/scan-sources.md" ]; then
  echo "ERROR: templates/scan-sources.md not found"
  exit 1
fi

# Build last-scan path for reference
LAST_SCAN="$(pwd)/sources/.last-scan-$AGENT.yaml"

claude -p "Read $(pwd)/templates/scan-sources.md for instructions. \
Read $(pwd)/config.yaml for global config. \
Read $(pwd)/sources/$AGENT.yaml for sources to scan. \
Run a monthly learning scan for agent '$AGENT'. \
Today is $DATE, scan month is $MONTH. \
Save proposals to $(pwd)/proposals/pending/. \
The advisor root path is $(pwd). \
Last scan tracker is at $LAST_SCAN (read it if it exists for previously seen URLs)." \
  --allowedTools "WebFetch(simoahava.com/*,analyticsmania.com/*,blog.google/*),Read,Write,Glob,Grep" \
  --dangerously-skip-permissions \
  --max-turns "$MAX_TURNS" \
  --model sonnet \
  2>&1 | tee -a "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}

if [ $EXIT_CODE -ne 0 ]; then
  echo "[$(date)] ERROR: claude exited with code $EXIT_CODE" >> "$LOG_DIR/scan.log"
  exit $EXIT_CODE
fi

echo ""
echo "[$(date)] Scan complete for $AGENT" | tee -a "$LOG_DIR/scan.log"

# Verify last-scan marker was created
if [ -f "$LAST_SCAN" ]; then
  echo "Last scan marker: $LAST_SCAN"
else
  echo "WARNING: Last scan marker not created at $LAST_SCAN"
fi

# Show results
echo ""
echo "Pending proposals:"
ls -1 proposals/pending/ 2>/dev/null || echo "  (zadne nove)"
echo ""
echo "Schvaleni: mv proposals/pending/LP-XXX.md proposals/approved/"
````

**Step 2:** `chmod +x /Users/petrogurcak/Projects/agents/learning-advisor/run-scan.sh`

**Poznamky k designu oproti puvodnimu planu:**

- **`set -euo pipefail`** — striktni error handling (ne jen `set -e`)
- **`trap ERR`** — loguje chybu pred exit
- **Date-stamped log files** — `logs/2026-03-01-analytics-monitor.log` misto jedineho `scan.log`
- **`tee`** — output jde do terminalu I do logu soucasne
- **`PIPESTATUS` check** — chyta exit code z `claude` i pres pipe do `tee`
- **Last-scan marker verification** — varuje pokud agent nevytvoril tracker
- **`--allowedTools` s domain restriction** — WebFetch jen na zname domeny (bezpecnost)
- **`MAX_TURNS` z configu** — cte z config.yaml, fallback 50
- **Zadne `--mcp-config`** — learning advisor nepotrebuje MCP servery (jen WebFetch)
- **Zadne `Bash` v allowedTools** — agent nepotrebuje bash, jen cte/pise/fetchuje

---

### Task 3: README — Approval Workflow

**Files:**

- Create: `/Users/petrogurcak/Projects/agents/learning-advisor/README.md`

````markdown
# Learning Advisor Agent

Mesicne skenuje zdroje a navrhuje co se AI agenty maji naucit.

## Spusteni

```bash
cd /Users/petrogurcak/Projects/agents/learning-advisor
./run-scan.sh                    # Scan pro default agenta (analytics-monitor)
./run-scan.sh analytics-monitor  # Explicitne
```

## Schvalovaci workflow

1. **Scan vygeneruje proposals** do `proposals/pending/`
2. **Petr si precte** navrhy: `cat proposals/pending/*.md`
3. **Schvaleni:** `mv proposals/pending/LP-2026-03-001.md proposals/approved/`
4. **Zamitnuti:** `rm proposals/pending/LP-2026-03-001.md`

## Zpracovani schvalenych proposals

### Typ `read` (clanek, docs, API changelog)

Agent muze zpracovat autonomne:

```bash
claude -p "Read proposals/approved/LP-XXX.md. \
WebFetch zdroj z proposal. \
Syntetizuj klicove poznatky. \
Updatni agent template/memory podle instrukci v proposal. \
Presun proposal do proposals/archive/." \
  --allowedTools "WebFetch,Read,Write,Glob" \
  --dangerously-skip-permissions \
  --model sonnet
```

### Typ `buy` (kniha, kurz)

1. Petr koupi/stahne material
2. Pokud kniha: `nlm source add --notebook "{Agent} Knowledge" --file kniha.pdf`
3. Rucne presun: `mv proposals/approved/LP-XXX.md proposals/archive/`

## Struktura

```
learning-advisor/
├── config.yaml                     # Globalni nastaveni
├── sources/
│   ├── analytics-monitor.yaml      # Zdroje pro analytics agenta
│   └── .last-scan-*.yaml           # Tracker poslednich scanu
├── proposals/
│   ├── pending/                    # Cekajici na schvaleni
│   ├── approved/                   # Schvalene
│   └── archive/                    # Zpracovane
├── templates/
│   └── scan-sources.md             # Hlavni prompt template
├── logs/
│   └── YYYY-MM-DD-agent.log       # Logy behu
├── run-scan.sh                     # Spusti scan
└── README.md
```

## Pridani dalsiho agenta

1. Vytvor `sources/{novy-agent}.yaml` (viz analytics-monitor.yaml jako vzor)
2. Spust: `./run-scan.sh {novy-agent}`
````

---

### Task 4: Smoke Test — Progressive

**Files:** zadne (jen terminál)

**Step 1: Syntax check**

```bash
bash -n /Users/petrogurcak/Projects/agents/learning-advisor/run-scan.sh
```

Ocekavany vysledek: zadny output = zadna syntax chyba.

**Step 2: Golden source test**

Vytvor docasny test config s jednim zdrojem kde zname presny obsah:

```bash
# Docasny test — pouzij jen Simo Ahava (znamy RSS feed)
cd /Users/petrogurcak/Projects/agents/learning-advisor

# Backup a vytvor single-source config
cp sources/analytics-monitor.yaml sources/analytics-monitor.yaml.bak

# Vytvor minimalní testovaci config (jen jeden source)
cat > sources/test-agent.yaml << 'YAML'
agent: test-agent
agent_path: "/Users/petrogurcak/Projects/agents/analytics-monitor"
skills: []
memory_files: []
template: "/Users/petrogurcak/Projects/agents/analytics-monitor/templates/weekly-report.md"
sources:
  - name: "Simo Ahava"
    rss: "https://www.simoahava.com/feed/"
    homepage: "https://www.simoahava.com/"
    what_to_look_for: "GTM patterny, GA4 features, measurement protocol"
    relevance: "Agent doporucuje GTM zmeny. Simo je autorita na GTM/GA4."
YAML

./run-scan.sh test-agent
```

Overit:

- Agent fetchnul RSS?
- Agent vytvoril alespon 1 proposal v `proposals/pending/`?
- Agent vytvoril `.last-scan-test-agent.yaml`?
- Log soubor existuje v `logs/`?

Po testu: `rm sources/test-agent.yaml sources/.last-scan-test-agent.yaml`

**Step 3: Full scan**

```bash
cd /Users/petrogurcak/Projects/agents/learning-advisor
./run-scan.sh analytics-monitor
```

**Step 4: Verify output**

```bash
# Kontrola proposal formatu
cat proposals/pending/LP-*.md

# Kontrola last-scan markeru
cat sources/.last-scan-analytics-monitor.yaml

# Kontrola log souboru
ls -la logs/

# Kontrola: ma proposal spravne fieldy?
# - "Pro agenta:" je vyplneny
# - "Typ:" je "read" nebo "buy" (nic jineho)
# - "Zdroj:" je URL
# - "Status: pending" na konci
```

**Step 5: Test approval workflow**

```bash
# Schvalit prvni proposal
FIRST=$(ls proposals/pending/ | head -1)
mv "proposals/pending/$FIRST" "proposals/approved/$FIRST"
ls proposals/approved/
```

---

## Checkpoint: Co mam po Plan B

```
/Users/petrogurcak/Projects/agents/learning-advisor/
├── config.yaml                          # ✓ Plan A
├── sources/
│   ├── analytics-monitor.yaml           # ✓ Plan A
│   └── .last-scan-analytics-monitor.yaml # ✓ Vytvoreno prvnim behem
├── proposals/
│   ├── pending/                         # ✓ Obsahuje proposals
│   ├── approved/                        # ✓ Testovano
│   └── archive/
├── templates/
│   └── scan-sources.md                  # ✓ Plan B
├── logs/
│   └── 2026-MM-DD-analytics-monitor.log # ✓ Vytvoreno prvnim behem
├── run-scan.sh                          # ✓ Plan B
└── README.md                            # ✓ Plan B
```

Agent funguje end-to-end. Dalsi krok: spustit realne mesicne (rucne), az bude stabilni → cron.
