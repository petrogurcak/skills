---
name: knowledge-book
description: Use when writing a non-fiction knowledge book — compact books that package expertise into memorable formats (like Steal Like an Artist, Rework, Zluta kniha). Two modes — setup (creates book blueprint with positioning, archetype, voice, outline) and chapter (writes one chapter per invocation). Trigger phrases — "write a book", "napsat knihu", "knowledge book", "book chapter", "kapitola", "book blueprint", "osnova knihy", "kniha o". Do NOT use for fiction, academic papers, blog posts (use web-copy), or marketing copy (use copywriting-orchestrator).
metadata:
  author: Petr
  version: 1.0.0
---

# Knowledge Book

Write compact, visually distinctive non-fiction books that package expertise into memorable, actionable formats.

**Announce:** "Using knowledge-book skill in [setup/chapter] mode."

## Two Modes

| Mode | When | Output |
|------|------|--------|
| **setup** | Starting a new book project | `book-blueprint.md` |
| **chapter** | Writing content | `chapters/XX-slug.md` |

If `book-blueprint.md` exists in project root, default to chapter mode. Otherwise, start with setup.

---

## Mode 1: Setup

Walk the author through 6 steps. Ask one question at a time. Save output as `book-blueprint.md`.

### Step 1: Core Positioning

Three questions (Levin):

1. **Who is the niche audience?** — One specific reader, not "everyone"
2. **What should they DO after reading?** — The transformation
3. **What knowledge causes that action?** — The content scope

Synthesize into North Star: "I will teach [AUDIENCE] about [KNOWLEDGE] so they can [ACTION]."

### Step 2: Archetype

Present table. Author picks one:

| Archetype | Example | Words | Unit Size |
|-----------|---------|-------|-----------|
| **Minimalist** | Steal Like an Artist, Anything You Want | 15-35K | 10 principles or 40 micro-lessons |
| **Manifesto** | Rework | 25-30K | 60-90 micro-essays in sections |
| **Process** | Sprint, Make Time | 50-65K | 5-10 sequential steps or tactics menu |
| **Maximalist** | Zluta kniha budovani znacky | 80-120K | 10-15 principles in 3-4 phases |

### Step 3: Knowledge Sources

Ask where content comes from (can combine):

- **NotebookLM** — Provide notebook ID. Query per chapter via MCP.
- **Local files** — Folder path. Read relevant docs per chapter.
- **Author's head** — Interview-style discovery per chapter.

### Step 4: Voice Calibration

1. **Get a writing sample** — 500+ words of author's natural writing. If none, ask 3 questions and use answers.
2. **Analyze voice** — Formality (1-5), sentence rhythm, humor, pronoun preference
3. **Reference tone** — Which is closest? Kleon (zine energy) / Fried (provocative brevity) / Sivers (radical simplicity) / Pressfield (confrontational intensity) / Pastier (systematic depth) / Knapp (step-by-step clarity)
4. **Language** — CZ / EN / other
5. **Generate anti-patterns list** — Banned AI-isms. Always ban: "Let's dive in", "In today's fast-paced world", "It's worth noting", "Moreover/Furthermore", "At its core", "powerful and transformative", "In this chapter we will discuss"

### Step 5: Visual Identity

Descriptive only (for future designer):

- Dominant color, illustration style (hand-drawn / sketchnotes / diagrams / photos / none)
- Visual density per chapter (0 / 1-2 / 3-5 / 5+)
- Medium-is-the-message test: How does the book's form demonstrate its content?

### Step 6: Outline

Generate chapter structure based on archetype. For each chapter:

- **Title** — Imperative or contrarian. Never descriptive.
- **Commander's Intent** — One sentence: what must the reader take away?
- **Anchor story** — What grounds this chapter?
- **Target words** — Based on archetype

**Structural options** (Barry Fox): Presenting the New Idea / Smashing the Paradigm / "We've Got Trouble!" / Story-Fable / Borrowing from Other Fields / Encyclopedic / Topic 101

Save blueprint as `book-blueprint.md` in project root.

---

## Mode 2: Chapter

### Pre-Writing

1. **Load** `book-blueprint.md`
2. **Select chapter** — Ask which, or continue sequentially
3. **Gather knowledge:**
   - NotebookLM: query notebook for this chapter's topic
   - Local files: read relevant documents
   - Author's head: ask 3-5 targeted questions (Scribe interview method)
4. **Load adjacent context** — Previous chapter's ending + next chapter's Commander's Intent

### Writing: The Chapter Formula

Generate section-by-section (1,000-2,000 words per section, assemble into chapter).

**Structure — Brooks 4-part arc:**

| Phase | % | Content |
|-------|---|---------|
| Setup | 0-25% | Problem framing, reader's current reality |
| Response | 25-50% | Failed approaches, conventional wisdom |
| Attack | 50-75% | Your solution, framework, core insight |
| Resolution | 75-100% | Proof, application, springboard forward |

**SUCCESs checklist (Made to Stick) — apply to every chapter:**

- [ ] **Simple** — Serves ONE Commander's Intent. Two ideas = split the chapter.
- [ ] **Unexpected** — Opens with schema violation (counterintuitive fact, paradox, surprising story). Never "In this chapter..."
- [ ] **Concrete** — Every abstract claim has a concrete example within 2 paragraphs. Specific numbers, names, places. Not "a restaurant" — "a 40-seat bistro in Brno."
- [ ] **Credible** — Sinatra Test: one example so compelling it proves everything. Include "try this yourself" moments.
- [ ] **Emotional** — Open with one person, not a trend. Identity appeals > benefit appeals. Feeling before data.
- [ ] **Stories** — Anchor story per chapter. Match plot to goal: Challenge (teaching skills), Connection (teaching collaboration), Creativity (teaching innovation). End with springboard, not summary.

**Writing craft:**

- **Zinsser:** Strip to cleanest components. Kill qualifiers. Active verbs. Stop when the point lands.
- **Pinker:** Classic Style — showing something interesting to an intelligent friend. Given-before-New. Repeat key terms. Kill zombie nouns.
- **McPhee:** Lead = flashlight into the chapter. Know the ending first.
- **Handley:** Quality = Utility x Inspiration x Empathy. Any zero = total zero.

**Anti-slop guardrails:**

- Vary sentence length. Use fragments. One-sentence paragraphs.
- No symmetrical structure (not every chapter = same subsections, same example count)
- Kill throat-clearing first paragraphs
- Author's opinion on every claim — no "both sides" hedging
- Statistics as relationships ("for every 3 steaks you buy, you throw one in the trash")
- End with springboard story, never a summary

### Self-Edit Pass

After drafting, check:

1. **Commander's Intent** — Does it deliver the one takeaway?
2. **Anti-slop scan** — Check against banned phrases from blueprint
3. **Concrete test** — Example within 2 paragraphs of every abstract claim?
4. **Voice match** — Rhythm and tone match the voice sample?
5. **Forced asymmetry** — Different length/structure than previous chapter?

### Output

Save as `chapters/XX-slug.md`:

```markdown
---
chapter: 1
title: "Chapter Title"
words: 2847
status: draft
---

[Chapter content]
```

---

## Chapter Templates

### Minimalist (Kleon)

```
[Typographic opener — title as manifesto]
[Personal story — 1-3 paragraphs]
[Supporting examples from practitioners]
[Practical how-to mini-section]
[Visual break — illustration description]
[Closing kicker — short, punchy]
```

### Manifesto (Rework)

Generate 5-10 micro-essays per session, grouped by section:

```
[Provocative headline — contrarian claim]
[Illustration concept — one line]
[Opening assertion — thesis first sentence, no warm-up]
[2-4 paragraphs — reasoning + analogy + anecdote]
[Closing imperative — flips expectations or commands]
```

### Process (Sprint)

```
[Phase context — where in the process]
[Step-by-step instructions — numbered, time-boxed]
[Sidebar — facilitator tips]
[Embedded case study]
[End-of-step checklist]
[Transition to next step]
```

### Maximalist (Zluta kniha)

```
[Principle statement — memorable declaration]
[Why this matters — reader's reality]
[Framework diagram description + explanation]
[Case study 1 — detailed, specific numbers]
[Case study 2 — contrasting industry]
[Common mistakes]
[Application guide — step by step]
[Section summary for reference]
```

---

## Integration

| Skill | Usage |
|-------|-------|
| **storytelling** | Anchor story selection, narrative arc |
| **writing-clearly-and-concisely** | Edit pass on drafts |
| **brand-voice** | Load existing voice doc if available |

## File Structure

```
project/
  book-blueprint.md
  voice-sample.md
  chapters/
    00-introduction.md
    01-slug.md
    ...
```

## Sources Encoded

**Methodology:** Barry Fox (7 archetypes), Scribe Media (interview method), Michael Levin (3 questions, bridge structure), Story Grid (5 commandments)

**Craft:** Zinsser (On Writing Well), Pinker (Sense of Style), McPhee (Draft No. 4), Handley (Everybody Writes), Brooks (Story Engineering)

**Sticky ideas:** Heath brothers (Made to Stick) — SUCCESs, Commander's Intent, Curse of Knowledge, Sinatra Test

**Format references:** Kleon (Steal Like an Artist), Fried (Rework), Pastier (Zluta kniha), Knapp (Sprint, Make Time), Sivers (Anything You Want), Pressfield (War of Art)

**Visual design:** Tufte (data-ink ratio), Roam (Back of the Napkin, 6x6), Rohde (Sketchnote Handbook)

**NotebookLM reference notebook:** `ff785860-29ee-4420-a576-cf449e65704f` (8 source books)
