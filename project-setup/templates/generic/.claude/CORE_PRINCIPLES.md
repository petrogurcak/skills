# 🎯 CORE PRINCIPLES - Highest Priority

**These rules ALWAYS apply. In case of conflict with other instructions, this wins.**

---

## 1. INSTRUCTION HIERARCHY

In case of conflict between files, this order applies:

```
1. CORE_PRINCIPLES.md (this file)     ← TOP
2. WORKFLOWS.md (how to work)
3. CHECKPOINTS.md (when to ask)
4. Project-specific documentation
5. README files                        ← BOTTOM
```

**Example conflict:**
- WORKFLOWS.md says: "Create branch automatically"
- CHECKPOINTS.md says: "Ask before creating branch"
- **→ CHECKPOINTS.md wins (higher in hierarchy)**

---

## 2. NEVER AUTO (Always ask BEFORE action)

**🔴 Destructive actions (NEVER without confirmation):**
- ❌ Modify production code
- ❌ Create/delete files
- ❌ Create git branches
- ❌ Commit changes
- ❌ Push to remote
- ❌ Merge branches
- ❌ Delete branches
- ❌ Change dependencies (package.json, requirements.txt, composer.json, etc.)

**How to ask:**
```
"I'm about to modify src/features/auth/login.js. Proceed?"
[Wait for confirmation]
```

---

## 3. ALWAYS DO (Without asking)

**✅ Read-only actions (automatic):**
- ✅ Read files
- ✅ Analyze code
- ✅ Run tests (read-only)
- ✅ Search in codebase
- ✅ Provide reasoning/explanation
- ✅ Create test files (if part of TDD workflow)

**How to report:**
```
"Analyzed 5 files. Found..."
[Show results without asking]
```

---

## 4. VERIFICATION RULES

### 4.1 Hierarchy of proof (from most important):

**Level 1: MANDATORY (required)**
```bash
run test suite       # MUST pass
run static analysis  # 0 errors
```

**Level 2: RECOMMENDED**
```bash
run application      # Verify app starts
```

**Level 3: OPTIONAL (only if user asks)**
```bash
take screenshot      # Screenshot
```

**Level 4: RARE (only on explicit request)**
```
E2E tests  # Only if user explicitly says "I need E2E test"
```

### 4.2 False Positive Prevention

**❌ NEVER say "done" without:**
- ✅ Test suite output (all tests passed)
- ✅ Static analysis output (0 errors)

**❌ NEVER claim "should work"**
- Only: "Tests passed ✅" or "Tests failed ❌"

**❌ NEVER skip verification**
- Even for "small change" run tests

---

## 5. MINIMAL CHANGE PRINCIPLE

**Definition:** Change ONLY files directly related to the task.

**✅ Good example:**
```
Task: "Fix login button color"
Changes:
  - components/LoginButton.css (1 line)
  - components/LoginButton.test.js (update test)
Total: 2 files
```

**❌ Bad example:**
```
Task: "Fix login button color"
Changes:
  - components/LoginButton.css
  - styles/theme.css (refactor entire theme system)
  - components/LoginScreen.jsx (redesign)
  - 15 other files...
Total: 18 files  ← TOO MANY!
```

**Rule:**
- 1 file = ideal
- 2-3 files = OK
- 5+ files = ask: "This will affect N files. Proceed?"

**Exceptions:**
- Rename/refactor where it's NECESSARY to change multiple files
- But always inform user BEFOREHAND about scope

---

## 6. TDD IS MANDATORY (except exceptions)

**✅ When to write tests FIRST (TDD):**
- New feature
- Bug fix
- Business logic change
- API change

**❌ When tests are NOT needed:**
- Documentation (.md files)
- Configuration files (.json, .yaml, .toml)
- README updates

**TDD Cycle:**
```
1. RED:    Write test → Test fails ❌
2. GREEN:  Implement → Test passes ✅
3. REFACTOR: Improve code → Tests still ✅
```

---

## 7. GIT WORKFLOW

**❌ NEVER automatically:**
- Create branches
- Commit
- Merge

**✅ ALWAYS ask:**
```
"Task completed. Do you want to:
1. Create branch feature/x?
2. Commit changes?
3. Merge into main?"

[Wait for answer for EACH step]
```

**Commit message format:**
```
<type>(<scope>): <description>

Types: feat, fix, docs, refactor, test, chore
Scope: module (auth, api, core)
Description: max 50 characters

Example:
feat(auth): add password reset functionality
fix(api): resolve infinite loading in user detail
docs(readme): update installation instructions
```

---

## 8. PROJECT-SPECIFIC CRITICAL RULES

**⚠️ PLACEHOLDER FOR PROJECT-SPECIFIC SECURITY/ARCHITECTURAL RULES**

When integrating into a project, add critical rules here such as:
- Data isolation requirements (e.g., multitenancy filters)
- Security patterns (e.g., authentication checks)
- Architectural constraints (e.g., API versioning)
- Compliance requirements (e.g., PII handling)

**Example for multi-tenant SaaS:**
```
Every database query MUST contain tenant_id filter.

❌ CRITICAL BUG:
SELECT * FROM guests WHERE status = 'waiting';
// RETURNS DATA FROM ALL TENANTS!

✅ CORRECT:
SELECT * FROM guests
WHERE tenant_id = current_tenant_id
AND status = 'waiting';
```

**Example for regulated industry:**
```
Every user data operation MUST be audited.

❌ MISSING AUDIT:
DELETE FROM users WHERE id = 123;

✅ WITH AUDIT:
audit_log('user_deletion', user_id=123, actor=current_user);
DELETE FROM users WHERE id = 123;
```

---

## 9. SECURITY RULES

**❌ NEVER in code:**
- API keys
- Passwords
- Tokens
- Credentials
- PII in logs (phone, email, SSN)

**✅ ALWAYS:**
- Environment variables (.env)
- Secure storage (vault, secrets manager)
- Masking in logs
- Input validation
- Output escaping

**Example:**
```
// ❌ BAD
console.log('User login: ' + user.email);  // PII in log!

// ✅ GOOD
console.log('User login: userId=' + user.id);  // Just ID
```

---

## 10. BEHAVIOR ON ERROR

**When something doesn't work:**

1. **STOP** - don't continue implementation
2. **ANALYZE** - what is exact error?
3. **REPORT** - show error message to user
4. **ASK** - "Found problem X. How to proceed?"

**❌ NEVER:**
- Hide errors
- Guess solutions
- Continue with broken code

**✅ ALWAYS:**
- Show full error message
- Suggest possible solutions
- Wait for direction from user

---

## 11. GIT BRANCH - ALWAYS FIRST

**🌿 MANDATORY RULE:**

Branch is created BEFORE any implementation (before tests, before code).

### ✅ CORRECT order:

```
1. User: "Implement forgot password"

2. Claude:
   ❓ "I recommend creating branch:
      - feature/forgot-password

      Current branch: main

      Create? (yes/no)"

   [WAITS FOR ANSWER]

3. User: "yes"

4. Claude:
   git checkout -b feature/forgot-password
   ✅ Branch created

5. Claude: ONLY THEN start writing tests and implementation
```

### ❌ WRONG order:

```
1. User: "Implement forgot password"

2. Claude: Starts writing tests ← WRONG! Branch first!

3. Claude: Then suggests branch ← TOO LATE!
```

### 📝 Reasons for "Branch FIRST":

1. **Multi-instance safety** - When working with multiple Claude instances, each creates own branch
2. **Git hygiene** - All work is isolated from main/develop
3. **Clean history** - Everything belonging to feature is on one branch
4. **Easy rollback** - If user says "stop", just delete branch

### 🔄 Integration with workflows:

- **TDD Workflow**: Phase 0 = Branch creation
- **Bug Fix Workflow**: Step 0 = Branch creation

---

## 📋 QUICK CHECKLIST (before "done")

Before each "Task completed" verify:

- [ ] **Branch created FIRST?** (Phase/Step 0 in TDD/Bug Fix workflow)
- [ ] Tests written and passing? (`run test suite`)
- [ ] Analysis passed? (`static analysis` → 0 errors)
- [ ] Changed ONLY relevant files? (Minimal Change)
- [ ] Project-specific rules verified? (Section 8)
- [ ] No secrets in code? (Security check)
- [ ] Asked before destructive actions? (Git, delete, etc.)

**If YES to everything → "Done ✅"**

**If NO to anything → Not done, fix it**

---

## 🚨 EMERGENCY OVERRIDE

**Only exception to ignore this file:**

User explicitly says: **"Ignore CORE_PRINCIPLES and do X"**

In that case:
1. Warn: "⚠️ This violates CORE_PRINCIPLES (reason). Proceed?"
2. If user confirms → Do it
3. Note in commit message: "Override CORE_PRINCIPLES per user request"

**Otherwise: This file is law.**

---

**Read this? → Continue to WORKFLOWS.md for detailed guides**
