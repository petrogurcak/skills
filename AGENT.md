<!-- Shared agent instructions: Claude Code reads via CLAUDE.md symlink, Gemini CLI via GEMINI.md symlink -->

# Development Principles - Quick Reference

This project follows framework-free development principles focused on **TDD**, **Git Safety**, and **Verification**.

## Session Context

This project uses session context for continuity between sessions.

**At session start:**

- Agent automatically loads `.claude/ACTIVE_CONTEXT.md`
- Announces where we left off and continues

**At session/task end:**

- Agent updates ACTIVE_CONTEXT.md with current state
- Logs important decisions to DECISIONS.md

**Manual commands:**

- "Načti kontext" / "Load context" - display current state
- "Ulož kontext" / "Save context" - save current state

## Quick Links

- **[Core Principles](.claude/CORE_PRINCIPLES.md)** - 13 core development principles
- **[Workflows](.claude/WORKFLOWS.md)** - TDD workflow, Bug fixes, Git operations
- **[Checkpoints](.claude/CHECKPOINTS.md)** - When to ask vs when to proceed automatically

## TL;DR

**Before writing ANY code:**

1. **Create a branch** (never work on main/master)
2. **Write the test first** (RED phase)
3. **Watch it fail** (confirms test actually tests something)
4. **Write minimal code** to pass (GREEN phase)
5. **Refactor** if needed
6. **Run all tests + static analysis** before committing
7. **Ask before committing** (unless auto-approved in settings)

## Critical Rules

### Always Do

- Branch first, commit later
- Test first, code second
- Verify before claiming success
- Ask at checkpoints (see CHECKPOINTS.md)
- Run full test suite before commits

### Never Do

- Work directly on main/master
- Write code before tests
- Commit without verification
- Skip static analysis
- Assume tests pass without running them

## Workflow Skills

### Feature Implementation

**Use `development-workflow` skill** for any feature implementation:

```
User: "Implement feature X"
-> Skill orchestrates: Brainstorm -> Plan -> Branch -> Docs -> TDD -> Verify -> Review -> Finish
```

### Complex Features (API/Multi-step)

**Use `openspec-workflow` skill** for complex features requiring specs:

```
User: "Add user authentication with multiple endpoints"
-> Skill orchestrates: Proposal -> Align -> Specs -> Tasks -> TDD -> Archive
```

### Bug Fixes

**Use `systematic-debugging` skill**:

```
User: "Fix bug X"
-> Skill orchestrates: Investigate -> Hypothesize -> Verify -> Fix with TDD
```

## Project Commands

```bash
# Run tests
npm test           # or: pytest, cargo test, etc.

# Run static analysis
npm run lint       # or: mypy, clippy, phpstan, etc.

# Run build
npm run build      # or: cargo build, etc.
```

## Project-Specific Customizations

See Section 8 in [CORE_PRINCIPLES.md](.claude/CORE_PRINCIPLES.md) for any project-specific rules and conventions.

---

**Setup Type:** Generic (Framework-free)
**Last Updated:** {{DATE}}

---

# SKILLS & PLUGINS

## Architektura

Skills jsou organizovány v **private GitHub repo** `petrogurcak/skills` jako **marketplace s pluginy**.

```
~/Projects/skills/                    # SOURCE OF TRUTH (GitHub repo)
├── .claude-plugin/
│   └── marketplace.json              # Pro Claude Code marketplace
├── plugins/
│   ├── seo/                          # Plugin = tematická skupina skills
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   └── skills/
│   │       ├── seo-optimization/
│   │       │   └── SKILL.md
│   │       └── .../
│   ├── growth/
│   ├── marketing/
│   ├── copywriting/
│   ├── development/
│   ├── review/
│   ├── ux/
│   ├── branding/
│   ├── product/
│   ├── legal/
│   ├── utilities/
│   ├── creative/
│   ├── children-books/
│   ├── gastro/
│   └── team/
└── README.md

# Symlinky směřují DO source:
~/.claude/plugins/cache/skills/       # Claude Code (kopie)
~/Library/.../skills/                 # Cowork (symlinky → source)
```

## Dual-system architektura

| Systém          | Odkud čte skills                                   | Jak se aktivuje           |
| --------------- | -------------------------------------------------- | ------------------------- |
| **Claude Code** | `~/.claude/plugins/cache/skills/`                  | Plugin marketplace system |
| **Cowork**      | `~/Library/Application Support/Claude/.../skills/` | Symlinky na source        |

### Cowork skills lokace (obsahuje UUID):

```
~/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/803e4d51-6951-4e8b-86ba-07e2a6118f12/a8e7d198-e221-402c-b591-385eb8ba7245/skills/
```

**Poznámka:** UUID se může změnit. Pokud skills v Cowork zmizí, najdi novou cestu a znovu vytvoř symlinky.

## 15 pluginů (102 skills)

| Plugin             | Skills | Popis                                                                                                                                                                                                                     |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **development**    | 31     | Workflows (Flutter, Expo, FastAPI, frontend), planning, debugging, verify, demo, finish, projectsetup, agent design, session-context, openspec, designing-abstractions, ralph-loop, sentry-fix, analytics, second-opinion |
| **seo**            | 13     | Orchestrator, on-page, technical, schema, images, sitemaps, i18n, keywords, links, competitors, programmatic, AI-ready, ASO                                                                                               |
| **copywriting**    | 11     | Orchestrator, IG family (ig-orchestrator + ig-content + ig-strategy), web/product copy, newsletter, storytelling, brand-voice, knowledge-book, writing-clearly-and-concisely                                              |
| **marketing**      | 8      | Orchestrator, offers, UVP, analytics-setup, pricing, competitive-analysis, launch-strategy, sell-like-crazy (Sabri Suby 8-phase direct response)                                                                          |
| **review**         | 8      | Orchestrator (deep-review), API/database/security review, abstraction-review, plan-challenger, compliance-reviewer, quality-reviewer                                                                                      |
| **growth**         | 6      | Orchestrator, growth-hacking, PLG, SaaS bootstrap, referral-program, churn-prevention, finance-ops                                                                                                                        |
| **product**        | 6      | Orchestrator, discovery, prioritization, strategy, PMF, metrics                                                                                                                                                           |
| **legal**          | 4      | Orchestrator, GDPR, labor-law, e-commerce legislation                                                                                                                                                                     |
| **ux**             | 4      | Orchestrator, optimization, expert dialogue, ui                                                                                                                                                                           |
| **branding**       | 3      | Brand naming, brand strategy, logo design                                                                                                                                                                                 |
| **children-books** | 3      | Storywriting, illustration (Banana), DTP & Typography                                                                                                                                                                     |
| **utilities**      | 2      | Mac cleanup, cowork-setup                                                                                                                                                                                                 |
| **creative**       | 1      | Image generation — Ideogram 3.0 + Nanobanana (Imagen 4). Cowork-friendly (bash + REST, no MCP). Keys via 1Password (`Dev/shared-keys`) → env → `.env`. First-run `setup.sh` instructs user.                                |
| **gastro**         | 1      | Gastro education persona — kurzy, knihy, videa pro restauratéry                                                                                                                                                           |
| **team**           | 1      | AI team briefing — virtual personas review plans cross-functionally                                                                                                                                                       |

## SKILL.md formát

**POVINNÝ YAML frontmatter** (pluginy ho vyžadují):

```markdown
---
name: skill-name
description: Use when... (popis kdy použít)
---

# Skill Name

Obsah skillu...
```

## Workflow: Úprava skillu

1. **Edituj v source repo:**

   ```bash
   ~/Projects/skills/plugins/<plugin>/skills/<skill>/SKILL.md
   ```

2. **Commit & push:**

   ```bash
   cd ~/Projects/skills
   git add -A && git commit -m "Update skill" && git push
   ```

3. **Update Claude Code cache:**
   ```bash
   cd ~/.claude/plugins/marketplaces/skills && git pull
   for p in seo growth marketing copywriting development review ux branding product team; do
     cp -r plugins/$p/. ~/.claude/plugins/cache/skills/$p/1.0.0/
   done
   ```

## Workflow: Nový skill

1. **Vytvoř skill soubor:**

   ```bash
   mkdir ~/Projects/skills/plugins/<plugin>/skills/<novy-skill>
   # Vytvoř SKILL.md s YAML frontmatter (viz formát výše)
   ```

2. **Sync symlinky pro Gemini CLI + Cowork (povinný krok):**

   ```bash
   ~/.claude/scripts/sync-skills-symlinks.sh
   ```

   Script je idempotentní — vytvoří chybějící symlinky, opraví přesunuté, smaže broken. Spouštěj po KAŽDÉM:
   - novém skillu
   - přesunu skillu mezi pluginy (např. `copywriting/children-stories` → `children-books/children-stories`)
   - přejmenování skillu
   - smazání skillu

   **Důvod:** Claude Code používá plugin marketplace cache system (kopírování), ale Gemini CLI a Cowork používají symlinky. Bez sync skriptu jsou out-of-date a nové skills nevidí.

3. **Commit, push, update Claude Code cache** (viz Workflow: Úprava skillu)

## Workflow: Nový plugin

1. Vytvoř složku: `~/Projects/skills/plugins/<novy-plugin>/.claude-plugin/`
2. Vytvoř `plugin.json`:
   ```json
   {
     "name": "<novy-plugin>",
     "version": "1.0.0",
     "description": "...",
     "author": { "name": "Petr" },
     "skills": "./skills/"
   }
   ```
3. Přidej do `.claude-plugin/marketplace.json`
4. Commit & push do GitHub
5. `cd ~/.claude/plugins/marketplaces/skills && git pull`
6. Restartni Claude Code, `/plugins` → najdi plugin → klikni install

**DŮLEŽITÉ:** Neupravuj `installed_plugins.json` manuálně! Claude Code potřebuje instalaci přes `/plugins` UI — přidává `gitCommitSha` a validuje plugin. Bez toho se skill nezobrazí.

## Volání skills

**Claude Code:**

```
/seo:seo-optimization
/copywriting:copywriting-orchestrator
/development:flutter-workflow
```

**Cowork:** Vyber `~/Projects/skills/` jako working folder, skills se načtou automaticky z `.skills/skills/`
