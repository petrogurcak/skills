---
status: complete
created: 2026-02-14
tasks_total: 10
tasks_done: 10
---

# Claude-Pilot Inspired Workflow Enforcement

**Goal:** Přidat 8 vylepšení inspirovaných claude-pilot repem — hooks pro enforcement, agenty pro kvalitní review, plan lifecycle management.
**Architecture:** 4 nové hook scripty + 3 nové agenty + rozšíření 2 existujících hooks + update settings.json + update 3 skills
**Tech Stack:** Bash hooks, Claude Code agents (markdown), YAML frontmatter v plan souborech
**Created:** 2026-02-14
**Source:** Analýza https://github.com/maxritter/claude-pilot
**Reviewed:** Deep review provedeno, 4 CRITICAL + 7 WARNING opraveno v revizi

> **Post-execution:** After all tasks are complete, run:
>
> `/development:finish` - orchestrates verify → demo → merge → wrapup
>
> Or individually: `/development:verify` → `/development:demo` → `/development:merge` → `/development:wrapup`

> **Rollback:** Pokud hook způsobí problémy, edituj `~/.claude/settings.json` a odeber problematický matcher. Hooks žijí v `~/.claude/hooks/`, agenti v `~/.claude/agents/`.

---

## Přehled

| #   | Komponenta                | Typ                  | Soubory                                               |
| --- | ------------------------- | -------------------- | ----------------------------------------------------- |
| 1   | Plan Status Lifecycle     | Format + hook update | plan-utils.sh, drift-detection.sh                     |
| 2   | Stop Guard                | Hook rozšíření       | stop-verify.sh                                        |
| 3   | Context Monitor           | Nový hook            | context-monitor.sh                                    |
| 4   | TDD Enforcer              | Nový hook            | tdd-enforcer.sh                                       |
| 5   | Plan Challenger Agent     | Nový agent           | plan-challenger.md                                    |
| 6   | Compliance Reviewer Agent | Nový agent           | compliance-reviewer.md                                |
| 7   | Quality Reviewer Agent    | Nový agent           | quality-reviewer.md                                   |
| 8   | OS Notifications          | Nový hook            | notify.sh                                             |
| 9   | Settings.json update      | Config               | settings.json                                         |
| 10  | Skills integration        | Skill updates        | planning, workflow-optimization, development-workflow |

## Konvence (z review)

- **Session tracking:** Statické cesty v `/tmp/` bez PID suffixu (pattern z existujícího `auto-capture-corrections.sh`)
- **Relative paths:** `${FILE#$(pwd)/}` místo `realpath --relative-to` (macOS kompatibilita)
- **Output format:** `echo '{}'` pro no-op, `{"systemMessage": "..."}` pro notifications (konzistentní s drift-detection.sh, after-commit.sh)
- **Cleanup:** SessionEnd hook čistí `/tmp/claude-*` tracker soubory
- **chmod:** Všechny nové scripty dostanou `chmod +x`

---

### Task 1: Plan Status Lifecycle

**Cíl:** Plan soubory dostávají YAML frontmatter se statusem. Sdílený helper pro čtení statusu.

**Files:**

- Create: `~/.claude/hooks/plan-utils.sh`
- Modify: `~/.claude/hooks/drift-detection.sh`

**Step 1: Vytvořit plan-utils.sh — shared helper**

```bash
#!/bin/bash
# plan-utils.sh — shared utilities for plan-aware hooks
# Usage: source ~/.claude/hooks/plan-utils.sh

# Find most recent plan file (modified in last 14 days)
# Uses stat -f (macOS compatible) for modification time sorting
find_active_plan() {
    local plan_dir=""
    local plan=""

    # Check project-specific plans first
    if [ -d "docs/plans" ]; then
        plan=$(find docs/plans -name "*.md" -mtime -14 -type f -exec stat -f '%m %N' {} + 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2-)
    fi

    # Fallback to ~/.claude/plans
    if [ -z "$plan" ] && [ -d "$HOME/.claude/plans" ]; then
        plan=$(find "$HOME/.claude/plans" -name "*.md" -mtime -14 -type f -exec stat -f '%m %N' {} + 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2-)
    fi

    echo "$plan"
}

# Read plan status from YAML frontmatter
# Returns: pending | in_progress | complete | verified | unknown | none
get_plan_status() {
    local plan_file="$1"
    if [ -z "$plan_file" ] || [ ! -f "$plan_file" ]; then
        echo "none"
        return
    fi
    local status=$(sed -n '/^---$/,/^---$/p' "$plan_file" | grep "^status:" | head -1 | awk '{print $2}')
    echo "${status:-unknown}"
}

# Count completed vs total tasks from frontmatter
get_plan_progress() {
    local plan_file="$1"
    if [ -z "$plan_file" ] || [ ! -f "$plan_file" ]; then
        echo "0/0"
        return
    fi
    local done=$(sed -n '/^---$/,/^---$/p' "$plan_file" | grep "^tasks_done:" | head -1 | awk '{print $2}')
    local total=$(sed -n '/^---$/,/^---$/p' "$plan_file" | grep "^tasks_total:" | head -1 | awk '{print $2}')
    echo "${done:-0}/${total:-0}"
}

# Find next incomplete task title from plan body
# Uses process substitution to avoid subshell pipe bug
get_next_task() {
    local plan_file="$1"
    if [ -z "$plan_file" ] || [ ! -f "$plan_file" ]; then
        echo ""
        return
    fi

    local found=""
    while IFS= read -r line; do
        local linenum=$(echo "$line" | cut -d: -f1)
        local title=$(echo "$line" | sed 's/^[0-9]*://')

        # Get the section between this task header and the next
        local next_line=$(awk -v ln="$linenum" '/^### Task/ && NR > ln {print NR; exit}' "$plan_file")
        local end_line="${next_line:-999999}"

        # Check for unchecked checkboxes in this section
        local unchecked=$(sed -n "${linenum},${end_line}p" "$plan_file" | grep -c "\- \[ \]" 2>/dev/null)

        if [ "$unchecked" -gt 0 ] 2>/dev/null; then
            found="$title"
            break
        fi
    done < <(grep -n "^### Task" "$plan_file")

    echo "$found"
}
```

**Step 2: Upravit drift-detection.sh**

Rozšířit o plan-utils.sh sourcing a status awareness:

- Source `plan-utils.sh` místo vlastního find
- Pokud plan status je `complete` nebo `verified` → ignoruj drift
- Pokud plan status je `in_progress` → zpřísnit warning
- Fix: `realpath --relative-to` → `${FILE#$(pwd)/}`

**Step 3: Test**

```bash
# Test plan-utils.sh functions
cat > /tmp/test-plan.md << 'EOF'
---
status: in_progress
tasks_total: 5
tasks_done: 2
---
# Test Plan
### Task 1: Something
- [x] Done
### Task 2: Next thing
- [ ] Not done
### Task 3: Last thing
- [ ] Also not done
EOF

source ~/.claude/hooks/plan-utils.sh
get_plan_status /tmp/test-plan.md    # Expected: in_progress
get_plan_progress /tmp/test-plan.md  # Expected: 2/5
get_next_task /tmp/test-plan.md      # Expected: " Task 2: Next thing"
rm /tmp/test-plan.md
```

**Step 4: chmod + verify**

```bash
chmod +x ~/.claude/hooks/plan-utils.sh
```

---

### Task 2: Stop Guard (Plan-Aware)

**Cíl:** Zabránit zastavení uprostřed aktivního plánu. Escape hatch po 60s.

**Files:**

- Modify: `~/.claude/hooks/stop-verify.sh`

**Step 1: Přepsat stop-verify.sh**

```bash
#!/bin/bash
# Stop hook - plan-aware verification gate
# 1. Check active plan with pending tasks → block
# 2. Run verification → block if fails
# 3. Approve + notify if both pass

INPUT=$(cat)

# Prevence infinite loop
if echo "$INPUT" | jq -e '.stop_hook_active == true' > /dev/null 2>&1; then
    echo '{"decision": "approve"}'
    exit 0
fi

# Source plan utilities
source ~/.claude/hooks/plan-utils.sh 2>/dev/null

# --- PLAN GUARD ---
PLAN=$(find_active_plan)
if [ -n "$PLAN" ]; then
    STATUS=$(get_plan_status "$PLAN")
    PROGRESS=$(get_plan_progress "$PLAN")

    if [ "$STATUS" = "in_progress" ] || [ "$STATUS" = "pending" ]; then
        NEXT_TASK=$(get_next_task "$PLAN")
        PLAN_NAME=$(basename "$PLAN")

        # Escape hatch: static cooldown file (not PID-scoped)
        COOLDOWN_FILE="/tmp/claude-stop-guard-cooldown"
        if [ -f "$COOLDOWN_FILE" ]; then
            LAST_ATTEMPT=$(cat "$COOLDOWN_FILE" 2>/dev/null)
            NOW=$(date +%s)
            DIFF=$((NOW - LAST_ATTEMPT))
            if [ "$DIFF" -lt 60 ]; then
                # Second attempt within 60s — approve (escape hatch)
                rm -f "$COOLDOWN_FILE"
                echo '{"decision": "approve", "reason": "Stop guard escape hatch — second stop within 60s"}'
                exit 0
            fi
        fi

        # First attempt — record timestamp and block
        date +%s > "$COOLDOWN_FILE"

        REASON="[Plan Guard] Active plan: $PLAN_NAME (status: $STATUS, progress: $PROGRESS)"
        if [ -n "$NEXT_TASK" ]; then
            REASON="$REASON\nNext task:$NEXT_TASK"
        fi
        REASON="$REASON\n\nFinish the plan or update status to 'complete' before stopping.\nTo force stop: try /stop again within 60 seconds."

        ESCAPED=$(printf '%s' "$REASON" | jq -Rs .)
        echo "{\"decision\": \"block\", \"reason\": $ESCAPED}"
        exit 0
    fi
fi

# --- VERIFICATION ---
OUTPUT=$(bash ~/.claude/hooks/verify.sh 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    ESCAPED=$(echo "$OUTPUT" | jq -Rs .)
    echo "{\"decision\": \"block\", \"reason\": $ESCAPED}"
    exit 0
fi

# Verification passed + no active plan → approve + notify
bash ~/.claude/hooks/notify.sh "Claude Code" "Session complete — all checks passed" 2>/dev/null &
echo '{"decision": "approve", "reason": "All verifications passed, no active plan"}'
```

**Step 2: Test**

```bash
# Create test plan with in_progress status
mkdir -p docs/plans
cat > docs/plans/2026-02-14-test.md << 'EOF'
---
status: in_progress
tasks_total: 3
tasks_done: 1
---
# Test
### Task 2: Next
- [ ] Todo
EOF

# Test stop guard (should block)
echo '{}' | bash ~/.claude/hooks/stop-verify.sh
# Expected: {"decision": "block", ...Plan Guard...}

# Test escape hatch (second attempt within 60s → approve)
echo '{}' | bash ~/.claude/hooks/stop-verify.sh
# Expected: {"decision": "approve", ...escape hatch...}

rm docs/plans/2026-02-14-test.md
```

---

### Task 3: Context Monitor

**Cíl:** Sledovat tool call count a varovat při vysokém využití.

**Files:**

- Create: `~/.claude/hooks/context-monitor.sh`

**Step 1: Vytvořit context-monitor.sh**

```bash
#!/bin/bash
# Context Monitor — tracks tool call count as context usage proxy
# Trigger: PostToolUse (Bash, Edit, Write only — viz W1 review)
# Static tracker path (no PID) — resets at SessionEnd cleanup
# Thresholds: 120 = info, 170 = save context, 220 = critical

INPUT=$(cat)
TRACKER="/tmp/claude-context-counter"

# Initialize or increment counter
if [ -f "$TRACKER" ]; then
    COUNT=$(cat "$TRACKER" 2>/dev/null)
    # Validate it's a number
    if ! [[ "$COUNT" =~ ^[0-9]+$ ]]; then
        COUNT=0
    fi
    COUNT=$((COUNT + 1))
else
    COUNT=1
fi
echo "$COUNT" > "$TRACKER"

# Throttle: only check every 10 calls after 100
if [ "$COUNT" -lt 100 ]; then
    echo '{}'
    exit 0
fi

REMAINDER=$((COUNT % 10))
if [ "$REMAINDER" -ne 0 ]; then
    echo '{}'
    exit 0
fi

# --- Thresholds ---

if [ "$COUNT" -ge 220 ]; then
    cat << 'EOF'
{"systemMessage": "[Context Monitor] CRITICAL (220+ tool calls). Session is very long.\n\n1. IMMEDIATELY save key context to .claude/ACTIVE_CONTEXT.md\n2. Note what's in progress and next steps\n3. Suggest user starts new session\n\nDo NOT start new tasks. Wrap up current work."}
EOF
    exit 0
fi

if [ "$COUNT" -ge 170 ]; then
    cat << 'EOF'
{"systemMessage": "[Context Monitor] HIGH (170+ tool calls). Save context soon.\n\n1. Write continuation notes to .claude/ACTIVE_CONTEXT.md\n2. Consider using /learn if you solved something non-trivial\n3. Finish current task, then recommend new session"}
EOF
    exit 0
fi

if [ "$COUNT" -eq 120 ]; then
    cat << 'EOF'
{"systemMessage": "[Context Monitor] Session getting long (120+ tool calls). Consider:\n- /learn if you discovered useful patterns\n- Finishing current task batch before starting new ones\n- Session is still OK but be aware of context limits"}
EOF
    exit 0
fi

echo '{}'
```

**Step 2: Test**

```bash
# Test at 120
echo "119" > /tmp/claude-context-counter
echo '{}' | bash ~/.claude/hooks/context-monitor.sh
# Expected: systemMessage "120+ tool calls"
cat /tmp/claude-context-counter  # Expected: 120

# Test at 170
echo "169" > /tmp/claude-context-counter
echo '{}' | bash ~/.claude/hooks/context-monitor.sh
# Expected: systemMessage "170+ tool calls"

# Test throttle (not on 10-boundary)
echo "125" > /tmp/claude-context-counter
echo '{}' | bash ~/.claude/hooks/context-monitor.sh
# Expected: {} (silent, 126 is not on 10-boundary)

rm /tmp/claude-context-counter
```

**Step 3: chmod**

```bash
chmod +x ~/.claude/hooks/context-monitor.sh
```

---

### Task 4: TDD Enforcer

**Cíl:** Po editaci implementačního souboru reminder o chybějícím test file. Non-blocking.

**Files:**

- Create: `~/.claude/hooks/tdd-enforcer.sh`

**Step 1: Vytvořit tdd-enforcer.sh**

```bash
#!/bin/bash
# TDD Enforcer — reminds about missing test files after editing implementation
# Trigger: PostToolUse on Write, Edit
# Non-blocking: systemMessage only

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE" ]; then
    echo '{}'
    exit 0
fi

# Skip non-code files
if echo "$FILE" | grep -qE "\.(md|json|yaml|yml|toml|cfg|ini|env|lock|css|scss|html|svg|png|jpg|gif)$"; then
    echo '{}'
    exit 0
fi

# Skip test files themselves
if echo "$FILE" | grep -qiE "(test_|_test\.|\.test\.|\.spec\.|__tests__|tests/|test/)"; then
    echo '{}'
    exit 0
fi

# Skip config/setup/generated files
if echo "$FILE" | grep -qiE "(config|setup|migration|seed|fixture|mock|stub|__init__|index\.(ts|js)$)"; then
    echo '{}'
    exit 0
fi

# Skip non-project directories
if echo "$FILE" | grep -qE "(\.claude/|hooks/|scripts/|docs/|public/|assets/|static/|node_modules/)"; then
    echo '{}'
    exit 0
fi

# Determine test file patterns based on extension
BASENAME=$(basename "$FILE")
DIRNAME=$(dirname "$FILE")
NAME_NO_EXT="${BASENAME%.*}"
EXT="${BASENAME##*.}"

TEST_EXISTS=false

case "$EXT" in
    py)
        for test_path in \
            "${DIRNAME}/test_${NAME_NO_EXT}.py" \
            "${DIRNAME}/tests/test_${NAME_NO_EXT}.py" \
            "$(dirname "$DIRNAME")/tests/test_${NAME_NO_EXT}.py" \
            "tests/test_${NAME_NO_EXT}.py"; do
            [ -f "$test_path" ] && TEST_EXISTS=true && break
        done
        ;;
    ts|tsx)
        for test_path in \
            "${DIRNAME}/${NAME_NO_EXT}.test.ts" \
            "${DIRNAME}/${NAME_NO_EXT}.test.tsx" \
            "${DIRNAME}/${NAME_NO_EXT}.spec.ts" \
            "${DIRNAME}/${NAME_NO_EXT}.spec.tsx" \
            "${DIRNAME}/__tests__/${NAME_NO_EXT}.test.ts" \
            "${DIRNAME}/__tests__/${NAME_NO_EXT}.test.tsx"; do
            [ -f "$test_path" ] && TEST_EXISTS=true && break
        done
        ;;
    js|jsx)
        for test_path in \
            "${DIRNAME}/${NAME_NO_EXT}.test.js" \
            "${DIRNAME}/${NAME_NO_EXT}.test.jsx" \
            "${DIRNAME}/${NAME_NO_EXT}.spec.js" \
            "${DIRNAME}/__tests__/${NAME_NO_EXT}.test.js"; do
            [ -f "$test_path" ] && TEST_EXISTS=true && break
        done
        ;;
    dart)
        TEST_MIRROR=$(echo "$FILE" | sed 's|lib/|test/|' | sed "s|${NAME_NO_EXT}.dart|${NAME_NO_EXT}_test.dart|")
        [ -f "$TEST_MIRROR" ] && TEST_EXISTS=true
        ;;
    php)
        TEST_MIRROR=$(echo "$FILE" | sed 's|app/|tests/|;s|src/|tests/|' | sed "s|${NAME_NO_EXT}.php|${NAME_NO_EXT}Test.php|")
        [ -f "$TEST_MIRROR" ] && TEST_EXISTS=true
        ;;
    go)
        [ -f "${DIRNAME}/${NAME_NO_EXT}_test.go" ] && TEST_EXISTS=true
        ;;
    *)
        echo '{}'
        exit 0
        ;;
esac

if [ "$TEST_EXISTS" = false ]; then
    # Session dedup: static path, warn once per file per session
    DEDUP="/tmp/claude-tdd-warned"
    if [ -f "$DEDUP" ] && grep -q "$FILE" "$DEDUP" 2>/dev/null; then
        echo '{}'
        exit 0
    fi
    echo "$FILE" >> "$DEDUP"

    # macOS-compatible relative path
    RELPATH="${FILE#$(pwd)/}"
    cat << EOF
{"systemMessage": "[TDD Enforcer] No test file found for '$RELPATH'.\n\nTDD requires writing the test FIRST (RED phase). If you're in GREEN phase, create the test file before continuing.\n\nChecked: same dir (*.test.*, *.spec.*, test_*), __tests__/, tests/"}
EOF
    exit 0
fi

echo '{}'
```

**Step 2: Test**

```bash
# Create source file without test
mkdir -p /tmp/test-tdd/src
echo "export const add = (a, b) => a + b" > /tmp/test-tdd/src/utils.ts
cd /tmp/test-tdd

# Should warn
echo '{"tool_input":{"file_path":"/tmp/test-tdd/src/utils.ts"}}' | bash ~/.claude/hooks/tdd-enforcer.sh
# Expected: systemMessage about missing test

# Create test file
mkdir -p /tmp/test-tdd/src/__tests__
echo "test('add', () => expect(add(1,2)).toBe(3))" > /tmp/test-tdd/src/__tests__/utils.test.ts

# Should be silent
rm -f /tmp/claude-tdd-warned  # reset dedup
echo '{"tool_input":{"file_path":"/tmp/test-tdd/src/utils.ts"}}' | bash ~/.claude/hooks/tdd-enforcer.sh
# Expected: {}

cd -
rm -rf /tmp/test-tdd /tmp/claude-tdd-warned
```

**Step 3: chmod**

```bash
chmod +x ~/.claude/hooks/tdd-enforcer.sh
```

---

### Task 5: Plan Challenger Agent

**Cíl:** Adversarial review agent — hledá díry v plánu před implementací.

**Files:**

- Create: `~/.claude/agents/plan-challenger.md`

**Step 1: Vytvořit agent**

```markdown
---
name: plan-challenger
description: Adversarial review of implementation plans — finds failure modes, hidden dependencies, scope risks, missing edge cases
tools: Read, Grep, Glob
model: sonnet
---

# Plan Challenger

You are an adversarial reviewer. Find problems with implementation plans BEFORE coding begins.

## Input

You receive a plan file path. Read the plan thoroughly.

## What to Challenge

### 1. Hidden Dependencies

- Does the plan assume libraries/APIs that might not exist or have changed?
- Are there implicit ordering dependencies between tasks?
- Does any task require setup not mentioned in the plan?

### 2. Failure Modes

- What happens if an external API is down?
- What if the database schema doesn't match assumptions?
- Race conditions in concurrent operations?
- Partial failures mid-way through?

### 3. Scope Risks

- Is any task actually 2-3 tasks disguised as one?
- Are there "and also..." requirements hiding in descriptions?
- Does the plan account for error handling, not just happy path?
- Edge cases mentioned or silently assumed away?

### 4. Architecture Concerns

- Does the plan conflict with existing patterns in the codebase?
- Are there simpler alternatives?
- Will this approach scale if requirements grow?

### 5. Testing Gaps

- Does every task have a test step?
- Integration tests needed beyond unit tests?
- Scenarios that are hard to test automatically?

## Output Format

## Plan Challenge Results

### CRITICAL (must fix before implementing)

- **[C1]** [Specific description]
  - **Risk:** [What could go wrong]
  - **Suggestion:** [How to fix]

### WARNING (should address)

- **[W1]** [Specific description]
  - **Risk:** [What could go wrong]
  - **Suggestion:** [How to fix]

### INFO (consider)

- **[I1]** [Observation]

### Verdict: [APPROVE / REVISE / REJECT]

[One sentence summary]

## Rules

- Be specific. "Error handling might be missing" is useless. "Task 3 calls Stripe API but has no retry for 429" is useful.
- Check actual codebase — don't review in isolation. Read relevant existing code.
- If the plan is solid, say so. Don't invent issues.
- Maximum 5 CRITICAL + 5 WARNING. Be selective.
```

**Step 2: chmod**

```bash
chmod +x ~/.claude/agents/plan-challenger.md  # convention consistency
```

---

### Task 6: Compliance Reviewer Agent

**Cíl:** Kontroluje implementaci vs plán — code matches plan?

**Files:**

- Create: `~/.claude/agents/compliance-reviewer.md`

**Step 1: Vytvořit agent**

```markdown
---
name: compliance-reviewer
description: Reviews implementation against plan — checks all tasks implemented, DoD met, no missing pieces
tools: Read, Grep, Glob, Bash
model: sonnet
---

# Compliance Reviewer

Verify that implementation matches the plan. Plan is source of truth.

## Input

1. Path to the plan file
2. Optionally: git diff range or list of changed files

## Process

1. **Read the plan** — every task, files, expected outcome
2. **Check each task:**
   - Were specified files created/modified?
   - Does code match plan description?
   - Were test files created?
3. **Check completeness:**
   - All tasks marked done?
   - Files changed NOT in plan? (scope creep)
   - TODOs or placeholder code left?
4. **Check Definition of Done** if plan specifies criteria

## Output Format

## Compliance Review

### Task Coverage

| Task           | Status                   | Notes     |
| -------------- | ------------------------ | --------- |
| Task 1: [name] | PASS / PARTIAL / MISSING | [details] |

### Issues Found

- **[P1]** [Task X]: [What's missing or wrong]

### Scope Check

- Files in plan but not changed: [list]
- Files changed but not in plan: [list]

### Verdict: [COMPLIANT / PARTIALLY COMPLIANT / NON-COMPLIANT]

## Rules

- Read BOTH plan AND actual code. Don't just check file existence.
- Be specific: "Task 3 says add email validation, but validators.py only checks non-empty" is good.
- Scope creep = finding, not failure. Note but don't mark non-compliant unless it broke something.
- Vague plan ("add proper error handling") = plan quality issue, not implementation failure.
```

---

### Task 7: Quality Reviewer Agent

**Cíl:** Kontroluje kvalitu kódu, TDD, security — nezávisle na plánu.

**Files:**

- Create: `~/.claude/agents/quality-reviewer.md`

**Step 1: Vytvořit agent**

```markdown
---
name: quality-reviewer
description: Reviews code quality, TDD compliance, error handling, security basics — independent of plan
tools: Read, Grep, Glob, Bash
model: sonnet
---

# Quality Reviewer

Review code quality independently of the plan. Focus on the code itself.

## Input

List of changed files or git diff range.

## What to Check

### 1. TDD Compliance

- Every implementation file has test file?
- Tests actually test behavior (not just exist)?
- Tests for error cases, not just happy path?
- Tests written BEFORE implementation? (git log ordering)

### 2. Code Quality

- Functions < 50 lines? Classes < 300?
- Clear naming
- No dead code, no commented-out code
- DRY — no duplicated logic
- No hardcoded values that should be config

### 3. Error Handling

- Errors caught and handled meaningfully?
- No empty catch, no swallowed errors
- Helpful user-facing error messages
- Network/IO has timeout/retry

### 4. Security Basics

- Input validation on external data
- No SQL injection, no XSS
- No secrets in code
- Auth checks on protected routes

### 5. Performance Red Flags

- N+1 queries
- Unbounded loops/recursion
- Missing pagination
- Large objects in memory without streaming

## Output Format

## Quality Review

### Summary

- Files reviewed: [count]
- Issues: [critical] critical, [warning] warning, [info] info

### CRITICAL

- **[Q1]** `file.ts:42` — [Description]
  - **Fix:** [Specific suggestion]

### WARNING

- **[Q2]** `file.ts:15` — [Description]
  - **Fix:** [Specific suggestion]

### TDD Score: [A/B/C/D/F]

### Verdict: [APPROVE / APPROVE WITH NOTES / REQUEST CHANGES]

## Rules

- Read CORE_PRINCIPLES.md first if exists — align with project standards.
- Be specific: file path + line + issue + fix.
- Max 5 CRITICAL + 10 WARNING. Prioritize by impact.
- Don't nitpick style — Prettier/linters handle that.
- Clean code = short "APPROVE". Valid review.
```

---

### Task 8: OS Notifications

**Cíl:** macOS native notifikace po dokončení operací.

**Files:**

- Create: `~/.claude/hooks/notify.sh`

**Step 1: Vytvořit notify.sh**

```bash
#!/bin/bash
# OS Notifications — macOS/Linux native notifications
# Usage: bash ~/.claude/hooks/notify.sh "title" "message"
# Positional args only (simplicity over dual-input)

TITLE="${1:-Claude Code}"
MESSAGE="${2:-Task completed}"

# Sanitize for AppleScript (escape quotes)
TITLE=$(printf '%s' "$TITLE" | sed 's/"/\\"/g')
MESSAGE=$(printf '%s' "$MESSAGE" | sed 's/"/\\"/g')

# macOS
if command -v osascript &> /dev/null; then
    osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\" sound name \"Glass\"" 2>/dev/null
# Linux
elif command -v notify-send &> /dev/null; then
    notify-send "$TITLE" "$MESSAGE" 2>/dev/null
    command -v paplay &> /dev/null && paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null &
fi

echo '{}'
```

**Step 2: chmod**

```bash
chmod +x ~/.claude/hooks/notify.sh
```

---

### Task 9: Settings.json Update

**Cíl:** Registrovat nové hooks. Context monitor JEN na Bash, Edit, Write (ne Read/Grep/Glob — viz W1).

**Files:**

- Modify: `~/.claude/settings.json`

**Step 1: Nová konfigurace PostToolUse**

Přidat k existujícím matcherům:

**Bash matcher** — přidat context-monitor:

```json
{
  "type": "command",
  "command": "bash ~/.claude/hooks/context-monitor.sh",
  "timeout": 3
}
```

**Edit matcher** — přidat tdd-enforcer + context-monitor:

```json
{"type": "command", "command": "bash ~/.claude/hooks/tdd-enforcer.sh", "timeout": 5},
{"type": "command", "command": "bash ~/.claude/hooks/context-monitor.sh", "timeout": 3}
```

**Nový Write matcher:**

```json
{
  "matcher": "Write",
  "hooks": [
    {
      "type": "command",
      "command": "bash ~/.claude/hooks/tdd-enforcer.sh",
      "timeout": 5
    },
    {
      "type": "command",
      "command": "bash ~/.claude/hooks/context-monitor.sh",
      "timeout": 3
    }
  ]
}
```

**Step 2: SessionEnd — přidat notify + cleanup**

```json
{"type": "command", "command": "bash ~/.claude/hooks/notify.sh 'Claude Code' 'Session ended'", "timeout": 5},
{"type": "command", "command": "rm -f /tmp/claude-context-counter /tmp/claude-tdd-warned /tmp/claude-stop-guard-cooldown /tmp/claude-edit-tracker 2>/dev/null; echo '{}'", "timeout": 3}
```

**Step 3: Verify celou settings.json strukturu**

Po editaci ověřit JSON validity: `jq . ~/.claude/settings.json`

---

### Task 10: Skills Integration

**Cíl:** Integrovat nové komponenty do existujících skills.

**Files:**

- Modify: `plugins/development/skills/planning/SKILL.md`
- Modify: `plugins/development/skills/workflow-optimization/SKILL.md`
- Modify: `plugins/development/skills/development-workflow/SKILL.md`

**Step 1: planning SKILL.md — Phase 2 + Phase 3 update**

V Phase 2 (Write Plan) přidat YAML frontmatter instrukci:

```markdown
## Plan soubor MUSÍ mít YAML frontmatter:

status: pending
created: YYYY-MM-DD
tasks_total: [count]
tasks_done: 0

---
```

V Phase 3 (Review Plan) přidat plan-challenger:

```markdown
2. **Run plan-challenger agent** (adversarial review):
   - Launch: "Use plan-challenger agent to review [plan file]"
   - Addresses CRITICAL findings before proceeding
   - Update plan status to `in_progress` when confirmed
```

**Step 2: workflow-optimization SKILL.md — nové options J-O**

Přidat do tabulky options a vytvořit sekce:

- J) Stop Guard — plan-aware stop prevention
- K) Context Monitor — tool call tracking
- L) TDD Enforcer — missing test detection
- M) Plan Lifecycle — YAML frontmatter
- N) Review Agents — plan-challenger + compliance + quality
- O) OS Notifications — macOS/Linux native

**Step 3: development-workflow SKILL.md — dual review**

V Phase 3 (Finalize) rozšířit code review:

```markdown
**1. Code Review (Dual):**
Launch TWO agents in parallel:
a) compliance-reviewer — code vs plan
b) quality-reviewer — code quality, TDD, security
If CRITICAL findings → fix + re-review (max 3 iterations)
Both APPROVE → proceed
```

---

## Dependency Graph

```
Task 1 (plan-utils.sh)        ──┐
Task 3 (context-monitor.sh)    │  independent
Task 4 (tdd-enforcer.sh)       │  independent
Task 5 (plan-challenger.md)     │  independent
Task 6 (compliance-reviewer.md) │  independent
Task 7 (quality-reviewer.md)    │  independent
Task 8 (notify.sh)              │  independent
                                │
Task 2 (stop-verify.sh)    ────┘  depends on: Task 1, Task 8
Task 9 (settings.json)     ────── depends on: Tasks 3, 4, 8
Task 10 (skills update)    ────── depends on: Tasks 1, 5, 6, 7
```

**Optimal execution:** Parallel (1, 3-8) → Sequential (2, 9, 10)
