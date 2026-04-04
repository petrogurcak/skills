# Frontend Workflow System

Complete AI-assisted development system for modern frontend with **Vite + TypeScript + Tailwind + Alpine.js**. Optimized for e-commerce development (Sellastica).

## Overview

This system provides:
1. **Frontend Workflow Skill** - Enforces docs-first development workflows
2. **Frontend MCP Server** - Fetches live documentation from official sources
3. **E-commerce Patterns** - Production-ready components for online stores

**Philosophy:** Always consult current documentation before generating code. Never rely on potentially outdated training data.

## Tech Stack

- **Vite 6.x** - Build tool and dev server
- **TypeScript 5.7+** - Type-safe JavaScript
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **Alpine.js 3.x** - Lightweight reactive framework

## Quick Start

### 1. Install MCP Server
```bash
cd frontend/frontend-mcp
npm install
npm run build
```

### 2. Install Skill Globally
```bash
# Copy skill to global Claude skills directory
cp frontend/frontend-workflow.skill ~/.claude/skills/
```

### 3. Configure MCP in Claude Code

Edit `~/.config/claude/mcp.json`:
```json
{
  "mcpServers": {
    "frontend-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/frontend/frontend-mcp/build/index.js"]
    }
  }
}
```

**Important:** Replace `/absolute/path/to/` with your actual absolute path.

### 4. Restart Claude Code

The skill and MCP server will be active after restart.

## How It Works

### Workflow-First Development

When you ask Claude to build something, the system follows mandatory workflows:

**Example: "Create a product grid"**

```
1. User Request: "Create a responsive product grid with 4 columns"

2. Skill Activates: frontend-workflow.skill detects this matches "Tailwind Layout & Styling" workflow

3. Mandatory Steps Execute:
   ☐ Identify layout type → grid
   ☐ ⚠️ MANDATORY: fetch_tailwind_docs(topic: "grid")
      → Returns Tailwind grid documentation
   ☐ ⚠️ MANDATORY: search_tailwind_utilities(query: "grid-cols")
      → Returns grid utility classes
   ☐ ⚠️ OPTIONAL: get_ecommerce_ui_pattern(pattern: "product-grid")
      → Returns production-ready product grid code

4. AI Generates Code:
   - Uses fetched Tailwind documentation (not training data)
   - Applies current best practices
   - Includes responsive breakpoints
   - Adds accessibility features

5. Result: Production-ready code using latest documentation
```

### 6 Core Workflows

Each workflow enforces MANDATORY documentation fetching:

#### 1. Tailwind Layout & Styling
**When:** Creating layouts, grids, flexbox, responsive designs

**Mandatory Steps:**
- Fetch Tailwind documentation for layout type
- Search specific utilities needed
- Get e-commerce pattern if applicable

**Example:**
```
User: "Create a 3-column product grid"
→ fetch_tailwind_docs(topic: "grid")
→ search_tailwind_utilities(query: "grid-cols", category: "layout")
→ get_ecommerce_ui_pattern(pattern: "product-grid")
```

#### 2. Alpine.js Component
**When:** Adding interactivity, state management, event handling

**Mandatory Steps:**
- Fetch Alpine patterns for needed directives
- Get e-commerce pattern if applicable

**Example:**
```
User: "Add quantity selector with + and - buttons"
→ fetch_alpine_patterns(directive: "x-data")
→ fetch_alpine_patterns(directive: "@event")
→ get_ecommerce_ui_pattern(pattern: "quantity-selector")
```

#### 3. TypeScript Configuration
**When:** Configuring tsconfig.json, path aliases, strict mode

**Mandatory Steps:**
- Fetch TypeScript configuration docs
- Fetch Vite config for TypeScript integration

**Example:**
```
User: "Set up path aliases for @components and @utils"
→ fetch_typescript_config(topic: "path-aliases")
→ fetch_vite_config(topic: "general")
```

#### 4. Vite Build Configuration
**When:** Configuring Vite, plugins, optimization, env variables

**Mandatory Steps:**
- Fetch Vite configuration docs

**Example:**
```
User: "Add vite-plugin-dts to generate .d.ts files"
→ fetch_vite_config(topic: "plugins")
```

#### 5. E-commerce UI Component
**When:** Building product cards, carts, checkout, filters

**Mandatory Steps:**
- Get e-commerce pattern
- Fetch related Tailwind docs
- Fetch related Alpine patterns

**Example:**
```
User: "Create an add-to-cart button with loading state"
→ get_ecommerce_ui_pattern(pattern: "add-to-cart", framework: "alpine")
→ fetch_alpine_patterns(directive: "x-data")
→ fetch_tailwind_docs(topic: "colors")
```

#### 6. Form with Validation
**When:** Creating forms with validation, submission, error handling

**Mandatory Steps:**
- Fetch Alpine form patterns
- Fetch Tailwind form styling
- Get e-commerce checkout pattern if applicable

**Example:**
```
User: "Create a checkout form with address validation"
→ get_ecommerce_ui_pattern(pattern: "checkout-form")
→ fetch_alpine_patterns(directive: "x-model")
→ fetch_tailwind_docs(topic: "forms")
```

## Available MCP Tools

### Documentation Tools

**1. fetch_tailwind_docs**
```javascript
fetch_tailwind_docs({
  topic: "grid",           // grid, flex, padding, colors, responsive, etc.
  include_examples: true   // Include code examples
})
```

**2. fetch_alpine_patterns**
```javascript
fetch_alpine_patterns({
  directive: "x-data",     // x-data, x-model, x-show, x-if, x-for, @event, etc.
  use_case: "product card" // Optional context
})
```

**3. fetch_vite_config**
```javascript
fetch_vite_config({
  topic: "plugins"         // plugins, optimization, env, build, dev-server, general
})
```

**4. fetch_typescript_config**
```javascript
fetch_typescript_config({
  topic: "path-aliases"    // strict-mode, path-aliases, module-resolution, general
})
```

### Search & Pattern Tools

**5. search_tailwind_utilities**
```javascript
search_tailwind_utilities({
  query: "flex-col",       // Search term
  category: "layout"       // layout, spacing, typography, colors, all
})
```

**6. get_ecommerce_ui_pattern**
```javascript
get_ecommerce_ui_pattern({
  pattern: "product-grid", // See list below
  framework: "alpine"      // alpine or vanilla
})
```

**Available E-commerce Patterns:**
- `product-grid` - Responsive product grid with lazy loading
- `product-card` - Individual product card with hover effects
- `cart-item` - Cart line item with quantity controls
- `checkout-form` - Multi-step checkout with validation
- `price-display` - Price formatting with discounts
- `quantity-selector` - Quantity input with +/- buttons
- `add-to-cart` - Add to cart button with loading states
- `filter-sidebar` - Product filtering sidebar
- `search-bar` - Product search with autocomplete
- `breadcrumbs` - Navigation breadcrumbs

## Usage Examples

### Example 1: Product Listing Page

**Request:**
```
Create a product listing page with:
- 4-column grid (responsive to 2 cols on tablet, 1 on mobile)
- Product cards with images, titles, prices
- Add to cart buttons
- Lazy loading images
```

**System Flow:**
1. Workflow: Tailwind Layout & Styling
   - `fetch_tailwind_docs(topic: "grid")`
   - `search_tailwind_utilities(query: "grid-cols", category: "layout")`

2. Workflow: E-commerce UI Component
   - `get_ecommerce_ui_pattern(pattern: "product-grid", framework: "alpine")`
   - `get_ecommerce_ui_pattern(pattern: "product-card", framework: "alpine")`

3. AI generates production-ready code with:
   - Responsive Tailwind grid
   - Alpine.js state management
   - Lazy loading
   - Accessibility features
   - SEO optimization

### Example 2: Shopping Cart

**Request:**
```
Build a shopping cart with:
- Cart items list with images
- Quantity selectors
- Remove item buttons
- Total price calculation
- Checkout button
```

**System Flow:**
1. Workflow: Alpine.js Component
   - `fetch_alpine_patterns(directive: "x-data")`
   - `fetch_alpine_patterns(directive: "@event")`

2. Workflow: E-commerce UI Component
   - `get_ecommerce_ui_pattern(pattern: "cart-item", framework: "alpine")`
   - `get_ecommerce_ui_pattern(pattern: "quantity-selector")`

3. AI generates cart with:
   - Real-time total updates
   - Optimistic UI updates
   - API integration examples
   - Error handling

### Example 3: TypeScript Setup

**Request:**
```
Configure TypeScript for my Vite project with:
- Strict mode enabled
- Path aliases (@components, @utils, @types)
- ESNext modules
```

**System Flow:**
1. Workflow: TypeScript Configuration
   - `fetch_typescript_config(topic: "strict-mode")`
   - `fetch_typescript_config(topic: "path-aliases")`
   - `fetch_typescript_config(topic: "module-resolution")`

2. Workflow: Vite Build Configuration
   - `fetch_vite_config(topic: "general")`

3. AI generates:
   - Optimized tsconfig.json
   - Matching vite.config.ts with path aliases
   - Type definitions setup

## Project Structure

```
frontend/
├── README.md                          # This file
├── frontend-workflow.skill            # Workflow skill definition
├── frontend-mcp/                      # MCP server
│   ├── src/
│   │   ├── index.ts                   # Server entry point
│   │   ├── tools/                     # 6 MCP tools
│   │   ├── fetchers/                  # HTTP + HTML→MD conversion
│   │   └── cache/                     # In-memory doc cache
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md                      # MCP server docs
└── docs/
    └── plans/
        └── 2025-11-17-frontend-workflow-system-design.md  # Design doc
```

## Features

### Documentation Caching
- **20-minute TTL** - Reduces network requests
- **Stale fallback** - Works offline with cached docs
- **Auto-refresh** - Always stays current

### E-commerce Optimization
All patterns include:
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **SEO**: Semantic HTML, structured data, proper heading hierarchy
- **Performance**: Lazy loading, code splitting, optimized images
- **Responsive**: Mobile-first, all breakpoints covered

### HTML to Markdown
Documentation is converted to clean markdown with:
- Proper code blocks
- Working links
- Clean formatting
- No navigation/footer clutter

## Workflow Enforcement

The skill enforces workflows with **MANDATORY** steps that cannot be skipped:

**Example from skill:**
```
☐ 2. ⚠️ MANDATORY: Fetch Tailwind documentation
     Call MCP tool: fetch_tailwind_docs(layout_type)
     Wait for response before continuing
     Do NOT skip this step
     Do NOT use training data
```

If AI tries to skip a MANDATORY step, the skill will halt and require the step to be completed.

## Benefits

### 1. Always Current
Documentation is fetched live from official sources, never stale training data.

### 2. Docs-First Approach
AI must consult documentation before generating code, ensuring accuracy.

### 3. Production-Ready
E-commerce patterns are battle-tested and include best practices.

### 4. Consistent Quality
Workflows enforce consistent approach across all development tasks.

### 5. E-commerce Optimized
Built specifically for Sellastica and online store development.

## Troubleshooting

### Skill Not Loading
```bash
# Check skill is in correct location
ls ~/.claude/skills/frontend-workflow.skill

# Verify file permissions
chmod 644 ~/.claude/skills/frontend-workflow.skill
```

### MCP Server Not Connecting
```bash
# Rebuild server
cd frontend/frontend-mcp
npm run build

# Check config file
cat ~/.config/claude/mcp.json

# Verify absolute path is correct
node /absolute/path/to/frontend/frontend-mcp/build/index.js
```

### Documentation Fetch Errors
1. Check internet connection
2. Verify upstream docs are accessible
3. Check cache has stale fallback
4. Restart MCP server

### TypeScript Build Errors
```bash
cd frontend/frontend-mcp
npm install
npm run build
```

## Development

### Building MCP Server
```bash
cd frontend/frontend-mcp
npm install
npm run build
```

### Watch Mode
```bash
npm run watch
```

### Testing Workflows
Ask Claude to perform tasks matching the 6 workflows and verify:
1. MANDATORY steps are executed
2. Documentation is fetched
3. Code uses current best practices
4. No training data fallback

## Related Systems

This frontend system follows the same architecture as:
- **Nette System**: PHP + Latte + Tracy (speed-first)
- **Flutter System**: Flutter + Dart (docs-first)

All three systems use:
- Workflow skills in `~/.claude/skills/`
- MCP servers with live documentation
- Global configuration in `~/.config/claude/mcp.json`

## Documentation Sources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Alpine.js**: https://alpinejs.dev
- **Vite**: https://vitejs.dev
- **TypeScript**: https://www.typescriptlang.org

## License

MIT
