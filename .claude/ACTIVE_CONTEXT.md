# Aktualni stav prace

## Posledni session

- **Datum:** 2026-04-14
- **Branch:** main (pushed)
- **Dokonceno:**
  - **Research** — Gemini deep research na design principles/patterns chybejici v dev workflow (12 principu: Metz, Hickey, Ousterhout, King, Beck, Fowler, Connascence). Ulozeno `docs/research/2026-04-14-designing-abstractions-principles.md`.
  - **Novy skill `development:designing-abstractions`** — design-time skill pro responsibilities-before-abstraction analyzu. 12 principu, 7-step workflow, red flag checklist, Abstraction Strategy artefakt, Grep-first AI context-collapse mitigace. Trigger: "refactor", "DRY", "duplikace", "helper", "dispatcher", shared logic, ≥2 call sites.
  - **Novy skill `review:abstraction-review`** — review-time lens symetricky k designing-abstractions. 12-item red flag checklist + Connascence audit + parallel implementation scan. Severity rules (CRITICAL/HIGH/MEDIUM/LOW). Auto-triggers z deep-review kdyz diff obsahuje helpers/dispatchers.
  - **Principle 14 baked-in** — responsibilities-before-DRY pridany do projectsetup template (`.claude/CORE_PRINCIPLES.md` + `CLAUDE.md` TL;DR s Always-Do/Never-Do rules). Nove projekty ho dostanou automaticky.
  - **Workflow integrations:**
    - `planning` Phase 1 Step 4 — abstraction gate
    - `development-workflow` Phase 1 Step 2 — abstraction check
    - `deep-review` Specialist Skills — auto-trigger abstraction-review
    - `workflow-optimization` Option P — retrofit Principle 14 do existujicich projektu
  - **Necommitnute zmeny z minule session** — ideogram v0.3.0, nanobanana MCP server, image-generation skill update, dtp-typography, AGENT.md — vsechno commitnuto.
  - **.gitignore** — pridano `__pycache__/` a `*.pyc`
  - Commity: `8ff5174` (designing-abstractions), `58d38e6` (creative: ideogram/nanobanana/image-gen), `e16aeef` (AGENT.md + dtp-typography), `55f4928` (abstraction-review + deep-review)
- **Rozdelano:** Nic

## Otevrene problemy

- **utilities:mac-cleanup** — skill funguje pres Skill tool, ale NEOBJEVUJE se v `/` autocomplete menu
- **Root CLAUDE.md plugin table** — potrebuje aktualizovat: development 12→13, review 4→5, total 60→62 skills

## Poznamky pro dalsi session

- Otestovat designing-abstractions v praxi (pouzit pri prvnim refactoru nebo novem modulu)
- Otestovat abstraction-review jako lens v deep-review na realnem PR
- V existujicich projektech (kde chces Principle 14) pustit `/development:workflow-optimization` → Option P
- Finalizovat plakat Winegeek v Etape + Instagram post (carry-over)

## Dalsi kroky

### Priorita 1

1. Aktualizovat root CLAUDE.md plugin table (counts)
2. Test designing-abstractions na realnem use-case
3. Finalni plakat + Instagram post

### Priorita 2

4. Brand Strategy skill — deep research
5. Sales skill — novy plugin
