---
status: complete
created: 2026-02-26
type: architecture
scope: all-agents
tasks_total: 5
tasks_done: 4
reviewed: 2026-02-26
note: "4/5 done. Task 5 (team-briefing) deferred until 2+ personas active."
---

# Multi-Agent Architecture — Design Document

**Goal:** Standardizovat opakovatelny pattern pro autonomni AI agenty (persony) s ucenim, skills, a orchestraci.

**Reference implementace:** analytics-monitor (prvni persona)

> **Navazujici plany:**
>
> - `2026-02-23-analytics-monitor-agent-design.md` — existujici design v2
> - `2026-02-24-learning-advisor-design.md` — learning loop design

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      PERSONAS                            │
│  Autonomni agenti — bezi na schedule, maji memory        │
│                                                          │
│  analytics ── product ── seo ── growth ── copywriting    │
│  brand ── ux ── security ── ...                          │
│                                                          │
│  Kazda persona:                                          │
│  ├── pouziva 1+ skills (knowledge)                       │
│  ├── ma template (jak delat svou praci)                  │
│  ├── ma memory per-project (co vi o projektech)          │
│  ├── bezi na cron (tydenni/mesicni)                      │
│  └── navrhuje akce pro projekty                          │
└──────────────┬──────────────────────┬────────────────────┘
               │ pouziva              │ uci se z
               ▼                      ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│          SKILLS          │  │      LEARNING ADVISOR        │
│  (znovu-pouzitelne)      │  │  (skenuje, navrhuje)         │
│                          │  │                              │
│  ~/Projects/skills/      │  │  RSS feedy → proposals       │
│  plugins/*/skills/*/     │  │  NotebookLM → deep context   │
│                          │  │  Knowledge registry          │
│  Pouziva kdokoli:        │  │                              │
│  Claude Code, Gemini,    │  │  Loop:                       │
│  OpenClaw, team-briefing │  │  scan → propose → approve    │
│                          │  │  → process → update persona  │
└──────────────────────────┘  └──────────────────────────────┘
               │                      │
               └──────────┬───────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│               KNOWLEDGE SOURCES                          │
│                                                          │
│  RSS feedy ── clanky ── knihy (NotebookLM) ── docs       │
│  Vsechno trackovano v knowledge-registry.yaml            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  ORCHESTRACE                             │
│                                                          │
│  OpenClaw cron ── Discord notifikace ── team-briefing    │
│  (future) UI dashboard s aktivitou a logy                │
└─────────────────────────────────────────────────────────┘
```

### Klicove principy

1. **Persona ≠ Skill.** Skill je znalost (reusable). Persona je agent ktery znalost aplikuje na konkretni projekt.
2. **Skill je read-only.** Persona cte skills, ale nikdy je nemodifikuje. Skills se meni jen rucne nebo pres learning-advisor loop.
3. **Learning je oddeleny.** Persona nedela research — jen svou praci. Learning advisor doplnuje znalosti mesicne.
4. **Memory je per-project.** Kazda persona ma vlastni memory soubor v kazdem projektu kde je aktivni (`{project}/.claude/agents/{persona}.md`).
5. **OpenClaw je scheduler.** Persony bezi jako izolované OpenClaw cron joby. Nemuseji byt OpenClaw agenti — jsou skills v OpenClaw workspace.

---

## 2. Persona Standard

### 2.1 Adresarova struktura

```
~/Projects/agents/{persona-name}/
├── persona.yaml                    # Manifest — identita, skills, schedule
├── templates/
│   └── {task-type}.md              # Instrukce pro kazdy typ prace
├── projects/
│   └── {project-name}.yaml         # Per-project config (data zdroje, cile, metriky)
├── reports/                        # Output (generovane reporty, audity)
│   └── {project-name}/
│       └── YYYY-MM-DD-{type}.md
└── logs/
    └── YYYY-MM-DD.log              # Logy behu
```

### 2.2 Persona Manifest (`persona.yaml`)

```yaml
# ~/Projects/agents/analytics-monitor/persona.yaml
name: analytics-monitor
display_name: "Analytics Monitor"
version: "1.0.0"

# Identita
role: >
  Analyticky poradce ktery sleduje GA4, Search Console a backend metriky,
  detekuje anomalie a navrhuje akce na zaklade dat.

# Jake skills pouziva (reference — embedduje frameworky do template)
skills:
  - path: "plugins/development/skills/analytics-report/SKILL.md"
    what_uses: "Report struktura, GA4 queries, analyticke frameworky"
  - path: "plugins/marketing/skills/analytics-setup/SKILL.md"
    what_uses: "GTM patterny, event tracking, consent mode"
  - path: "plugins/growth/skills/growth-hacking/SKILL.md"
    what_uses: "ICE scoring framework"
  - path: "plugins/seo/skills/seo-optimization/SKILL.md"
    what_uses: "SEO diagnostics (CTR vs pozice)"

# Schedule (dokumentacni — source of truth je OpenClaw cron config)
# Viz: `openclaw cron list` pro aktualni stav
schedule:
  type: weekly # weekly | monthly | bi-weekly | on-demand
  runner: claude-p # openclaw | claude-p (MCP-dependent persony)

# Projekty kde je persona aktivni
projects:
  - editor-menu

# Learning advisor napojeni
learning:
  sources_config: "/Users/petrogurcak/Projects/agents/learning-advisor/sources/analytics-monitor.yaml"
```

### 2.3 Per-Project Config

Kazdy projekt kde persona pracuje ma vlastni config:

```yaml
# ~/Projects/agents/analytics-monitor/projects/editor-menu.yaml
project: editor-menu
name: "Editor.menu"
url: "https://editor.menu"

# Cilovy projekt repo (kde je agent memory)
repo: "/Users/petrogurcak/Projects/etapa/menu-editor"
memory: "{repo}/.claude/agents/analytics.md"

# Data zdroje
sources:
  ga4:
    property_id: "EDITOR_MENU_PROPERTY_ID"
    key_events: [signup_cta, signup_success, pricing_cta, ...]
  search_console:
    site_url: "sc-domain:editor.menu"
  backend:
    type: postgres
    queries: { ... }

# Cile
goals:
  stage: traction
  north_star: weekly_active_accounts
  targets:
    weekly_signups: 10
    activation_rate: 30%
    bounce_rate_max: 60%
```

### 2.4 Agent Memory (`{project}/.claude/agents/{persona}.md`)

```markdown
# Analytics Monitor — Editor.menu

## Trendy (aktualizuje agent po kazdem reportu)

- Sessions: 342 (WoW -12.3%)
- Registrace: 4 (stabilni)
- ...

## Otevrene issues

- [ ] Signup funnel: CTA click rate na homepage je nizky
- [x] Import error tracking nasazeno (2026-02-24)

## Learning proposals

- [ ] "Jak merit micro-conversions v GA4" — vidim data ale nemam framework

## Flags (conditional recommendations)

- custom_channel_group_ai: false
- tag_gateway_enabled: false
- consent_mode_verified: false
```

---

## 3. Skill vs Persona — rozdeleni zodpovednosti

| Aspekt          | Skill (SKILL.md)                                       | Persona (template + persona.yaml)                               |
| --------------- | ------------------------------------------------------ | --------------------------------------------------------------- |
| **Ucel**        | Znalost a frameworky                                   | Aplikace znalosti na konkretni projekt                          |
| **Kdo pouziva** | Kdokoli (Claude Code, Gemini, OpenClaw, team-briefing) | Jen persona sama (autonomne)                                    |
| **Kde zije**    | `~/Projects/skills/plugins/*/skills/*/`                | `~/Projects/agents/{persona}/`                                  |
| **Meni se**     | Rucne nebo pres learning-advisor                       | Automaticky (kazdy beh updatne memory)                          |
| **Stav**        | Bezstavovy (stejny pro vsechny)                        | Stavovy (memory per-project)                                    |
| **Schedule**    | Zadny (on-demand)                                      | Cron (tydenni/mesicni)                                          |
| **Priklad**     | `analytics-report` — jak psat report                   | `analytics-monitor` — pise report pro editor-menu kazdou nedeli |

### Pravidlo: Skill ucí CO, Persona delá JAK a PRO KOHO.

Skill `analytics-report` definuje: jake GA4 queries spustit, jaky format reportu, jake frameworky pouzit.

Persona `analytics-monitor` definuje: pro ktery projekt, s jakymi cily, s jakou memory, na jakem schedule.

Template persony (`templates/weekly-report.md`) **embeduje** relevantni casti skills — protože v headless mode nejde skills dynamicky volat. Learning advisor udrzuje template aktualni.

---

## 4. Learning Loop

```
                    ┌─────────────────┐
                    │   RSS feedy     │
                    │   NotebookLM    │
                    │   Agent memory  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  SCAN           │  1. mesice 20:00
                    │  (OpenClaw      │  Cte RSS, porovnava s last-scan,
                    │   cron skill)   │  cte agent memory pro reactive proposals
                    └────────┬────────┘
                             │ proposals/pending/
                    ┌────────▼────────┐
                    │  APPROVE        │  Petr v Discordu/terminalu
                    │  (human)        │  mv pending → approved
                    └────────┬────────┘
                             │ proposals/approved/
                    ┌────────▼────────┐
                    │  PROCESS        │  2. mesice 20:00
                    │  (OpenClaw      │  Fetchne clanek, extrahuje poznatky,
                    │   cron skill)   │  updatne persona template/memory,
                    │                 │  zapise do knowledge-registry,
                    │                 │  pta se NotebookLM kdyz nevi
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  PERSONA        │  Pristi beh pouziva
                    │  (updatnuty     │  updatovane znalosti
                    │   template)     │
                    └─────────────────┘
```

### Learning Advisor — sdilena infrastruktura

```
~/Projects/agents/learning-advisor/
├── config.yaml                         # Globalni config
├── sources/
│   ├── analytics-monitor.yaml          # RSS + NotebookLM + skills per persona
│   ├── product-advisor.yaml            # (budouci)
│   ├── seo-monitor.yaml                # (budouci)
│   └── .last-scan-{persona}.yaml       # Tracker
├── proposals/
│   ├── pending/
│   ├── approved/
│   └── archive/
├── knowledge-registry.yaml             # Vsechny zpracovane zdroje (across all personas)
└── templates/
    └── scan-sources.md                 # (legacy — nahrazeno OpenClaw skill)
```

### Sources config per persona

```yaml
# sources/analytics-monitor.yaml
agent: analytics-monitor
agent_path: "/Users/petrogurcak/Projects/agents/analytics-monitor"

skills:
  - path: "plugins/development/skills/analytics-report/SKILL.md"
  - path: "plugins/marketing/skills/analytics-setup/SKILL.md"

memory_files:
  - path: "/Users/petrogurcak/Projects/etapa/menu-editor/.claude/agents/analytics.md"
    what_to_look_for: "## Learning proposals"

template: "/Users/petrogurcak/Projects/agents/analytics-monitor/templates/weekly-report.md"
knowledge_registry: "/Users/petrogurcak/Projects/agents/learning-advisor/knowledge-registry.yaml"

# NotebookLM notebooks
notebooks:
  - name: "Analytics Knowledge"
    notebook_id: "TBD"
    topics: [GA4, GTM, measurement, reporting]
    use_for: "Doplnkove dotazy pri zpracovani — kdyz agent nevi"

# RSS feedy
sources:
  - name: "Simo Ahava"
    rss: "https://www.simoahava.com/index.xml"
    homepage: "https://www.simoahava.com/"
    what_to_look_for: "GTM, GA4, server-side tagging, consent mode"
    relevance: "Agent doporucuje GTM zmeny. Simo je #1 autorita."

  - name: "Analytics Mania"
    rss: "https://www.analyticsmania.com/feed/"
    homepage: "https://www.analyticsmania.com/post/"
    what_to_look_for: "GA4 how-to, GTM recipes, e-commerce tracking"
    relevance: "Prakticke tutorialy pro doporuceni v reportech."

  - name: "GA4 Blog (Google)"
    rss: "https://blog.google/products/marketingplatform/analytics/rss/"
    homepage: "https://blog.google/products/marketingplatform/analytics/"
    what_to_look_for: "GA4 API zmeny, deprecations, nove features"
    relevance: "Agent pouziva runReport. Zmeny API = zmeny v template."
```

---

## 5. Knowledge Registry

Centralni soubor trackujici VSECHNY zdroje ze kterych persony cerpaly.

```yaml
# ~/Projects/agents/learning-advisor/knowledge-registry.yaml
last_updated: 2026-02-26

# RSS feedy (aktivni, skenuje scan skill)
rss_sources:
  analytics-monitor:
    - name: "Simo Ahava"
      url: "https://www.simoahava.com/"
      topics: [GTM, GA4, server-side tagging]
    - name: "Analytics Mania"
      url: "https://www.analyticsmania.com/"
      topics: [GA4, GTM, e-commerce]
    - name: "GA4 Blog"
      url: "https://blog.google/..."
      topics: [GA4 API, features, deprecations]

# NotebookLM notebooks (per persona)
notebooks:
  product-advisor:
    - name: "Product Management Research"
      notebook_id: "df52ce66-7bb9-4987-82e4-da49ff0e0e84"
      topics: [PM frameworks, discovery, prioritization, PMF]
  copywriting:
    - name: "Storytelling Research"
      notebook_id: "211b9a74-cf6b-4523-97b2-94aeb8406535"
      topics: [storytelling, StoryBrand, ABT, narrative]
  brand:
    - name: "Logo Design Research"
      notebook_id: "42b9b16c-4ee3-429d-b2d3-74d92ccd0b2b"
      topics: [logo, branding, color psychology, typography]
  analytics-monitor:
    - name: "Analytics Knowledge"
      notebook_id: "TBD"
      topics: [GA4, GTM, measurement]

# Zpracovane clanky (z archivovanych proposals)
processed_articles:
  - url: "https://..."
    title: "..."
    persona: analytics-monitor
    processed: "2026-02-26"
    proposal: "LP-2026-02-001"
    what_changed: "..."

# Knihy a kurzy
processed_books: []
```

---

## 6. OpenClaw Integration

### Workspace Skills (per persona)

Kazda persona ma OpenClaw workspace skill ktery ji umi spustit:

```
~/.openclaw/workspace/skills/
├── learning-advisor/SKILL.md            # Scan zdroju
├── learning-advisor-process/SKILL.md    # Zpracovani proposals
├── analytics-report/SKILL.md            # (budouci) Spusti weekly report
├── product-review/SKILL.md              # (budouci)
└── ...
```

### Cron Jobs

| Job              | Schedule        | Persona           | Co dela                         |
| ---------------- | --------------- | ----------------- | ------------------------------- |
| morning-briefing | 7:30 denne      | —                 | Git status, NOW.md queue        |
| weekly-review    | nedele 20:00    | —                 | Tydenni souhrn commitu          |
| analytics-weekly | nedele 20:00    | analytics-monitor | Tydenni analytics report        |
| learning-scan    | 1. mesice 20:00 | learning-advisor  | Skenuje RSS pro vsechny persony |
| learning-process | 2. mesice 20:00 | learning-advisor  | Zpracuje schvalene proposals    |

### Proc OpenClaw a ne claude -p cron

|                    | OpenClaw cron                       | claude -p + launchd             |
| ------------------ | ----------------------------------- | ------------------------------- |
| **Delivery**       | Primo do Discordu                   | Nutne scriptem                  |
| **Monitoring**     | `openclaw cron list` + runs history | Logy v souborech                |
| **Model override** | Per-job (`--model sonnet`)          | Per-invocation flag             |
| **Retry**          | Automaticky s backoff               | Manual                          |
| **Tools**          | exec, file, browser, memory         | WebFetch, Read, Write (omezene) |
| **Nested issue**   | Neni (agent skenuje sam)            | claude -p v claude -p = crash   |

---

## 7. Team Briefing Integration

Skill `team:team-briefing` aktivuje virtualni persony pro review planu. S formalizovanymi personami se toto zlepsí:

**Ted:** Team briefing pouziva genricke role (marketing, growth, SEO, ...).

**Cil:** Team briefing pouziva skutecne persony s jejich memory a context:

```
User: "Review my plan for editor-menu homepage redesign"

team-briefing:
  1. Nacte analytics-monitor memory pro editor-menu
     → vi ze sessions klesaji, CTA click rate nizky
  2. Nacte product-advisor memory pro editor-menu
     → vi o pricing experimentu, PMF survey vysledcich
  3. Kazda persona reviewuje plan z pohledu svych dat
  4. Souhrn: data-backed review, ne genericke rady
```

**Implementace:** Team briefing skill precte `~/Projects/agents/*/persona.yaml` a pro kazdy aktivni projekt nacte relevantni memory soubory. Persony ktery nemaji memory pro dany projekt se neaktivuji.

---

## 8. Roadmap — Planovane Persony

| Persona                  | Skill(s)                                               | Schedule  | NotebookLM                  | Priorita     |
| ------------------------ | ------------------------------------------------------ | --------- | --------------------------- | ------------ |
| **analytics-monitor**    | analytics-report, analytics-setup, growth-hacking, seo | weekly    | TBD (vytvorit)              | **existuje** |
| **product-advisor**      | product-\* (6 skills)                                  | monthly   | Product Management Research | vysoka       |
| **seo-monitor**          | seo-\*, technical-seo, ai-ready                        | bi-weekly | —                           | stredni      |
| **growth-advisor**       | growth-\*, saas-bootstrap, PLG                         | monthly   | —                           | stredni      |
| **copywriting-reviewer** | copywriting-\*, storytelling                           | on-demand | Storytelling Research       | nizka        |
| **brand-advisor**        | logo-design                                            | on-demand | Logo Design Research        | nizka        |
| **ux-reviewer**          | ux-\* (3 skills)                                       | on-demand | —                           | nizka        |

### Pravidla pro pridani nove persony

1. Persona musi mit alespon 1 existujici skill
2. Persona musi mit alespon 1 aktivni projekt
3. Persona musi mit definovane schedule (i kdyz je "on-demand")
4. Learning advisor musi mit sources config pro personu
5. Team briefing musi vedet o persone

---

## 9. Implementation Tasks

### Task 1: Create persona.yaml for analytics-monitor

Formalizovat existujici analytics-monitor do persona.yaml standardu.

**Files:**

- Create: `~/Projects/agents/analytics-monitor/persona.yaml`
- Verify: existing `templates/weekly-report.md` aligns with standard
- Verify: existing `projects/editor-menu.yaml` matches per-project config format

### Task 2: Restructure learning-advisor for multi-persona (ATOMIC)

Restructure knowledge-registry, update scan skill, update process skill — vsechno najednou.

**Pred zacatkem:** `openclaw cron edit <scan-id> --enabled false && openclaw cron edit <process-id> --enabled false`
**Po dokonceni:** Re-enable oba cron joby.

**Substeps:**

1. Restructure `knowledge-registry.yaml` — per-persona namespacing
2. Update scan skill — cte `persona.yaml` pro kontext, per-persona registry writes
3. Update process skill — per-persona registry writes, **odstranit** schopnost modifikovat SKILL.md soubory (jen template + memory). Pridejte `type: manual` pro zmeny vyzadujici rucni zasah do skills repa.
4. NotebookLM: oznacit jako optional (implementovat az bude `nlm` auth + notebook vytvoren)

**Files:**

- Modify: `~/Projects/agents/learning-advisor/knowledge-registry.yaml`
- Modify: `~/.openclaw/workspace/skills/learning-advisor/SKILL.md`
- Modify: `~/.openclaw/workspace/skills/learning-advisor-process/SKILL.md`

### Task 3: Spike test — analytics-monitor runner ✅

**Vysledek (2026-02-26):**

- exec file READ outside workspace: **PASS**
- exec file WRITE outside workspace: **PASS**
- exec curl (external HTTP): **PASS**
- GA4 MCP tool: **NOT AVAILABLE** (OpenClaw nema GA4 runReport)
- Model `openai/claude-sonnet-4`: nerozpoznany, fallback na `claude-opus-4`

**Rozhodnuti:** Varianta B — OpenClaw wraps `claude -p` via `exec bash run-weekly.sh`

### Task 4: Wire analytics-monitor cron ✅

**Implementovano varianta B** (OpenClaw wrapper):

- Created: `~/.openclaw/workspace/skills/analytics-report/SKILL.md` — wrapper skill
- Created: OpenClaw cron job `analytics-weekly` (nedele 20:00 CET, isolated, Discord announce)
- Cron ID: `b0ede051-c431-4c76-8a60-61449d8c128d`
- Updated: `persona.yaml` runner changed to `openclaw`

### Task 5: Team-briefing — inject persona memory (lightweight, DEFERRED)

**DEFERRED** do doby nez bezi alespon 2 autonomni persony.

Lightweight enhancement: team-briefing precte `~/Projects/agents/*/persona.yaml` a kde se jmeno persony shoduje s existujici team-briefing roli, inject memory context.

**Prerequisite:** analytics-monitor + alespon 1 dalsi persona aktivni.

**Files:**

- Modify: `~/Projects/skills/plugins/team/skills/team-briefing/SKILL.md`

---

## 10. Decision Log

| Rozhodnuti                    | Volba                                                 | Duvod                                                                             |
| ----------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| Persona bezi na OpenClaw      | OpenClaw cron + workspace skills (nebo exec claude-p) | Delivery do Discordu, monitoring, retry                                           |
| Persona ≠ OpenClaw agent      | Workspace skills, ne multi-agent                      | Jednodussi, sdili memory, netreba separatni workspace                             |
| persona.yaml manifest         | YAML flat (max 2 levels deep)                         | Strojove citatelne, LLM-parseable, muzou ho cist team-briefing i learning-advisor |
| Knowledge registry centralni  | Jeden soubor, per-persona namespacing                 | Prehled vsech zdroju na jednom miste, deduplication across personas               |
| Memory per-project v projektu | `{project}/.claude/agents/{persona}.md`               | Sdilena vsemi agenty, blizko k datum                                              |
| NotebookLM = supplementary    | Pouzit jen pri zpracovani proposals, optional         | Ne jako primary source — clanky jsou aktualni, knihy jsou deep context            |
| Schedule source of truth      | OpenClaw cron config, persona.yaml jen doc            | Neni mechanismus pro sync persona.yaml → cron, tak nechat cron jako zdroj         |
| Skills are read-only          | Learning advisor NIKDY nemodifikuje SKILL.md          | Zmeny skills = `type: manual`, rucne pres skills repo workflow                    |
| MCP-dependent runner          | Spike rozhodne: OpenClaw native vs claude-p           | GA4/GSC MCP tooling nemusi byt dostupne v OpenClaw workspace                      |

### Review findings (2026-02-26)

**Plan-challenger:** 3 CRITICAL, 5 WARNING, 3 INFO. Verdict: REVISE.

| Finding                                         | Resolution                                                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| C1: OpenClaw `workspaceOnly` vs externi soubory | Spike test (Task 3) rozhodne runner. Exec pres absolutni cesty pravdepodobne funguje (learning-advisor uz to dela). |
| C2: Schedule dual source of truth               | Odstraneno z persona.yaml jako deklarativni. OpenClaw cron = source of truth.                                       |
| C3: Tasks 2+3+4 atomicita                       | Spojeno do jednoho Task 2 s disablovanim cronu pred zmenou.                                                         |
| W1: Team-briefing prilis brzy                   | Task 5 DEFERRED do 2+ person.                                                                                       |
| W2: NotebookLM TBD                              | Oznaceno jako optional v Task 2.                                                                                    |
| W3: Process skill muze modifikovat SKILL.md     | Odstraneno. Pridano `type: manual` pro skill zmeny.                                                                 |
| W4: YAML parsing fragile                        | persona.yaml flat (max 2 levels), dokumentovano.                                                                    |
| W5: Vsechny joby na "main" agentovi             | Isolated sessions nepouzivaji MEMORY.md — overit pri spike.                                                         |
