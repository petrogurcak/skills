# Aktualni stav prace

## Posledni session

- **Datum:** 2026-05-13
- **Branch:** feat/4-new-skills-marketing-copywriting → merge do main pending
- **Dokonceno:**

### 4 nové skills + 2 mid-layer orchestratory + 2 top router updates

**Research foundation (4 reports, 219K total v `docs/research/`):**
- `2026-05-12-email-sequences-indoctrination.md` (55K) — 5 canon books: Hormozi $100M Offers, Brunson Expert Secrets, Brunson DotCom Secrets, Schwartz Breakthrough Advertising, Heath Made to Stick
- `2026-05-12-info-product-launch-cadence.md` (85K) — 9 canon books: Walker Launch (primary PLF), McLaren Predictable Profits, Hormozi, Brunson Expert Secrets, Suby Sell Like Crazy, Dunford Obviously Awesome, Ellis Hacking Growth, Walling SaaS Playbook, Wes Bush PLG
- `2026-05-12-testimonial-harvesting-beta.md` (36K) — D'Souza Brain Audit (primary canon) + Claude WebSearch + Gemini
- `2026-05-12-video-scripting-retention.md` (43K) — Video Creator Playbook, Heath Made to Stick, Snyder Save the Cat

**Process:** NotebookLM queries (12+ queries napříč 7 notebooks), Claude WebSearch agenty, Gemini grounded research. 4 reports plně integrované přes glm-delegate + general-purpose Sonnet agenty (po failed glm round retry s Sonnet).

**Skills written (6 SKILL.md, ~63K):**

| Skill | Plugin | Size | Architektura |
|---|---|---|---|
| `email-sequences` | copywriting | 8.2K | pod email-orchestrator |
| `email-orchestrator` | copywriting | 10K | mid-layer → newsletter + email-sequences |
| `video-scripting` | copywriting | 7.4K | flat sibling |
| `info-product-launch` | marketing | 8.3K | pod launch-orchestrator |
| `launch-orchestrator` | marketing | 8.5K | mid-layer → launch-strategy + info-product-launch |
| `testimonial-harvesting` | marketing | 21K | flat sibling |

**Top orchestrators updated:**
- `copywriting-orchestrator` — nyní routuje na email-orchestrator + video-scripting
- `marketing-orchestrator` — nyní routuje na launch-orchestrator + testimonial-harvesting

**Infrastructure:**
- ✅ Symlinks synced (Gemini CLI + Cowork)
- ✅ Claude Code cache updated (`copywriting/2.1.0` + `marketing/1.1.0`)

## Klicove insights ze session

- **Glm-delegate selhává na creative writing** (4 SKILL.md tasks → 3 failed, jen testimonial úspěch). Retry s general-purpose Sonnet agenty fungoval 100%. Pattern: glm pro mechanical/bulk operations, Sonnet pro authoring.
- **NotebookLM notebooky mají multiple sources** — `notebook_get` ukazuje všechny zdroje, `notebook_query` defaultně používá všechny ale dá se source_ids filtrovat. První round queries (s book name v promptu) NotebookLM biasoval na ten 1 source → 9 books přehlédnuto v 7 notebookech, doplněno v 2 dalších kolech.
- **Glm-delegate placeholder bug** — agenti při file rewrite vkládají `[Content preserved in original]` místo skutečného obsahu. Repair pattern: `awk` inject z /tmp source files.
- **NotebookLM auth refresh** — `nlm login` interaktivně přes browser OAuth obnovil 61 cookies, funkční na hodiny.

## Otevrene problemy

- Branch ještě nemerged do main + nepushnut na GitHub
- Skills nejsou otestované — restart Claude Code + smoke test pending
- Plugin marketplace.json registry: může vyžadovat update pokud user installne přes `/plugins` UI (jinak symlinks + cache stačí)
- 13 canon books v notebookech, **219K research material**, **63K skill content** — total knowledge layer ~282K

## Poznamky pro dalsi session

- Po restartu otestovat: `/copywriting:email-orchestrator "5-day welcome sequence pro X"` → routing check
- `/marketing:launch-orchestrator "launch online kurzu pro Y"` → routing check
- Cowork: open Cowork session, ověřit že 6 nových skills je viditelných v skill picker
- Gemini CLI: stejný test

## Dalsi kroky

### Priorita 1 — test deployment
1. **Restart Claude Code** → `/doctor` (check skills count + dropped warnings)
2. Smoke test 4 nové skills (routing, output quality)
3. Cowork open + verify skill picker shows new entries
4. Pokud OK → close branch

### Priorita 2 — carry-over z dřívějších sessions
- Negotiation plugin install + smoke test (z minulé session)
- Recon validation na příštím reálném planning úkolu
- v1.1 negotiation uplift (Pařík + Dolník PDFs do notebook)
- .zshenv GEMINI_API_KEY rotace
- /quickcommit skill
