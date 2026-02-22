---
name: ralph-loop-setup
description: Creates the 4-file structure (prd.json, prompt.md, progress.txt, ralph.sh) for autonomous AI coding loops that implement tasks unattended. Use when user has multiple small implementation stories with clear acceptance criteria and wants code to ship overnight or in the background. NOT for exploratory work, complex features requiring design decisions, tasks needing human judgment, or when no automated validation is available.
metadata:
  author: Petr
  version: 1.0.0
---

# Ralph Loop Setup

## Overview

Ralph is an autonomous AI coding loop from the CodeBun article "Claude Code + Ralph: How I Built an AI That Ships Production Code While I Sleep". Core concept: bash loop reads tasks from prd.json, implements them, validates, commits if passing, updates progress, repeats.

Memory persists through: git commits (WHAT changed), progress.txt (WHY and patterns learned), prd.json (task status).

## When to Use

**Use Ralph when:**

- Multiple small implementation tasks (each fits in one context window)
- Clear acceptance criteria for each task
- Fast feedback loops available (tests, typecheck, build)
- Repetitive work you want automated overnight

**Don't use Ralph when:**

- Exploratory work (unclear requirements)
- Complex features requiring design decisions
- Tasks needing human judgment or creativity
- No automated validation available

## The 4 Required Files

Ralph requires exact file structure. Missing any file breaks the loop.

### 1. prd.json - Task Definitions

**CRITICAL:** Each story MUST include acceptance criteria. "Story title is clear" is NOT sufficient.

```json
{
  "stories": [
    {
      "title": "Add user login form",
      "priority": 1,
      "passes": false,
      "acceptanceCriteria": [
        "Form has email and password fields",
        "Submit button disabled when fields empty",
        "Shows error message on invalid credentials",
        "Redirects to /dashboard on success",
        "Tests pass: npm test LoginForm.test.tsx"
      ]
    }
  ]
}
```

**Why acceptance criteria matter:** Agent needs objective definition of "done". Without criteria, agent guesses or stops too early. "User can refine later" doesn't work - Ralph runs autonomously and can't ask for clarification.

**Story size rule:** Each story must fit in one context window (~100 lines changed). Break large features into small stories.

### 2. prompt.md - Agent Instructions

**CRITICAL:** Must specify exact validation commands. "Testing approach is obvious" is NOT sufficient. "Generic validation works for now" is NOT acceptable - specify exact commands for this codebase.

```markdown
# Ralph Loop Instructions

You are implementing stories from prd.json autonomously.

## Workflow

1. Read prd.json and find first story where passes: false
2. Implement the story following acceptance criteria
3. Run validation commands (below)
4. If all pass: commit, update prd.json passes: true
5. Update progress.txt with what you learned
6. Move to next story

## Validation Commands

npm run typecheck
npm test
npm run build

All must pass before commit.

## Progress Format

Update progress.txt after each story:

- What you implemented
- Problems encountered and solutions
- Patterns learned (add to Codebase Patterns section)

## Stop Condition

When all stories have passes: true, stop and report summary.
```

**Why specify commands:** Different codebases use different tools. Don't waste context searching or guessing.

### 3. progress.txt - Memory and Learnings

**CRITICAL:** Must include Codebase Patterns section. "Git provides memory" is NOT sufficient.

```markdown
# Ralph Progress Log

## Story 1: Add user login form

Implemented LoginForm component with validation.
Problem: Form state management unclear.
Solution: Used React Hook Form per existing patterns.

## Codebase Patterns

### Form Handling

We use React Hook Form with Zod validation:

- Define schema with z.object()
- useForm with zodResolver
- onSubmit gets validated data

### Component Structure

Components in /components, tests colocated
Each component exports default and named for testing

### API Calls

All API calls through /lib/api.ts wrapper
Returns {data, error} - never throws
```

**Why Codebase Patterns section:** Agents learn approaches that work. Without structure, learning is lost. Document patterns explicitly so agent reuses successful approaches. Initial empty section is OK, but structure MUST exist from start.

### 4. ralph.sh - Loop Script

```bash
#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRD_FILE="$SCRIPT_DIR/prd.json"
PROMPT_FILE="$SCRIPT_DIR/prompt.md"
PROGRESS_FILE="$SCRIPT_DIR/progress.txt"

while true; do
  # Check if all stories pass
  if ! jq -e '.stories[] | select(.passes == false)' "$PRD_FILE" > /dev/null; then
    echo "All stories complete!"
    exit 0
  fi

  # Run Claude with prompt
  claude-code --prompt "$(cat "$PROMPT_FILE")"

  sleep 5
done
```

**Stop condition:** Loop continues until all stories have `passes: true`. Agent must update prd.json after successful implementation.

## Common Mistakes

| Mistake                        | Why It Fails                         | Fix                                         |
| ------------------------------ | ------------------------------------ | ------------------------------------------- |
| "Story title explains it"      | Agent doesn't know what "done" means | Add acceptance criteria                     |
| "Basic progress log"           | Learning lost between iterations     | Add Codebase Patterns section               |
| "Agent will find test command" | Wastes context, may run wrong tests  | Specify exact validation commands           |
| Large monolithic stories       | Exceeds context window               | Break into small stories (one context each) |
| No fast feedback               | Agent can't validate work            | Require tests, typecheck, build             |

## Red Flags - Missing Critical Elements

If you're creating Ralph setup and any of these are true, STOP:

- ✗ prd.json stories lack acceptance criteria
- ✗ progress.txt missing Codebase Patterns section (even if empty initially)
- ✗ prompt.md doesn't specify exact validation commands
- ✗ prompt.md uses generic commands like "run tests" instead of exact commands
- ✗ Stories too large (>100 lines changed)
- ✗ No automated validation available
- ✗ Thinking "user can refine this later"
- ✗ Thinking "testing approach is obvious"
- ✗ Thinking "git provides sufficient memory"

**All of these mean: Fix structure before running Ralph.**

## Self-Check Questions

Before finalizing Ralph setup, verify:

1. **Acceptance criteria:** Can I objectively verify each story is "done"?
2. **Validation commands:** Are these exact commands that work for THIS codebase?
3. **Story size:** Does each story fit in one context window (~100 lines)?
4. **Patterns structure:** Does progress.txt have Codebase Patterns section?
5. **Autonomy:** Can Ralph run without asking me questions?

If any answer is "no" or "maybe", structure is incomplete.

## Example from Real Session

**Project:** iOS simulator testing app (waitlistio)

**prd.json story:**

```json
{
  "title": "Add simulator launch functionality",
  "priority": 1,
  "passes": false,
  "acceptanceCriteria": [
    "Can list available iOS simulators",
    "Can launch specific simulator by ID",
    "Handles errors when simulator not found",
    "Tests pass: npm test simulator.test.ts",
    "TypeScript compiles: npm run typecheck"
  ]
}
```

**prompt.md validation:**

```markdown
## Validation Commands

npm run typecheck
npm test simulator.test.ts
```

**progress.txt patterns:**

```markdown
## Codebase Patterns

### Simulator Management

Use simctl CLI wrapper in /lib/simulator.ts

- List simulators: simctl list devices
- Launch: simctl boot <UDID>
- Check status before launching
```

**Result:** Ralph implemented, validated, committed autonomously. Next story started automatically.

## Rationalization Table

| Excuse                             | Reality                                           |
| ---------------------------------- | ------------------------------------------------- |
| "Story title is clear enough"      | Title describes WHAT, not HOW to verify done      |
| "User can add details later"       | Setup must be complete and ready to run           |
| "User can refine criteria later"   | Ralph runs autonomously, can't ask for refinement |
| "Git provides memory"              | Commits show WHAT, not WHY or patterns            |
| "Progress is just a log"           | Progress needs Patterns section for learning      |
| "Patterns section can be empty"    | OK initially, but MUST exist as structure         |
| "Testing approach is obvious"      | Codebases differ, specify exact commands          |
| "Generic validation works for now" | Wrong commands waste iterations, specify exactly  |
| "Agent can break down stories"     | Large stories exceed context, break them first    |
| "Basic loop is sufficient"         | Loop needs prd reading, validation, commit logic  |

## Real-World Impact

Ralph runs autonomously overnight or while you work on other projects. Requires upfront structure (4 files, acceptance criteria, patterns section) but enables unattended implementation of clear requirements.

Best for: Repetitive implementation work with objective success criteria.
Not for: Exploratory work, design decisions, or tasks requiring human judgment.
