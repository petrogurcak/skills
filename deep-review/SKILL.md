---
name: deep-review
description: Use after completing significant code changes - orchestrates specialized review skills (security, database, API, UX) based on auto-detected stack and scope
---

# Deep Review - Code Review Orchestrator

## Overview

This skill orchestrates comprehensive code review by auto-detecting stack and routing to specialized review skills. It does NOT implement reviews itself - it coordinates specialists.

**Philosophy:**
```
Orchestrator = Conductor
Specialized Skills = Musicians

The conductor coordinates, musicians play.
```

**Announce:** "I'm using deep-review to analyze your code changes."

## When to Use

**USE this skill:**
- After completing larger piece of work
- Before deploy to production
- When `/deep-review` command issued
- "Udělej hloubkovou analýzu"
- Code audit requested

**DON'T use this skill:**
- Quick spot check (use specialist directly)
- Just security review → `security-review`
- Just database review → `database-review`

## Workflow

```dot
digraph deep_review_flow {
    "Changes detected" [shape=doublecircle];
    "Scope detection" [shape=box];
    "Stack detection" [shape=box];
    "Route to specialists" [shape=box];
    "Execute checklists" [shape=box];
    "Generate report" [shape=box];
    "Done" [shape=doublecircle];

    "Changes detected" -> "Scope detection";
    "Scope detection" -> "Stack detection";
    "Stack detection" -> "Route to specialists";
    "Route to specialists" -> "Execute checklists";
    "Execute checklists" -> "Generate report";
    "Generate report" -> "Done";
}
```

### Step 1: Scope Detection

**If no argument:**
```bash
git diff --name-only  # Changed files
```

**If argument provided:**
| Argument | Scope |
|----------|-------|
| `backend`, `api` | Server-side focus |
| `frontend`, `ui` | Client-side focus |
| `security` | Security-only review |
| `database`, `db` | Database-only review |
| `/path/to/file` | Specific path only |

### Step 2: Stack Detection

| Indicator | Detected Stack |
|-----------|---------------|
| `pyproject.toml`, `requirements.txt` | Python |
| `FastAPI` imports | FastAPI |
| `composer.json`, `.neon` | PHP/Nette |
| `package.json` + React/Vue | Frontend |
| `.latte` files | Nette templates |
| `checkout`, `cart`, `product` | E-commerce |
| REST endpoints | API |
| SQL files, migrations | Database |

### Step 3: Route to Specialists

| Detected Stack | Skills to Invoke |
|----------------|------------------|
| Python/FastAPI | `fastapi-workflow`, `security-review`, `database-review` |
| PHP/Nette | `nette-framework`, `security-review` |
| Frontend | `frontend-workflow`, `ux-optimization` |
| E-commerce | `ux-optimization` (e-commerce practices) |
| API endpoints | `api-design-review`, `security-review` |
| Database changes | `database-review` |
| Any code | `security-review` (always) |

### Step 4: Execute Checklists

For each invoked skill, run its checklist and record findings.

**Priority order:**
1. **CRITICAL** - Security vulnerabilities, data loss risks
2. **HIGH** - Performance issues, missing validation
3. **MEDIUM** - Code quality, missing tests
4. **LOW** - Style, documentation

### Step 5: Generate Report

```markdown
## Deep Review: [scope]

**Stack:** [detected]
**Files:** [count] analyzed
**Skills used:** [list]

---

### 🔴 CRITICAL (blocks deploy)

| File:line | Issue | Fix |
|-----------|-------|-----|
| api/auth.py:45 | SQL injection | Use parameterized query |

---

### 🟠 HIGH (technical debt)

| File:line | Issue | Recommendation |
|-----------|-------|----------------|
| ... | ... | ... |

---

### 🟡 MEDIUM (improvements)

- [ ] ...

---

### ⚪ LOW (nice to have)

- [ ] ...

---

### Checklist Summary

| Skill | Issues Found | Critical | High |
|-------|--------------|----------|------|
| security-review | 3 | 1 | 2 |
| database-review | 2 | 0 | 1 |
| api-design-review | 1 | 0 | 0 |
```

## Specialist Skills

### Security Review (`security-review`)
- OWASP Top 10 checklist
- SQL injection, XSS, CSRF
- Auth/session handling
- Sensitive data exposure

### Database Review (`database-review`)
- N+1 queries
- Missing indexes
- Transaction handling
- Connection pooling

### API Design Review (`api-design-review`)
- REST conventions
- Error handling
- Pagination
- Rate limiting
- Versioning

### Framework-Specific
- `fastapi-workflow` - FastAPI patterns
- `nette-framework` - Nette patterns
- `frontend-workflow` - Frontend patterns

### UX Review
- `ux-optimization` - For frontend/e-commerce

## Red Flags - Stop Review, Alert Immediately

These require IMMEDIATE attention:

```
🚨 CRITICAL SECURITY ISSUES:
- Hardcoded secrets/credentials
- SQL injection vulnerabilities
- No auth on sensitive endpoints
- Plaintext passwords
- Debug mode in production
```

**Action:** Stop review, alert user, fix before continuing.

## Quick Reference

| Review Type | Specialist Skill | Focus |
|-------------|------------------|-------|
| Security | `security-review` | OWASP Top 10 |
| Database | `database-review` | N+1, indexes, transactions |
| API | `api-design-review` | REST, errors, pagination |
| FastAPI | `fastapi-workflow` | Pydantic, async, DI |
| Nette | `nette-framework` | DI, Latte, Tracy |
| Frontend | `frontend-workflow` | Components, state |
| UX | `ux-optimization` | Forms, e-commerce |

## Common Mistakes

**❌ Skipping security review:**
"It's just internal API" → Security review ALWAYS runs.

**❌ Ignoring low severity:**
Low ≠ unimportant. Track for later cleanup.

**❌ Not prioritizing:**
Fix CRITICAL before touching MEDIUM issues.

**❌ Missing stack detection:**
Check multiple indicators, not just one file.

## Integration Notes

**Triggering deep-review:**
- Manual: `/deep-review` or "review my changes"
- After significant code completion
- Before merge/deploy

**After review:**
- Fix CRITICAL immediately
- Create tickets for HIGH/MEDIUM
- Track LOW in tech debt backlog
