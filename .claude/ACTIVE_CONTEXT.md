# Aktualni stav prace

## Posledni session

- **Datum:** 2026-04-28 (sub-session 2 — pokračování)
- **Branch:** main (pushed: `f06022f`)
- **Dokonceno:**
  - **`marketing:sell-like-crazy` skill** (commit `227a688`):
    - `plugins/marketing/sell-like-crazy.md` (792 lines) — plugin-shared reference banka, full Sabri Suby canon: 8 phases × deep frameworks, 27 indexed methods, 7 case studies s reálnými čísly, Power Words, CZ-EN glossary
    - `plugins/marketing/skills/sell-like-crazy/SKILL.md` (487 lines) — production skill v Otto v3.3 stylu: 8 fází jako sekce, output templates (Godfather Stack, VSL script, Soap Opera Sequence, Sales Letter), 3 production módy (Full Funnel Build / Apply Principles / Cross-Skill Integration)
    - **Source:** Sabri Suby PDF z NotebookLM (358K chars) → `glm-delegate` extraction ($1.53, 14 turns, 90K input tokens)
    - **Cross-linky** v existing copy skills:
      - `copywriting:ig-content` → Phase 4 (Godfather compression) + Phase 6 (VSL pattern interrupt)
      - `copywriting:newsletter` → Phase 8 (P Group, Soap Opera, Daily Email mix)
      - `copywriting:web-copy` → Phase 4 + Phase 6 (sales pages)
  - **Cowork-setup working-rules.md template** (commit `f389a29`): nová sekce "Collaboration patterns" — 7 universal patterns extrahovaných z Flatwhite project memory (editorial autonomy, multi-variants 3-5, iteration cadence, research before hooks, critical feedback, verify before claiming, conciseness, save learnings inline). Aktivuje se při příštím `cowork-setup --init-shared`.
  - **Cowork plugin update fix** (commit `0ed9239`): bumpnul `copywriting/.claude-plugin/plugin.json` 1.0.0 → 2.0.0 — Cowork UI Update tlačítko vyžaduje version bump pro detekci nových skills. Bez bumpu zůstane installed plugin pořád na ottocopy* skills.
  - **Wrapup skill enhancement** (commit `f06022f`): Step 5 (Usage & Savings) + 5b (savings log + threshold promotion) — ccusage tracking, heavy activity analysis, auto-promotion patternů ≥3× do memory feedback files.
  - **Plugin verze:**
    - marketing 1.0.0 → 1.1.0 (sell-like-crazy)
    - copywriting 2.0.0 → 2.1.0 (cross-links)
  - **AGENT.md:** 101 → 102 skills, marketing 7 → 8

- **Rozdelano:** Nic. Tree clean, 4 commity pushed (`0ed9239`, `f389a29`, `227a688`, `f06022f`).

## PŘEDCHOZÍ session (2026-04-28 — Sub-session 1)

- Layered IG architecture (commit `66073f2`): ig-orchestrator + ig-content + ig-strategy. Plugin-shared references: 365-copy-triky.md, core-copywriting-principles.md, core-briefing-process.md.

## Otevrene problemy

- **Cowork marketplace cache nepull-ne přes UI "Check for updates"** — pattern, opakovaně 3× za poslední 2 session. Workaround: manual `git pull` v `~/Library/.../cowork_plugins/marketplaces/skills`. Diagnostika hlubší příčiny pending.
- **Test ig-content vs claude.ai** — produkční verifikace pořád neudělaná (carry-over).
- **Test sell-like-crazy v Cowork** — Cowork updated, čeká na praktický test ("napiš sales page pro Flatwhite La Marzocco service").

## Poznamky pro dalsi session

- **NotebookLM CLI workflow** osvědčený: `nlm login` → `notebook_get` (sources list) → parallel `source_describe` (AI summaries) → `source_get_content` (raw). Source >100K chars přeteče token limit — fallback file dump + jq processing + glm-delegate pro analysis.
- **Plugin versioning convention:** version bump v `plugin.json` JE vyžadován pro Cowork update detection. Bez bumpu installed plugin zůstává na staré verzi i když marketplace cache je up-to-date.
- **Cross-skill principle propagation:** Sell Like Crazy principy se propisují do existing copy skills přes "Integration with Other Skills" sekce. Pattern: skill A má reference banka v plugin-shared `.md`, skill B linkuje konkrétní fáze pro svůj use case. Pattern reusable pro budoucí canon imports (Hormozi 100m Offers → marketing:offers, Dunford → marketing:uvp už existuje).

## Dalsi kroky

### Priorita 1

1. **Test sell-like-crazy v Cowork** — restartni Cowork session, "napiš sales page pro Flatwhite La Marzocco refurbishment" → měl by invoke sell-like-crazy + použít Phase 4/6 templates.
2. **Test ig-content v praxi** — carry-over, "napiš IG post o [Flatwhite produkt]" → porovnej s claude.ai.
3. **Upload sell-like-crazy.md do Flatwhite claude.ai Project Knowledge** — drag-and-drop z `~/Projects/skills/plugins/marketing/sell-like-crazy.md` (nebo z GitHub web UI Raw download na druhém Macu).

### Priorita 2

4. **Cowork marketplace pull diagnostika** — proč UI "Check for updates" nepull-ne? Inspect Cowork app logs, network capture během akce.
5. End-to-end test Gemini CLI na skills projektu (carry-over).
6. Verify 1Password `op run` v Claude Code (carry-over).
7. Cherry-pick `session-start.sh` do claude-config (carry-over).
8. Cowork stale directories cleanup (carry-over).
9. Brand Strategy skill — deep research (carry-over).
10. **Future canon imports** (po sell-like-crazy template): Hormozi 100m Offers do `marketing:offers`, full notebook had 6 books — 4 už mapped k existing skills, 2 použity (Suby + Dunford via uvp-optimization).
