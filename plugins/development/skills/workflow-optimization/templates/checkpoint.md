# /checkpoint - Workflow Milestones

Create or verify checkpoints in your workflow.

## Usage

- `/checkpoint create <name>` - Create named checkpoint
- `/checkpoint verify <name>` - Compare current state to checkpoint
- `/checkpoint list` - Show all checkpoints
- `/checkpoint clear` - Remove old checkpoints (keeps last 5)

## Create Checkpoint

When creating a checkpoint:

1. Run quick verification (tests pass, no build errors)
2. Create git commit or stash with checkpoint name
3. Log to `.claude/checkpoints.log`:
   ```
   YYYY-MM-DD-HH:MM | checkpoint-name | git-sha
   ```
4. Report checkpoint created

## Verify Checkpoint

When verifying against a checkpoint:

1. Find checkpoint in log
2. Compare current state:
   - Files changed since checkpoint
   - Test pass rate now vs then
   - Build status
3. Report comparison:
   ```
   CHECKPOINT COMPARISON: name
   ==========================
   Files changed: X
   Tests: PASS/FAIL
   Build: PASS/FAIL
   ```

## Typical Flow

```
[Start]      → /checkpoint create "feature-start"
[Implement]  → /checkpoint create "core-done"
[Test]       → /checkpoint verify "core-done"
[Refactor]   → /checkpoint create "refactor-done"
[PR]         → /checkpoint verify "feature-start"
```

## Implementation

```bash
# Create checkpoint
mkdir -p .claude
TIMESTAMP=$(date +%Y-%m-%d-%H:%M)
SHA=$(git rev-parse --short HEAD)
echo "$TIMESTAMP | $NAME | $SHA" >> .claude/checkpoints.log

# Verify checkpoint
SHA=$(grep "$NAME" .claude/checkpoints.log | tail -1 | awk -F'|' '{print $3}')
git diff --stat "$SHA" HEAD
```
