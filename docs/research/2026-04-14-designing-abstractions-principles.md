---
topic: Software design principles & patterns missing from our development workflow — input for `designing-abstractions` skill
date: 2026-04-14
engine: gemini
context: Planning a new `designing-abstractions` skill to prevent LLM failure modes — parallel implementations, premature DRY, god-functions, stringly-typed dispatchers, parameter sprawl. Should apply at plan, implement, AND refactor time.
---

## Key Findings

Defense-in-depth stack against AI-generated code failure modes (premature DRY, tactical sprawl, complected state).

### Core Heuristics

1. **Rule of Three / AHA (Avoid Hasty Abstractions)** — Delay abstraction until 3 distinct use cases. Duplication is cheaper than wrong abstraction (Metz). AI generates *false duplication* — syntactically similar, semantically different.
2. **Hickey's Simple vs. Easy** — "Simple" = decoupled (one fold); "Easy" = familiar/near-at-hand. AI is a pattern-matcher optimized for *Easy*, which produces *Complected* (braided) code.
3. **Ousterhout's Deep Modules** — Simple interface, complex hidden functionality. Prevents "Tactical Tornados" where AI leaks implementation details to solve immediate tasks.
4. **Parse, Don't Validate (Alexis King)** — Transform input into specific types at boundaries, don't scatter boolean checks. Eliminates "Shotgun Parsing" (validation sprinkled across codebase).
5. **Tell, Don't Ask** — Tell objects to act, don't ask for state and decide externally. Prevents Anemic Domain Models + procedural glue in service layer.
6. **Sandi Metz's Constraints** — Max 5 lines/method, 100 lines/class, 4 params/method, 1 instance var per view. Hard limits force delegation before God Objects form.
7. **Connascence (Laird/Jones)** — Coupling metric (Name, Position, Algorithm, Identity…). Move from Connascence of Position → Name to make AI calls robust (named args over positional).
8. **Stable Dependencies Principle** — Depend toward stability. Prevents core logic depending on volatile transport/UI layers (→ Ports & Adapters).
9. **Intent-Revealing Names / Semantic Weight** — Names explain *why*, not *what*. AI nails syntax, misses semantic weight — produces syntactically correct but logically hollow code.

### Refactoring Patterns

10. **Make the Change Easy, Then Make the Easy Change (Beck)** — Refactor FIRST to prepare, then add feature. Prevents hacking features into rigid structures.
11. **Parallel Change (Expand / Migrate / Contract)** — Introduce new abstraction alongside old, migrate callers, then delete old. Safest LLM migration pattern.
12. **Mikado Method** — Surface hidden dependencies during refactor via explicit exploration graph. Prevents dependency-hell loops.

### Additional relevant principles (implicit in the research)

- **Strangler Fig (Fowler)** — replace legacy incrementally behind a facade.
- **Single Responsibility Principle** — one reason to change per module.
- **Interface Segregation** — many specific interfaces beat one fat one.
- **DRY vs WET tradeoff** — "Write Everything Twice" until the third occurrence proves the abstraction is real.

---

## Actionable Insights for `designing-abstractions` skill

### 1. Three invocation gates

- **Pre-Planning** — define Deep Module interfaces, Value Object boundaries before any design section is written.
- **Pre-Implementation** — check prompt for "Tactical Tornado" red flags (boolean params, primitive obsession, braided layers).
- **Refactor-Time** — apply Rule of Three, Metz thresholds, Parallel Change pattern.

### 2. Required output artifact: "Abstraction Strategy"

Short markdown block the skill forces the caller to produce before writing code:

```
## Abstraction Strategy

- **Boundary Map** — where raw strings/ints become Value Objects.
- **Encapsulation Plan** — Tell-Don't-Ask (domain) vs Orchestration (service).
- **Connascence Audit** — what kind of coupling the proposed interfaces introduce.
- **Public API vs Internal** — what names are exported vs plumbing.
- **Invariants** — what MUST hold for all callers (rate limit, logging, audit).
```

### 3. Red-flag checklist (force backtrack if any hit)

- Boolean parameter (`send(invite=True)`) — sign of Wrong Abstraction.
- Primitive obsession — raw strings/IDs passed through >2 layers.
- Braid check — one function mixes transport + logic + persistence.
- Information leakage — caller must know *how* the module works.
- Parameter sprawl — dispatcher signature >5 params → wrap in domain object.
- Stringly-typed dispatcher — `send(type="X")` where X controls behavior.
- Helper called from N places, each customizing it — wrong shape.

### 4. Decision rules

- **< 3 duplications** → leave it. Rule of Three.
- **3+ duplications, same responsibility** → extract with named function.
- **3+ duplications, different responsibilities** → extract shared core, thin named wrappers per use-case (fat dispatcher + thin wrappers pattern).
- **Refactor needed before feature** → do it in separate PR (Beck's rule).

### 5. Invocation triggers (description)

Fire on: "refactor", "DRY", "duplikace", "extract", "helper", "dispatcher", "abstract", "shared logic", "consolidate", plus auto-invocation from `planning` Phase 1 Step 4 (Present design) when design mentions shared modules.

Keep it non-spammy by: only firing when plan/task mentions MULTIPLE call sites or ABSTRACTION. Not for one-off functions.

### 6. Integration with existing skills

- `planning` Phase 1.4 → call this skill if design has ≥2 call sites sharing logic.
- `debugging` → call when root cause is "two implementations diverged".
- `superpowers:test-driven-development` → tests hit dispatcher contract (invariants), wrappers are trivially correct if they build content + call dispatcher.
- `review:deep-review` → add Connascence audit + boundary check to review checklist.

---

## Gaps

- **AI-specific context collapse** — no canonical design pattern published for preventing parallel implementations when the LLM can't see sibling files. Current practice is anecdotal (RAG, LSP, Claude Code "look-before-you-write" discipline). Worth encoding as skill rule: *"Before writing a helper, Grep for its likely name + responsibility across repo."*
- **Automated design scoring** — Connascence is the closest metric but few tools automate it. Manual audit stays the state of the art.
- **LLM bias toward "Easy"** — limited guidance on systematically prompting against familiar-but-bad training patterns (`null` vs `Optional`, try/catch-swallow, stringly-typed dispatchers). Our skill can enumerate these explicitly.
- No clear answer on when Strangler Fig beats Parallel Change for LLM-driven migrations — likely empirical, depends on blast radius.

---

## Sources

1. **Ousterhout, John (2018)** — *A Philosophy of Software Design*. Deep vs shallow modules.
2. **Hickey, Rich (2011)** — *Simple Made Easy* (Strange Loop talk). De-complecting.
3. **Metz, Sandi** — *Practical Object-Oriented Design (POODR)*, *99 Bottles of OOP*. Rule of Three, thresholds, "duplication is far cheaper than the wrong abstraction".
4. **King, Alexis (2019)** — *Parse, Don't Validate*. Type-driven safety at boundaries.
5. **Beck, Kent (2023)** — *Tidy First?*. Small refactorings, "make the change easy, then make the easy change".
6. **Connascence.io** — Connascence as a software quality metric. Coupling taxonomy.
7. **Fowler, Martin** — *Refactoring* (2nd ed.). Parallel Change, Strangler Fig.
