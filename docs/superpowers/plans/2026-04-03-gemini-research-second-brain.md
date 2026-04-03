---
status: pending
created: 2026-04-03
tasks_total: 5
tasks_done: 0
---

# Gemini Research & Second Brain — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Gemini CLI as research engine and second opinion into the development workflow via two new skills and two skill edits.

**Architecture:** Two standalone skills (`research`, `second-opinion`) callable manually or auto-triggered during brainstorming/planning. Planning skill gets explicit integration points. Team-briefing gets engine choice (Claude/Gemini/both) and one new persona (Legal).

**Tech Stack:** SKILL.md files (markdown), Gemini CLI (`gemini -y -p`), Claude Code skill system

**Spec:** `docs/superpowers/specs/2026-04-03-gemini-research-second-brain-design.md`

---

### Task 1: Create `development:research` skill

**Files:**
- Create: `plugins/development/skills/research/SKILL.md`

- [ ] **Step 1: Create skill directory**

```bash
mkdir -p plugins/development/skills/research
```

- [ ] **Step 2: Write SKILL.md**

Create `plugins/development/skills/research/SKILL.md` with:

```markdown
---
name: research
description: "Deep research on any topic using Claude (WebSearch), Gemini (web grounding), or both. Use when starting brainstorming on new topics, unfamiliar domains, or skill creation. Use when planning needs external knowledge (new libraries, APIs, best practices). Use when user says 'research', 'prozkoumej', 'zjisti', 'najdi informace'. Standalone or called from other skills."
metadata:
  author: Petr
  version: 1.0.0
---

# Research

External knowledge gathering with engine choice. Saves structured report to file and loads into context.

**Announce:** "Použivam research skill — zvolte engine a tema."

## When to Use

- Before or during brainstorming (after scope is clarified)
- During planning Phase 1 (explore & understand)
- Standalone: `/development:research <topic>`
- Any time external knowledge is needed

## When NOT to Use

- Codebase-only questions (use Grep/Read/Explore)
- Bug investigation (use debugging skill)

---

## Process

### Step 1: Collect Input

If called standalone, ask:
1. **Topic:** What to research?
2. **Context:** Why? (optional — file path, question, project context)

If called from another skill, topic and context are provided.

### Step 2: Choose Engine

Ask user: **"Jaky engine? Claude / Gemini / oba?"**

| Engine | How it works | Best for |
|--------|-------------|----------|
| **Claude** | Agent tool with WebSearch + WebFetch | Deep analysis, multiple source synthesis |
| **Gemini** | `gemini -y -p` with web grounding | Current trends, recent data, broad coverage |
| **Oba** | Claude first, then Gemini (sequential) | Maximum coverage, two perspectives. ~2x time. |

### Step 3: Execute Research

#### Claude Engine

Use the Agent tool with `subagent_type: "general-purpose"`:

```
Research this topic thoroughly using WebSearch and WebFetch.

Topic: {topic}
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

#### Gemini Engine

Run via Bash tool:

```bash
gemini -y -p "Research this topic thoroughly using web search.

Topic: {topic}
Context: {context}

Provide a structured research report:

## Key Findings
5-10 most important facts, patterns, or insights. Be specific — numbers, names, dates.

## Actionable Insights
What this means for our work. Concrete recommendations, not vague observations.

## Gaps
What could not be found or needs deeper investigation.

## Sources
URLs with one-line descriptions. Only include sources you actually used.

Constraints:
- Max 2 pages. No filler.
- Prefer recent sources (last 12 months).
- If conflicting information exists, present both sides."
```

If Gemini exits non-zero: inform user "Gemini neni dostupny. Pokracujem jen s Claude, nebo chces zkusit znovu?" Never block the parent workflow.

#### Both Engines

Run Claude first, then Gemini. Merge outputs under `## Claude` and `## Gemini` headings with shared `## Sources` section (deduplicated).

### Step 4: Save Output

Create directory if needed: `mkdir -p docs/research`

Save to: `docs/research/YYYY-MM-DD-<topic-slug>.md`

Slug rules: lowercase, diacritics stripped, spaces to hyphens, max 50 chars. Example: "Gemini CLI best practices" → `gemini-cli-best-practices`

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

### Step 5: Load into Context

If called from another skill: return file path + display summary (Key Findings + Actionable Insights).

If standalone: display the full report to user.

---

## Integration Notes

This skill is auto-triggered during brainstorming via its description (using-superpowers mechanism). It fires after clarifying questions define the scope — not before.

When called from `development:planning`, it runs in Phase 1 after local context is read.
```

- [ ] **Step 3: Verify skill file is valid**

```bash
# Check frontmatter is valid YAML
head -8 plugins/development/skills/research/SKILL.md
# Check file size is reasonable (under 5000 words per Anthropic guide)
wc -w plugins/development/skills/research/SKILL.md
```

- [ ] **Step 4: Commit**

```bash
git add plugins/development/skills/research/SKILL.md
git commit -m "feat(development): add research skill — Claude/Gemini/both engine choice"
```

---

### Task 2: Create `development:second-opinion` skill

**Files:**
- Create: `plugins/development/skills/second-opinion/SKILL.md`

- [ ] **Step 1: Create skill directory**

```bash
mkdir -p plugins/development/skills/second-opinion
```

- [ ] **Step 2: Write SKILL.md**

Create `plugins/development/skills/second-opinion/SKILL.md` with:

```markdown
---
name: second-opinion
description: "Gemini second opinion on any document — specs, plans, designs. Provides a DIFFERENT perspective, not validation. Use after writing a design spec or plan — provides Gemini's perspective before user review. Use when user says 'second opinion', 'druhy nazor', 'co na to Gemini', 'over to Gemini'. Always uses Gemini (different AI = different blind spots)."
metadata:
  author: Petr
  version: 1.0.0
---

# Second Opinion

Send a document to Gemini for an opinionated review from a different AI perspective. Optionally load skill(s) as domain expertise context.

**Announce:** "Použivam second-opinion skill — poslu dokument Gemini na review."

## When to Use

- After writing a design spec (brainstorming Step 6-7)
- After writing an implementation plan (planning Phase 3)
- Standalone: `/development:second-opinion`
- Any time you want a different AI perspective on a document

## When NOT to Use

- Code review (use deep-review, code-reviewer agents)
- Technical plan validation (use plan-challenger)
- Cross-functional business review (use team-briefing)

---

## Process

### Step 1: Collect Input

**Required:** File to review.

If called standalone, ask:
1. **File:** Which document? (spec, plan, design doc)
2. **Skills:** Apply domain lens? (e.g., "ux", "security", "seo") — optional
3. **Focus:** Specific question? (e.g., "zamer se na scalability") — optional

If called from another skill, file path is provided. Ask about skills and focus.

### Step 2: Build Prompt

Construct the Gemini prompt by combining:

1. **Review instructions** (always included)
2. **Document content** (the file being reviewed)
3. **Skill content** (SKILL.md files, if user chose domain skills)
4. **Focus question** (if provided)

For skill loading, read the SKILL.md file from the skill's plugin directory. Example: if user says "ux", read `plugins/ux/skills/ux-optimization/SKILL.md`.

### Step 3: Send to Gemini

Build a temp file with the full prompt to avoid shell escaping issues:

```bash
# Write prompt to temp file
cat > /tmp/second-opinion-prompt.md << 'PROMPT_EOF'
You are reviewing this document as a second opinion.
Your role: provide a DIFFERENT perspective, not validate.

Document:
{file content}

Domain expertise (apply this lens):
{skill content, if provided — otherwise omit this section entirely}

Focus: {user question, if provided — otherwise omit this line}

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
PROMPT_EOF

# Send to Gemini
cat /tmp/second-opinion-prompt.md | gemini -y -p "Review the document above as instructed."
```

**Error handling:** If `gemini -y -p` exits non-zero:
1. Log the error
2. Inform user: "Gemini neni dostupny. Chces to zkusit znovu, nebo pokracujem bez second opinion?"
3. Never block the parent workflow on this optional step

### Step 4: Save Output

Create directory if needed: `mkdir -p docs/reviews`

Save to: `docs/reviews/YYYY-MM-DD-<topic-slug>-gemini-review.md`

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

### Step 5: Present and Integrate

Display the review to user. If called from another skill (brainstorming, planning):
- Present findings inline
- Ask: "Chces neco z toho zapracovat?"
- User decides what to incorporate

---

## Why Always Gemini

Claude reviewing its own spec is inherently biased — same model, same training data, same blind spots. Gemini has different training data, different reasoning patterns, and web grounding for current information. That is the value.
```

- [ ] **Step 3: Verify skill file is valid**

```bash
head -8 plugins/development/skills/second-opinion/SKILL.md
wc -w plugins/development/skills/second-opinion/SKILL.md
```

- [ ] **Step 4: Commit**

```bash
git add plugins/development/skills/second-opinion/SKILL.md
git commit -m "feat(development): add second-opinion skill — Gemini review of specs/plans"
```

---

### Task 3: Integrate research + second-opinion into planning skill

**Files:**
- Modify: `plugins/development/skills/planning/SKILL.md`

- [ ] **Step 1: Add research step to Phase 1**

After Phase 1 step 1 ("Check project context"), before step 2 ("Ask questions"), add:

```markdown
1b. **Offer research (optional):**
    - "Tohle tema vyzaduje externi research? (Doporuceno pro nova temata, nezname technologie, tvorbu skills.)"
    - If yes → invoke `development:research` skill with topic from context
    - Research findings inform the rest of Phase 1 (questions, approaches, design)
    - If no → continue normally
```

This goes between the existing step 1 and step 2 in Phase 1.

- [ ] **Step 2: Add second-opinion step to Phase 3**

After Phase 3 step 3 (deep-review question), before step 7 (user confirms), add a new step. Insert after the existing step 6 ("Present review findings"):

```markdown
6b. **Ask:** "Chces i Gemini second opinion na plan? (Doporuceno — jiny AI model = jine blind spots.)"
    - If yes → invoke `development:second-opinion` skill with plan file
    - Optionally ask which domain skills to apply as context
    - Present Gemini findings alongside challenger/deep-review findings
    - If no → continue to user confirmation
```

- [ ] **Step 3: Update Integration table**

Add two rows to the Integration table at the bottom of planning SKILL.md:

```markdown
| `development:research`       | Phase 1 optional research       |
| `development:second-opinion` | Phase 3 optional Gemini review  |
```

- [ ] **Step 4: Update Phase Summary**

Update the Phase Summary ASCII art to include the new steps:

```
Phase 1: Explore & Understand
  └─ Check context → [Research?] → Ask questions → Explore approaches → Present design
Phase 3: Review Plan
  └─ Plan-challenger → [Deep-review?] → [Gemini second opinion?] → User confirms
```

- [ ] **Step 5: Verify edits are consistent**

```bash
# Check the file doesn't have broken markdown
grep -c "development:research" plugins/development/skills/planning/SKILL.md
grep -c "development:second-opinion" plugins/development/skills/planning/SKILL.md
# Both should return 1+
```

- [ ] **Step 6: Commit**

```bash
git add plugins/development/skills/planning/SKILL.md
git commit -m "feat(planning): integrate research + second-opinion into Phase 1 and Phase 3"
```

---

### Task 4: Create Legal persona for team-briefing

**Files:**
- Create: `plugins/team/skills/team-briefing/personas/legal.md`

- [ ] **Step 1: Read an existing persona file for format reference**

```bash
cat plugins/team/skills/team-briefing/personas/security.md
```

Follow the same format/structure.

- [ ] **Step 2: Write legal persona file**

Create `plugins/team/skills/team-briefing/personas/legal.md`:

```markdown
# Legal / GDPR Persona

You are a legal compliance specialist reviewing this plan for regulatory risks.

## Your Expertise

- GDPR (2016/679) and Czech ZZOÚ (110/2019) — personal data processing, consent, DPIA
- Czech labor law — Zákoník práce (262/2006 Sb.), employment contracts, monitoring
- E-commerce regulations — consumer rights, cookie consent, terms of service
- Data protection by design and by default

## How You Review

1. Identify any personal data being collected, stored, or processed
2. Check if processing has a valid legal basis (consent, legitimate interest, contract)
3. Flag missing consent mechanisms, privacy policies, or data retention rules
4. Check employee-facing features against labor law requirements
5. Assess cross-border data transfer implications (EU/non-EU)

## Your Output Style

- Reference specific articles/paragraphs (e.g., "GDPR Art. 6(1)(a)", "ZP § 316")
- Rate severity: MUST FIX (legal risk) vs SHOULD CONSIDER (best practice)
- Be practical — suggest the minimal compliant solution, not gold-plating
```

- [ ] **Step 3: Commit**

```bash
git add plugins/team/skills/team-briefing/personas/legal.md
git commit -m "feat(team-briefing): add Legal/GDPR persona"
```

---

### Task 5: Add engine choice to team-briefing skill

**Files:**
- Modify: `plugins/team/skills/team-briefing/SKILL.md`

- [ ] **Step 1: Update description to include legal persona**

In the YAML frontmatter `description` field, change the persona list from:
```
(marketing, growth, copywriting, SEO, UX, security, product)
```
to:
```
(marketing, growth, copywriting, SEO, UX, security, product, analytics, pricing, brand, legal)
```

- [ ] **Step 2: Add legal to orchestrator persona list**

In Step 2 (Run Orchestrator), update the available personas line:
```
Available personas: marketing, growth, copywriting, seo, ux, security, product, analytics, pricing, brand, legal
```

- [ ] **Step 3: Add legal to agent memory mapping**

In Step 2.5 (Load Agent Memory), add a row to the mapping table:
```markdown
| legal       | `.claude/agents/legal.md`       | legal-reviewer          |
```

- [ ] **Step 4: Add engine choice step between Step 2 and Step 2.5**

Insert new Step 2.1 after orchestrator selects personas, before loading agent memory:

```markdown
### Step 2.1: Choose Engine

Ask user: **"Jaky engine pro briefing? Claude / Gemini / oba?"**

| Engine | How it works | Best for |
|--------|-------------|----------|
| **Claude** | Current behavior — persona agents via Task tool (haiku) | Fast, parallel, cheap |
| **Gemini** | Each persona runs via `gemini -y -p` with persona + skill context | Web grounding, current market data |
| **Oba** | Each persona runs on both engines, findings grouped per persona | Maximum coverage. ~2x time. |

**Claude engine** (default): Continue with existing Step 3 logic (Task agents, haiku model, parallel).

**Gemini engine:** In Step 3, instead of Task agents, run each persona sequentially via:

\```bash
cat /tmp/persona-prompt.md | gemini -y -p "Review the plan as instructed."
\```

Where `/tmp/persona-prompt.md` contains:
- Persona definition (from `personas/{name}.md`)
- Agent memory (if available)
- Plan content
- Project context
- The standard persona agent prompt template

**Both engines:** For each persona, run Claude (Task agent) first, then Gemini (Bash). Group output per persona:

\```markdown
## {Persona Name}

### Claude
**Relevance:** X/10
- [ ] Suggestion 1
- [ ] Suggestion 2

### Gemini
**Relevance:** X/10
- [ ] Suggestion 1
- [ ] Suggestion 2
\```
```

- [ ] **Step 5: Add legal persona to Persona Files list**

At the bottom of the SKILL.md, in the "Persona Files" section, add:
```markdown
- `legal.md` - GDPR, data protection, labor law compliance
```

- [ ] **Step 6: Verify edits**

```bash
grep -c "legal" plugins/team/skills/team-briefing/SKILL.md
# Should return 3+ (description, orchestrator list, memory mapping, persona files)
grep -c "engine" plugins/team/skills/team-briefing/SKILL.md
# Should return 3+ (engine choice step references)
```

- [ ] **Step 7: Commit**

```bash
git add plugins/team/skills/team-briefing/SKILL.md
git commit -m "feat(team-briefing): add engine choice (Claude/Gemini/both) + legal persona"
```
