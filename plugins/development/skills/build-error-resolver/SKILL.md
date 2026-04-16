---
name: build-error-resolver
description: Fixes build/type errors with minimal diffs. No refactoring, no architecture changes. Use when build fails (TypeScript compilation, Python type checks, Rust cargo build, etc.). Works in both Claude Code and Gemini CLI.
metadata:
  author: Petr
  version: 1.0.0
---

# Build Error Resolver

Fix TypeScript/build/type errors quickly with **smallest possible changes**.

**Announce:** "Pouštím build-error-resolver — minimal-diff fix."

## When to Use

- `npx tsc --noEmit` fails
- `npm run build` fails na type errors
- `mypy`, `pyright`, `cargo build` errors
- Linter errors po edit
- Volání z `workflow-optimization` hook po edit s failing build

## When NOT to Use

- Runtime errors (crash at runtime) → `debugging` skill
- Test failures → `debugging` nebo re-check implementation
- Architectural problems → `designing-abstractions` nebo `planning`
- Major refactor → NOT this skill (too invasive)

## Core Philosophy

**MINIMAL DIFF.** Nepředělávej kód. Oprav error s nejmenší možnou změnou.

**DO:**

- Add type annotations where missing
- Add null checks where needed
- Fix imports/exports
- Add missing dependencies to `package.json` / `requirements.txt`
- Fix config files (`tsconfig.json`, `pyproject.toml`)

**DON'T:**

- Refactor unrelated code
- Change architecture
- Rename variables (unless causing error)
- Add new features
- Optimize performance
- "Clean up" code while you're there

## Workflow

### Step 1: Collect All Errors

**TypeScript:**

```bash
npx tsc --noEmit --pretty
```

**Python:**

```bash
mypy . --show-error-codes
# nebo
pyright
```

**Rust:**

```bash
cargo build 2>&1 | grep -E "error\[E"
```

**JS linter:**

```bash
npx eslint . --format=compact
```

Uložit seznam errorů. Count: X errors total.

### Step 2: Fix One at a Time

**Pattern:**

1. Read error (file, line, message)
2. Read file context (±5 lines around error)
3. Apply smallest possible change
4. Re-run build check
5. Confirm error gone + no new errors introduced
6. Move to next

**Track progress:** "Fixed 3/12, remaining: 9"

### Step 3: Verify

```bash
# TS:
npx tsc --noEmit && echo "✅ Build clean"

# Python:
mypy . && echo "✅ Type check clean"

# Full build:
npm run build && echo "✅ Build succeeds"
```

## Common Patterns

### TypeScript — Type Inference

```typescript
// Error: Parameter 'x' implicitly has 'any' type
function add(x, y) {
  return x + y;
}
// Fix: Add type annotations (minimal)
function add(x: number, y: number): number {
  return x + y;
}
```

### TypeScript — Null/Undefined

```typescript
// Error: Object is possibly 'undefined'
const name = user.name.toUpperCase();
// Fix: Optional chaining + nullish coalescing
const name = user?.name?.toUpperCase() ?? "";
```

### TypeScript — Missing Property

```typescript
// Error: Property 'age' does not exist on type 'User'
interface User {
  name: string;
}
// Fix: Add property (optional if not always present)
interface User {
  name: string;
  age?: number;
}
```

### TypeScript — Import Errors

```typescript
// Error: Cannot find module '@/lib/utils'
// Fix 1: Check tsconfig.json paths config
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
// Fix 2: Fallback to relative import
import { x } from "../lib/utils";
```

### Python — Missing Type Annotations

```python
# Error: Function is missing a return type annotation [no-untyped-def]
def get_user(id):
    ...
# Fix:
def get_user(id: int) -> User:
    ...
```

### Python — Optional Arguments

```python
# Error: Incompatible default for argument "x" (default has type "None", argument has type "int")
def foo(x: int = None): ...
# Fix: Use Optional
from typing import Optional
def foo(x: Optional[int] = None): ...
```

### Missing Dependencies

```bash
# Error: Cannot find module 'lodash'
npm install lodash
npm install --save-dev @types/lodash
```

## Output Format

```markdown
## Build Error Resolution

**Command:** `npx tsc --noEmit`
**Initial errors:** 12
**Errors fixed:** 12
**Lines changed:** 23 across 7 files
**Build status:** ✅ PASS

### Changes

1. `src/api/users.ts:42` — added `| null` to return type
2. `src/lib/utils.ts:15` — added type annotation `string`
3. `src/components/Form.tsx:88` — added optional chaining
   ...

### Verification

- [x] `npx tsc --noEmit` exits 0
- [x] `npm run build` succeeds
- [x] No new errors introduced
- [x] Diff < 5% of affected files (23/450 lines = 5.1%)
```

## Success Criteria

- Build command exits with code 0
- `npm run build` / equivalent completes
- **Minimal lines changed** (< 5% of affected files ideálně)
- No new errors introduced
- No unrelated changes in diff

## Rules

- **Fail fast on ambiguity.** Pokud nevíš jestli error fix je správný, zeptej se user před applying.
- **Stop if diff grows.** Pokud single error fix vyžaduje > 10 line change, STOP — může to být architectural issue, ne build error.
- **Don't fix by disabling.** Nepoužívej `// @ts-ignore`, `# type: ignore` bez explicit user approval. Fix the actual issue.
- **Respect project patterns.** Pokud codebase používá určitý pattern (např. custom type guards), použij ho konzistentně.
- **Commit after fix.** Po verify: `git add -A && git commit -m "fix(build): resolve N type errors"` — **jen pokud user explicitně požádal o commit**.
