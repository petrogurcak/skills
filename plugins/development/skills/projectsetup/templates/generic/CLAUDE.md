# Claude Development Principles - Quick Reference

This project follows framework-free development principles focused on **TDD**, **Git Safety**, and **Verification**.

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
