# Our Claude Code Development Workflow

Complete description of how we set up and run AI-assisted development projects.

---

## Overview

Our workflow has two layers:

1. **Project Setup** (`projectsetup` skill) - Creates the "constitution" for a project: principles, rules, checkpoints
2. **Workflow Optimization** (`workflow-optimization` skill) - Adds learning, verification, and automation on top

Together they create a complete development environment where Claude Code follows strict disciplines (TDD, Git safety, verification) while continuously learning from mistakes.

---

## Layer 1: Project Setup

### What It Creates

Running `projectsetup` creates this structure in any project:

```
project/
├── CLAUDE.md                        # Entry point - quick reference
└── .claude/
    ├── CORE_PRINCIPLES.md           # 12 core development principles
    ├── WORKFLOWS.md                 # Step-by-step workflows (TDD, bugs, refactoring)
    ├── CHECKPOINTS.md               # When to ask user vs auto-proceed
    ├── ACTIVE_CONTEXT.md            # Session continuity (where we left off)
    ├── DECISIONS.md                 # Architectural decisions log
    └── settings.local.json          # Project-level permissions
```

### 4 Variants

| Variant | Stack | Extra Rules |
|---------|-------|-------------|
| **Generic** | Any | Pure principles only |
| **Nette** | PHP + Latte + Tracy | DI, Latte, Database patterns |
| **Flutter** | Dart + Flutter | Immutable widgets, state management, null safety |
| **Frontend** | Vite + TS + Tailwind + Alpine | TypeScript strict, Tailwind utilities, Alpine patterns |

### 12 Core Principles

These are the "laws" Claude follows in every project:

| # | Principle | Rule |
|---|-----------|------|
| 1 | **TDD** | Write test BEFORE code. RED -> GREEN -> REFACTOR. |
| 2 | **Git Safety** | Always branch first. Never work on main. |
| 3 | **Verification** | Never claim "done" without proof (actual test output). |
| 4 | **Checkpoints** | Ask at decision points, auto-proceed on safe ops. |
| 5 | **False Positive Prevention** | Test must FAIL before it can be trusted to pass. |
| 6 | **Minimal Code** | Write simplest code that makes test pass. |
| 7 | **Refactoring Discipline** | Refactor only when tests are green. |
| 8 | **Project Conventions** | Customizable section for project-specific rules. |
| 9 | **Static Analysis Gate** | Static analysis must pass before commits. |
| 10 | **Commit Messages** | Explain WHY, not WHAT. Conventional commits format. |
| 11 | **Incremental Progress** | Small verified steps > big leaps. |
| 12 | **No Hardcoded Values** | Config, secrets, env-specific values externalized. |

### Checkpoint System

Defines exactly when Claude asks vs auto-proceeds:

**Auto-proceed (no asking):**
- Reading/searching files
- Creating branches
- Running tests and static analysis
- Installing existing dependencies

**Ask first (requires confirmation):**
- Git commits, pushes, merges
- Force push, hard reset
- Adding new dependencies
- Architectural decisions
- External API modifications
- Database schema changes

**Rule: When in doubt, ask.**

### Session Context

Continuity between Claude sessions:

- **ACTIVE_CONTEXT.md** - Tracks current state: what was done, what's next
- **DECISIONS.md** - Logs architectural decisions with context, alternatives, reasoning

At session start, Claude reads these and announces where we left off. At session end, Claude updates them.

---

## Layer 2: Workflow Optimization

Added on top of project setup. Optional but recommended.

### Components

| Component | What It Does |
|-----------|--------------|
| **A) Mistakes Tracking** | `.claude/mistakes.md` - Log errors, root causes, lessons learned. Cherny pattern = 2-3x quality improvement. |
| **B) Verification Checklist** | `.claude/verification.md` - Stack-specific pre-commit checklist (auto-detected). |
| **C) Context Pruning** | [MAJOR]/[MINOR] tagging in ACTIVE_CONTEXT.md. Keep all MAJOR, last 5 MINOR, archive rest. |
| **D) After-Commit Hook** | Reflection reminder after every git commit - "Did anything unexpected happen?" |
| **E) Code Quality Hooks** | Auto-Prettier, TypeScript check, console.log warning after JS/TS edits. |
| **F) Pattern Learning** | `/learn` command extracts reusable patterns from sessions. SessionEnd hook reminds to capture. |
| **G) Checkpoints** | `/checkpoint` command for workflow milestones (create, verify, list). |
| **H) Build Error Resolver** | Dedicated agent for fixing build/TS errors with minimal diffs. No refactoring, just fixes. |

### Mistakes Tracking (Detail)

**Format:**
```markdown
## [YYYY-MM-DD]: Brief description
**Co se stalo:** What went wrong
**Proc:** Root cause
**Oprava:** How it was fixed
**Pouceni:** What to do differently next time
**Tags:** #backend #frontend #database #testing
```

**Hooks:**
- `load-mistakes.sh` - Loads lessons at session start
- `after-commit.sh` - Triggers reflection after commits

### Context Pruning (Detail)

**Classification:**
- **[MAJOR]** - Architectural decisions, new features, breaking changes, security fixes, API changes
- **[MINOR]** - Bug fixes, CSS tweaks, refactoring, config changes, docs

**Rules:**
- Keep ALL [MAJOR] entries forever
- Keep last 5 [MINOR] entries
- Archive older [MINOR] to `.claude/archive/minor-sessions.md`
- Trigger pruning when ACTIVE_CONTEXT.md > 15KB

---

## Development Workflow (How We Build Features)

The `development-workflow` skill orchestrates the complete feature lifecycle.

### Phase 0: Detect Context

```
Has existing plan? ──Yes──> Skip to Phase 2
        │
        No
        │
Is it a bug? ──Yes──> Redirect to systematic-debugging skill
        │
        No
        │
Is it complex API work? ──Yes──> Consider openspec-workflow skill
        │
        No
        │
Continue to Phase 1
```

### Phase 1: Design

**Mandatory sequence (never skip):**

1. **Brainstorming** (`superpowers:brainstorming` skill)
   - Refine rough idea into clear design
   - Explore alternatives and trade-offs
   - Validate approach with user

2. **Write Plan** (`superpowers:writing-plans` skill)
   - Break design into bite-sized tasks
   - Define verification criteria per task
   - Document expected outcomes

### Phase 2: Implementation

**Step 1: Git Branch**
- Ask user: "Create branch `feature/[name]`?"

**Step 2: Choose Execution Strategy (always ask, no default)**

| Strategy | Best For | How It Works |
|----------|----------|--------------|
| **A) Manual TDD** | Simple features, tight control | Direct TDD with framework skill. You control each step. |
| **B) Batch Execution** | Collaborative review, complex features | 3 tasks per batch, human checkpoint between batches. |
| **C) Subagent-Driven** | Fast iteration, many tasks | Fresh subagent per task, auto code review after each. |
| **D) Agent Team** | 3+ independent modules, parallel work | Parallel teammates in tmux, each owns a module, reviewer validates. |

**Step 3: Execute**

For Manual TDD, framework is auto-detected:
- `composer.json` -> Nette workflow
- `pubspec.yaml` -> Flutter workflow
- `package.json` + expo -> Expo workflow
- `package.json` + vite -> Frontend workflow (routed to app or LP, see below)
- None -> Generic TDD

All framework skills enforce: **Docs first -> TDD -> Verification**

**Frontend Router (automatic):**

When frontend is detected, the workflow routes to the correct skill:

```
Frontend project detected
├─ Web app / dashboard / admin panel / e-commerce backend
│  └─ frontend-app (Vite + TypeScript + Tailwind + Alpine.js)
└─ Landing page / marketing web / product showcase
   └─ frontend-lp (Vite + React + TypeScript + Tailwind + shadcn/ui + Magic UI)
```

### Phase 3: Finalize

1. **Code Review** (`superpowers:requesting-code-review`)
   - Review against plan
   - Check CORE_PRINCIPLES compliance
   - Verify all tests pass

2. **Finish Branch** (`superpowers:finishing-a-development-branch`)
   - Options: merge, create PR, or cleanup
   - Ask user for decision

### Phase 4: Update Session Context

1. Update `ACTIVE_CONTEXT.md` with what was completed
2. Log decisions to `DECISIONS.md` (if any architectural decisions were made)

---

## Bug Fix Workflow

Handled by `systematic-debugging` skill. Separate from feature development.

```
Phase 1: Root Cause Investigation
- Reproduce the bug
- Trace execution path
- Identify failure point

Phase 2: Pattern Analysis
- Check for similar bugs
- Identify root cause
- Check related areas

Phase 3: Hypothesis Testing
- Form specific hypothesis
- Test it
- Verify or reject, iterate

Phase 4: Fix with TDD
- Write test reproducing bug (RED)
- Fix bug (GREEN)
- Verify no regressions
- Commit with explanation
```

---

## Complex Feature Workflow

Handled by `openspec-workflow` skill. For multi-endpoint, multi-component work.

```
Stage 1: Draft Proposal     -> proposal.md (problem, solution, scope)
Stage 2: Review & Align     -> spec delta, get approval
Stage 3: Implement Tasks    -> TDD per task, code review for major chunks
Stage 4: Archive Change     -> move to archive after completion
Stage 5: Update Specs       -> merge delta into source specs
```

---

## Framework Skills (Execution Layer)

The framework skills are the "hands" that do the actual coding. Each enforces docs-first + TDD.

### Backend Skills

| Skill | Stack | Key Rules |
|-------|-------|-----------|
| **nette-workflow** | PHP + Nette + Latte + Tracy | DI patterns, Latte templates, Database Explorer |
| **fastapi-workflow** | Python + FastAPI + Pydantic v2 | Async endpoints, Pydantic models, SQLAlchemy |
| **expo-workflow** | React Native + Expo | Native modules, navigation, platform-specific code |
| **flutter-workflow** | Dart + Flutter | Immutable widgets, BLoC/Riverpod, null safety |

### Frontend Skills

Two specialized skills with automatic routing:

**`frontend-app`** - Web Applications
- **Stack:** Vite + TypeScript + Tailwind + Alpine.js
- **Use for:** Dashboards, admin panels, e-commerce backends, CRUD apps
- **6 workflows:** Tailwind Layout, Alpine.js Component, TypeScript Config, Vite Build, E-commerce UI, Form with Validation
- **Key rules:** TypeScript strict, utility-first CSS, Alpine 3.x reactivity, no jQuery
- **Hooks:** Auto-Prettier, TS check, console.log warning (skill-scoped)

**`frontend-lp`** - Landing Pages & Marketing
- **Stack:** Vite + React + TypeScript + Tailwind + shadcn/ui + Magic UI + Framer Motion
- **Use for:** Product landing pages, marketing websites, launch pages, showcases
- **5 workflows:** Project Setup, Landing Page Layout, Animated Components, Responsive & Mobile, SEO & Performance
- **Key rules:** shadcn for base components, Magic UI for animations (max 3-4 per page), mobile-first, Lighthouse > 90
- **Section structure:** Hero -> Features (Bento Grid) -> Social Proof (Marquee) -> Pricing -> CTA -> Footer
- **Hooks:** Auto-Prettier, TS check, console.log warning (skill-scoped)

Both skills share:
- **DOCS FIRST** principle (mandatory MCP tool calls before coding)
- **Code quality hooks** (auto-format, type check, console.log detection)
- **Verification checklists** before completion

---

## Architecture Summary

```
projectsetup (Layer 1 - Constitution)
       |
       | creates principles, checkpoints, session context
       v
workflow-optimization (Layer 2 - Learning & Automation)
       |
       | adds mistakes tracking, hooks, verification, agents
       v
development-workflow (Orchestration)
       |
       | sequences phases, asks execution strategy
       v
+----------+----------+----------+----------+
|          |          |          |          |
Manual    Batch    Subagent   Agent
TDD       Exec     Driven     Team
|
v
Framework Skills (Execution)
├── nette-workflow      (PHP + Nette)
├── fastapi-workflow    (Python + FastAPI)
├── expo-workflow       (React Native + Expo)
├── flutter-workflow    (Dart + Flutter)
├── frontend-app       (Vite + TS + Tailwind + Alpine) ← web apps
└── frontend-lp        (React + shadcn + Magic UI)     ← landing pages
|
v
Superpowers (brainstorming, planning, review, finishing)
```

---

## Quick Start

1. `projectsetup` - Creates principles + structure
2. `workflow-optimization` (option A) - Adds all optimizations
3. Start building: "Implement feature X" -> triggers `development-workflow`

---

**Last Updated:** 2026-02-08
