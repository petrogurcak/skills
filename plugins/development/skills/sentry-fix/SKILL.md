---
name: sentry-fix
description: Use when asked to fix Sentry issues, check Sentry errors, or auto-fix bugs from error monitoring. Fetches unresolved issues, investigates root cause, creates fix branch, tests, and merges.
context: fork
agent: general-purpose
---

# Sentry Auto-Fix

Fix Sentry issues interactively — investigate, branch, fix, test, merge, resolve.

## Project Config (auto-injected)

**Branch:** !`git branch --show-current`

### Sentry projects

!`cat ~/.claude/scripts/sentry-projects.yaml 2>/dev/null`

## Triggers

- "fix sentry issues", "sentry fix", "oprav sentry", "check sentry and fix"
- "fix sentry errors in [project]"
- "are there any sentry issues?"

## Flow

### Step 1: Fetch Issues

Use Sentry MCP to get unresolved issues:

```
/sentry:getIssues [project-name]
```

If no project specified, check all projects from config:

```bash
cat ~/.claude/scripts/sentry-projects.yaml
```

### Step 2: Present Issues

Show a table with:

| #   | Short ID | Project | Title | Events | Users | First Seen |
| --- | -------- | ------- | ----- | ------ | ----- | ---------- |

Ask user: "Which issues to fix? (number, 'all', or 'skip')"

### Step 3: For Each Selected Issue

#### 3a. Investigate

1. Use Sentry MCP `get_issue` for full details (stacktrace, breadcrumbs, tags)
2. Read relevant source files from the stacktrace
3. Present root cause analysis to user:
   - **Root cause:** [explanation]
   - **Affected code:** [file:line]
   - **Suggested fix:** [approach]
4. Ask: "Proceed with fix?" (user can modify approach)

#### 3b. Branch & Fix

```bash
git checkout development
git pull origin development
git checkout -b fix/sentry-{SHORT_ID}
```

1. Write minimal fix addressing root cause
2. Write/update test reproducing the issue
3. Do NOT refactor surrounding code

#### 3c. Test

Run project's test command (from `sentry-projects.yaml`).

- Pass → continue
- Fail → show failure, ask user for guidance (max 3 attempts)

#### 3d. Commit & Merge

```bash
git add <changed files>
git commit -m "fix({project}): {description}

Resolves Sentry {SHORT_ID}

Co-Authored-By: Claude <noreply@anthropic.com>"

git checkout development
git merge fix/sentry-{SHORT_ID}
git branch -d fix/sentry-{SHORT_ID}
```

#### 3e. Resolve in Sentry

Use Sentry MCP to mark issue as resolved.

### Step 4: Summary Report

```markdown
## Sentry Fix Report — {date}

| Issue      | Project   | Status               | Root Cause |
| ---------- | --------- | -------------------- | ---------- |
| {SHORT_ID} | {project} | FIXED/SKIPPED/FAILED | {cause}    |

Files modified: {count}
Tests: {passed}/{total}
```

## Rules

- NEVER touch main/master — only development branch
- NEVER modify unrelated code
- NEVER skip tests
- Complex issues (architectural, multi-service) → SKIP with explanation
- Ask user before merging (interactive mode)
- Conservative — wrong fix is worse than no fix

## Cross-references

- `sentry:getIssues` — fetch issues list
- `sentry:seer` — AI-powered root cause analysis
- `development:debugging` — systematic debugging workflow

## Headless Mode

The same logic runs autonomously via `~/.claude/scripts/sentry-fix-poller.sh` (launchd, every 2 min). Config: `~/.claude/scripts/sentry-projects.yaml`.

Management:

```bash
# Check status
launchctl list | grep sentry-fix

# View logs
tail -f ~/.claude/logs/sentry-fix-poller.log

# Stop/start
launchctl stop com.claude.sentry-fix
launchctl start com.claude.sentry-fix

# View processed issues
cat ~/.claude/state/sentry-fix-processed.txt

# Reset (reprocess all)
> ~/.claude/state/sentry-fix-processed.txt
```
