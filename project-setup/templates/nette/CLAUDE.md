# 🎯 Nette Development Guide

This project uses Nette Framework with TDD and docs-first principles.

## 🚀 Quick Start

**Before any code:**
1. Read `.claude/CORE_PRINCIPLES.md` - 11 core principles + Nette rules
2. Understand `.claude/WORKFLOWS.md` - TDD workflow with Nette
3. Check `.claude/CHECKPOINTS.md` - When to ask vs auto

## 📋 Nette Workflow

**For new features (e.g., "Create ProductPresenter"):**
```
1. Git Branch First 🌿
   └─ Ask: "Create branch? (yes/no)"

2. Docs-First ⚠️ MANDATORY
   ├─ fetch_nette_docs(topic: "presenter")
   └─ fetch_di_pattern(pattern: "constructor-injection")

3. TDD Cycle
   ├─ RED: Write failing test ❌
   ├─ GREEN: Implement using docs ✅
   └─ REFACTOR: Improve 🔧

4. Verify ✅
   ├─ composer test → All passed
   ├─ vendor/bin/phpstan → 0 errors
   └─ php -S localhost:8000 → App starts

5. Ask to commit
   └─ "Commit? (yes/no)"
```

## 🛠 Tech Stack

- **Nette Framework 3.x+**
- **PHP 8.1+**
- **Latte Templates**
- **Tracy Debugger**
- **Test**: `composer test`
- **Analysis**: `vendor/bin/phpstan`

## 📚 MCP Tools (Docs-First)

Available via `nette-workflow.skill`:
- `fetch_nette_docs(topic)` - Presenters, routing, components, forms, database
- `fetch_latte_syntax(feature)` - n-attributes, blocks, loops, filters, security
- `fetch_tracy_feature(feature)` - Debugging, logging, panels, production
- `fetch_di_pattern(pattern)` - Service registration, factories, decorators

## ⚠️ Critical Nette Rules

From `.claude/CORE_PRINCIPLES.md` Section 8:

1. **Every presenter MUST:**
   - Use constructor DI (not `new`)
   - Extend `Nette\Application\UI\Presenter`
   - Have `declare(strict_types=1)`

2. **Every template MUST:**
   - Use n:attributes (not {link})
   - Trust auto-escaping
   - Never disable escaping without reason

3. **Every database query MUST:**
   - Use `Nette\Database\Explorer`
   - Type return values
   - Handle errors

## 🔗 Active Skills

- **project-setup** - Initial setup (done!)
- **nette-workflow** - Development workflows + MANDATORY docs-first

## 📖 Documentation

- `.claude/CORE_PRINCIPLES.md` - Complete principles + Nette rules
- `.claude/WORKFLOWS.md` - TDD with Nette commands
- `.claude/CHECKPOINTS.md` - When to ask

---

**Ready! Try: "Create ProductPresenter for product listing"**
