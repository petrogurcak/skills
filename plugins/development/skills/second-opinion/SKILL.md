---
name: second-opinion
description: "Gemini second opinion on any document — specs, plans, designs. Provides a DIFFERENT perspective, not validation. Use after writing a design spec or plan — provides Gemini's perspective before user review. Use when user says 'second opinion', 'druhy nazor', 'co na to Gemini', 'over to Gemini'. Always uses Gemini (different AI = different blind spots)."
---

# Second Opinion

**Announce:** "Používám second-opinion skill — pošlu dokument Gemini na review."

---

## When to Use

**Use when:**
- After writing a design spec (post-brainstorming)
- After writing a plan (post-planning Phase 3)
- Standalone — any time you want a different AI perspective
- User says: "second opinion", "druhy nazor", "co na to Gemini", "over to Gemini"

**Do NOT use when:**
- Code review → use `review:deep-review`
- Technical plan validation → use `development:planning` (plan-challenger)
- Cross-functional business review → use `team:team-briefing`

---

## Process

### Step 1: Collect Input

**Required:**
- File to review (spec, plan, design doc)

**Optional:**
- Domain skill(s) to apply as lens (e.g., "ux", "security", "seo")
- Specific focus question

**If called standalone:** Ask the user for all three inputs before proceeding.

**If called from another skill:** File is already provided. Ask:
1. "Chces pridat domenovy skill jako lens? (napr. ux, security, seo — nebo nechej prazdne)"
2. "Mas konkretni otazku na Gemini? (nebo nechej prazdne pro general review)"

---

### Step 2: Build Prompt

Construct the review prompt by combining:
1. Review instructions (template below)
2. Document content (read the file)
3. Skill content — if user chose skills, read the relevant SKILL.md files

**Skill loading:** Read SKILL.md from the plugin directory.

Examples:
- "ux" → read `plugins/ux/skills/ux-optimization/SKILL.md`
- "security" → read `plugins/review/skills/security-review/SKILL.md`
- "seo" → read `plugins/seo/skills/seo-orchestrator/SKILL.md`

If a skill file is not found, skip it silently and continue without it.

**Review prompt template:**

```
You are reviewing this document as a second opinion.
Your role: provide a DIFFERENT perspective, not validate.

Document:
{file content}

Domain expertise (apply this lens):
{skill content, if provided — omit this section entirely if none}

Focus:
{question, if provided — omit this section entirely if none}

Respond with:
## Co vidim jinak
- Where you disagree or see blind spots. Reference exact sections.
## Jak bych to udelal ja
- Your alternative approach with reasoning. Say "I would do X because Y."
## Sources
- If you used web grounding.

Rules: Be opinionated. Be specific. No generic praise. Max 1 page.
If document is solid, say so briefly and focus on 1-2 things you'd change.
```

---

### Step 3: Send to Gemini

Use a temp file to avoid shell escaping issues:

```bash
cat > /tmp/second-opinion-prompt.md << 'PROMPT_EOF'
[combined prompt with document content and skill content substituted in]
PROMPT_EOF
cat /tmp/second-opinion-prompt.md | gemini -y -p "Review the document above as instructed."
```

**Error handling:** If gemini exits non-zero or is not available:

> "Gemini neni dostupny. Chces zkusit znovu, nebo pokracujem bez second opinion?"

Never block the workflow. If Gemini is unavailable, let the user decide whether to retry or continue without review.

---

### Step 4: Save Output

```bash
mkdir -p docs/reviews
```

Save to: `docs/reviews/YYYY-MM-DD-<topic-slug>-gemini-review.md`

Derive `<topic-slug>` from the reviewed file name (e.g., `user-auth-spec` from `user-auth-spec.md`).

**Output file format:**

```markdown
# Gemini Review: {topic}
**Date:** YYYY-MM-DD
**Reviewed file:** {path}
**Skills applied:** {comma-separated list or "none"}
**Focus:** {question or "general review"}

## Co vidim jinak

{Gemini output}

## Jak bych to udelal ja

{Gemini output}

## Sources

{Gemini output or "none"}
```

---

### Step 5: Present and Integrate

Display the full review inline.

**If called from another skill:** Present review inline, then ask:

> "Chces neco z toho zapracovat?"

User decides. Do not automatically apply any changes.

---

## Why Always Gemini

Claude reviewing its own output is inherently biased. Claude wrote the document — it will tend to confirm its own reasoning, miss its own blind spots, and validate its own assumptions.

Gemini has different training data, different reasoning patterns, and web grounding. It will disagree on different things, notice different gaps, and approach problems from a different angle.

That difference is the value. The goal is not a second validation — it's a genuinely different perspective.
