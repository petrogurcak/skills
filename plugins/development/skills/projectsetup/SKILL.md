---
name: projectsetup
description: Use when user says "Setup this project" - creates CLAUDE.md and .claude/ with development principles (Generic/Nette/Flutter/Frontend)
---

# 🚀 Project Setup Skill

## When to Use

Use this skill when:
- User says "Setup this project" or "Initialize this project"
- User says "Configure development environment"
- User says "Setup Claude for this project"
- Empty or new project directory (no CLAUDE.md exists)

## What This Skill Does

**Creates development principles structure:**
- `CLAUDE.md` - Entry point with quick reference + **development-workflow** skill reference
- `.claude/CORE_PRINCIPLES.md` - 11 core principles (TDD, Git, Verification, etc.)
- `.claude/WORKFLOWS.md` - TDD workflow, Bug Fix, Git operations
- `.claude/CHECKPOINTS.md` - When to ask vs auto
- `.claude/settings.local.json` - Project permissions
- `.claude/ACTIVE_CONTEXT.md` - Session context (where you left off)
- `.claude/DECISIONS.md` - Architectural decisions log

**Integrates with workflow orchestration:**
- `CLAUDE.md` includes reference to `development-workflow` skill
- This skill orchestrates: Brainstorming → Planning → Framework-specific implementation → Review
- Ensures proper skill sequence for all feature implementations

**Supports 4 variants:**
- **Generic** - Framework-free, pure principles (TDD, Git, Verification)
- **Nette** - Integrates with nette-workflow.skill + principles
- **Flutter** - Integrates with flutter-workflow.skill + principles
- **Frontend** - Integrates with frontend-workflow.skill + principles

## Important Notes

**This skill creates PRINCIPLES, not framework workflows:**
- ✅ TDD (Test-Driven Development)
- ✅ Git Safety (Branch first, ask before commit)
- ✅ Verification (Tests + Static analysis mandatory)
- ✅ Checkpoints (When to ask vs auto)
- ✅ False Positive Prevention

**Framework-specific workflows are in separate skills:**
- `nette-workflow.skill` - Nette development + MANDATORY docs-first
- `flutter-workflow.skill` - Flutter development + MANDATORY docs-first
- `frontend-workflow.skill` - Frontend development + MANDATORY docs-first

---

## Process

### Step 1: Detect Context

Check if setup is needed:
```
Is there CLAUDE.md in current directory?
├─ NO → Continue to Step 2
└─ YES → Ask: "CLAUDE.md exists. Overwrite? (yes/no)"
           ├─ yes → Continue to Step 2
           └─ no → Stop
```

### Step 2: Ask Variant

```
❓ Which project type?

   A) Generic (Framework-free)
      → Pure principles: TDD, Git safety, Verification
      → No framework-specific rules
      → Works with ANY tech stack

   B) Nette (PHP + Latte + Tracy)
      → Principles + Nette critical rules
      → Integration with nette-workflow.skill
      → Commands: composer test, phpstan

   C) Flutter (Dart + Flutter)
      → Principles + Flutter critical rules
      → Integration with flutter-workflow.skill
      → Commands: flutter test, flutter analyze

   D) Frontend (Vite + TypeScript + Tailwind + Alpine)
      → Principles + Frontend critical rules
      → Integration with frontend-workflow.skill
      → Commands: npm test, npm run lint

   Choice (A/B/C/D):

[WAIT FOR ANSWER]
```

### Step 2.5: Select MCP Servers

**Purpose:** Prevent context bloat by enabling only relevant MCP servers per project.

**Registry:** `~/.claude/mcp-registry.yaml` contains all available servers with categories and variant mappings.

```
1. Read ~/.claude/mcp-registry.yaml
2. Filter servers by chosen variant (Step 2):
   - Show servers where `variant` matches chosen type
   - Show all servers without `variant` (universal)
   - Mark `phase: true` servers separately
3. Present to user:

❓ Which MCP servers for this project?

   Recommended for [variant]:
   [x] nette-mcp - Nette PHP framework documentation
   [ ] code-mode - Complex TypeScript workflows

   Monitoring (enable if needed):
   [ ] sentry - Sentry error tracking
   [ ] stripe - Stripe payments

   Phase-based (activate later when needed):
   ℹ google-analytics - GA4 reporting (use: mcp-activate.sh add google-analytics)
   ℹ gtm - Google Tag Manager (use: mcp-activate.sh add gtm)
   ℹ notebooklm - NotebookLM queries (use: mcp-activate.sh add notebooklm)
   ℹ claude-in-chrome - Browser automation (use: mcp-activate.sh add claude-in-chrome)

   [WAIT FOR ANSWER - user selects which permanent servers to enable]

4. For each selected server, run:
   claude mcp add --scope project <server-name> -- <command> <args>
   (or --transport http for HTTP servers)

5. This creates .mcp.json in project root with project-scoped servers
```

**Important:** Phase-based servers are NOT added during setup. User activates them on-demand:
```bash
~/.claude/scripts/mcp-activate.sh add google-analytics   # when doing analytics
~/.claude/scripts/mcp-activate.sh remove google-analytics # when done
```

### Step 3: Create Files

Based on choice, copy template files from skill directory:

**Template source locations:**
- Generic: `~/.claude/skills/project-setup/templates/generic/`
- Nette: `~/.claude/skills/project-setup/templates/nette/`
- Flutter: `~/.claude/skills/project-setup/templates/flutter/`
- Frontend: `~/.claude/skills/project-setup/templates/frontend/`

**Files to copy for each variant:**
1. `CLAUDE.md` → Current directory
2. `.claude/CORE_PRINCIPLES.md` → Create `.claude/` directory first
3. `.claude/WORKFLOWS.md`
4. `.claude/CHECKPOINTS.md`
5. `.claude/settings.local.json`
6. `.claude/ACTIVE_CONTEXT.md` → Session context template
7. `.claude/DECISIONS.md` → Decisions log template

**Process:**
```
1. Create `.claude/` directory if it doesn't exist
2. Read template files from appropriate variant directory
3. Write files to current project directory
8. If user wants Playwright scaffold:
   - Copy files from templates/playwright-scaffold/ to current project
   - Run: npm install -D @playwright/test && npx playwright install chromium
```

### Step 4: Inform User

```
✅ Project setup complete!

Created files:
- CLAUDE.md
- .claude/CORE_PRINCIPLES.md
- .claude/WORKFLOWS.md
- .claude/CHECKPOINTS.md
- .claude/settings.local.json
- .claude/ACTIVE_CONTEXT.md
- .claude/DECISIONS.md

Project type: [Generic/Nette/Flutter/Frontend]

MCP servers configured:
- Project-scoped: [list of enabled servers]
- Phase-based (activate when needed):
  - `~/.claude/scripts/mcp-activate.sh add <name>` to enable
  - `~/.claude/scripts/mcp-activate.sh remove <name>` to disable
  - `~/.claude/scripts/mcp-activate.sh list` to see available

Session context enabled:
- .claude/ACTIVE_CONTEXT.md - tracks where you left off + workflow maturity
- .claude/DECISIONS.md - logs architectural decisions
- Context loads automatically at session start
- Use `session-context` skill for manual control

Next steps:
1. Read CLAUDE.md for quick reference
2. Customize Section 8 in CORE_PRINCIPLES.md if needed
3. Start developing with: "Use development-workflow skill to implement [feature]"

Want to add Playwright e2e scaffold?
→ Yes: I'll create e2e/ directory structure with Playwright config and fixtures
→ No: You can add it later manually

Want to add workflow optimization (mistakes tracking, verification checklist, code quality hooks)?
→ Yes: I'll run workflow-optimization skill now
→ No: You can add it later with "Use workflow-optimization skill"

Active skills for development:
- development-workflow ← Orchestrates: Brainstorming → Planning → Implementation → Review
- [If framework:] [nette-framework/flutter-workflow/frontend-workflow] ← Executes implementation with docs-first TDD

Workflow sequence:
User: "Use development-workflow skill to implement [feature]"
→ Brainstorming (design phase)
→ Write plan (task breakdown)
→ Framework skill execution (docs-first + TDD + verification)
→ Code review (validation)
→ Finishing branch (merge/PR)
```

---

## Summary

This skill:
- ✅ Creates `.claude/` structure with TDD, Git safety, Verification principles
- ✅ Integrates with `development-workflow` skill for orchestration
- ✅ Supports 4 variants: Generic (framework-free), Nette, Flutter, Frontend
- ✅ Integrates with existing framework workflow skills (nette-framework, flutter-workflow, frontend-workflow)
- ✅ Template files stored in `~/.claude/skills/project-setup/templates/`
- ✅ Customizable Section 8 for project-specific rules
- ✅ Session context for continuity between sessions (ACTIVE_CONTEXT.md, DECISIONS.md)
- ✅ MCP server selection per project (prevents context bloat from unused servers)
- ✅ Phase-based MCP activation for temporary tools (analytics, research, browser)

**Usage:** User says "Setup this project" → AI creates CLAUDE.md + .claude/ → Ready to develop with workflow orchestration!

**Workflow Architecture:**
```
Project Setup (Constitutional Law - this skill)
       ↓ creates principles + references
Development Workflow (Orchestration - development-workflow skill)
       ↓ sequences
Framework Skills (Execution - nette/flutter/frontend skills)
       ↓ supported by
Superpowers (Support - brainstorming, planning, review)
```

**Template files:**
- Generic: Pure TDD principles, no framework rules + workflow reference
- Nette: + Nette critical rules (DI, Latte, Database patterns) + workflow reference
- Flutter: + Flutter critical rules (immutable widgets, state management, null safety) + workflow reference
- Frontend: + Frontend critical rules (TypeScript strict, Tailwind utilities, Alpine patterns) + workflow reference
