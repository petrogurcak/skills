# Frontend MCP Server

MCP (Model Context Protocol) server providing live documentation access for frontend development with Vite, TypeScript, Tailwind CSS, and Alpine.js.

## Overview

This MCP server fetches up-to-date documentation and provides production-ready code patterns for modern frontend development. It's designed to work seamlessly with the Frontend Workflow Skill in Claude Code.

**Tech Stack:**
- **Vite 6.x** - Build tool and dev server
- **TypeScript 5.7+** - Type-safe JavaScript
- **Tailwind CSS 4.1** - CSS-first configuration with improved utilities
- **Alpine.js 3.x** - Lightweight JavaScript framework

**E-commerce Focus:**
Optimized for e-commerce development with Sellastica-specific patterns and components.

## Available Tools

### 1. `fetch_tailwind_docs`
Fetch Tailwind CSS documentation for specific topics.

**Parameters:**
- `topic` (string, required): Topic to fetch (e.g., "grid", "flex", "responsive", "padding")
- `include_examples` (boolean, optional): Include code examples (default: true)

**Example:**
```json
{
  "topic": "grid",
  "include_examples": true
}
```

**Common topics:**
- Layout: `grid`, `flex`, `display`, `position`
- Spacing: `padding`, `margin`, `gap`, `space`
- Typography: `font-size`, `font-weight`, `text-align`, `text-color`
- Colors: `background-color`, `text-color`, `border-color`
- Responsive: `responsive`, `breakpoints`
- Dark mode: `dark-mode`, `dark`

### 2. `fetch_alpine_patterns`
Fetch Alpine.js patterns and examples for specific directives.

**Parameters:**
- `directive` (string, required): Alpine directive (x-data, x-model, x-show, x-if, x-for, @event, x-transition, x-init, general)
- `use_case` (string, optional): Specific use case or context

**Example:**
```json
{
  "directive": "x-data",
  "use_case": "product card component"
}
```

**Available directives:**
- `x-data` - Define component state
- `x-model` - Two-way data binding
- `x-show` - Toggle visibility
- `x-if` - Conditional rendering
- `x-for` - Loop over arrays
- `@event` - Event handling
- `x-transition` - Animations
- `x-init` - Initialization logic

### 3. `fetch_vite_config`
Fetch Vite configuration documentation.

**Parameters:**
- `topic` (string, required): plugins | optimization | env | build | dev-server | general

**Example:**
```json
{
  "topic": "plugins"
}
```

### 4. `fetch_typescript_config`
Fetch TypeScript configuration documentation optimized for Vite.

**Parameters:**
- `topic` (string, required): strict-mode | path-aliases | module-resolution | general

**Example:**
```json
{
  "topic": "path-aliases"
}
```

### 5. `search_tailwind_utilities`
Search for specific Tailwind CSS utilities.

**Parameters:**
- `query` (string, required): Search query (e.g., "flex-col", "grid-cols-3")
- `category` (string, optional): layout | spacing | typography | colors | all (default: all)

**Example:**
```json
{
  "query": "flex-col",
  "category": "layout"
}
```

### 6. `get_ecommerce_ui_pattern`
Get production-ready e-commerce UI patterns.

**Parameters:**
- `pattern` (string, required): Pattern name
- `framework` (string, optional): alpine | vanilla (default: alpine)

**Available patterns:**
- `product-grid` - Responsive product grid layout
- `product-card` - Individual product card
- `cart-item` - Shopping cart line item
- `checkout-form` - Multi-step checkout
- `price-display` - Price with discounts
- `quantity-selector` - Quantity input
- `add-to-cart` - Add to cart button
- `filter-sidebar` - Product filters
- `search-bar` - Product search
- `breadcrumbs` - Navigation breadcrumbs

**Example:**
```json
{
  "pattern": "product-grid",
  "framework": "alpine"
}
```

## Features

### Documentation Caching
- **20-minute TTL** - Reduces API calls
- **Stale fallback** - Works offline with cached data
- **Auto-refresh** - Updates when cache expires

### HTML to Markdown Conversion
All documentation is converted to clean, readable markdown with:
- Proper heading hierarchy
- Code blocks with syntax highlighting
- Working links (relative URLs converted to absolute)
- Cleaned navigation and footer elements

### E-commerce Optimization
Patterns include:
- Accessibility guidelines (ARIA, keyboard navigation)
- SEO best practices (semantic HTML, structured data)
- Performance tips (lazy loading, code splitting)
- Responsive design (mobile-first approach)

## Installation

### 1. Install Dependencies
```bash
cd frontend/frontend-mcp
npm install
```

### 2. Build Server
```bash
npm run build
```

### 3. Configure Claude Code

Add to `~/.config/claude/mcp.json`:

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

**Replace `/absolute/path/to/` with your actual path.**

### 4. Restart Claude Code

The MCP server will be available after restart.

## Development

### Project Structure
```
frontend-mcp/
├── src/
│   ├── index.ts              # Server entry point
│   ├── tools/                # MCP tools
│   │   ├── tailwind-docs.ts
│   │   ├── alpine-patterns.ts
│   │   ├── vite-config.ts
│   │   ├── typescript-config.ts
│   │   ├── search-tailwind-utilities.ts
│   │   └── ecommerce-patterns.ts
│   ├── fetchers/
│   │   └── base-fetcher.ts   # HTTP client + HTML→MD
│   └── cache/
│       └── doc-cache.ts      # In-memory cache
├── package.json
├── tsconfig.json
└── README.md
```

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run watch
```

### Testing Tools Manually

Test a tool by calling it through Claude Code or by running the server directly:

```bash
npm run build
node build/index.js
```

Then send JSON-RPC requests to test tools.

## Usage with Frontend Workflow Skill

This MCP server is designed to work with the **Frontend Workflow Skill**. The skill enforces a docs-first approach:

**Workflow Example:**
1. User asks to create a product grid
2. Skill triggers: **MANDATORY fetch_tailwind_docs(grid)**
3. MCP returns Tailwind grid documentation
4. Skill triggers: **MANDATORY fetch_alpine_patterns(x-for)**
5. MCP returns Alpine loop documentation
6. Skill triggers: **OPTIONAL get_ecommerce_ui_pattern(product-grid)**
7. MCP returns production-ready product grid code
8. AI generates code using fetched documentation

**Result:** Always uses current, accurate documentation instead of potentially outdated training data.

## Cache Management

The server uses in-memory caching with:
- **20-minute TTL** per documentation page
- **Stale-while-revalidate** pattern
- **LRU eviction** when memory limit reached

To clear cache: Restart the MCP server.

## Troubleshooting

### Server Not Connecting
1. Check `~/.config/claude/mcp.json` path is absolute
2. Ensure server is built: `npm run build`
3. Check logs in Claude Code developer tools
4. Verify Node.js version (16+ required)

### Documentation Fetch Errors
1. Check internet connection
2. Verify upstream docs are accessible
3. Check if cached fallback is available
4. Try alternative topic/pattern names

### TypeScript Errors
```bash
npm install
npm run build
```

### Cache Issues
Restart the MCP server to clear cache.

## Documentation Sources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Alpine.js**: https://alpinejs.dev
- **Vite**: https://vitejs.dev
- **TypeScript**: https://www.typescriptlang.org

## License

MIT

## Related

- **Frontend Workflow Skill**: `~/.claude/skills/frontend-workflow.skill`
- **Design Document**: `../docs/plans/2025-11-17-frontend-workflow-system-design.md`
