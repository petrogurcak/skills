# 🔄 WORKFLOWS - Master Guide

**Single Source of Truth for all Nette workflows.**

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
│ 2. DOCS FIRST ⚠️│           ↓
│ 3. RED (test)    │    ┌──────────────────┐
│ 4. GREEN (impl)  │    │ BUG FIX WORKFLOW │
│ 5. REFACTOR      │    │ ================│
│ 6. VERIFY        │    │ 1. Branch first  │
│ 7. Commit        │    │ 2. Reproduce     │
└──────────────────┘    │ 3. Fix           │
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
- [ ] Now can continue to Phase 0.5 ↓

---

### Phase 0.5: DOCS FIRST ⚠️ MANDATORY

**Before writing ANY code, fetch current Nette documentation:**

```
User: "Create ProductPresenter"

AI MUST execute:
1. fetch_nette_docs(topic: "presenter")
   → Returns current Presenter patterns

2. fetch_di_pattern(pattern: "constructor-injection")
   → Returns DI configuration patterns

3. If using Latte:
   fetch_latte_syntax(feature: "n-attributes")
   → Returns n:href, n:class patterns

4. If using Database:
   fetch_nette_docs(topic: "database")
   → Returns Explorer query patterns
```

**✅ Checklist before continuing:**
- [ ] Relevant docs fetched from MCP
- [ ] Patterns reviewed
- [ ] Now can continue to Phase 1 ↓

---

### Phase 1: RED (Write Failing Tests) ❌

```php
// tests/Presenters/ProductPresenterTest.php

<?php
declare(strict_types=1);

namespace Tests\Presenters;

use Tester\TestCase;
use Tester\Assert;

require __DIR__ . '/../bootstrap.php';

class ProductPresenterTest extends TestCase {
    // 1. Happy path
    public function testRenderDefault(): void {
        // Arrange
        $presenter = new ProductPresenter($this->mockDatabase());

        // Act
        $response = $presenter->run(new Request('Product', 'default'));

        // Assert
        Assert::type(Nette\Application\Responses\TextResponse::class, $response);
    }

    // 2. Edge cases
    public function testRenderDetailNotFound(): void {
        // Assert error for non-existent product
        Assert::exception(
            fn() => $presenter->run(new Request('Product', 'detail', ['id' => 999])),
            Nette\Application\BadRequestException::class
        );
    }

    // 3. Nette-specific rules (CORE_PRINCIPLES Section 8)
    public function testPresenterUsesDI(): void {
        // Verify constructor injection (not new)
        $reflection = new \ReflectionClass(ProductPresenter::class);
        $constructor = $reflection->getConstructor();
        Assert::true($constructor->getNumberOfParameters() > 0);
    }
}
```

**Run tests - MUST fail:**
```bash
composer test
# Expected: ❌ Tests failed (because ProductPresenter doesn't exist)
```

---

### Phase 2: GREEN (Make Tests Pass) ✅

**Implement MINIMAL code using fetched docs:**

```php
// app/Presenters/ProductPresenter.php

<?php
declare(strict_types=1);

namespace App\Presenters;

use Nette\Application\UI\Presenter;
use Nette\Database\Explorer;

final class ProductPresenter extends Presenter {
    // ✅ CORRECT: Constructor DI (from fetched docs)
    public function __construct(
        private Explorer $database
    ) {}

    public function renderDefault(): void {
        // ✅ CORRECT: Typed query (from fetched docs)
        $this->template->products = $this->database
            ->table('products')
            ->fetchAll();
    }

    public function renderDetail(int $id): void {
        $product = $this->database->table('products')->get($id);

        // ✅ CORRECT: Error handling
        if (!$product) {
            $this->error('Product not found');
        }

        $this->template->product = $product;
    }
}
```

**Run tests - MUST pass:**
```bash
composer test
# Expected: ✅ All tests passed
```

---

### Phase 3: REFACTOR (Improve Code) 🔧

**Improve without changing functionality:**
- Better variable names
- Extract repository if complex queries
- Add PHPDoc comments
- Follow Nette coding standards

**After each change run tests:**
```bash
composer test  # Must still pass ✅
```

---

### Phase 4: VERIFY (Prove It Works) ✅

```bash
# 1. All tests
composer test

# 2. Static analysis (PHPStan)
vendor/bin/phpstan analyse

# 3. Smoke test (run app)
php -S localhost:8000 -t www
# Open browser: http://localhost:8000
# Verify Product:default and Product:detail work
```

---

### Phase 5: ASK TO COMMIT

```
Task completed and verified ✅

Proposed commit message:
──────────────────────────────
feat(product): add ProductPresenter with listing

- Created ProductPresenter with renderDefault and renderDetail
- Added tests with 100% coverage
- Used constructor DI for Database Explorer
- Tests: 3/3 passing
- PHPStan: 0 errors
──────────────────────────────

Commit? (yes/no)
[Wait for answer]
```

---

### TDD Checklist:

- [ ] Branch created FIRST (Phase 0)
- [ ] Docs fetched BEFORE code (Phase 0.5) ⚠️ MANDATORY
- [ ] Tests written BEFORE implementation
- [ ] Tests failed in RED phase
- [ ] Minimal implementation (no over-engineering)
- [ ] All tests pass in GREEN phase
- [ ] Refactoring didn't break tests
- [ ] PHPStan → 0 errors
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

---

### Step 1: REPRODUCTION

**Create test that reproduces bug:**

```php
// tests/bugs/BugProductNullReferenceTest.php

<?php
declare(strict_types=1);

use Tester\Assert;

require __DIR__ . '/../bootstrap.php';

test('Bug: ProductPresenter crashes on null product', function() {
    // Arrange - setup that causes bug
    $presenter = new ProductPresenter($database);

    // Act & Assert - bug exists (test MUST fail!)
    Assert::exception(
        fn() => $presenter->renderDetail(999),  // Non-existent ID
        Nette\Application\BadRequestException::class
    );
});
```

**Run test - MUST fail:**
```bash
composer test tests/bugs/BugProductNullReferenceTest.php
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
composer test tests/bugs/BugProductNullReferenceTest.php
# Expected: ✅ Test passed
```

**Run ALL tests:**
```bash
composer test
# Verify we didn't break anything else
```

**Run static analysis:**
```bash
vendor/bin/phpstan analyse
# Expected: 0 errors
```

---

### Step 4: ASK USER

```
Bug fixed and verified:
- Regression test: ✅ Passed
- All tests: ✅ [X/X] passed
- PHPStan: ✅ 0 errors

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
- [ ] PHPStan → 0 errors
- [ ] Asked before committing

---

## 3. VERIFICATION WORKFLOW

**Hierarchy of verification (from most important):**

### Level 1: MANDATORY (always required)

```bash
# Test suite
composer test
# MUST: All tests passed ✅

# Static analysis
vendor/bin/phpstan analyse
# MUST: 0 errors ✅
```

**Without this = NOT DONE**

---

### Level 2: RECOMMENDED

```bash
# Run application
php -S localhost:8000 -t www

# Verify:
- App starts? ✅
- No Tracy errors? ✅
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

### Verification Checklist:

- [ ] Test suite → ✅ All passed
- [ ] PHPStan → ✅ 0 errors
- [ ] Application run → ✅ App starts
- [ ] (Optional) Screenshot if visual change

---

## 4. CODE REVIEW WORKFLOW

**Before commit always check:**

### 4.1 Code Quality

```bash
# Coding standards (if using PHP CS Fixer)
vendor/bin/php-cs-fixer fix --dry-run

# PHPStan
vendor/bin/phpstan analyse

# Nette Code Checker
php vendor/nette/code-checker/code-checker --short-arrays
```

---

### 4.2 Security Check

**Check:**
- [ ] No API keys in code?
- [ ] No hardcoded passwords?
- [ ] PII masked in logs?
- [ ] Input validation present?
- [ ] Latte auto-escaping not disabled?

**Nette-specific (CORE_PRINCIPLES Section 8):**
- [ ] All presenters use constructor DI?
- [ ] All templates use n:attributes?
- [ ] All database queries typed and error-handled?

---

### 4.3 Test Coverage

```bash
# If using Nette Tester with coverage
composer test -- --coverage coverage.html --coverage-src app

# Target: > 80% coverage
```

---

### Code Review Checklist:

- [ ] Code formatted (PHP CS Fixer)
- [ ] PHPStan → 0 errors
- [ ] No security issues
- [ ] Nette rules verified (Section 8)
- [ ] Coverage > 80%
- [ ] Public API documented

---

## 🎯 WHICH WORKFLOW TO USE?

```
User says: "Create ProductPresenter"
→ Use: TDD WORKFLOW
   ⚠️ FIRST STEP: Phase 0 - Create branch!
   ⚠️ SECOND STEP: Phase 0.5 - Fetch docs! (MANDATORY)
   Then: Phase 1 (RED) → Phase 2 (GREEN) → Phase 3 (REFACTOR)

User says: "Fix bug in ProductPresenter"
→ Use: BUG FIX WORKFLOW
   ⚠️ FIRST STEP: Step 0 - Create branch!
   Then: Step 1 (REPRODUCTION) → Step 2 (FIX) → Step 3 (VERIFY)

User says: "Commit changes"
→ Use: Both workflows already handled this
   (TDD Phase 5 / Bug Fix Step 4)

User says: "Verify it works"
→ Use: VERIFICATION WORKFLOW
```

**🌿 KEY RULE:**
Branch is ALWAYS created as **FIRST step** - BEFORE fetching docs or writing code!

**📚 DOCS-FIRST RULE:**
Docs are ALWAYS fetched as **SECOND step** - BEFORE writing any code!

---

## 🚨 ERROR STATES

### When tests fail:

```
❌ Tests failed (3/15 passing)

Failures:
1. tests/ProductPresenterTest.php:23 - Expected X but got Y

STOP - don't implement more features.
1. Fix failing tests
2. Run test suite again
3. If still failing → show user error and ask
```

---

### When PHPStan fails:

```
❌ PHPStan found 5 errors

Errors:
1. app/Presenters/ProductPresenter.php:45 - Undefined property $database
2. app/Presenters/ProductPresenter.php:67 - Method has no return type

STOP - don't ignore errors.
1. Fix all errors
2. Run PHPStan again
3. Until 0 errors → NOT DONE
```

---

**Everything clear? → Go to CHECKPOINTS.md**
