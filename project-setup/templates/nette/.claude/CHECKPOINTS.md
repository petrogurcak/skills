# ✋ CHECKPOINTS - When to Ask User

**This file defines when to STOP and ask vs. when to continue automatically.**

---

## 🔴 ALWAYS ASK (Before taking action)

### 1. File Operations

**Creating/modifying production code:**
```
❓ "I'm about to create/modify:
   - src/features/auth/login_service.js
   - src/features/auth/login_screen.js

   Proceed? (yes/no)"

[WAIT FOR ANSWER]
```

**Deleting files:**
```
❓ "Found unused file:
   - src/features/old_feature.js

   Delete? (yes/no)"

[WAIT FOR ANSWER]
```

---

### 2. Git Operations

**Creating branch:**
```
❓ "I recommend creating branch:
   - feature/password-reset

   Create? (yes/no)"

[WAIT FOR ANSWER]
```

**Commit:**
```
❓ "Task completed and verified ✅

   Commit changes? (yes/no)

   Proposed commit message:
   ──────────────────────────────
   feat(auth): add password reset
   ──────────────────────────────"

[WAIT FOR ANSWER]
```

**Merge:**
```
❓ "Branch feature/x is ready.

   Merge into develop? (yes/no)"

[WAIT FOR ANSWER]
```

**Push:**
```
❓ "Changes committed locally.

   Push to origin? (yes/no)"

[WAIT FOR ANSWER]
```

---

### 3. Large Scope Changes

**More than 3 files:**
```
❓ "This task will affect 7 files:
   - src/features/auth/login.js
   - src/features/auth/register.js
   - src/core/router.js
   - src/core/theme.js
   - test/auth/login_test.js
   - test/auth/register_test.js
   - package.json

   Proceed with refactoring? (yes/no)"

[WAIT FOR ANSWER]
```

---

### 4. Breaking Changes

**API changes:**
```
❓ "This change will modify public API:

   BEFORE:
   void login(String email, String password)

   AFTER:
   Future<void> login({required String email, required String password})

   This may break existing code.
   Proceed? (yes/no)"

[WAIT FOR ANSWER]
```

**Database schema:**
```
❓ "Need to change database schema:

   Migration: Add column 'phone_verified' to users table

   Create migration? (yes/no)"

[WAIT FOR ANSWER]
```

---

### 5. Dependencies

**Adding/modifying dependencies:**
```
❓ "Need to add dependency:

   package.json:
   + lodash: ^4.17.21

   Add? (yes/no)"

[WAIT FOR ANSWER]
```

**Upgrading dependencies:**
```
❓ "Found outdated dependency:

   react: ^17.0.2 → ^18.2.0

   Upgrade? (yes/no)"

[WAIT FOR ANSWER]
```

---

### 6. Risky Operations

**Refactoring functional code:**
```
❓ "This code works, but could be better.

   Refactor? (yes/no)

   Risk: May introduce new bugs
   Benefit: Better readability and maintainability"

[WAIT FOR ANSWER]
```

---

## ✅ NEVER ASK (Automatically continue)

### 1. Read Operations

**Reading files:**
```
✅ Read:
   - src/features/auth/login.js
   - test/features/auth/login_test.js

   [CONTINUE without asking]
```

---

### 2. Analysis

**Code analysis:**
```
✅ Analyzed codebase. Found:
   - 3 duplicates
   - 2 unused imports
   - 1 potential bug

   [SHOW RESULTS without asking]
```

**Searching in code:**
```
✅ Found 5 occurrences of 'login' function:
   - src/features/auth/login.js:23
   - src/features/auth/login_service.js:45
   - ...

   [SHOW RESULTS without asking]
```

---

### 3. Tests (Read-only)

**Running tests:**
```
✅ Running tests...

   [Your test command]
   ✅ 47/47 tests passed

   [SHOW RESULTS without asking]
```

---

### 4. Verification Commands

**Static analysis:**
```
✅ [Your linter command]
   ✅ No issues found

   [SHOW RESULTS without asking]
```

**Formatting check:**
```
✅ [Your formatter check command]
   ℹ️ 3 files need formatting

   [SHOW RESULTS without asking, DON'T apply formatting automatically]
```

---

### 5. Reasoning & Explanation

**Explanations:**
```
✅ This code does the following:
   1. Validates input
   2. Calls API
   3. Saves result

   [EXPLAIN without asking]
```

**Suggestions:**
```
✅ I recommend the following improvements:
   1. Add error handling
   2. Improve naming
   3. Refactor duplicate logic

   [SUGGEST without asking, but DON'T IMPLEMENT automatically]
```

---

### 6. Test File Creation (during TDD)

**Creating test file:**
```
✅ Creating test file:
   test/features/auth/login_test.js

   [CREATE without asking - part of TDD workflow]
```

**IMPORTANT:** Test files are OK to create automatically because:
- Part of TDD workflow
- Don't overwrite production code
- User expects tests as first step

---

## 🎯 QUICK DECISION TREE

```
About to perform action...

├─ Is it READ operation? (reading, analysis, tests)
│  └─ YES → ✅ CONTINUE without asking
│
├─ Is it WRITE to production code?
│  └─ YES → ❓ ASK FIRST
│
├─ Is it GIT operation? (branch, commit, merge, push)
│  └─ YES → ❓ ASK FIRST
│
├─ Is it DELETE operation?
│  └─ YES → ❓ ASK FIRST
│
├─ Does it affect 3+ files?
│  └─ YES → ❓ ASK FIRST
│
├─ Is it creating TEST file during TDD?
│  └─ YES → ✅ CONTINUE without asking
│
└─ Is it explanation or suggestion?
   └─ YES → ✅ CONTINUE without asking
```

---

## 📝 ASK TEMPLATES

### Template 1: Simple action
```
❓ I'm about to [ACTION].

   Proceed? (yes/no)
```

### Template 2: With details
```
❓ I'm about to [ACTION]:

   Affected files:
   - file1.js
   - file2.js

   Proceed? (yes/no)
```

### Template 3: With risk
```
❓ I'm about to [ACTION]:

   Risk: [DESCRIPTION OF RISK]
   Benefit: [DESCRIPTION OF BENEFIT]

   Proceed? (yes/no)
```

### Template 4: Git commit
```
❓ Task completed and verified ✅

   Commit? (yes/no)

   Proposed commit message:
   ──────────────────────────────
   [TYPE](scope): description

   - Detail 1
   - Detail 2
   - Tests: X/X passing
   ──────────────────────────────
```

---

## 🚨 EXCEPTIONS

### Only exception when NOT to ask:

User explicitly says:
- "Do it without asking"
- "Automatically commit"
- "Don't ask for every step"

**Even then WARN if risky action:**
```
⚠️ This is destructive action: [DELETE/BREAKING CHANGE/etc.]
   Really proceed without confirmation? (yes/no)
```

---

## ✅ VALIDATION CHECKLIST

Before each action ask yourself:

- [ ] Is it WRITE to production code? → ASK FIRST
- [ ] Is it GIT operation? → ASK FIRST
- [ ] Is it DELETE? → ASK FIRST
- [ ] Does it affect 3+ files? → ASK FIRST
- [ ] Is it risky (breaking change)? → ASK FIRST

If YES to anything → **STOP AND ASK**

If NO to everything → Continue (if READ/ANALYZE)

---

**Understood checkpoints? → Return to work with WORKFLOWS.md**
