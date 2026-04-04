# Nette Framework Knowledge System

Complete AI assistant tooling for Nette Framework development: Skill + MCP Server for modern, accurate, and fast Nette coding.

## What Is This?

A hybrid system that makes AI assistants (like Claude) expert Nette developers:

**🎯 Nette Skill** (Always Active)
- Embedded best practices and patterns
- Decision trees for fast coding
- Modern PHP 8.1+ conventions
- ~5-10 KB context overhead

**📚 Nette MCP Server** (On-Demand)
- Live documentation from nette.org
- Always current API reference
- 5 specialized documentation tools
- Zero overhead when disabled

## Why Both?

| Aspect | Skill | MCP Server |
|--------|-------|------------|
| **Speed** | Instant | 1-2 seconds |
| **Accuracy** | Patterns | Current docs |
| **Offline** | ✅ Works | ❌ Needs internet |
| **Context** | 5-10 KB | 0 KB (when off) |
| **Use For** | Common patterns (80%) | Detailed docs (20%) |

**Together:** AI knows patterns instantly AND can fetch latest docs when needed.

## Installation

### 1. Install the Skill

Copy `nette-framework.skill` to your Claude Code skills directory:

```bash
# Linux/Mac
cp nette-framework.skill ~/.claude/skills/

# Or create symlink for easier updates
ln -s $(pwd)/nette-framework.skill ~/.claude/skills/nette-framework.skill
```

The skill is now always active when working with Nette projects.

### 2. Install the MCP Server (Optional)

```bash
cd nette-mcp
npm install
npm run build
```

Add to Claude Code MCP config (`~/.config/claude/mcp.json`):

```json
{
  "mcpServers": {
    "nette": {
      "command": "node",
      "args": ["/absolute/path/to/nette-mcp/dist/index.js"]
    }
  }
}
```

### 3. Restart Claude Code

The skill will be active immediately. Enable/disable MCP server as needed.

## Usage

### Skill Usage (Automatic)

The skill activates automatically for Nette tasks:

**Example 1: Create Presenter**
```
You: "Create a UserPresenter with login action"

AI: [Uses skill patterns]
✓ Extends UI\Presenter
✓ declare(strict_types=1)
✓ Constructor injection
✓ action/render methods
✓ Type hints everywhere
```

**Example 2: Latte Template**
```
You: "Add user list to template"

AI: [Uses skill security rules]
✓ n:attributes for HTML
✓ Auto-escaping trusted
✓ {foreach} with {else}
✓ Proper {$variable} syntax
```

### MCP Server Usage (On-Demand)

AI uses MCP tools when it needs current documentation:

**Example 1: Less Common Feature**
```
You: "How do I create a custom Latte filter for dates?"

AI: [Checks skill - knows custom filters exist]
AI: [Calls MCP: search_latte_syntax("custom filters")]
AI: [Gets current docs]
AI: [Provides accurate implementation]
```

**Example 2: Latest API**
```
You: "Set up Tracy custom panel"

AI: [Uses skill for basic pattern]
AI: [Calls MCP: get_tracy_feature("custom-panel")]
AI: [Gets latest IBarPanel interface]
AI: [Implements correctly]
```

## What You Get

### ✅ Modern Patterns
- PHP 8.1+ features (attributes, constructor promotion, enums)
- Nette 3.x+ conventions
- No deprecated code
- Type hints everywhere

### ✅ Security First
- Latte auto-escaping rules
- CSRF protection
- Proper n:attributes usage
- Safe Tracy debugging

### ✅ Best Practices
- Dependency injection
- Component model
- Service layer architecture
- Clean code structure

### ✅ Fast Development
- Instant pattern matching
- No trial and error
- Correct first time
- Current documentation

## Components Overview

### Nette Skill

**Contains:**
- Presenter patterns and lifecycle
- Component creation and signals
- Latte templates (security, syntax, filters)
- Tracy debugging (dump, log, panels)
- DI container (services, factories, decorators)
- Forms and validation
- Database patterns
- Code style rules

**Size:** ~5-10 KB (concise, decision trees and checklists)

**See:** [nette-framework.skill](./nette-framework.skill)

### Nette MCP Server

**Tools:**
1. `fetch_nette_documentation` - Framework, database, forms, etc.
2. `search_latte_syntax` - Template syntax and features
3. `get_tracy_feature` - Debugger documentation
4. `lookup_di_pattern` - DI container patterns
5. `search_nette_api` - Full-text search

**See:** [nette-mcp/README.md](./nette-mcp/README.md)

## Workflow Examples

### Creating a New Presenter

```
You: "Create ArticlePresenter with list and detail actions"

1. Skill activates
2. AI generates code using patterns:
   - extends UI\Presenter
   - Constructor DI
   - actionList(), renderList()
   - actionDetail(int $id), renderDetail()
   - Type hints
3. Done in seconds, no external lookups
```

### Working with Less Common API

```
You: "Add custom Tracy panel for API call tracking"

1. Skill knows Tracy extensibility basics
2. AI realizes it needs implementation details
3. MCP tool: get_tracy_feature("custom-panel")
4. Gets current IBarPanel interface
5. AI implements using both:
   - Skill pattern (how Tracy panels work)
   - MCP docs (exact current API)
6. Result: Correct, modern implementation
```

## Context Management

### Skill Only (Default)
```
Context Usage: ~5-10 KB
When: Always (minimal overhead)
```

### MCP Enabled
```
Context Usage: ~7-13 KB
When: MCP server running
Note: Tools listed but not loaded
```

### MCP Tool Called
```
Context Usage: 10-23 KB (peak)
When: AI fetches documentation
Note: Only when actually needed
```

**Compare:** Without this system, AI might hallucinate or use outdated patterns with no context control.

## Maintenance

### Skill Updates
**Frequency:** 1-2 times per year
**When:** Major Nette version releases
**Effort:** 2-4 hours

### MCP Server Updates
**Frequency:** As needed (rarely)
**When:** Nette.org structure changes
**Effort:** 1-2 hours per year

**Bonus:** MCP automatically fetches latest docs, so API changes are always current.

## Documentation

- **Design Document:** [docs/plans/2025-11-16-nette-framework-knowledge-system-design.md](./docs/plans/2025-11-16-nette-framework-knowledge-system-design.md)
- **Skill Reference:** [nette-framework.skill](./nette-framework.skill)
- **MCP Server:** [nette-mcp/README.md](./nette-mcp/README.md)

## Success Criteria

After installation, AI should:
- ✅ Never suggest deprecated patterns
- ✅ Follow Nette coding standards automatically
- ✅ Generate correct code on first try (>90% of cases)
- ✅ Know how to integrate DI, Latte, Tracy, Database
- ✅ Use modern PHP 8.1+ features
- ✅ Fetch current docs only when needed

## Troubleshooting

### Skill Not Active
- Check skill file is in `~/.claude/skills/`
- Restart Claude Code
- Verify file has `.skill` extension

### MCP Server Not Working
- Check MCP config path is absolute
- Run `npm run build` in nette-mcp/
- Check logs: MCP server logs to stderr
- Test: Ask AI to fetch Nette docs

### Outdated Patterns Still Appearing
- Ensure skill file is latest version
- MCP cache: Restart MCP server to clear
- Report issue with example

## Contributing

Issues and improvements welcome!

**Areas for contribution:**
- Skill patterns and checklists
- MCP tool accuracy improvements
- Documentation coverage
- Error handling

## License

MIT

## Credits

Built for developers who want AI to truly understand Nette Framework.

**Documentation sources:**
- https://nette.org
- https://latte.nette.org
- https://tracy.nette.org

---

**Made with 🎯 for Nette developers**
