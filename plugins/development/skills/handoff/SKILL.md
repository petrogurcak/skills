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
```

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
```

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

| Scenario | Behavior |
|---|---|
| No plan file found (all 4 priority levels fail) | Fail with: `❌ Plán nenalezen. Použij /development:handoff <path> nebo spusť nejdřív /development:planning` |
| Plan file exists but invalid (not markdown / no H1) | Fail with: `❌ Plán <path> neobsahuje H1 title. Není to validní plan file?` |
| Conversation has no rationale data | Prompt user (Step 2 fallback) |
| `## Handoff Context` already in plan | Conflict check (Step 4) — ask replace/append/skip |
| `.claude/ACTIVE_CONTEXT.md` neexistuje | Skip Step 6 + warning |
| Plan file is on different branch / git unstaged elsewhere | Proceed normally — git add only affects specified files |

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
