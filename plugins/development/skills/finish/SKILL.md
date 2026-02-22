---
name: finish
description: Orchestrates all post-execution phases in sequence - verify (tests, build, lint), demo (optional executable proof), merge (commit, merge to development branch, cleanup), and wrapup (context, lessons, docs). Use after all tasks from an implementation plan are complete. Trigger phrases - "finish", "done coding", "dokonči", "hotovo", "zabal to", "wrap up", "merge it". NOT for mid-implementation work or when tasks are still incomplete.
metadata:
  author: Petr
  version: 1.0.0
---

# Finish

Orchestrate all post-execution phases. One command to go from "done coding" to "merged and wrapped up".

**Announce:** "Spoustim finish - verify, demo, merge, wrapup."

## When to Use

- After all tasks from implementation plan are complete
- User says "finish" / "dokonci" / "hotovo" / "zabal to"
- Execution skill (subagent/session/team) reports all tasks done

## Flow

```
/development:finish
  ├─ Phase 5:  Verify    → tests, build, lint, plan checklist, browser smoke
  ├─ Phase 5b: Demo      → executable demo document (optional)
  ├─ Phase 6:  Merge     → commit, merge to development, cleanup
  └─ Phase 7:  Wrapup    → context, mistakes, lessons, docs
```

Each phase gates the next. Failures stop the flow until resolved.

## Process

### Phase 5: Verify

**Invoke:** `development:verify`

Run full verification suite:

- Tests, build, lint/types
- Plan task completion check
- Browser smoke test (optional, for UI features)

**Gate:** ALL checks must pass before continuing.

- If failures: fix, re-run verify. Do NOT proceed.
- If pass: announce results and continue.

### Phase 5b: Demo (optional)

**Ask:** "Feature ma UI nebo API? Chces vytvorit demo dokument?"

| Answer               | Action                                                    |
| -------------------- | --------------------------------------------------------- |
| Yes / ano            | **Invoke:** `development:demo` - create showboat document |
| No / ne / skip       | Skip, continue to merge                                   |
| Refactoring / config | Skip automatically (no visible output to demo)            |

### Phase 6: Merge

**Invoke:** `development:merge`

- Commit current work
- Merge to development branch
- Verify on development (tests + build)
- Delete feature branch / worktree

**Gate:** Merge + verification on development must succeed.

### Phase 7: Wrapup

**Invoke:** `development:wrapup`

- Save ACTIVE_CONTEXT.md
- Check for mistakes to log
- Check for lessons learned
- Check for documentation updates

### Final Report

```
Finish kompletni:
- Verify: PASS (testy X/X, build OK, lint OK)
- Demo: [vytvoreno: docs/demos/... / preskoceno]
- Merge: <branch> merged do development, branch smazan
- Wrapup: kontext ulozen, [mistakes/lessons: zadne | zapsano]

Hotovo.
```

## Error Recovery

| Error                        | Action                                          |
| ---------------------------- | ----------------------------------------------- |
| Tests fail in verify         | Fix + re-run verify, don't proceed              |
| Merge conflict               | Resolve conflict, re-run tests on development   |
| Tests fail on development    | Fix on development, re-run, don't leave broken  |
| Demo fails (showboat/rodney) | Skip demo, continue to merge (demo is optional) |

## Rules

- **Sequential, gated** - each phase must pass before next starts
- **Demo is optional** - never block merge because of demo failure
- **Individual skills still work** - user can call `/development:verify`, `/development:demo`, `/development:merge`, `/development:wrapup` separately at any time
- **Don't re-ask** what verify already confirmed - carry results forward
