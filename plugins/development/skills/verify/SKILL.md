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

   | Stack     | Commands                                                          |
   | --------- | ----------------------------------------------------------------- |
   | Node/TS   | `npm test`, `npx tsc --noEmit`, `npm run build`, `npm run lint`   |
   | Python    | `pytest`, `mypy .`, `ruff check .`                                |
   | Flutter   | `flutter test`, `flutter analyze`, `flutter build`                |
   | PHP/Nette | `vendor/bin/phpstan`, `vendor/bin/tester tests/`                  |
   | Generic   | Run whatever test/build commands exist in package.json / Makefile |

3. **Check plan task completion:**
   - Read plan file
   - List each task
   - Verify implementation exists (files created/modified as specified)

4. **Browser smoke test** (optional, for UI features):

   Only if feature has web UI AND `rodney` is installed:

   ```bash
   rodney start
   rodney open <app-url>
   rodney waitstable
   # Check key pages/elements exist
   rodney exists "<key-selector>"    # exit 0 = OK
   rodney screenshot /tmp/verify-smoke.png
   rodney stop
   ```

   Skip if: no UI, no dev server, rodney not installed, pure API/CLI feature.

5. **Present results with evidence:**

   ```
   Verifikace:
   - Testy: [output summary] [PASS/FAIL]
   - Build: exit [code] [PASS/FAIL]
   - Types/Lint: [output summary] [PASS/FAIL]
   - Plan tasks: [N/M] complete
   - Browser smoke: [N pages OK / skipped]

   [If all pass]: Vsechno OK. Chces demo (`/development:demo`), otestovat sam, nebo mergnem?
   [If failures]: [N] problems found. Fixing...
   ```

6. **If failures:** Fix issues and re-run verification. Do NOT proceed.

7. **If all pass:** Offer three options:
   - `/development:demo` - create executable demo document (showboat)
   - Manual testing by user
   - Proceed to `/development:merge`

## Rules

- **Show actual command output** - not "should pass" or "looks good"
- **Run FULL suite** - not just one test file
- **Re-run after fixes** - don't claim fixed without proof
- **Check plan completeness** - every task, not just tests passing
- **Browser smoke is optional** - don't fail verify just because rodney isn't installed
- **Always stop rodney** - never leave Chrome process running after smoke test
