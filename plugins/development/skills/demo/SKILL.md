---
name: demo
description: Creates executable demo documents that prove a feature works with reproducible steps, using showboat and rodney for browser automation. Use after verification passes and the feature has visible UI, API, or CLI output worth demonstrating. Trigger phrases - "create demo", "prove it works", "udelej demo", "dokaž že to funguje", "showboat", "demo document". NOT for pure refactoring, config-only changes, or internal code reorganization with no visible output.
metadata:
  author: Petr
  version: 1.0.0
---

# Demo

Create executable demo document that proves the feature works. Reproducible proof, not just claims.

**Announce:** "Vytvarim demo dokument."

**Requires:** `showboat` (uv tool install showboat), `rodney` (go install github.com/simonw/rodney@latest)

## When to Use

- After `/development:verify` passes
- Feature has UI, API, or CLI output worth demonstrating
- User says "udelej demo" / "dokaž že to funguje" / "showboat"

## When NOT to Use

- Pure refactoring (no visible change)
- Config-only changes
- Internal code reorganization

## Process

### Step 0: Verify Tools

**MANDATORY — run before anything else:**

```bash
which showboat && showboat --version
which rodney && rodney --version
```

- Both must be in PATH. Do NOT fall back to claude-in-chrome or curl.
- If missing: tell user to install (`uv tool install showboat`, `go install github.com/simonw/rodney@latest`)
- If PATH issue: try `~/.local/bin/showboat` and `~/go/bin/rodney` directly

### Step 1: Detect Feature Type

Analyze what was built to choose demo strategy:

| Feature type      | Demo strategy                              | Tools             |
| ----------------- | ------------------------------------------ | ----------------- |
| **Web UI**        | Screenshots + interactions + accessibility | rodney + showboat |
| **API endpoints** | curl/httpie requests + JSON responses      | showboat exec     |
| **CLI tool**      | Command examples + output                  | showboat exec     |
| **Library/SDK**   | Code examples + output                     | showboat exec     |
| **Mixed**         | Combine above as needed                    | both              |

### Step 2: Create Demo Document

**File:** `docs/demos/YYYY-MM-DD-<feature-name>.md`

```bash
mkdir -p docs/demos
showboat init docs/demos/YYYY-MM-DD-<name>.md "<Feature Name> Demo"
```

### Step 3: Build Demo Content

Follow this structure:

#### 3a. Introduction

```bash
showboat note <file> "## What was built
<1-2 sentence description of the feature>"
```

#### 3b. Setup (if needed)

```bash
showboat note <file> "## Setup"
showboat exec <file> bash "<setup commands - start server, seed data, etc>"
```

#### 3c. Feature Demonstration

**For API features:**

```bash
showboat note <file> "## API: <endpoint>"
showboat exec <file> bash 'curl -s localhost:3000/api/endpoint | jq .'
showboat exec <file> bash 'curl -s -X POST localhost:3000/api/endpoint -H "Content-Type: application/json" -d "{\"key\":\"value\"}" | jq .'
```

**For Web UI features:**

```bash
# Start browser
showboat exec <file> bash 'rodney start'
showboat exec <file> bash 'rodney open http://localhost:3000/page'
showboat exec <file> bash 'rodney waitstable'

# Screenshot initial state
showboat note <file> "## Page: <name>"
showboat image <file> 'rodney screenshot --full'

# Interact
showboat exec <file> bash 'rodney input "#field" "value"'
showboat exec <file> bash 'rodney click "#button"'
showboat exec <file> bash 'rodney waitstable'

# Screenshot result
showboat note <file> "## After interaction"
showboat image <file> 'rodney screenshot --full'

# Cleanup
showboat exec <file> bash 'rodney stop'
```

**For CLI features:**

```bash
showboat note <file> "## Usage"
showboat exec <file> bash '<command> --help'
showboat note <file> "## Example: <scenario>"
showboat exec <file> bash '<command> <args>'
```

#### 3d. Accessibility Check (for UI features)

```bash
showboat note <file> "## Accessibility"
showboat exec <file> bash 'rodney ax-tree --depth 3'
showboat exec <file> bash 'rodney ax-find --role "button"'
```

#### 3e. Cleanup

```bash
showboat note <file> "## Cleanup"
showboat exec <file> bash 'rodney stop'
# or: stop dev server, remove test data, etc.
```

### Step 4: Verify Demo

```bash
showboat verify docs/demos/YYYY-MM-DD-<name>.md
```

This re-runs all code blocks and compares outputs. All must match.

### Step 5: Report

```
Demo vytvoreno:
- Soubor: docs/demos/YYYY-MM-DD-<name>.md
- Sekce: [N] poznamek, [M] exec bloku, [K] screenshotu
- Showboat verify: PASS
- Accessibility: [checked / n/a]

Demo je reprodukovatelny - `showboat verify` overi kdykoliv.
```

## Error Handling

- **showboat exec fails:** Use `showboat pop` to remove failed entry, fix, retry
- **rodney can't connect:** Check `rodney status`, restart with `rodney start`
- **Screenshot empty/wrong:** Add `rodney waitstable` or `rodney sleep 1` before screenshot
- **showboat verify fails:** Output changed - investigate if expected (data-dependent) or bug

## Rodney Quick Reference

```bash
# Lifecycle
rodney start                      # Launch headless Chrome
rodney stop                       # Shut down
rodney status                     # Check if running

# Navigation
rodney open <url>                 # Go to URL
rodney waitstable                 # Wait for DOM to settle
rodney waitidle                   # Wait for network idle

# Interaction
rodney click <selector>           # Click element
rodney input <selector> <text>    # Type into input
rodney select <selector> <value>  # Select dropdown option
rodney submit <selector>          # Submit form
rodney js <expression>            # Run JavaScript

# Capture
rodney screenshot [file]          # Full page screenshot
rodney screenshot-el <sel> [file] # Element screenshot
rodney text <selector>            # Get element text
rodney html [selector]            # Get HTML
rodney title                      # Page title

# Accessibility
rodney ax-tree [--depth N]        # Full accessibility tree
rodney ax-find [--role R]         # Find accessible nodes
rodney ax-node <selector>         # Node accessibility info

# Queries
rodney exists <selector>          # Exit 0 if exists
rodney visible <selector>         # Exit 0 if visible
rodney count <selector>           # Count matching elements
```

## Showboat Quick Reference

```bash
showboat init <file> <title>              # Create new demo
showboat note <file> [text]               # Add commentary
showboat exec <file> <lang> [code]        # Run + capture output
showboat image <file> [script]            # Run + capture image
showboat pop <file>                       # Remove last entry
showboat verify <file>                    # Re-run and verify all
showboat extract <file>                   # Emit recreation commands
```

## Rules

- **Real commands only** - never fake outputs or edit demo file directly
- **Verify always** - run `showboat verify` before claiming demo is complete
- **Cleanup rodney** - always `rodney stop` at end, don't leave Chrome running
- **Keep demos focused** - 5-15 exec blocks, not exhaustive test suite
- **Screenshots with context** - add note before each screenshot explaining what to see
