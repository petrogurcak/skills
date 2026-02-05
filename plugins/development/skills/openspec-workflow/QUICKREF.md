# OpenSpec Workflow - Quick Reference (v2 - Hybrid)

## 🚀 Works Immediately - No Installation Required!

**Skill location:** `~/.claude/skills/openspec-workflow/`

## Two Modes

### ✅ Standalone (Always Works)
- No dependencies
- Creates structure directly
- Full workflow supported

### 🎁 With OpenSpec CLI (Optional Bonus)
- Validation
- Dashboard
- Automated archiving

## Optional: Install CLI for Bonus Features

```bash
# Optional - only for validation/dashboard
npm install -g @fission-ai/openspec@latest
```

**Note:** You DON'T need `openspec init` - skill creates structure for you!

## Five-Stage Workflow

```
1. DRAFT PROPOSAL    → Create proposal.md (Claude creates structure)
2. REVIEW & ALIGN    → Get approval, create spec delta
3. IMPLEMENT TASKS   → Use TDD, reference specs
4. ARCHIVE CHANGE    → Move to archive (manual or CLI)
5. UPDATE SOURCE     → Merge delta into specs/
```

## What Skill Creates

```
openspec/
├── specs/                          # Source of truth
│   └── [feature-area]/
│       └── spec.md
└── changes/                        # Active work
    ├── [change-name]/
    │   ├── proposal.md             # Problem, solution, scope
    │   ├── tasks.md                # Implementation checklist
    │   └── specs/
    │       └── [feature-area]/
    │           └── spec.md         # Delta (ADDED/MODIFIED/REMOVED)
    └── archive/                    # Completed changes
```

## When to Use

**✅ USE:**
- Complex features (multi-step)
- Multiple components affected
- Team collaboration needed
- Unclear requirements

**❌ SKIP:**
- Typo fixes
- Single-line bug fixes
- Trivial refactoring
- Config updates

## Spec Delta Format

```markdown
## ADDED Requirements

### Requirement: [Name]

System SHALL [mandatory behavior].

#### Scenario: [Name]
**Given:** [initial state]
**When:** [action]
**Then:** [expected outcome]

## MODIFIED Requirements

### Requirement: [Name]

[Complete UPDATED text]

## REMOVED Requirements

### Requirement: [Name]

[Why removed]
```

## Commands (If CLI Installed)

```bash
openspec list                    # View active changes
openspec view                    # Interactive dashboard
openspec show <change>           # Display change details
openspec validate <change>       # Check spec formatting
openspec archive <change>        # Archive + auto-merge
```

Claude uses these **automatically** if CLI is available.

## Integration with TDD

```
For each task in tasks.md:
  1. Reference spec requirement
  2. Write failing test (RED)
  3. Watch test fail
  4. Write minimal code (GREEN)
  5. Watch test pass
  6. Refactor
  7. Mark task complete
```

## Proposal Template

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

## Verification Checklist

**Before archiving:**
- [ ] Proposal created
- [ ] Stakeholder approval received
- [ ] Spec delta created with scenarios
- [ ] All tasks completed
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Success criteria met

## Standalone vs CLI Mode

| Feature | Without CLI | With CLI |
|---------|-------------|----------|
| Create proposal | ✅ | ✅ |
| Create specs | ✅ | ✅ |
| Create tasks | ✅ | ✅ |
| TDD implementation | ✅ | ✅ |
| Format validation | ❌ | 🎁 |
| Dashboard | ❌ | 🎁 |
| Auto-archiving | ❌ | 🎁 |
| AGENTS.md integration | ❌ | 🎁 |

## Example Flow (Standalone)

```bash
# Claude automatically creates:
mkdir -p openspec/specs
mkdir -p openspec/changes/user-auth/specs/auth

# Creates proposal.md, specs/, tasks.md
# Implements with TDD
# Archives manually:
mv openspec/changes/user-auth openspec/changes/archive/

# Merges specs into openspec/specs/
```

## Example Flow (With CLI)

```bash
# Claude automatically creates structure
# Plus:
openspec validate user-auth      # Validates format
# Implements with TDD
openspec archive user-auth       # Auto-archive + merge
```

## Quick Start

```bash
# 1. Skill already installed ✅

# 2. (Optional) Install CLI for bonus features
npm install -g @fission-ai/openspec@latest

# 3. In Claude Code say:
"Add user authentication"

# Claude: "I'm using the OpenSpec workflow..."
# [creates specs, proposal, implements with TDD]
```

## Troubleshooting

**"OpenSpec CLI not found"**
- That's fine! Standalone mode works perfectly
- Install CLI only if you want validation/dashboard

**"Should I install CLI?"**
- Want validation/dashboard? → Yes
- Happy with manual workflow? → No, optional

**"Do I need `openspec init`?"**
- NO! Skill creates structure for you

## Key Differences from Original

**v1 (Original):**
- ❌ Required `npm install -g @fission-ai/openspec`
- ❌ Required `openspec init` in each project
- ❌ Didn't work without CLI

**v2 (Hybrid - Current):**
- ✅ Works immediately, no dependencies
- ✅ No `openspec init` needed
- ✅ CLI is optional bonus

## Getting Help

- **Usage:** See NAVOD-CZ.md (Czech) or README.md
- **Examples:** See EXAMPLES.md
- **Full docs:** See SKILL.md
- **OpenSpec CLI:** https://github.com/Fission-AI/OpenSpec

---

**Remember: Skill works immediately. CLI is optional for validation/dashboard/auto-archiving.**
