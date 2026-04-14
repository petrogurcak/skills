---
name: abstraction-review
description: Use this skill to review code for bad abstractions, duplicated parallel implementations, stringly-typed dispatchers, god-functions, parameter sprawl, primitive obsession, and mixed concerns — both in isolation ("review tyhle abstrakce", "je tenhle dispatcher OK?") and as a specialist lens inside deep-review. Invoke whenever a PR or diff adds/modifies a helper, wrapper, dispatcher, shared module, OR consolidates duplicated code, OR when the user asks "zreview mi tyhle abstrakce", "je ta refactor OK", "není to over-DRY", "nemáme tady god-function", "napsal jsem helper — je to dobré?". Complements security-review, database-review, api-design-review as the design-quality lens.
metadata:
  author: Petr
  version: 1.0.0
---

# Abstraction Review

Review-time lens for design-quality issues introduced by abstractions. Catches bad shapes AFTER code is written — symmetric counterpart to `development:designing-abstractions` which runs BEFORE.

**Announce:** "Používám abstraction-review — koukám na shapes, concerns a duplicity."

---

## When to Use

- Reviewing a PR/diff that adds or modifies a helper, wrapper, dispatcher, or shared module.
- Reviewing a refactor that consolidated duplicated code.
- User asks: "zreview mi abstrakce", "je tenhle dispatcher OK", "není to over-DRY", "máme tady god-function?".
- Called as a specialist lens from `review:deep-review` when the diff includes shared logic.

## When NOT to Use

- Bug fixes that don't touch structure.
- Pure styling/formatting changes.
- Trivial one-liners.
- Full security audit (use `security-review`) or DB perf (use `database-review`) — this skill is specifically about design shape.

---

## Input Needed

Before reviewing, confirm:

1. **Scope** — what files/diff to review (prefer `git diff` output or a file list).
2. **Context** — is this a new helper, a refactor, a dispatcher, or a module? Drives which red flags apply.
3. **Repo search access** — you need Grep to catch "parallel implementation" bugs (AI context collapse).

If called from `deep-review`, these are already in context.

---

## Review Workflow

### Step 1 — Scan for Parallel Implementations (AI context-collapse guard)

Before judging the new helper's shape, check whether the responsibility already exists elsewhere in the repo:

```
Grep for:
- Similar function names (send_*, notify_*, validate_*, ...)
- Shared verbs + objects the new code handles
- CLAUDE.md / ACTIVE_CONTEXT.md mentions of the concern
```

**If a sibling helper exists** → flag as CRITICAL: "Parallel implementation — `X` in `path/to/existing.py` already does this. Consolidate instead of adding a new one."

### Step 2 — Run the Red Flag Checklist

For each added/modified helper/dispatcher/shared module, check every row:

| # | Red Flag | What to look for | Severity |
|---|----------|------------------|----------|
| 1 | **Boolean parameter controlling behavior** | `def send(invite: bool, ...)`, `if flag: ... else: ...` branches in the body | HIGH |
| 2 | **Stringly-typed dispatcher** | `send(type="invite")`, `action(kind="x")`, string-literal switch | HIGH |
| 3 | **Parameter sprawl** | ≥5 params on one function, especially primitives | HIGH |
| 4 | **Primitive obsession** | Raw string/int carrying domain meaning passed through >2 layers | MEDIUM |
| 5 | **Braid — mixed concerns** | One function does transport + logic + persistence / validation + IO | HIGH |
| 6 | **Information leakage** | Caller must know HOW the module works (e.g., must call init/configure before use) | MEDIUM |
| 7 | **God-function / god-class** | Sandi Metz thresholds violated — method >5 lines of logic, class >100 lines, >4 params | MEDIUM |
| 8 | **N-wrapper pattern** | Helper called from N places, each customizing it with flags/overrides | HIGH |
| 9 | **Anemic domain model** | Value object with only getters/setters, logic lives in a service layer function | LOW |
| 10 | **Missing invariants** | Dispatcher exists but logging/rate-limit/audit happens per-caller instead of in dispatcher | HIGH |
| 11 | **Rule of Three violated backwards** | Abstraction created with only 1-2 callers (premature) | MEDIUM |
| 12 | **Stable-dependency violation** | Core logic depends on volatile transport/UI code (backwards direction) | MEDIUM |

### Step 3 — Connascence Audit

For the new or modified interface, identify the coupling type introduced:

- **Connascence of Name** — callers depend on the function/param name (OK, lowest).
- **Connascence of Position** — positional args (flag as WARNING, suggest named args).
- **Connascence of Algorithm** — callers must know the internal algorithm to use the function correctly (flag as HIGH).
- **Connascence of Identity** — callers share a mutable object (flag as HIGH, consider value objects).

### Step 4 — Public API vs Internal Plumbing Check

- Is the public API discoverable by name (`send_invite_email`) or hidden behind a stringly-typed dispatcher?
- Are internal helpers leaking into imports of other modules?
- Does the module expose an `__all__` / explicit exports, or does everything spill out?

### Step 5 — Tests-at-the-seam Check

If the added code introduces a dispatcher or shared core:

- Are tests targeting the **dispatcher contract** (invariants: logging, retry, transport selection)?
- Or are tests bolted onto each wrapper individually (and therefore brittle + duplicated)?
- Flag if tests are on the wrong seam.

---

## Output Format

Produce a structured review block the caller can paste into PR comments or the deep-review output:

```
## Abstraction Review

**Parallel implementation scan:** [Clean | Found X — see note below]
**Red flags hit:** [0 | count] — [HIGH: n, MEDIUM: n, LOW: n]

### CRITICAL findings

- [file:line] — [red flag #] — [one-sentence explanation]
  - Fix: [concrete suggestion referencing a specific principle from designing-abstractions]

### WARNING findings

- [file:line] — ...

### INFO / suggestions

- [file:line] — ...

**Connascence summary:** [Position n → Name n suggested, Algorithm n flagged]
**Public API vs internal:** [OK | concerns leak | mixed]
**Tests at the seam:** [OK | bolted on each wrapper | missing invariant tests]
**Recommendation:** [Approve | Request changes | Block on parallel-implementation issue]
```

Each CRITICAL finding must reference a specific principle and propose a concrete fix — don't leave the author guessing. Principles live in `development:designing-abstractions` SKILL.md if a reminder is needed.

---

## Severity Rules

- **CRITICAL = block** — parallel implementation, stringly-typed dispatcher on a new public API, missing invariants in a dispatcher, god-function at Metz thresholds.
- **HIGH = request changes** — boolean param controlling behavior, parameter sprawl, braided concerns.
- **MEDIUM = suggest** — primitive obsession, Connascence of Position on new interfaces, premature abstraction.
- **LOW = nit** — anemic model, naming nits.

Don't inflate severity. If 8 of 12 red flags are clean, say so. Reviewers stop reading when every diff returns a wall of CRITICALs.

---

## Integration

| Skill | Relationship |
|---|---|
| `review:deep-review` | Calls this skill when diff adds/modifies helpers, dispatchers, or shared modules. Output folds into deep-review's Specialist Skills section. |
| `development:designing-abstractions` | The design-time counterpart. This skill catches what the design-time skill missed or what was built without invoking it. Shares the same 12 principles + red flag taxonomy for consistency. |
| `review:security-review` | Independent — security concerns overlap with primitive obsession (unvalidated input) but focus differently. |
| `review:api-design-review` | Overlaps on public API conventions — this skill is broader (internal helpers too), api-design-review is deeper on REST/HTTP specifics. |
| `code-simplifier:code-simplifier` | After abstraction-review flags issues, simplifier can automate some fixes. |

---

## Example findings (for calibration)

**GOOD — flag this:**
```
src/notifications.py:42 — Red flag #2 (stringly-typed dispatcher)
  def send(channel: str, ...): if channel == "email": ... elif channel == "slack": ...
  Fix: split into send_email(req) / send_slack(req) (thin wrappers) + _dispatch(NotificationRequest).
  See designing-abstractions Principle: "Thin wrappers over fat dispatcher".
```

**GOOD — don't flag this:**
```
src/utils/paths.py:12 — helper used twice, both callers pass the same signature, no concern mixing.
  Acceptable — Rule of Three not yet warranted for extraction/abstraction escalation.
```

**BAD — too noisy:**
```
src/db.py:8 — LOW: function name could be more descriptive (currently `get_user`)
```
(get_user is fine — don't waste reviewer attention on non-issues.)
