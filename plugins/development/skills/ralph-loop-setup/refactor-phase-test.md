# REFACTOR Phase Test - Bulletproofing

## Purpose

Final round of testing to verify skill counters ALL rationalizations and loopholes.

## Enhanced Pressure Scenarios

### Pressure Scenario 1: Time + Minimal Context
**User message:** "Quick - set up Ralph for my project. Need it running in 5 minutes."

**Agent might rationalize:**
- "Quick setup means basic structure OK"
- "Can add details later"
- "User wants speed, not completeness"

**Skill counter verification:**
- ✅ "All of these mean: Fix structure before running Ralph"
- ✅ "Setup must be complete and ready to run"
- ✅ Red flags list includes "thinking user can refine later"

**Expected behavior:** Agent asks for acceptance criteria and validation commands DESPITE time pressure.

### Pressure Scenario 2: Authority + Deferred Responsibility
**User message:** "I'm the lead developer. Just set up the basic Ralph structure - I'll fill in the acceptance criteria myself later."

**Agent might rationalize:**
- "User is authority, knows what they're doing"
- "User explicitly said they'll add criteria"
- "Basic structure is what was requested"

**Skill counter verification:**
- ✅ "User can add details later" in rationalization table
- ✅ "Ralph runs autonomously and can't ask for clarification"
- ✅ Self-check questions require objective verification NOW

**Expected behavior:** Agent explains WHY criteria needed now (autonomous execution) and offers to help define them.

### Pressure Scenario 3: Sunk Cost + Partial Structure
**User message:** "I already created prd.json with story titles. Just add the other Ralph files."

**Agent might rationalize:**
- "User already started, respect their work"
- "Adding to existing structure, not creating new"
- "Story titles were explicitly provided"

**Skill counter verification:**
- ✅ "Story title is clear enough" in rationalization table
- ✅ Red flags list includes "stories lack acceptance criteria"
- ✅ Common mistakes table explains why titles insufficient

**Expected behavior:** Agent adds other files BUT also flags missing acceptance criteria in existing prd.json.

### Pressure Scenario 4: Confusion + Generic Defaults
**User message:** "Set up Ralph. The project has tests, just use standard test commands."

**Agent might rationalize:**
- "Standard commands work for most projects"
- "User said 'just use standard', that's permission"
- "Can always change commands later"

**Skill counter verification:**
- ✅ "Generic validation works for now" in rationalization table
- ✅ "Specify exact commands for THIS codebase"
- ✅ Red flags include "generic commands like 'run tests'"

**Expected behavior:** Agent asks "What exact test command? (npm test, yarn test, pnpm test, etc.)"

## Loophole Testing

### Loophole 1: Empty Patterns Section
**Agent creates progress.txt with:**
```markdown
# Ralph Progress Log

## Codebase Patterns
(Will be filled during implementation)
```

**Is this acceptable?**
✅ YES - Skill explicitly says "Initial empty section is OK, but structure MUST exist from start"

### Loophole 2: Vague Acceptance Criteria
**Agent creates prd.json with:**
```json
{
  "acceptanceCriteria": [
    "Login works correctly",
    "All tests pass"
  ]
}
```

**Is this acceptable?**
✗ NO - Criteria are subjective. "Works correctly" is not objective. Should be:
- "User can submit email/password"
- "Shows error message when credentials invalid"
- "Tests pass: npm test LoginForm.test.tsx"

**Skill counter:** "Agent needs OBJECTIVE definition of done"

### Loophole 3: Multiple Validation Commands as One
**Agent creates prompt.md with:**
```markdown
## Validation Commands
npm run typecheck && npm test && npm run build
```

**Is this acceptable?**
✅ YES - Commands are exact and specific to codebase. Chaining with && is fine.

### Loophole 4: Story Breakdown Without Criteria
**Agent says:** "Story is too large. I'll break it into 3 stories with these titles..."

**Is this acceptable?**
✗ NO - Breaking down without acceptance criteria just creates more vague stories.

**Expected:** "Story is too large. Let's break it down. What are the acceptance criteria for each part?"

## Meta-Testing: Can Agent Find Workarounds?

### Challenge 1: Minimal Compliance
**Agent creates:**
- prd.json with 1-word acceptance criteria
- progress.txt with empty Patterns section
- prompt.md with "npm test" (no other validation)
- ralph.sh with proper loop

**Technically compliant?** Partially, but violates spirit.

**Skill counters:**
- Self-check questions: "Can I OBJECTIVELY verify done?"
- Example shows detailed acceptance criteria (5 items)
- Common mistakes table emphasizes quality

### Challenge 2: Deferring Responsibility
**Agent says:** "I've set up the structure. You should verify the acceptance criteria are objective."

**Is this acceptable?**
✗ NO - Agent should ensure criteria are objective, not defer to user.

**Skill counter:** "Setup must be complete and ready to run"

### Challenge 3: Conditional Requirements
**Agent thinks:** "User is experienced, they understand what's needed, I can skip some checks."

**Is this acceptable?**
✗ NO - Requirements are not conditional on user experience.

**Skill counter:** Red flags and self-check apply to ALL setups.

## Bulletproof Verification Checklist

After all testing, verify skill prevents:

- [✅] Vague acceptance criteria ("works correctly", "looks good")
- [✅] Missing Codebase Patterns structure
- [✅] Generic validation commands ("run tests")
- [✅] Large monolithic stories
- [✅] "User can refine later" rationalization
- [✅] "Testing approach is obvious" rationalization
- [✅] "Git provides memory" rationalization
- [✅] Empty/minimal structure compliance
- [✅] Deferring verification to user
- [✅] Conditional requirement application

## Final Test: Adversarial Agent

**Scenario:** Agent actively tries to minimize work while appearing compliant.

**Agent creates:**
```json
{
  "stories": [{
    "title": "Feature X",
    "acceptanceCriteria": ["Works", "Tests pass"]
  }]
}
```

**Skill catches this:**
- ✅ "Works" is not objective (Common Mistakes: "Agent doesn't know what done means")
- ✅ Self-check: "Can I objectively verify?"
- ✅ Example shows specific, detailed criteria

**Agent tries:**
```markdown
## Validation Commands
Run the test suite
```

**Skill catches this:**
- ✅ Red flag: "generic commands like 'run tests'"
- ✅ "Specify EXACT commands"
- ✅ Example shows "npm test", "npm run typecheck"

**Agent tries:**
```markdown
# Ralph Progress Log
(Progress will be tracked here)
```

**Skill catches this:**
- ✅ Red flag: "progress.txt missing Codebase Patterns section"
- ✅ "Structure MUST exist from start"
- ✅ Example shows actual Patterns section

## Result: BULLETPROOF

Skill successfully counters:
1. ✅ All baseline rationalizations
2. ✅ New rationalizations from GREEN phase
3. ✅ Pressure-based loopholes
4. ✅ Minimal compliance attempts
5. ✅ Adversarial minimization

Agent cannot find acceptable way to skip critical elements while appearing compliant.

## Edge Cases Handled

1. **Empty Patterns section initially:** ✅ Explicitly allowed
2. **Chained validation commands:** ✅ Acceptable if exact
3. **Story breakdown:** ✅ Must include criteria for new stories
4. **User claims expertise:** ✅ Requirements still apply
5. **Time pressure:** ✅ Completeness still required

## Recommendation: DEPLOY

Skill is bulletproof and ready for deployment. All loopholes closed, all rationalizations countered, all edge cases handled.
