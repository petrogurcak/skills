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

| Mode | When | Output |
|------|------|--------|
| **blueprint** | Starting a new story project | `story-blueprint.md` |
| **write** | Writing a specific story | `stories/XX-slug.md` |
| **test** | Testing story with children | Revised text |

If `story-blueprint.md` exists in project root, default to write mode. Otherwise, start with blueprint.

---

## Mode 1: Blueprint

Walk the author through 6 steps. Ask one question at a time. Save output as `story-blueprint.md`.

### Step 1: Age Calibration

Author chooses target age group. Skill auto-sets parameters:

| Parameter | 3-5 years | 6-8 years |
|-----------|-----------|-----------|
| Receptive vocabulary | 2,000-10,000 | 10,000-20,000 |
| Words per sentence | 3-10 | 8-18 |
| Total word count | 200-800 | 800-10,000 |
| Characters | 1-2 | 3-5 |
| Scenes | 3-5 | 7-12 |
| Structure | Linear, rule of three | Linear + minor subplot |
| False-belief plots | No | Yes (from 7+) |
| Themes | Security, fear, big emotions, magical thinking | Fairness, friendship, competence, moral complexity |
| Format options | Picture book (32pp) | Picture book / early reader / chapter book |

### Step 2: Format

| Format | Pages | Words | Description |
|--------|-------|-------|-------------|
| **Picture book** | 32 | 200-800 | 12-14 spreads, illustrations dominate |
| **Verse book** | 32 | 200-500 | Rhyming text, consistent meter |
| **Early reader** | 32-64 | 300-1,500 | Levels (Level 1-3), independent reading |
| **Bedtime story** | -- | 1,000-3,000 | Read aloud, text-only format |

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

| Archetype | Core | Classic Examples |
|-----------|------|-----------------|
| **Journey** | Going out and coming back, changed | Where the Wild Things Are, The Snowy Day |
| **Challenge** | Overcoming obstacles | Whistle for Willie, The Most Magnificent Thing |
| **Discovery** | Finding something new about self/world | Last Stop on Market Street, Frederick |
| **Friendship** | Building or repairing a relationship | Frog and Toad, Enemy Pie |

**Structural patterns:**

| Pattern | How It Works | Best For |
|---------|-------------|----------|
| **Cumulative** | Each page adds element, repeats whole chain | Ages 3-5, rhythm/mastery |
| **Circular** | Ends where it began, character changed | Security and growth |
| **Pattern with variation** | Repeating structure, variation each time | Ages 3-5, participation |
| **Three attempts** | Fail, fail, succeed (with twist) | Persistence, ages 4-7 |
| **Parallel** | Two storylines mirror/contrast | Ages 5-8, perspective |
| **Problem-escalation-resolution** | Attempts make it worse, then resolution | Workhorse structure, all ages |

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
   - Mystery/magic: sibilants (s, s) + fricatives
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
