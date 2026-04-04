---
name: openspec-workflow
description: Use when implementing complex features requiring clear specifications before coding - creates spec-driven workflow with proposals, task breakdown, and delta documentation; works standalone or with OpenSpec CLI for enhanced features
---

# OpenSpec: Spec-Driven Development Workflow

## Overview

This skill implements spec-driven development that creates structured alignment between humans and AI before implementation begins. It separates source-of-truth specifications from proposed changes, maintaining explicit and auditable scope throughout development.

**Core principle:** Align on specifications BEFORE writing any implementation code.

**Announce:** "I'm using the OpenSpec workflow to establish clear specifications before implementation."

## How This Skill Works

**This skill works in TWO modes:**

### Mode 1: Standalone (Always Works)
- ✅ Works IMMEDIATELY after skill installation
- ✅ No external dependencies required
- ✅ Creates directory structure and files directly
- ✅ Full workflow supported

### Mode 2: Enhanced with OpenSpec CLI (Optional Bonus)
- 🎁 Adds validation: `openspec validate <change>`
- 🎁 Adds dashboard: `openspec view`
- 🎁 Adds automated archiving: `openspec archive <change>`
- 🎁 Adds AGENTS.md integration

**You choose:** Install OpenSpec CLI for bonus features, or skip it and use standalone mode.

## When to Use

**Always use OpenSpec for:**
- Complex features requiring multiple implementation steps
- Features affecting multiple components or modules
- Work requiring stakeholder alignment before coding
- Team collaboration scenarios where spec clarity is critical
- Any feature where scope needs explicit boundaries
- Refactoring that changes external behavior
- Features that will evolve through feedback cycles

**Skip OpenSpec for:**
- Trivial bug fixes (single-line changes)
- Internal refactoring with zero behavior change
- Configuration file updates
- Throwaway prototypes (but use it if prototype becomes real)

**Red flags that mean you SHOULD use OpenSpec:**
- "This might grow complex"
- "Multiple approaches possible"
- "Need to coordinate with team"
- "Unclear requirements"
- "Multi-step implementation"

## Installation

### Required: Install This Skill
```bash
# Already done if you're reading this!
# Skill is installed at: ~/.claude/skills/openspec-workflow/
```

### Optional: Install OpenSpec CLI (Bonus Features)

**Only install if you want validation, dashboard, and automated archiving:**

```bash
# Check if you want the CLI
openspec --version

# If not installed and you want bonus features:
npm install -g @fission-ai/openspec@latest

# Verify
openspec --version
```

**Note:** You DON'T need to run `openspec init` in projects. This skill creates the structure for you.

## Directory Structure

This skill creates and manages:

```
openspec/
├── specs/                    # Source of truth specifications
│   └── [feature-area]/
│       └── spec.md
└── changes/                  # Proposed changes (active work)
    └── [change-name]/
        ├── proposal.md       # Why and what changes
        ├── tasks.md          # Implementation checklist
        ├── design.md         # Technical decisions (optional)
        └── specs/
            └── [feature-area]/
                └── spec.md   # Specification delta
```

## The Five-Stage Workflow

### Stage 1: Draft Change Proposal

**What I do:**
1. Check if `openspec/` exists, create if needed
2. Create `openspec/changes/[change-name]/` directory
3. Create `proposal.md` with:
   - Problem statement
   - Proposed solution
   - Scope (included/excluded)
   - Success criteria

**Commands I run:**
```bash
mkdir -p openspec/specs
mkdir -p openspec/changes/[change-name]/specs
```

Then write `openspec/changes/[change-name]/proposal.md`:
```markdown
# [Feature Name]

## Problem
[What issue does this solve?]

## Proposed Solution
[High-level approach]

## Scope

### Included
- [Item 1]
- [Item 2]

### Explicitly Excluded
- [Item 1]
- [Item 2]

## Success Criteria
1. [Criterion 1]
2. [Criterion 2]
```

**Key principle:** Proposal explains WHY. Specs explain WHAT. Tasks explain HOW.

### Stage 2: Review & Align

**What happens:**
1. I present proposal to you (human partner)
2. You provide feedback
3. I refine specifications based on feedback
4. Iterate until alignment achieved
5. You give explicit approval to proceed

**What I create:**
- `openspec/changes/[change-name]/specs/[feature-area]/spec.md` with delta format

**Before moving to Stage 3:**
- [ ] You understand the problem
- [ ] Proposed approach is agreed upon
- [ ] Scope is explicitly defined
- [ ] Success criteria are clear
- [ ] Specifications are documented

**Red flag:** Starting implementation without explicit approval means skipping alignment.

### Stage 3: Implement Tasks

**What I create:**
- `openspec/changes/[change-name]/tasks.md` with structured task list

**Task breakdown structure:**
```markdown
# Implementation Tasks

## Task 1: [Description]
**Status:** pending | in_progress | completed
**References:** specs/[feature-area]/spec.md - Requirement: [Name]

### Subtasks
- [ ] Subtask 1
- [ ] Subtask 2
```

**Integration with Superpowers Skills:**

For each task, I follow:
1. Mark task as in_progress
2. **Write failing test** (TDD skill - mandatory)
3. Watch test fail (verify RED)
4. Implement minimal code to pass (GREEN)
5. Watch test pass (verify GREEN)
6. Refactor if needed
7. Mark task as completed
8. Request code review if major feature (code review skill)

**IMPORTANT:** OpenSpec defines WHAT to build. TDD ensures HOW you build it is correct.

### Stage 4: Archive Change

**Standalone mode:**
```bash
# I manually move:
mv openspec/changes/[change-name] openspec/changes/archive/[change-name]
```

**With OpenSpec CLI (bonus):**
```bash
# I run automated archiving:
openspec archive [change-name]
# This auto-merges specs and moves to archive
```

**Before archiving:**
- [ ] All tasks completed
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Success criteria met
- [ ] Ready to update source specs

### Stage 5: Update Source Specs

**What I do:**
1. Read spec delta from `openspec/changes/archive/[change-name]/specs/`
2. Merge changes into `openspec/specs/[feature-area]/spec.md`
3. Ensure source specs reflect current system behavior

**This step ensures:** Living documentation that evolves with the codebase.

## Specification Delta Format

All spec changes must use this format:

```markdown
## ADDED Requirements

### Requirement: [Name]

The system SHALL [mandatory behavior using SHALL/MUST].

#### Scenario: [Name]

**Given:** [Initial state]
**When:** [Action]
**Then:** [Expected outcome]

## MODIFIED Requirements

### Requirement: [Name]

[Complete UPDATED requirement text - not just the diff]

#### Scenario: [Name]

**Given:** [Initial state]
**When:** [Action]
**Then:** [Expected outcome]

## REMOVED Requirements

### Requirement: [Name]

[Brief explanation of why removed]
```

### Delta Format Rules

**Mandatory:**
- Use `### Requirement: <name>` headers
- Include at least one `#### Scenario:` block per requirement
- Use SHALL/MUST in requirement text for mandatory behavior
- Use SHOULD/MAY for optional behavior

**For MODIFIED requirements:**
- Include the COMPLETE updated text, not just changes
- Don't show diffs - show the final desired state
- Explain what changed in a comment if helpful

## OpenSpec CLI Commands (Optional Bonus)

If OpenSpec CLI is installed, I can use these commands:

### Validation
```bash
# Before I use:
test -f "$(which openspec)" && openspec validate [change-name]

# Checks:
# - All requirements have names
# - All requirements have scenarios
# - Scenarios have Given/When/Then
# - Delta sections present
```

### Dashboard
```bash
# Interactive view:
openspec view

# List changes:
openspec list
```

### Show Details
```bash
# Display change details:
openspec show [change-name]
```

### Archive (Automated)
```bash
# Automated archiving with spec merge:
openspec archive [change-name]
```

## CLI Detection Logic

**How I check for CLI:**
```bash
# Check if openspec command exists
if command -v openspec &> /dev/null; then
    # CLI available - use bonus features
    openspec validate [change-name]
else
    # CLI not available - standalone mode
    # Create structure manually
fi
```

**You'll see me say:**
- "OpenSpec CLI detected - using enhanced features"
- OR "OpenSpec CLI not found - using standalone mode"

## Integration with Superpowers Skills

OpenSpec works alongside existing superpowers skills:

### Brainstorming Skill

**When to use together:**
- OpenSpec Stage 1 (Draft Proposal) - brainstorm approaches
- OpenSpec Stage 2 (Review & Align) - refine through questioning

**Pattern:**
```
1. User requests feature
2. Use brainstorming skill to explore approaches
3. Use OpenSpec to document chosen approach in proposal
4. Get alignment from stakeholders
5. Proceed to implementation
```

### Test-Driven Development (TDD)

**Mandatory integration:** OpenSpec defines WHAT. TDD ensures correctness.

**Pattern for Stage 3 (Implementation):**
```
For each task in openspec/changes/[name]/tasks.md:
  1. Reference the spec requirement
  2. Write failing test based on spec scenario
  3. Watch test fail (verify RED)
  4. Write minimal code to pass (GREEN)
  5. Refactor while staying green
  6. Mark task complete
```

### Code Review Skill

**Use after:** Completing logical chunks within Stage 3 (Implementation)

**Pattern:**
```
1. Complete 2-3 related tasks from tasks.md
2. Ensure all tests pass
3. Use code review skill to validate against spec
4. Address feedback
5. Continue with next tasks
```

### Systematic Debugging

**Use when:** Encountering bugs during Stage 3 (Implementation)

**Pattern:**
```
1. Bug found during implementation
2. Use systematic debugging to identify root cause
3. Write test reproducing bug (TDD)
4. Fix bug following TDD cycle
5. Update tasks.md if bug reveals missing task
```

## When NOT to Use OpenSpec

**Don't use OpenSpec for:**
- Single-line bug fixes
- Typo corrections
- Trivial refactoring (rename variable)
- Configuration changes with zero logic
- Emergency hotfixes (but document after)

**Rule of thumb:** If it takes longer to write the spec than implement, skip OpenSpec.

## Common Rationalizations (STOP)

| Excuse | Reality |
|--------|---------|
| "Specs will slow me down" | Specs catch misalignment before wasting implementation time |
| "Requirements are clear in my head" | Head knowledge isn't shared, reviewable, or persistent |
| "I'll document after implementation" | After = biased by what you built, not what's needed |
| "This is too simple for specs" | Simple features have requirements too. Spec takes 5 minutes. |
| "We can iterate after building" | Building wrong thing is slower than aligning first |
| "The code is self-documenting" | Code shows HOW, not WHY or WHAT was intended |

## Red Flags - Use OpenSpec NOW

- "I think I know what they want"
- "I'll build it and get feedback"
- "Requirements are in Slack/email somewhere"
- "This could go several ways"
- "Need to coordinate with team"
- "Might need to change approach mid-way"

**All of these mean:** Stop. Use OpenSpec. Get alignment.

## Example: Full Workflow (Standalone Mode)

**User Request:** "Add user authentication to the app"

### Stage 1: Draft Proposal

I run:
```bash
mkdir -p openspec/specs
mkdir -p openspec/changes/user-authentication/specs/auth
```

I create `openspec/changes/user-authentication/proposal.md`:
```markdown
# User Authentication

## Problem
Users can currently access all features without authentication, creating
security risks and preventing personalization.

## Proposed Solution
Implement JWT-based authentication with email/password login, registration,
and session management.

## Scope
**Included:**
- User registration with email/password
- Login with JWT token generation
- Protected route middleware
- Logout functionality

**Excluded:**
- Social login (OAuth)
- Password reset (separate change)
- Multi-factor authentication

## Success Criteria
- Users can register with email/password
- Users can login and receive JWT token
- Protected routes reject unauthenticated requests
- Users can logout and invalidate token
```

### Stage 2: Review & Align

I ask: "Please review this proposal. Should I proceed with this approach?"

After your approval, I create `openspec/changes/user-authentication/specs/auth/spec.md`:
```markdown
## ADDED Requirements

### Requirement: User Registration

The system SHALL allow new users to register with email and password.

#### Scenario: Successful Registration

**Given:** User provides valid email and password
**When:** User submits registration form
**Then:** System creates user account and returns success

### Requirement: User Login

The system SHALL authenticate users and issue JWT tokens.

#### Scenario: Valid Credentials

**Given:** User has registered account
**When:** User provides correct email and password
**Then:** System returns JWT token valid for 24 hours
```

### Stage 3: Implement Tasks

I create `openspec/changes/user-authentication/tasks.md` and implement each task with TDD.

### Stage 4: Archive

**Standalone mode:**
```bash
mkdir -p openspec/changes/archive
mv openspec/changes/user-authentication openspec/changes/archive/
```

### Stage 5: Update Source Specs

I merge the delta into `openspec/specs/auth/spec.md`.

## Verification Checklist

Before marking OpenSpec work complete:

### Stage 1 Complete
- [ ] Proposal created with problem, solution, scope, success criteria
- [ ] Change folder structure exists

### Stage 2 Complete
- [ ] Stakeholders reviewed proposal
- [ ] Feedback incorporated
- [ ] Explicit approval received
- [ ] Spec delta created with all requirements
- [ ] Each requirement has scenario(s)

### Stage 3 Complete
- [ ] All tasks documented in tasks.md
- [ ] Each task references spec requirement
- [ ] All tasks implemented using TDD
- [ ] All tests passing
- [ ] Code reviewed

### Stage 4 Complete
- [ ] Change archived (manually or via CLI)

### Stage 5 Complete
- [ ] Spec delta merged into source specs
- [ ] Source specs reflect current system state

## Final Rules

```
Complex feature → Use OpenSpec first, then implement with TDD
Clear specs → Better implementation
Alignment first → Less rework
```

**No exceptions without your human partner's explicit permission.**

## Troubleshooting

**"I don't have OpenSpec CLI"**
- That's fine! This skill works standalone. You won't get validation/dashboard, but full workflow works.

**"Should I install OpenSpec CLI?"**
- If you want automated validation and archiving: Yes
- If you're happy with manual workflow: No, optional

**"Skill created structure but validation failed"**
- OpenSpec CLI may be installed but not initialized
- Ignore CLI validation, or install CLI properly
- Standalone mode always works

---

**This skill works immediately. OpenSpec CLI is a bonus, not a requirement.**
