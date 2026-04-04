# 🎯 Development Guide

This project follows structured development principles.

## 🚀 Quick Start

**Before any code:**
1. Read `.claude/CORE_PRINCIPLES.md` - 11 core principles
2. Understand `.claude/WORKFLOWS.md` - TDD workflow
3. Check `.claude/CHECKPOINTS.md` - When to ask vs auto

## 📋 Core Principles Summary

1. **TDD IS MANDATORY** - Tests before code (RED → GREEN → REFACTOR)
2. **GIT BRANCH FIRST** - Create branch before any implementation
3. **VERIFICATION RULES** - Tests + Static analysis = 0 errors
4. **NEVER AUTO** - Ask before destructive actions
5. **MINIMAL CHANGE** - Only relevant files
6. **FALSE POSITIVE PREVENTION** - Real proof required

## 🔄 Quick Workflow

**For new features:**
```
1. Git Branch First 🌿
   └─ Ask: "Create branch? (yes/no)"

2. TDD Cycle
   ├─ RED: Write failing test ❌
   ├─ GREEN: Implement ✅
   └─ REFACTOR: Improve 🔧

3. Verify ✅
   ├─ Run tests → All passed
   ├─ Run static analysis → 0 errors
   └─ Run application → App starts

4. Ask to commit
   └─ "Commit? (yes/no)"
```

**For bugs:**
```
1. Git Branch First 🌿
2. Reproduction test → Must fail
3. Fix → Minimal change
4. Verify → Test passes + All tests pass
5. Ask to commit
```

## 🛠 Tech Stack

**Customize this section for your project:**
- Language: [Your language]
- Framework: [Your framework]
- Test command: [Your test command]
- Linter: [Your linter]

## ⚠️ Critical Rules

**Customize `.claude/CORE_PRINCIPLES.md` Section 8 for project-specific rules.**

Examples:
- Multi-tenancy: Every query must filter by tenant_id
- Security: All user input must be validated
- Architecture: Follow repository pattern

## 🔗 Documentation

- `.claude/CORE_PRINCIPLES.md` - Complete principles
- `.claude/WORKFLOWS.md` - Detailed workflows
- `.claude/CHECKPOINTS.md` - When to ask vs auto

---

**Ready to develop! Start with: "Implement [feature]"**
