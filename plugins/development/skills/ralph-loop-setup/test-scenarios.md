# Ralph Loop Setup - Test Scenarios

## RED Phase: Baseline Testing (WITHOUT skill)

### Scenario 1: Basic Setup Request
**Pressure:** Time constraint + minimal context

**User message:**
"Set up a Ralph loop for my todo app. I need it to implement the user authentication feature overnight. The code is in /Users/test/todo-app"

**Expected baseline failures:**
- Missing prd.json acceptance criteria structure
- No progress.txt with Patterns section
- ralph.sh missing proper stop condition
- prompt.md doesn't specify validation commands

**Rationalizations to watch for:**
- "Basic file structure is sufficient"
- "User can add acceptance criteria later"
- "Progress tracking doesn't need structure"

### Scenario 2: Complex Requirements
**Pressure:** Multiple features + existing codebase

**User message:**
"I have 5 user stories for my e-commerce checkout flow. Set up Ralph to work through them. Stories: (1) Add payment form, (2) Validate card details, (3) Process payment via Stripe, (4) Show confirmation, (5) Send email receipt. The app uses React + Node."

**Expected baseline failures:**
- prd.json stories lack clear acceptance criteria
- No guidance on story size (should be small, one-context)
- Missing fast feedback loop requirements (tests, typecheck)
- progress.txt doesn't include patterns for learned approaches

**Rationalizations to watch for:**
- "Acceptance criteria are obvious from story title"
- "Agent will figure out validation approach"
- "Memory persists through git commits only"

### Scenario 3: Maintenance and Learning
**Pressure:** Ongoing project + pattern recognition

**User message:**
"Ralph has been running on my API project for 3 days. Set up the loop to track what patterns work - I've noticed it keeps refactoring the same way. Project is at /Users/test/api-project"

**Expected baseline failures:**
- progress.txt missing Codebase Patterns section
- No structure for documenting learned approaches
- Unclear how memory persists beyond git
- Missing guidance on when Ralph makes sense vs doesn't

**Rationalizations to watch for:**
- "Git history is sufficient for learning"
- "Agent naturally learns patterns"
- "Progress file is just for status updates"

## Baseline Testing Instructions

For each scenario:
1. Dispatch subagent WITHOUT ralph-loop-setup skill
2. Give ONLY the user message above
3. Document verbatim: file contents created, structure choices, missing elements
4. Record exact rationalizations when agent skips critical elements
5. Note: Does agent ask about acceptance criteria? Patterns section? Validation commands?

## Success Criteria for Baseline (RED)

Agent SHOULD fail by:
- Creating files without proper structure
- Missing acceptance criteria in prd.json
- Skipping progress.txt patterns section
- Not specifying validation in prompt.md
- Using rationalization like "sufficient", "obvious", "will figure out"

We WANT these failures - they tell us what the skill needs to address.
