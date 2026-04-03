# Gemini Research & Second Brain — Design Spec

**Date:** 2026-04-03
**Author:** Petr + Symbiotic Agent
**Plugin:** development (research, second-opinion), team (team-briefing)
**Status:** Approved design (revised after plan-challenger + Gemini review)

---

## Overview

Two new skills and three skill upgrades that integrate Gemini CLI as a research engine and second opinion into the development workflow.

**Problem:** All pre-implementation work (brainstorming, planning, reviews) operates on local codebase knowledge only. No external research step exists. No second AI perspective validates designs before implementation.

**Solution:**

1. `development:research` — standalone research skill with engine choice (Claude/Gemini/both)
2. `development:second-opinion` — Gemini review of specs/plans with skill-informed perspective
3. Integration into brainstorming, planning, and team-briefing

## Architecture

### New Skills

| Skill            | Plugin      | Purpose                                                         | Engine                                                 |
| ---------------- | ----------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| `research`       | development | External knowledge gathering on any topic                       | Claude / Gemini / both (user chooses)                  |
| `second-opinion` | development | Opinionated review of specs/plans from different AI perspective | Gemini (always — the point is a different perspective) |

### Modified Skills

| Skill                  | Change                                                      |
| ---------------------- | ----------------------------------------------------------- |
| `development:planning` | +research step in Phase 1, +second-opinion in Phase 3       |
| `team:team-briefing`   | +engine choice (Claude/Gemini/both), +1 new persona (Legal) |

**Note on `superpowers:brainstorming`:** This is an official marketplace plugin (read-only cache at `~/.claude/plugins/cache/claude-plugins-official/superpowers/`). Cannot be edited directly. Instead, the `research` and `second-opinion` skill descriptions are written so the `using-superpowers` auto-trigger mechanism invokes them during brainstorming naturally. No edit to brainstorming SKILL.md required.

---

## Skill 1: `development:research`

### Trigger

- Manual: `/development:research <topic>`
- Auto-triggered via skill description during brainstorming (using-superpowers mechanism)
- Called from planning skill (Phase 1)
- Standalone use anytime

### Flow

```
1. Receive topic + optional context (file, URL, question)
2. Ask: "Claude / Gemini / oba?"
   - Claude = Agent tool with WebSearch/WebFetch
   - Gemini = `gemini -y` with web grounding
   - Both = sequential execution (Claude first, then Gemini), merged into one document
3. Engine gets structured research prompt (see below)
4. Save output to `docs/research/YYYY-MM-DD-<topic-slug>.md`
5. Load output into calling skill's context
6. If standalone: display summary to user
```

### Research Prompt Template

```
Research topic: {topic}
Context: {context}

Provide a structured research report:

## Key Findings
5-10 most important facts, patterns, or insights. Be specific — numbers, names, dates.

## Actionable Insights
What this means for our work. Concrete recommendations, not vague observations.

## Gaps
What couldn't be found or needs deeper investigation.

## Sources
URLs with one-line descriptions. Only include sources you actually used.

Constraints:
- Max 2 pages. No filler.
- Prefer recent sources (last 12 months).
- If conflicting information exists, present both sides.
```

### When Called from Other Skills

The calling skill provides topic and context. The research skill handles engine choice, execution, and file output. Returns the file path and content summary to the caller.

When called from brainstorming or planning, the prompt includes: "Tohle tema vyzaduje externi research? (Doporuceno pro nova temata, nezname technologie, tvorbu skills.)" User can skip.

### Output Format

File: `docs/research/YYYY-MM-DD-<topic-slug>.md`

```markdown
# Research: {topic}

**Date:** YYYY-MM-DD
**Engine:** Claude / Gemini / Both
**Context:** {what prompted this research}

## Key Findings

- ...

## Actionable Insights

- ...

## Gaps

- ...

## Sources

- [URL] — description
```

---

## Skill 2: `development:second-opinion`

### Trigger

- Manual: `/development:second-opinion`
- Called from brainstorming (Step 7b), planning (Phase 3)
- Standalone use anytime

### Flow

```
1. Receive:
   - File to review (spec, plan, any document)
   - Optional: relevant skill(s) as domain context (e.g., ux-optimization)
   - Optional: specific focus question ("zamer se na X")
2. Send to Gemini via `gemini -y`:
   - File content
   - Skill content (SKILL.md files)
   - Structured review prompt
3. Save output to `docs/reviews/YYYY-MM-DD-<topic-slug>-gemini-review.md`
4. Load output into calling skill's context
5. User decides what to incorporate
```

### Why Always Gemini

Claude reviewing its own spec is inherently biased — same model, same training data, same blind spots. The value of a second opinion is a genuinely different perspective. Gemini has different training data, different reasoning patterns, and web grounding for current information.

### Review Prompt Template

```
You are reviewing this document as a second opinion.
Your role: provide a DIFFERENT perspective, not validate.

Document:
{file content}

Domain expertise (apply this lens):
{skill content, if provided}

Focus: {user question, if provided}

Respond with:

## Co vidim jinak
- Where you disagree or see blind spots. Be specific — reference exact sections.

## Jak bych to udelal ja
- Your alternative approach with reasoning. Not "consider X" — say "I would do X because Y."

## Sources
- If you used web grounding to support your perspective.

Rules:
- Be opinionated. Be specific. No generic praise.
- If the document is solid, say so briefly and focus on the 1-2 things you'd change.
- Max 1 page.
```

### Output Format

File: `docs/reviews/YYYY-MM-DD-<topic-slug>-gemini-review.md`

```markdown
# Gemini Review: {topic}

**Date:** YYYY-MM-DD
**Reviewed file:** {path}
**Skills applied:** {list of skills used as context, or "none"}
**Focus:** {specific question, or "general review"}

## Co vidim jinak

- ...

## Jak bych to udelal ja

- ...

## Sources

- ...
```

---

## Integration: Brainstorming

`superpowers:brainstorming` is a read-only official plugin. Integration happens via skill descriptions that trigger auto-invocation through the `using-superpowers` mechanism:

- **`development:research`** description includes: "Use when starting brainstorming on new topics, unfamiliar domains, or skill creation — provides external knowledge before design decisions."
- **`development:second-opinion`** description includes: "Use after writing a design spec or plan — provides Gemini's perspective before user review."

The using-superpowers skill checks all available skill descriptions against the current task and invokes matching skills. This means:

1. When brainstorming starts and the topic involves research, the agent naturally invokes `development:research` after exploring project context and clarifying the scope (Step 3+).
2. When a spec is written (Step 6-7), the agent naturally offers `development:second-opinion` before user review.

**Research timing:** Research fires after clarifying questions (not before), because the scope must be defined before we know what to research. This avoids generic, unfocused research.

---

## Integration: Planning

Current flow with new steps:

```
Phase 1: Explore & Understand
  1a. Read local context (existing)
  1b. NEW — "Potrebujes research?" → development:research

Phase 2: Write Plan (unchanged)

Phase 3: Review Plan
  3a. plan-challenger — mandatory, adversarial (existing)
  3b. deep-review — optional, technical (existing)
  3c. NEW — "Chces Gemini second opinion?" → development:second-opinion

Phase 4-7: unchanged
```

---

## Integration: Team Briefing Upgrade

### Engine Choice

At briefing start, after persona selection:

```
"Jaky engine pro briefing? Claude / Gemini / oba?"
- Claude = current behavior (Agent tool with haiku/sonnet)
- Gemini = all personas run via `gemini -y` with their skill as context
- Both = each persona runs on both engines, findings grouped per persona (Claude says X, Gemini says Y)
```

### New Persona (1 added to existing 10)

Existing personas (already implemented): Marketing, Growth, Copywriting, SEO, UX, Security, Product, Analytics, Pricing, Brand.

| Persona        | Skill Basis                     | Perspective                                 |
| -------------- | ------------------------------- | ------------------------------------------- |
| **Legal/GDPR** | `legal:gdpr`, `legal:labor-law` | Compliance, data protection, employment law |

Total personas: 11. Orchestrator selects relevant subset per briefing.

### Persona Prompt (updated for Gemini engine)

When running on Gemini, each persona gets:

```
You are {persona_name} reviewing this plan.
Your expertise: {skill content loaded from SKILL.md}

Plan to review:
{plan content}

Provide 3-5 findings from your domain perspective.
For each: what you see, why it matters, what you'd change.
Use web grounding if current market/industry data supports your point.
```

---

## Technical Implementation Notes

### Gemini CLI Invocation

```bash
# Non-interactive mode with -p flag (supports stdin piping)
cat docs/specs/my-spec.md | gemini -y -p "Review this document as a second opinion..."

# Simple prompt without file input
gemini -y -p "Research topic X with web grounding"
```

The `-y` flag auto-approves tool use. The `-p` flag runs in non-interactive (headless) mode and appends stdin content to the prompt. Gemini CLI reads `GEMINI.md` (symlinked to `AGENT.md`) and has access to shared skills via `~/.gemini/skills/` symlinks.

### Error Handling / Fallback

If `gemini -y -p` exits non-zero (auth expired, rate limit, CLI unavailable):

1. Log the error
2. Inform user: "Gemini neni dostupny. Pokracujem jen s Claude, nebo chces to zkusit znovu?"
3. Never block the parent workflow on an optional Gemini step

### Sequential Execution (Both Engines)

When user chooses "both", execution is sequential (not parallel — Claude Code tool calls within a single skill run are sequential):

1. Claude research runs first via Agent tool with WebSearch/WebFetch
2. Gemini research runs second via Bash `gemini -y -p`
3. Both results merged into single output file with clear `## Claude` / `## Gemini` attribution

This takes roughly 2x the time of a single engine. The tradeoff is two perspectives vs speed.

### File Organization

```
docs/
├── research/           # Research outputs
│   └── YYYY-MM-DD-<topic>.md
├── reviews/            # Second opinion outputs
│   └── YYYY-MM-DD-<topic>-gemini-review.md
├── plans/              # Existing plans (unchanged)
└── superpowers/specs/  # Existing specs (unchanged)
```

---

## What Does NOT Change

- `development:development-workflow` — inherits changes from brainstorming/planning
- `plan-challenger` — stays mandatory, internal adversarial review
- `review:deep-review` — stays as technical internal review
- `team-briefing` persona selection logic — orchestrator still picks relevant subset
- Gemini CLI config — already set up and authenticated

---

## Scope Summary

| Deliverable                  | Type      | Files                                                         |
| ---------------------------- | --------- | ------------------------------------------------------------- |
| `development:research`       | New skill | `plugins/development/skills/research/SKILL.md`                |
| `development:second-opinion` | New skill | `plugins/development/skills/second-opinion/SKILL.md`          |
| Planning integration         | Edit      | `plugins/development/skills/planning/SKILL.md`                |
| Team-briefing upgrade        | Edit      | `plugins/team/skills/team-briefing/SKILL.md` + 1 persona file |

**Not edited:** `superpowers:brainstorming` (read-only official plugin — integration via skill descriptions and using-superpowers auto-trigger).

## Review Findings Incorporated

From plan-challenger, Gemini second opinion, and fact-checking:

| Finding                                        | Resolution                                                              |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| C1: brainstorming is read-only official plugin | Integration via skill descriptions + using-superpowers auto-trigger     |
| C2: 3 of 4 "new" personas already exist        | Corrected to 1 new persona (Legal)                                      |
| C3: gemini CLI stdin invocation unvalidated    | Validated: `cat file \| gemini -y -p "prompt"` works (-p appends stdin) |
| W1: no Gemini fallback                         | Added error handling section — never block workflow                     |
| W2: "parallel" execution misleading            | Corrected to sequential with 2x time tradeoff documented                |
| Gemini: research before questions is premature | Moved research to after clarifying questions (scope-first)              |
