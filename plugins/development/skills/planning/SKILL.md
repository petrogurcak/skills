---
name: planning
description: Explores requirements, brainstorms approaches, writes a detailed TDD implementation plan, and reviews it with adversarial agents before handing off to execution. Use when user says "plan", "naplanuj", "plan na X", or wants to plan a new feature or change before coding. NOT for bug fixes (use debugging), trivial changes under 3 steps, or when a plan file already exists.
metadata:
  author: Petr
  version: 1.0.0
---

# Planning

Explore, brainstorm, and write implementation plan in one flow. Saves plan to project, then offers execution strategy.

**Announce:** "Použivam planning skill - nejdriv prozkoumam a proberu moznosti, pak napiseme plan."

## When to Use

- "plán na X" / "naplánuj X" / "plan X"
- "chci přidat feature X"
- "potřebuju implementovat Y"
- Any new feature/change that needs planning before coding

## When NOT to Use

- Bug fix → `development:debugging`
- Already have a plan file → go straight to execution
- Trivial change (< 3 steps, obvious implementation)

---

## Phase 1: Explore & Understand

**Goal:** Understand what we're building and what exists.

1. **Check project context:**
   - Read CLAUDE.md, ACTIVE_CONTEXT.md
   - Look at relevant code, recent commits
   - Identify tech stack, patterns, conventions

2. **Ask questions one at a time:**
   - Purpose: What problem does this solve?
   - Scope: What's in/out?
   - Constraints: Performance, compatibility, dependencies?
   - Prefer multiple choice when possible
   - **One question per message** - don't overwhelm

3. **Explore approaches (2-3 options):**
   - Present each with trade-offs
   - Lead with recommended option + reasoning
   - Let user pick or combine

4. **Present design in sections (200-300 words each):**
   - Architecture, components, data flow
   - Check after each section: "Tohle sedí?"
   - Iterate until user confirms

**Exit Phase 1 when:** User confirms the approach and design.

---

## Phase 2: Write Plan

**Goal:** Detailed implementation plan that any skilled dev can follow.

### Plan Format

Save to: `docs/plans/YYYY-MM-DD-<feature-name>.md`

````markdown
---
status: pending
created: [YYYY-MM-DD]
tasks_total: [count]
tasks_done: 0
---

# [Feature Name] Implementation Plan

**Goal:** [One sentence]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [Key technologies]
**Created:** [YYYY-MM-DD]

> **Post-execution:** After all tasks are complete, run:
>
> `/development:finish` - orchestrates verify → demo → merge → wrapup
>
> Or individually: `/development:verify` → `/development:demo` → `/development:merge` → `/development:wrapup`

---

### Task N: [Component Name]

**Files:**

- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

**Step 0: Create skeleton modules** (only if new files)
Create empty files with minimal exports so imports don't fail during testing:

```
[Empty class/function stubs with correct signatures, raise NotImplementedError]
```

**Step 1: Write the failing test**
[Complete test code — imports should resolve thanks to skeletons]

**Step 2: Run test to verify it fails**
Run: `[exact command]`
Expected: FAIL with "[message]" (not ImportError/ModuleNotFoundError)

**Step 3: Write minimal implementation**
[Complete implementation code]

**Step 4: Run test to verify it passes**
Run: `[exact command]`
Expected: PASS

**Step 5: Commit**

```bash
git add [files]
git commit -m "feat: [message]"
```
````

---

````

### Plan Rules

- **Bite-sized tasks** - each step = 2-5 minutes, one action
- **Exact file paths** - always full paths
- **Complete code** - not "add validation" but the actual code
- **Exact commands** - with expected output
- **TDD always** - RED → GREEN → REFACTOR → COMMIT
- **DRY, YAGNI** - only what's needed, no over-engineering

---

## Phase 3: Review Plan

**Goal:** Catch gaps, missing edge cases, and wrong assumptions before coding.

After saving the plan:

1. **Add YAML frontmatter** to the plan file if not already present:
   ```yaml
   ---
   status: pending
   created: YYYY-MM-DD
   tasks_total: [count]
   tasks_done: 0
   ---
````

2. **Run plan-challenger agent** (adversarial review):

   ```
   Use plan-challenger agent to review [plan file path]
   ```

   - Presents structured findings (CRITICAL / WARNING / INFO)
   - CRITICAL findings must be addressed before proceeding
   - **After addressing findings, update the plan file**

3. **Ask user:** "Plan-challenger hotovy. Chces pustit i deep review? (Doporuceno — challenger hleda strategicke diry, deep-review technicke problemy.)"
   - **If yes** → continue to step 4
   - **If no** → skip to step 7

4. **Announce:** "Pouštím deep review."
5. **Run `review:deep-review`** on the plan file
   - Architecture consistency
   - Missing error handling / edge cases
   - Security concerns
   - Task ordering and dependencies
   - Missing tests or test scenarios
6. **Present review findings** to user, incorporate feedback, update plan

7. **User confirms:** "Plan je OK, jdeme implementovat"
8. **Update plan status** to `in_progress` when user confirms

**Exit Phase 3 when:** Plan-challenger done + optional deep-review done + user confirms.

---

## Phase 4: Execution Handoff

After plan is reviewed and confirmed:

**"Plan zrevidovan a pripraven. Jak chces implementovat?"**

| #     | Strategy                           | When to use                                                                     | Skill                                     |
| ----- | ---------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------- |
| **1** | **Subagent-driven** (this session) | Default. Sequential tasks, fast iteration, same session.                        | `superpowers:subagent-driven-development` |
| **2** | **New session** (executing-plans)  | Want human checkpoints between batches, or running in parallel with other work. | `superpowers:executing-plans`             |
| **3** | **Team agents** (parallel)         | 3+ independent modules touching different files. Max speed.                     | `development:agent-team-development`      |

### Decision helper:

```

Tasks sequential / touch same files? → Option 1 (subagent)
Want batch checkpoints / parallel work? → Option 2 (new session)
3+ independent modules, different files? → Option 3 (team)

```

**Then ask workspace setup:**

| #     | Workspace      | When                                               |
| ----- | -------------- | -------------------------------------------------- |
| **a** | New branch     | Default. Feature work, will PR later.              |
| **b** | Git worktree   | Large feature, want isolation from main workspace. |
| **c** | Current branch | Quick changes, already on feature branch.          |

If **branch:** Create `feature/<name>` and switch to it.
If **worktree:** Use `superpowers:using-git-worktrees` to create.
If **current:** Confirm current branch is not main/master.

---

## Phase 5: Verification

**Trigger:** Automatically after ALL plan tasks are complete. Do not wait for user to ask.

**Goal:** Prove everything works with evidence, not claims.

1. **Announce:** "Vsechny tasky z planu hotove. Spoustim verifikaci."
2. **Run full verification** (use `superpowers:verification-before-completion`):
   - Run test suite → show output + pass/fail count
   - Run build → show exit code
   - Run linter/type check → show output
   - Check plan checklist → verify each task was implemented
3. **Present results:**

```

Verifikace:

- Testy: 34/34 PASS ✓
- Build: exit 0 ✓
- TypeScript: 0 errors ✓
- Plan tasks: 5/5 complete ✓

Vsechno OK. Chces otestovat sam, nebo rovnou dokoncime branch?

```

4. **If failures:** Fix issues, re-run verification. Do NOT proceed to Phase 6.
5. **User tests manually** (optional) → dílčí opravy → re-verify if needed

**Exit Phase 5 when:** All checks pass AND user confirms.

---

## Phase 6: Merge & Cleanup

**Trigger:** After verification passes and user confirms.

1. **Commit** (user says "commit" or "commitni")
2. **Merge to development:**
   ```bash
   git checkout development
   git merge <feature-branch>
   ```

````

3. **Verify on development** - run tests + build again on merged result
4. **Cleanup:**
   - Delete feature branch: `git branch -d <feature-branch>`
   - Remove worktree if used: `git worktree remove <path>`
5. **If merge conflicts or test failures:** Fix, re-verify, then continue

---

## Phase 7: Wrap-up & Reflect

**Trigger:** Automatically after successful merge to development. Do not wait for user to ask.

**Announce:** "Merge hotovy, vse funguje. Pojdme zavrit session."

Proactively go through this checklist:

### 1. Save Context

Update `.claude/ACTIVE_CONTEXT.md` with:

- What was completed
- Current branch state
- Any follow-up work identified

### 2. Mistakes Check

Review the session:

- Did anything fail unexpectedly?
- Did we retry/revert something?
- Were any assumptions wrong?

If yes → propose entry for `.claude/mistakes.md`

### 3. Lessons Learned

- Was a non-trivial problem solved?
- Useful workaround discovered?
- Debugging technique worth remembering?

If yes → propose `/learn` entry or note in `mistakes.md`

### 4. Documentation Check

Ask: **"Meni tato zmena neco, co by melo byt v dokumentaci?"**

Check if the change affects:

- Project CLAUDE.md (new conventions, patterns)
- User-facing guides (e.g., editor guide, API docs)
- README or setup instructions
- Configuration docs

If yes → propose specific documentation update

### Present as summary:

```
Session wrap-up:
- Kontext: Ulozeno ✓
- Mistakes: [zadne / navrzeny zapis]
- Lessons: [zadne / navrzeny zapis]
- Dokumentace: [zadna zmena / navrh updatu XY]

Neco dalsiho, nebo koncime?
```

---

## Phase Summary

```
Phase 1: Explore & Understand
  └─ Check context → Ask questions → Explore approaches → Present design
Phase 2: Write Plan
  └─ TDD tasks with bite-sized steps → Save to docs/plans/
Phase 3: Review Plan
  └─ Deep review → Present findings → Incorporate feedback → User confirms
Phase 4: Execution Handoff
  └─ Choose strategy (subagent/session/team) → Choose workspace (branch/worktree/current)
  └─ Hand off to execution skill
Phase 5: Verification
  └─ Tests + Build + Lint + Plan checklist + Browser smoke → Fix if needed
Phase 5b: Demo (optional)
  └─ Showboat executable demo doc + Rodney screenshots + Accessibility
Phase 6: Merge & Cleanup
  └─ Commit → Merge to development → Verify → Delete branch/worktree
Phase 7: Wrap-up & Reflect
  └─ Save context → Mistakes check → Lessons learned → Documentation check
```

## Integration

| Skill                                        | Role                              |
| -------------------------------------------- | --------------------------------- |
| `review:deep-review`                         | Phase 3 plan review               |
| `superpowers:subagent-driven-development`    | Execution option 1                |
| `superpowers:executing-plans`                | Execution option 2                |
| `development:agent-team-development`         | Execution option 3                |
| `superpowers:using-git-worktrees`            | Workspace option b                |
| `superpowers:verification-before-completion` | Phase 5 verification              |
| `development:demo`                           | Phase 5b demo (showboat + rodney) |
| `superpowers:test-driven-development`        | Used during execution             |
| `development:session-context`                | Phase 7 context save              |
````
