# Nette Framework Knowledge System - Design Document

**Date:** 2025-11-16
**Author:** Brainstorming Session
**Status:** Approved

## Executive Summary

Hybrid system combining a lightweight skill (always active) with an optional MCP server (on-demand) to provide AI with comprehensive, up-to-date Nette Framework knowledge while minimizing context overhead.

## Problem Statement

When developing with Nette Framework, AI assistants often:
- Suggest deprecated patterns and outdated APIs
- Don't follow Nette coding standards and best practices
- Provide verbose, inefficient solutions instead of framework-idiomatic code
- Lack knowledge of ecosystem integration (Latte, Tracy, DI, Database, Forms)

**Target user:** Developer working daily with complete Nette projects, needing fast, accurate, modern solutions.

## Success Criteria

1. **No deprecated patterns** - AI uses current Nette 3.x+ APIs and modern PHP 8.1+ features
2. **Consistent code style** - Follows Nette coding standards (type hints, attributes, strict_types)
3. **Fast and precise** - AI knows patterns immediately without trial and error
4. **Ecosystem integration** - Understands DI container, Latte, Tracy, and their interactions

## Architecture Overview

### Two-Component System

```
┌─────────────────────────────────────────────────┐
│  Nette Skill (Always Active)                   │
│  - Workflows, patterns, best practices          │
│  - Decision trees, checklists                   │
│  - Context: ~5-10 KB                            │
└─────────────────────────────────────────────────┘
                    │
                    │ Uses when needed
                    ↓
┌─────────────────────────────────────────────────┐
│  Nette MCP Server (Optional, On-Demand)        │
│  - Live documentation fetching                  │
│  - API reference, examples                      │
│  - Context: 0 KB (off) or ~2-3 KB (on)         │
└─────────────────────────────────────────────────┘
```

### Design Rationale

**Why Skill:**
- Always-on guidance for common patterns
- Minimal context footprint
- Works offline
- Fast responses for standard tasks

**Why MCP Server:**
- Always current documentation
- Handles edge cases and detailed API queries
- Can be disabled when not needed
- Zero context when disabled

**Why Hybrid:**
- Best of both worlds: speed + accuracy
- Skill handles 80% of cases, MCP handles remaining 20%
- User controls context overhead via MCP enable/disable

## Component 1: Nette Skill

### Purpose
Provide embedded knowledge about Nette workflows, patterns, and best practices that AI can apply immediately without external lookups.

### Content Structure

#### A. Nette Framework Core

**Presenter Patterns:**
- Lifecycle understanding (startup, action*, render*, beforeRender, shutdown)
- Dependency injection via constructor
- Signal handling and AJAX
- Persistent parameters
- Redirection patterns

**Component Model:**
- createComponent* factory pattern
- Component lifecycle
- Signals and invalidation
- Persistent state
- Template attachment

**Service Layer:**
- Service registration in DI container
- Repository pattern for database access
- Business logic separation
- Transaction handling

#### B. Latte Templates

**Security First:**
- n:attribute vs {syntax} - when to use what
- Auto-escaping rules
- Dangerous patterns to avoid
- XSS prevention

**Common Patterns:**
- Template inheritance ({layout}, {block}, {include})
- Macros: {if}, {foreach}, {first}, {last}, {sep}
- Custom filters and functions
- Block definition and usage
- Template parameters typing

#### C. Tracy Debugger

**Development Workflow:**
- Debugger::barDump() vs dump() - when to use
- Custom panels creation
- Logging with Tracy\ILogger
- Email notifications on errors

**Production vs Development:**
- Mode detection
- Different behaviors per mode
- Safe production debugging

#### D. Nette DI Container

**Configuration:**
- NEON structure and syntax
- Services definition
- Factories pattern
- Decorators usage
- Autowiring rules

**Advanced Patterns:**
- Extensions development
- Dynamic services
- Generated factories
- Accessing container in code (when appropriate)

#### E. Code Style Standards

**PHP 8.1+ Modern Features:**
- `declare(strict_types=1)` always
- Attributes instead of annotations
- Constructor property promotion
- Named arguments where appropriate
- Enums for constants

**Nette Conventions:**
- PascalCase for classes
- camelCase for methods and properties
- Type hints everywhere (parameters, return types, properties)
- DocBlocks only for additional info, not type info
- Null coalescing and null-safe operators

### Format

**Decision Trees** for quick pattern matching:
```
Creating new component?
├─ Extends Nette\Application\UI\Control? ✓
├─ Implements render() method? ✓
├─ Has createTemplate()? ✓
└─ Factory in presenter createComponent*()? ✓
```

**Checklists** for common tasks:
```
New Presenter Checklist:
☐ Extends Nette\Application\UI\Presenter
☐ declare(strict_types=1) at top
☐ Constructor with typed dependencies
☐ action*/render* methods with type hints
☐ Template directory exists
☐ Registered in routing
```

**Size Target:** 5-10 KB (concise, actionable, no prose)

## Component 2: Nette MCP Server

### Purpose
Provide real-time access to current Nette documentation for API details, examples, and edge cases.

### Tools

#### 1. `fetch_nette_documentation`
**Purpose:** Retrieve specific documentation sections
**Parameters:**
- `component`: "framework" | "database" | "forms" | "mail" | "utils" | "security"
- `topic`: string (e.g., "presenter", "routing", "validation")
- `language`: "en" | "cs" (default: "en")

**Returns:** Markdown-formatted documentation section

**Implementation:**
- Fetches from nette.org/en/documentation or nette.org/cs/dokumentace
- Parses HTML to clean markdown
- Caches for 30 minutes

#### 2. `search_latte_syntax`
**Purpose:** Look up Latte template syntax and features
**Parameters:**
- `query`: string (e.g., "n:if", "filters", "custom macros", "blocks")

**Returns:** Syntax reference with examples

**Implementation:**
- Searches latte.nette.org documentation
- Returns syntax + code examples
- Handles both n:attributes and {macros}

#### 3. `get_tracy_feature`
**Purpose:** Documentation for Tracy debugger features
**Parameters:**
- `feature`: "bar-dump" | "logger" | "bluescreen" | "custom-panel" | "production-mode"

**Returns:** Usage guide with code examples

**Implementation:**
- Fetches from tracy.nette.org
- Includes setup and integration examples

#### 4. `lookup_di_pattern`
**Purpose:** DI container configuration patterns
**Parameters:**
- `pattern`: "services" | "factories" | "decorators" | "extensions" | "autowiring"

**Returns:** Configuration examples and explanations

**Implementation:**
- Extracts from DI container documentation
- NEON configuration examples included

#### 5. `search_nette_api` (Optional)
**Purpose:** Full-text search across all Nette documentation
**Parameters:**
- `query`: string (free-text search)
- `scope`: "all" | "framework" | "latte" | "tracy" | "di" (default: "all")

**Returns:** List of relevant documentation sections with snippets

**Implementation:**
- Fallback for edge cases
- Slower but comprehensive

### Documentation Sources

**Primary:**
- https://nette.org/en/documentation
- https://nette.org/cs/dokumentace (Czech version)

**Component-Specific:**
- https://latte.nette.org (Latte templates)
- https://tracy.nette.org (Tracy debugger)

**API Reference:**
- https://api.nette.org (Generated API docs)

### Caching Strategy

**Cache Duration:** 15-30 minutes
**Rationale:** Documentation doesn't change frequently, cache reduces latency and API load

**Cache Keys:**
- tool_name:params_hash (e.g., `fetch_nette_documentation:framework:presenter:en`)

**Fallback:**
- If network fails, return cached data (even if stale)
- Better stale docs than no docs

### Implementation Technology

**Language:** TypeScript
**Rationale:**
- MCP SDK well-supported in TypeScript
- Fast execution
- Good HTML parsing libraries (cheerio)
- Easy deployment

**Key Dependencies:**
- @modelcontextprotocol/sdk
- cheerio (HTML parsing)
- node-cache (simple in-memory cache)
- turndown (HTML to markdown)

## Usage Scenarios

### Scenario 1: Creating New Presenter (Common)

**User Request:** "Create a UserPresenter with login and logout actions"

**Flow:**
1. Skill activates → AI knows presenter pattern
2. AI generates code:
   - Extends UI\Presenter
   - declare(strict_types=1)
   - Constructor with typed dependencies
   - actionLogin(), actionLogout(), renderLogin()
   - Proper redirects
3. **No MCP needed** - Skill has all patterns

**Result:** Fast, correct code, zero external lookups

### Scenario 2: Custom Latte Filter (Less Common)

**User Request:** "How do I create a custom Latte filter for formatting phone numbers?"

**Flow:**
1. Skill knows custom filters exist and general approach
2. AI recognizes it needs exact syntax
3. AI calls MCP: `search_latte_syntax("custom filters")`
4. MCP fetches current docs from latte.nette.org
5. AI provides accurate implementation with proper registration

**Result:** Current, accurate API usage

### Scenario 3: Tracy Custom Panel (Rare)

**User Request:** "Add a custom Tracy panel showing database query count"

**Flow:**
1. Skill knows Tracy extensibility concept
2. AI needs implementation details
3. AI calls MCP: `get_tracy_feature("custom-panel")`
4. MCP returns panel interface and registration
5. AI implements IBarPanel with proper hooks

**Result:** Complex feature implemented correctly

### Scenario 4: Service Registration Pattern (Common)

**User Request:** "Register EmailService with SMTP configuration in DI"

**Flow:**
1. Skill has DI registration patterns
2. AI knows NEON syntax from skill
3. AI writes services.neon configuration
4. **No MCP needed** - Standard pattern

**Result:** Proper DI configuration immediately

## Context Management

### Baseline (MCP Disabled)
- Nette Skill: ~5-10 KB
- **Total Context: 5-10 KB**

### With MCP Enabled
- Nette Skill: ~5-10 KB
- MCP Tool Definitions: ~2-3 KB
- **Total Context: 7-13 KB**

### During MCP Tool Call
- Base context: 7-13 KB
- Tool response: Variable (typically 3-10 KB per call)
- **Peak Context: 10-23 KB**

### Comparison
Without this system, AI might need:
- Generic framework knowledge: Unreliable
- Web search: Multiple queries, outdated results
- Context: Unpredictable

**With this system:**
- Predictable context usage
- Always current information when MCP used
- Fast responses from skill for common cases

## Maintenance Plan

### Skill Maintenance
**Frequency:** 1-2 times per year
**Trigger:** Major Nette version release (3.x → 4.x)

**Process:**
1. Review Nette release notes
2. Update deprecated patterns
3. Add new features to decision trees
4. Update code examples
5. Test with real-world scenarios

**Effort:** 2-4 hours per update

### MCP Server Maintenance
**Frequency:** Minimal (documentation updates automatically)

**Potential Updates:**
- Nette.org website structure changes → Update parsers
- New documentation sections → Add to tool mappings
- Performance optimization → Adjust caching

**Effort:** As-needed, ~1-2 hours per year expected

## Implementation Plan

### Phase 1: Nette Skill
**Duration:** 2-3 hours

**Tasks:**
1. Create skill file structure
2. Write decision trees for:
   - Presenters
   - Components
   - Services/DI
   - Latte patterns
   - Tracy usage
3. Add checklists for common tasks
4. Include code style rules
5. Test with example prompts

**Deliverable:** nette-framework.skill file

### Phase 2: MCP Server Setup
**Duration:** 3-4 hours

**Tasks:**
1. Initialize TypeScript project
2. Set up MCP SDK
3. Create project structure:
   ```
   nette-mcp/
   ├── src/
   │   ├── index.ts          # Server entry point
   │   ├── tools/            # Tool implementations
   │   │   ├── nette-docs.ts
   │   │   ├── latte-syntax.ts
   │   │   ├── tracy-feature.ts
   │   │   ├── di-pattern.ts
   │   │   └── api-search.ts
   │   ├── fetchers/         # Documentation fetching
   │   │   ├── base-fetcher.ts
   │   │   └── parsers.ts
   │   └── cache/            # Cache implementation
   │       └── doc-cache.ts
   ├── package.json
   ├── tsconfig.json
   └── README.md
   ```
4. Implement base fetcher with caching
5. Add HTML to markdown conversion

**Deliverable:** MCP server project scaffold

### Phase 3: Tool Implementation
**Duration:** 4-6 hours

**Tasks:**
1. Implement `fetch_nette_documentation` tool
2. Implement `search_latte_syntax` tool
3. Implement `get_tracy_feature` tool
4. Implement `lookup_di_pattern` tool
5. (Optional) Implement `search_nette_api` tool
6. Add error handling and fallbacks
7. Test each tool individually

**Deliverable:** Working MCP server with all tools

### Phase 4: Integration Testing
**Duration:** 2-3 hours

**Tasks:**
1. Test skill alone with common scenarios
2. Test MCP server tools individually
3. Test skill + MCP together
4. Validate context size
5. Test offline behavior (skill still works)
6. Test cache performance
7. Create usage examples

**Deliverable:** Tested, working system

### Phase 5: Documentation
**Duration:** 1-2 hours

**Tasks:**
1. Write README for skill usage
2. Write README for MCP server setup
3. Document tool parameters and examples
4. Create troubleshooting guide
5. Add contribution guidelines

**Deliverable:** Complete documentation

## Total Estimated Effort
**12-18 hours** spread across implementation phases

## Risks and Mitigations

### Risk 1: Nette.org Structure Changes
**Impact:** MCP tools break
**Mitigation:**
- Defensive parsing with fallbacks
- Cache provides temporary buffer
- Skill continues working independently

### Risk 2: Documentation Quality Variance
**Impact:** AI gets poor or incomplete information
**Mitigation:**
- Curate skill content carefully
- Test MCP parsers on multiple doc sections
- Provide examples in skill as fallback patterns

### Risk 3: Context Bloat
**Impact:** System uses too much context
**Mitigation:**
- Keep skill concise (decision trees, not prose)
- MCP off by default
- Monitor context usage in practice

### Risk 4: Maintenance Burden
**Impact:** System becomes outdated
**Mitigation:**
- Skill requires infrequent updates (1-2/year)
- MCP self-updates via live fetching
- Simple architecture → easy to maintain

## Success Metrics (Post-Implementation)

**Skill Quality:**
- ✓ AI generates correct Nette code on first try (>90% of common tasks)
- ✓ No deprecated patterns suggested
- ✓ Code passes Nette coding standards checks

**MCP Effectiveness:**
- ✓ Documentation fetching works for all major sections
- ✓ Cache hit rate >80% during active sessions
- ✓ Response time <2 seconds per tool call

**User Experience:**
- ✓ Context stays under 15 KB with MCP enabled
- ✓ Skill alone handles 80%+ of daily tasks
- ✓ System feels fast and accurate

## Future Enhancements (Optional)

1. **Code Examples Cache:** Pre-load common patterns into skill
2. **Version Detection:** MCP auto-detects project's Nette version
3. **Custom Project Patterns:** Learn from user's codebase structure
4. **Multi-language Support:** Better Czech documentation support
5. **API Changelog Tool:** Query what changed between Nette versions

## Conclusion

This hybrid architecture balances:
- **Speed** (skill provides instant patterns)
- **Accuracy** (MCP provides current docs)
- **Efficiency** (minimal context, optional MCP)
- **Maintainability** (simple, modular design)

The system directly addresses all success criteria:
- ✓ No deprecated patterns (skill + MCP current docs)
- ✓ Consistent code style (skill enforces standards)
- ✓ Fast and precise (skill patterns, MCP for details)
- ✓ Ecosystem integration (comprehensive coverage)

Ready for implementation.
