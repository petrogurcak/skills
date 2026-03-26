# Knowledge Book Skill — Design Spec

**Plugin:** copywriting
**Skill name:** `knowledge-book`
**Date:** 2026-03-26

---

## Purpose

Universal skill for writing compact, visually distinctive knowledge books — books that package expertise into memorable, actionable formats. Covers the full spectrum from 96-page minimalist books (Sivers) to 600-page maximalist systems (Pastier).

## Two Modes

### Mode 1: `setup` — Book Blueprint

Discovery process that produces a `book-blueprint.md` file. Runs once per book project.

### Mode 2: `chapter` — Chapter Writing

Writes one chapter per invocation, following the blueprint. Repeatable.

---

## Mode 1: Setup (Blueprint)

### Step 1: Core Positioning (Levin's 3 Questions)

Ask sequentially:

1. **Who is the niche audience?** — One specific reader avatar, not "everyone"
2. **What should they DO after reading?** — The transformation / action
3. **What knowledge causes that action?** — The content scope

Output: North Star sentence — "I will teach [AUDIENCE] about [KNOWLEDGE] so they can [ACTION]."

### Step 2: Archetype Selection

Present the 4 archetypes with examples. Author picks one:

| Archetype      | Example                                     | Pages    | Words   | Chapters                                          | Unit Size         |
| -------------- | ------------------------------------------- | -------- | ------- | ------------------------------------------------- | ----------------- |
| **Minimalist** | Steal Like an Artist, Anything You Want     | 96-224   | 15-35K  | 10 principles or 40 micro-lessons                 | 300-1,500 words   |
| **Manifesto**  | Rework, It Doesn't Have to Be Crazy at Work | 240-280  | 25-30K  | 60-90 micro-essays in 10-16 sections              | 200-600 words     |
| **Process**    | Sprint, Make Time                           | 274-304  | 50-65K  | 5-10 sequential steps or framework + tactics menu | 1,500-3,000 words |
| **Maximalist** | Žlutá kniha budování značky                 | 400-600+ | 80-120K | 10-15 principles in 3-4 phases                    | 3,000-8,000 words |

Each archetype implies different chapter structure — see Chapter Templates below.

### Step 3: Knowledge Sources

Ask where content comes from:

- **NotebookLM** — Provide notebook ID. Skill queries it per chapter via MCP. Reference notebook with writing methodology: `ff785860-29ee-4420-a576-cf449e65704f` (8 books: Zinsser, McPhee, Heath, Kleon, Fried, Sivers, Roam, Rohde).
- **Local files** — Point to a folder. Skill reads relevant documents per chapter.
- **Author's head** — Skill asks discovery questions per chapter before writing.
- **Combination** — Mix of the above. Specify per-chapter or globally.

### Step 4: Voice & Style

Calibrate the author's voice:

1. **Ask for a writing sample** — 500+ words of the author's natural writing (blog post, email, anything). If unavailable, ask 3 questions and use the answers as voice reference.
2. **Analyze and name the voice** — Formality level (1-5), sentence rhythm, humor presence, use of questions, pronoun preference (I/we/you).
3. **Reference book for tone** — Which of the reference books is closest? (Kleon's zine energy / Fried's provocative brevity / Sivers' radical simplicity / Pressfield's confrontational intensity / Pastier's systematic depth / Knapp's step-by-step clarity)
4. **Language** — CZ / EN / other
5. **Anti-patterns list** — Generate a list of banned AI-isms based on voice analysis. Always includes: "Let's dive in", "In today's fast-paced world", "It's worth noting", "Moreover/Furthermore", "At its core", "powerful and transformative", "In this chapter we will discuss".

Store voice profile in blueprint.

### Step 5: Visual Identity (descriptive, not generative)

Describe the book's visual concept for future designer/formatter:

- **Dominant color** — e.g., yellow (Pastier), black & white (Kleon)
- **Illustration style** — hand-drawn / sketchnotes / diagrams / photographs / none
- **Visual density** — visuals per chapter (0 / 1-2 / 3-5 / 5+)
- **Typography notes** — pull quotes, typographic openers, lists, whitespace philosophy
- **The medium-is-the-message test** — How does the book's form demonstrate its content?

### Step 6: Outline Generation

Generate chapter structure based on archetype:

**For each chapter/unit:**

- Title (imperative or contrarian — never descriptive)
- Commander's Intent (one sentence: what must the reader take away?)
- Core story/example (what anchors this chapter?)
- Estimated word count (based on archetype)

**Structural patterns by archetype:**

- **Minimalist:** N imperative principles, each standalone. (Kleon: 10 chapters)
- **Manifesto:** Micro-essays grouped into thematic sections. (Fried: 88 essays in 16 sections)
- **Process:** Sequential phases mirroring real-world timeline. (Knapp: Mon-Fri)
- **Maximalist:** Principles organized in phases. (Pastier: 12 principles in 3 phases)

**Cross-archetype structural options** (Barry Fox):

- "We've Got Trouble!" — problem-heavy exploration
- Smashing the Paradigm — prove conventional thinking wrong
- Presenting the New Idea — your framework, principle by principle
- Telling a Story/Fable — narrative that embodies the concept
- Borrowing from Other Fields — cross-domain application
- Encyclopedic — comprehensive reference
- Topic 101 — introductory survey

### Blueprint Output

Save as `book-blueprint.md` in project root:

```markdown
# [Book Title — Working]

## North Star

[audience] + [knowledge] + [action]

## Archetype

[Selected archetype with parameters]

## Voice Profile

[Formality, rhythm, reference book, language]
[Anti-patterns list]

## Visual Identity

[Color, illustration style, density, typography]

## Knowledge Sources

[NotebookLM ID / folder path / "discovery" / combination]

## Outline

### [Phase/Section name] (if applicable)

#### Chapter 1: [Imperative/Contrarian Title]

- **Commander's Intent:** [one sentence]
- **Anchor story:** [brief description]
- **Target words:** [number]

#### Chapter 2: ...

[etc.]
```

---

## Mode 2: Chapter Writing

### Pre-Writing

1. **Load blueprint** — Read `book-blueprint.md`
2. **Select chapter** — Ask which chapter to write, or continue sequentially
3. **Gather knowledge:**
   - If NotebookLM: query notebook for relevant content on this chapter's topic
   - If local files: read relevant documents
   - If author's head: ask 3-5 targeted questions about this chapter's topic. Use Scribe "interview method" — extract knowledge through conversation, not instruction.
4. **Load adjacent context** — Read previous chapter's last section and next chapter's Commander's Intent (if they exist) for continuity

### Writing Process

**Step 1: Draft generation**

Write the chapter following the archetype template AND these universal principles:

**SUCCESs Integration (Made to Stick):**

- **Simple** — Every chapter serves ONE Commander's Intent. If it serves two, split it.
- **Unexpected** — Open with a schema violation. Not "In this chapter..." but a counterintuitive fact, paradox, or story that defies expectations.
- **Concrete** — Every abstract principle paired with a concrete example within 2 paragraphs. Use sensory language. Specific numbers, names, places.
- **Credible** — Use the Sinatra Test: one example so compelling it proves the whole principle. Add testable credentials ("try this yourself").
- **Emotional** — Open with one person, not a trend. Identity appeals over benefit appeals. Feeling before data.
- **Stories** — Anchor each chapter in one real story. Choose plot type by chapter goal: Challenge (teaching skills), Connection (teaching collaboration), Creativity (teaching innovation).

**Structural arc (Brooks adapted for non-fiction):**

- Setup (0-25%): Problem framing, reader's current reality
- Response (25-50%): Failed approaches, conventional wisdom, why it doesn't work
- Attack (50-75%): Your solution, framework, method — the core insight
- Resolution (75-100%): Proof, application, springboard to next chapter

**Writing craft principles:**

- **Zinsser:** Strip every sentence to cleanest components. Kill qualifiers. Active verbs. Stop when the point lands — never summarize at the end.
- **Pinker:** Classic Style — pointing out something interesting to an intelligent friend. Given-before-New in every sentence. Repeat key terms, don't synonym-hunt. Kill zombie nouns.
- **McPhee:** The lead is a flashlight into the chapter. Know the ending before you begin.
- **Handley:** Quality = Utility x Inspiration x Empathy. If any = 0, total = 0.

**Anti-AI-slop guardrails:**

- Vary sentence length deliberately. Use fragments. Some paragraphs = one sentence.
- No symmetrical chapter structure (not every chapter gets 3 examples, same subsections)
- Kill the first paragraph if it's throat-clearing. Start from paragraph 2.
- No listicle structure unless the archetype demands it (Manifesto micro-essays are lists; Minimalist chapters are not)
- Every claim needs the author's opinion, not "both sides" hedging
- Statistics as relationships, not raw numbers
- End with a springboard story, not a summary

**Step 2: Self-edit pass**

After generating the draft, run these checks:

1. **Commander's Intent test** — Does the chapter deliver its one takeaway?
2. **Anti-slop scan** — Check against anti-patterns list from blueprint
3. **Concrete test** — Is there a concrete example within 2 paragraphs of every abstract claim?
4. **Voice match** — Compare rhythm and tone to the voice sample in blueprint
5. **Forced asymmetry** — Is this chapter a different length/structure than the previous one?

**Step 3: Output**

Save as `chapters/XX-slug.md` with frontmatter:

```markdown
---
chapter: [number]
title: "[Chapter Title]"
words: [count]
status: draft
---

[Chapter content]
```

### Chapter Templates by Archetype

**Minimalist (Kleon-style):**

```
[Typographic opener — chapter title as manifesto statement]
[Personal story/anecdote — 1-3 paragraphs]
[Supporting quotes/examples from other practitioners]
[Practical mini-section — concrete "how-to"]
[Visual break description — what illustration goes here]
[Closing kicker — short, punchy, lands the point]
```

**Manifesto (Rework-style):**

```
[Provocative headline — contrarian claim]
[Illustration concept — one-line description]
[Opening assertion — thesis in first sentence, no warm-up]
[2-4 supporting paragraphs — reasoning + analogy + anecdote]
[Closing imperative — flips expectations or issues direct command]
```

Note: Multiple micro-essays per "chapter" session. Generate 5-10 essays per invocation, grouped by section.

**Process (Sprint-style):**

```
[Phase/step context — where we are in the process]
[Step-by-step instructions — numbered, specific, time-boxed where applicable]
[Facilitator tips / sidebars — practical advice boxes]
[Case study — embedded where relevant, not in separate section]
[End-of-step checklist — what should be done]
[Transition — preview of next step]
```

**Maximalist (Žlutá kniha-style):**

```
[Principle statement — clear, memorable declaration]
[Why this matters — grounded in reader's reality]
[Framework/model — visual diagram description + explanation]
[Case study 1 — detailed, with specific numbers and context]
[Case study 2 — contrasting example or different industry]
[Common mistakes — what goes wrong when this principle is ignored]
[Application guide — how to implement, step by step]
[Section summary — key takeaways for reference use]
```

---

## Integration with Existing Skills

| Skill                             | How it's used                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| **storytelling**                  | Anchor story selection (Challenge/Connection/Creativity plots), narrative arc within chapters |
| **writing-clearly-and-concisely** | Elements of Style edit pass on each chapter draft                                             |
| **brand-voice**                   | If author has a defined brand voice document, load it as voice reference                      |

---

## File Structure

```
project-root/
├── book-blueprint.md          # Setup output — the master plan
├── voice-sample.md            # Author's writing sample for voice calibration
└── chapters/
    ├── 00-introduction.md
    ├── 01-chapter-title.md
    ├── 02-chapter-title.md
    └── ...
```

---

## Knowledge Sources Summary

The skill encodes principles from:

### Book Writing Methodology

- **Barry Fox** — 7 structural archetypes for business books
- **Tucker Max / Scribe Media** — Interview-based expertise extraction, positioning-first
- **Michael Levin** — "Best Earning Author" framework, 3 strategic questions, bridge chapter structure
- **Tim Grahl / Story Grid** — 5 commandments of storytelling, connection system

### Writing Craft

- **William Zinsser** (On Writing Well) — Simplicity, kill clutter, active verbs, unity, rewriting
- **Steven Pinker** (The Sense of Style) — Classic Style, Curse of Knowledge, Given-New Contract, zombie nouns
- **John McPhee** (Draft No. 4) — 8 structural diagrams, lead as flashlight, 4-draft method, greening
- **Ann Handley** (Everybody Writes) — Writing GPS, Ugly First Draft, Quality = Utility x Inspiration x Empathy
- **Larry Brooks** (Story Engineering) — 6 core competencies, 4-part structure with 5 turning points

### Sticky Ideas

- **Chip & Dan Heath** (Made to Stick) — SUCCESs framework (Simple, Unexpected, Concrete, Credible, Emotional, Stories), Commander's Intent, Curse of Knowledge, Velcro Theory, Sinatra Test

### Format References

- **Austin Kleon** (Steal Like an Artist) — 10-principle structure, zine aesthetic, imperative titles
- **Jason Fried & DHH** (Rework) — 88 micro-essays, one illustration per essay, contrarian headlines
- **Michal Pastier** (Žlutá kniha) — 3 phases / 12 principles, 200+ visuals, book-as-brand
- **Jake Knapp** (Sprint) — 5-day sequential process, recipe-book format
- **Jake Knapp & JZ** (Make Time) — 4-step framework + 87 tactics menu
- **Derek Sivers** (Anything You Want) — 40 micro-lessons, extreme brevity, story-first
- **Steven Pressfield** (The War of Art) — 3-act structure, 80 micro-chapters, manifesto energy

### AI Writing Best Practices

- Voice preservation through samples + anti-patterns lists
- Chapter-by-chapter generation (never all at once)
- Section-level generation (1,000-2,000 words per section, assembled into chapters — a 6,000-word Maximalist chapter = 3-4 sections)
- Context sandwich: voice doc + book context + chapter context + section brief
- Forced asymmetry in structure and length
- 70/30 rule: expect author to rewrite 70% of AI output
- Quality gates between phases
- Research and writing as separate phases

---

## Trigger Phrases

"knowledge book", "write a book", "napsat knihu", "book about", "kniha o", "book chapter", "kapitola", "book blueprint", "osnova knihy"

## Do NOT Use For

- Fiction writing (novels, short stories)
- Academic papers or dissertations
- Blog posts or articles (use web-copy)
- Technical documentation
- Copywriting (use copywriting-orchestrator)
