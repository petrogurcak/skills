# 🔄 WORKFLOWS - Master Guide

**Single Source of Truth for all Frontend workflows.**

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

**Use for:** New features, UI components, business logic changes

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

**Before writing ANY code, fetch current documentation:**

```
User: "Create product grid"

AI MUST execute:
1. fetch_tailwind_docs(topic: "grid")
   → Returns current Tailwind grid utilities

2. fetch_alpine_patterns(directive: "x-for")
   → Returns Alpine.js loop patterns

3. get_ecommerce_ui_pattern(pattern: "product-grid")
   → Returns production-ready product grid code

4. If TypeScript interfaces needed:
   fetch_typescript_config(topic: "strict-mode")
   → Returns TypeScript strict mode patterns
```

**✅ Checklist before continuing:**
- [ ] Relevant docs fetched from MCP
- [ ] Patterns reviewed
- [ ] Now can continue to Phase 1 ↓

---

### Phase 1: RED (Write Failing Tests) ❌

```typescript
// test/components/product-grid.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/dom';

describe('ProductGrid', () => {
  // 1. Happy path
  it('displays products in grid layout', () => {
    // Arrange
    const products = [
      { id: 1, name: 'Product 1', price: 99 },
      { id: 2, name: 'Product 2', price: 149 },
    ];

    // Act
    render(ProductGrid({ products }));

    // Assert
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  // 2. Edge cases
  it('displays empty state when no products', () => {
    render(ProductGrid({ products: [] }));
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  // 3. Frontend-specific rules (CORE_PRINCIPLES Section 8)
  it('uses TypeScript strict types', () => {
    // Type check passes at compile time
    const products: Product[] = [];
    render(ProductGrid({ products }));
  });
});
```

**Run tests - MUST fail:**
```bash
npm test
# Expected: ❌ Tests failed (because ProductGrid doesn't exist)
```

---

### Phase 2: GREEN (Make Tests Pass) ✅

**Implement MINIMAL code using fetched docs:**

```typescript
// src/components/product-grid.ts

// ✅ CORRECT: TypeScript strict interface (from fetched docs)
interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductGridProps {
  products: Product[];
}

// ✅ CORRECT: Using Tailwind utilities (from fetched docs)
// ✅ CORRECT: Using Alpine.js x-for pattern (from fetched docs)
export function ProductGrid({ products }: ProductGridProps): string {
  if (products.length === 0) {
    return `<div>No products available</div>`;
  }

  return `
    <div 
      x-data="{ products: ${JSON.stringify(products)} }"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
    >
      <template x-for="product in products" :key="product.id">
        <div class="border rounded-lg p-4">
          <h3 x-text="product.name" class="text-lg font-semibold"></h3>
          <p x-text="'$' + product.price" class="text-gray-600"></p>
        </div>
      </template>
    </div>
  `;
}
```

**Run tests - MUST pass:**
```bash
npm test
# Expected: ✅ All tests passed
```

---

### Phase 3: REFACTOR (Improve Code) 🔧

**Improve without changing functionality:**
- Extract ProductCard component if complex
- Improve accessibility (ARIA labels)
- Add semantic HTML
- Optimize performance

**After each change run tests:**
```bash
npm test  # Must still pass ✅
```

---

### Phase 4: VERIFY (Prove It Works) ✅

```bash
# 1. All tests
npm test

# 2. Linting
npm run lint

# 3. TypeScript check
npm run type-check

# 4. Smoke test (run app)
npm run dev
# Open browser and verify product grid renders correctly
```

---

### Phase 5: ASK TO COMMIT

```
Task completed and verified ✅

Proposed commit message:
──────────────────────────────
feat(product): add responsive product grid

- Created ProductGrid component with Tailwind utilities
- Added Alpine.js reactive data handling
- Implemented empty state
- Tests: 3/3 passing
- npm run lint: 0 errors
- TypeScript: strict mode, no any types
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
- [ ] npm run lint → 0 errors
- [ ] TypeScript strict mode passes
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

```typescript
// test/bugs/product-grid-empty-crash.test.ts

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/dom';

describe('Bug: ProductGrid crashes on empty array', () => {
  it('should display empty state, not crash', () => {
    // Arrange - setup that causes bug
    const products: Product[] = [];

    // Act & Assert - bug exists (test MUST fail!)
    expect(() => render(ProductGrid({ products }))).not.toThrow();
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });
});
```

**Run test - MUST fail:**
```bash
npm test test/bugs/product-grid-empty-crash.test.ts
# Expected: ❌ Test failed (confirms bug exists)
```

---

### Step 2: FIX

**Implement fix:**
- Find root cause
- Minimal change (don't refactor whole component tree)
- Fix only problematic parts

---

### Step 3: VERIFY FIX

**Regression test must pass:**
```bash
npm test test/bugs/product-grid-empty-crash.test.ts
# Expected: ✅ Test passed
```

**Run ALL tests:**
```bash
npm test
# Verify we didn't break anything else
```

**Run linting:**
```bash
npm run lint
# Expected: 0 errors
```

---

### Step 4: ASK USER

```
Bug fixed and verified:
- Regression test: ✅ Passed
- All tests: ✅ [X/X] passed
- npm run lint: ✅ 0 errors

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
- [ ] npm run lint → 0 errors
- [ ] Asked before committing

---

## 3. VERIFICATION WORKFLOW

**Hierarchy of verification (from most important):**

### Level 1: MANDATORY (always required)

```bash
# Test suite
npm test
# MUST: All tests passed ✅

# Linting
npm run lint
# MUST: 0 errors ✅

# TypeScript check
npm run type-check
# MUST: 0 errors ✅
```

**Without this = NOT DONE**

---

### Level 2: RECOMMENDED

```bash
# Run application
npm run dev

# Verify:
- App starts? ✅
- No console errors? ✅
- Component renders correctly? ✅
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
- [ ] npm run lint → ✅ 0 errors
- [ ] TypeScript → ✅ 0 errors
- [ ] Application run → ✅ App starts
- [ ] (Optional) Screenshot if visual change

---

## 🎯 WHICH WORKFLOW TO USE?

```
User says: "Create product grid"
→ Use: TDD WORKFLOW
   ⚠️ FIRST STEP: Phase 0 - Create branch!
   ⚠️ SECOND STEP: Phase 0.5 - Fetch docs! (MANDATORY)
   Then: Phase 1 (RED) → Phase 2 (GREEN) → Phase 3 (REFACTOR)

User says: "Fix product grid layout bug"
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
1. test/components/product-grid.test.ts:23 - Expected X but got Y

STOP - don't implement more features.
1. Fix failing tests
2. Run test suite again
3. If still failing → show user error and ask
```

---

### When linting fails:

```
❌ npm run lint found 5 errors

Errors:
1. src/components/product-grid.ts:45 - Unexpected any
2. src/components/product-grid.ts:67 - Missing semicolon

STOP - don't ignore errors.
1. Fix all errors
2. Run npm run lint again
3. Until 0 errors → NOT DONE
```

---

**Everything clear? → Go to CHECKPOINTS.md**
