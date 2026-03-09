# Aktualni stav prace

## Posledni session

- **Datum:** 2026-03-03
- **Branch:** main
- **Dokonceno:**
  - **Stop hook upraven:** Odstranen plan guard (blokoval stop kvuli planum z jinych sessions). Ponechana verification gate (testy/lint pred stopem).
  - **Worktree pravidlo v CLAUDE.md:** Pridano globalni pravidlo — nabizet worktree pri branchingu, subagent dispatch, a teamech. Resi file conflicts mezi paralelnimi sessions.
  - **Novy skill `ux:ui`:** Kombinuje UX + copywriting pro UI praci. Thin orchestrator — Phase 1 understand, Phase 2 UX analysis (vola ux-orchestrator), Phase 3 copy (vola copywriting-orchestrator), Phase 4 integration check.
- **Skills count:** 50 skills v 9 pluginech (z 49)

## Poznamky pro dalsi session

- **Cowork symlinky:** `ui` symlink vytvoren. Stale chybi 5 starych (4 z 2026-02-27 + sentry-fix).
- **Push pending:** Commit `6f8624c` (sentry-fix) + dnesni zmeny jeste nepushnuto.
- **Sentry fix agent:** Bezi 3 dny, overit logy.

## Dalsi kroky

### Priorita 1 — Okamzite

1. **Push vsechny zmeny** + update Claude Code cache
2. **Cowork symlinky** pro zbylych 5 skills
3. **Overit sentry-fix logy** po 3 dnech behu

### Priorita 2 — Pristi tyden

4. **Event-driven skill activation** — `docs/plans/2026-02-27-event-driven-skill-activation.md`
5. **Nahradit slabe brand-advisor zdroje** (Creative Bloq, UnderConsideration)
