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
npm test             # MUST pass
npm run lint         # 0 errors
```

**Level 2: RECOMMENDED**
```bash
npm run dev          # Verify app starts
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

**⚠️ FRONTEND (VITE + TYPESCRIPT + TAILWIND + ALPINE) CRITICAL RULES**

### 8.1 TypeScript MUST Be Strict

**Rule:** Use strict mode (tsconfig.json)
```typescript
// ❌ WRONG - any type
function fetchProducts(): any {  // any = no type safety!
  return fetch('/api/products');
}

// ✅ CORRECT - Proper typing
interface Product {
  id: number;
  name: string;
  price: number;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  return response.json();
}
```

**Rule:** Type everything (no `any`)
```typescript
// ❌ WRONG - any escape hatch
const data: any = await fetchData();

// ✅ CORRECT - Proper interface
interface ApiResponse {
  products: Product[];
  total: number;
}

const data: ApiResponse = await fetchData();
```

**Rule:** Use interfaces for data structures
```typescript
// ❌ WRONG - Inline type
function displayProduct(product: { id: number; name: string }) {
  // Repeated everywhere...
}

// ✅ CORRECT - Reusable interface
interface Product {
  id: number;
  name: string;
  price: number;
}

function displayProduct(product: Product) {
  // Type-safe and reusable
}
```

---

### 8.2 Tailwind MUST Use Utilities Only

**Rule:** No custom CSS (use Tailwind utilities)
```html
<!-- ❌ WRONG - Custom CSS -->
<style>
.product-card {
  display: grid;
  gap: 16px;
  padding: 20px;
}
</style>
<div class="product-card">...</div>

<!-- ✅ CORRECT - Tailwind utilities -->
<div class="grid gap-4 p-5">...</div>
```

**Rule:** Follow responsive patterns (mobile-first)
```html
<!-- ❌ WRONG - Desktop-first, breakpoint misuse -->
<div class="grid-cols-4 md:grid-cols-1">...</div>

<!-- ✅ CORRECT - Mobile-first, proper breakpoints -->
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">...</div>
```

**Rule:** Use Tailwind 4.1+ CSS-first config
```css
/* ❌ WRONG - Old tailwind.config.js approach */
// module.exports = { theme: { extend: { colors: {...} } } }

/* ✅ CORRECT - Tailwind 4.1+ CSS config */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}
```

---

### 8.3 Alpine.js MUST Follow Reactive Patterns

**Rule:** Keep state close to usage
```html
<!-- ❌ WRONG - Global state far from usage -->
<div x-data="{ products: [] }">
  <div><!-- many nested divs --></div>
  <div><!-- usage here, 10 levels deep --></div>
</div>

<!-- ✅ CORRECT - State close to usage -->
<div>
  <div x-data="{ products: [] }">
    <!-- usage immediately here -->
  </div>
</div>
```

**Rule:** Use x-data for component state
```html
<!-- ❌ WRONG - No Alpine, manual DOM manipulation -->
<div id="product-list"></div>
<script>
  document.getElementById('product-list').innerHTML = ...;
</script>

<!-- ✅ CORRECT - Alpine reactive data -->
<div x-data="{ products: [] }" x-init="products = await fetchProducts()">
  <template x-for="product in products" :key="product.id">
    <div x-text="product.name"></div>
  </template>
</div>
```

**Rule:** Follow x-for patterns (with :key)
```html
<!-- ❌ WRONG - No key -->
<template x-for="product in products">
  <div x-text="product.name"></div>
</template>

<!-- ✅ CORRECT - With key -->
<template x-for="product in products" :key="product.id">
  <div x-text="product.name"></div>
</template>
```

---

### 8.4 E-commerce Patterns MUST Follow Best Practices

**Rule:** Use production-ready patterns from MCP
```html
<!-- ❌ WRONG - Custom implementation without docs -->
<div class="grid">
  <div>Product 1</div>
  <div>Product 2</div>
</div>

<!-- ✅ CORRECT - Using get_ecommerce_ui_pattern -->
<!-- First: get_ecommerce_ui_pattern(pattern: "product-grid") -->
<!-- Then implement following the pattern with proper:
     - Responsive grid
     - Accessibility (ARIA, keyboard nav)
     - SEO (semantic HTML)
     - Performance (lazy loading)
-->
```

**Rule:** Accessibility is MANDATORY
```html
<!-- ❌ WRONG - No accessibility -->
<div class="clickable" onclick="buy()">Buy Now</div>

<!-- ✅ CORRECT - Proper button with ARIA -->
<button
  type="button"
  aria-label="Add Product to Cart"
  @click="addToCart(product)"
  class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
>
  Add to Cart
</button>
```

**Rule:** SEO with semantic HTML
```html
<!-- ❌ WRONG - divs everywhere -->
<div class="container">
  <div class="header">Product Title</div>
  <div>Description</div>
</div>

<!-- ✅ CORRECT - Semantic HTML -->
<article itemscope itemtype="https://schema.org/Product">
  <h1 itemprop="name">Product Title</h1>
  <p itemprop="description">Description</p>
  <span itemprop="price">$99.99</span>
</article>
```

---

### 8.5 Docs-First is MANDATORY

**Before implementing ANY frontend feature:**
1. Use `fetch_tailwind_docs(topic)` - Get current Tailwind utilities
2. Use `fetch_alpine_patterns(directive)` - Get Alpine.js patterns
3. Use `get_ecommerce_ui_pattern(pattern)` - Get production-ready code

**Why:** Frontend tech evolves rapidly. Training data may be outdated. Always fetch current docs.

**Example:**
```
User: "Create product grid"

AI MUST:
1. fetch_tailwind_docs(topic: "grid")  ← MANDATORY
2. fetch_alpine_patterns(directive: "x-for")  ← MANDATORY
3. get_ecommerce_ui_pattern(pattern: "product-grid")  ← RECOMMENDED
4. THEN write code using fetched patterns
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
- [ ] **Docs fetched?** (MANDATORY for frontend features)
- [ ] Tests written and passing? (`npm test`)
- [ ] Linting passed? (`npm run lint` → 0 errors)
- [ ] Changed ONLY relevant files? (Minimal Change)
- [ ] Frontend rules verified? (Section 8: TypeScript strict, Tailwind utilities, Alpine patterns)
- [ ] Accessibility checked? (ARIA labels, semantic HTML, keyboard nav)
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
