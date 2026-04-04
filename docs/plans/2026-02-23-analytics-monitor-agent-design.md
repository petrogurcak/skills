---
status: design-reviewed
created: 2026-02-23
reviewed: 2026-02-23
type: agent
project: agents/analytics-monitor
---

# Analytics Monitor Agent — Design v2

**Goal:** Autonomni analyticky poradce ktery sleduje GA4, Search Console a backend metriky, detekuje anomalie, pouziva skills pro interpretaci a doporuceni, a uklada strukturovane reporty.

**Runtime:** Claude Code session (headless via `claude -p`, on-demand via skill)
**Config:** YAML per-project v `~/Projects/agents/analytics-monitor/`
**Output:** Markdown s YAML frontmatter, rating 1-10

---

## Architektura

```
~/Projects/agents/analytics-monitor/
├── config.yaml              # Globalni nastaveni (LLM model, report format)
├── projects/
│   ├── editor-menu.yaml     # GA4, GSC, DB, klicove metriky
│   ├── editor-menu.mcp.json # MCP servery pro tento projekt (GA4, GSC)
│   ├── shiftstreak.yaml     # (budouci)
│   └── flatwhite.yaml       # (budouci)
├── reports/
│   ├── editor-menu/
│   │   ├── 2026-02-23-weekly.md
│   │   ├── 2026-02-23-ad-hoc.md
│   │   └── ...
│   └── shiftstreak/
├── logs/
│   └── cron.log             # Stderr z headless behu
└── templates/
    ├── weekly-report.md      # Sablona + embedovane skill frameworky
    └── ad-hoc-report.md      # Sablona pro on-demand
```

Agent bezi jako Claude Code session — ma pristup ke vsem skills a MCP serverum. Kazdy projekt ma vlastni `.mcp.json` (resi per-project GA4 property ID). Scheduled = cron spusti `claude -p` s `--mcp-config`. On-demand = skill `/analytics:report`.

---

## MCP servery

### GA4 (existujici)

Server: `mcp-server-google-analytics` (npm, uz nainstalovan)
Omezeni: `GA_PROPERTY_ID` je env var pri startu — 1 server = 1 property.
Reseni: Per-project `.mcp.json` s jinym `GA_PROPERTY_ID`:

```json
// projects/editor-menu.mcp.json
{
  "mcpServers": {
    "google-analytics": {
      "command": "npx",
      "args": ["-y", "mcp-server-google-analytics"],
      "env": {
        "GOOGLE_CLIENT_EMAIL": "...",
        "GOOGLE_PRIVATE_KEY": "...",
        "GA_PROPERTY_ID": "EDITOR_MENU_PROPERTY_ID"
      }
    },
    "gsc": {
      "command": "npx",
      "args": ["-y", "mcp-server-gsc"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "path/to/key.json",
        "GSC_SITE_URL": "sc-domain:editor.menu"
      }
    }
  }
}
```

Headless invoke pouzije: `claude -p --mcp-config projects/editor-menu.mcp.json`

### Search Console (novy — nutno nainstalovat)

Balicek: `mcp-server-gsc` (npm, 157 stars, TypeScript)
Install: `npx -y mcp-server-gsc`
Pozadavky: Google Cloud service account s pristupem k Search Console property.
Akce pred implementaci: Overit ze service account `ga4-mcp-server@flatwhite-475506.iam.gserviceaccount.com` ma pristup i k Search Console properties, nebo vytvorit novy.

---

## Per-project konfigurace

```yaml
# projects/editor-menu.yaml
project: editor-menu
name: "Editor.menu"
url: "https://editor.menu"
mcp_config: "projects/editor-menu.mcp.json"  # Per-project MCP servery

sources:
  ga4:
    property_id: "EDITOR_MENU_PROPERTY_ID"
    key_events:
      - signup_cta
      - signup_success
      - pricing_cta
      - newsletter_subscribe
      - import_processing_complete
      - import_video_play
    key_pages:
      - /
      - /pricing
      - /demo

  search_console:
    site_url: "sc-domain:editor.menu"
    focus_queries:
      - "menu editor"
      - "jidelni listek online"
      - "digital menu"

  backend:
    type: postgres
    connection_env: DATABASE_URL  # Skutecny env var z menu-editor/.env
    queries:
      new_users: "SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '{days} days'"
      new_accounts: "SELECT COUNT(*) FROM accounts WHERE created_at > NOW() - INTERVAL '{days} days'"
      active_accounts: "SELECT COUNT(DISTINCT account_id) FROM parsing_jobs WHERE created_at > NOW() - INTERVAL '{days} days'"
      imports: "SELECT COUNT(*) FROM parsing_jobs WHERE created_at > NOW() - INTERVAL '{days} days'"
      ai_conversations: "SELECT COUNT(*) FROM ai_conversations WHERE created_at > NOW() - INTERVAL '{days} days'"

analysis:
  compare_periods: [7, 30]  # WoW a MoM
  anomaly_threshold: 0.3     # 30% vychylka = alert
```

---

## Skills integrace

Skills nejsou "volatelne za behu" — nacitaji se do kontextu session. Agent je nepouziva jako tooly, ale jako znalostni frameworky pro interpretaci dat.

**Reseni:** Report sablona (`templates/weekly-report.md`) embeduje relevantni frameworky primo:

```markdown
## Analyticke frameworky (pro interpretaci)

### Growth (z growth:growth-hacking)
- ICE Scoring: Impact (1-10) × Confidence (1-10) × Ease (1-10)
- Pouzij na kazde doporuceni

### SEO (z seo:seo-optimization)
- Kontroluj: Core Web Vitals, pozice na klicove dotazy, CTR vs pozice
- Pokud pozice 4-10 s nizkym CTR → problem s title/description

### Funnel (z marketing:marketing-orchestrator)
- AARRR: Acquisition → Activation → Retention → Revenue → Referral
- Identifikuj kde funnel proteka (nejvetsi drop-off)
```

Agent pak pri analyze automaticky pouziva tyto frameworky — nemuze je "zavolat", ale ma je v kontextu a aplikuje na data. Sablona se updatuje rucne kdyz se skills zmeni.

---

## Report format

```markdown
---
project: editor-menu
date: 2026-02-23
type: weekly
period: 2026-02-16 / 2026-02-23

metrics:
  sessions: 342
  sessions_wow: -12.3%
  users: 287
  users_wow: +5.1%
  signup_cta: 18
  signup_success: 4
  conversion_rate: 1.17%
  organic_clicks: 156
  organic_impressions: 4820
  avg_position: 18.3
  new_users_backend: 4
  active_accounts: 12
  imports: 23
  ai_conversations: 8

alerts:
  - type: warning
    metric: sessions
    message: "Sessions -12.3% WoW"
  - type: info
    metric: avg_position
    message: "Avg position improved 21.1 → 18.3"

rating: 6/10
rating_criteria: "8+ all metrics up WoW, 5-7 mixed, <5 multiple alerts"
---

# Editor.menu — Tyden 8/2026

## Headline

Organic roste (pozice +2.8), ale celkovy traffic mirne klesa. 4 nove registrace, konverzni rate stabilni.

## Co slo dobre

- Search Console: prumerna pozice zlepsena z 21.1 na 18.3, hlavne "menu editor" (+4 pozice)
- AI asistent: 8 konverzaci, 75% acceptance rate — uzivatele ho pouzivaji
- Importy stabilni (23 tento tyden vs 21 minuly)

## Co sledovat

- Sessions -12.3% WoW — pravdepodobne sezonni (unor), ale overit zda neklesly referral zdroje
- Signup funnel: 18 CTA kliku → 4 registrace (22% conversion) — formular funguje, ale CTA na homepage ma nizky click rate

## Doporuceni (ICE scored)

| # | Akce | Impact | Confidence | Ease | ICE |
|---|------|--------|------------|------|-----|
| 1 | Landing page pro "jidelni listek online" (pozice 34) | 7 | 6 | 5 | 210 |
| 2 | Sticky signup CTA na homepage | 6 | 7 | 8 | 336 |

→ Priorita: #2 (vyssi ICE, jednodussi implementace)

## Surova data

<details>
<summary>GA4 detail</summary>
[tabulka s kompletnimi cisly]
</details>

<details>
<summary>Search Console top queries</summary>
[tabulka s top 20 queries]
</details>
```

Rating ma explicitni kriteria pro konzistenci: 8+ = vse roste, 5-7 = mix, <5 = vice alertu. Doporuceni jsou ICE-scored (z growth skill frameworku).

---

## Agent flow

```
1. LOAD CONFIG
   Precte projects/{project}.yaml

2. COLLECT DATA (sekvencne — claude zpracovava tooly sekvencne)
   a) GA4 MCP → sessions, users, events, pages (this week + last week)
   b) Search Console MCP → queries, clicks, impressions, positions
   c) PostgreSQL via Bash psql → backend metriky
   Pozn: Batching GA4 queries — min pocet runReport callu, max metrik per call.

3. COMPUTE
   - WoW a MoM zmeny pro kazdou metriku
   - Anomaly detection (prekroceni thresholdu z configu)
   - Funnel konverze (impressions → clicks → signup_cta → signup_success)

4. ANALYZE (skill frameworky z template)
   Agent aplikuje frameworky embedovane v sablone:
   - ICE scoring na kazde doporuceni
   - AARRR funnel analyza
   - SEO checklist (pozice vs CTR, klicova slova)
   Agent rozhodne co je zajimave na zaklade dat + frameworku.
   Nevolá skills dynamicky — pouziva znalosti z template.

5. COMPOSE REPORT
   Sestavi markdown s YAML frontmatter
   Prida rating 1-10 (dle explicitnich kriterii)
   Ulozi do reports/{project}/YYYY-MM-DD-{type}.md

6. NOTIFY (volitelne, budouci)
   Email s headline + rating + top 2 doporuceni
```

---

## Spousteni

### Scheduled (tydni report)

```bash
# Cron — nedele 20:00
0 20 * * 0 cd ~/Projects/agents/analytics-monitor && \
  claude -p "Run weekly analytics report for editor-menu. \
  Read projects/editor-menu.yaml for config. \
  Use GA4 and Search Console MCP tools to collect data. \
  Query backend DB using psql via Bash. \
  Save report to reports/editor-menu/$(date +\%Y-\%m-\%d)-weekly.md" \
  --mcp-config projects/editor-menu.mcp.json \
  --allowedTools "mcp__google-analytics__*,mcp__gsc__*,Bash,Read,Write,Glob" \
  --dangerously-skip-permissions \
  --max-turns 25 \
  --model sonnet \
  2>> logs/cron.log
```

Klicove zmeny oproti v1:
- `claude -p` (ne `--print` — je to to same, `-p` je zkratka)
- `--mcp-config` per-project (resi multi-property GA4)
- `--allowedTools` explicitni seznam (bezpecnost)
- `--dangerously-skip-permissions` (headless beh)
- `--max-turns 25` (limit aby se nezacyklil)
- `--model sonnet` (levnejsi nez opus pro rutinni reporty)
- stderr do `logs/cron.log` (ne /dev/null)

### On-demand (skill v terminalu)

```
/analytics:report                    # weekly report pro vsechny projekty
/analytics:report editor-menu        # konkretni projekt
/analytics:report editor-menu --ad-hoc "proc klesly konverze minuly tyden?"
```

On-demand bezi v aktivni Claude Code session — ma pristup ke vsem skills primo. Muze pouzit i dynamicke skill volani. Report ulozi + muzes se doptat v konverzaci.

### Konzumace reportu

- Terminal: `cat reports/editor-menu/2026-02-23-weekly.md`
- Cowork / Claude.ai: "Precti posledni analytics report pro editor-menu"
- "Porovnej poslednich 4 tydni reportu — jaky je trend?"
- GitHub na mobilu (reports v gitu)

---

## Klicova rozhodnuti

| Rozhodnuti | Volba | Duvod |
|---|---|---|
| Runtime | Claude Code session (`claude -p`) | Pristup ke skills + MCP, nic reimplementovat |
| Config | YAML per-project + per-project `.mcp.json` | Resi GA4 1-property omezeni |
| Data zdroje | GA4 + GSC + PostgreSQL | Business metriky z backendu jsou klicove |
| Inteligence | Embedovane skill frameworky v sablone | Skills nelze volat dynamicky v headless modu |
| Output | Markdown + YAML frontmatter | Citelne vsude, parsovatelne strojove |
| Spousteni | Cron weekly + on-demand skill | Automaticke + interaktivni |
| Uloziste | ~/Projects/agents/analytics-monitor/ | Oddelene od skills i projektu |
| Model | Sonnet pro scheduled, Opus pro ad-hoc | Cost optimization |

---

## Review findings (2026-02-23)

### Opraveno v v2

| Issue | Problem | Reseni |
|---|---|---|
| C1: GA4 = 1 property | `GA_PROPERTY_ID` hardcoded pri startu | Per-project `.mcp.json` + `--mcp-config` flag |
| C2: GSC MCP neexistuje | Zadny server v registru | `mcp-server-gsc` npm balicek (157 stars), nutno nainstalovat |
| C3: `--print` nepouziva tooly | Reviewer tvrdil ze ne | VYVRÁCENO — `--allowedTools` + `--dangerously-skip-permissions` funguji s `-p` mode |
| C4: Spatny DB env var | `EDITOR_MENU_DB_URL` neexistuje | Opraveno na `DATABASE_URL` |
| W1: Skills nejsou volatelne | Agent nemuze `/skill` v headless | Embedovat frameworky do sablony |
| W2: GA4 MCP disabled | V skills projektu disabled | Agents/ ma vlastni `.mcp.json` |
| W3: Silent cron failures | `> /dev/null 2>&1` | `2>> logs/cron.log` |
| W4: competitive-analysis | Spatny skill pro referral | Odstraneno — referral je GA4 query |
| W5: "Paralelne" nerealne | Claude zpracovava sekvencne | Opraveno na "sekvencne", batching GA4 queries |

### Otevrene otazky

- Service account pristup: ma `ga4-mcp-server@flatwhite-475506` pristup k editor-menu GA4 i Search Console? Pokud ne, nutno pridat.
- DB dostupnost: PostgreSQL na `localhost:5434` (Docker) nemusi bezet pri cron fires v nedeli 20:00. Cron by mel overit dostupnost a gracefully skipnout backend metriky pokud DB neni up.
- `mcp-server-gsc` setup: Overit auth metodu (service account JSON vs OAuth) a kompatibilitu.

---

## Dalsi kroky (implementace)

### Step 0: Spike test (PRED vším ostatnim)

Overit ze `claude -p` s MCP tools realne funguje:

```bash
cd ~/Projects/agents/analytics-monitor
claude -p "Use the google-analytics runReport tool to get sessions for the last 7 days. Print the result." \
  --mcp-config projects/editor-menu.mcp.json \
  --allowedTools "mcp__google-analytics__*" \
  --dangerously-skip-permissions \
  --max-turns 5
```

Pokud tohle vrati realna data z GA4 → pokracujeme. Pokud ne → hledat alternativu.

### Step 1: Setup

1. Vytvorit `~/Projects/agents/analytics-monitor/` strukturu
2. `git init` + push na GitHub
3. Nainstalovat `mcp-server-gsc`: overit auth, pridat do `.mcp.json`
4. Overit service account pristup ke vsem properties

### Step 2: Editor-menu config

1. Zjistit editor-menu GA4 property ID
2. Napsat `projects/editor-menu.yaml` s realnymi hodnotami
3. Napsat `projects/editor-menu.mcp.json`
4. Otestovat kazdou data source zvlast (GA4 query, GSC query, psql query)

### Step 3: Report sablona

1. Napsat `templates/weekly-report.md` s embedovanymi skill frameworky
2. Otestovat: dat agentovi sample data + sablonu, overit ze produkuje spravny format

### Step 4: Skill

1. Vytvorit skill `analytics:report` v skills repu
2. Otestovat on-demand: `/analytics:report editor-menu`
3. Otestovat ad-hoc: `/analytics:report editor-menu --ad-hoc "..."`

### Step 5: Cron

1. Nastavit cron (lokalne nebo VPS)
2. Otestovat dry run
3. Overit ze report se ulozi a log se zapise

### Step 6: Dalsi projekty

1. Pridat shiftstreak, flatwhite config
2. Otestovat multi-project cron
