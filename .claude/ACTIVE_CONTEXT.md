# Aktualni stav prace

## Posledni session

- **Datum:** 2026-05-09
- **Branch:** main (feat/planning-recon-phase merged + smazan)
- **Dokonceno:**
  - **Recon Phase 1 step pridan do `development:planning` skillu** — POVINNY krok pred Explore approaches. 5-bodovy checklist (existing API, handlers, stack facts, lazy-load, pre-existing bugs) + 2 cesty (inline grep / spawn `feature-dev:code-explorer`).
  - **`review:plan-challenger` updated** — novy Step 2.5 "Verify Recon Section" greppy kazdy cited method/handler/stack claim. Hallucinated API → CRITICAL. Dimension 1 prejmenovan na "Hidden Dependencies & Hallucinated APIs".
  - **Merge commit `54956a8` na main, pushed origin**
  - **Marketplace cache pulled** (`~/.claude/plugins/marketplaces/skills/`) + plugin cache synced (development + review)
  - **Symlinks synced** (Gemini CLI 111, Cowork 131)

- **Rozdelano:**
  - Reálný test Recon flow na příštím planning úkolu (validace, jestli 5-bodový checklist + code-explorer agent fakt zachytí Phase-3 hallucination problémy z minula).

## Klicove insights ze session

- **Pain point z minula** (Sellastica reorder slot plan REJECT): plan-challenger odhalil 4 CRITICAL po napsání plánu — všechny by zachytil jednoduchý Recon (grep existing API, handler names, framework primitives, lazy-load patterns) v Phase 1. Recon = pojistka proti hallucinated APIs PŘED design fází.
- **Anti-pattern v původní planning skill Phase 1 Step 1:** "Look at relevant code" je moc vágní → user (nebo subagent) skipne nebo udělá generic scan. Fix = explicit checklist s grep příkazy + požadavek na konkrétní `file:line` refs.
- **Code-explorer agent** (`feature-dev:code-explorer`) fitne přesně na Recon use-case: fresh context, traces execution paths, maps architecture layers — nezere parent tokeny.

## Otevrene problemy

- Změny live od příštího Claude Code restartu. Restart → /plugins refresh není potřeba (cache je file-based).
- Gemini CLI / Cowork → restart pro symlink pickup.

## Poznamky pro dalsi session

- Při dalším /development:planning úkolu sleduj: zda Phase 1 Step 2 Recon fakt vygeneruje konkrétní zjištění, zda plan-challenger Step 2.5 najde hallucinations.
- Pokud Recon checklist bude moc rigid pro malé úkoly (1-3 soubory) → zvážit thresholds nebo "skip pokud trivial" exit.

## Dalsi kroky

### Priorita 1 — pending z minulé session (negotiation plugin)

1. Restart Claude Code → `/plugins` → install **negotiation**
2. Smoke testy 6 scénářů
3. Cowork test (skill picker check)
4. Gemini CLI test

### Priorita 2 — Recon validation

5. Přiští reálný planning úkol → validovat Recon flow (zda fakt zachytí hallucinated APIs)
6. Pokud Recon spawne `feature-dev:code-explorer` → measure tokens saved vs inline

### Priorita 3 — v1.1 negotiation uplift

7. Pařík + Dolník PDFs upload do NotebookLM (`8b989435-d568-4248-a3a1-4ddd8ea57da2`)
8. CZ-deltas reference uplift s direct Pařík quotes
9. Navarro *Be Exceptional* import → reading-people Tier 2 leadership extension

### Priorita 4 — carry-over

10. `.zshenv` GEMINI_API_KEY rotace
11. Cowork enable creative@skills
12. Statusline backup do claude-config repo
13. `/quickcommit` skill
14. sell-like-crazy + ig-content tests
15. Cowork marketplace pull diagnostika
16. Generalize get-key.sh do shared lib
17. Hormozi 100m Offers import do marketing:offers
