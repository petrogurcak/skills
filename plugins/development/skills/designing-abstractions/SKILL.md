---
name: designing-abstractions
description: Use this skill BEFORE planning a module/API, BEFORE writing a helper/wrapper/dispatcher, OR when refactoring duplicated code — even if the user doesn't explicitly say "abstraction". Enforces responsibilities-before-abstraction analysis (enumerate concerns, find invariants, choose named domain models over flat signatures) and produces a required "Abstraction Strategy" artifact. Prevents god-functions, stringly-typed dispatchers like send(type="X"), parameter sprawl, duplicated parallel implementations across files, and premature DRY. Trigger whenever the user asks to — extract a helper, consolidate/unify/sjednotit duplicated code, add a dispatcher or shared module, refactor or DRY something up, design an API or notification/email/logging system, write validation, or whenever a plan touches two or more call sites sharing logic. Also invoke when the user says "duplikace", "extrahuj", "sjednoť", "refactor", "helper", "dispatcher", "shared", "parse", "validate input".
metadata:
  author: Petr
  version: 1.0.0
---

# Designing Abstractions

Defense-in-depth against AI-generated design failures: parallel implementations, premature DRY, god-functions, braided concerns, stringly-typed dispatchers, parameter sprawl.

**Announce:** "Používám designing-abstractions skill — nejdřív enumeruji odpovědnosti, pak navrhuji rozhraní."

---

## Three Invocation Gates

1. **Pre-Planning** — design mentions ≥2 call sites sharing logic, a dispatcher, a "shared helper", or a consolidation. Define Deep Module interface before feature tasks are written.
2. **Pre-Implementation** — about to write a helper/wrapper/dispatcher. First **Grep repo** for likely names + responsibilities (AI context-collapse mitigation). Do not write a parallel implementation.
3. **Refactor-Time** — duplicate code found. Do NOT DRY blindly. Run the 7-step workflow below.

## When NOT to Use

- One-off function, single call site, no shared logic.
- Trivial CRUD wrapper with no invariants.
- Bug fix that doesn't touch structure.

---

## The Core Rule

**Before eliminating duplication OR creating a new abstraction, enumerate responsibilities.**

DRY without responsibility analysis produces the wrong abstraction — god-functions with 10 parameters, leaky defaults, or stringly-typed dispatchers (`send(type="invite", ...)`). Duplication is far cheaper than the wrong abstraction (Sandi Metz).

---

## 7-Step Workflow (runs at all three gates)

1. **List concern-layers** — transport / observability / gates / content / persistence / validation. Each duplication usually mixes 2–4 concerns.
2. **Find invariants** — what MUST hold for all callers (logging? rate limit? audit trail? retry?). Invariants belong in the choke-point dispatcher, not per-caller.
3. **Parameter sprawl test** — dispatcher wants ≥5 params? Collect into a named domain object (dataclass / Pydantic model / Value Object). No flat 10-arg signatures.
4. **Thin wrappers over fat dispatcher** — public API = discoverable named functions (`send_invite_email`, not `send(type="invite")`). Internal = single canonical path. Both worlds.
5. **Rename before refactor** — confusing names are bugs (`send_staff_email` that emails employees). Rename first, consolidate after.
6. **Refactor preserves behavior** — no new features (retry, rate limit, webhooks) in the same PR. The seam is ready for them in follow-ups.
7. **TDD at the seam** — tests target the dispatcher contract (invariants, transport selection), not each wrapper. Wrappers are trivially correct if they build content + call the dispatcher.

---

## Required Output Artifact: "Abstraction Strategy"

Before coding, produce this block (paste into plan or conversation):

```
## Abstraction Strategy

**Concern-layers:** [transport / observability / gates / content / ...]
**Invariants (apply to ALL callers):** [logging, rate limit, audit, ...]
**Boundary Map:** [where raw strings/ints become Value Objects]
**Public API:** [discoverable named functions — what users call]
**Internal plumbing:** [single canonical dispatcher]
**Connascence audit:** [Position → Name upgrades, what's coupled and how]
**What I explicitly decided NOT to abstract:** [Rule of Three not yet met]
```

Short, concrete, names of real functions/types. If you can't fill a line in one sentence, the design isn't ready.

---

## Red Flag Checklist (force backtrack if any hit)

| Red flag                                                                 | What it means               | Fix                                  |
| ------------------------------------------------------------------------ | --------------------------- | ------------------------------------ |
| Boolean parameter controlling behavior (`send(invite=True)`)             | Wrong Abstraction (Metz)    | Two named functions                  |
| Primitive obsession — raw string/ID through >2 layers                    | Missing Value Object        | Parse, Don't Validate at boundary    |
| Braid check — one function mixes transport + logic + persistence         | Complected (Hickey)         | Split by concern                     |
| Information leakage — caller must know HOW module works                  | Shallow module (Ousterhout) | Deepen the interface                 |
| Parameter sprawl — ≥5 params                                             | Missing domain object       | Dataclass / request model            |
| Stringly-typed dispatcher (`send(type="X")`)                             | Wrong abstraction           | Fat dispatcher + thin named wrappers |
| Helper called from N places, each customizing                            | Wrong shape                 | Wrapper-per-use-case, shared core    |
| "Parallel implementation" — I'm about to write a helper without Grepping | Context collapse            | **Grep first**, then decide          |

---

## Decision Rules

- **<3 duplications** → leave it. Rule of Three / AHA.
- **3+ duplications, same responsibility** → extract named function.
- **3+ duplications, different responsibilities** → fat dispatcher (invariants) + thin named wrappers (per use-case).
- **Refactor needed to prepare for feature** → separate PR. _"Make the change easy, then make the easy change."_ (Beck)
- **Migrating a live abstraction** → Parallel Change (expand → migrate callers → contract). Never swap in one PR.
- **Hidden dependencies in refactor** → Mikado Method (explicit graph of what must change first).

---

## The 12 Principles (compact reference)

**Core design:**

1. **Rule of Three / AHA** — delay abstraction (Metz)
2. **Simple vs Easy** — decoupled ≠ familiar (Hickey)
3. **Deep Modules** — simple interface, hidden complexity (Ousterhout)
4. **Parse, Don't Validate** — Value Objects at boundaries (King)
5. **Tell, Don't Ask** — against anemic models
6. **Sandi Metz constraints** — 5 lines/method, 100/class, 4 params
7. **Connascence** — coupling metric; Position → Name is upgrade
8. **Stable Dependencies** — depend toward stability (Ports & Adapters)
9. **Intent-Revealing Names** — _why_, not _what_

**Refactoring:** 10. **Make the Change Easy, Then Make the Easy Change** (Beck) 11. **Parallel Change** — expand / migrate / contract 12. **Mikado Method** — surface hidden dependencies

---

## AI-Specific Mitigations

LLMs can't see the whole repo. Before writing a helper:

- **Grep for the likely name** — `Grep "def send_" "send_email" "email_client"` etc.
- **Grep for the responsibility** — what verb + object? `Grep "invite.*user"`.
- **Check CLAUDE.md / ACTIVE_CONTEXT.md** — any mention of the concern.
- If any hit → read it before writing. If nothing → you're genuinely first; proceed.

This one rule prevents most parallel-implementation bugs.

---

## Integration

| Skill                                 | Hook                                                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `development:planning`                | Phase 1 Step 4 (Present design) — call if design mentions shared logic, dispatcher, or consolidation |
| `superpowers:test-driven-development` | Tests target dispatcher contract (invariants), wrappers are trivial                                  |
| `development:debugging`               | Call when root cause is "two implementations diverged"                                               |
| `review:deep-review`                  | Add Connascence audit + boundary check + parallel-implementation scan to review                      |
| `code-simplifier:code-simplifier`     | Run after this skill to catch residual duplication                                                   |

---

## Sources

Ousterhout — _A Philosophy of Software Design_ · Hickey — _Simple Made Easy_ · Metz — _POODR_, _99 Bottles of OOP_ · King — _Parse, Don't Validate_ · Beck — _Tidy First?_ · Fowler — _Refactoring_ (2nd ed.) · Connascence.io · Daniel Terhorst-North — Mikado Method.
