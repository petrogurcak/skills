# Aktualni stav prace

## Posledni session

- **Datum:** 2026-05-08
- **Branch:** main (feat/negotiation-plugin merged + deleted lokálně + remote)
- **Dokonceno:**
  - **Negotiation plugin v1.0.0 SHIPPED do main:**
    - Merge commit `7036407` na main, pushed origin
    - 6 skills + 8 references, 5413 lines content
    - Skills: negotiation (orchestrator 214) + reading-people (590) + tactical-empathy (989) + batna-strategy (648) + emotional-conflict (837) + written-negotiation (899)
    - References: bcsm-stairway, cialdini-7-principles, comfort-discomfort-taxonomy, batna-zopa-framework, cz-business-culture-deltas, goulston-9-rules, difficult-conversations-three-frame, voss-email-adaptations
    - Frame: discomfort-not-deception, Cialdini ethical-only, CZ helplines (112/158/116 006/116 111/116 123)
  - **Marketplace cache synced** (`~/.claude/plugins/marketplaces/skills/` na main, contains negotiation entry + plugin source)
  - **Symlinks created** for Gemini CLI (111 entries) + Cowork (131 entries) — všech 6 negotiation skills viditelných v obou
  - **Documentation committed:** plan + acquisition-list + free-sources + corpus-matrix BCSM URL fix
  - **Branch cleanup:** feat/negotiation-plugin smazána lokálně + origin

- **Rozdelano:**
  - **Plugin install via /plugins UI** — uživatelská akce, vyžaduje restart Claude Code + manuální install. Plugin je k dispozici v marketplace cache na main.

## NotebookLM stav (11/14)

✅ 11 zdrojů uploaded (10 EN books + BCSM paper)
❌ 3 chybí pro v1.1: Pařík (CZ T1), Dolník (CZ T3), Navarro Be Exceptional (T2). Kompenzace via free-primary-sources.md.

## Klíčové insights ze session

- **NotebookLM-grounded subagent dispatch** funguje výborně — Task 13 subagent extrahoval "no Pinocchio effect" Mark Frank quote, Task 15 caught plan error (Malhotra/Bazerman Ch. 9 → actual Ch. 11), Task 14 found Voss "stepped on my mirror" failure mode example.
- **Pragmatic skill flow adaptation** — Phase 2 (8 references s full content templates) inline-write, Phase 3 (5 sub-skills s NotebookLM extraction) subagent dispatch. Hybrid byl efektivnější než strict subagent-driven-development.
- **Marketplace cache fetch refspec limitation** — `~/.claude/plugins/marketplaces/skills/.git/config` má `+refs/heads/main:refs/remotes/origin/main`, jen main fetched. Pre-merge feature branch testing nefunguje out-of-the-box.

## Otevrene problemy

- **Plugin install + smoke tests** pending — uživatel restartuje Claude Code + /plugins UI install + 6 testovacích scénářů
- **v1.1 uplift** až user získá Pařík + Dolník PDFs

## Poznamky pro dalsi session

- Plugin live na main, marketplace cache synced — `/plugins` UI najde negotiation v listingu
- 16 commits historie viditelná na main: 1 merge + 16 feature commits + 2 docs commits
- PR URL byla `https://github.com/petrogurcak/skills/pull/new/feat/negotiation-plugin` — branch už neexistuje, merge commit `7036407` má historii

## Dalsi kroky

### Priorita 1 — install + verify

1. Restart Claude Code → `/plugins` → install **negotiation**
2. Smoke testy 6 scénářů (viz minulý ACTIVE_CONTEXT)
3. Cowork test (otevřít session → skill picker check)
4. Gemini CLI test (`gemini -y -p "..."` invokace)

### Priorita 2 — v1.1 uplift

5. Pařík + Dolník PDFs upload do NotebookLM (`8b989435-d568-4248-a3a1-4ddd8ea57da2`)
6. CZ-deltas reference uplift s direct Pařík quotes
7. Navarro *Be Exceptional* import → reading-people Tier 2 leadership extension

### Priorita 3 — carry-over

8. `.zshenv` GEMINI_API_KEY rotace
9. Cowork enable creative@skills
10. Statusline backup do claude-config repo
11. `/quickcommit` skill
12. sell-like-crazy + ig-content tests
13. Cowork marketplace pull diagnostika
14. Generalize get-key.sh do shared lib
15. Hormozi 100m Offers import do marketing:offers
