---
name: frontend-workflow
description: Use when working with Vite/TypeScript/Tailwind/Alpine.js - enforces DOCS-FIRST workflow where AI MUST fetch current documentation BEFORE proposing any implementation (optimized for e-commerce UI)
---

# Frontend Workflow-Driven Development Skill

## CRITICAL PRINCIPLE

**DOCS FIRST, CODE SECOND**

You MUST NEVER generate Vite/TypeScript/Tailwind/Alpine code without first fetching relevant documentation via MCP tools.

This is NON-NEGOTIABLE for all frontend development tasks.

## When to Use This Skill

Use this skill for ALL modern frontend development with:
- Vite build tool
- TypeScript configuration
- Tailwind CSS styling
- Alpine.js interactivity
- E-commerce UI components (product grids, cart, checkout)

## Core Workflows

### Workflow 1: Tailwind Layout & Styling

**Use for:** Any layout or styling with Tailwind CSS

**MANDATORY CHECKLIST:**

```
☐ 1. Identify layout pattern needed
     - Grid layout (product grids, galleries)
     - Flexbox (navbars, cards, buttons)
     - Stack (vertical/horizontal spacing)

☐ 2. ⚠️ MANDATORY: Fetch Tailwind documentation
     Call MCP tool: fetch_tailwind_docs(layout_type)
     Example: fetch_tailwind_docs("grid")
     Wait for response before continuing

☐ 3. ⚠️ MANDATORY: Fetch responsive patterns (if needed)
     Call MCP tool: fetch_tailwind_docs("responsive")
     Wait for response before continuing

☐ 4. Plan responsive breakpoints based on docs
     - Mobile first (default styles)
     - sm: (640px) - Small devices
     - md: (768px) - Tablets
     - lg: (1024px) - Laptops
     - xl: (1280px) - Desktops
     - 2xl: (1536px) - Large screens

☐ 5. Implement with Tailwind utilities:
     - Use utility classes (avoid @apply in HTML)
     - Responsive variants (sm:, md:, lg:, etc.)
     - Dark mode variants if needed (dark:)
     - Hover/focus states for interactive elements

☐ 6. VERIFY implementation:
     ✓ No custom CSS where Tailwind utilities exist
     ✓ Responsive on all breakpoints
     ✓ Proper spacing (gap, p-, m-)
     ✓ Accessibility (focus-visible, contrast)
     ✓ Performance (no unnecessary utilities)
```

**Example Execution:**

```html
<!-- WRONG: Generating without fetching docs -->
<div class="grid grid-cols-3">Products</div>

<!-- CORRECT: Workflow followed -->
<!-- 1. Identified: Grid layout for products -->
<!-- 2. Called: fetch_tailwind_docs("grid") -->
<!-- 3. Called: fetch_tailwind_docs("responsive") -->
<!-- 4. Reviewed current Tailwind grid utilities -->
<!-- 5. Now implementing with current utilities: -->

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  <!-- Product cards -->
</div>
```

### Workflow 2: Alpine.js Component

**Use for:** Interactive components with Alpine.js

**MANDATORY CHECKLIST:**

```
☐ 1. Identify reactivity needs:
     - State management (x-data)
     - Two-way binding (x-model)
     - Conditional rendering (x-show, x-if)
     - Event handling (@click, @submit, etc.)
     - Transitions (x-transition)

☐ 2. ⚠️ MANDATORY: Fetch Alpine patterns
     Call MCP tool: fetch_alpine_patterns(directive_type)
     Example: fetch_alpine_patterns("x-data")
     Wait for response before continuing

☐ 3. Plan component state and methods:
     - Initial state in x-data
     - Methods for interactions
     - Computed properties if needed

☐ 4. Implement Alpine component:
     - x-data="{ state }" for component state
     - x-init for initialization code
     - @event for event listeners
     - x-model for form bindings
     - x-show/x-if for conditionals
     - x-cloak to prevent flicker

☐ 5. Test reactivity:
     - State changes trigger UI updates
     - Events fire correctly
     - Form bindings work both ways

☐ 6. VERIFY Alpine usage:
     ✓ Using Alpine 3.x syntax (not v2)
     ✓ No jQuery where Alpine can do it
     ✓ Proper event handling (@click not onclick)
     ✓ x-cloak added to prevent flicker
     ✓ State properly initialized
```

**Example - Shopping Cart:**

```html
<!-- WRONG: jQuery/vanilla JS -->
<div id="cart">
  <button onclick="addToCart()">Add</button>
</div>

<!-- CORRECT: Alpine workflow followed -->
<!-- 1. Identified: Cart state + add-to-cart interaction -->
<!-- 2. Called: fetch_alpine_patterns("x-data") -->
<!-- 3. Called: fetch_alpine_patterns("@event") -->
<!-- 4. Reviewed Alpine 3.x docs -->
<!-- 5. Implementing with current Alpine syntax: -->

<div x-data="{
  cart: [],
  addToCart(product) {
    this.cart.push(product);
  }
}" x-cloak>
  <button
    @click="addToCart({ id: 1, name: 'Product' })"
    class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
  >
    Add to Cart
  </button>
  <span x-text="cart.length"></span> items
</div>
```

### Workflow 3: TypeScript Configuration

**Use for:** Setting up or modifying TypeScript config

**MANDATORY CHECKLIST:**

```
☐ 1. Determine TypeScript requirements:
     - Strict mode needed? (recommended: YES)
     - Path aliases needed?
     - Module resolution strategy

☐ 2. ⚠️ MANDATORY: Fetch TypeScript config docs
     Call MCP tool: fetch_typescript_config("strict-mode")
     Wait for response before continuing

☐ 3. Configure tsconfig.json:
     - "strict": true (MANDATORY)
     - "target": "ES2022" or newer
     - "module": "ESNext"
     - "moduleResolution": "bundler" (for Vite)
     - "noImplicitAny": true
     - "strictNullChecks": true

☐ 4. Set up path aliases if needed:
     - baseUrl and paths in tsconfig
     - Corresponding alias in vite.config.ts

☐ 5. Configure for Vite:
     - "moduleResolution": "bundler"
     - "types": ["vite/client"]
     - Allow .ts imports without extension

☐ 6. VERIFY TypeScript setup:
     ✓ No type errors
     ✓ Strict mode active
     ✓ Imports resolve correctly
     ✓ Vite recognizes types
```

### Workflow 4: Vite Build Configuration

**Use for:** Vite setup, plugins, optimization

**MANDATORY CHECKLIST:**

```
☐ 1. Identify Vite configuration needs:
     - Plugins (TypeScript, DTS generation, etc.)
     - Build optimization
     - Environment variables
     - Development server settings

☐ 2. ⚠️ MANDATORY: Fetch Vite config docs
     Call MCP tool: fetch_vite_config("optimization")
     Call additional topics as needed (plugins, env, etc.)
     Wait for responses

☐ 3. Configure vite.config.ts:
     - Plugins array
     - Build output settings
     - Resolve aliases
     - Server proxy if needed

☐ 4. Set up environment variables:
     - .env files for different modes
     - VITE_ prefix for client-side vars
     - Access via import.meta.env

☐ 5. Configure build optimization:
     - Code splitting
     - Chunk size warnings
     - Minification settings

☐ 6. VERIFY Vite setup:
     ✓ Fast HMR in development
     ✓ Optimized production build
     ✓ Source maps working
     ✓ Env variables accessible
```

### Workflow 5: E-commerce UI Component

**Use for:** Product cards, cart UI, checkout, admin dashboards

**MANDATORY CHECKLIST:**

```
☐ 1. Identify e-commerce component type:
     - Product card
     - Product grid/list
     - Shopping cart item
     - Checkout form
     - Price display
     - Image gallery

☐ 2. ⚠️ MANDATORY: Fetch e-commerce pattern
     Call MCP tool: get_ecommerce_ui_pattern(component_type)
     Example: get_ecommerce_ui_pattern("product-card")
     Wait for response

☐ 3. ⚠️ MANDATORY: Fetch Tailwind utilities needed
     Call MCP tool: fetch_tailwind_docs for layout/styling
     Example: fetch_tailwind_docs("grid")

☐ 4. ⚠️ MANDATORY: Fetch Alpine patterns if interactive
     Call MCP tool: fetch_alpine_patterns for interactivity
     Example: fetch_alpine_patterns("@event")

☐ 5. Implement e-commerce component:
     - Responsive layout (Tailwind grid/flex)
     - Product image with lazy loading
     - Price formatting and display
     - Add-to-cart interaction (Alpine)
     - Accessibility (alt tags, aria labels)

☐ 6. VERIFY e-commerce component:
     ✓ Works on mobile/tablet/desktop
     ✓ Images lazy load
     ✓ Price formatted correctly
     ✓ Cart interaction works
     ✓ Accessible (keyboard, screen reader)
     ✓ Performance optimized
```

**Example - Product Card:**

```html
<!-- CORRECT: Full workflow followed -->
<!-- 1. Identified: Product card component -->
<!-- 2. Called: get_ecommerce_ui_pattern("product-card") -->
<!-- 3. Called: fetch_tailwind_docs("grid") -->
<!-- 4. Called: fetch_alpine_patterns("x-data") -->
<!-- 5. Implementing: -->

<div
  x-data="{ adding: false }"
  class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
>
  <!-- Image -->
  <img
    src="product.jpg"
    alt="Product name"
    loading="lazy"
    class="w-full h-48 object-cover"
  >

  <!-- Content -->
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-2">Product Name</h3>
    <p class="text-gray-600 text-sm mb-4">Short description</p>

    <!-- Price -->
    <div class="flex items-center justify-between">
      <span class="text-xl font-bold text-gray-900">$29.99</span>

      <!-- Add to Cart -->
      <button
        @click="adding = true; setTimeout(() => adding = false, 2000)"
        :disabled="adding"
        class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
      >
        <span x-show="!adding">Add to Cart</span>
        <span x-show="adding" x-cloak>Added!</span>
      </button>
    </div>
  </div>
</div>
```

### Workflow 6: Form with Validation

**Use for:** Any form (contact, checkout, search, filters)

**MANDATORY CHECKLIST:**

```
☐ 1. Plan form structure:
     - Input fields needed
     - Validation rules
     - Submit handling

☐ 2. ⚠️ MANDATORY: Fetch Alpine form patterns
     Call MCP tool: fetch_alpine_patterns("x-model")
     Wait for response

☐ 3. ⚠️ MANDATORY: Fetch Tailwind form styles
     Call MCP tool: fetch_tailwind_docs("forms")
     Wait for response

☐ 4. Implement form structure:
     - Alpine x-data for form state
     - x-model for two-way binding
     - Validation methods in Alpine
     - Error state handling with x-show

☐ 5. Style with Tailwind:
     - Form controls (input, select, textarea)
     - Labels and error messages
     - Submit button states
     - Focus states for accessibility

☐ 6. VERIFY form:
     ✓ Validation works client-side
     ✓ Error messages display correctly
     ✓ Form submission handled
     ✓ Accessible labels and error association
     ✓ Keyboard navigation works
```

## Code Quality Requirements

### TypeScript 5.7+ Requirements (MANDATORY)

**tsconfig.json essentials:**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "types": ["vite/client"]
  }
}
```

**Code patterns:**
```typescript
// ✓ CORRECT: Strict types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [];

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// ✗ WRONG: No types
const products = [];
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}
```

### Tailwind 4.1 Best Practices (MANDATORY)

**Utility-first approach:**
```html
<!-- ✓ CORRECT: Tailwind utilities -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
    Content
  </div>
</div>

<!-- ✗ WRONG: Custom CSS -->
<div class="product-grid">
  <div class="product-card">Content</div>
</div>

<style>
.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.product-card { background: white; padding: 1rem; }
</style>
```

**Responsive mobile-first:**
```html
<!-- ✓ CORRECT: Mobile-first responsive -->
<div class="text-sm md:text-base lg:text-lg">
  <img class="w-full md:w-1/2 lg:w-1/3" src="..." alt="...">
</div>

<!-- ✗ WRONG: Desktop-first -->
<div class="text-lg md:text-base sm:text-sm">
  Content
</div>
```

### Alpine.js 3.x Patterns (MANDATORY)

**Reactive state:**
```html
<!-- ✓ CORRECT: Alpine 3 reactivity -->
<div x-data="{ open: false, count: 0 }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open" x-transition>
    <button @click="count++">Clicked: <span x-text="count"></span></button>
  </div>
</div>

<!-- ✗ WRONG: jQuery/vanilla -->
<div id="app">
  <button onclick="toggleOpen()">Toggle</button>
</div>
<script>
let open = false;
function toggleOpen() {
  open = !open;
  document.querySelector('#content').style.display = open ? 'block' : 'none';
}
</script>
```

### Vite 6.x Configuration

**Optimized config:**
```typescript
// ✓ CORRECT: vite.config.ts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['alpine', 'autocomplete'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
```

## Decision Trees

### "Which Tailwind utility to use?"

```
Need to center content?
├─ Flex parent → flex justify-center items-center
├─ Grid parent → place-items-center
├─ Block element → mx-auto (with defined width)
└─ Text → text-center

Need spacing?
├─ Between flex/grid children → gap-4
├─ Inside element → p-4 (padding)
├─ Outside element → m-4 (margin)
└─ Specific side → pt-4, pl-2, etc.
```

### "Alpine.js or TypeScript?"

```
Interactivity type?
├─ Show/hide elements → Alpine (x-show, x-if)
├─ Form binding → Alpine (x-model)
├─ Click handling → Alpine (@click)
├─ Complex business logic → TypeScript class + Alpine for UI
├─ API calls → TypeScript function + Alpine for state
└─ Animation → Alpine (x-transition) or CSS
```

### "Custom CSS or Tailwind?"

```
Can Tailwind utilities do it?
├─ YES → Use Tailwind utilities
└─ NO → Ask: Is this a rare case?
    ├─ YES, one-off → Inline style="" or single utility
    ├─ NO, reusable → @layer components in CSS
    └─ Complex animation → @keyframes in CSS
```

## Common Mistakes to Avoid

**DON'T:**
- Generate code without fetching docs first
- Use Tailwind 3.x or older syntax (old JIT mode, old config format)
- Use Alpine 2.x syntax (old x-spread, old $refs patterns)
- Put business logic in Alpine x-data (use TypeScript)
- Disable TypeScript strict mode
- Write custom CSS where Tailwind utilities exist
- Use jQuery when Alpine.js can do it
- Ignore responsive design
- Skip accessibility (alt tags, aria labels)
- Forget lazy loading for images

**DO:**
- ALWAYS fetch documentation before implementing
- Follow workflows step-by-step
- Use Tailwind 4.1 CSS-first configuration and utilities
- Use Alpine 3.x directives correctly
- Write TypeScript with strict mode
- Mobile-first responsive design
- Add proper accessibility attributes
- Lazy load images and heavy content
- Test on multiple screen sizes
- Optimize bundle size

## Integration with MCP Server

This skill works with the Frontend MCP server. MCP provides current docs, this skill enforces the workflow.

**Available MCP Tools:**

1. `fetch_tailwind_docs(topic)` - Tailwind utilities and patterns
2. `fetch_alpine_patterns(directive)` - Alpine.js directive usage
3. `fetch_vite_config(topic)` - Vite configuration
4. `fetch_typescript_config(topic)` - TypeScript config
5. `search_tailwind_utilities(query)` - Search Tailwind utilities
6. `get_ecommerce_ui_pattern(pattern)` - E-commerce UI patterns

**Call these tools at workflow steps marked with ⚠️ MANDATORY**

## Verification Before Completion

Before considering any frontend implementation complete:

```
FINAL VERIFICATION CHECKLIST:
☐ All MANDATORY MCP tool calls were made
☐ Implementation follows fetched documentation
☐ Uses Tailwind 4.1 utilities
☐ Uses Alpine 3.x+ syntax (if interactive)
☐ TypeScript 5.7+ with strict mode
☐ Vite 6.x+ configuration
☐ Responsive (mobile/tablet/desktop)
☐ Accessible (keyboard, screen reader)
☐ Performance optimized (lazy loading, code splitting)
☐ No custom CSS where Tailwind works
☐ No jQuery where Alpine works
```

## Summary

This skill enforces **DOCS-FIRST** development for modern frontend:

1. **Identify task** → Choose workflow
2. **Fetch docs** → Call MCP tools (MANDATORY)
3. **Review docs** → Understand current utilities/patterns
4. **Implement** → Follow fetched docs exactly
5. **Verify** → Check against quality checklist

**NEVER skip step 2.** The MCP server provides current documentation for Tailwind, Alpine, Vite, and TypeScript. Use it.

Your workflows ensure modern, accessible, performant e-commerce frontends using current best practices.
