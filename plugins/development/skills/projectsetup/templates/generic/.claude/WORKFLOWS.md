# Development Workflows

This document provides step-by-step workflows for common development tasks.

---

## Workflow Selection Guide

| Task Type | Skill to Use | When |
|-----------|--------------|------|
| **Feature implementation** | `development-workflow` | Any new feature |
| **Complex/Multi-step features** | `openspec-workflow` | API work, multi-component changes |
| **Bug fixes** | `systematic-debugging` | Any bug report |
| **Refactoring** | Manual TDD workflow | Code improvement without behavior change |

---

## Feature Implementation (development-workflow skill)

**Use when:** Adding new functionality

**Invoke:** "Use development-workflow skill to implement X"

### Orchestrated Phases

```
Phase 1: Understand & Design
- Detect context (API? UI? Bug?)
- Brainstorm -> /superpowers:brainstorm
- Plan -> /superpowers:write-plan

Phase 2: Implementation
- Create branch (ask user)
- Fetch docs (MANDATORY - training data may be outdated)
- TDD Cycle: RED -> GREEN -> REFACTOR
- Verify: tests + static analysis
- Commit (ask user)

Phase 3: Review & Finalize
- Code review -> /superpowers:request-code-review
- Finish branch -> /superpowers:finishing-branch
```

---

## OpenSpec Workflow (Complex Features)

**Use when:** Complex features requiring clear specifications before coding

**Invoke:** "Use openspec-workflow to implement X"

### Five-Stage Process

```
Stage 1: Draft Proposal
- Create openspec/changes/[name]/
- Write proposal.md (problem, solution, scope, criteria)
- Get user review

Stage 2: Review & Align
- Discuss with user
- Refine specifications
- Write spec delta (specs/[area]/spec.md)
- Get explicit approval

Stage 3: Implement Tasks
- Create tasks.md with breakdown
- For each task: TDD (RED -> GREEN -> REFACTOR)
- Request code review for major chunks
- Mark tasks complete

Stage 4: Archive Change
- Verify all tasks complete
- Verify all tests pass
- Move to openspec/changes/archive/

Stage 5: Update Source Specs
- Merge delta into openspec/specs/
- Ensure specs reflect current system
```

---

## Bug Fix Workflow (systematic-debugging skill)

**Use when:** Fixing a bug

**Invoke:** "Use systematic-debugging skill to fix X"

### Four-Phase Approach

```
Phase 1: Root Cause Investigation
- Reproduce the bug
- Trace execution path
- Identify failure point
- Don't assume - verify

Phase 2: Pattern Analysis
- Check for similar bugs
- Identify root cause
- Consider related areas
- Document findings

Phase 3: Hypothesis Testing
- Form specific hypothesis
- Test hypothesis
- Verify or reject
- Iterate if needed

Phase 4: Implementation
- Write test reproducing bug (RED)
- Fix bug (GREEN)
- Verify no regressions
- Commit with explanation
```

---

## Refactoring Workflow (Manual TDD)

**Use when:** Improving code structure without changing behavior

### Steps

```
1. Create Branch
   git checkout -b refactor/description

2. Verify Existing Tests Pass
   npm test  # or pytest, etc.

3. Run Static Analysis Baseline
   npm run lint  # or mypy, etc.

4. Make Small Refactor Change
   - ONE thing at a time
   - Keep changes focused

5. Run Tests After Each Change
   Tests MUST stay GREEN
   If RED -> Revert and try smaller step

6. Final Verification
   npm test + npm run lint

7. Commit (ask user)
   refactor(scope): improve X
```

---

## User Flow Testing Workflow

**Use when:** Building or modifying user-facing features in web applications

### Two-Layer Testing

```
CI Layer (automatic, every PR):
  └─ Playwright - smoke + core + error-states
     Deterministic, fast, free
     Catches regressions: broken CRUD? login failing?

AI Layer (manual, before deploy/release):
  └─ Claude-in-Chrome - exploratory + visual + UX
     "Walk through the app, find problems"
     Output: GIF recording + findings report
     Catches what Playwright can't: UX issues, visual bugs
```

### Playwright Test Structure

```
e2e/
├── auth.setup.ts            # Auth setup (runs first, shares session)
├── smoke/                   # Fast sanity (< 5 min, every PR)
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   └── [feature].spec.ts
├── core/                    # Full user journeys (< 15 min, pre-deploy)
│   ├── [feature]-crud.spec.ts
│   └── [feature]-flow.spec.ts
├── error-states/            # Simulated API failures
│   └── api-errors.spec.ts
└── fixtures/
    ├── test-fixtures.ts     # Custom Playwright fixtures
    └── test-data.ts         # API TestDataFactory (create/delete via API)
```

### Playwright Conventions

- Use `data-testid` attributes for selectors (not CSS classes, not XPath)
- TestDataFactory for API setup/teardown (create test data via API, not UI)
- Auth as setup project (runs once, shares session state)
- Timeouts: `{ timeout: 15000 }` for navigation, `{ timeout: 10000 }` for actions
- Cleanup in `afterEach` (delete test data created during test)
- `test.describe()` for grouping related flows
- Serial tests within describe when order matters

### AI Exploratory Testing (Pre-Deploy)

Before deploying, use Claude-in-Chrome to:
1. Walk through main user flows
2. Record GIF of each flow
3. Check for visual issues, UX problems, broken states
4. Report findings with screenshots

Trigger: "Run exploratory testing on [URL]"

---

## Git Operations

### Create Branch
```bash
git checkout -b <type>/<description>

# Types:
# feature/  : New functionality
# fix/      : Bug fixes
# refactor/ : Code improvements
# test/     : Test additions
# docs/     : Documentation
```

### Commit Format
```
<type>(<scope>): brief description

Detailed explanation of WHY this change was made.

Closes #123
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructure (no behavior change)
- `test`: Test changes
- `docs`: Documentation
- `chore`: Build/tooling changes

---

## Pre-Commit Checklist

Before every commit:

- [ ] On feature branch (not main/master)
- [ ] Tests written BEFORE code (TDD)
- [ ] Watched test FAIL before writing code (RED)
- [ ] Test now PASSES (GREEN)
- [ ] Full test suite passes
- [ ] Static analysis passes (no errors)
- [ ] Commit message explains WHY
- [ ] User approved commit

---

## Quick Reference Commands

```bash
# Run tests
npm test           # or: pytest, cargo test, etc.

# Run static analysis
npm run lint       # or: mypy, clippy, phpstan, etc.

# Run build
npm run build      # or: cargo build, etc.

# Git
git checkout -b feature/name    # New branch
git add . && git commit -m ""   # Commit
git push origin branch-name     # Push
gh pr create                    # PR
```

---

**Last Updated:** {{DATE}}
