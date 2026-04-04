# 🔄 WORKFLOWS - Master Guide

**Single Source of Truth for all workflows.**

---

## 📋 DECISION TREE: Which Workflow When?

```
User task: "Implement X"
       ↓
┌──────────────────────────────────────┐
│ Is it a NEW FEATURE?                 │
└──────────────────────────────────────┘
       ↓ YES                    ↓ NO
       ↓                        ↓
┌──────────────────┐    ┌──────────────────┐
│ TDD WORKFLOW     │    │ Is it a BUG FIX? │
│ ================│    └──────────────────┘
│ 1. Branch first  │           ↓ YES
│ 2. RED (test)    │           ↓
│ 3. GREEN (impl)  │    ┌──────────────────┐
│ 4. REFACTOR      │    │ BUG FIX WORKFLOW │
│ 5. VERIFY        │    │ ================│
│ 6. Commit        │    │ 1. Branch first  │
└──────────────────┘    │ 2. Reproduce     │
                        │ 3. Fix           │
                        │ 4. Verify        │
                        │ 5. Commit        │
                        └──────────────────┘
```

---

## 1. TDD WORKFLOW (For New Features)

**Use for:** New features, business logic changes

### Phase 0: GIT BRANCH (FIRST!) 🌿

**⚠️ MANDATORY: Create branch BEFORE any implementation**

When user says "implement X":

```
❓ I recommend creating branch:
   - feature/[name] (for new functionality)
   - refactor/[name] (for refactoring)

   Current branch: [show current branch]

   Create branch 'feature/[name]'? (yes/no)

[WAIT FOR CONFIRMATION]
```

**After confirmation:**
```bash
git checkout -b feature/[name]
```

**✅ Checklist before continuing:**
- [ ] User confirmed branch creation
- [ ] Branch created (`git branch --show-current`)
- [ ] Now can continue to Phase 1 ↓

---

### Phase 1: RED (Write Failing Tests) ❌

```
// test/features/[feature]/[feature]_test.[ext]

describe('[Feature Name]', () => {
  // 1. Happy path
  test('should work with valid input', () => {
    // Arrange
    const input = ValidInput();

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  // 2. Edge cases
  test('should handle edge case X', () => {
    expect(functionToTest(edgeCase)).toBe(expectedResult);
  });

  // 3. Error handling
  test('should throw error on invalid input', () => {
    expect(() => functionToTest(null)).toThrow(ArgumentError);
  });

  // 4. Project-specific (if needed)
  test('should follow project-specific rule', () => {
    // Critical checks from CORE_PRINCIPLES Section 8
  });
});
```

**Run tests - MUST fail:**
```bash
[Your test command]
# Expected: ❌ Tests failed (because implementation doesn't exist)
```

---

### Phase 2: GREEN (Make Tests Pass) ✅

**Implement MINIMAL code:**
- Only what's necessary for tests to pass
- No "nice to have" features
- No premature optimization

```
// src/features/[feature]/[feature].[ext]

class Feature {
  // Minimal implementation
  Result doSomething(Input input) {
    // Just what tests require
    return Result();
  }
}
```

**Run tests - MUST pass:**
```bash
[Your test command]
# Expected: ✅ All tests passed
```

---

### Phase 3: REFACTOR (Improve Code) 🔧

**Improve without changing functionality:**
- Better variable names
- Remove duplications (DRY)
- Add documentation
- Optimize performance (if necessary)

**After each change run tests:**
```bash
[Your test command]  # Must still pass ✅
```

---

### Phase 4: VERIFY (Prove It Works) ✅

```bash
# 1. All tests
[Your test command]

# 2. Static analysis
[Your linter/analyzer command]

# 3. Smoke test (run app)
[Your run command]
# Verify app starts and basic flow works
```

---

### Phase 5: ASK TO COMMIT

```
Task completed and verified ✅

Proposed commit message:
──────────────────────────────
feat([scope]): [description]

- [Detail 1]
- [Detail 2]
- Tests: [X/X] passing
──────────────────────────────

Commit? (yes/no)
[Wait for answer]
```

---

### TDD Checklist:

- [ ] Branch created FIRST (Phase 0)
- [ ] Tests written BEFORE implementation
- [ ] Tests failed in RED phase
- [ ] Minimal implementation (no over-engineering)
- [ ] All tests pass in GREEN phase
- [ ] Refactoring didn't break tests
- [ ] Static analysis → 0 errors
- [ ] App runs without crashes
- [ ] Asked before committing

---

## 2. BUG FIX WORKFLOW

**Use for:** Bug fixes, regression issues

### Step 0: GIT BRANCH (FIRST!) 🌿

**⚠️ MANDATORY: Create branch BEFORE reproducing bug**

When user says "fix bug X":

```
❓ I recommend creating branch:
   - fix/[bug-description]
   - fix/issue-[NUMBER] (if GitHub issue)

   Current branch: [show current branch]

   Create branch 'fix/[name]'? (yes/no)

[WAIT FOR CONFIRMATION]
```

**After confirmation:**
```bash
git checkout -b fix/[name]
```

**✅ Checklist before continuing:**
- [ ] User confirmed branch creation
- [ ] Branch created (`git branch --show-current`)
- [ ] Now can continue to Step 1 ↓

---

### Step 1: REPRODUCTION

**Create test that reproduces bug:**

```
// test/bugs/bug_[description]_test.[ext]
// or
// test/bugs/issue_[NUMBER]_test.[ext] (if GitHub issue)

test('Bug: [problem description]', () => {
  // Arrange - setup that causes bug
  const setup = BuggySetup();

  // Act - action that triggers bug
  const result = buggyFunction(setup);

  // Assert - bug exists (test fails)
  expect(result).not.toBe(correctBehavior); // Test MUST fail!
});
```

**Run test - MUST fail:**
```bash
[Your test command] test/bugs/bug_[name]_test.[ext]
# Expected: ❌ Test failed (confirms bug exists)
```

---

### Step 2: FIX

**Implement fix:**
- Find root cause
- Minimal change (don't refactor whole system)
- Fix only problematic parts

---

### Step 3: VERIFY FIX

**Regression test must pass:**
```bash
[Your test command] test/bugs/bug_[name]_test.[ext]
# Expected: ✅ Test passed
```

**Run ALL tests:**
```bash
[Your test command]
# Verify we didn't break anything else
```

---

### Step 4: ASK USER

```
Bug fixed and verified:
- Regression test: ✅ Passed
- All tests: ✅ [X/X] passed
- Static analysis: ✅ 0 errors

Do you want to commit?
```

---

### Bug Fix Checklist:

- [ ] Branch created FIRST (Step 0)
- [ ] Reproduction test created
- [ ] Test failed BEFORE fix (confirmed bug)
- [ ] Minimal fix implemented
- [ ] Test passes AFTER fix
- [ ] Regression tests (all) pass
- [ ] Static analysis → 0 errors
- [ ] Asked before committing

---

## 3. VERIFICATION WORKFLOW

**Hierarchy of verification (from most important):**

### Level 1: MANDATORY (always required)

```bash
# Test suite
[Your test command]
# MUST: All tests passed ✅

# Static analysis
[Your linter/analyzer command]
# MUST: 0 errors ✅
```

**Without this = NOT DONE**

---

### Level 2: RECOMMENDED

```bash
# Run application
[Your run command]

# Verify:
- App starts? ✅
- No console errors? ✅
- Basic flow works? ✅
```

---

### Level 3: OPTIONAL (only if user wants)

```bash
# Screenshot (if visual change)
take screenshot
```

**Use only if:**
- User explicitly asks for screenshot
- Visual bug (colors, layout, etc.)
- UI review

---

### Level 4: RARE (rare - only on request)

**E2E tests:**
- ONLY if user explicitly says "I need E2E test"
- NOT as default verification
- Too fragile and time-consuming

---

### Verification Checklist:

- [ ] Test suite → ✅ All passed
- [ ] Static analysis → ✅ 0 errors
- [ ] Application run → ✅ App starts
- [ ] (Optional) Screenshot if visual change

---

## 4. CODE REVIEW WORKFLOW

**Before commit always check:**

### 4.1 Code Quality

```bash
# Formatting
[Your formatter command]

# Analysis
[Your linter command]

# Unused imports
[Your unused imports checker]
```

---

### 4.2 Security Check

**Check:**
- [ ] No API keys in code?
- [ ] No hardcoded passwords?
- [ ] PII masked in logs?
- [ ] Input validation present?

**If project-specific rules (CORE_PRINCIPLES Section 8):**
- [ ] All critical rules followed?

---

### 4.3 Test Coverage

```bash
[Your coverage command]

# Target: > 80% coverage
```

---

### 4.4 Documentation

**Check:**
- [ ] Public API has doc comments?
- [ ] Complex logic has explaining comments?
- [ ] README current (if API changes)?

---

### Code Review Checklist:

- [ ] Code formatted
- [ ] Static analysis → 0 errors
- [ ] No security issues
- [ ] Project-specific checks verified
- [ ] Coverage > 80%
- [ ] Public API documented

---

## 🎯 WHICH WORKFLOW TO USE?

```
User says: "Implement forgot password"
→ Use: TDD WORKFLOW
   ⚠️ FIRST STEP: Phase 0 - Create branch!
   Then: Phase 1 (RED) → Phase 2 (GREEN) → Phase 3 (REFACTOR)

User says: "Fix bug in login button"
→ Use: BUG FIX WORKFLOW
   ⚠️ FIRST STEP: Step 0 - Create branch!
   Then: Step 1 (REPRODUCTION) → Step 2 (FIX) → Step 3 (VERIFY)

User says: "Commit changes"
→ Use: Both workflows already handled this
   (TDD Phase 5 / Bug Fix Step 4)

User says: "Verify it works"
→ Use: VERIFICATION WORKFLOW

User says: "Do review before commit"
→ Use: CODE REVIEW WORKFLOW
```

**🌿 KEY RULE:**
Branch is ALWAYS created as **FIRST step** - BEFORE writing tests or code!

---

## 🚨 ERROR STATES

### When tests fail:

```
❌ Tests failed (3/15 passing)

Failures:
1. test/feature_test.[ext]:23 - Expected X but got Y

STOP - don't implement more features.
1. Fix failing tests
2. Run test suite again
3. If still failing → show user error and ask
```

---

### When analysis fails:

```
❌ Static analysis found 5 errors

Errors:
1. src/feature.[ext]:45 - Undefined name 'variable'
2. src/feature.[ext]:67 - Missing return type

STOP - don't ignore errors.
1. Fix all errors
2. Run static analysis again
3. Until 0 errors → NOT DONE
```

---

**Everything clear? → Go to CHECKPOINTS.md**
