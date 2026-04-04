---
status: complete
created: 2026-02-27
tasks_total: 3
tasks_done: 3
---

# Event-Driven Skill Activation — Lightweight Implementation

**Goal:** Prevent "skill amnesia" after context compaction and add deterministic framework-skill suggestions on file edit.
**Architecture:** Two changes: (1) fix SessionStart matcher to re-fire after compact, (2) new PostToolUse hook for framework file triggers.
**Tech Stack:** Bash hooks, Claude Code settings.json
**Created:** 2026-02-27

**Inspirace:** [Agent RuleZ](https://github.com/SpillwaveSolutions/agent_rulez) — event-driven skill injection. Implementujeme jen 2 high-value patterny z 5, zbytek pokryva nas existujici system (using-superpowers, skill-activation-enforcer).

**Stinne stranky (adresovane v planu):**

- File triggers prichazeji pozde (agent uz zacal psat kod) — proto jen suggestion, ne block
- 35+ skills nema file trigger — proto to NEDOPLNUJE using-superpowers, jen ho doplnuje
- False positives u extensions (.tsx = React/Expo/Next) — proto project detection pres indicator files
- Performance — jednoduchy bash, timeout 3s, dedup pres /tmp
- Session isolation: /tmp dedup soubory jsou sdilene mezi concurrent sessions (znamy dluh, stejny jako u ostatnich hooku)

**Pozn:** Soubory `~/.claude/settings.json` a `~/.claude/hooks/` jsou symlinky na `~/Projects/claude-config/`. Commity jdou do claude-config repa.
**Pozn:** Nette plugin je nainstalovan jako v1.0.1 (skill `nette-testing`, ne `nette-tester`). Pouzivame nazvy z v1.0.1.

> **Post-execution:** After all tasks are complete, run:
>
> `/development:finish` - orchestrates verify -> demo -> merge -> wrapup
>
> Or individually: `/development:verify` -> `/development:demo` -> `/development:merge` -> `/development:wrapup`

---

### Task 1: Fix SessionStart matcher — add "compact" trigger

**Files:**

- Modify: `~/.claude/settings.json` (hooks.SessionStart[0].matcher)

**Step 1: Update matcher**

Change:

```json
"matcher": "startup"
```

To:

```json
"matcher": "startup|compact"
```

This ensures that after auto-compact (or manual /compact), ALL session start hooks re-fire:

- `load-context.sh` — re-injects ACTIVE_CONTEXT.md
- `load-mistakes.sh` — re-injects mistakes.md
- `load-global-context.sh` — re-injects NOW.md entries
- `check-plugin-updates.sh` — re-checks plugin state

**Step 2: Verify**

```bash
# Read settings.json, confirm matcher is "startup|compact"
cat ~/.claude/settings.json | jq '.hooks.SessionStart[0].matcher'
# Expected: "startup|compact"
```

**Step 3: Commit**

```bash
cd ~/Projects/claude-config
git add hooks/  # if settings.json is managed here
git commit -m "fix: re-fire session hooks after context compaction"
```

**Notes:**

- Zero new code — config-only change
- SessionStart fires AFTER compaction, so hooks inject into fresh (compacted) context
- All 4 hooks are lightweight (<1s each), no performance concern

---

### Task 2: Create framework skill suggestion hook

**Files:**

- Create: `~/.claude/hooks/skill-suggest.sh`
- Modify: `~/.claude/settings.json` (add PostToolUse hook)

**Step 0: Design — what triggers what**

| File Pattern                    | Project Indicator                                  | Suggested Skill                                  |
| ------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `*.latte`                       | `composer.json` with `nette/`                      | `nette:latte-templates`                          |
| `*.neon`                        | `composer.json` with `nette/`                      | `nette:neon-format`, `nette:nette-configuration` |
| `*.phpt`                        | `composer.json` with `nette/`                      | `nette:nette-testing`                            |
| `*.dart`                        | `pubspec.yaml`                                     | `development:flutter-workflow`                   |
| `*.tsx`/`*.jsx` in Expo project | `app.json` with `expo`                             | `development:expo-workflow`                      |
| `*.py` with FastAPI             | `requirements.txt`/`pyproject.toml` with `fastapi` | `development:fastapi-workflow`                   |

**Step 1: Create skill-suggest.sh**

```bash
#!/bin/bash
# Skill Suggest — suggests framework skills based on file extension + project context
# Trigger: PostToolUse on Edit|Write
# Non-blocking: systemMessage only, dedup per skill per session

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE" ]; then
    echo '{}'
    exit 0
fi

# Early exit: check extension BEFORE any filesystem work (W2 optimization)
EXT="${FILE##*.}"
case "$EXT" in
    latte|neon|phpt|dart|tsx|jsx|py) ;; # Known extensions — continue
    *)
        echo '{}'
        exit 0
        ;;
esac

DIR=$(dirname "$FILE")

# Find project root (walk up to .git boundary, then check indicators)
find_project_root() {
    local d="$1"
    while [ "$d" != "/" ]; do
        if [ -d "$d/.git" ]; then
            echo "$d"
            return
        fi
        d=$(dirname "$d")
    done
    echo ""
}

PROJECT_ROOT=$(find_project_root "$DIR")
if [ -z "$PROJECT_ROOT" ]; then
    echo '{}'
    exit 0
fi

SKILL=""
CONTEXT=""

case "$EXT" in
    latte)
        if [ -f "$PROJECT_ROOT/composer.json" ] && grep -q '"nette/' "$PROJECT_ROOT/composer.json" 2>/dev/null; then
            SKILL="nette:latte-templates"
            CONTEXT="Latte template"
        fi
        ;;
    neon)
        if [ -f "$PROJECT_ROOT/composer.json" ] && grep -q '"nette/' "$PROJECT_ROOT/composer.json" 2>/dev/null; then
            SKILL="nette:neon-format"
            CONTEXT="NEON config"
        fi
        ;;
    phpt)
        if [ -f "$PROJECT_ROOT/composer.json" ] && grep -q '"nette/' "$PROJECT_ROOT/composer.json" 2>/dev/null; then
            SKILL="nette:nette-testing"
            CONTEXT="Nette test"
        fi
        ;;
    dart)
        if [ -f "$PROJECT_ROOT/pubspec.yaml" ]; then
            SKILL="development:flutter-workflow"
            CONTEXT="Flutter/Dart"
        fi
        ;;
    tsx|jsx)
        if [ -f "$PROJECT_ROOT/app.json" ] && grep -q '"expo"' "$PROJECT_ROOT/app.json" 2>/dev/null; then
            SKILL="development:expo-workflow"
            CONTEXT="Expo/React Native"
        fi
        ;;
    py)
        if [ -f "$PROJECT_ROOT/pyproject.toml" ] && grep -q 'fastapi' "$PROJECT_ROOT/pyproject.toml" 2>/dev/null; then
            SKILL="development:fastapi-workflow"
            CONTEXT="FastAPI"
        elif [ -f "$PROJECT_ROOT/requirements.txt" ] && grep -q 'fastapi' "$PROJECT_ROOT/requirements.txt" 2>/dev/null; then
            SKILL="development:fastapi-workflow"
            CONTEXT="FastAPI"
        fi
        ;;
esac

if [ -z "$SKILL" ]; then
    echo '{}'
    exit 0
fi

# Dedup: suggest each skill only once per session
DEDUP="/tmp/claude-skill-suggested"
if [ -f "$DEDUP" ] && grep -q "$SKILL" "$DEDUP" 2>/dev/null; then
    echo '{}'
    exit 0
fi
echo "$SKILL" >> "$DEDUP"

cat << EOF
{"systemMessage": "[Skill Suggest] Working with $CONTEXT file. Ensure you have loaded /$SKILL for framework-specific patterns and conventions."}
EOF
```

**Step 2: Make executable**

```bash
chmod +x ~/.claude/hooks/skill-suggest.sh
```

**Step 3: Add hook to settings.json**

Add to PostToolUse array for Edit matcher:

```json
{
  "type": "command",
  "command": "bash ~/.claude/hooks/skill-suggest.sh",
  "timeout": 3
}
```

And add new PostToolUse entry for Write with same hook.

**Step 4: Add cleanup to SessionEnd**

Update the existing SessionEnd cleanup command to include:

```bash
rm -f /tmp/claude-skill-suggested
```

**Step 5: Verify**

```bash
# Test with a .latte file in a Nette project
echo '{"tool_input":{"file_path":"/path/to/nette-project/app/Presenters/templates/Homepage/default.latte"}}' | bash ~/.claude/hooks/skill-suggest.sh
# Expected: {"systemMessage": "[Skill Suggest] Working with Latte template file..."}

# Test dedup (second call = empty)
echo '{"tool_input":{"file_path":"/path/to/nette-project/app/Presenters/templates/Homepage/detail.latte"}}' | bash ~/.claude/hooks/skill-suggest.sh
# Expected: {}

# Cleanup
rm -f /tmp/claude-skill-suggested
```

**Step 6: Commit**

```bash
cd ~/Projects/claude-config
git add hooks/skill-suggest.sh
git commit -m "feat: add framework skill suggestion hook on file edit"
```

---

### Task 3: Test end-to-end in live session

**Pre-requisite:** Tasks 1 and 2 complete, Claude Code restarted.

**Test A: Post-compact skill refresh**

1. Start new Claude Code session
2. Do enough work to approach context limit (or manually `/compact`)
3. After compaction, verify skill list, context, mistakes are re-injected
4. Check verbose output (`Ctrl+O`) for SessionStart hooks firing with "compact" trigger

**Test B: Framework file suggestion**

1. Open a Nette project with `composer.json` containing `nette/` dependency
2. Edit a `.latte` file
3. Verify `[Skill Suggest]` systemMessage appears suggesting `nette:latte-templates`
4. Edit another `.latte` file — verify dedup (no second suggestion)
5. Edit a `.neon` file — verify `nette:neon-format` suggestion appears (different skill = no dedup)

**Test C: No false positives**

1. Edit a `.tsx` file in a non-Expo project (plain React) — verify NO suggestion
2. Edit a `.py` file in a non-FastAPI project — verify NO suggestion
3. Edit a `.md` file — verify NO suggestion

**Pass criteria:** All 3 test groups pass. No performance degradation on Edit/Write (hook runs in <100ms).
