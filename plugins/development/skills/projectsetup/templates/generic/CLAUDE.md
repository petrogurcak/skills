# Claude Development Principles - Quick Reference

This project follows global rules + project-specific principles.

## Global Rules (loaded automatically)

Claude Code loads these from `~/.claude/CLAUDE.md` for every session:

- **`~/.claude/RULES.md`** — META rules: communication, language, file organization, doc-first, conflict detection, skills repo conventions
- **`~/.claude/CODING.md`** — code standards: anti-duplication, Rule of Three, cross-layer consistency, naming across boundaries, TS/SQL/Web/Python/Bash, Git, Security

This project document covers **project-specific additions and exceptions** to those global rules. Do not duplicate global rule content here — reference it.

## Session Context

This project uses session context for continuity between Claude sessions.

**At session start:**

- Claude automatically loads `.claude/ACTIVE_CONTEXT.md`
- Announces where we left off and continues

**At session/task end:**

- Claude updates ACTIVE_CONTEXT.md with current state
- Logs important decisions to DECISIONS.md

**Manual commands:**

- "Načti kontext" / "Load context" - display current state
- "Ulož kontext" / "Save context" - save current state

## Quick Links

- **[Core Principles](.claude/CORE_PRINCIPLES.md)** - 14 core development principles
- **[Workflows](.claude/WORKFLOWS.md)** - TDD workflow, Bug fixes, Git operations
- **[Checkpoints](.claude/CHECKPOINTS.md)** - When to ask vs when to proceed automatically

## TL;DR — Always-Applied Discipline

1. **Branch first** — never work on main/master
2. **Test first (TDD)** — RED → GREEN → REFACTOR
3. **Verify before claiming complete** — tests + lint + build with output as evidence
4. **Code consistency** — see `~/.claude/CODING.md > Obecné principy psaní kódu` (grep before helper, Rule of Three, cross-layer check, naming boundaries, no god-functions/stringly-typed dispatchers)
5. **Commit only when user explicitly asks**

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

### Consistency Audit

**Use `review:consistency` skill** to find drift in existing code (cross-layer inconsistency, dead code, naming drift, file group structure):

```
User: "/consistency"
-> Skill: Pre-flight -> Explore agent -> Categorize -> Interactive walkthrough (A/B/C/D)
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

## Výjimky z obecných pravidel

Per-project odchylky od `~/.claude/RULES.md` nebo `~/.claude/CODING.md`. Always include source + reason + plan.

Format:

```
- **<rule name>** (source: RULES.md > <section> | CODING.md > <section>)
  - Reason: <why this project diverges>
  - Plan: <by when, or "won't fix" with justification>
```

(empty by default — populated as project diverges from global rules)

## Consistency

Items evaluated during `/consistency` audit as "won't fix". Future audits skip these.

```
- **YYYY-MM-DD** — *<title>*: <reason>
  - Locations: <file:line, ...>
```

(empty by default — auto-populated by `/consistency` skill on user choice "Skip")

---

**Setup Type:** Generic (Framework-free)
**Last Updated:** {{DATE}}
