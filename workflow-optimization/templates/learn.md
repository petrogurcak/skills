# /learn - Extract Reusable Patterns

Analyze current session and extract patterns worth saving as skills.

## When to Run

- After solving a non-trivial problem
- When you discover a useful workaround
- After debugging something tricky

## What to Extract

1. **Error Resolution** - How specific errors were resolved
2. **Debugging Techniques** - Non-obvious debugging approaches
3. **Workarounds** - Library/framework quirks and solutions
4. **Project Patterns** - Codebase conventions discovered

## Process

1. Review session for extractable patterns
2. Identify most valuable/reusable insight
3. Draft skill file:

```markdown
# [Pattern Name]

**Extracted:** [Date]
**Context:** [When this applies]

## Problem
[What problem this solves]

## Solution
[The pattern/technique/workaround]

## Example
[Code example if applicable]

## When to Use
[Trigger conditions]
```

4. Ask user to confirm before saving
5. Save to `~/.claude/skills/learned/[pattern-name].md`

## Don't Extract

- Trivial fixes (typos, simple syntax errors)
- One-time issues (specific API outages)
- Project-specific config that won't repeat
- Things already documented elsewhere
