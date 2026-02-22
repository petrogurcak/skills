---
name: session-context
description: Manages persistent context between Claude Code sessions by loading ACTIVE_CONTEXT.md and DECISIONS.md at session start and saving progress at session end. Use when user says "load context", "nacti kontext", "save context", "uloz kontext", "log decision", or automatically at session start/end. NOT for project setup (use projectsetup) or for tracking mistakes (use workflow-optimization).
metadata:
  author: Petr
  version: 1.0.0
---

# Session Context Skill

Manages persistent context between Claude Code sessions.

## When to Use

- **Auto-triggered** at session start (via using-superpowers)
- **Manually** when user says "ulož kontext" / "save context" / "načti kontext" / "load context"
- **Auto-triggered** at end of development-workflow Phase 3

## Load Context (Session Start)

### Process

1. Check if `.claude/ACTIVE_CONTEXT.md` exists in current project
2. If exists:
   - Read `.claude/ACTIVE_CONTEXT.md`
   - Read `.claude/DECISIONS.md` (last 5 entries if file is long)
   - Announce briefly current state
3. If not exists: Continue normally (project without session context)

### Announcement Format

```
Pokračuji kde jsme skončili:
- Branch: [branch name]
- Stav: [what was completed / in progress]
- Další krok: [recommended next action]
```

Keep it brief - 2-3 lines max. User can ask for details if needed.

---

## Save Context (Session End / Task Complete)

### When to Save

- After completing a feature (development-workflow Phase 3)
- When user explicitly asks ("ulož kontext", "save context")
- Before ending a session with work in progress
- After making significant decisions

### Update ACTIVE_CONTEXT.md

Replace entire content with:

```markdown
# Aktuální stav práce

## Poslední session

- **Datum:** [YYYY-MM-DD]
- **Branch:** [current git branch]
- **Dokončeno:** [what was completed this session]
- **Rozděláno:** [work in progress, if any]
- **Další krok:** [recommended next action]

## Otevřené otázky

[any unresolved questions or decisions pending - or "Žádné"]

## Poznámky pro další session

[important context that future Claude should know - or "Žádné"]
```

### Log to DECISIONS.md (if applicable)

**Checklist - log if ANY is true:**

- [ ] Volil jsem mezi 2+ validními přístupy
- [ ] Rozhodnutí ovlivní více souborů
- [ ] Rozhodnutí bude platit dlouhodobě
- [ ] Budoucí já by se mohl ptát "proč?"

**Do NOT log:**

- Triviální změny (typo, formatting)
- Rozhodnutí vynucená existujícím kódem
- Dočasná řešení (debugování)
- Implementation details without alternatives

**Format for new entry (prepend to file after header):**

```markdown
## [YYYY-MM-DD]: [Název rozhodnutí]

**Kontext:** [Proč bylo potřeba rozhodnout]
**Rozhodnutí:** [Co jsme zvolili]
**Alternativy:** [Co jsme zvažovali]
**Důvod:** [Proč tato volba]

---
```

---

## Commands

### "Načti kontext" / "Load context"

1. Read `.claude/ACTIVE_CONTEXT.md`
2. Read `.claude/DECISIONS.md`
3. Display summary of current state
4. List recent decisions (last 3-5)

### "Ulož kontext" / "Save context"

1. Ask user: "Co bylo dokončeno? Co je rozděláno? Jaký je další krok?"
2. Update `.claude/ACTIVE_CONTEXT.md`
3. Ask: "Bylo učiněno nějaké důležité rozhodnutí k zalogování?"
4. If yes → append to `.claude/DECISIONS.md`
5. Confirm save

### "Ulož rozhodnutí" / "Log decision"

1. Ask user for decision details or summarize from conversation
2. Append to `.claude/DECISIONS.md` using format above
3. Confirm logged

---

## File Locations

Files are stored in project's `.claude/` directory:

- `.claude/ACTIVE_CONTEXT.md` - Current state, updated each session
- `.claude/DECISIONS.md` - Architectural decisions log, append-only

These files are created by `projectsetup` skill or can be created manually.

---

## Integration

### With using-superpowers

At session start, using-superpowers triggers context load automatically.

### With development-workflow

At Phase 3 completion, development-workflow triggers context save.

### Standalone

User can manually trigger load/save at any time.

---

## Examples

### Session Start (auto-load)

```
[Claude reads ACTIVE_CONTEXT.md]

Pokračuji kde jsme skončili:
- Branch: feature/forgot-password
- Stav: Deploy script s rollback dokončen
- Další krok: Merge do main a deploy

Mohu pokračovat s merge, nebo potřebuješ něco jiného?
```

### Session End (save)

```
User: "ulož kontext"

Claude: Aktualizuji session context...

Co bylo dokončeno tuto session?
→ [user odpovídá nebo Claude shrne]

[Claude zapíše do ACTIVE_CONTEXT.md]

Bylo učiněno nějaké architektonické rozhodnutí k zalogování?
→ [pokud ano, zapíše do DECISIONS.md]

✅ Kontext uložen.
```

### Decision Logging

```
User: "zaloguj rozhodnutí o databázi"

Claude: Loguji rozhodnutí...

## 2025-12-01: Migrace z SQLite na PostgreSQL
**Kontext:** Potřeba concurrent writes pro background jobs
**Rozhodnutí:** PostgreSQL 15 s connection pooling
**Alternativy:** SQLite s WAL mode, MySQL, MongoDB
**Důvod:** Robustnost, podpora pro JSONB, zkušenosti týmu

✅ Rozhodnutí zalogováno do .claude/DECISIONS.md
```
