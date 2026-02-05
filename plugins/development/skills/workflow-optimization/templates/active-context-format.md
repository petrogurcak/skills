# ACTIVE_CONTEXT.md Format Guide

## Structure

```markdown
# Aktuální stav práce

> **Format:** [MAJOR] = architektonická rozhodnutí, nové features, breaking changes. [MINOR] = bug fixes, refactoring.
> **Rule:** All [MAJOR] + last 5 [MINOR]. Older [MINOR] → `archive/minor-sessions.md`

---

## [MAJOR] YYYY-MM-DD: Feature/Change Name
- **Impact:** Why this is major
- **Problem:** (optional) What was the issue
- **Solution:** (optional) How it was solved
- **Files:** key files changed
- **Commit:** hash (optional)

## [MAJOR] YYYY-MM-DD: Another Major Change
- **Impact:** ...
- **Files:** ...

---

## Recent [MINOR] Sessions (Last 5)

### [MINOR] YYYY-MM-DD: Bug Fix Name
- Brief one-line description
- **File:** single file if relevant

### [MINOR] YYYY-MM-DD: Another Minor Fix
- Brief description
- **Commit:** hash

---

## Klíčová rozhodnutí

| # | Rozhodnutí | Důvod |
|---|------------|-------|
| 1 | Decision | Why |
| 2 | Decision | Why |

---

## Development

**Ports/URLs/Credentials** (project-specific quick reference)

**Commands:**
\`\`\`bash
# Common development commands
\`\`\`

---

**Last Updated:** YYYY-MM-DD
**Archive:** Older [MINOR] sessions in `archive/minor-sessions.md`
```

## Classification Rules

### [MAJOR] - Keep All

| Category | Examples |
|----------|----------|
| Architecture | New service, major refactor, design pattern change |
| Features | New screens, new endpoints, new integrations |
| Breaking changes | API changes, schema changes, dependency updates |
| Security | Auth changes, security fixes, vulnerability patches |
| UX patterns | Navigation changes, new component patterns |

### [MINOR] - Keep Last 5

| Category | Examples |
|----------|----------|
| Bug fixes | CSS issues, typos, small logic errors |
| Refactoring | Code cleanup, renaming, formatting |
| Config | Environment changes, build config |
| Cache | Cache clearing, temp file issues |
| Docs | README updates, comment changes |

## Pruning Process

1. **Check size:** `du -h .claude/ACTIVE_CONTEXT.md`
2. **If > 15KB:** Time to prune
3. **Classify:** Go through entries, tag as [MAJOR] or [MINOR]
4. **Archive:** Move [MINOR] older than last 5 to `archive/minor-sessions.md`
5. **Condense:** Keep key info only, remove implementation details

## Archive Format

```markdown
# Archived Minor Sessions

> Archived sessions with [MINOR] impact. For active context, see `../ACTIVE_CONTEXT.md`

---

## [MINOR] YYYY-MM-DD: Fix Name
- **Impact:** Brief impact description
- **Fix:** What was done
- **File:** key file (optional)

## [MINOR] YYYY-MM-DD: Another Fix
- **Impact:** ...

---

## Pre-[DATE] Sessions (Condensed)

### Phase X: Name
- Bullet points of what was done
- Key files/features

---

**Archive Created:** YYYY-MM-DD
```
