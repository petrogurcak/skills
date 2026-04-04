# Frontend Workflow-Driven System - Design Document

**Date:** 2025-11-17
**Status:** Approved
**Tech Stack:** Vite 6.x + TypeScript 5.7+ + Tailwind CSS 3.4+ + Alpine.js 3.x

## Executive Summary

Workflow-driven system for modern frontend development with Vite, TypeScript, Tailwind CSS, and Alpine.js. Enforces docs-first development where AI fetches current documentation BEFORE proposing implementations.

**Primary Use Case:** E-commerce frontend for Sellastica (product grids, cart UI, checkout forms, admin dashboards)

**Key Principle:** DOCS FIRST, CODE SECOND

## Problem Statement

When developing frontend with Vite/TypeScript/Tailwind/Alpine, AI assistants:
- Use outdated Tailwind utility classes or non-optimal responsive patterns
- Don't leverage TypeScript 5.x+ features or strict mode properly
- Lack knowledge of Vite-specific optimization and build features
- Propose deprecated Alpine.js patterns instead of current v3 reactivity
- Generate code without consulting current documentation

**Target user:** Developer building e-commerce frontends who needs AI to consult docs BEFORE proposing code.

## Success Criteria

1. **Docs-First Development** - AI NEVER generates code without fetching relevant documentation first
2. **Current Tech Stack** - Always uses Tailwind 3.4+, TypeScript 5.7+, Alpine 3.x+, Vite 6.x+
3. **Workflow Compliance** - Follows structured workflows with mandatory documentation steps
4. **E-commerce Optimized** - Patterns specific to product grids, cart UI, checkout, admin dashboards
5. **Process Enforcement** - Skill ensures docs are fetched, not just pattern application

## Architecture Overview

### Comparison to Other Systems

| Aspect | Nette | Flutter | **Frontend** |
|--------|-------|---------|--------------|
| **Philosophy** | Speed-first | Workflow-first | **Workflow-first** |
| **Skill Role** | Patterns (80%) | Process (20%) | **Process (20%)** |
| **MCP Role** | Details (20%) | Mandatory (80%) | **Mandatory (80%)** |
| **Use Case** | PHP framework | Mobile apps | **Web frontend** |
| **Tech Focus** | Backend patterns | Widget lifecycle | **UI utilities + reactivity** |

### Two-Component System

```
┌────────────────────────────────────────────────┐
│  Frontend Workflow Skill (Always Active)      │
│  - Development workflows with checklists       │
│  - MANDATORY doc-fetch steps                   │
│  - E-commerce UI patterns                      │
│  - Context: ~12-15 KB                          │
└────────────────────────────────────────────────┘
                    │
                    │ Mandatory before code
                    ↓
┌────────────────────────────────────────────────┐
│  Frontend MCP Server (Mandatory)               │
│  - 6-8 documentation tools                     │
│  - Tailwind, Alpine, Vite, TypeScript docs    │
│  - E-commerce UI pattern library               │
│  - Context: ~3-5 KB tools + response data      │
└────────────────────────────────────────────────┘
```

### Integration Pattern

**Example: Create Product Grid**

```
User: "Create responsive product grid with 3 columns"

AI Workflow (enforced by skill):
┌─────────────────────────────────────────────┐
│ 1. Load workflow: "Create Tailwind Layout" │
└─────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────┐
│ 2. Step 1: MANDATORY doc fetch              │
│    MCP: fetch_tailwind_docs("grid")         │
│    MCP: fetch_tailwind_docs("responsive")   │
└─────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────┐
│ 3. Step 2: E-commerce pattern               │
│    MCP: get_ecommerce_ui_pattern("product-grid") │
└─────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────┐
│ 4. Step 3: Implement using fetched docs    │
│    - grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 │
│    - gap utilities from docs                │
│    - Responsive image handling              │
└─────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────┐
│ 5. Step 4: Verify implementation            │
│    - Responsive breakpoints correct         │
│    - Accessibility (alt tags, semantic)     │
│    - Performance (lazy loading)             │
└─────────────────────────────────────────────┘
```

## Component 1: Frontend Workflow Skill

### Purpose
Enforce development workflows that mandate documentation fetching BEFORE any code generation for Vite/TypeScript/Tailwind/Alpine projects.

### Content Structure

#### A. Core Workflows

**Workflow 1: Tailwind Layout & Styling**
```
Checklist: Create Tailwind Layout
☐ 1. Identify layout pattern (grid/flex/stack)
☐ 2. MANDATORY: fetch_tailwind_docs(layout_type)
☐ 3. MANDATORY: fetch_tailwind_docs("responsive") if responsive
☐ 4. Plan responsive breakpoints (sm/md/lg/xl/2xl)
☐ 5. Implement with Tailwind utilities:
     - Use @apply sparingly (prefer utility classes)
     - Responsive variants (mobile-first)
     - Dark mode if needed
☐ 6. Verify:
     ✓ No custom CSS where utilities exist
     ✓ Responsive on all breakpoints
     ✓ Accessibility (focus states, contrast)
```

**Workflow 2: Alpine.js Component**
```
Checklist: Create Alpine Component
☐ 1. Identify reactivity needs (x-data, x-model, x-show)
☐ 2. MANDATORY: fetch_alpine_patterns(directive_type)
☐ 3. Plan component state and methods
☐ 4. Implement Alpine component:
     - x-data for state
     - x-init for initialization
     - @event for event handling
     - x-cloak for flicker prevention
☐ 5. Test reactivity and event handling
☐ 6. Verify:
     ✓ No jQuery/vanilla JS where Alpine works
     ✓ Proper Alpine 3.x syntax
     ✓ Event handlers work correctly
```

**Workflow 3: TypeScript Configuration**
```
Checklist: Setup TypeScript
☐ 1. Determine strictness level needed
☐ 2. MANDATORY: fetch_typescript_config("strict-mode")
☐ 3. Configure tsconfig.json:
     - strict: true
     - noImplicitAny: true
     - strictNullChecks: true
☐ 4. Set up path aliases if needed
☐ 5. Configure for Vite integration
☐ 6. Verify:
     ✓ No type errors
     ✓ Strict mode enabled
     ✓ Proper module resolution
```

**Workflow 4: Vite Build Setup**
```
Checklist: Configure Vite
☐ 1. Identify optimization needs
☐ 2. MANDATORY: fetch_vite_config("optimization")
☐ 3. Configure vite.config.ts:
     - Plugins (dts, etc.)
     - Build optimization
     - Env variables
     - Proxy for API if needed
☐ 4. Set up HMR for dev
☐ 5. Configure build output
☐ 6. Verify:
     ✓ Fast HMR in dev
     ✓ Optimized production build
     ✓ Source maps working
```

**Workflow 5: E-commerce UI Component**
```
Checklist: Create E-commerce Component
☐ 1. Identify component type (product-card/cart/checkout)
☐ 2. MANDATORY: get_ecommerce_ui_pattern(component_type)
☐ 3. MANDATORY: fetch_tailwind_docs for required utilities
☐ 4. MANDATORY: fetch_alpine_patterns if interactive
☐ 5. Implement component:
     - Product image with lazy loading
     - Price formatting
     - Add to cart interaction (Alpine)
     - Responsive design (Tailwind)
☐ 6. Verify:
     ✓ Works on mobile/tablet/desktop
     ✓ Accessible (keyboard nav, screen readers)
     ✓ Performance optimized
```

**Workflow 6: Form with Validation**
```
Checklist: Create Form
☐ 1. Plan form fields and validation rules
☐ 2. MANDATORY: fetch_alpine_patterns("x-model")
☐ 3. MANDATORY: fetch_tailwind_docs("forms")
☐ 4. Implement form:
     - Alpine x-model for binding
     - Validation with Alpine reactivity
     - Error messages with x-show
     - Tailwind styling
☐ 5. Handle form submission
☐ 6. Verify:
     ✓ Validation works client-side
     ✓ Error states visible
     ✓ Accessible form labels
     ✓ Keyboard navigation
```

#### B. Code Quality Rules

**TypeScript 5.7+ Requirements:**
```typescript
// tsconfig.json MANDATORY settings
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true
  }
}

// ✓ CORRECT: Proper types
const products: Product[] = [];
function getPrice(product: Product): number {
  return product.price;
}

// ✗ WRONG: No any, no implicit types
const products = []; // Missing type
function getPrice(product) { // Missing types
  return product.price;
}
```

**Tailwind 3.4+ Best Practices:**
```html
<!-- ✓ CORRECT: Utility classes, responsive -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    Product Card
  </div>
</div>

<!-- ✗ WRONG: Custom CSS, no responsive -->
<div class="product-grid">
  <div class="product-card">Product Card</div>
</div>
```

**Alpine.js 3.x Patterns:**
```html
<!-- ✓ CORRECT: Alpine 3 reactivity -->
<div x-data="{ count: 0, open: false }">
  <button @click="count++" class="btn">
    Clicked <span x-text="count"></span> times
  </button>
  <div x-show="open" x-transition>Content</div>
</div>

<!-- ✗ WRONG: jQuery/vanilla where Alpine works -->
<div id="counter">
  <button onclick="incrementCount()">Click</button>
</div>
<script>
let count = 0;
function incrementCount() { /* ... */ }
</script>
```

#### C. Decision Trees

**"Which layout system?"**
```
Layout needs?
├─ Simple stacking → Tailwind flex (flex-col/flex-row)
├─ Grid with columns → Tailwind grid (grid-cols-*)
├─ Complex responsive → Tailwind grid with breakpoints
└─ Custom layout → CSS Grid (rare, prefer Tailwind)
```

**"Tailwind or custom CSS?"**
```
Can Tailwind utilities do it?
├─ YES → Use Tailwind utilities
└─ NO → Check if really needed
    ├─ Complex animation → Custom @keyframes OK
    ├─ Reusable pattern → Create Tailwind @layer component
    └─ One-off style → Inline style or utility
```

**"Alpine.js or vanilla TypeScript?"**
```
Interactivity type?
├─ Simple show/hide → Alpine (x-show, x-if)
├─ Form binding → Alpine (x-model)
├─ Event handling → Alpine (@click, @submit)
├─ Complex state/logic → TypeScript class
└─ API calls → TypeScript with Alpine for UI updates
```

### Format

**Workflow checklists with MANDATORY MCP steps, not embedded code examples.**

**Size Target:** 12-15 KB (process, not patterns)

## Component 2: Frontend MCP Server

### Purpose
Provide comprehensive access to current Tailwind, Alpine, Vite, and TypeScript documentation from official sources.

### Tools (6-8 tools)

#### 1. `fetch_tailwind_docs`
**Purpose:** Get Tailwind utility documentation

**Parameters:**
- `topic`: string (e.g., "grid", "flexbox", "responsive", "colors")
- `include_examples`: boolean (default: true)

**Returns:** Utility classes, responsive variants, examples from tailwindcss.com

**Implementation:**
- Fetches from https://tailwindcss.com/docs
- Utility class reference
- Responsive design patterns

#### 2. `fetch_alpine_patterns`
**Purpose:** Get Alpine.js directive patterns

**Parameters:**
- `directive`: "x-data" | "x-model" | "x-show" | "x-if" | "x-for" | "@event" | "general"
- `use_case`: string (optional)

**Returns:** Alpine 3.x directive usage, reactivity patterns from alpinejs.dev

**Implementation:**
- Fetches from https://alpinejs.dev
- Current v3 syntax
- Reactivity examples

#### 3. `fetch_vite_config`
**Purpose:** Get Vite configuration patterns

**Parameters:**
- `topic`: "plugins" | "optimization" | "env" | "build" | "dev-server"

**Returns:** Vite config examples from vitejs.dev

**Implementation:**
- Fetches from https://vitejs.dev/config
- Plugin integration
- Build optimization

#### 4. `fetch_typescript_config`
**Purpose:** Get TypeScript configuration

**Parameters:**
- `topic`: "strict-mode" | "path-aliases" | "module-resolution" | "general"

**Returns:** TypeScript config patterns

**Implementation:**
- Fetches from https://www.typescriptlang.org/tsconfig
- Strict mode settings
- Vite integration specifics

#### 5. `search_tailwind_utilities`
**Purpose:** Search for specific Tailwind utilities

**Parameters:**
- `query`: string (e.g., "center div", "responsive grid")
- `category`: "layout" | "spacing" | "typography" | "colors" | "all"

**Returns:** Matching utility classes with examples

**Implementation:**
- Searches tailwindcss.com
- Returns utility combinations
- Responsive variants

#### 6. `get_ecommerce_ui_pattern`
**Purpose:** Get e-commerce UI patterns

**Parameters:**
- `pattern`: "product-card" | "product-grid" | "cart-item" | "checkout-form" | "price-display" | "image-gallery"

**Returns:** E-commerce specific UI patterns with Tailwind + Alpine

**Implementation:**
- Curated e-commerce patterns
- Sellastica-optimized
- Responsive and accessible

#### 7. `search_frontend_best_practices` (Optional)
**Purpose:** Search web development best practices

**Parameters:**
- `topic`: "accessibility" | "performance" | "seo" | "responsive"

**Returns:** Best practices and patterns

#### 8. `fetch_npm_package_docs` (Optional)
**Purpose:** Get npm package documentation

**Parameters:**
- `package_name`: string

**Returns:** Package docs from npmjs.com

### Documentation Sources

**Primary:**
- https://tailwindcss.com/docs (Tailwind CSS)
- https://alpinejs.dev (Alpine.js)
- https://vitejs.dev (Vite)
- https://www.typescriptlang.org (TypeScript)

**Supplementary:**
- https://www.npmjs.com (npm packages)
- https://web.dev (web best practices)

### Caching Strategy

**Cache Duration:** 20 minutes (1200 seconds)
**Rationale:** Frontend docs update less frequently than live APIs

**Cache Keys:** `tool_name:params_hash`

**Fallback:** Return stale cache if network fails

### Implementation Technology

**Language:** TypeScript
**Dependencies:** Same as Nette/Flutter (MCP SDK, cheerio, turndown, node-cache)

## Usage Scenarios

### Scenario 1: Product Grid (Common)

**User:** "Create a responsive product grid for 12 products"

**Workflow:**
1. Skill loads "Create Tailwind Layout"
2. Step 1: `fetch_tailwind_docs("grid")`
3. Step 2: `fetch_tailwind_docs("responsive")`
4. Step 3: `get_ecommerce_ui_pattern("product-grid")`
5. AI implements:
   - grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
   - gap-4 for spacing
   - Product card with image, title, price
6. Verify responsiveness

**Result:** Professional product grid with current Tailwind utilities

### Scenario 2: Alpine Cart Interaction (Intermediate)

**User:** "Add Alpine.js to handle add-to-cart"

**Workflow:**
1. Skill loads "Create Alpine Component"
2. Step 1: `fetch_alpine_patterns("x-data")`
3. Step 2: `fetch_alpine_patterns("@event")`
4. AI implements:
   - x-data with cart state
   - @click for add-to-cart button
   - x-transition for feedback
5. Verify reactivity

**Result:** Working cart interaction with Alpine 3.x

### Scenario 3: TypeScript Strict Setup (Setup)

**User:** "Configure TypeScript with strict mode"

**Workflow:**
1. Skill loads "Setup TypeScript"
2. Step 1: `fetch_typescript_config("strict-mode")`
3. AI configures tsconfig.json with strict settings
4. Verify no type errors

**Result:** Properly configured strict TypeScript

## Context Management

### Typical Usage
- Skill: ~12-15 KB
- MCP Tools: ~3-5 KB
- Per tool response: ~5-10 KB
- **Peak during workflow:** 20-30 KB

**Acceptable:** Docs-first accuracy over minimal context

## Maintenance

### Skill Updates
**Frequency:** 2-3 times per year
**Trigger:** Major Tailwind/Alpine/Vite/TypeScript releases
**Effort:** 3-5 hours

### MCP Server Updates
**Frequency:** As-needed (docs site structure changes)
**Effort:** 2-4 hours per year

**Auto-updates:** MCP fetches live docs automatically

## Implementation Plan

### Phase 1: Frontend Workflow Skill (3-4 hours)
1. Define 6 core workflows
2. Add MANDATORY MCP fetch steps
3. E-commerce patterns embedded
4. Code quality rules
5. Decision trees

**Deliverable:** frontend-workflow.skill

### Phase 2: MCP Server Base (2-3 hours)
1. Project setup (package.json, tsconfig)
2. Cache and base-fetcher (reuse from Nette/Flutter)
3. Project structure

**Deliverable:** MCP server scaffold

### Phase 3: Core Tools (4-5 hours)
1. `fetch_tailwind_docs`
2. `fetch_alpine_patterns`
3. `fetch_vite_config`
4. `fetch_typescript_config`

**Deliverable:** 4 core tools working

### Phase 4: Specialized Tools (2-3 hours)
5. `search_tailwind_utilities`
6. `get_ecommerce_ui_pattern`

**Deliverable:** 6 tools total

### Phase 5: Integration & Testing (2-3 hours)
1. Test workflows trigger MCP calls
2. Verify docs-first enforcement
3. Test e-commerce patterns
4. Performance check

**Deliverable:** Tested system

### Phase 6: Documentation (1-2 hours)
1. Design doc (this file)
2. MCP server README
3. Main README with examples
4. Installation guide

**Deliverable:** Complete documentation

## Total Estimated Effort
**14-20 hours**

## Success Metrics

- ✅ AI NEVER generates Tailwind/Alpine/TypeScript code without docs first
- ✅ Uses Tailwind 3.4+, Alpine 3.x+, TypeScript 5.7+, Vite 6.x+
- ✅ E-commerce patterns work out of box
- ✅ Workflows cover 90%+ of common frontend tasks
- ✅ MCP provides docs in <2 seconds

## Conclusion

Workflow-driven system optimized for modern frontend development with focus on:
- **Docs-first:** Always fetch current docs before code
- **E-commerce:** Sellastica-optimized patterns
- **Modern stack:** Vite 6.x, TypeScript 5.7, Tailwind 3.4, Alpine 3.x
- **Process enforcement:** Workflows mandate doc fetching

Ready for implementation.
