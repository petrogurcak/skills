---
name: wrapup
description: Performs end-of-session reflection by saving context to ACTIVE_CONTEXT.md, checking for mistakes to log, extracting lessons learned, and identifying documentation updates needed. Use after merging to development, when user says "wrapup", "zabal to", or at the end of a development session. NOT for saving context mid-session (use session-context) or for standalone mistake logging.
metadata:
  author: Petr
  version: 1.0.0
---

# Wrap-up

Session reflection and context save after merge.

**Announce:** "Merge hotovy. Zavíram session."

## Process

Go through all 4 checks proactively:

### 1. Save Context

Update `.claude/ACTIVE_CONTEXT.md`:

- What was completed this session
- Current branch state
- Any follow-up work identified

### 2. Mistakes Check

Review the session for correction patterns:

- Did anything fail unexpectedly?
- Did we retry/revert something?
- Were any assumptions wrong?
- Did auto-capture-corrections hook fire during this session?

**If yes** → write entry to `.claude/mistakes.md`:

```markdown
## [YYYY-MM-DD]: [Brief description]

**Co se stalo:** [What went wrong]
**Proc:** [Root cause]
**Oprava:** [How it was fixed]
**Pouceni:** [What to do differently]
**Tags:** #relevant #tags
```

**If no** → report "Zadne chyby."

### 3. Lessons Learned

Check if session produced reusable knowledge:

- Non-trivial problem solved?
- Useful workaround discovered?
- Debugging technique worth remembering?
- New pattern established?

**If yes** → propose `/learn` entry or note in project memory.

**If no** → report "Zadne nove pouceni."

### 4. Documentation Check

Check if the change affects any documentation:

- Project CLAUDE.md (new conventions, patterns, commands)
- User-facing guides (editor guide, API docs, README)
- Setup or configuration docs
- Architecture decisions → `.claude/DECISIONS.md`

**If yes** → propose specific update with file path and content.

**If no** → report "Dokumentace OK."

## Present Summary

```
Session wrap-up:
- Kontext: Ulozeno
- Mistakes: [zadne / zapsano: "brief description"]
- Lessons: [zadne / zapsano: "brief description"]
- Dokumentace: [beze zmen / aktualizovano: file.md]

Hotovo. Neco dalsiho?
```

## Rules

- **Always save context** - even if nothing else to log
- **Be specific** in mistakes/lessons - not generic "be more careful"
- **Propose, don't just ask** - draft the entry, let user confirm
- **Check DECISIONS.md** - if architectural choice was made, log it
