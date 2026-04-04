# Nette MCP Server

Model Context Protocol (MCP) server providing real-time access to Nette Framework documentation.

## Features

- **Live Documentation**: Always current docs from nette.org, latte.nette.org, tracy.nette.org
- **Smart Caching**: 30-minute cache for fast responses, fallback to stale cache if offline
- **Multiple Tools**: 5 specialized tools for different Nette components
- **Error Handling**: Graceful fallbacks and helpful error messages

## Tools

### 1. `fetch_nette_documentation`
Fetch specific Nette Framework documentation.

**Parameters:**
- `component`: "framework" | "database" | "forms" | "mail" | "utils" | "security"
- `topic`: string (e.g., "presenter", "routing", "validation")
- `language`: "en" | "cs" (optional, default: "en")

**Example:**
```json
{
  "component": "framework",
  "topic": "presenter",
  "language": "en"
}
```

### 2. `search_latte_syntax`
Search Latte template syntax and features.

**Parameters:**
- `query`: string (e.g., "n:if", "filters", "custom macros")

**Example:**
```json
{
  "query": "custom filters"
}
```

### 3. `get_tracy_feature`
Get Tracy debugger feature documentation.

**Parameters:**
- `feature`: "bar-dump" | "logger" | "bluescreen" | "custom-panel" | "production-mode" | "debugger" | "email"

**Example:**
```json
{
  "feature": "custom-panel"
}
```

### 4. `lookup_di_pattern`
Look up Nette DI container patterns.

**Parameters:**
- `pattern`: "services" | "factories" | "decorators" | "extensions" | "autowiring" | "configuration"

**Example:**
```json
{
  "pattern": "factories"
}
```

### 5. `search_nette_api`
Full-text search across all Nette documentation.

**Parameters:**
- `query`: string (free-text search)
- `scope`: "all" | "framework" | "latte" | "tracy" | "di" (optional, default: "all")

**Example:**
```json
{
  "query": "persistent parameters",
  "scope": "framework"
}
```

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Configure Claude Code

Add to your Claude Code MCP settings (usually `~/.config/claude/mcp.json`):

```json
{
  "mcpServers": {
    "nette": {
      "command": "node",
      "args": ["/path/to/nette-mcp/dist/index.js"]
    }
  }
}
```

Or if you want to use it globally after publishing:

```bash
npm install -g nette-mcp
```

Then configure:

```json
{
  "mcpServers": {
    "nette": {
      "command": "nette-mcp"
    }
  }
}
```

## Development

### Watch Mode

```bash
npm run watch
```

### Testing

```bash
npm run dev
```

## How It Works

1. **Fetching**: Tools fetch documentation from official Nette websites
2. **Parsing**: HTML is converted to clean markdown using cheerio and turndown
3. **Caching**: Results cached for 30 minutes to reduce latency
4. **Fallback**: If network fails, returns stale cache if available

## Cache

- **TTL**: 30 minutes (1800 seconds)
- **Storage**: In-memory (node-cache)
- **Stale Fallback**: Yes (returns stale data if fetch fails)

To clear cache, restart the server.

## Architecture

```
nette-mcp/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── tools/                # Tool implementations
│   │   ├── nette-docs.ts     # Nette Framework docs
│   │   ├── latte-syntax.ts   # Latte syntax search
│   │   ├── tracy-feature.ts  # Tracy debugger docs
│   │   ├── di-pattern.ts     # DI patterns
│   │   └── api-search.ts     # Full-text search
│   ├── fetchers/             # Documentation fetching
│   │   └── base-fetcher.ts   # Base fetcher with HTML parsing
│   └── cache/                # Caching layer
│       └── doc-cache.ts      # Cache implementation
├── dist/                     # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Used With

This MCP server is designed to work alongside the **nette-framework.skill** which provides:
- Best practices and patterns (always active)
- Decision trees and checklists
- Code style enforcement

**Workflow:**
1. Skill provides instant patterns for common tasks (80% of work)
2. MCP server provides current documentation for details (20% of work)
3. Together: Fast, accurate, always current Nette development

## Documentation Sources

- **Nette Framework**: https://nette.org/en/documentation
- **Latte**: https://latte.nette.org/en
- **Tracy**: https://tracy.nette.org/en
- **API Reference**: https://api.nette.org

## License

MIT

## Contributing

Issues and pull requests welcome!

## Changelog

### 1.0.0
- Initial release
- 5 documentation tools
- Caching layer
- Error handling with fallbacks
