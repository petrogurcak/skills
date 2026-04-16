---
name: compliance-reviewer
description: Reviews implementation against plan — checks all tasks implemented, DoD met, no missing pieces, no scope creep. Use after implementation is complete and before merge. Plan is source of truth. Works in both Claude Code and Gemini CLI.
metadata:
  author: Petr
  version: 1.0.0
---

# Compliance Reviewer

Verify implementation matches the plan. **Plan is source of truth.**

**Announce:** "Pouštím compliance-reviewer — code vs plan."

## When to Use

- Plan file byl dokončen, implementace hotová, před mergem
- Mandatory v `development-workflow` Phase 3 Step 1a
- Ruční volání: "zkontroluj že implementace odpovídá plánu"

## When NOT to Use

- Plan file neexistuje → použij `superpowers:requesting-code-review`
- Code quality concerns → `review:quality-reviewer` (separate lens)
- Pre-implementation review → `review:plan-challenger`

## Inputs

1. Path to plan file (typically `docs/plans/YYYY-MM-DD-*.md`)
2. Optional: git diff range nebo list of changed files

Pokud ti user nedodal plan path:

1. Zkontroluj `docs/plans/` — je tam jen jeden recent plan? Použij ho.
2. Pokud víc, zeptej se.
3. Pokud žádný, STOP — nelze dělat compliance review bez plánu.

## Process

### Step 1: Read the Plan

Kompletně přečti plan file. Extract:

- Task list (explicit tasks + implicit "and also..." requirements)
- Definition of Done (pokud specifikovaná)
- Expected files to be created/modified
- Test requirements per task

### Step 2: Read Actual Changes

Použij git diff range:

```bash
git diff <base>..HEAD
```

Nebo list souborů:

```bash
git diff --name-only <base>..HEAD
```

**Důležité:** Čti SKUTEČNÝ kód, ne jen file existence. Soubor může existovat ale task není implementován.

### Step 3: Check Each Task

Pro každý task v planu:

- [ ] Files specifikované v tasku vytvořeny/upraveny?
- [ ] Kód odpovídá task description (ne jen existuje, ale dělá co má)?
- [ ] Test files vytvořeny (pokud plan vyžadoval TDD)?
- [ ] Tests actually test the behavior described?

### Step 4: Completeness Check

- Všechny tasks označeny jako done v plan YAML?
- `tasks_done` count matches?
- Files changed které NEJSOU v plánu? (scope creep)
- TODOs, `FIXME`, placeholder code (e.g., `raise NotImplementedError`)?
- Dead code nebo commented-out blocks?

### Step 5: Definition of Done Check

Pokud plan specifikuje DoD criteria:

- Tests passing? (`npm test`, `pytest`, atd.)
- Lint clean?
- Build succeeds?
- Documentation updated (pokud vyžadováno)?
- Acceptance criteria met?

## Output Format

Přesně tenhle formát:

```markdown
## Compliance Review

**Plan:** `[path]`
**Changes reviewed:** `[git range or file list]`
**Verdict:** [COMPLIANT / PARTIALLY COMPLIANT / NON-COMPLIANT]

### Task Coverage

| Task                        | Status                   | Notes                              |
| --------------------------- | ------------------------ | ---------------------------------- |
| Task 1: [name]              | PASS / PARTIAL / MISSING | [details]                          |
| Task 2: [name]              | PASS                     | Fully implemented with tests       |
| Task 3: [name]              | PARTIAL                  | Missing error handling for case X  |

### Issues Found

- **[C1]** [Task X]: [What's missing or wrong]
  - **Plan said:** "[excerpt from plan]"
  - **Code does:** "[what actually happens]"
  - **Fix:** [Specific suggestion]

### Scope Check

- **In plan but not changed:** [list files or "none"]
- **Changed but not in plan:** [list files or "none"]
- **Scope creep risk:** [low/medium/high with reasoning]

### Definition of Done

- [x] Tests passing
- [ ] Lint clean (1 error in file X)
- [x] Build succeeds

### Next Step

[Jedna věta co má user udělat dál.]
```

## Rules

- **Read BOTH plan AND actual code.** Don't just check file existence.
- **Be specific:** "Task 3 says add email validation, but validators.py only checks non-empty" — good. "Validation might be missing" — useless.
- **Scope creep = finding, not failure.** Note in "Scope Check" but don't mark non-compliant unless it broke something.
- **Vague plan ("add proper error handling") = plan quality issue,** not implementation failure. Note it.
- **Verdicts:**
  - `COMPLIANT`: Všechny tasky PASS, žádné issues, DoD met.
  - `PARTIALLY COMPLIANT`: Většina tasků PASS, některé PARTIAL s opravitelnými issues.
  - `NON-COMPLIANT`: Critical tasks MISSING nebo fundamental DoD failures.

## After Review

**Pokud NON-COMPLIANT:**

1. Oznam findings userovi
2. Čekej na rozhodnutí: "Opravím missing tasks — chceš vidět diff před commitem?"
3. Po souhlasu: doimplementuj, re-run review

**Pokud PARTIALLY COMPLIANT:**

- Prezentuj findings
- Let user decide zda opravit teď nebo v next PR

**Pokud COMPLIANT:**

- Short APPROVE message
- Pokračuj v workflow (typically: `review:quality-reviewer` → security review → merge)
