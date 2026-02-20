---
name: team-briefing
description: Use when a brainstorming or planning session is complete and you want cross-functional perspective before implementation - activates AI personas (marketing, growth, copywriting, SEO, UX, security, product) to review the plan and provide actionable suggestions
---

# Team Briefing

## Overview

After brainstorming/planning, launch virtual team personas to review the plan from their domain perspective. Each persona reads the plan + project context and provides 2-5 concrete, actionable suggestions. Output is a single markdown file with checkboxes you can pull into the implementation plan.

## When to Use

- After `brainstorming` skill completes a design document
- After writing a plan in `docs/plans/`
- When you want cross-functional review before implementation
- `/team-briefing` manual invocation

## Process

### Step 1: Locate Input

Find the brainstorming/plan document to review. Check in order:
1. Most recent `docs/plans/YYYY-MM-DD-*-design.md`
2. Ask user which document to review

Also read project context:
- `.claude/CLAUDE.md` (if exists)
- `.claude/ACTIVE_CONTEXT.md` (if exists)

### Step 2: Run Orchestrator

Launch a **single Task agent (haiku model)** to decide which personas are relevant.

**Orchestrator prompt:**
```
You are a team orchestrator. Read the plan below and decide which personas should review it.

Available personas: marketing, growth, copywriting, seo, ux, security, product

For each persona, assess relevance (1-10). Return ONLY personas with relevance >= 4.

Return as JSON array: ["marketing", "seo", "product"]

Plan to review:
{plan_content}

Project context:
{project_context}
```

Use `subagent_type: "general-purpose"` with `model: "haiku"`.

### Step 3: Launch Persona Agents in Parallel

For each persona the orchestrator selected, launch a **Task agent (haiku model)** in parallel.

Each persona agent gets:
1. Its persona definition (read from `personas/{name}.md` in this skill's directory)
2. The plan content
3. Project context

**Persona agent prompt template:**
```
{persona_definition}

---

## Your Task

Review the following plan from your domain perspective. Provide:
1. **Relevance score** (1-10) - how relevant is your domain to this plan
2. **2-5 concrete, actionable suggestions** as checkbox items
3. Each suggestion must be specific enough to execute (no generic advice like "consider SEO")

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
