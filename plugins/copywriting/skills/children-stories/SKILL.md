---
name: children-stories
description: Use when writing children's literature — picture books, verse books, early readers, bedtime stories for ages 3-8. Three modes — blueprint (creates story blueprint with age calibration, characters, voice, narrative pattern), write (writes one story per invocation), test (read-aloud checklist + iterative rewrite from children's feedback). Trigger phrases — "children's story", "dětský příběh", "picture book", "obrazková kniha", "pohádka", "bedtime story", "příběh na dobrou noc", "write for kids", "psát pro děti". Do NOT use for non-fiction (use knowledge-book), marketing copy (use copywriting-orchestrator), or adult fiction.
metadata:
  author: Petr
  version: 1.0.0
---

# Children Stories

Write children's literature — picture books, verse books, early readers, bedtime stories for ages 3-8 in Czech and English.

**Announce:** "Using children-stories skill in [blueprint/write/test] mode."

## Three Modes

| Mode          | When                         | Output               |
| ------------- | ---------------------------- | -------------------- |
| **blueprint** | Starting a new story project | `story-blueprint.md` |
| **write**     | Writing a specific story     | `stories/XX-slug.md` |
| **test**      | Testing story with children  | Revised text         |

If `story-blueprint.md` exists in project root, default to write mode. Otherwise, start with blueprint.

---

## Mode 1: Blueprint

Walk the author through 6 steps. Ask one question at a time. Save output as `story-blueprint.md`.

### Step 1: Age Calibration

Author chooses target age group. Skill auto-sets parameters:

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

### Step 2: Format

| Format            | Pages | Words       | Description                             |
| ----------------- | ----- | ----------- | --------------------------------------- |
| **Picture book**  | 32    | 200-800     | 12-14 spreads, illustrations dominate   |
| **Verse book**    | 32    | 200-500     | Rhyming text, consistent meter          |
| **Early reader**  | 32-64 | 300-1,500   | Levels (Level 1-3), independent reading |
| **Bedtime story** | --    | 1,000-3,000 | Read aloud, text-only format            |

### Step 3: Standalone vs Series

**Standalone:** Simpler setup, no character bible.

**Series:** Full character bible per character:

- **Visual:** Proportions, colors, clothing, expression range, silhouette test
- **Personality:** 3-5 core traits, fears, motivations, catchphrase, verbal tics
- **Relationships:** To every other character (complementary opposites -- Frog/Toad, Elephant/Piggie)
- **Rules:** What they would never do; what they always do
- **Arc boundaries:** What can change vs what must stay constant
- **Per-book tracking:** Color-code entries by book

Plus world-bible:

- World rules, locations (start small, expand per book)
- Recurring elements: opening/closing rituals, running gags, visual identifiers
- Structural repetition with variation

**Animal vs human:** Animals provide emotional safety/distance, universal appeal, creative freedom. Use humans when story is about specific cultural/identity experiences.

### Step 4: Narrative Pattern

**Archetypes:**

| Archetype      | Core                                   | Classic Examples                               |
| -------------- | -------------------------------------- | ---------------------------------------------- |
| **Journey**    | Going out and coming back, changed     | Where the Wild Things Are, The Snowy Day       |
| **Challenge**  | Overcoming obstacles                   | Whistle for Willie, The Most Magnificent Thing |
| **Discovery**  | Finding something new about self/world | Last Stop on Market Street, Frederick          |
| **Friendship** | Building or repairing a relationship   | Frog and Toad, Enemy Pie                       |

**Structural patterns:**

| Pattern                           | How It Works                                | Best For                      |
| --------------------------------- | ------------------------------------------- | ----------------------------- |
| **Cumulative**                    | Each page adds element, repeats whole chain | Ages 3-5, rhythm/mastery      |
| **Circular**                      | Ends where it began, character changed      | Security and growth           |
| **Pattern with variation**        | Repeating structure, variation each time    | Ages 3-5, participation       |
| **Three attempts**                | Fail, fail, succeed (with twist)            | Persistence, ages 4-7         |
| **Parallel**                      | Two storylines mirror/contrast              | Ages 5-8, perspective         |
| **Problem-escalation-resolution** | Attempts make it worse, then resolution     | Workhorse structure, all ages |

**Pixar Story Spine** (alternative planning tool):
"Once upon a time... Every day... One day... Because of that... Because of that... Until finally..."

### Step 5: Voice Calibration

1. **Writing sample** -- 500+ words or 3 interview questions
2. **Analyze voice** -- Formality (1-5), rhythm, humor, pronouns
3. **Language** -- CZ / EN
4. **Verse vs prose vs lyrical prose:**
   - If verse: meter (trochaic CZ default, anapestic EN comic, iambic EN default), rhyme scheme (AABB for 3-5, ABAB for 5-8, ABCB for 6-8)
   - Verse-chorus structure (Donaldson model) preferred over string of couplets
   - Naked Story Test -- story must work in prose first
5. **Sound profile per scene type:**
   - Calm/bedtime: sonorants (m, n, l) + long vowels
   - Action/comedy: plosives (b, p, t, k) + short vowels
   - Mystery/magic: sibilants (s, š) + fricatives
   - Joy/energy: bilabials + reduplication
6. **Anti-patterns** (always banned):
   - Moralizing: "a tak se naucil ze..." / "and so he learned that..."
   - Diminutives: "malicky kralicek" / "the teensy little bunny"
   - Emotion-telling: "byl smutny" / "she felt sad"
   - Condescension: writing from outside-in (Nordstrom principle)
   - AI-isms: "In this story we will...", "Let's dive in"

### Step 6: Illustration Brief Template

- **Format:** Inline `[bracketed notes]` in italics
- **3-question test** before every note:
  1. Is this clear from the text? -> delete
  2. Will the story break without this visual? If no -> delete
  3. Am I saying WHAT not HOW? If how -> rewrite
- **Legitimate uses:** Visual irony, character identity not in text, wordless spreads, page-turn reveals
- **Never specify:** Exact composition, color palette, artistic medium, character appearance (unless plot-critical)

Save blueprint as `story-blueprint.md` in project root.

---

## Mode 2: Write

### Pre-Writing

1. **Load** `story-blueprint.md`
2. **Select story** — standalone (theme/assignment) or series episode (number + theme)
3. **Knowledge gathering:**
   - NotebookLM: query notebook for relevant techniques
   - Interview: 3-5 targeted questions ("What happens? Main conflict? How does it end?")
4. **Load adjacent context** (series) — previous episode + character bible

### Page-by-Page Storyboard

Before writing — lay out on 14 spreads (for 32-page picture book):

| Spreads | Function                                 |
| ------- | ---------------------------------------- |
| 1-2     | Character, world, conflict setup         |
| 3-8     | Rising action, attempts to solve problem |
| 9-11    | Climax sequence                          |
| 12-13   | Resolution                               |
| 14      | Final image / button ending              |

Author approves storyboard before writing begins.

### Writing Rules

#### Rhythm and Sound (per spread)

- Alternate short/long sentences (staccato for action, longer for calm)
- Onomatopoeia at physical moments (max 3-5 per book)
- Alliteration as "sprinkle" (2-3 words, never forced syntax)
- Sound symbolism: sonorants for calm, plosives for action, sibilants for mystery
- Page-turn hook on right-hand page of every spread
- Build-and-punch: long sentence → short punch
- Mouth feel: bilabials, reduplication, multisyllabic novelties

#### Text-Image Relationship

- Target complementary-to-counterpointing (never symmetrical/redundant)
- Remove text that illustrations handle (appearance, setting, body language)
- Text carries: dialogue, time passage, abstract concepts, names, sound/smell
- Illustration briefs: inline `[bracketed]`, only where 3-question test passes
- Identify 2-3 visual subplot opportunities per story

#### Show Don't Tell for Children

- Action replaces narration: not "Max was angry" → he chases the dog with a fork
- Dialogue reveals emotion: not "she was worried" → "What if he doesn't come back?"
- Sensory details replace abstractions: not "beautiful day" → "puddles shone like mirrors"
- The body tells the story: stomping (anger), hiding (fear), jumping (joy)
- Never explain the moral

#### Verse Mode

If verse selected in blueprint:

- Strict consistent meter throughout
- Rhyme scheme consistent across entire book
- Verse-chorus structure (Donaldson model): encounters as verses, refrain as chorus
- Each refrain repetition must escalate
- Naked Story Test: strip rhyme/meter, story must stand as prose
- **6 Rhyme Crimes check:**
  1. Misplaced stress — natural pronunciation distorted
  2. Forced/predictable rhymes — tired pairings
  3. Inverted syntax — twisted word order
  4. Rhyme dictates story — story suffocated by constraints
  5. Inconsistent meter — uneven rhythm
  6. Filler words — padding to hit syllable count

#### Storytelling Integration

Invoke `storytelling` skill for narrative arc (SB7 for journey, ABT for shorter forms).

### Self-Edit Pass

10-point checklist:

1. **Age test** — word count, sentence length, characters in norms?
2. **Read-aloud test** — read aloud, note stumbles
3. **Show-don't-tell scan** — no "byl smutny/felt sad", "naucil se/learned that"
4. **Text-image redundancy** — cut what illustrations say alone
5. **Concrete test** — abstract claim → concrete example within 2 sentences
6. **Anti-moralizing** — no "a tak se naucil ze sdileni je dulezite"
7. **Forced asymmetry** (series) — different structure than previous episode
8. **Verse check** (if verse) — 6 Rhyme Crimes, Naked Story Test
9. **Page-turn check** — every right-hand page has reason to turn
10. **Participation check** — at least 1-2 places child can join in

### Output

YAML frontmatter template:

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
[Illustration note if needed]

...
```

Save as `stories/XX-slug.md`.

---

## Mode 3: Test

Two regimes — checklist (before first reading) and iteration (after reading).

### Regime A: Read-Aloud Checklist

Skill reads finished text and generates observation points specific to this story.

**Per-spread checkpoints** (examples):

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

Output: `stories/XX-slug-test-checklist.md` — printable on one A4.

### Regime B: Iterative Rewrite Loop

After reading to children, author provides free-form feedback.

Skill analyzes and proposes:

1. **Diagnosis** — why specific part doesn't work (too abstract, missing sound element, pacing)
2. **Specific rewrite** — 1-2 variants of problematic section
3. **Preserve what works** — explicitly mark "keep, children repeat it"

Iteration cycle: read → feedback → rewrite → next reading.

Status progression: `draft` → `tested-v2` → `tested-v3`...

---

## Editorial Standards

### Czech Market

| Parameter    | Value                                    |
| ------------ | ---------------------------------------- |
| Formats      | A4, square (21×21, 24×24), board books   |
| Picture book | 32 pages, 200-800 words                  |
| Publishers   | Albatros, Baobab, Meander, Host, Paseka  |
| Age labeling | "od 3 let", "3-6 let" on cover           |
| Submission   | Complete manuscript, direct to publisher |
| Awards       | Zlatá stuha (Czech IBBY)                 |

### English Market

| Parameter    | Value                                       |
| ------------ | ------------------------------------------- |
| Picture book | 32 pages, under 500 words ideal             |
| Early reader | 32-64 pages, levels                         |
| Manuscript   | 12pt Times/Arial, double-spaced, 1" margins |
| Submission   | Query letter + complete manuscript          |
| Organization | SCBWI ($80/year)                            |
| Awards       | Caldecott (illustration), Newbery (text)    |

### Export

Write mode generates stories in internal format. Export to:

- **CZ submission** — clean text, illustration notes as separate attachment
- **EN submission** — 12pt double-spaced, page breaks marked, illustration notes inline

---

## Integration

| Skill                             | Usage                                |
| --------------------------------- | ------------------------------------ |
| **storytelling**                  | Narrative arc (SB7, ABT)             |
| **writing-clearly-and-concisely** | Edit pass on drafts                  |
| **brand-voice**                   | Load existing voice doc if available |

## File Structure

```
project/
  story-blueprint.md
  voice-sample.md
  character-bible.md    # series only
  world-bible.md        # series only
  stories/
    01-slug.md
    01-slug-test-checklist.md
    02-slug.md
    ...
  export/
    01-slug-cz.md
    01-slug-en.md
```

## Sources Encoded

**Craft:** Mem Fox (Reading Magic), Ann Whitford Paul (Writing Picture Books), Uri Shulevitz (Writing with Pictures), Molly Bang (Picture This), Jane Yolen (Take Joy)

**Editorial:** Ursula Nordstrom (inside-out not outside-in)

**Verse:** Renée LaTulippe (6 Rhyme Crimes), Philip Nel (Seuss analysis), Julia Donaldson (verse-chorus structure)

**Rhythm:** Margaret Wise Brown (sensory language), Bryant et al. 1989 (nursery rhymes → reading), Horst 2011 (contextual repetition), Goswami 2019 (neural entrainment)

**Visual:** Nikolajeva & Scott (word-image spectrum), Molly Bang (10 visual emotion principles)

**Czech:** Hrubín, Žáček, Svěrák, Čapek, Sekora, Říha. Večerníček. Říkadla. Zvukomalba. Czech trochaic prosody.

**Narrative:** Pixar (22 Rules, Story Spine), Applebee 1978 (narrative stages), Piaget/Erikson (emotional development)

**Publishing:** SCBWI, CzechLit, Zlatá stuha, Caldecott criteria

**NotebookLM reference notebook:** `3a99bf34-ed1d-4abf-a932-32789965ac7b` (5 books + 4 articles + 3 research summaries)
