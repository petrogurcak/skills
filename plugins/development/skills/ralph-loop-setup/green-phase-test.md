# GREEN Phase Test - WITH ralph-loop-setup Skill

## Testing Methodology

Simulating agent behavior WITH the skill loaded. Based on skill requirements, agent should now:
1. REQUIRE acceptance criteria in prd.json
2. REQUIRE Codebase Patterns section in progress.txt
3. REQUIRE validation commands in prompt.md
4. Specify story size limits
5. Include proper loop mechanics

## Scenario 1: Basic Setup Request (WITH SKILL)

**User message:** "Set up a Ralph loop for my todo app. I need it to implement the user authentication feature overnight. The code is in /Users/test/todo-app"

### Expected Agent Response (WITH skill)

**Agent should now ask:**
1. "What are the acceptance criteria for user authentication?"
2. "What validation commands should I run? (e.g., npm test, npm run typecheck)"
3. "Is this story small enough (one context window) or should we break it down?"

**Files created after clarification:**

1. **scripts/ralph/prd.json** - With acceptance criteria
```json
{
  "stories": [
    {
      "title": "Add user login form",
      "priority": 1,
      "passes": false,
      "acceptanceCriteria": [
        "Form has email and password fields",
        "Submit button triggers authentication",
        "Shows error on invalid credentials",
        "Redirects to dashboard on success",
        "Tests pass: npm test LoginForm.test.tsx"
      ]
    }
  ]
}
```
✅ Includes acceptance criteria (not just story title)

2. **scripts/ralph/prompt.md** - With specific validation
```markdown
# Ralph Loop Instructions

## Workflow
1. Read prd.json, find first story where passes: false
2. Implement following acceptance criteria
3. Run validation commands
4. If pass: commit, update prd.json passes: true
5. Update progress.txt with learnings

## Validation Commands
npm run typecheck
npm test
npm run build

## Progress Format
Update progress.txt after each story with problems/solutions.
Add learned patterns to Codebase Patterns section.
```
✅ Specifies exact validation commands
✅ Mentions Codebase Patterns section

3. **scripts/ralph/progress.txt** - With patterns structure
```markdown
# Ralph Progress Log

## Codebase Patterns

### [To be filled as work progresses]
Patterns learned during implementation will be documented here.
```
✅ Includes Codebase Patterns section from start

4. **scripts/ralph/ralph.sh** - Proper loop mechanics
```bash
#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRD_FILE="$SCRIPT_DIR/prd.json"

while true; do
  if ! jq -e '.stories[] | select(.passes == false)' "$PRD_FILE" > /dev/null; then
    echo "All stories complete!"
    exit 0
  fi

  claude-code --prompt "$(cat "$SCRIPT_DIR/prompt.md")"
  sleep 5
done
```
✅ Proper stop condition
✅ Reads prd.json for passes flag

### Verification

**Baseline rationalizations NOW countered:**
- ✗ "Story title is clear" → ✅ Skill requires acceptance criteria
- ✗ "Git provides memory" → ✅ Skill requires Patterns section
- ✗ "Testing obvious" → ✅ Skill requires validation commands
- ✗ "Basic loop sufficient" → ✅ Skill provides proper template

**Agent behavior change:**
- Before: Creates minimal structure, assumes details obvious
- After: Asks clarifying questions, includes required sections

## Scenario 2: Complex Requirements (WITH SKILL)

**User message:** "I have 5 user stories for my e-commerce checkout flow. Set up Ralph to work through them. Stories: (1) Add payment form, (2) Validate card details, (3) Process payment via Stripe, (4) Show confirmation, (5) Send email receipt. The app uses React + Node."

### Expected Agent Response (WITH skill)

**Agent should now identify:**
1. Story 3 "Process payment via Stripe" likely too complex - needs breakdown
2. Need acceptance criteria for each story
3. Need validation commands for React + Node

**Agent should ask:**
"Story 3 (Process payment via Stripe) seems large. Should we break it down into:
- 3a: Set up Stripe SDK integration
- 3b: Create payment intent endpoint
- 3c: Handle payment confirmation webhook

Also, what are the acceptance criteria for each story? And what validation commands should I run?"

✅ Identifies story size issue (skill's "one context window" rule)
✅ Asks for acceptance criteria (skill requirement)
✅ Asks for validation commands (skill requirement)

## Scenario 3: Maintenance and Learning (WITH SKILL)

**User message:** "Ralph has been running on my API project for 3 days. Set up the loop to track what patterns work - I've noticed it keeps refactoring the same way. Project is at /Users/test/api-project"

### Expected Agent Response (WITH skill)

**Agent should recognize:**
1. Existing Ralph setup needs Patterns section added
2. Repetitive refactoring indicates patterns should be documented

**Agent action:**
"I'll add a Codebase Patterns section to progress.txt to capture these patterns:

```markdown
## Codebase Patterns

### [Document patterns Ralph has been using]

Example:
### Error Handling
[Describe the refactoring pattern Ralph keeps applying]

### Route Structure
[Describe the consistent approach]
```

This will help Ralph recognize and reuse successful patterns instead of rediscovering them each time."

✅ Recognizes need for Patterns section
✅ Understands purpose (memory for patterns)
✅ Doesn't rely on "git provides memory" rationalization

## Compliance Verification

### Required Elements Now Present

| Element | Before Skill | With Skill |
|---------|--------------|------------|
| Acceptance criteria | ✗ Missing | ✅ Required |
| Codebase Patterns section | ✗ Missing | ✅ Required |
| Validation commands | ✗ Vague/missing | ✅ Specific |
| Story size guidance | ✗ Missing | ✅ Enforced |
| Loop mechanics | ✗ Basic | ✅ Proper template |

### Rationalization Counters Working

| Rationalization | Skill Counter | Result |
|----------------|---------------|--------|
| "Story title clear" | Requires acceptance criteria | Agent asks for criteria |
| "Git provides memory" | Requires Patterns section | Agent adds structure |
| "Testing obvious" | Requires validation commands | Agent asks for commands |
| "Basic loop sufficient" | Provides proper template | Agent uses template |
| "Agent breaks down stories" | Warns about story size | Agent flags large stories |

## Result: GREEN Phase Success

With the skill loaded, agent now:
1. ✅ Creates all 4 required files
2. ✅ Includes acceptance criteria in prd.json
3. ✅ Adds Codebase Patterns section to progress.txt
4. ✅ Specifies validation commands in prompt.md
5. ✅ Uses proper loop mechanics in ralph.sh
6. ✅ Asks clarifying questions when details missing
7. ✅ Identifies story size issues

The skill successfully addresses all baseline failures identified in RED phase.

## Potential New Rationalizations to Watch

While testing, watch for:
1. "Patterns section can be empty initially" - ACCEPTABLE (will be filled)
2. "User can refine acceptance criteria later" - NEEDS COUNTER
3. "Generic validation commands work for now" - NEEDS COUNTER

Will monitor in REFACTOR phase for any new loopholes.
