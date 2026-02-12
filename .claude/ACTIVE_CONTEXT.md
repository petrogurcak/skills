# Aktuální stav práce

## Poslední session

- **Datum:** 2026-02-11
- **Branch:** main
- **Dokončeno:**
  - **Nový skill `development:planning`** - 7-fázový planning workflow (explore → plan → review → execute → verify → merge → wrapup)
  - **3 post-execution skills:** `development:verify`, `development:merge`, `development:wrapup`
  - **2 nové hooky:** drift-detection (varuje při odchýlení od plánu), auto-capture-corrections (detekuje retry/revert patterny)
  - **Prošli jsme celý workflow flow** od session start po session end
  - Vše nainstalováno: cache + Cowork symlink + settings.json
- **Rozděláno:** Žádné
- **Další krok:** Otestovat kompletní flow na reálném projektu

## Otevřené otázky

- Žádné

## Poznámky pro další session

- Kompletní development flow:
  ```
  /development:planning  → Phase 1-4 (explore, plan, review, execution handoff)
  ... exekuce ...
  /development:verify    → Phase 5 (testy, build, lint, plan checklist)
  /development:merge     → Phase 6 (commit, merge do development, cleanup)
  /development:wrapup    → Phase 7 (context, mistakes, lessons, docs)
  ```
- Planning NEVOLÁ finishing-a-development-branch (Petr nedělá PR)
- Plán má v hlavičce post-execution instrukce pro execution skills
- Pro menší tasky bez plánu stačí globální hooky
- Doménové skills (UX, copywriting) se volají ručně PŘED `/development:planning`
- 13 globálních hooků aktivních (včetně nových drift-detection + auto-capture-corrections)
- Commits: `f3bdabb` (planning skill), `d4d3b1d` (verify/merge/wrapup skills)
