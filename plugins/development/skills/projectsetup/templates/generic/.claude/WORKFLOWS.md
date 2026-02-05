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
