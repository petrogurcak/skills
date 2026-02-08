# Core Development Principles

This document outlines the 13 core principles that guide all development work in this project.

---

## 1. Test-Driven Development (TDD)

**Principle:** Tests are written BEFORE implementation code, always.

**Process:**
1. **RED:** Write a failing test first
2. **GREEN:** Write minimal code to make it pass
3. **REFACTOR:** Clean up code while keeping tests green

**Why:**
- Confirms tests actually test something (watching them fail first)
- Prevents false positives (tests that always pass)
- Drives better API design
- Creates living documentation

**Rules:**
- NEVER write implementation code before the test
- ALWAYS run the test and watch it fail before writing code
- Write the simplest code that makes the test pass
- Refactor only after tests are green

**Variant: Scenario-First (Recommended for UI projects)**

For projects with user-facing UI, complement TDD with scenario-based testing:

| Project Type | Testing Approach |
|-------------|-----------------|
| Backend/Logic | Classic TDD (mandatory) - RED → GREEN → REFACTOR |
| Web Application | Scenario-First (recommended) - Define user flows → Implement → Playwright e2e |
| Landing Page | Scenario-Light (recommended) - Define scenarios for interactive sections → Implement → Verify |

**Scenario-First process:**
1. Define user flows BEFORE implementation (natural language):
   "User logs in → sees dashboard → clicks 'New Item' → fills form → saves → item appears in list"
2. Implement the feature
3. Write Playwright e2e test covering the flow
4. Two-tier test system:
   - Smoke (< 5 min, every PR): auth, navigation, CRUD happy paths
   - Core (< 15 min, pre-deploy): full user journeys, error states

**Scenario-Light process (landing pages):**
1. Define scenarios for interactive sections (CTA clicks, form submissions, pricing toggles)
2. Implement sections
3. Verify manually or with Playwright
4. Lighthouse check mandatory (Performance > 90)

Note: Scenario-First does NOT replace backend TDD. Backend logic still requires classic RED → GREEN → REFACTOR.

---

## 2. Git Safety Protocol

**Principle:** Protect main/master branch. Always branch first.

**Process:**
1. Create feature branch before ANY code changes
2. Work on the branch
3. Verify all tests pass
4. Ask before committing (unless auto-approved)
5. Ask before merging to main

**Why:**
- Prevents accidental commits to main
- Allows safe experimentation
- Makes it easy to discard failed attempts
- Keeps main always deployable

**Rules:**
- NEVER work directly on main/master
- NEVER commit without asking (unless auto-approved)
- ALWAYS create a branch first: `git checkout -b feature/name`
- Branch names should be descriptive: `feature/add-user-auth`, `fix/login-bug`

---

## 3. Verification Before Completion

**Principle:** Never claim success without proof.

**Process:**
1. Make code changes
2. Run ALL tests (not just new ones)
3. Run static analysis tools
4. Verify output shows success
5. Only then claim "done" or "passing"

**Why:**
- Prevents "it should work" syndrome
- Catches regressions in existing tests
- Ensures claims are backed by evidence
- Builds trust through verification

**Rules:**
- NEVER say "tests pass" without running them
- NEVER skip static analysis
- ALWAYS run full test suite before commits
- Show evidence (test output, analysis results)

---

## 4. Checkpoints and User Confirmation

**Principle:** Ask at decision points, auto-proceed at safe steps.

**When to Ask:**
- Before creating commits
- Before merging to main/master
- Before force-pushing or destructive operations
- Before making architectural decisions
- When multiple valid approaches exist

**When to Auto-Proceed:**
- Creating branches
- Running tests
- Running static analysis
- Reading files
- Installing dependencies (if in package.json/requirements.txt)

**Why:**
- Respects user control over their codebase
- Prevents unwanted commits or destructive operations
- Balances automation with oversight
- See CHECKPOINTS.md for detailed guidelines

---

## 5. False Positive Prevention

**Principle:** Tests must fail before they can be trusted to pass.

**Process:**
1. Write test
2. Run test -> MUST see it fail
3. If it passes immediately -> test is broken
4. Fix test so it actually tests something
5. Watch it fail again
6. Only then write implementation

**Why:**
- Tests that always pass are worthless
- Confirms test actually exercises the code
- Prevents false confidence
- Catches copy-paste errors in tests

**Rules:**
- NEVER trust a test you haven't seen fail
- ALWAYS verify RED phase before GREEN phase
- If test passes immediately, treat it as a bug in the test

---

## 6. Minimal Code for GREEN

**Principle:** Write the simplest code that makes the test pass.

**Why:**
- Prevents over-engineering
- Keeps code focused
- Makes refactoring easier
- Reduces cognitive load

**Examples:**
- If test checks for "Hello", return "Hello" (not a template engine)
- If test checks for 1+1=2, return 2 (not a calculation engine)
- Add complexity only when tests demand it

**Rules:**
- Start with the dumbest thing that could work
- Add complexity only when new tests require it
- Don't add features "because we'll need them later"

---

## 7. Refactoring Discipline

**Principle:** Refactor only when tests are green.

**Process:**
1. Get to GREEN (all tests pass)
2. Identify code smells
3. Refactor while keeping tests green
4. If tests go red, revert and try smaller steps

**Why:**
- Separates "making it work" from "making it clean"
- Reduces risk (tests are safety net)
- Makes debugging easier (only one variable changing)

**Rules:**
- Refactor only after reaching GREEN
- Keep test runs fast so you can run them constantly
- Never refactor and add features at the same time

---

## 8. Project-Specific Conventions

**This section is for YOUR project's specific rules.**

Examples of what goes here:
- File naming conventions
- Directory structure standards
- Code style preferences
- Technology-specific patterns
- API design guidelines
- Database patterns

**To customize:**
Edit this section with your project's conventions. Everything above (Principles 1-7) should stay unchanged.

```
# Example customizations:

## File Naming
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Tests: *.test.ts or *.spec.ts

## Architecture
- Frontend: React + TypeScript + Vite
- Backend: Python + FastAPI
- Database: SQLite (dev) / PostgreSQL (prod)

## Code Style
- Use TypeScript strict mode
- Prefer functional components
- Use async/await over .then()
```

---

## 9. Static Analysis as Gate

**Principle:** Static analysis must pass before commits.

**Tools (configure based on your stack):**
- TypeScript: `tsc --noEmit`
- Python: `mypy`, `pylint`
- Rust: `cargo clippy`
- PHP: `phpstan`
- Go: `go vet`

**Why:**
- Catches type errors before runtime
- Enforces code quality standards
- Prevents entire classes of bugs
- Complements tests (tests check behavior, static analysis checks structure)

**Rules:**
- Run static analysis before every commit
- Fix all errors (not just warnings)
- Don't commit if static analysis fails

---

## 10. Commit Message Discipline

**Principle:** Commit messages explain WHY, not WHAT.

**Format:**
```
type(scope): brief summary (50 chars max)

Detailed explanation of WHY this change was needed.
What problem does it solve? What was the context?

Closes #123
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructure (no behavior change)
- `test`: Adding or updating tests
- `docs`: Documentation changes
- `chore`: Build, dependencies, tooling

**Why:**
- Code shows WHAT changed (diffs)
- Messages should explain WHY
- Helps future developers (including you)

---

## 11. Incremental Progress

**Principle:** Small, verified steps beat big leaps.

**Process:**
1. Break large features into small slices
2. Each slice should:
   - Have its own test
   - Be independently verifiable
   - Add working functionality
3. Commit each slice separately

**Why:**
- Easier to debug (smaller change surface)
- Easier to review
- Easier to revert if needed
- Builds confidence incrementally

**Rules:**
- Prefer many small commits over few large ones
- Each commit should leave code in working state
- Don't accumulate changes without committing

---

## 12. No Hardcoded Values

**Principle:** Configuration, secrets, and environment-specific values NEVER belong in code.

**What to externalize:**
- API keys, secrets, passwords, tokens
- URLs (API endpoints, database connections)
- Port numbers
- Feature flags
- Environment-specific settings (dev/staging/prod)
- File paths that differ between environments

**Where to put them:**
- `.env` files (with `.env.example` template)
- Config files (config.json, settings.yaml)
- Environment variables
- Secret managers (for production)

**Why:**
- Security (secrets don't leak to git)
- Flexibility (change config without code changes)
- Deployability (same code runs in all environments)
- Collaboration (each developer has own local settings)

**Rules:**
- NEVER commit `.env` files (add to .gitignore)
- ALWAYS provide `.env.example` with dummy/placeholder values
- Use typed config objects, not raw strings scattered in code
- Validate configuration at startup (fail fast if missing)
- Use descriptive names: `DATABASE_URL`, not `DB` or `URL`

**Examples:**
```
# BAD - hardcoded
const API_URL = "https://api.example.com";
const PORT = 3000;

# GOOD - externalized
const API_URL = process.env.API_URL;
const PORT = parseInt(process.env.PORT || "3000");
```

---

## 13. Progressive Context

**Principle:** Documentation follows a pyramid - broad overview → module details → source code. Agents read top-down.

**Process:**
1. Read `ARCHITECTURE.md` first (project root, 1 page max)
2. Read module `README.md` when working in that area
3. Read source code only for specific files needed

**Why:**
- Saves tokens (10x reduction in context needed)
- Faster orientation for new sessions
- Prevents "lost in codebase" syndrome
- Scales to any project size

**Rules:**
- ALWAYS read `ARCHITECTURE.md` before starting work on any task
- Each major module/directory SHOULD have a `README.md` with public API summary
- Keep `ARCHITECTURE.md` under 1 page (concise, not exhaustive)
- Update `ARCHITECTURE.md` when adding new modules or changing architecture

---

## Summary

These 13 principles work together to create:
- **Confidence:** Tests verify everything works
- **Safety:** Git workflow prevents disasters
- **Quality:** Static analysis + TDD prevent bugs
- **Clarity:** Discipline creates understandable code
- **Speed:** Small steps are faster than big rewrites
- **Orientation:** Progressive context prevents token waste

**Remember:**
1. Branch first
2. Test first (RED -> GREEN -> REFACTOR)
3. Verify always
4. Ask at checkpoints
5. Commit incrementally

---

**Project Type:** Generic (Framework-free)
**Last Updated:** {{DATE}}
