---
name: verify
description: Use after all plan tasks are complete - runs full verification (tests, build, lint, plan checklist) with evidence before claiming success
---

# Verify

Run full verification after plan execution. Evidence before claims.

**Announce:** "Spoustim verifikaci."

## Process

1. **Find the plan file:**
   ```bash
   ls -t docs/plans/*.md | head -1
   ```

2. **Run project verification suite** (detect stack automatically):

   | Stack | Commands |
   |-------|----------|
   | Node/TS | `npm test`, `npx tsc --noEmit`, `npm run build`, `npm run lint` |
   | Python | `pytest`, `mypy .`, `ruff check .` |
   | Flutter | `flutter test`, `flutter analyze`, `flutter build` |
   | PHP/Nette | `vendor/bin/phpstan`, `vendor/bin/tester tests/` |
   | Generic | Run whatever test/build commands exist in package.json / Makefile |

3. **Check plan task completion:**
   - Read plan file
   - List each task
   - Verify implementation exists (files created/modified as specified)

4. **Present results with evidence:**

   ```
   Verifikace:
   - Testy: [output summary] [PASS/FAIL]
   - Build: exit [code] [PASS/FAIL]
   - Types/Lint: [output summary] [PASS/FAIL]
   - Plan tasks: [N/M] complete

   [If all pass]: Vsechno OK. Chces otestovat sam, nebo mergnem?
   [If failures]: [N] problems found. Fixing...
   ```

5. **If failures:** Fix issues and re-run verification. Do NOT proceed.

6. **If all pass:** Wait for user to test manually or confirm.

## Rules

- **Show actual command output** - not "should pass" or "looks good"
- **Run FULL suite** - not just one test file
- **Re-run after fixes** - don't claim fixed without proof
- **Check plan completeness** - every task, not just tests passing
