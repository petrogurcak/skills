---
name: merge
description: Use after verification passes - commits, merges to development branch, verifies, and cleans up feature branch/worktree
---

# Merge

Commit, merge to development, verify, cleanup.

**Announce:** "Merguji do development."

## Process

1. **Commit current work** (if uncommitted changes exist):
   ```bash
   git add [relevant files]
   git commit -m "feat: [description]"
   ```

2. **Switch to development and merge:**
   ```bash
   git checkout development
   git pull
   git merge <feature-branch>
   ```

3. **Verify on development:**
   - Run test suite again on merged result
   - Run build
   - Show evidence of success

4. **Cleanup:**
   - Delete feature branch: `git branch -d <feature-branch>`
   - Remove worktree if used: `git worktree remove <path>`

5. **Report:**
   ```
   Merge hotovy:
   - Branch: <feature-branch> merged do development
   - Testy na development: PASS
   - Branch smazan: yes
   - Worktree: [removed / n/a]

   Hotovo. Spoustim wrap-up.
   ```

## Error Handling

- **Merge conflicts:** Show conflicts, help resolve, re-run tests after resolution
- **Test failures on development:** Fix on development, re-run tests, don't leave development broken
- **No development branch:** Ask user which branch to merge to

## Rules

- **Always verify after merge** - merged code can break even if both branches were green
- **Always delete feature branch** after successful merge (unless user says otherwise)
- **Never force-push** to development
