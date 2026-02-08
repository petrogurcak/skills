---
name: development-workflow
description: Use when user wants to build, create, or add something new - orchestrates design, execution strategy choice, framework-specific implementation, and code review
---

# Development Workflow Orchestrator

Orchestrates complete feature development with superpowers integration.

## When to Use

**Trigger phrases (CZ/EN):**
- "přidej X" / "add X"
- "udělej X" / "make X"
- "vytvoř X" / "create X"
- "potřebuju X" / "I need X"
- "chci X" / "I want X"
- "postav X" / "build X"
- "nastav X" / "set up X"
- "pokračuj na X" / "continue on X"
- Any request to CREATE something new

**Also use when:**
- Starting work on any coding task requiring structured approach
- Continuing work on an existing plan
- User describes desired outcome (not a fix)

**Redirects to systematic-debugging:**
- "oprav X" / "fix X"
- "nefunguje X" / "X doesn't work"
- "proč X" / "why X"
- "chyba v X" / "error in X"
- "spadá X" / "X crashes"
- "nenahrává se X" / "X won't load"
- Any request to FIX something broken

**Skip orchestration for:**
- Simple documentation updates
- Configuration-only changes
- One-line fixes

## Process

### Phase 0: Detect Context

**FIRST, check for ARCHITECTURE.md:**
```
Check: Does ARCHITECTURE.md exist?
├─ YES → Read it first for project orientation
└─ NO → Continue (suggest creating one if project has 10+ files)
```

**SECOND, check for existing plan:**
```
Check: docs/plans/*.md OR ~/.claude/plans/*.md
├─ Found recent plan for this feature → Skip to Phase 2
└─ No plan → Continue to Phase 1
```

**THIRD, check task type:**
```
├─ Bug fix mentioned? → STOP, use systematic-debugging skill
├─ API/specs mentioned? → Consider openspec-workflow skill
└─ Feature implementation → Continue
```

### Phase 1: Design (if no existing plan)

**MANDATORY sequence - do not skip:**

**1. Brainstorming:**
```
Announce: "I'm using superpowers:brainstorming to refine the design."
Use Skill tool: superpowers:brainstorming
```
- Refine rough idea into clear design
- Explore alternatives and trade-offs
- Validate approach with user
- Clarify requirements and edge cases

**2. Write Plan:**
```
Announce: "I'm using superpowers:writing-plans to create implementation tasks."
Use Skill tool: superpowers:writing-plans
```
- Break design into bite-sized tasks
- Define verification criteria for each task
- Document expected outcomes

### Phase 2: Implementation

**Step 1: Git Branch**
```
ASK user: "Create branch feature/[name]?"
├─ Yes → git checkout -b feature/[name]
└─ No → Continue on current branch (with warning)
```
Branch naming: `feature/description` or `fix/description`

**Step 2: Choose Execution Strategy**

**ALWAYS ASK user - no default:**
```
"How do you want to execute this plan?

A) Manual TDD (1-2 tasks)
   - Direct implementation with framework skill
   - You control each step
   - Best for: simple features, learning, tight control

B) Batch Execution (executing-plans)
   - 3 tasks per batch
   - Human checkpoint between batches
   - Best for: collaborative review, oversight, complex features

C) Subagent-Driven (subagent-driven-development)
   - Fresh subagent per task
   - Auto code review after each task
   - Best for: fast iteration, experienced teams, many tasks

D) Agent Team (agent-team-development)
   - Parallel teammates via tmux split panes
   - Each teammate owns a module, reviewer validates continuously
   - Best for: 3+ independent modules, cross-layer work (API + frontend + tests)
   - Requires: CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS enabled
"
```

**Step 3: Execute Chosen Strategy**

Based on user choice:

**A) Manual TDD:**
1. Detect framework from CLAUDE.md or config files:
   - `composer.json` → Use `nette-framework` skill
   - `pubspec.yaml` → Use `flutter-workflow` skill
   - `package.json` + expo → Use `expo-workflow` skill (React Native + Expo)
   - `package.json` + vite → Use `frontend-workflow` skill
   - None → Follow generic TDD (RED → GREEN → REFACTOR)

2. Framework skills enforce:
   - DOCS FIRST (fetch current documentation)
   - TDD Cycle (RED → GREEN → REFACTOR)
   - Verification (tests + static analysis)

**B) Batch Execution:**
```
Announce: "I'm using superpowers:executing-plans for batch execution."
Use Skill tool: superpowers:executing-plans
```
- Loads plan, executes 3 tasks per batch
- Reports between batches, waits for feedback
- Includes finishing-branch at the end

**C) Subagent-Driven:**
```
Announce: "I'm using superpowers:subagent-driven-development for fast iteration."
Use Skill tool: superpowers:subagent-driven-development
```
- Fresh subagent per task
- Auto code review after each task
- Continuous progress without human-in-loop
- Includes finishing-branch at the end

**D) Agent Team:**
```
Announce: "I'm using development:agent-team-development for parallel execution."
Use Skill tool: development:agent-team-development
```
- Parallel teammates in tmux split panes
- Each teammate owns a module (separate files)
- Reviewer teammate validates continuously
- Lead coordinates via shared task list
- Includes finishing-branch at the end

**Step 4: Verify (for Manual TDD only)**

If using Manual TDD (option A), MANDATORY before claiming done:
```
- Run test suite → must pass 100%
- Run static analysis → 0 errors
- Show actual output (not assumptions)
```

Note: Options B, C, and D include verification in their workflows.

### Phase 3: Finalize

**For Manual TDD (option A) only:**

Options B, C, and D include finalization in their workflows. For Manual TDD:

**1. Code Review:**
```
Announce: "I'm using superpowers:requesting-code-review"
Use Skill tool: superpowers:requesting-code-review
```
- Review implementation against plan
- Check CORE_PRINCIPLES compliance
- Verify all tests pass

**2. Finish Branch:**
```
Announce: "I'm using superpowers:finishing-a-development-branch"
Use Skill tool: superpowers:finishing-a-development-branch
```
- Present options: merge, create PR, or cleanup
- Ask user for decision
- Complete git workflow

### Phase 4: Update Session Context

After completing any feature work (for all execution strategies):

**1. Update ACTIVE_CONTEXT.md:**
```
Announce: "I'm updating session context."
Use Skill tool: session-context (save mode)
```
- Mark what was completed this session
- Note any open items or work in progress
- Set "next step" recommendation for future sessions

**2. Log decisions (if any):**
- Review changes made during this session
- Check decision logging checklist:
  - [ ] Chose between 2+ valid approaches?
  - [ ] Decision affects multiple files?
  - [ ] Decision will apply long-term?
  - [ ] Future me might ask "why?"
- If any checked → append to `.claude/DECISIONS.md`

**Note:** Skip Phase 4 if project doesn't have `.claude/ACTIVE_CONTEXT.md` (not set up with projectsetup).

## Workflow Diagram

```
User: "Implement feature X"
         │
         ▼
    [Phase 0: Detect]
         │
    Has plan? ─────Yes────┐
         │                │
         No               │
         ▼                │
    [Phase 1: Design]     │
    brainstorming         │
    writing-plans         │
         │                │
         ▼◄───────────────┘
    [Phase 2: Implementation]
    ASK: Execution strategy?
         │
    ┌────┼────┬────┐
    A    B    C    D
    │    │    │    │
 Manual Batch Sub  Agent
  TDD  Exec  agent Team
    │    │    │    │
    │    │    │    └──→ [auto: parallel + review + finish]
    │    │    └──→ [auto: review + finish]
    │    └───────→ [auto: review + finish]
    │
    ▼
 [Framework skill]
 [Verify]
    │
    ▼
 [Phase 3: Finalize]
 code-review
 finishing-branch
    │
    ▼
 [Phase 4: Session Context]
 update ACTIVE_CONTEXT.md
 log decisions (if any)
    │
    ▼
  DONE
```

## Integration with Project Setup

Projects initialized with `projectsetup` skill have `CLAUDE.md` that references this workflow.

When you see instruction in `CLAUDE.md`:
```
Use development-workflow skill
```

This is your cue to follow this orchestration process.

## Integration with Superpowers

This skill orchestrates superpowers skills:

| Phase | Skill | Purpose |
|-------|-------|---------|
| 1 | brainstorming | Design refinement |
| 1 | writing-plans | Task breakdown |
| 2 | executing-plans | Batch execution (option B) |
| 2 | subagent-driven-development | Fast iteration (option C) |
| 2 | agent-team-development | Parallel execution (option D) |
| 3 | requesting-code-review | Quality gate |
| 3 | finishing-a-development-branch | Git completion |
| 4 | session-context | Save progress & decisions |

## Architecture

```
projectsetup (Constitutional Law)
       │ creates principles
       ▼
development-workflow (THIS SKILL - Orchestration)
       │ sequences phases, asks execution strategy
       ▼
┌──────┼──────┬──────┐
│      │      │      │
▼      ▼      ▼      ▼
Manual Batch  Sub    Agent
TDD    Exec   agent  Team
│      │      │
▼      │      │
Framework     │
Skills        │
│      │      │
▼      ▼      ▼
Superpowers (Support Layer)
```

## Common Mistakes to Avoid

❌ **Skipping Phase 0** - "I'll just start brainstorming"
- Always check for existing plan first

❌ **Skipping brainstorming** - "The requirement is clear"
- Even clear requirements benefit from design exploration

❌ **Choosing execution strategy without asking** - "I'll use subagent-driven"
- ALWAYS ask user, no default

❌ **Skipping docs-first** - "I know this framework"
- Training data may be outdated, ALWAYS fetch current docs

❌ **Starting implementation before branch** - "It's a small change"
- Git branch is MANDATORY, no exceptions

❌ **Claiming done without verification** - "Tests should pass"
- Verification requires actual test output, not assumptions

❌ **Using for bugs** - "It's a small bug fix"
- Use `systematic-debugging` skill for bugs

## Summary

**Every feature implementation follows:**
1. **Detect** → Check for existing plan, redirect if bug
2. **Design** → Brainstorm + Plan (skip if plan exists)
3. **Implement** → ASK execution strategy (Manual/Batch/Subagent/Agent Team)
4. **Finalize** → Review + Finish (auto for B/C/D, manual for A)
5. **Context** → Update session context + log decisions

**This skill orchestrates, other skills execute.**
