---
name: research
description: >
  Deep research on any topic using Claude (WebSearch), Gemini (web grounding), or both.
  Use when starting brainstorming on new topics, unfamiliar domains, or skill creation.
  Use when planning needs external knowledge (new libraries, APIs, best practices).
  Use when user says 'research', 'prozkoumej', 'zjisti', 'najdi informace'.
  Standalone or called from other skills.
---

# Research Skill

**Announce:** "Používám research skill — zvolte engine a téma."

---

## When to Use

- Starting work on an unfamiliar domain or technology
- Brainstorming a new skill, product, or feature
- Planning phase needs external data (libraries, APIs, benchmarks, best practices)
- User explicitly says: "research", "prozkoumej", "zjisti", "najdi informace"
- Called from another skill during Phase 1 planning or context gathering

## When NOT to Use

- The topic is already well understood from project context
- You need code execution or file analysis (use debugging/review skills instead)
- The question is purely internal ("co je v tomhle souboru?")

---

## Process

### Step 1 — Collect Input

Ask the user (or extract from calling skill context):

1. **Topic** — what to research (required)
2. **Context** — project background, goal, constraints (optional but improves output quality)

If called from another skill, extract topic and context from the parent task automatically without asking.

---

### Step 2 — Choose Engine

Ask: **"Ktery engine? Claude / Gemini / oba?"**

| Engine     | How it works                              | Best for                             |
| ---------- | ----------------------------------------- | ------------------------------------ |
| **Claude** | Agent tool with WebSearch + WebFetch      | Real-time web, structured analysis   |
| **Gemini** | `gemini -y -p` with web grounding         | Broad crawl, alternative perspective |
| **Oba**    | Claude first, then Gemini, outputs merged | Maximum coverage, cross-validation   |

Default to **Claude** if the user doesn't specify or is in a hurry.

---

### Step 3 — Execute Research

Use the Research Prompt Template (see below) filled with the topic and context.

#### Claude Engine

Use the Agent tool with this system prompt:

```
You are a research assistant. Use WebSearch and WebFetch tools to gather current information.
Focus on specific facts, numbers, names, dates. Prefer sources from the last 12 months.
Present both sides of any conflict or debate.
```

Pass the filled Research Prompt Template as the user message.

#### Gemini Engine

Use the Bash tool:

```bash
gemini -y -p "<filled Research Prompt Template>"
```

**Error handling:** If Gemini exits with a non-zero code, inform the user:

> "Gemini neni dostupny. Pokracujem jen s Claude, nebo chces zkusit znovu?"

Never block the parent workflow. If called from another skill, fall back to Claude silently and note the fallback in the output frontmatter.

#### Both Engines

1. Run Claude first (Agent tool)
2. Run Gemini second (Bash tool)
3. Merge outputs under headings:

```markdown
## Claude

<Claude output>

## Gemini

<Gemini output>
```

Then add a **## Synthesis** section reconciling key differences or gaps.

---

### Step 4 — Save Output

```bash
mkdir -p docs/research
```

Save to: `docs/research/YYYY-MM-DD-<topic-slug>.md`

**Slug rules:** lowercase, strip diacritics, spaces to hyphens, max 50 chars.
Example: "React Native vs Expo 2025" → `2026-04-03-react-native-vs-expo-2025.md`

**Output file format:**

```markdown
---
topic: <original topic>
date: YYYY-MM-DD
engine: claude | gemini | both
context: <context summary or "none">
---

## Key Findings

<5–10 specific facts, patterns, numbers, names, dates>

## Actionable Insights

<concrete recommendations for our work>

## Gaps

<what couldn't be found or confirmed>

## Sources

<URLs with one-line descriptions>
```

---

### Step 5 — Load into Context

- **If called from another skill:** Return the file path + a 3-sentence summary. The parent skill loads it as context for the next phase.
- **If standalone:** Display the full output in the conversation, then show the saved file path.

---

## Research Prompt Template

```
Research topic: {topic}
Context: {context}

Provide a structured research report:

## Key Findings
5-10 specific facts/patterns (numbers, names, dates when available)

## Actionable Insights
Concrete recommendations relevant to our work

## Gaps
What you couldn't find or confirm

## Sources
URLs with one-line descriptions

Constraints: Max 2 pages, no filler, recent sources preferred (last 12 months), present both sides of any conflicts or debates.
```

---

## Integration Notes

- **Auto-triggered** via skill description when `using-superpowers` detects brainstorming or unfamiliar-domain keywords
- **Fires after** clarifying questions have defined the research scope
- **Called from** `development:planning` in Phase 1 when external knowledge is needed
- **Output** always saved to `docs/research/` for future reference and session continuity
