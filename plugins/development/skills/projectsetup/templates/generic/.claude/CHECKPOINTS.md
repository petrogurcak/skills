# Checkpoints - When to Ask vs When to Auto-Proceed

This document defines when Claude should ask for user confirmation vs when it's safe to proceed automatically.

---

## Philosophy

**Balance automation with control:**
- Auto-proceed on safe, reversible operations
- Ask on operations that modify git history or make significant decisions
- Respect user's control over their codebase
- Enable flow state while maintaining safety

---

## AUTO-PROCEED (No asking required)

These operations are safe and reversible:

### File Operations
- Reading files
- Searching files (grep, glob)
- Creating new files (not CLAUDE.md or docs unless requested)
- Editing existing files
- Creating directories

**Why:** All reversible via git, no permanent impact

### Git - Read Operations
- `git status`
- `git log`
- `git diff`
- `git branch` (listing)
- `git show`

**Why:** Read-only, no changes to repository

### Git - Branch Operations
- Creating branches (`git checkout -b feature/x`)
- Switching branches (`git checkout <branch>`)
- Deleting branches (`git branch -d <branch>`)

**Why:** Safe operations, easily reversible

### Testing & Analysis
- Running tests (`npm test`, `pytest`, etc.)
- Running static analysis (`npm run lint`, `mypy`, etc.)
- Running builds (`npm run build`, `cargo build`, etc.)

**Why:** Read-only verification, no side effects

### Dependencies
- Installing dependencies listed in package.json/requirements.txt/Cargo.toml
- `npm install` (with existing package.json)
- `pip install -r requirements.txt`
- `cargo build` (installs from Cargo.toml)

**Why:** Dependencies are declared in tracked files, reproducible

### Research & Exploration
- Reading documentation
- Searching codebase
- Analyzing code structure
- Web searches for technical info

**Why:** Gathering information, no changes made

---

## ASK FIRST (Requires user confirmation)

These operations need explicit approval:

### Git - Write Operations
- **Commits** (`git commit`)
  - "Ready to commit changes. Proceed?"
  - Show: Files changed, commit message

- **Merging to main/master** (`git merge` to main)
  - "Ready to merge to main. Create PR or merge directly?"
  - Show: Branch name, changes summary

- **Pushing to remote** (`git push`)
  - "Ready to push to remote. Proceed?"
  - Show: Branch name, commits to push

**Why:** Permanent operations, modify shared/main history

### Git - Destructive Operations
- **Force push** (`git push --force`)
  - "This will force push. Are you sure?"
  - Show: What will be overwritten

- **Hard reset** (`git reset --hard`)
  - "This will discard all changes. Are you sure?"
  - Show: What will be lost

- **Rebase** (`git rebase`)
  - "Ready to rebase. Proceed?"
  - Show: Source and target branches

**Why:** Can lose work, hard to undo

### Architectural Decisions
- **Major design choices**
  - "Should we use approach A or B?"
  - Present trade-offs

- **Technology selection**
  - "Which library should we use: X, Y, or Z?"
  - Present options with pros/cons

- **Database schema changes**
  - "Ready to create migration. Proceed?"
  - Show: Schema changes

**Why:** Significant long-term impact, user should decide

### External Operations
- **API calls** (non-read operations)
  - "Ready to call API to create/update/delete. Proceed?"
  - Show: What will be modified

- **Database modifications** (outside of migrations)
  - "Ready to modify database. Proceed?"
  - Show: What will change

**Why:** External state changes, hard to revert

### Ambiguous Situations
- **Multiple valid approaches**
  - "I can do this via A or B. Which do you prefer?"
  - Explain trade-offs

- **Unclear requirements**
  - "Should this handle edge case X?"
  - Ask for clarification

**Why:** User knows their needs better

---

## Special Cases

### Adding New Dependencies

**Ask when:**
- Adding NEW package not in package.json
  - "This needs package X. Okay to add?"
  - Explain why needed

**Auto-proceed when:**
- Package already in package.json, just installing
- `npm install` with no new packages

### Documentation

**Ask when:**
- Creating README.md or new documentation files
  - "Should I create documentation?"

**Auto-proceed when:**
- User explicitly requested docs
- Updating existing docs
- Adding code comments

### Configuration Files

**Ask when:**
- Creating new config files (.eslintrc, tsconfig.json, etc.)
  - "Need to create <config>. Proceed?"

**Auto-proceed when:**
- User explicitly requested config
- Updating existing config
- Config is standard for the framework

---

## Decision Matrix

| Operation Type | Git Impact | External Impact | Ask? |
|----------------|------------|-----------------|------|
| Read files | None | None | No - Auto |
| Edit files | Working dir only | None | No - Auto |
| Create branch | None (local) | None | No - Auto |
| Run tests | None | None | No - Auto |
| Commit | History | None | Yes - Ask |
| Push | Remote history | Repository | Yes - Ask |
| Merge to main | Main branch | Team | Yes - Ask |
| API call | None | External system | Yes - Ask |
| Add dependency | package.json | None | Yes - Ask |
| Install deps (existing) | node_modules | None | No - Auto |

---

## Asking Format

When asking, be clear and concise:

### Good Examples

```
"Feature implemented and tested. Ready to commit?"

"Tests pass. Commit changes?
   Files: src/auth.ts, src/auth.test.ts
   Message: feat(auth): add user login"

"Branch feature/login ready. Create PR or merge to main?"

"This needs library 'axios'. Okay to add to package.json?"
```

### Bad Examples

```
"I will now commit these changes."
   (Not asking, just announcing)

"Shall I commit? Let me know your thoughts on this."
   (Too wordy, indirect)

"Committing..."
   (Already doing it, not asking)
```

---

## Never Auto-Proceed

**NEVER auto-proceed on:**
1. Git commits
2. Git pushes to remote
3. Merges to main/master
4. Force pushes
5. Hard resets
6. Adding new dependencies
7. External API modifications
8. Database schema changes

**Even if:**
- User seems impatient
- Operation seems obvious
- You've done it before
- It's a "simple" change

**Why:** Respect user's control. They may have reasons to:
- Review changes first
- Adjust something
- Change their mind
- Understand what's happening

---

## Customization

You can customize checkpoint behavior via `.claude/settings.local.json`:

```json
{
  "autoApprove": {
    "commits": false,
    "merges": false,
    "newDependencies": false
  }
}
```

**To enable auto-commits** (not recommended):
```json
{
  "autoApprove": {
    "commits": true
  }
}
```

---

## Summary

**Ask = Respect user control over:**
- Git history (commits, pushes, merges)
- Architectural decisions
- External changes
- New dependencies

**Auto = Enable flow state on:**
- Reading/searching
- Testing/analysis
- Branching
- File editing
- Installing existing dependencies

**When in doubt -> Ask**

The small interruption of asking is better than the large interruption of fixing an unwanted change.

---

**Last Updated:** {{DATE}}
