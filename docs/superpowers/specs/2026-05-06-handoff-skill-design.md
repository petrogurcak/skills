# Design: `development:handoff` skill

**Date:** 2026-05-06
**Author:** Petr (s Claude)
**Status:** Approved design, ready for implementation plan

---

## Problem

Po dlouhé planning session (brainstorm → write plan → plan-challenger → revise) chce Petr typicky spustit `/clear` před execute, aby měl čistý context. Současný workflow ztrácí klíčový kontext:

- **Why this approach** — rationale který tvaroval plán
- **Rejected alternatives** — co jsme zamítli a proč (důležité pro mikro-rozhodnutí během execute)
- **User preferences** — vyslovené preference během brainstormu ("nedělej helper", "raději 3× duplikace")
- **Adversarial findings** — co plan-challenger flagoval ale plán neopravil ("watch out during execute")
- **Constraints** — deadline, dependency, scope boundary

Plán file (output `superpowers:writing-plans`) zachycuje **WHAT/HOW** (tasks, acceptance criteria, files), ale ne **WHY/WHY-NOT**. Bez rationale execute session může v polovině task udělat špatné mikro-rozhodnutí (např. zvolit zamítnutou alternativu při edge case).

## Goal

Skill který před `/clear` zachytí WHY/WHY-NOT do plan filu jako section, takže execute session má kompletní kontext bez nutnosti znovu načítat brainstorm.

## Non-goals

- **Modifikovat upstream skills** (`superpowers:writing-plans`, `superpowers:executing-plans`) — handoff je čistá vrstva navíc
- **Auto-commit bez confirmation** — respektuje "commit jen když user řekne"
- **Replace `session-context` skill** — handoff updatuje ACTIVE_CONTEXT.md přímo (jednoduchá operace), session-context zůstává pro general use cases
- **Capture každý detail z brainstormu** — handoff zachycuje jen rationale + alternatives + constraints, ne kompletní conversation log

---

## Architecture

### Skill location

```
~/Projects/skills/plugins/development/skills/handoff/SKILL.md
```

Plugin `development` (vedle `planning`, `session-context`, `verify`, `merge`).

### Invocation

| Pattern                                         | Trigger                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/development:handoff [plan-path]`              | Explicit slash command s optional path arg                                                             |
| Auto-trigger keywords                           | `handoff`, `predej do execute`, `zabal pred clear`, `priprav na clear`, `clear pred execute`           |
| Auto-call z `development:planning`              | Confirmation gate na konci planning workflow: "Plán hotov. Spustit `/handoff`? (Y/n)"                  |

### Plan file detection (priority order)

1. **Path argument:** `/development:handoff docs/plans/auth.md`
2. **Conversation scan:** writing-plans skill vrací path → handoff ho najde v conversation memory
3. **Filesystem fallback:** `ls -t docs/plans/*.md | head -1` (most recently modified)
4. **Ambiguous → ask user**

---

## Workflow

`/development:handoff` provádí 8 kroků:

1. **Detect plan file** (per priority order výše).
2. **Extract rationale z conversation kontextu** — skill prompuje sebe sama na 5 dimenzí: rationale, rejected alternatives, user preferences, adversarial findings, constraints.
3. **Generate handoff section** podle template (viz níže). Optional sekce skipuje (žádné "TBD" placeholders).
4. **Conflict check:** Pokud handoff section v plan filu už existuje, ask "Replace, append, nebo skip?" — žádné silent overwrite.
5. **Append section** na vrch plánu (za H1 title, před první H2).
6. **Update `.claude/ACTIVE_CONTEXT.md`:**
   - "Další krok" → `execute <plan-path>`
   - "Stav" → `Plán hotový, handoff written, ready k execute`
   - **Edge case:** soubor neexistuje → skip + warning
7. **Confirmation gate na commit:** "Commit plán + ACTIVE_CONTEXT? (y/n)"
   - **Y:** `git add <plan> .claude/ACTIVE_CONTEXT.md && git commit -m "plan: <title> — handoff"`
   - **n:** skip, vypiš dirty soubory
8. **Final output:** Hotovo + návod co napsat v nové session (`execute plán <path>`).

### Edge cases

- **Conversation bez rationale** (např. `/handoff` z jiné session bez planning kontextu) → skill prompuje user: "Doplň: (1) Klíčový důvod přístupu? (2) Zamítnuté alternativy? (3) Constraints?"
- **No plan file found** → fail s message: "Plán nenalezen. Použij `/development:handoff <path>` nebo spusť nejdřív `/development:planning`."
- **`.claude/ACTIVE_CONTEXT.md` neexistuje** → skip step 6 + warning.

---

## Handoff section template

Markdown appendnutý mezi H1 a první H2 plan filu. Sekce jsou **optional** — skill skipne prázdné.

```markdown
## Handoff Context

> _Read this before executing. Captured during planning session YYYY-MM-DD._

**Why this approach**
[2-3 věty rationale. Co řešíme a proč právě takhle.]

**Rejected alternatives**
- **<approach X>** — proč ne (důvod)
- **<approach Y>** — proč ne (důvod)

**User preferences voiced during planning**
- "<přesná citace nebo parafráze>" — kontext kdy a proč

**Adversarial findings to watch during execute**
- Plan-challenger flagoval: <issue> → mitigation: <postup>
- <další gotcha>

**Constraints**
- Deadline: <kdy>
- Dependency: <na čem to čeká>
- Scope boundary: <co NENÍ součástí>

---
```

### Designové volby

1. **Quote block hned pod H2** — jasný marker "tohle je context, ne actionable". Execute si nemůže splést s task list.
2. **YYYY-MM-DD timestamp** — pokud někdo plán review za 3 měsíce, ví kdy byl handoff napsaný (rationale může být zastaralý).
3. **`---` separator na konci** — visual break před tasks. Plus signál pro execute "tady končí context, dál jsou actionable věci".
4. **Žádné checkboxy / TODO** — handoff je read-only context, ne work item.
5. **Bold labels místo H3** — kratší, scrollable. H3 by zvětšily plán zbytečně.

---

## Integration

| Skill                          | Change required | Důvod                                                                                |
| ------------------------------ | --------------- | ------------------------------------------------------------------------------------ |
| `development:planning`         | **Yes**         | Přidat final krok s confirmation gate na `/handoff`                                  |
| `superpowers:writing-plans`    | No              | Upstream Anthropic, neforkujeme. Handoff je separate skill po něm.                   |
| `superpowers:executing-plans`  | No              | Handoff section žije IN plan filu — execute ho čte přirozeně skrz quote-block marker |
| `development:session-context`  | No              | Handoff updatuje ACTIVE_CONTEXT přímo (jednoduchá operace, žádný gate duplication)   |

### Skill dependency graph

```
development:planning
        ↓ (final step, with confirmation)
development:handoff  ← NEW
        ↓ (writes to plan file + ACTIVE_CONTEXT)
[user runs /clear]
        ↓
[new session]
        ↓ (auto-loads ACTIVE_CONTEXT)
superpowers:executing-plans (reads plan file, sees handoff section first)
```

Design je **additive only** — žádný breaking change v existujících skills.

---

## Decision rationale

### Proč C (section in plan file) místo A (separate handoff file)

1. **Atomicita** — plán + rationale = jeden git artefakt. Archivuje se spolu, větví se spolu.
2. **Discoverability zdarma** — `executing-plans` už čte plan file. Section nahoře = nelze minout. Separate file by vyžadoval modify execute skill nebo riskovat "zapomněl jsem přečíst".
3. **Pattern z industry** — RFC, ADR, design specs mají "Background / Why" section nahoře.
4. **"Plan jako reusable template" je mýtus** — každý plán je session-specific. Reusable template = `superpowers:writing-plans` skill samotný.

### Proč B (standard) místo A (minimal) nebo C (full)

- **A (minimal)** = jen napsat section, manuálně update ACTIVE_CONTEXT/commit/clear → zachovává friction který má skill řešit.
- **C (full)** = přidává DECISIONS.md log + verbatim text pro novou session → duplikuje session-context skill + over-engineering (text "execute plán X" se nemění).
- **B (standard)** = ACTIVE_CONTEXT update + commit confirmation pokrývá 90% friction bez duplikace.

### Proč slash command + auto-call (obojí)

- **Pure command** — vyžaduje pamatovat invoke. Friction.
- **Pure auto** — bere autonomy, "silent magic" pattern.
- **Obojí** — explicitní kontrola (`/handoff`) + reduce-friction default (planning auto-suggest).

---

## Acceptance criteria

Skill je hotový když:

1. ✅ `/development:handoff` invokovatelný explicitně i přes auto-trigger keywords
2. ✅ Skill detekuje plan file přes 4 priority levels (arg → conversation → fs → ask)
3. ✅ Generuje handoff section podle template, optional sekce skipuje
4. ✅ Conflict check na existing handoff section (replace/append/skip)
5. ✅ Updatuje ACTIVE_CONTEXT.md (s edge case fallback)
6. ✅ Confirmation gate na git commit
7. ✅ `development:planning` skill volá handoff na konci s confirmation
8. ✅ Žádná změna upstream skills (`writing-plans`, `executing-plans`)
9. ✅ End-to-end smoke test: planning → handoff → /clear → execute reads handoff correctly

---

## Open questions

(none — all clarifications resolved during brainstorming)
