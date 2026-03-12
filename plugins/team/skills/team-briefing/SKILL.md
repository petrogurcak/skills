---
name: team-briefing
description: Activates virtual AI team personas (marketing, growth, copywriting, SEO, UX, security, product) to review a plan from cross-functional perspectives and provide actionable suggestions. Use after brainstorming or planning is complete, before implementation begins, when you want diverse domain perspectives on a plan. Trigger phrases include "team briefing", "review this plan with the team", "get team feedback", "cross-functional review". Not for code review (use deep-review) or single-domain feedback — this is multi-persona strategic review.
metadata:
  author: Petr
  version: 1.1.0
context: fork
agent: general-purpose
---

# Team Briefing

## Overview

After brainstorming/planning, launch virtual team personas to review the plan from their domain perspective. Each persona reads the plan + project context and provides 2-5 concrete, actionable suggestions. Output is a single markdown file with checkboxes you can pull into the implementation plan.

## Project Context (auto-injected)

**Branch:** !`git branch --show-current`

### Recent plans

!`ls -t docs/plans/*.md 2>/dev/null | head -5`

### Project config

!`head -20 .claude/CLAUDE.md 2>/dev/null`

### Active context

!`cat .claude/ACTIVE_CONTEXT.md 2>/dev/null | head -30`

## When to Use

- After `brainstorming` skill completes a design document
- After writing a plan in `docs/plans/`
- When you want cross-functional review before implementation
- `/team-briefing` manual invocation

## Process

### Step 1: Locate Input

Use the auto-injected plan list above. If $ARGUMENTS specifies a plan file, use that instead. Otherwise use the most recent plan from the list.

### Step 2: Run Orchestrator

Launch a **single Task agent (haiku model)** to decide which personas are relevant.

**Orchestrator prompt:**

```
You are a team orchestrator. Read the plan below and decide which personas should review it.

Available personas: marketing, growth, copywriting, seo, ux, security, product, analytics, pricing, brand

For each persona, assess relevance (1-10). Return ONLY personas with relevance >= 4.

Return as JSON array: ["marketing", "seo", "product"]

Plan to review:
{plan_content}

Project context:
{project_context}
```

Use `subagent_type: "general-purpose"` with `model: "haiku"`.

### Step 2.5: Load Agent Memory (if available)

For each selected persona, check if an agent memory file exists in the project's `.claude/agents/` directory. The mapping is:

| Persona     | Memory file                     | Learning advisor source |
| ----------- | ------------------------------- | ----------------------- |
| seo         | `.claude/agents/seo.md`         | seo-monitor             |
| growth      | `.claude/agents/growth.md`      | growth-advisor          |
| security    | `.claude/agents/security.md`    | security-reviewer       |
| product     | `.claude/agents/product.md`     | product-advisor         |
| copywriting | `.claude/agents/copywriting.md` | copywriting-reviewer    |
| analytics   | `.claude/agents/analytics.md`   | analytics-monitor       |
| ux          | `.claude/agents/ux.md`          | ux-reviewer             |
| pricing     | `.claude/agents/pricing.md`     | pricing-advisor         |
| marketing   | `.claude/agents/marketing.md`   | marketing-advisor       |
| brand       | `.claude/agents/brand.md`       | brand-advisor           |

Read each memory file if it exists. These contain trends, flags, and learned knowledge from the learning advisor's monthly scans. Pass the content to the persona agent as additional context.

If no memory file exists, proceed without it — the persona will still provide generic domain expertise.

### Step 3: Launch Persona Agents in Parallel

For each persona the orchestrator selected, launch a **Task agent (haiku model)** in parallel.

Each persona agent gets:

1. Its persona definition (read from `personas/{name}.md` in this skill's directory)
2. The plan content
3. Project context
4. **Agent memory** (if loaded in Step 2.5 — recent trends, flags, learned knowledge)

**Persona agent prompt template:**

```
{persona_definition}

---

{agent_memory_content if available, otherwise omit this section}

---

## Your Task

Review the following plan from your domain perspective. Provide:
1. **Relevance score** (1-10) - how relevant is your domain to this plan
2. **2-5 concrete, actionable suggestions** as checkbox items
3. Each suggestion must be specific enough to execute (no generic advice like "consider SEO")
4. If you have agent memory context, reference specific trends or flags when relevant

If relevance < 3, respond with just: "**Relevance:** {score}/10\n- No specific actions for this feature."

## Plan to Review

{plan_content}

## Project Context

{project_context}
```

Use `subagent_type: "general-purpose"` with `model: "haiku"`.

### Step 4: Compile Output

Collect all persona responses and write to `docs/plans/YYYY-MM-DD-<topic>-team-briefing.md`:

```markdown
# Team Briefing: {topic}

> Generated after brainstorming on {date}
> Personas activated: {list of activated personas}

## {Persona Name}

**Relevance:** X/10

- [ ] Specific actionable suggestion 1
- [ ] Specific actionable suggestion 2

## {Next Persona}

...

---

## Top 3 Recommendations

> Cross-persona priorities - most impactful actions across all domains

1. {Most important suggestion from any persona}
2. {Second most important}
3. {Third most important}
```

Write the "Top 3 Recommendations" yourself by reviewing all persona outputs and selecting the highest-impact items.

### Step 5: Present to User

Show a brief summary:

- Which personas were activated
- How many suggestions total
- Top 3 recommendations
- Path to full briefing file

## Rules

- Max 5 suggestions per persona
- Suggestions must be checkboxes (transferable to implementation plan)
- Relevance < 3 = persona writes "no specific actions" (don't pad the file)
- Orchestrator runs on haiku (cheap classification task)
- Persona agents run on haiku (strategic suggestions, not complex coding)
- All persona agents run in parallel (speed)

## Persona Files

Persona definitions live in `personas/` subdirectory of this skill:

- `marketing.md` - Announcement, tracking, channel strategy
- `growth.md` - Metrics, acquisition, retention
- `copywriting.md` - Messaging, tone, communication
- `seo.md` - Indexing, structured data, search visibility
- `ux.md` - Usability, flow, accessibility
- `security.md` - OWASP, data protection, auth
- `product.md` - PMF, prioritization, success metrics
- `analytics.md` - GA4 tracking, funnels, measurement strategy
- `pricing.md` - Pricing models, packaging, value metrics
- `brand.md` - Visual identity, design system, brand voice
