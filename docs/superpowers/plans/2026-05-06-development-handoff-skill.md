# Development Handoff Skill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `development:handoff` skill that captures planning rationale (WHY/WHY-NOT) into plan file as `## Handoff Context` section, updates `.claude/ACTIVE_CONTEXT.md`, and offers commit confirmation — bridging planning → execute when user `/clear`s context.

**Architecture:** Markdown skill in `plugins/development/skills/handoff/SKILL.md`. Invoked explicitly via `/development:handoff [plan-path]` or auto-suggested at end of `development:planning` Phase 4. Handoff section lives IN plan file (not separate), so `superpowers:executing-plans` reads it transparently. Additive only — no upstream skill modifications.

**Tech Stack:** Markdown (SKILL.md), bash (smoke test fixtures + symlink sync + cache update). LLM-driven workflow (skill instructions, not deterministic code), so "tests" are smoke test fixtures with expected outputs verified manually.

**Spec reference:** `docs/superpowers/specs/2026-05-06-handoff-skill-design.md`

**Branch:** `feat/development-handoff-skill` (already created)

---

### Task 1: Create skill scaffold + frontmatter

**Files:**

- Create: `plugins/development/skills/handoff/SKILL.md`

- [ ] **Step 1: Create skill directory**

```bash
mkdir -p plugins/development/skills/handoff
```

- [ ] **Step 2: Verify directory exists**

```bash
ls -la plugins/development/skills/handoff/
```

Expected: empty directory listed.

- [ ] **Step 3: Write SKILL.md frontmatter only**

Create `plugins/development/skills/handoff/SKILL.md` with content:

```markdown
---
name: handoff
description: Captures planning rationale (why-this-approach, rejected alternatives, user preferences voiced, adversarial findings, constraints) into plan file as Handoff Context section before /clear, updates .claude/ACTIVE_CONTEXT.md, and offers commit. Use when finishing planning before execute, when user says "handoff", "predej do execute", "zabal pred clear", "priprav na clear", "clear pred execute". Invokable explicitly via /development:handoff [plan-path]. NOT for general session save (use session-context) or for execute itself (use executing-plans).
metadata:
  author: Petr
---

# Handoff Skill

[Workflow content added in Task 2]
```

- [ ] **Step 4: Verify frontmatter parses correctly**

```bash
head -10 plugins/development/skills/handoff/SKILL.md
```

Expected: YAML frontmatter with `name: handoff`, `description: ...` (one line, includes triggers + NOT-for clauses), `metadata.author: Petr`.

- [ ] **Step 5: Commit scaffold**

```bash
git add plugins/development/skills/handoff/SKILL.md
git commit -m "feat(handoff): skill scaffold with frontmatter"
```

---

### Task 2: Create smoke test fixtures

**Files:**

- Create: `/tmp/handoff-test/plan-input.md`
- Create: `/tmp/handoff-test/expected-handoff-output.md`
- Create: `/tmp/handoff-test/active-context-input.md`
- Create: `/tmp/handoff-test/expected-active-context.md`

> Note: fixtures live in `/tmp/` (not in repo). They're throw-away for manual smoke test, not regression.

- [ ] **Step 1: Create fixtures directory**

```bash
mkdir -p /tmp/handoff-test
```

- [ ] **Step 2: Create input plan file (without handoff section)**

Write `/tmp/handoff-test/plan-input.md`:

```markdown
# Auth Feature Implementation Plan

**Goal:** Add JWT authentication with refresh tokens.

## Task 1: Token generation

- [ ] Step 1: Write failing test
- [ ] Step 2: Implement
```

- [ ] **Step 3: Create expected output (plan WITH handoff section appended)**

Write `/tmp/handoff-test/expected-handoff-output.md`:

```markdown
# Auth Feature Implementation Plan

## Handoff Context

> _Read this before executing. Captured during planning session 2026-05-06._

**Why this approach**
JWT s refresh tokeny — stateless, škáluje horizontálně, dobře podporované knihovnami.

**Rejected alternatives**

- **Session-based auth** — vyžaduje sticky sessions / shared Redis, overhead
- **OAuth-only** — overkill pro MVP, nemáme external IdP requirement

**User preferences voiced during planning**

- "Jednoduché tokeny, ne komplikované scope handling" — Petr 2026-05-06

**Adversarial findings to watch during execute**

- Plan-challenger flagoval: refresh token rotation — sledovat race condition při concurrent requests

**Constraints**

- Deadline: MVP do konce týdne
- Scope boundary: Žádný 2FA v této iteraci

---

**Goal:** Add JWT authentication with refresh tokens.

## Task 1: Token generation

- [ ] Step 1: Write failing test
- [ ] Step 2: Implement
```

- [ ] **Step 4: Create input ACTIVE_CONTEXT.md**

Write `/tmp/handoff-test/active-context-input.md`:

```markdown
# Aktualni stav prace

## Posledni session

- **Datum:** 2026-05-06
- **Branch:** feat/auth
- **Dokonceno:** Brainstorm + plan written
- **Rozdelano:** Plan ready, not executed yet
- **Dalsi krok:** Brainstorm finalize

## Otevrene problemy

Žádné.

## Poznamky pro dalsi session

Žádné.
```

- [ ] **Step 5: Create expected ACTIVE_CONTEXT.md (after handoff)**

Write `/tmp/handoff-test/expected-active-context.md`:

```markdown
# Aktualni stav prace

## Posledni session

- **Datum:** 2026-05-06
- **Branch:** feat/auth
- **Dokonceno:** Brainstorm + plan written
- **Rozdelano:** Plán hotový, handoff written, ready k execute
- **Dalsi krok:** execute /tmp/handoff-test/plan-input.md

## Otevrene problemy

Žádné.

## Poznamky pro dalsi session

Žádné.
```

- [ ] **Step 6: Verify fixtures exist**

```bash
ls -la /tmp/handoff-test/
```

Expected: 4 files listed.

> **Note:** No commit — fixtures are in `/tmp/`, not repo.

---

### Task 3: Write SKILL.md core content

**Files:**

- Modify: `plugins/development/skills/handoff/SKILL.md`

- [ ] **Step 1: Write full SKILL.md content**

Replace placeholder body of `plugins/development/skills/handoff/SKILL.md` (keep frontmatter from Task 1) with:

```markdown
---
name: handoff
description: Captures planning rationale (why-this-approach, rejected alternatives, user preferences voiced, adversarial findings, constraints) into plan file as Handoff Context section before /clear, updates .claude/ACTIVE_CONTEXT.md, and offers commit. Use when finishing planning before execute, when user says "handoff", "predej do execute", "zabal pred clear", "priprav na clear", "clear pred execute". Invokable explicitly via /development:handoff [plan-path]. NOT for general session save (use session-context) or for execute itself (use executing-plans).
metadata:
  author: Petr
---

# Handoff Skill

Bridge between planning and execute sessions. Plan file (output of `superpowers:writing-plans`) captures **WHAT/HOW** (tasks, acceptance criteria, files). Handoff captures **WHY/WHY-NOT** (rationale, rejected alternatives, user preferences, adversarial findings, constraints) — context that would otherwise be lost in `/clear` between planning and execute.

## When to use

After planning session is complete and you want clean context before execute. Trigger conditions:

- User invokes explicitly: `/development:handoff [plan-path]`
- User says: "handoff", "predej do execute", "zabal pred clear", "priprav na clear", "clear pred execute"
- `development:planning` skill suggests at end of Phase 4

## When NOT to use

- **General session save** → use `development:session-context`
- **Execute itself** → use `superpowers:executing-plans`
- **Project-wide architectural decision log** → append to `.claude/DECISIONS.md` directly

## Workflow

### Step 1: Detect plan file

Priority order:

1. **Path argument:** if `/development:handoff <path>` → use that path
2. **Conversation scan:** look for recent `Write` tool calls writing to `docs/plans/*.md` or `docs/superpowers/plans/*.md`
3. **Filesystem fallback:** `ls -t docs/superpowers/plans/*.md docs/plans/*.md 2>/dev/null | head -1`
4. **Ambiguous → ask user:** "Více recent plan files. Který? \n(a) X \n(b) Y \n(c) jiný path"

### Step 2: Extract rationale from conversation

Self-prompt for 5 dimensions:

1. **Why this approach** — 2-3 věty rationale. Co řešíme a proč právě takhle? (Find in brainstorm output / planning Phase 1.)
2. **Rejected alternatives** — Co jsme zvažovali a zamítli? Proč? (Find in brainstorm "Propose 2-3 approaches" output.)
3. **User preferences voiced** — Vyslovené preference během planning. (Find user messages with phrases like "ne, radši", "preferuju", "nedělej", "raději".)
4. **Adversarial findings** — Co flagoval `review:plan-challenger`? (Find plan-challenger agent output.)
5. **Constraints** — Deadline, dependencies, scope boundaries (Find in brainstorm "constraints" + user-stated limits.)

**If conversation lacks data for a dimension:** skip that section in template (don't write empty placeholder).

**If conversation lacks ALL dimensions** (e.g., user invoked `/handoff` from fresh session): prompt user:
```

Nemám planning kontext. Doplň ručně:

1. Klíčový důvod tohoto přístupu? (1 věta)
2. Zamítnuté alternativy? (1-2 řádky)
3. Constraints / scope boundaries?

````

### Step 3: Generate handoff section

Use this template. **Skip optional sections** if data is missing — do NOT write "TBD" or empty placeholders.

```markdown
## Handoff Context

> _Read this before executing. Captured during planning session YYYY-MM-DD._

**Why this approach**
[2-3 věty rationale. Co řešíme a proč právě takhle.]

**Rejected alternatives**
- **<approach X>** — proč ne (důvod)
- **<approach Y>** — proč ne (důvod)

**User preferences voiced during planning**
- "<přesná citace nebo parafráze>" — kontext

**Adversarial findings to watch during execute**
- Plan-challenger flagoval: <issue> → mitigation: <postup>

**Constraints**
- Deadline: <kdy>
- Dependency: <na čem to čeká>
- Scope boundary: <co NENÍ součástí>

---
````

### Step 4: Conflict check

Before appending, check if plan file already has `## Handoff Context` section:

```bash
grep -q "^## Handoff Context" <plan-path>
```

If exists, ask user:

```
Plán už obsahuje Handoff Context section. Co dělat?
(a) Replace — přepsat aktuálním obsahem
(b) Append — přidat druhou section pod prvni (s timestampem)
(c) Skip — nechat původní, jen pokračovat se zbytkem workflow
```

Wait for response. **Žádné silent overwrite.**

### Step 5: Write handoff section to plan

Insert section after H1 title (first `^# ` line) and before first H2 (`^## `).

Use `Read` + `Write` tools (not `Edit` — Edit is unreliable for inserting at position):

1. Read full plan file content
2. Split at first H2 occurrence
3. Compose: `<H1 + blank line> + <handoff section> + <rest of file from first H2>`
4. Write back to plan path

### Step 6: Update .claude/ACTIVE_CONTEXT.md

Check existence:

```bash
test -f .claude/ACTIVE_CONTEXT.md
```

**If exists:**

1. Read file
2. Find line starting with `- **Dalsi krok:**` (or English variant `- **Next step:**`) and replace value with `execute <plan-path>`
3. Find line starting with `- **Stav:**` or `- **Rozdelano:**` and update to `Plán hotový, handoff written, ready k execute`
4. Write back

**If not exists:** Skip step 6 silently with warning printed to user: `⚠ .claude/ACTIVE_CONTEXT.md neexistuje, skipuji update.`

### Step 7: Commit confirmation gate

Ask user:

```
Commit handoff change?
- Plan file: <plan-path> (handoff section appended)
- ACTIVE_CONTEXT: updated (or skipped if not exists)

Commit? (y/n)
```

**If y:**

```bash
git add <plan-path> .claude/ACTIVE_CONTEXT.md 2>/dev/null
git commit -m "plan: <plan-title> — handoff before execute"
```

**If n:** Skip commit, print:

```
✓ Skipping commit. Dirty files:
  M <plan-path>
  M .claude/ACTIVE_CONTEXT.md
```

### Step 8: Final output

Print:

```
✅ Handoff hotový.

Plán: <plan-path> (handoff section appended)
ACTIVE_CONTEXT: updated | skipped
Commit: <hash> | skipped

Spusť /clear a v nové session napiš:
> execute plán <plan-path>
```

## Edge cases

| Scenario                                                  | Behavior                                                                                                    |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| No plan file found (all 4 priority levels fail)           | Fail with: `❌ Plán nenalezen. Použij /development:handoff <path> nebo spusť nejdřív /development:planning` |
| Plan file exists but invalid (not markdown / no H1)       | Fail with: `❌ Plán <path> neobsahuje H1 title. Není to validní plan file?`                                 |
| Conversation has no rationale data                        | Prompt user (Step 2 fallback)                                                                               |
| `## Handoff Context` already in plan                      | Conflict check (Step 4) — ask replace/append/skip                                                           |
| `.claude/ACTIVE_CONTEXT.md` neexistuje                    | Skip Step 6 + warning                                                                                       |
| Plan file is on different branch / git unstaged elsewhere | Proceed normally — git add only affects specified files                                                     |

## Example invocation

```
User: /development:handoff docs/plans/auth.md

Skill:
1. Detected plan: docs/plans/auth.md ✓
2. Extracting rationale from conversation...
   Found: 3 alternatives discussed in brainstorm, 2 user preferences, plan-challenger output, 1 deadline constraint
3. Generated handoff section (4/5 dimensions filled, "user preferences" skipped — no explicit citations)
4. No existing handoff section in plan ✓
5. Section written to docs/plans/auth.md ✓
6. ACTIVE_CONTEXT.md updated ✓
7. Commit handoff change? y
   → committed as a3f5b21
8. ✅ Handoff hotový.

   Spusť /clear a v nové session napiš:
   > execute plán docs/plans/auth.md
```

## Integration with other skills

- **`development:planning`** — calls `/development:handoff` at end of Phase 4 with confirmation gate
- **`superpowers:writing-plans`** — no integration needed (handoff runs after this skill writes the plan)
- **`superpowers:executing-plans`** — no integration needed (reads plan file naturally, sees handoff section first via quote-block marker)
- **`development:session-context`** — handoff updates ACTIVE_CONTEXT directly (not via session-context skill, to avoid gate duplication)

````

- [ ] **Step 2: Verify SKILL.md is valid**

```bash
wc -l plugins/development/skills/handoff/SKILL.md
head -5 plugins/development/skills/handoff/SKILL.md
grep -c "^## " plugins/development/skills/handoff/SKILL.md
````

Expected:

- Line count: ~250-300 lines
- Header: YAML frontmatter visible
- H2 count: ~10 sections (When to use, When NOT to use, Workflow, Edge cases, Example invocation, Integration, etc.)

- [ ] **Step 3: Commit SKILL.md content**

```bash
git add plugins/development/skills/handoff/SKILL.md
git commit -m "feat(handoff): full skill content (workflow, template, edge cases)"
```

---

### Task 4: Manual smoke test — handoff section generation

**Files:**

- No code changes. Manual verification only.

- [ ] **Step 1: Set up working directory**

```bash
cd /tmp/handoff-test
cp plan-input.md plan-test.md  # copy to non-fixture name for testing
cp active-context-input.md ACTIVE_CONTEXT-test.md
```

- [ ] **Step 2: Simulate `/development:handoff` invocation in Claude Code**

In a fresh Claude Code session (or new conversation), provide context:

```
Mock conversation context for handoff test:
- Plan path: /tmp/handoff-test/plan-test.md
- Brainstorm rationale: "JWT s refresh tokeny — stateless, škáluje horizontálně"
- Rejected: Session-based (sticky sessions), OAuth-only (overkill pro MVP)
- User preference: "Jednoduché tokeny, ne komplikované scope handling"
- Plan-challenger: "refresh token rotation race condition"
- Constraint: MVP do konce týdne, scope: žádný 2FA

Invoke: /development:handoff /tmp/handoff-test/plan-test.md
```

- [ ] **Step 3: Verify handoff section was written**

```bash
diff /tmp/handoff-test/plan-test.md /tmp/handoff-test/expected-handoff-output.md
```

Expected: minimal diff (whitespace OK, but section structure + content should match).

**Acceptance:** Handoff section appears between H1 and first H2, contains all 5 dimensions, uses correct template structure.

- [ ] **Step 4: If diff fails, fix SKILL.md instructions**

Common issues:

- Missing `> _Read this before executing._` quote block → tighten Step 3 template instruction
- Section inserted in wrong position → tighten Step 5 instruction
- Empty sections written instead of skipped → tighten "Skip optional sections" rule

Fix in `plugins/development/skills/handoff/SKILL.md`, re-test.

- [ ] **Step 5: Verify ACTIVE_CONTEXT update**

```bash
diff /tmp/handoff-test/ACTIVE_CONTEXT-test.md /tmp/handoff-test/expected-active-context.md
```

Expected: lines for "Dokonceno", "Rozdelano", "Dalsi krok" should match expected.

- [ ] **Step 6: Verify commit confirmation gate**

The skill should have asked "Commit handoff change? (y/n)" — confirm this happened in the simulation.

- [ ] **Step 7: Commit any SKILL.md fixes**

```bash
git status
# If SKILL.md was modified during smoke test:
git add plugins/development/skills/handoff/SKILL.md
git commit -m "fix(handoff): tighten SKILL.md based on smoke test"
```

---

### Task 5: Modify development:planning skill — add Phase 4 handoff prompt

**Files:**

- Modify: `plugins/development/skills/planning/SKILL.md` (Phase 4 section, around line 213)

- [ ] **Step 1: Read current Phase 4 content**

```bash
sed -n '213,247p' plugins/development/skills/planning/SKILL.md
```

Expected: Phase 4 starts with "## Phase 4: Execution Handoff" and presents 3 strategy options + workspace setup.

- [ ] **Step 2: Add handoff prompt at start of Phase 4**

Edit `plugins/development/skills/planning/SKILL.md`:

Find:

```markdown
## Phase 4: Execution Handoff

After plan is reviewed and confirmed:

**"Plan zrevidovan a pripraven. Jak chces implementovat?"**
```

Replace with:

```markdown
## Phase 4: Execution Handoff

After plan is reviewed and confirmed:

### Step 1: Capture rationale (handoff)

**Before asking about execution strategy**, offer to write handoff section to plan file:

**"Plán je zrevidovaný. Chceš teď zachytit rationale (why-this-approach, rejected alternatives, constraints) jako Handoff Context section v plan filu? Useful pokud budeš /clear před execute. (Y/n)"**

- **Y:** Invoke `development:handoff` skill with plan path. Skill writes section + updates ACTIVE_CONTEXT + offers commit.
- **n:** Skip handoff (e.g., user is executing immediately in same session, no /clear needed).

### Step 2: Choose execution strategy

**"Plán zrevidovan a pripraven. Jak chces implementovat?"**
```

- [ ] **Step 3: Verify edit applied correctly**

```bash
sed -n '213,225p' plugins/development/skills/planning/SKILL.md
```

Expected: "Step 1: Capture rationale (handoff)" appears before "Step 2: Choose execution strategy".

- [ ] **Step 4: Commit planning skill modification**

```bash
git add plugins/development/skills/planning/SKILL.md
git commit -m "feat(planning): integrate handoff prompt at start of Phase 4"
```

---

### Task 6: Manual smoke test — planning → handoff integration

**Files:**

- No code changes. Manual verification only.

- [ ] **Step 1: Verify trigger phrasing**

In a Claude Code session, simulate planning workflow ending. Verify Phase 4 now starts with handoff prompt:

```
Expected output from planning skill:
"Plán je zrevidovaný. Chceš teď zachytit rationale ... jako Handoff Context section ... (Y/n)"
```

- [ ] **Step 2: Verify Y branch invokes handoff**

When user answers Y, planning skill should call `/development:handoff` with the plan path. Verify by checking:

- Handoff skill is invoked (uses Skill tool with `development:handoff`)
- Plan path is passed correctly

- [ ] **Step 3: Verify n branch skips to Step 2**

When user answers n, planning skill should skip handoff and proceed to "Step 2: Choose execution strategy" with the original 3-option table.

- [ ] **Step 4: If issues found, fix planning skill**

Common issues:

- Skill auto-invokes handoff without confirmation → tighten the "(Y/n)" gate
- Wrong plan path passed → reference `<plan-path>` from earlier Phase 2 context

- [ ] **Step 5: Commit fixes if any**

```bash
git status
# If planning SKILL.md was modified:
git add plugins/development/skills/planning/SKILL.md
git commit -m "fix(planning): tighten handoff integration based on smoke test"
```

---

### Task 7: Sync symlinks for Gemini CLI + Cowork

**Files:**

- No source changes. Runs sync script.

- [ ] **Step 1: Run sync-skills-symlinks.sh**

Per project CLAUDE.md, this is **mandatory** after creating new skill:

```bash
~/.claude/scripts/sync-skills-symlinks.sh
```

Expected output: success message, possibly mentions `handoff` skill being symlinked.

- [ ] **Step 2: Verify symlinks created**

```bash
ls -la ~/.gemini/skills/development/ 2>/dev/null | grep handoff
ls -la "$HOME/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/"*/skills/development/ 2>/dev/null | grep handoff
```

Expected: `handoff` directory or symlink visible in both locations (or at least Gemini location — Cowork path may have UUID variance per project CLAUDE.md note).

- [ ] **Step 3: No commit needed**

Symlinks live outside repo. No git change.

---

### Task 8: Update Claude Code plugin cache

**Files:**

- No source changes. Copies to cache.

- [ ] **Step 1: Pull latest in claude-code marketplace cache**

```bash
cd ~/.claude/plugins/marketplaces/skills && git pull
```

> Note: This pulls from GitHub. Requires Task 9 commit + push to be done first if testing locally. For TDD-style verification before push, skip this step and use Step 2 as alternative.

- [ ] **Step 2: Manual cache copy (alternative if not pushed yet)**

```bash
cp -r ~/Projects/skills/plugins/development/skills/handoff/ \
      ~/.claude/plugins/cache/skills/development/1.0.0/skills/handoff/
```

- [ ] **Step 3: Verify cache has handoff skill**

```bash
ls ~/.claude/plugins/cache/skills/development/1.0.0/skills/handoff/SKILL.md
```

Expected: file exists.

- [ ] **Step 4: No commit needed**

Cache lives outside repo.

---

### Task 9: Push branch + final commit

**Files:**

- No new files. Pushes existing commits.

- [ ] **Step 1: Verify all commits in branch**

```bash
git log --oneline main..HEAD
```

Expected: 4-6 commits (scaffold, content, smoke fixes, planning integration).

- [ ] **Step 2: Verify clean working tree**

```bash
git status
```

Expected: `nothing to commit, working tree clean`.

- [ ] **Step 3: Push branch to origin**

```bash
git push -u origin feat/development-handoff-skill
```

Expected: branch pushed, GitHub URL printed.

- [ ] **Step 4: Restart Claude Code or reload plugins**

User action: restart Claude Code session OR run `/plugins` and verify `development:handoff` appears in skill list.

- [ ] **Step 5: End-to-end verification**

In a fresh Claude Code session:

```
1. Invoke `/development:handoff` (without arg) — should attempt detection or ask for path.
2. Provide path to a real plan file. Verify handoff section is written correctly.
3. Verify ACTIVE_CONTEXT updated.
4. Verify commit gate works.
```

Expected: full workflow completes without errors.

---

## Self-Review Checklist (run before invoking executing-plans)

- [ ] All 9 tasks have explicit file paths (Create / Modify)
- [ ] All Steps have either code blocks or exact commands
- [ ] No "TBD", "TODO", "implement later", "similar to Task N" placeholders
- [ ] Type/method names consistent across tasks (`Handoff Context` H2, `## Handoff Context` literal, `/development:handoff` invocation pattern)
- [ ] Spec coverage: 9 acceptance criteria from spec all map to tasks (verified via spec ↔ plan walkthrough)
- [ ] Skill location matches spec (`plugins/development/skills/handoff/SKILL.md`)
- [ ] Symlink sync step included (Task 7) per project CLAUDE.md mandatory step
- [ ] Cache update step included (Task 8) per project CLAUDE.md workflow

---

## Notes for executor

1. **Skill content is markdown, not code.** "TDD" here means: define expected handoff output as fixture (Task 2) → write SKILL.md (Task 3) → verify by manual smoke test (Task 4). No automated unit tests possible for LLM-driven skill.

2. **Branch already exists** (`feat/development-handoff-skill`). Don't create new one.

3. **Commit cadence:** 1 commit per Task that produces git changes. Tasks 4, 6 may produce 0 or 1 commits depending on smoke test findings. Tasks 7, 8 don't commit (symlinks/cache outside repo).

4. **Cowork path note:** Per project CLAUDE.md, Cowork skills path includes UUID that may shift. If sync script fails for Cowork side, that's known. Gemini side is mandatory.

5. **No upstream skill modifications.** Only modify `development:planning` (Task 5). Do NOT touch `superpowers:writing-plans` or `superpowers:executing-plans`.
