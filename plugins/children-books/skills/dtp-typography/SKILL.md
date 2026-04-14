---
name: dtp-typography
description: Specialized DTP and Typography skill for beginning readers and individuals with dyslexia. Based on the "Supermáňa" methodology and Christian Boer's Dyslexie font principles. Focuses on syllable-based decoding, extreme spacing, and weighted-base fonts to prevent letter mirroring and visual crowding. Use when designing children's books, educational materials, or accessible interfaces for early learners. Trigger phrases - "dtp for kids", "typography for dyslexia", "beginning reader layout", "syllable spacing", "Supermáňa style".
metadata:
  author: Petr
  version: 1.0.0
---

# DTP & Typography for Beginning Readers & Dyslexics

## Overview

Specialized typographic system optimized for maximal readability, decoding speed, and visual stability. Inspired by the **"Supermáňa"** book series (Ester Stará) and **Christian Boer's** Dyslexie font research.

**Core Principle:** Typography is not just aesthetic; it's a cognitive anchor for decoding.

**Announce at start:** "I'm using the DTP & Typography skill to optimize this layout for [beginning readers/dyslexics] using the Supermáňa/Dyslexie methodology."

## The "Supermáňa" Iron Law

```
NO CROWDING: Space is as important as the letters.
NO MIRRORING: Every character must have a unique gravitational base.
NO OVERLOAD: Short blocks, high contrast (softened), syllable anchors.
```

## When to Use

Use this skill when designing:

- **Children's Books** - Especially for first-time readers (ages 4-7).
- **Educational Materials** - Worksheets, digital learning platforms.
- **Accessibility Layers** - "Reading mode" for apps/websites targeting dyslexics.
- **Physical Signage** - Where quick, unambiguous reading is critical.

**Don't skip when:**

- Target audience includes children.
- Text contains long, complex words.
- Lighting conditions for reading might be poor (e.g., bedtime stories).

---

## The Four Phases of Implementation

### Phase 1: Research & Level Calibration

Determine the reader's level:

- **Level 1 (Beginning):** Focus on open syllables (xo), extreme word spacing.
- **Level 2 (Developing):** Mixed syllables (xox), standard sentence structures.
- **Level 3 (Fluent/Dyslexic):** Focus on font geometry and line spacing to prevent crowding.

### Phase 2: Syllable Analysis (The "Decoding" Phase)

Break the text into "reading units" based on the **Supermáňa** rules:

1. **xo (Open):** Consonant + Vowel (e.g., "to", "má", "pí").
2. **xox (Closed):** Consonant + Vowel + Consonant (e.g., "jak", "pes").
3. **ox:** Vowel + Consonant (e.g., "až").
4. **xoxo / xoxoxo:** Alternating patterns (e.g., "Má-ňa", "po-ví-dá").
5. **Complex Clusters:** Identify consonant clusters (e.g., "bav-ln-ka") and decide whether to break them or keep them as one block.

### Phase 3: Technical Implementation (CSS/DTP)

Apply the "Heavy Base" and "Generous Space" rules:

**Font Selection:**

- **Primary:** Dyslexie, OpenDyslexic.
- **Fallback:** Andika, Montserrat (Semi-Bold), or any Humanist Sans with distinct shapes for b/d/p/q.

**Spacing Settings:**

- **Letter-spacing (Tracking):** +0.10em to +0.15em.
- **Word-spacing:** 0.35em to 0.50em (extreme gaps).
- **Line-height (Leading):** 1.8 to 2.2.
- **Alignment:** `text-align: left;` (Ragged right). NEVER justify.

### Phase 4: Visual Anchoring (Coloring)

Apply alternating shades/colors to the syllable units identified in Phase 2.

**Color Rules for Picture Books:**

**Primary text (narration):**

- PURE NEAR-BLACK (#111111 — NOT #333 which looks faded).
- NEVER brown, NEVER grey-washed — this looks muddy on warm paper.

**Syllable anchoring (optional, for early readers only):**

- Use TWO SOLID CONTRASTING colors.
- Option A (Dyslexia focus): #111111 + solid terracotta (#A33B28) or solid rust-red (#C8553D).
- Option B (Parent-read book, age 3-5): #111111 + medium grey (#6a6a6a) — subtle, not overtly "instructional".
- Option C (No alternation): just #111111 uniform — recommended for general picture books where parents read aloud.

**NEVER use:**

- Brown tints (#6b4a3a, #8B7355) — look faded / print-weak.
- Light grey (< #888888) — too weak for contrast.
- Gradient colors — destroys letter clarity.

**Background paper:**

- Warm cream (#FDFBF5 to #FFFDE7) for watercolor books.
- Pure white (#FFFFFF) for high-contrast / modern books.

### Phase 5: Illustration Integration (The "Breathing" Phase)

Typography for picture books must integrate visually with illustrations:

**White Pocket Rule:**

- Text MUST sit in naturally empty areas of the illustration (generous white paper space).
- Do NOT overlay text on busy illustration areas.
- Minimum clearance: 15-20mm between text and any illustration element.

**Edge Fade Principle:**

- Illustrations for children's books should NEVER be fully boxed rectangles.
- Watercolor washes must trail off into pure paper at edges.
- Sharp rectangular borders feel institutional and break the page flow.

**Shout Layer vs. Narration Layer:**

- **Shouts / dialogue / onomatopoeia** → embedded IN illustration (hand-drawn, matches art style)
- **Narration** → typeset AROUND illustration (clean typography, matches reading DTP rules)
- Never mix: don't typeset a shout, don't hand-draw narration.

**Positioning rules:**

- Text 20-30mm from page edges (breathing space).
- Text block max 60-70% of page width.
- For double-page spread: divide narration into 2 blocks, one per page, around the illustration.

---

## Reference Patterns (Czech Examples)

| Word       | Syllables | Level | Methodology                        |
| :--------- | :-------- | :---- | :--------------------------------- |
| **Máňa**   | Má-ňa     | 1     | (xoxo) - Red/Grey alternation      |
| **Povídá** | po-ví-dá  | 1     | (xoxoxo) - Grey/Red/Grey           |
| **Ježek**  | je-žek    | 2     | (xoxox) - Red/Grey                 |
| **Bavlna** | bav-lna   | 3     | (xox-xxo) - Most difficult cluster |

---

## Sound Effects & Emotional Layer

For non-narrative text (onomatopoeia):

- Use **All-Caps** but with hand-drawn, irregular styles (e.g., "BUCH!", "KŘUP!").
- Place them non-linearly to break the "grid" and provide a visual break.

## Implementation Checklist

- [ ] **Font:** Weighted base used? b/d/p/q distinct?
- [ ] **Syllables:** Text broken into logical reading units?
- [ ] **Alternation:** Syllable colors/shades alternating correctly?
- [ ] **Spacing:** Is word-spacing at least 200% of standard?
- [ ] **Alignment:** Is the right edge ragged (not justified)?
- [ ] **Contrast:** Is the background off-white/cream?
- [ ] **Chunks:** Are text blocks limited to max 5 lines?

## Picture Book Specific Checklist

- [ ] Text sits in natural white pocket of illustration?
- [ ] No text overlaps busy illustration areas?
- [ ] Illustration edges fade to paper (not boxed)?
- [ ] Shouts/dialogue hand-drawn IN illustration?
- [ ] Narration typeset separately AROUND illustration?
- [ ] Text colors solid (no fade, no brown tint)?
- [ ] Min 20mm from page edge?
- [ ] Double-page spread uses both pages for narration?

---

_Based on Christian Boer's research and Ester Stará's "Supermáňa" series._
