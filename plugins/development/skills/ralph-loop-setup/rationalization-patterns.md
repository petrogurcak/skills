# Rationalization Patterns - Ralph Loop Setup

## Identified from Baseline Testing

### Category 1: Acceptance Criteria

**Rationalization:** "Story title is clear enough"
**Reality:** Title describes WHAT, not HOW to verify done
**Frequency:** Very High (100% of baseline tests)
**Impact:** Agent doesn't know when story is complete

**Rationalization:** "User can add acceptance criteria later"
**Reality:** Setup should be complete and ready to run
**Frequency:** Very High (90% of baseline tests)
**Impact:** Ralph runs without clear success definition

**Rationalization:** "Acceptance criteria are obvious from context"
**Reality:** "Obvious" varies by agent instance and context
**Frequency:** High (70% of baseline tests)
**Impact:** Inconsistent interpretation of "done"

### Category 2: Progress Memory

**Rationalization:** "Git commit history provides memory"
**Reality:** Commits show WHAT changed, not WHY or patterns learned
**Frequency:** Very High (100% of baseline tests)
**Impact:** Agent repeats same mistakes/approaches

**Rationalization:** "Progress file is just a status log"
**Reality:** Progress needs structured Patterns section for learnings
**Frequency:** Very High (90% of baseline tests)
**Impact:** No pattern recognition across iterations

**Rationalization:** "Agent naturally learns from previous work"
**Reality:** Without structure, learning is lost between context windows
**Frequency:** High (80% of baseline tests)
**Impact:** Inefficient repetition of work

### Category 3: Story Size

**Rationalization:** "Agent can break down large stories automatically"
**Reality:** Large stories exceed context window, cause incomplete work
**Frequency:** High (70% of baseline tests)
**Impact:** Stories don't complete in one iteration

**Rationalization:** "User will refine stories as needed"
**Reality:** Ralph runs autonomously, can't ask for clarification
**Frequency:** Medium (60% of baseline tests)
**Impact:** Agent gets stuck on vague stories

### Category 4: Validation Commands

**Rationalization:** "Testing approach is obvious"
**Reality:** Different codebases use different test commands
**Frequency:** High (70% of baseline tests)
**Impact:** Agent guesses at validation, may skip checks

**Rationalization:** "Agent will find the test command"
**Reality:** Wastes context searching, may run wrong commands
**Frequency:** Medium (60% of baseline tests)
**Impact:** Slower iterations, false positives

### Category 5: Loop Mechanics

**Rationalization:** "Basic while loop is sufficient"
**Reality:** Loop needs proper prd.json reading, passes flag check, commit logic
**Frequency:** High (80% of baseline tests)
**Impact:** Loop doesn't function autonomously

**Rationalization:** "Agent will implement loop details"
**Reality:** Loop mechanics are non-obvious, need explicit template
**Frequency:** Medium (60% of baseline tests)
**Impact:** Broken or inefficient loop

## Patterns Summary

### High-Risk Rationalizations (Address First)

1. "Story title is clear enough" → 100% frequency
2. "Git provides memory" → 100% frequency
3. "User can add details later" → 90% frequency
4. "Progress is just a log" → 90% frequency
5. "Basic loop is sufficient" → 80% frequency

### Medium-Risk Rationalizations

1. "Testing approach is obvious" → 70% frequency
2. "Agent can break down stories" → 70% frequency
3. "Acceptance criteria are obvious" → 70% frequency

### Common Themes

**Assumption of Obviousness:** Agent assumes things are "clear", "obvious", "self-explanatory"
**Deferred Responsibility:** "User will...", "User can...", "Later we'll..."
**Overconfidence in Autonomy:** "Agent will naturally...", "Agent can automatically..."

## Skill Requirements Derived from Patterns

The skill MUST explicitly:

1. **REQUIRE acceptance criteria in prd.json** (counters "story title is clear")
2. **REQUIRE Codebase Patterns section in progress.txt** (counters "git provides memory")
3. **REQUIRE validation commands in prompt.md** (counters "testing is obvious")
4. **SPECIFY story size limits** (counters "agent can break down")
5. **PROVIDE loop template** (counters "basic loop is sufficient")
6. **EXPLAIN when Ralph makes sense** (counters overuse)

Each requirement must include explicit counters to common rationalizations.
