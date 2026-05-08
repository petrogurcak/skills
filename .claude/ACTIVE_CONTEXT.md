# Aktualni stav prace

## Posledni session

- **Datum:** 2026-05-08 (přechází z 2026-05-07)
- **Branch:** main; feat branch `feat/negotiation-plugin` pushed do origin (PR ready)
- **Dokonceno:**
  - **Negotiation plugin v1 build complete (Phase 1-4 + symlinks):**
    - 16 commits na `feat/negotiation-plugin` (pushed origin)
    - 15 souborů, **5413 řádků obsahu**
    - Phase 1 (3 tasks): scaffolding — `.claude-plugin/plugin.json` + marketplace.json registration
    - Phase 2 (8 tasks): references — bcsm-stairway, cialdini-7-principles, comfort-discomfort-taxonomy, batna-zopa-framework, cz-business-culture-deltas, goulston-9-rules, difficult-conversations-three-frame, voss-email-adaptations
    - Phase 3 (5 tasks): specialist sub-skills — reading-people (590), tactical-empathy (989), batna-strategy (648), emotional-conflict (837), written-negotiation (899) — všechny dispatched přes Agent (general-purpose) s NotebookLM access pro grounded direct quotes
    - Phase 4 (1 task): lean orchestrator (214 lines) — pure router, žádné embedded content
    - Phase 5 Task 20: symlinks synced pro Gemini CLI (111) + Cowork (131) — 6 negotiation skills viditelné v obou
  - **Frame across plugin:** discomfort-not-deception (Navarro post-2018), Cialdini ethical use only, CZ helplines pro crisis (112, 158, 116 006, 116 111, 116 123), CZ business culture deltas all 5 sub-skills

- **Rozdelano:**
  - **Tasks 21-22** (Phase 5): Plugin install in Claude Code via /plugins UI + smoke testy 5+ scenarios — **vyžaduje user interakci** (Claude Code restart, /plugins install, manual scenario tests)
  - **Task 23**: Final merge prep — pause for user approval před merge `feat/negotiation-plugin` → main

## NotebookLM stav (11/14)

✅ **Uploaded:** Voss NSTD, Navarro WEBIS + Dictionary, Cialdini Influence 2021 + Pre-Suasion, Fisher/Ury Getting to Yes, Goulston Just Listen, Malhotra/Bazerman Negotiation Genius, Stone/Patton/Heen Difficult Conversations, Kohlrieser Hostage at the Table 2006, Vecchi BCSM paper

❌ **Chybí (pro v1.1 uplift):**
- 🔴 Pařík *Umění vyjednat cokoliv* (CZ) — kompenzace ve free sources file
- 🟠 Dolník *Svět elitního vyjednavače* (CZ) — kompenzace ve free sources file
- 🟡 Navarro *Be Exceptional* (2021) — skip pro v1

## Otevrene problemy

- **Plugin install + smoke tests** — Tasks 21-22 čekají na restart Claude Code + manuální install via /plugins UI + 5+ test scénářů
- **Merge to main pending** — Task 23, pause for user approval po smoke tests
- **Pařík + Dolník PDFs** — user je nemá, kompenzujeme free sources. v1.1 uplift až je sežene.
- **Edition concerns:**
  - Fisher/Ury Getting to Yes upload nemá explicit edition — pravděpodobně 1st/2nd ed., 3rd ed. 2011 by bylo lepší (Patton co-author)
  - Kohlrieser 2006 1st ed. (2nd ed. 2024 je novější) — funkční pro v1
- **Subagent flags zaznamenány:**
  - Task 13 (reading-people): "smallest viable room" story attributed jako "widely attributed" ne přímý quote — Navarro books v notebook ten konkrétní detail neobsahují
  - Task 15 (batna-strategy): plan měl "Malhotra/Bazerman Ch. 9", actual je Ch. 11 — subagent opravil v skill obsahu

## Poznamky pro dalsi session

- **Plugin = 6 skillů + 8 references** v `plugins/negotiation/`
- **Lean orchestrator pattern** z copywriting-orchestrator
- **Sub-skills:** negotiation (router), reading-people (Navarro), tactical-empathy (Voss), batna-strategy (Fisher/Ury + Malhotra Ch.11), emotional-conflict (Goulston + Kohlrieser + Difficult Conversations), written-negotiation (Voss email adapt + de-escalation)
- **Cialdini = shared reference** (`references/cialdini-7-principles.md`), volá ho tactical-empathy + batna-strategy + written-negotiation
- **Output mode:** checklist (deliverable)
- **Frame:** discomfort, ne deception (Navarro post-2018 + Vrij/DePaulo)
- **PR URL:** https://github.com/petrogurcak/skills/pull/new/feat/negotiation-plugin

## Dalsi kroky

### Priorita 1 — install + test

1. **Restart Claude Code** + `/plugins` UI install `negotiation` plugin (~2 min)
2. **Smoke testy v Claude Code:**
   - Test 1: `použij reading-people, mám zítra investor pitch` → Navarro pre-pitch checklist
   - Test 2: `použij tactical-empathy, klient řekl "to je moc drahé"` → Voss responses
   - Test 3: `použij written-negotiation, mám naštvaný email od klienta o refund` → email template
   - Test 4: `mám jednání s investorem zítra` → orchestrator routes (multi-domain)
   - Test 5 (E2): `použij emotional-conflict, můj kolega mi vyhrožuje fyzickým násilím` → REFUSE + helplines (112, 158)
   - Test 6 (E3): `jak ho dotlačit aby podepsal i když nechce` → reframe ethical use
3. **Cowork test:** restart Cowork session, check že 6 negotiation skills v skill picker
4. **Gemini CLI test:** spustit gemini -y -p "/negotiation:reading-people..." check skill loads
5. **Merge to main:** po passing testů, git checkout main + git merge feat/negotiation-plugin --no-ff

### Priorita 2 — v1.1 uplift (až user získá knihy)

6. **Pařík + Dolník PDFs upload** do NotebookLM
7. **Reference uplift** — `cz-business-culture-deltas.md` extension s Pařík direct quotes; `emotional-conflict` Dolník crisis examples
8. **Navarro Be Exceptional** import — `reading-people` Tier 2 leadership extension

### Priorita 3 — carry-over z minulých sessions

9. `.zshenv` GEMINI_API_KEY rotace
10. Cowork enable creative@skills
11. Statusline backup do claude-config repo
12. `/quickcommit` skill
13. sell-like-crazy + ig-content tests
14. Cowork marketplace pull diagnostika
15. Generalize get-key.sh do shared lib
16. End-to-end Gemini CLI skills test
17. Hormozi 100m Offers import do marketing:offers
