# Children Stories Skill — Design Spec

**Date:** 2026-03-31
**Author:** Petr + Symbiotic Agent
**Plugin:** copywriting
**Skill name:** children-stories
**Status:** Approved design

---

## Overview

Skill for writing children's literature (ages 3-8) in Czech and English. Covers picture books, verse books, early readers, and bedtime stories. Supports standalone stories and series with recurring characters. Generates illustration briefs for external illustrator/AI skill.

Personal use (Beatka 4, Gretka younger) with publication-ready quality for Czech and English markets.

## Architecture

Three modes:

| Mode          | Purpose                                                 | Input                                  | Output               |
| ------------- | ------------------------------------------------------- | -------------------------------------- | -------------------- |
| **blueprint** | World, characters, series, voice, age calibration       | Questions to author                    | `story-blueprint.md` |
| **write**     | One story per invocation (standalone or series episode) | Blueprint + theme/episode              | `stories/XX-slug.md` |
| **test**      | Read-aloud checklist + iterative rewrite loop           | Finished text + feedback from children | Revised text         |

If `story-blueprint.md` exists in project root, default to write mode. Otherwise, start with blueprint.

### Integration

| Skill                             | When                          | How                                                  |
| --------------------------------- | ----------------------------- | ---------------------------------------------------- |
| **storytelling**                  | Write mode — narrative arc    | SB7 for journey stories, ABT for shorter forms       |
| **writing-clearly-and-concisely** | Self-edit pass                | Strip qualifiers, active verbs, kill throat-clearing |
| **brand-voice**                   | Blueprint — voice calibration | Load existing voice doc if available                 |
| **NotebookLM**                    | Blueprint + Write             | Query notebook for reference materials               |

---

## Mode 1: Blueprint

Walk the author through 6 steps. Ask one question at a time. Save output as `story-blueprint.md`.

### Step 1: Age Calibration

Author chooses target age group. Skill sets all parameters automatically:

| Parameter            | 3-5 years                                      | 6-8 years                                          |
| -------------------- | ---------------------------------------------- | -------------------------------------------------- |
| Receptive vocabulary | 2,000-10,000                                   | 10,000-20,000                                      |
| Words per sentence   | 3-10                                           | 8-18                                               |
| Total word count     | 200-800                                        | 800-10,000                                         |
| Characters           | 1-2                                            | 3-5                                                |
| Scenes               | 3-5                                            | 7-12                                               |
| Structure            | Linear, rule of three                          | Linear + minor subplot                             |
| False-belief plots   | No                                             | Yes (from 7+)                                      |
| Themes               | Security, fear, big emotions, magical thinking | Fairness, friendship, competence, moral complexity |
| Format options       | Picture book (32pp)                            | Picture book / early reader / chapter book         |

**Source data:**

- Vocabulary: Lanza & Flahive 2008, Anglin 1993, Biemiller & Slonim 2001
- Sentence length: ReadabilityFormulas.com, Karen Cioffi
- Plot complexity: Applebee 1978 (narrative stages), ASU 2021 (false-belief at 6-7)
- Attention span: 2-3 min × age in years (Brain Balance Centers)
- Emotional development: Piaget preoperational/concrete operational, Erikson initiative/industry

### Step 2: Format

| Format            | Pages | Words       | Description                             |
| ----------------- | ----- | ----------- | --------------------------------------- |
| **Picture book**  | 32    | 200-800     | 12-14 spreads, illustrations dominate   |
| **Verse book**    | 32    | 200-500     | Rhyming text, consistent meter          |
| **Early reader**  | 32-64 | 300-1,500   | Levels (Level 1-3), independent reading |
| **Bedtime story** | —     | 1,000-3,000 | Read aloud, text-only format            |

### Step 3: Standalone vs Series

**Standalone:** Simpler setup, no character bible needed.

**Series:** Full character bible per character:

- **Visual:** Proportions, colors, clothing, expression range, silhouette test
- **Personality:** 3-5 core traits, fears, motivations, catchphrase, verbal tics
- **Relationships:** To every other character (complementary opposites work best — Frog/Toad, Elephant/Piggie)
- **Rules:** What they would never do; what they always do
- **Arc boundaries:** What can change vs what must stay constant
- **Per-book tracking:** Color-code entries by book

Plus world-bible:

- World rules (what is possible, what is not)
- Locations (start small, expand per book)
- Recurring elements: opening/closing rituals, running gags, visual identifiers
- Structural repetition with variation — the motif returns with a twist each book

**Animal vs human characters:** Animals provide emotional safety/distance, enhanced cognition (children perform at higher comprehension levels with animal narratives), universal appeal, creative freedom. Use humans when story is about specific cultural/identity experiences.

### Step 4: Narrative Pattern

**Archetypes** (author picks one or skill suggests based on theme):

| Archetype      | Core                                   | Classic Examples                               |
| -------------- | -------------------------------------- | ---------------------------------------------- |
| **Journey**    | Going out and coming back, changed     | Where the Wild Things Are, The Snowy Day       |
| **Challenge**  | Overcoming obstacles                   | Whistle for Willie, The Most Magnificent Thing |
| **Discovery**  | Finding something new about self/world | Last Stop on Market Street, Frederick          |
| **Friendship** | Building or repairing a relationship   | Frog and Toad, Enemy Pie                       |

**Structural patterns** (how the story is built):

| Pattern                           | How It Works                                | Best For                      |
| --------------------------------- | ------------------------------------------- | ----------------------------- |
| **Cumulative**                    | Each page adds element, repeats whole chain | Ages 3-5, rhythm/mastery      |
| **Circular**                      | Ends where it began, character changed      | Security and growth           |
| **Pattern with variation**        | Repeating structure, variation each time    | Ages 3-5, participation       |
| **Three attempts**                | Fail, fail, succeed (with twist)            | Persistence, ages 4-7         |
| **Parallel**                      | Two storylines mirror/contrast              | Ages 5-8, perspective         |
| **Problem-escalation-resolution** | Attempts make it worse, then resolution     | Workhorse structure, all ages |

### Step 5: Voice Calibration

1. **Writing sample** — 500+ words of author's natural writing. If none, 3 interview questions.
2. **Analyze voice** — Formality (1-5), sentence rhythm, humor, pronoun preference.
3. **Language** — CZ / EN
4. **Verse vs prose vs lyrical prose:**
   - If verse: meter (trochaic default for CZ, anapestic for EN comic, iambic for EN default), rhyme scheme (AABB for 3-5, ABAB for 5-8, ABCB for 6-8)
   - Verse-chorus structure (Donaldson model) preferred over string of couplets
   - Naked Story Test required — story must work in prose first
5. **Sound profile:** Dominant phonemes per scene type:
   - Calm/bedtime: sonorants (m, n, l), long vowels
   - Action/comedy: plosives (b, p, t, k), short vowels
   - Mystery/magic: sibilants (s, š), fricatives
   - Joy/energy: bilabials + reduplication (pitter-patter, bim-bam)
6. **Anti-patterns (always banned):**
   - Moralizing: "a tak se naučil že..." / "and so he learned that..."
   - Diminutives: "maličký králíček" / "the teensy little bunny"
   - Emotion-telling: "byl smutný" / "she felt sad"
   - Condescension: writing from outside-in (Nordstrom principle)
   - AI-isms: "In this story we will...", "Let's dive in", "It's worth noting"

### Step 6: Illustration Brief Template

Define how illustration notes will be written:

- **Format:** Inline `[bracketed notes]` in italics
- **3-question test** before every note:
  1. Is this clear from the text? If yes → delete.
  2. Will the story break without this visual? If no → delete.
  3. Am I saying WHAT not HOW? If how → rewrite.
- **Legitimate uses:** Visual irony (text says one thing, picture must show opposite), character identity not in text, wordless spreads, page-turn reveals, story-critical action not in text
- **Never specify:** Exact composition, color palette, artistic medium, character appearance (unless plot-critical), facial expressions, background details

Save blueprint as `story-blueprint.md` in project root.

---

## Mode 2: Write

### Pre-Writing

1. **Load** `story-blueprint.md`
2. **Select story** — standalone (theme/assignment) or series episode (number + theme)
3. **Knowledge gathering:**
   - NotebookLM: query notebook for relevant techniques
   - Interview: 3-5 targeted questions ("What happens in this story? What's the main conflict? How does it end?")
4. **Load adjacent context** (series) — previous episode's ending + character bible

### Page-by-Page Storyboard

Before writing text — lay out on 14 spreads (for 32-page picture book):

| Spreads | Function                                 |
| ------- | ---------------------------------------- |
| 1-2     | Character, world, conflict setup         |
| 3-8     | Rising action, attempts to solve problem |
| 9-11    | Climax sequence                          |
| 12-13   | Resolution                               |
| 14      | Final image / button ending              |

Author approves storyboard before writing begins.

For other formats (early reader, bedtime story), adapt structure to format length while preserving arc proportions.

### Writing

**Structural pattern** from blueprint drives the writing — cumulative, circular, three attempts, etc.

**Age calibration** automatically applied — word count, sentence length, character count, complexity.

**Rhythm and sound checklist (per spread):**

- Alternate short/long sentences (staccato for action, longer for calm)
- Onomatopoeia at physical moments (max 3-5 per book, not overused)
- Alliteration as "sprinkle" (2-3 words, never forced syntax)
- Sound symbolism per scene mood:
  - Calm: sonorants (m, n, l) + long vowels
  - Action: plosives (b, p, t, k) + short vowels
  - Mystery: sibilants (s, š) + fricatives
- Page-turn hook on right-hand page of every spread (question, unfinished action, suspense)
- Build-and-punch: long sentence followed by short one that "lands like a punch"
- Mouth feel: include words children love to say (bilabials, reduplication, multisyllabic novelties)

**Verse mode** (if verse selected in blueprint):

- Strict consistent meter throughout — trochaic (CZ default), anapestic (EN comic), iambic (EN default)
- Rhyme scheme consistent across entire book — no switching mid-story
- Verse-chorus structure (Donaldson model): encounters as verses, recurring refrain as chorus
- Each refrain repetition must escalate — "what's new or different this time?"
- Naked Story Test: strip rhyme and meter, story must stand as prose
- 6 Rhyme Crimes check:
  1. Misplaced stress — natural pronunciation distorted to fit meter
  2. Forced/predictable rhymes — tired pairings that add nothing
  3. Inverted syntax — twisted word order to force rhyme
  4. Rhyme dictates story — story suffocated by verse constraints
  5. Inconsistent meter — uneven rhythm, reader stumbles
  6. Filler words — padding to hit syllable count

**Text-image relationship:**

- Complementary to counterpointing (Nikolajeva & Scott spectrum) — never symmetrical/redundant
- Remove text that illustrations handle: character appearance, setting description, body language, facial expressions
- Text carries: dialogue, time passage, abstract concepts, names, sound/smell
- Illustration briefs: inline `[bracketed notes]`, only where 3-question test passes
- Identify 2-3 visual subplot opportunities — stories in illustrations not mentioned in text

**Show don't tell for children:**

- Action replaces internal narration: not "Max was angry" → he chases the dog with a fork
- Dialogue reveals emotion: not "she was worried" → "What if he doesn't come back?"
- Specific sensory details replace abstractions: not "beautiful day" → "the grass was wet and puddles shone like mirrors"
- The body tells the story: stomping (anger), hiding (fear), jumping (joy), head down (sadness)
- Never explain the moral — let the reader discover it through experience

**Storytelling integration:** Invoke `storytelling` skill for narrative arc construction. SB7 for journey stories, ABT for shorter forms, Four Story Types for character dynamics.

### Self-Edit Pass

After drafting, check:

1. **Age test** — word count, sentence length, character count within norms?
2. **Read-aloud test** — read aloud, note where you stumble or lose rhythm
3. **Show-don't-tell scan** — no "byl smutný/felt sad", "naučil se že/learned that", "a tak pochopil/and so understood"
4. **Text-image redundancy** — cut anything illustrations say on their own
5. **Concrete test** — abstract claim → concrete example within 2 sentences
6. **Anti-moralizing** — no "a tak se naučil že sdílení je důležité"
7. **Forced asymmetry** (series) — different length/structure than previous episode
8. **Verse check** (if verse) — 6 Rhyme Crimes, Naked Story Test, metric consistency
9. **Page-turn check** — every right-hand page has a reason to turn
10. **Participation opportunity check** — at least 1-2 places where child can join in (refrain, prediction, sound effect)

### Output

Save as `stories/XX-slug.md`:

```markdown
---
story: 1
title: "Story Title"
series: "Series Name" # or null
episode: 1 # or null
age: "3-5"
format: "picture-book"
verse: false # or meter + scheme
words: 487
language: "cs"
status: draft
---

[Spread 1]
Text...

[Spread 2]
Text...
[While Mom says everything is fine, the kitchen tells a very different story.]

...

[Spread 14]
Text...
```

---

## Mode 3: Test

Two regimes — checklist (before first reading) and iteration (after reading).

### Regime A: Read-Aloud Checklist

Skill reads finished text and generates **observation points specific to this story**.

**Per-spread checkpoints:**

- "Spread 3: tension moment — watch if she holds her breath or laughs"
- "Spread 7: onomatopoeia 'bác!' — say it loud, watch if she repeats it"
- "Spread 10: climax — watch if she leans closer"
- "Spread 12: refrain third time — watch if she finishes the sentence herself"

**Overall metrics:**

- Did she want it again? (ultimate test)
- Where did attention drop? (= text too long or abstract)
- Where did she interrupt? (= predictable OR so good she wants to continue)
- Where did she laugh? (= working)
- Did engagement hold to the end?
- Did she ask "what happens next?" (= series potential)

**Output:** `stories/XX-slug-test-checklist.md` — printable on one A4 page.

### Regime B: Iterative Rewrite Loop

After reading to children, author provides feedback. Skill suggests specific changes.

**Input from author** (free form):

> "Na straně 3 ztratila zájem, prostředek se jí líbil ale konec byl moc rychlý. Refrén na straně 8 opakovala sama."

**Skill analyzes and proposes:**

1. **Diagnosis** — why specific part doesn't work (too abstract, missing sound element, sentence too long for age, pacing issue)
2. **Specific rewrite** — offers 1-2 variants of problematic section
3. **Preserve what works** — explicitly marks "refrain on spread 8 — keep, children repeat it"

**Iteration cycle:** read → feedback → rewrite → next reading. Skill tracks what worked and what didn't across iterations.

**Output:** Updated `stories/XX-slug.md` with status progression: `draft` → `tested-v2` → `tested-v3`...

---

## Editorial Standards

Integrated into blueprint and write mode — skill automatically complies, no extra steps for author.

### Czech Market

| Parameter          | Value                                               |
| ------------------ | --------------------------------------------------- |
| Formats            | A4, square (21×21, 24×24), board books (leporelo)   |
| Picture book       | 32 pages, 200-800 words                             |
| Publishers         | Albatros, Baobab, Meander, Host, Paseka             |
| Age labeling       | "od 3 let", "3-6 let" on cover                      |
| Submission         | Complete manuscript, direct to publisher (no agent) |
| Illustration notes | Separate from text, minimal                         |
| Awards             | Zlatá stuha (Czech IBBY section)                    |

### English Market

| Parameter          | Value                                                      |
| ------------------ | ---------------------------------------------------------- |
| Picture book       | 32 pages, under 500 words (ideal), max 800                 |
| Early reader       | 32-64 pages, levels (I Can Read, Step into Reading)        |
| Manuscript         | 12pt Times New Roman/Arial, double-spaced, 1" margins      |
| Submission         | Query letter + complete manuscript (for picture books)     |
| Organization       | SCBWI ($80/year)                                           |
| Page breaks        | Mark in manuscript with `[Page break]`                     |
| Illustration notes | Minimal, inline in brackets, don't count toward word count |
| Awards             | Caldecott (illustration), Newbery (text)                   |

### Export Command

Write mode generates stories in internal format (spreads + illustration notes). Skill offers export to:

- **CZ submission format** — clean text without spread markers, illustration notes as separate attachment
- **EN submission format** — 12pt double-spaced, page breaks marked, illustration notes inline

---

## File Structure

```
project/
  story-blueprint.md           # blueprint mode output
  voice-sample.md              # author's writing sample (optional)
  character-bible.md           # series only
  world-bible.md               # series only
  stories/
    01-slug.md                 # write mode output
    01-slug-test-checklist.md  # test mode checklist
    02-slug.md
    ...
  export/
    01-slug-cz.md              # CZ submission format
    01-slug-en.md              # EN submission format
```

---

## Sources Encoded

**Craft:** Mem Fox (Reading Magic — 10 Commandments, 1000 stories rule, read-aloud philosophy), Ann Whitford Paul (Writing Picture Books — three-act structure, page turns, 17 word-reduction techniques), Uri Shulevitz (Writing with Pictures — picture book taxonomy, actor-stage relationship, storyboard method), Molly Bang (Picture This — 10 visual emotion principles), Jane Yolen (Take Joy — BIC-HOP-PNF, Wisdom Framework, 10 words every PB author must know)

**Editorial philosophy:** Ursula Nordstrom (inside-out not outside-in, "good books for bad children", N.G.E.F.Y.)

**Verse:** Renée LaTulippe (6 Rhyme Crimes, Lyrical Language Lab, Naked Story Test, sound-controls-emotion technique), Philip Nel (Seuss anapestic tetrameter analysis, "Better No Seuss Than Faux Seuss"), Julia Donaldson (verse-chorus structure, musical over strict meter, scan-aloud test)

**Rhythm & Sound:** Margaret Wise Brown (sensory language, rhythm before meaning, Gertrude Stein influence), Montag 2019 (picture books contain 16.6× more passive sentences than speech), Bryant et al. 1989 (nursery rhymes predict reading success), Horst 2011 (same story 3× = 150% better word retention), Goswami 2019 (neural entrainment — brain oscillations align with rhythmic speech), Ramachandran & Hubbard 2001 (bouba/kiki effect), Kawahara 2018 (sound symbolism in character naming)

**Visual:** Nikolajeva & Scott (5-point word-image spectrum: symmetrical → contradictory), Salisbury & Styles (Children's Picturebooks — global survey, readerly gap)

**Czech tradition:** Hrubín (Špalíček — trochaic verse, folk poetry elevated to art, memorability through perfect rhythm), Žáček (wordplay, absurdist humor, linguistic games), Svěrák/Uhlíř (song-verse, Hodina zpěvu, warmth without sentimentality), Čapek (Devatero pohádek — intellectual fairy tales, linguistic playfulness), Sekora (Ferda Mravenec — insect world, Czech comics pioneer), Říha (Honzíkova cesta — encyclopedic realism through child's eyes). Večerníček (10-min format since 1965, compression and visual economy). Říkadla tradition (Erben collection, rozpočítadla, nonsense openings, escalation to absurdity). Czech zvukomalba (sound-painting — encodes sound source, volume, path, tactile properties). Czech trochaic prosody (fixed initial stress → natural trochaic meter → inherent advantage for children's verse).

**Czech illustration tradition:** Josef Lada (folk-inflected warmth), Jiří Trnka (illustration + puppet animation), Květa Pacovská (HCA Medal 1992, fine art in children's books), Petr Sís (HCA Medal 2012, MacArthur Fellow), Zdeněk Miler (Krteček)

**Publishing:** SCBWI, CzechLit 2015-2025 report, Zlatá stuha criteria, Caldecott criteria. Czech publishers: Albatros, Baobab, Meander, Host, Paseka. Market: 500 words sweet spot (Mary Kole, Good Story Company), 32 pages standard (printing signatures of 8).

**Development:** Applebee 1978 (6 narrative development stages: heap → true narrative), Piaget (preoperational 3-5 → concrete operational 6-8), Erikson (initiative vs guilt 3-5 → industry vs inferiority 6-8), ASU 2021 (false-belief understanding at 6-7, not 4 as previously claimed)

**Series:** Writer's Digest (5 lessons on developing PB series), Lobel (Frog and Toad — complementary opposites), Willems (Elephant & Piggie — 25 standalone-in-series books), Miler (Krteček — 49 episodes, consistent world rules), Němečk (Čtyřlístek — 600+ issues, fixed personality archetypes)

**Narrative structure:** Pixar (22 Rules of Storytelling, Story Spine: "Once upon a time... Every day... One day... Because of that... Until finally...")

**NotebookLM reference notebook:** `3a99bf34-ed1d-4abf-a932-32789965ac7b` ("Writing children books" — 5 books + 4 articles + 3 research summaries)
