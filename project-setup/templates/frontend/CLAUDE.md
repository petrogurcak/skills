# 🎯 Frontend Development Guide

This project uses Vite + TypeScript + Tailwind + Alpine.js with TDD and docs-first principles.

## 🚀 Quick Start

**Before any code:**
1. Read `.claude/CORE_PRINCIPLES.md` - 11 core principles + Frontend rules
2. Understand `.claude/WORKFLOWS.md` - TDD workflow with Frontend
3. Check `.claude/CHECKPOINTS.md` - When to ask

## 📋 Frontend Workflow

**For new features (e.g., "Create product grid"):**
```
1. Git Branch First 🌿
   └─ Ask: "Create branch? (yes/no)"

2. Docs-First ⚠️ MANDATORY
   ├─ fetch_tailwind_docs(topic: "grid")
   ├─ fetch_alpine_patterns(directive: "x-for")
   └─ get_ecommerce_ui_pattern(pattern: "product-grid")

3. TDD Cycle
   ├─ RED: Write failing test ❌
   ├─ GREEN: Implement using docs ✅
   └─ REFACTOR: Improve 🔧

4. Verify ✅
   ├─ npm test → All passed
   ├─ npm run lint → 0 errors
   └─ npm run dev → App starts

5. Ask to commit
   └─ "Commit? (yes/no)"
```

## 🛠 Tech Stack

- **Vite 6.x**
- **TypeScript 5.7+**
- **Tailwind CSS 4.1+**
- **Alpine.js 3.x**
- **Test**: `npm test`
- **Lint**: `npm run lint`

## 📚 MCP Tools (Docs-First)

Available via `frontend-workflow.skill`:
- `fetch_tailwind_docs(topic)` - Grid, flex, responsive, colors
- `fetch_alpine_patterns(directive)` - x-data, x-model, x-show, x-if, x-for
- `fetch_vite_config(topic)` - Plugins, optimization, build
- `fetch_typescript_config(topic)` - Strict mode, path aliases
- `search_tailwind_utilities(query)` - Search specific utilities
- `get_ecommerce_ui_pattern(pattern)` - Production-ready e-commerce components

## ⚠️ Critical Frontend Rules

From `.claude/CORE_PRINCIPLES.md` Section 8:

1. **TypeScript MUST:**
   - Use strict mode
   - Type everything (no `any`)
   - Use interfaces for data

2. **Tailwind MUST:**
   - Use utility classes (no custom CSS)
   - Follow responsive patterns
   - Use Tailwind 4.1+ CSS-first config

3. **Alpine.js MUST:**
   - Use n:attributes equivalent patterns
   - Keep state close to usage
   - Follow reactive patterns

## 🔗 Active Skills

- **project-setup** - Initial setup (done!)
- **frontend-workflow** - Development workflows + MANDATORY docs-first

## 📖 Documentation

- `.claude/CORE_PRINCIPLES.md` - Complete principles + Frontend rules
- `.claude/WORKFLOWS.md` - TDD with Frontend commands
- `.claude/CHECKPOINTS.md` - When to ask

---

**Ready! Try: "Create product grid with Tailwind and Alpine"**
