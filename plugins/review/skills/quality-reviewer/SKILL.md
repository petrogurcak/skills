---
name: quality-reviewer
description: Reviews code quality independently of plan — TDD compliance, error handling, code smells, security basics, performance red flags. Use after implementation is complete. Focuses on code itself, not whether it matches plan (use compliance-reviewer for that). Works in both Claude Code and Gemini CLI.
metadata:
  author: Petr
  version: 1.0.0
---

# Quality Reviewer

Review code quality **independently of the plan**. Focus on the code itself.

**Announce:** "Pouštím quality-reviewer — code quality + TDD compliance."

## When to Use

- Po implementaci, před mergem
- Mandatory v `development-workflow` Phase 3 Step 1b
- Ruční: "zreviewni kvalitu mého kódu"

## When NOT to Use

- Check if implementation matches plan → `review:compliance-reviewer`
- Deep architectural review → `review:deep-review`
- Specific concern (SQL injection, API design) → domain-specific skill (`review:security-review`, `review:api-design-review`)

## Inputs

List of changed files nebo git diff range.

Pokud ti user nedodal:

1. `git diff --name-only <base>..HEAD` — získej automaticky
2. Nebo: `git diff HEAD` pro unstaged changes

## Process

### Step 0: Read Project Standards

**Vždy nejdřív:**

- `CORE_PRINCIPLES.md` (pokud existuje) — align s project standards
- `CLAUDE.md` — project conventions
- `.claude/WORKFLOWS.md` — TDD workflow definition

Review bez project context = generic advice.

### Step 1: TDD Compliance Check

- Každý implementation file má odpovídající test file?
- Tests skutečně testují behavior (ne jen existují jako prázdné stubs)?
- Tests pro error cases, ne jen happy path?
- Tests byly napsané PŘED implementací? Check `git log` ordering:
  ```bash
  git log --follow --oneline <test_file>
  git log --follow --oneline <impl_file>
  ```
  Test commits should predate impl commits.

### Step 2: Code Quality

**Size limits:**

- Functions < 50 lines
- Classes < 300 lines
- Files < 500 lines (u business logic)

**Naming:**

- Clear, self-documenting names
- Žádné single-letter vars (except loop counters)
- Consistent conventions (camelCase/snake_case per language)

**Cleanliness:**

- No dead code
- No commented-out code
- No debug prints (`console.log`, `print`, `var_dump`)
- DRY — duplicated logic refactored (ale pozor na Principle 14 — Rule of Three, ne premature abstraction)
- No hardcoded values that should be config/env vars

### Step 3: Error Handling

- Errors caught a meaningfully handled?
- No empty catch blocks (`catch (e) { }`)
- No swallowed errors (catch then ignore)
- Helpful user-facing error messages
- Network/IO má timeout + retry logic
- Logging má správnou severity (error vs warn vs info)

### Step 4: Security Basics

- Input validation na external data (forms, API params, URL params)
- No SQL injection (parameterized queries, ORM properly)
- No XSS (escaping in templates, sanitization)
- No hardcoded secrets (API keys, passwords, tokens)
- Auth checks na protected routes
- CSRF protection where needed

### Step 5: Performance Red Flags

- N+1 queries (ORM loops without eager loading)
- Unbounded loops/recursion
- Missing pagination na list endpoints
- Large objects v paměti bez streamingu
- Synchronous I/O v async context
- Missing database indexes na frequently queried columns

## Output Format

```markdown
## Quality Review

**Files reviewed:** [count] files
**TDD Score:** [A/B/C/D/F]
**Verdict:** [APPROVE / APPROVE WITH NOTES / REQUEST CHANGES]

### Summary

- Critical: [count] — must fix before merge
- Warning: [count] — should address
- Info: [count] — consider

### CRITICAL

- **[Q1]** `file.ts:42` — [Description]

  - **Why critical:** [Impact: security/data loss/crash]
  - **Fix:** [Specific suggestion with code snippet if possible]

- **[Q2]** `file.py:15` — [Description]
  - **Why critical:** [Impact]
  - **Fix:** [Suggestion]

### WARNING

- **[Q3]** `file.ts:100` — [Description]
  - **Fix:** [Suggestion]

### INFO

- **[Q4]** Pattern observation across files

### TDD Assessment

- Implementation files: X
- Test files: Y
- Coverage style: unit / integration / both
- TDD ordering (test-first): confirmed / violated / unclear
- Score reasoning: [why A/B/C/D/F]

### Next Step

[Jedna věta.]
```

## Rules

- **Read CORE_PRINCIPLES.md first.** Align s project standards.
- **Be specific:** `file_path:line_number` + issue + concrete fix.
- **Max 5 CRITICAL + 10 WARNING.** Prioritize by impact.
- **Don't nitpick style.** Prettier/linters handle that. Focus on correctness, security, maintainability.
- **Clean code → short APPROVE.** Valid review outcome. Don't invent issues.
- **Verdicts:**
  - `APPROVE`: Žádné CRITICAL, WARNINGs OK to ignore nebo fix later.
  - `APPROVE WITH NOTES`: Některé WARNINGs měly by být addressed v follow-up PR.
  - `REQUEST CHANGES`: 1+ CRITICAL findings must be fixed before merge.

## TDD Score Rubric

- **A:** Every impl file has test, tests predate impl commits, error cases covered, clear assertions.
- **B:** Every impl file has test, some gaps in error coverage, but tests are solid.
- **C:** Most files have tests, weak coverage, post-hoc test writing.
- **D:** Some files have tests, many gaps, tests added as afterthought.
- **F:** Missing tests for impl, or tests that don't actually test behavior.

## After Review

- **APPROVE:** Pokračuj v workflow (security review → merge).
- **REQUEST CHANGES:** Oznam findings, nabídni: "Opravím critical issues — chceš vidět diff?" Po souhlasu: fix, re-run review.
