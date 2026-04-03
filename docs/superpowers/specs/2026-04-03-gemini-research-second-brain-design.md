# Gemini Research & Second Brain — Design Spec

**Date:** 2026-04-03
**Author:** Petr + Symbiotic Agent
**Plugin:** development (research, second-opinion), superpowers (brainstorming), team (team-briefing)
**Status:** Approved design

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

| Skill                       | Change                                                                      |
| --------------------------- | --------------------------------------------------------------------------- |
| `superpowers:brainstorming` | +research step after context explore, +second-opinion step after spec write |
| `development:planning`      | +research step in Phase 1, +second-opinion in Phase 3                       |
| `team:team-briefing`        | +engine choice (Claude/Gemini/both), +4 new personas                        |

---

## Skill 1: `development:research`

### Trigger

- Manual: `/development:research <topic>`
- Called from other skills: brainstorming (Step 1b), planning (Phase 1)
- Standalone use anytime

### Flow

```
1. Receive topic + optional context (file, URL, question)
2. Ask: "Claude / Gemini / oba?"
   - Claude = Agent tool with WebSearch/WebFetch
   - Gemini = `gemini -y` with web grounding
   - Both = parallel execution, merged into one document
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

Current flow with new steps marked:

```
1.  Explore project context
1b. NEW — Research: "Potrebujes externi research?" → development:research
2.  Offer visual companion
3.  Ask clarifying questions (now informed by research if done)
4.  Propose 2-3 approaches
5.  Present design
6.  Write design doc
7.  Spec self-review
7b. NEW — Second opinion: "Chces Gemini second opinion na specku?" → development:second-opinion
8.  User reviews spec (with Gemini findings available)
9.  Transition to writing-plans
```

Step 1b fires after local context exploration, before any questions. This means research findings inform the entire brainstorming conversation.

Step 7b fires after the spec is written and self-reviewed, before user review. This means the user sees both the spec and Gemini's perspective at the same time.

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

### New Personas (4 added to existing 7)

| Persona        | Skill Basis                                                 | Perspective                                     |
| -------------- | ----------------------------------------------------------- | ----------------------------------------------- |
| **Legal/GDPR** | `legal:gdpr`, `legal:labor-law`                             | Compliance, data protection, employment law     |
| **Branding**   | `branding:brand-strategy`, `branding:brand-voice`           | Brand consistency, naming, voice alignment      |
| **Pricing**    | `marketing:pricing`                                         | Monetization, tier design, value communication  |
| **Analytics**  | `development:analytics-report`, `marketing:analytics-setup` | Measurability, tracking plan, data architecture |

Total personas: 11 (Marketing, Growth, Copywriting, SEO, UX, Security, Product, Legal, Branding, Pricing, Analytics).

Orchestrator selects relevant subset per briefing — not all 11 run every time.

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
gemini -y "prompt here"
```

The `-y` flag auto-approves tool use. Gemini CLI reads `GEMINI.md` (symlinked to `AGENT.md`) and has access to shared skills via `~/.gemini/skills/` symlinks.

For file content, pass via stdin or temp file to avoid shell escaping issues:

```bash
cat docs/specs/my-spec.md | gemini -y "Review this document as a second opinion..."
```

### Parallel Execution (Both Engines)

When user chooses "both":

- Claude research runs via Agent tool (background)
- Gemini research runs via Bash `gemini -y` (background)
- Both complete, results merged into single output file with clear attribution

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

| Deliverable                  | Type      | Files                                                |
| ---------------------------- | --------- | ---------------------------------------------------- |
| `development:research`       | New skill | `plugins/development/skills/research/SKILL.md`       |
| `development:second-opinion` | New skill | `plugins/development/skills/second-opinion/SKILL.md` |
| Brainstorming integration    | Edit      | `superpowers:brainstorming` SKILL.md                 |
| Planning integration         | Edit      | `development:planning` SKILL.md                      |
| Team-briefing upgrade        | Edit      | `team:team-briefing` SKILL.md + 4 new persona files  |
