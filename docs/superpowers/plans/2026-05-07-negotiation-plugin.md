# Negotiation Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new `negotiation` plugin in `~/Projects/skills/plugins/negotiation/` containing 1 lean orchestrator + 5 specialist sub-skills + 8 shared reference files, covering Joe Navarro nonverbal reading, Chris Voss tactical empathy, Fisher/Ury BATNA, Goulston/Kohlrieser/Stone for emotional contexts, and written de-escalation.

**Architecture:** Plugin marketplace pattern (matches existing copywriting/marketing/etc. plugins). Lean orchestrator pure-routes to specialists per `copywriting-orchestrator` model. References live in `plugins/negotiation/references/` and are called by relevant sub-skills (cross-skill reusable). Frame around discomfort-not-deception (Navarro post-2018). Czech business culture deltas embedded.

**Tech Stack:** Markdown SKILL.md files with YAML frontmatter. No code, no tests in traditional sense — validation = YAML frontmatter parses, plugin loads in Claude Code, trigger phrases match scenarios, cross-references resolve.

**Source materials (read before starting tasks):**

- `docs/superpowers/specs/2026-05-07-negotiation-plugin-design.md` — design spec (authoritative)
- `docs/research/2026-05-07-navarro-vyjednavani.md` — methodology research (content source for references)
- `docs/research/2026-05-07-negotiation-corpus-matrix.md` — corpus matrix (canonical attribution)
- `docs/research/2026-05-07-corpus-acquisition-list.md` — book acquisition list with edition warnings
- `docs/research/2026-05-07-free-primary-sources.md` — FREE primary-source surrogates (Pařík 30h+, Black Swan blog, Spycatcher columns, HBR articles, podcast transcripts)

**NotebookLM corpus state (notebook `8b989435-d568-4248-a3a1-4ddd8ea57da2` — 11 sources uploaded):**

EN canon (10 books) + 1 free academic paper. Subagents may query via `mcp__notebooklm-cli__notebook_query` for grounded direct quotes:

- Voss & Raz _Never Split the Difference_ (`e92cca6d-daae-46ba-8f53-209c7c9ed407`)
- Navarro & Karlins _What Every BODY is Saying_ (`501e3d58-142d-441b-b45d-ce0b01b32076`)
- Navarro _The Dictionary of Body Language_ (`19f514bd-91e4-4341-a1c8-81d56d368582`)
- Cialdini _Influence New & Expanded_ 2021 (`0226d58b-f50b-4499-8812-09727930bc61`)
- Cialdini _Pre-Suasion_ (`83bd6156-b031-4800-bc61-cb4fa65c6986`)
- Fisher & Ury _Getting to Yes_ (`939682d5-8066-4b7b-8df8-e65a5dcb558f`)
- Goulston _Just Listen_ (`4a071379-eda0-4fb6-8849-53686b5ad195`)
- Malhotra & Bazerman _Negotiation Genius_ (`0ec33e70-85f1-439c-9157-dd15ab0a8f47`)
- Stone/Patton/Heen _Difficult Conversations_ (`d4fc0fc0-4a89-464c-b2d2-11570fc3150b`)
- Kohlrieser _Hostage at the Table_ 2006 1st ed. (`1cc8e99c-e06e-4d0f-9204-8644fe160454`)
- Vecchi/Van Hasselt/Romano BCSM paper (`57252c6d-28eb-4b71-9e07-fc8d74bde025`)

**MISSING from notebook (use surrogate sources):**

- ❌ **Radim Pařík — _Umění vyjednat cokoliv_ (CZ)** — for `cz-business-culture-deltas.md` reference, USE `docs/research/2026-05-07-free-primary-sources.md` § 8 "CZ pillars" (76+ podcast episodes, naživot #15 2h15m transcript, press interviews). Plan upgrade once PDF acquired.
- ❌ **Adam Dolník — _Svět elitního vyjednavače_ (CZ)** — for `emotional-conflict` CZ crisis examples, USE free sources file § 8 "Dolník" (12 TV/radio/DVTV interviews + vyjednavame.cz hub).
- ❌ **Navarro _Be Exceptional_ (2021)** — Tier 2 nice-to-have. WEBIS + Dictionary cover `reading-people` foundation. Skip for v1.

**Subagent content extraction strategy:**

- EN canonical → `notebook_query` with notebook_id `8b989435-d568-4248-a3a1-4ddd8ea57da2` for grounded extraction
- CZ adaptation → read free-primary-sources.md § 8 (Pařík public-domain content)
- Fallback for synthesis → research docs

**Existing pattern reference:**

- `plugins/copywriting/skills/copywriting-orchestrator/SKILL.md` — orchestrator pattern
- `plugins/copywriting/skills/ig-orchestrator/SKILL.md` — sub-orchestrator pattern
- `plugins/copywriting/skills/ig-content/SKILL.md` — specialist skill pattern

**Parallelism:** Phase 2 (8 references) and Phase 3 (5 sub-skills) can be dispatched in parallel via subagent-driven-development. Phase 4 (orchestrator) must wait for Phase 3.

**Branch strategy:** Create branch `feat/negotiation-plugin` BEFORE Task 1.

---

## Phase 1 — Plugin scaffolding (sequential, 3 tasks)

### Task 1: Create branch + plugin directory structure

**Files:**

- Create: `plugins/negotiation/.claude-plugin/plugin.json`
- Create: `plugins/negotiation/skills/` (empty dir)
- Create: `plugins/negotiation/references/` (empty dir)

- [ ] **Step 1: Create feature branch**

```bash
cd ~/Projects/skills
git checkout -b feat/negotiation-plugin
```

Expected: `Switched to a new branch 'feat/negotiation-plugin'`

- [ ] **Step 2: Create directory structure**

```bash
mkdir -p ~/Projects/skills/plugins/negotiation/.claude-plugin
mkdir -p ~/Projects/skills/plugins/negotiation/skills
mkdir -p ~/Projects/skills/plugins/negotiation/references
```

- [ ] **Step 3: Write plugin.json with exact content**

Path: `plugins/negotiation/.claude-plugin/plugin.json`

```json
{
  "name": "negotiation",
  "version": "1.0.0",
  "description": "Negotiation and meeting leadership — Joe Navarro nonverbal reading + Chris Voss tactical empathy + Fisher/Ury BATNA + Goulston/Kohlrieser/Stone for emotional contexts. Czech business culture context.",
  "author": { "name": "Petr" },
  "skills": "./skills/",
  "category": "business"
}
```

- [ ] **Step 4: Validate JSON parses**

```bash
python3 -m json.tool plugins/negotiation/.claude-plugin/plugin.json > /dev/null && echo OK
```

Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add plugins/negotiation/.claude-plugin/plugin.json
git commit -m "feat(negotiation): scaffold plugin directory + plugin.json"
```

---

### Task 2: Register plugin in marketplace

**Files:**

- Modify: `.claude-plugin/marketplace.json`

- [ ] **Step 1: Read current marketplace.json structure**

```bash
cat .claude-plugin/marketplace.json | python3 -m json.tool | head -40
```

Note current schema (likely has `"plugins"` array with entries `{ "name", "source": { "type": "github" }, ... }` or similar).

- [ ] **Step 2: Add negotiation plugin entry**

Match the schema of existing entries. Most likely structure (verify against existing):

```json
{
  "name": "negotiation",
  "description": "Negotiation and meeting leadership — Navarro + Voss + Fisher/Ury + Goulston. CZ context.",
  "source": "./plugins/negotiation",
  "category": "business"
}
```

Add to the `plugins` array. Preserve alphabetical or thematic order if existing file uses one.

- [ ] **Step 3: Validate JSON parses**

```bash
python3 -m json.tool .claude-plugin/marketplace.json > /dev/null && echo OK
```

Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add .claude-plugin/marketplace.json
git commit -m "feat(negotiation): register plugin in marketplace"
```

---

### Task 3: Phase 1 checkpoint — verify plugin scaffolding loads

**Files:** none modified

- [ ] **Step 1: Verify directory structure**

```bash
find plugins/negotiation -type d | sort
```

Expected output:

```
plugins/negotiation
plugins/negotiation/.claude-plugin
plugins/negotiation/references
plugins/negotiation/skills
```

- [ ] **Step 2: Confirm plugin.json + marketplace registration**

```bash
ls plugins/negotiation/.claude-plugin/plugin.json && grep -c "negotiation" .claude-plugin/marketplace.json
```

Expected: file path + count ≥ 1.

**Phase 1 acceptance criteria met:** plugin scaffold exists, plugin.json valid, marketplace registered. Sub-skills + references can now be added.

---

## Phase 2 — References (8 tasks, **parallel-ready**)

**Dispatch strategy:** All 8 reference tasks can be executed by parallel subagents — they have no inter-dependencies. Order in this plan = priority by usage (most-called first), but parallel dispatch is fine.

**Common acceptance criteria for every reference file:**

- Path: `plugins/negotiation/references/<name>.md`
- Has top-level `# <Title>` H1
- Has `## Source` section listing canonical attribution + research doc anchor
- Has `## Used by` section listing which sub-skills call it
- Content drawn from `docs/research/2026-05-07-navarro-vyjednavani.md` and `docs/research/2026-05-07-negotiation-corpus-matrix.md`
- 100-400 lines (focused reference, not exhaustive treatise)

---

### Task 4: `cz-business-culture-deltas.md` reference

**Files:**

- Create: `plugins/negotiation/references/cz-business-culture-deltas.md`

- [ ] **Step 1: Read source content from research doc**

```bash
sed -n '/^## Cesky kontext/,/^## /p' docs/research/2026-05-07-navarro-vyjednavani.md
```

Locate the "Czech business culture deltas" table + Czech experts subsection.

- [ ] **Step 2: Write the reference file**

Required structure:

```markdown
# CZ Business Culture Deltas

> Czech business culture differences vs US/Anglo-Saxon baseline. Used by all 5 sub-skills.

## Source

- Composite — Pařík _Umění vyjednat cokoliv_ (2024) + Business Culture / World Business Culture profiles + Hofstede CZ data
- Research anchor: `docs/research/2026-05-07-navarro-vyjednavani.md` § "Cesky kontext"

## Used by

`reading-people`, `tactical-empathy`, `batna-strategy`, `emotional-conflict`, `written-negotiation`

## Delta table

| Aspekt              | US/Anglo-Saxon baseline | CZ adjustment                                                                                                           |
| ------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Handshake           | Firm + eye contact      | Stejné, jen silnější norm — slabý grip = slabý člověk                                                                   |
| Vykání / Tykání     | Casual switch           | Vykání default, switch = relationship milestone                                                                         |
| Punctuality         | Within 5 min OK         | On-time or 5 early — 5+ late = rude                                                                                     |
| Directness          | High                    | Paradoxical — fakta přímo, konfrontace ne. _"To bude těžké"_ / _"Uvidíme"_ = polite NO                                  |
| Emotional restraint | Medium                  | High — Češi deliberate maskují. Delta-detection sensitivnější, ne hledat amplitudu                                      |
| Body amplitude      | Medium                  | Low — Italian/American expressivity reads jako overselling                                                              |
| Personal space      | ~60-80cm                | 80-100cm — neleán across stůl                                                                                           |
| Small talk          | Sport, weather, kids    | **Hokej, fotbal, pivo, hory, dovolená**. **Avoid:** WWII, komunismus, Rusko/Ukrajina, Romové, religion, salaries direct |
| Meal etiquette      | Lunch = business        | Pivo/káva = business, lunch/dinner = relationship — nepoušť hard sell při lunch                                         |
| Written agreements  | Verbal handshake OK     | Češi trust paper — VŽDY follow up email/dokument confirmation                                                           |
| Decision style      | Often at table          | Hierarchical — decisions roll up. Person at table možná neumi closure. **Identifikuj decision-maker brzy.**             |

## CZ-native experts (canonical references)

- **Radim Pařík** — Asociace vyjednavačů. Žák Vosse i Navarra. Kniha _Umění vyjednat cokoliv_ (2024). [asociacevyjednavacu.cz](https://www.asociacevyjednavacu.cz/)
- **Adam Dolník** — světový vyjednavač s únosci. Kniha _Svět elitního vyjednavače_ (2024, s Martinem Moravcem).
- **Vít Prokůpek** — _Psychologie ovlivňování_ (2024). Praktiké techniky pro CZ obchod.

## Common idioms — translation table

| CZ                       | What it really means                  |
| ------------------------ | ------------------------------------- |
| "To bude těžké"          | NO (polite)                           |
| "Uvidíme"                | NO or stalling                        |
| "To si musíme rozmyslet" | NO or deferred decision               |
| "Není to standardní"     | NO (organizational pushback)          |
| "Tykejme si"             | Relationship milestone — accept       |
| "Děkujeme za nabídku"    | Could be either yes/no — read context |

## Anti-patterns in CZ context

- ❌ Excessive enthusiasm or "fake American positivity" → reads as overselling/untrustworthy
- ❌ Tykání without invitation → disrespect
- ❌ Treating "to bude těžké" as "maybe yes" → missed signal
- ❌ Skipping written follow-up after verbal agreement → re-negotiation risk
- ❌ Ignoring decision-maker hierarchy → wasted time at the table
```

- [ ] **Step 3: Verify file structure**

```bash
test -f plugins/negotiation/references/cz-business-culture-deltas.md && \
  grep -E "^## (Source|Used by)" plugins/negotiation/references/cz-business-culture-deltas.md
```

Expected: both `## Source` and `## Used by` lines present.

- [ ] **Step 4: Commit**

```bash
git add plugins/negotiation/references/cz-business-culture-deltas.md
git commit -m "feat(negotiation): add cz-business-culture-deltas reference"
```

---

### Task 5: `cialdini-7-principles.md` reference

**Files:**

- Create: `plugins/negotiation/references/cialdini-7-principles.md`

- [ ] **Step 1: Write the reference file**

Required structure:

```markdown
# Cialdini's 7 Principles of Influence

> Bias library shared across negotiation sub-skills. Each principle has ethical use case + manipulation flag + defense pattern.

## Source

- Robert Cialdini, _Influence: The Psychology of Persuasion, New & Expanded_ (2021) — ISBN 9780062937650
- Robert Cialdini, _Pre-Suasion_ (2016) — ISBN 9781501109799
- CZ ed.: _Nové zbraně vlivu_ (2023), _Před-svědčování_ (Jan Melvil Publishing)
- Research anchor: `docs/research/2026-05-07-navarro-vyjednavani.md` § "Cialdini"

## Used by

`tactical-empathy`, `batna-strategy`, `written-negotiation`. Orchestrator references via pointer only.

## Ethical principle: persuasion vs manipulation

This skill uses Cialdini principles in **ethical use cases only**. Each principle below has a `[MANIPULATION FLAG]` section — those patterns the skill never recommends. They appear here so you can recognize when used against you.

---

## 1. Reciprocity

**Definition:** People feel obliged to return what others give them. Stronger when gift is unexpected, personalized, and given first.

**Ethical use:** Provide genuine value upfront — useful info, an introduction, honest insight — without immediate ask. Recipient natural impulse is to reciprocate.

**[MANIPULATION FLAG]:** Manufactured "gifts" designed to trigger debt without value (free pen + survey, fake favors). Recognize: gift feels staged or unsolicited from someone with clear ulterior motive.

**Defense:** Re-frame internally — "this is a transaction, not a gift." You owe nothing for what wasn't requested.

**In negotiation:** Open with a real concession or value-add (referral, market intel) — they're more likely to concede later.

---

## 2. Commitment & Consistency

**Definition:** Once we make a small public commitment, we feel pressure to act consistently with it. Used to land bigger asks via small initial yes.

**Ethical use:** Surface common ground in small, true statements early. "We both want X to succeed long-term" — true, public, low-cost. Future asks feel consistent with shared goal.

**[MANIPULATION FLAG]:** Foot-in-the-door extraction of trivial agreements that are then leveraged as "you already agreed to X" (low-ball pricing, bait-and-switch).

**Defense:** Ask "would I make this commitment fresh today, with full information?" If no, retract.

**In negotiation:** Multi-stage proposals with explicit re-confirmation between stages. Avoid hidden expansion.

---

## 3. Social Proof

**Definition:** When uncertain, people look to others' behavior. Stronger from similar peers, weaker from dissimilar groups.

**Ethical use:** Cite genuine peer evidence — "our last 3 clients in your sector chose this option because…". Honest, verifiable, similar-cohort.

**[MANIPULATION FLAG]:** Fabricated testimonials, vague "everyone is doing it," manufactured scarcity ("57 people are looking at this room").

**Defense:** Verify the social proof — names, contexts, dates. Discount vague claims.

**In negotiation:** Use objective criteria (Fisher/Ury) backed by peer benchmarks. Skip if data isn't real.

---

## 4. Authority

**Definition:** People defer to perceived experts. Triggered by titles, credentials, attire, contextual symbols.

**Ethical use:** Lead with relevant credentials when they materially help (legal advice → lawyer cred). Don't oversell.

**[MANIPULATION FLAG]:** Borrowed authority (citing experts irrelevantly), fake credentials, intimidation through titles in non-relevant domains.

**Defense:** "What's their specific expertise on THIS question?" Authority is domain-specific.

**In negotiation:** Cite genuine domain experts only. Don't invoke generic "experts say…".

---

## 5. Liking

**Definition:** We agree more with people we like. Driven by similarity, compliments, cooperation, attractiveness.

**Ethical use:** Be genuinely curious about the counterpart — find real common ground (shared connections, similar challenges). Authentic rapport.

**[MANIPULATION FLAG]:** Manufactured similarity (mirroring extended to fake biography), excessive flattery, weaponized friendship-framing in adversarial deal.

**Defense:** Liking ≠ trustworthiness. Separate "do I like them" from "is the deal fair." Use BATNA discipline.

**In negotiation:** Real rapport-building (genuine small talk, shared experiences) — but never let liking override BATNA math.

---

## 6. Scarcity

**Definition:** Things become more desirable when rare or time-limited. People weigh losses heavier than equivalent gains.

**Ethical use:** Surface real constraints — "I have decision deadline by Friday because [reason]". True, verifiable.

**[MANIPULATION FLAG]:** Fake deadlines, manufactured "limited slots," "this offer expires today" without true reason.

**Defense:** Ask why. If reason isn't substantive, treat scarcity as bluff.

**In negotiation:** Honest BATNA-driven deadlines work. Fake ones erode trust if detected.

---

## 7. Unity

**Definition:** Shared identity (we, us, our group) is stronger than mere similarity. Family, country, profession, club.

**Ethical use:** Surface true shared identity — "as fellow founders…", "as parents…", "as people who care about CZ tech scene…". Real community.

**[MANIPULATION FLAG]:** Fake tribal appeals ("us vs them"), manufactured in-group framing for sales pressure.

**Defense:** Is this identity real and relevant? Or is it being weaponized to suppress disagreement?

**In negotiation:** Genuine unity-framing on shared business interests is powerful. Don't fake it.

---

## Pre-Suasion summary (Cialdini 2016)

The moment **before** the message determines persuasion more than the message itself. "Privileged moments" — what's salient in attention right before the ask.

**Ethical use in negotiation:**

- Pre-meeting: send agenda focusing on shared goals
- Opening: 3-min small talk on positive shared topic before substantive ask
- Anchor with relevant fact (objective criteria) before number

**[MANIPULATION FLAG]:** Subliminal priming, exploiting cognitive distraction, framing tricks designed to bypass deliberation.

---

## Defense playbook (when used against you)

1. **Detect:** Any of the 7 principles being deployed?
2. **Pause:** "Let me think about this overnight" — disrupts the privileged moment.
3. **Verify:** Is the trigger real (genuine reciprocity, true scarcity, real authority)?
4. **Reframe:** Separate the principle from the underlying merit. Decision should rest on substance.
```

- [ ] **Step 2: Verify file structure**

```bash
grep -c "^## " plugins/negotiation/references/cialdini-7-principles.md
```

Expected: count ≥ 11 (1-7 principles + Pre-Suasion + Defense + Source + Used by).

- [ ] **Step 3: Commit**

```bash
git add plugins/negotiation/references/cialdini-7-principles.md
git commit -m "feat(negotiation): add cialdini-7-principles reference"
```

---

### Task 6: `comfort-discomfort-taxonomy.md` reference

**Files:**

- Create: `plugins/negotiation/references/comfort-discomfort-taxonomy.md`

- [ ] **Step 1: Write the reference file**

Source content from `docs/research/2026-05-07-navarro-vyjednavani.md` § "Key Findings — Navarrova metodologie" (sections 1-8 cover the taxonomy).

Required structure:

```markdown
# Comfort/Discomfort Taxonomy (Navarro)

> Lookup tables for nonverbal cues. Used by reading-people skill.

## Source

- Joe Navarro, _What Every Body Is Saying_ (2008) — ISBN 9780061438295
- Joe Navarro, _The Dictionary of Body Language_ (2018) — ISBN 9780062846921
- Joe Navarro, _The End of Detecting Deception_ (Psychology Today, 2018; jnforensics.com) — Navarro's post-2018 frame
- Research anchor: `docs/research/2026-05-07-navarro-vyjednavani.md` § sections 1-9

## Used by

`reading-people`

## Master frame: Comfort vs Discomfort (post-2018)

Forget "is this person lying?" Ask only **"am I seeing comfort or discomfort?"** Binary is enough and far more accurate than emotion-labeling.

| Comfort cluster                                                               | Discomfort cluster                                 |
| ----------------------------------------------------------------------------- | -------------------------------------------------- |
| Ventral fronting (torso open toward you)                                      | Ventral denial (torso turned away)                 |
| Gravity-defying gestures (eyebrows up, shoulders rising lightly, raised chin) | Lip compression / disappearing lips (blood drains) |
| Full-color lips                                                               | Furrowed glabella (between eyebrows)               |
| Relaxed limbs                                                                 | Narrowed eye orbits                                |
| Head tilt exposing neck                                                       | Jaw clench                                         |
| Pacifiers absent or rare                                                      | Pacifiers present, increasing frequency            |

---

## Limbic hierarchy: Freeze → Flight → Fight

Evolutionary order. **Freeze comes first.** Most negotiation distress is freeze (subtle, easily missed).

| Stage      | Tells                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------- |
| **Freeze** | Sudden stillness, shallow breath, "turtle effect" (shoulders rising toward ears)             |
| **Flight** | Torso/feet rotating away, leaning back, eye-blocking (slow blinks, hand to eye, eyebrow rub) |
| **Fight**  | Chest puff, jaw set, finger-pointing, narrowing posture toward counterpart                   |

---

## Pacifying behaviors (self-soothing under stress)

Triggered by limbic stress hit. Catalogue (most reliable first):

| Behavior                          | Description                                   | Strength                                                                             |
| --------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Suprasternal notch touch**      | Hand to throat dimple                         | Strongest tell, especially in women                                                  |
| **Leg cleanser**                  | Hands sliding along thighs under table        | "Almost always when confronted with damning evidence" — police interrogator standard |
| **Neck rubbing**                  | Side or back of neck                          | Strong                                                                               |
| **Tie/collar adjustment**         | Men only                                      | Strong                                                                               |
| **Necklace / hair touch**         | Women common                                  | Medium                                                                               |
| **Ventilator**                    | Pulling collar away from neck                 | Medium                                                                               |
| **Lip licking / lip compression** | Often paired                                  | Medium                                                                               |
| **Cheek puff exhale**             | Slow exhale                                   | Mild                                                                                 |
| **Forehead rubbing**              | One-handed                                    | Mild                                                                                 |
| **Self-hugging**                  | Crossed arms with hands on opposite shoulders | Mild-medium                                                                          |

**Pacifier ≠ lying.** It signals discomfort. Cause = topic, room temp, unrelated worry, or genuine concern. Confirm via re-introduction trigger.

---

## Honesty hierarchy (most → least)
```

feet → legs → torso → arms → hands → face
(most honest) (most controlled)

```

We're trained from childhood to control face; nobody trains feet. Always sit where you can see feet.

### Foot-specific cues

| Behavior | Meaning |
|----------|---------|
| Happy feet (bouncing) | Excitement OR impatience — context decides |
| Foot direction | Points toward what we want (exit, door, preferred person, or you if interested) |
| Leg-splay | Territorial confidence |
| Foot-lock around chair leg | Discomfort / restraint |
| Foot-withdrawal under chair | Retreat |
| Cross-legged standing | High comfort (can't run quickly from this position) |

---

## Hand gestures

| Gesture | Meaning | Use case |
|---------|---------|----------|
| **Steepling** (fingertips peaked) | Highest confidence | When stating your position — sparingly |
| **Palm-up** | Asking, openness, submissive | Rapport-building |
| **Palm-down** | Asserting, declaring | Stating non-negotiables |
| **Thumb display** (visible) | High status | Default for confidence |
| **Tucked thumbs / closed fists** | Fear, low confidence | Avoid if you're the one negotiating |
| **Hidden hands** (under table, pockets) | Generates suspicion | Always keep visible |
| **Interlaced fingers / hand-wringing** | Low confidence, anxiety | Mask if it's your tell |

---

## Eye behavior

| Behavior | Meaning |
|----------|---------|
| **Pupil dilation** | Positive interest (involuntary — cannot fake) |
| **Pupil constriction** | Negative perception |
| **Eye-blocking** (slow blinks, hand to eye, eyebrow rub) | "Don't want to see/hear this" — discomfort |
| **Blink-rate increase** | Stress |
| **Squint** | Doubt or scrutiny |
| **Eyebrow flash** (split-second up) | Recognition, positive greeting |
| **Prolonged contact** | Often practiced liars over-maintain — NOT trustworthy signal |

---

## Territorial display

Dominant negotiators claim space. Tells:
- Arms spread along chair backs / table edge
- **Arms akimbo** (hands on hips)
- **Hooding** (interlaced fingers behind head, elbows wide)
- Elbows splayed onto table into counterpart's space
- Items spread across table (papers, phone, pen, water bottle as territorial markers)
- Choosing the head of the table

**Counter-tactic (Navarro's lawyer trick):** Request smallest viable room. Forces large team to send fewer people. Environment design beats negotiation tactics.

---

## Anti-patterns (do NOT do these)

- ❌ Read body language to detect lies (Navarro post-2018 + Vrij research: ~54% accuracy = chance)
- ❌ Trust microexpressions as deception cues (PMC6158306 critique)
- ❌ Trust gaze aversion as lying signal (practiced liars over-maintain eye contact)
- ❌ Try to label specific emotions ("they're angry / scared") — comfort/discomfort binary is enough and more accurate
- ❌ Compare counterpart to yourself or generic "confident person" template — only deviations from THEIR baseline carry signal
- ❌ Stare at face — by the time face shows it, feet showed it 2 seconds earlier and were truer

---

## Baseline-deviation protocol

1. First 3-5 minutes: observe on neutral topics (weather, traffic, coffee)
2. Log: hand position, blink rate, voice tempo, foot direction, fidget patterns, eye-contact duration
3. Only **deviations** from this baseline carry signal during substantive discussion
4. CZ context: Czechs deliberately mask emotion → baseline amplitude is lower → delta-detection must be MORE sensitive
```

- [ ] **Step 2: Verify**

```bash
test -f plugins/negotiation/references/comfort-discomfort-taxonomy.md && \
  grep -c "^##" plugins/negotiation/references/comfort-discomfort-taxonomy.md
```

Expected: count ≥ 10.

- [ ] **Step 3: Commit**

```bash
git add plugins/negotiation/references/comfort-discomfort-taxonomy.md
git commit -m "feat(negotiation): add comfort-discomfort-taxonomy reference"
```

---

### Task 7: `bcsm-stairway.md` reference

**Files:**

- Create: `plugins/negotiation/references/bcsm-stairway.md`

- [ ] **Step 1: Write the reference file**

Required structure:

```markdown
# Behavioral Change Stairway Model (BCSM)

> Academic backbone of Voss tactical empathy. 5-stage cumulative-sequential progression. Used by tactical-empathy + emotional-conflict.

## Source

- Vecchi, Van Hasselt & Romano (2005). _Crisis (hostage) negotiation: Current strategies and issues in high-risk conflict resolution._ Aggression and Violent Behavior.
- Free PDF: https://nsuworks.nova.edu/cps_facarticles/1260/
- Research anchor: `docs/research/2026-05-07-navarro-vyjednavani.md` and `docs/research/2026-05-07-negotiation-corpus-matrix.md`

## Used by

`tactical-empathy`, `emotional-conflict`

## The 5 stages
```

Active Listening → Empathy → Rapport → Influence → Behavioral Change

```

**Cumulative-sequential:** Each stage is prerequisite for the next. You cannot influence someone who hasn't felt heard. You cannot generate behavioral change without rapport.

---

### Stage 1 — Active Listening

**Goal:** Make the counterpart feel heard. Lower their defensive arousal.

**Tactics:**
- Minimal encouragers ("mm-hmm", "ano", "okay")
- Mirroring (last 1-3 words, inquisitive tone)
- Effective pauses (silence after they speak)
- Paraphrasing without judgment
- Open-ended questions ("Co se stalo dál?")

**Stage indicator:** Counterpart speaks more freely, gives longer answers, stops repeating themselves.

**Common mistakes:**
- Solving prematurely (skipping to Stage 4)
- Closed yes/no questions that shut conversation
- Interrupting

---

### Stage 2 — Empathy

**Goal:** Understand their perspective + emotion. Communicate that understanding.

**Tactics:**
- Labeling ("It seems like you're frustrated because…", "Vypadá to že…")
- Emotional articulation (name the emotion before they do)
- Acknowledging perspective without endorsing
- Avoiding "I understand" (cliché — replace with specific reflection)

**Stage indicator:** Counterpart corrects or expands your label. They start to elaborate emotionally.

**Common mistakes:**
- Sympathy ("That's terrible") instead of empathy (understanding)
- Labels that miss the actual emotion
- Endorsing positions you can't actually agree to

---

### Stage 3 — Rapport

**Goal:** Counterpart sees you as someone they can work with. Trust forms.

**Tactics:**
- Find genuine common ground
- Self-disclosure (calibrated — share something true that builds connection)
- Sustained empathy across multiple emotional shifts
- Tactical empathy = empathy + intent to influence (Voss)

**Stage indicator:** Counterpart asks YOU questions. Volunteers info you didn't ask for. Body language shifts to comfort cluster.

**Common mistakes:**
- Fake similarity (manufactured shared experiences)
- Premature solution-pushing
- Treating rapport as goal in itself rather than gateway to influence

---

### Stage 4 — Influence

**Goal:** Help counterpart see options they hadn't considered. Move them toward mutually-beneficial direction.

**Tactics:**
- Calibrated questions ("Jak to mám udělat?", "Co by muselo být pravda aby to fungovalo?")
- Reframe positions toward interests (Fisher/Ury)
- Surface Black Swans (hidden info that changes calculus)
- Offer options for mutual gain

**Stage indicator:** Counterpart begins to problem-solve with you. Generates their own ideas. Shifts language from "you should" to "we could".

**Common mistakes:**
- Skipping straight here without rapport (most common failure)
- Selling instead of asking
- Making it about winning vs collaborative discovery

---

### Stage 5 — Behavioral Change

**Goal:** Counterpart commits to specific action.

**Tactics:**
- Calibrated yes/no validation
- Implementation specifics ("kdy konkrétně?", "kdo to udělá?")
- Consequence clarity (mutual)
- Document agreement (CZ context: written follow-up povinný)

**Stage indicator:** Specific commitment, named owner, named deadline. Synchrony in body + voice.

**Common mistakes:**
- Vague agreements ("we'll think about it")
- Skipping written confirmation
- Missing the actual decision-maker

---

## Stage-skipping diagnostic

| If you're stuck at… | You skipped… |
|--------------------|--------------|
| They keep repeating themselves | Active Listening |
| They reject your reframes | Empathy |
| Conversation stays transactional | Rapport |
| Agreement is vague | Influence |
| Agreement breaks down post-meeting | Behavioral Change verification |

**Fix:** Return to the skipped stage. The stairway only goes up cumulatively.

---

## CZ adaptation

- Stage 1 (Active Listening): silence is comfortable in CZ business — don't fill it. Czechs interpret silence as thinking.
- Stage 2 (Empathy): low-amplitude labels work better. "Zní to jako že vás to stálo dost úsilí" beats over-emotive labels.
- Stage 3 (Rapport): self-disclosure should be modest, factual — not emotional. Sport, kids, holiday plans.
- Stage 4 (Influence): calibrated questions in CZ feel less manipulative than in US. CZ business culture tolerates direct "Jak si představujete X?".
- Stage 5 (Behavioral Change): ALWAYS written follow-up email summarizing commitments. CZ trusts paper.
```

- [ ] **Step 2: Verify**

```bash
test -f plugins/negotiation/references/bcsm-stairway.md && \
  grep -c "^### Stage" plugins/negotiation/references/bcsm-stairway.md
```

Expected: count = 5.

- [ ] **Step 3: Commit**

```bash
git add plugins/negotiation/references/bcsm-stairway.md
git commit -m "feat(negotiation): add bcsm-stairway reference"
```

---

### Task 8: `goulston-9-rules.md` reference

**Files:**

- Create: `plugins/negotiation/references/goulston-9-rules.md`

- [ ] **Step 1: Write the reference file**

Required structure:

```markdown
# Goulston 9 Rules + Persuasion Cycle

> Tactical empathy in high-emotion contexts. Used by emotional-conflict + written-negotiation (subset).

## Source

- Mark Goulston, _Just Listen_ (2009) — ISBN 9780814436479
- Research anchor: `docs/research/2026-05-07-negotiation-corpus-matrix.md` § "Goulston"

## Used by

`emotional-conflict`, `written-negotiation` (subset for written de-escalation)

## Persuasion Cycle — diagnose before acting

Counterpart is in one of 6 stages. **Push only to the next stage. Never skip.**
```

Resisting → Listening → Considering → Willing → Doing → Glad I did

```

| Stage | Diagnostic question | Tactic to advance |
|-------|---------------------|-------------------|
| **Resisting** | "Are they actively pushing back?" | Stop persuading. Start listening. |
| **Listening** | "Are they hearing me at all?" | Empathy jolt. Make them feel heard. |
| **Considering** | "Are they weighing it?" | Surface concrete benefits. Address concerns. |
| **Willing** | "Are they leaning toward yes?" | Make commitment specific + low-friction. |
| **Doing** | "Have they acted?" | Reinforce. Smooth path. Remove obstacles. |
| **Glad I did** | "Are they validating their decision?" | Acknowledge, celebrate, lock in for repeat. |

---

## The 9 rules

### Rule 1 — Move yourself from "Oh F#@& to OK"

Before reacting, regulate yourself first. 6 stages: Reaction → Release → Recenter → Refocus → Reengage → Refresh. Feel the punch but don't act on it.

**Application:** Always self-regulate FIRST in emotional contexts. Per Kohlrieser: 60-sec internal check.

### Rule 2 — Rewire yourself to listen

Most people listen to respond. Goulston: listen to **understand them** before responding. Forces the counterpart's emotion through your attention back into your awareness.

### Rule 3 — Make the other person feel "felt"

Beyond hearing — they need to feel that you actually GET it. Tactic: empathy jolt. Pause, label the emotion + the impact. "I bet right now you're feeling X because of Y."

### Rule 4 — Be more interested than interesting

Stop trying to be impressive. Genuine curiosity is disarming.

### Rule 5 — Make people feel valuable

People have an inner critic telling them they're not enough. Recognize their value sincerely — and they relax.

### Rule 6 — Help people exhale emotionally and mentally

Pent-up frustration blocks rational thinking. Let them vent (without becoming target). Their cortex comes back online after.

### Rule 7 — Check your dissonance at the door

Match your verbal + nonverbal. Saying "I care" while looking at your phone = lost.

### Rule 8 — When all seems lost, bare your neck

Vulnerability deflates aggression. "I'm out of ideas. What would you suggest?" Often shifts the dynamic completely.

### Rule 9 — Steer clear of toxic people

Bad-faith counterparts (per Navarro Dangerous Personalities). Don't try to persuade them. Walk away or document protectively.

---

## Empathy jolt — the core tactic

Used at Listening → Considering transition.

**Format:**
1. Pause (2-3 seconds)
2. Slow voice (Voss late-night-FM-DJ)
3. Label specific emotion + specific cause: "I bet right now you feel X because of Y"
4. Wait. Let them correct or elaborate.

**Example (firing context):**
"I bet right now you feel betrayed, because you gave us 8 years of your life and this conversation came without warning."

**Why it works:** Forces counterpart from amygdala (defensive) to neocortex (deliberate). They have to think about whether your label is accurate, which is a cognitive task.

---

## Amygdala-to-neocortex shift

When counterpart is hijacked (yelling, crying, freeze), don't try to logic them. Cortex is offline. Tactics:

1. Slow your voice (Voss FM-DJ)
2. Empathy jolt (above)
3. Open-ended question requiring effort: "Help me understand — what would need to change for this to feel better?"
4. Wait. Don't fill silence.

Amygdala downshifts when conscious thinking is required.

---

## Anti-patterns

- ❌ Trying to be rational while they're hijacked → escalates
- ❌ Skipping Rule 1 (self-regulation) → contagion
- ❌ Using empathy jolt insincerely → detected, trust destroyed
- ❌ Pushing past Resisting stage → backfires
- ❌ "I understand" without specific reflection → cliché, no effect

---

## CZ adaptation

- Lower amplitude empathy jolts work better — Czechs are wary of US-style emotional articulation
- "Asi se cítíte X protože Y" lands better than direct "I bet you feel"
- Vulnerability (Rule 8) reads as authentic in CZ context — not weakness
- After emotional session: ALWAYS written follow-up summarizing what was agreed
```

- [ ] **Step 2: Verify**

```bash
grep -c "^### Rule" plugins/negotiation/references/goulston-9-rules.md
```

Expected: count = 9.

- [ ] **Step 3: Commit**

```bash
git add plugins/negotiation/references/goulston-9-rules.md
git commit -m "feat(negotiation): add goulston-9-rules reference"
```

---

### Task 9: `batna-zopa-framework.md` reference

**Files:**

- Create: `plugins/negotiation/references/batna-zopa-framework.md`

- [ ] **Step 1: Write the reference file**

Required structure (300-450 lines):

```markdown
# BATNA / ZOPA Framework

> Negotiation math + structural moves. Used by batna-strategy.

## Source

- Roger Fisher, William Ury & Bruce Patton, _Getting to Yes_ (3rd ed. 2011) — ISBN 9780143118756
- Deepak Malhotra & Max Bazerman, _Negotiation Genius_ (2007) — ISBN 9780553384116
- Roger Fisher & Daniel Shapiro, _Beyond Reason_ (2005) — ISBN 9780143037781
- Research anchor: `docs/research/2026-05-07-negotiation-corpus-matrix.md` § "batna-strategy"

## Used by

`batna-strategy`

## Core vocabulary

- **BATNA** — Best Alternative To a Negotiated Agreement. Your fallback if this deal doesn't happen.
- **Reservation point** — Worst deal you'd accept (anything below = walk away to BATNA).
- **ZOPA** — Zone of Possible Agreement. Overlap between your reservation and theirs.
- **Anchor** — The first concrete number proposed. Heavily influences final outcome.

---

## BATNA assessment worksheet (yours)

1. List 3-5 alternatives if this deal fails.
2. Score each on 3-5 dimensions (price, speed, risk, fit, optionality).
3. Pick the best one as your BATNA.
4. Quantify your BATNA value (in deal-equivalent terms).
5. Your reservation point = BATNA value. Below this, walk away.

**Example (klient pricing, freelance web work):**

| Alternative           | Price   | Time | Risk   | Fit    | Optionality    |
| --------------------- | ------- | ---- | ------ | ------ | -------------- |
| Klient A current deal | 80k     | 6w   | low    | high   | low (1 client) |
| Klient B (if won)     | 120k    | 8w   | medium | medium | medium         |
| Build SaaS instead    | unknown | 12w  | high   | high   | high           |
| Take FT job offer     | 130k/mo | —    | low    | low    | very low       |

→ BATNA = Klient B if won (best score). Reservation for current klient deal = 110k (must beat Klient B by ~9% to justify continuation).

---

## BATNA assessment (theirs — estimated)

You can't see their BATNA, but you can estimate:

- What's their cost if this deal fails? (rebuilding, lost time, opportunity cost)
- What alternatives are they exploring? (other vendors, in-house, status quo)
- What's their internal pressure? (deadline, board commitment, competition)
- Public signals: hiring patterns, recent contracts, industry tells

**Estimation discipline:** Estimate range, not point. "Their BATNA is between X and Y."

---

## ZOPA mapping
```

Their ceiling Your floor (= reservation)
│ │
├───────── ZOPA ─────────┤
│ │
Buyer max Seller min

```

If your reservation > their max → no ZOPA → no deal possible (find creative options or walk).
If your reservation < their max → ZOPA exists → final price determined by anchoring + leverage + negotiation skill.

---

## Anchor strategy

**Should you anchor first?**
- YES if: you have better information than them, your value is well-justified, you're confident
- NO if: you don't know market well, info asymmetry favors them, you're testing waters

**First-offer math:**
- Anchor 15-25% beyond your target (room to concede)
- Don't anchor at "fair price" — concession expectation will pull you below it
- Justify anchor with objective criteria (Fisher/Ury)

**Counter-anchor (when they go first):**
- Don't say "no" or counter immediately — that legitimizes their anchor
- Reframe: "Help me understand how you arrived at that number"
- Counter with your own anchor (not midpoint!) backed by your criteria

---

## Multi-issue trades

Negotiating ONE issue (price) is win-lose. Multiple issues create trade space.

**Worksheet:**
1. List all issues at stake (price, timeline, scope, payment terms, IP, exclusivity, support, etc.)
2. Rank YOUR priority on each (high / medium / low)
3. Estimate THEIR priority (high / medium / low)
4. Identify trades where their high = your low (or vice versa)

**Example:**
| Issue | Your priority | Their priority | Trade insight |
|-------|---------------|----------------|---------------|
| Price | Medium | High | They'll pay your number if… |
| Payment terms | High (cashflow) | Low | …you can give 50% upfront |
| Timeline | High | Medium | Tight deadline = trade for premium price |
| Support | Low | Medium | Bundle in for goodwill |

→ Trade space exists.

---

## 5 Core Concerns (Fisher/Shapiro, *Beyond Reason*)

Beneath positions are 5 universal emotional concerns. Address them = unlock movement.

| Concern | What it means | Negotiation move |
|---------|---------------|------------------|
| **Appreciation** | Their effort/perspective recognized | "I see you've worked hard on this proposal" |
| **Affiliation** | Treated as colleague, not adversary | "We're both trying to find a fair outcome" |
| **Autonomy** | Decision agency respected | "What matters most to you here?" |
| **Status** | Standing acknowledged | Title use, sequence of speaking, deference where genuine |
| **Role** | Meaningful purpose in process | "Your input on X is essential — what's your read?" |

CZ adaptation: Status concern is amplified in hierarchical CZ business culture. Skipping titles or speaking out of turn carries cost.

---

## Defense playbook against tricks

### Fake authority ("I have to check with my boss")

**Detect:** They claim to lack authority but make substantive moves on the spot.
**Counter:** "Let's draft what would work for us, then you can take it to them. When can we reconvene?"

### Take-it-or-leave-it

**Detect:** Final-sounding ultimatum without basis.
**Counter:** Don't react. Ask: "Help me understand the constraints driving this." If real → adapt. If bluff → walk threat shows.

### Good cop / bad cop

**Detect:** One side aggressive, other "reasonable."
**Counter:** Address it directly. "I notice we have different positions across your team — what would help align?"

### Decoy options

**Detect:** Three options where two are clearly inferior, framing the third as "obvious choice."
**Counter:** Ask why other options exist if they're worse. Often reveals it's manipulation.

### Manufactured scarcity

**Detect:** Sudden deadlines without verifiable basis.
**Counter:** "What's driving the deadline?" Real reason → respect; bluff → exposed.

---

## Negotiating from weakness (Malhotra/Bazerman Ch. 9)

When their BATNA is much stronger than yours:

1. **Improve your BATNA in parallel** (talk to other counterparts even mid-negotiation)
2. **Surface their BATNA's weaknesses** (subtle) — reframe what they think they have
3. **Add value beyond price** (long-term relationship, referral pipeline, brand association)
4. **Threaten with information, not action** (consequences of failed deal made vivid)
5. **Coalition** — bring in third parties whose interests align

---

## CZ adaptation

- BATNA discipline: Czechs respect direct talk about alternatives. "Mám i další jednání" lands cleanly.
- Anchoring: CZ business expects substantiation. "X korun, protože Y, Z, W" beats bare numbers.
- Multi-issue trades: CZ counterpart often expects single-issue (price) negotiation. Surfacing trade space can unlock surprising movement.
- Decision authority: confirm decision-maker is at table early. CZ hierarchy means table-level person may not have authority.
- Written follow-up POVINNÝ — verbal agreements re-negotiated freely in CZ.
```

- [ ] **Step 2: Verify**

```bash
grep -c "^## " plugins/negotiation/references/batna-zopa-framework.md
```

Expected: count ≥ 10.

- [ ] **Step 3: Commit**

```bash
git add plugins/negotiation/references/batna-zopa-framework.md
git commit -m "feat(negotiation): add batna-zopa-framework reference"
```

---

### Task 10: `difficult-conversations-three-frame.md` reference

**Files:**

- Create: `plugins/negotiation/references/difficult-conversations-three-frame.md`

- [ ] **Step 1: Write the reference file**

```markdown
# Difficult Conversations — Three Conversations Frame

> Harvard Negotiation Project frame for high-stakes relationship contexts. Used by emotional-conflict.

## Source

- Douglas Stone, Bruce Patton & Sheila Heen, _Difficult Conversations_ (10th anniv. 2010) — ISBN 9780143118442
- Research anchor: `docs/research/2026-05-07-negotiation-corpus-matrix.md` § "Difficult Conversations"

## Used by

`emotional-conflict`

## The frame

Every difficult conversation is actually **three conversations happening simultaneously**. Most failures come from confusing them.
```

1. The "What Happened?" conversation → facts, intentions, blame
2. The Feelings conversation → emotions, validity, expression
3. The Identity conversation → what does this mean about me?

```

You can't resolve one without addressing all three.

---

## Conversation 1 — "What Happened?"

**Trap:** Assuming there's a single objective truth + the other person is wrong.

**Reality:** Each side has a different story built from selective facts + interpretations + impacts.

### Three sub-shifts

**Shift 1: From "what happened" → "your story / their story / third story"**
- Your story: what you saw, felt, concluded
- Their story: what they saw, felt, concluded (you must steelman this)
- Third story: an outside observer's neutral version. Start the conversation here.

**Example opening (instead of "you broke our agreement"):**
> "I'd like to talk about how the X agreement worked out. From my perspective… From your perspective, I imagine… So the question is what we do now."

**Shift 2: From "I'm right" → "let me understand what's at stake for both of us"**

Stop fighting for who's correct. Start exploring underlying interests.

**Shift 3: From "blame" → "contribution"**

Blame is about past + punishment. Contribution is about how each person's actions led here + what to change.

**Contribution analysis (4 sources):**
1. Avoiding (you let it slide too long)
2. Unrealistic role (expectations that didn't fit)
3. Different interpretive lenses
4. System/structure issues (not personal)

---

## Conversation 2 — Feelings

**Trap:** Treating emotions as obstacles ("let's stay rational").

**Reality:** Suppressed feelings leak into the What Happened conversation as accusations. They must be expressed.

### Three steps

**Step 1: Find your real feelings (not just the "acceptable" ones)**

Most people only acknowledge feelings their identity allows. List ALL feelings:
- The presented feelings (frustration, disappointment)
- The protected feelings (hurt, shame, fear)
- The cluster (you usually feel several at once)

**Step 2: Don't substitute reasoning for feeling**

"I'm not angry, I just think you should have…" → that IS anger, dressed up.

**Step 3: Express feelings carefully**

- "I" statements grounded in facts: "When X happened, I felt Y"
- Avoid weaponizing: don't dump emotion on counterpart
- Acknowledge their emotions before solving

---

## Conversation 3 — Identity

**Trap:** Difficult conversations trigger "identity quakes" — they threaten the story we tell ourselves about who we are.

**Reality:** When identity is at stake, people defend rather than discuss.

### Three identity questions activated

1. Am I competent?
2. Am I a good person?
3. Am I worthy of love?

If conversation threatens any of these → defensiveness.

### Identity-quake mitigation

**For yourself:**
- Adopt **"And stance"** — "I made mistakes AND I'm a good person"
- Replace all-or-nothing identity (I'm perfect / I'm a fraud) with complex identity (I'm capable AND fallible)
- Imagine the conversation 1 year from now — most identity threats are temporary

**For them:**
- Open by reaffirming what's NOT in question. "I want to talk about X. I'm not questioning your competence overall — this is specifically about Y."
- Don't ask for identity changes (people don't change identity in conversations)
- Frame as system/situation, not character

---

## Conversation structure (apply to live high-stakes talk)

1. **Open from the third story.** Set up neutral framing.
2. **Listen to their story before pushing yours.** Active Listening (BCSM Stage 1).
3. **Acknowledge feelings first** — yours and theirs. Don't problem-solve until both feel heard.
4. **Reframe contributions** — what each side did/didn't do that led here. No blame.
5. **Problem-solve together.** Generate options. Use BATNA if disagreement persists.
6. **Close with explicit commitments.** What changes, who does what, when checked.

---

## Common scenarios

### Cofounder split

- Conv 1: "I think you stopped doing your share" → reframe to third story (different lenses on roles, growth pressure changed expectations)
- Conv 2: Hurt + fear of failure (both sides) — name them
- Conv 3: Identity quake on both sides — "am I a good cofounder?" → reaffirm their general competence, frame as situation-specific

### Firing

- Conv 1: Don't moralize. State facts about role + outcome. Avoid "you failed".
- Conv 2: Acknowledge their feelings (shock, betrayal). Don't perform empathy.
- Conv 3: Identity protection — "this isn't about you as a person, it's about role-fit changes". Make it as clean as legally + ethically possible.

### Family business

- Conv 1: Distinguish family role from business role. Third story explicitly names BOTH dynamics.
- Conv 2: Family-history feelings come up — name them, don't dismiss.
- Conv 3: Identity is doubly tangled (child / sibling / business partner) — separate explicitly.

---

## Anti-patterns

- ❌ "Let's just be rational" → ignores Conversation 2, guarantees blowup
- ❌ Starting from your story → triggers their defense
- ❌ Mixing Conversation 1 (facts) with Conversation 3 (identity) → creates "you said I'm a bad person" dynamic
- ❌ Expecting identity change in one conversation → impossible
- ❌ Closing without explicit commitments → re-litigated next time

---

## CZ adaptation

- Three Conversations frame is universal — translates well to CZ
- Open from "third story" works particularly well in CZ (Czechs respect dispassionate framing)
- Identity Conversation: Czech business culture has narrower acceptable emotional range — even more critical to protect identity explicitly
- Feelings Conversation: lower amplitude works better; "Cítím se trochu X" lands better than direct US-style emotional expression
- Always end with written follow-up of commitments (CZ paper trust)
```

- [ ] **Step 2: Verify**

```bash
grep -c "^## Conversation" plugins/negotiation/references/difficult-conversations-three-frame.md
```

Expected: count = 3.

- [ ] **Step 3: Commit**

```bash
git add plugins/negotiation/references/difficult-conversations-three-frame.md
git commit -m "feat(negotiation): add difficult-conversations-three-frame reference"
```

---

### Task 11: `voss-email-adaptations.md` reference

**Files:**

- Create: `plugins/negotiation/references/voss-email-adaptations.md`

- [ ] **Step 1: Write the reference file**

Required structure (250-400 lines):

```markdown
# Voss Email Adaptations

> Voss tactical empathy adapted for written/async contexts. Used by written-negotiation.

## Source

- Chris Voss & Tahl Raz, _Never Split the Difference_ (2016) — ISBN 9780062407801
- Black Swan Group blog (blackswanltd.com) — Voss email-specific tips
- Research anchor: `docs/research/2026-05-07-navarro-vyjednavani.md` and corpus matrix

## Used by

`written-negotiation`

## Core principle

Live verbal Voss tactics work in writing **with adaptation**. The key losses going from voice to text:

- Tone (the late-night-FM-DJ voice doesn't translate)
- Pause timing (silence is harder to deploy)
- Real-time mirroring of body language

The key gains:

- Time to compose
- Permanent record (CZ trusts paper)
- Counterpart can re-read (each pass deepens labeling)

---

## Subject line tactics

### DO: Labeling-style subjects
```

"Question about the Q3 timeline"
"Concern with proposal section 4"
"Following up on yesterday's meeting"

```

These open without forcing a position. Counterpart can engage without commitment.

### DON'T: Solution-promising subjects

```

"Solution for Q3 issue" ← triggers defense
"Re: Final answer on pricing" ← shuts dialogue
"Approval needed by Friday" ← creates pressure

```

These trigger defensive posture before they read line one.

---

## Mirroring in text

Live mirror = repeat last 1-3 words inquisitively. In text:

### DO: Paraphrase as opener

```

> Your incoming: "We can't accept those terms because of budget constraints."
> Your reply opener: "Budget constraints — say more about which line items
> are tightest, so I can think about adjustments?"

```

### DON'T: Literal quote

```

> Your reply opener: "Re your statement 'we can't accept those terms'…"

```

Literal quoting in text reads as legalistic / hostile.

---

## Labeling templates

### English

| Template | Use case |
|----------|----------|
| "It seems like…" | Generic emotion label |
| "It sounds like…" | When emotion came through their text |
| "It looks like…" | When you're inferring from action |
| "I'm guessing this feels…" | Tentative — invites correction |

### Czech

| Template | Use case |
|----------|----------|
| "Vypadá to že…" | Generic |
| "Zní to jako že…" | When emotion came through |
| "Mám pocit že…" | Tentative |
| "Asi vás to…" | Empathetic, lower amplitude |

**Critical:** Labels invite correction. If they correct ("no, it's not that"), GOOD — you've started the conversation.

---

## Calibrated questions in writing

These work better in text than live (counterpart has time to construct thoughtful answer):

| Calibrated question | Effect |
|---------------------|--------|
| "Jak to mám udělat?" / "How am I supposed to do that?" | Forces them to problem-solve with you |
| "Co by muselo být pravda aby X fungovalo?" / "What would need to be true for X to work?" | Surfaces hidden constraints |
| "Co je v tomhle pro vás nejdůležitější?" / "What matters most here?" | Surfaces priorities |
| "Jaký by byl pro vás ideální výsledek?" / "What would the ideal outcome look like?" | Surfaces real interests |
| "Pomozte mi pochopit, jak jste přišli k X" / "Help me understand how you arrived at X" | Surfaces their reasoning without challenge |

---

## No-oriented soft close

Yes-questions feel pressuring in text. No-questions feel safe + give counterpart agency.

| Yes-version (avoid) | No-version (use) |
|---------------------|-------------------|
| "Are you available Friday?" | "Is Friday a bad time?" |
| "Do you agree?" | "Have I missed anything important?" |
| "Will this work?" | "Is there something here that doesn't work for you?" |
| "Can we proceed?" | "Is there a reason not to move forward?" |

---

## Anchor positioning in writing

**Palm-up framing** (asking, openness):
> "I'd value your perspective on…"
> "Curious how you see X."
> "What's your read on…"

**Palm-down framing** (asserting, declaring) — for non-negotiables:
> "Our threshold is X for these reasons: A, B, C."
> "We can't move below Y because Z."

**Constraint statement** (not "no", but "this is the box"):
> "I have a hard constraint of X by Friday — within that, I'm flexible on…"

---

## Red flags in incoming written communication

| Signal | What it means | Don't escalate |
|--------|---------------|----------------|
| ALL-CAPS | Freeze response (emotional flooding) | Reply slowly, lower energy. Don't match. |
| Long delay + cold tone | Flight — they're disengaging | Re-warm with empathy, not pressure |
| CC'ing additional people | Territorial display | Address it: "I notice X is now CC'd — would help to align directly?" |
| Vague timeline ("soon", "ASAP") | ZOPA hidden | Surface: "What's driving urgency? Want to make sure we hit your real deadline." |
| Sudden formality shift (Vy → Vy with cold tone) | Professional distance signal | Match the formality. Don't try to recover warmth via casualness. |
| Single-line replies after long thread | Either annoyed or busy | Calibrated question to disambiguate |

---

## 5 scenario templates

### Scenario 1: Angry klient demanding refund

```

Subject: Vaše zpětná vazba k [project]

[Greeting]: Dobrý den [name],

[Mirror as paraphrase]: Z vaší zprávy chápu, že [project] nesplnil očekávání
v oblasti X — a že vás to stálo Y.

[Label]: Zní to jako že to bylo dost frustrující — investovali jste čas i
očekávání, a výsledek tomu neodpovídal.

[Calibrated question]: Pomozte mi pochopit, co konkrétně by ten výsledek
musel obsahovat, aby z vašeho pohledu měl smysl?

[Anchor (palm-up)]: Rád bych našel řešení, které bude spravedlivé pro obě
strany. Než se ale rozhodneme o refundu, chci se ujistit, že rozumím
úplnému obrazu.

[No-oriented close]: Bylo by pro vás možné v 15min telefonátu projít
detaily, abychom se mohli posunout dál?

S pozdravem,
[name]

```

### Scenario 2: Partner asking for discount mid-deal

```

Subject: K vaší žádosti o úpravu ceny

[Greeting]: Dobrý den [name],

[Mirror]: Žádáte o snížení ceny o [X%] — chápu správně?

[Label]: Vypadá to že tlak na rozpočet je teď silnější než když jsme
začínali. To je něco, co se v projektech stává.

[Calibrated]: Co by se ve scope změnilo, kdybychom hledali úpravu v této
výši? Která část je pro vás nejdůležitější?

[Constraint]: Z naší strany máme hranici, kterou neumíme překročit kvůli
[fixní náklady, kvalita, harmonogram] — pod ní by projekt neměl smysl.

[Trade option]: Mohu navrhnout dvě varianty — buď upravený scope za novou
cenu, nebo původní scope s prodlouženým harmonogramem.

[No-oriented]: Sedlo by vám sdílet, který směr vám dává větší smysl?

S pozdravem,
[name]

```

### Scenario 3: Vendor missing deadline

```

Subject: Status update k [project deadline]

Dobrý den [name],

[Mirror as paraphrase]: Z poslední komunikace jsem pochopil, že termín
[deadline] se posune kvůli [důvod] — chápu správně?

[Label]: Tlak na vás být musí dost — souběh [okolnosti] není snadná situace.

[Calibrated]: Co by potřebovalo se stát, aby revidovaný termín byl
realistický? Můžete mi sdělit, co je teď největší blocker?

[Constraint]: Z mé strany mám fixní deadline [datum] kvůli [downstream
důvod]. Pod tím nemůžu jít, protože [konkrétní impact].

[Options]: Mohu navrhnout dvě varianty — buď upravený scope za původní
termín, nebo původní scope za revidovaný termín, který si stanovíme společně.

[No-oriented close]: Sedlo by vám 20min hovor, ať rozhodneme rychle?

S pozdravem,
[name]

```

### Scenario 4: Contract markup pushback

```

Subject: Vaše komentáře ke smlouvě

Dobrý den [name],

[Mirror]: Z vašich komentářů ke smlouvě vidím, že hlavní obavy jsou kolem
[klauzule X] a [klauzule Y].

[Label]: Vypadá to že [klauzule X] je pro vás citlivá — zní to jako že vás
znepokojuje [konkrétní implikace].

[Calibrated]: Pomozte mi pochopit obavy — co konkrétně by ta klauzule v
nepříznivém scénáři pro vás znamenala?

[Anchor (palm-up framing)]: Z naší strany ta klauzule existuje protože
[důvod — risk allocation, compliance, atd.]. Ráda bych našla formulaci,
která řeší vaši obavu, ale zachovává náš důvod.

[Options]: Mohu navrhnout 2 alternativní formulace — [A] omezuje scope
klauzule na [konkrétní situace], nebo [B] přidává [protective language]
pro vás.

[No-oriented]: Je některá z těch variant blíže tomu, co byste potřebovali?

S pozdravem,
[name]

```

### Scenario 5: Follow-up after silent meeting

```

Subject: Vrátím se k naší středeční diskusi

[Greeting]: Dobrý den [name],

[Mirror]: Naposledy jsme zůstali u otázky [X] — chtěl jsem se vrátit a
ujasnit si, jak v tom dál postupujeme.

[Calibrated]: Co byste potřebovali, aby tato část byla pro vás jasná?

[Anchor]: Z mé strany navrhuji [konkrétní postup] — to je založeno na
[důvod].

[No-oriented]: Je něco v tomto návrhu, co nesedí?

S pozdravem,
[name]

```

---

## CZ-specific written norms

- **Vykání default** vždy (nikdy "ahoj" v business emailu)
- **"Děkuji za Vaši zprávu"** safe opener — zní to formálně, vyhne se to nedorozuměním
- **"To bude těžké"** ve VAŠÍ odpovědi = polite NO (nepoužívat když chcete YES)
- **Written follow-up POVINNÝ** po každém verbálním souhlasu — CZ obchodní kultura trustuje paper
- **Avoid "ASAP", "co nejdříve"** — Czechs prefer specific deadlines
- **CC discipline** — over-CCing (manager, kolegové) reads as aggression v CZ
```

- [ ] **Step 2: Verify**

```bash
grep -c "^### Scenario" plugins/negotiation/references/voss-email-adaptations.md
```

Expected: count ≥ 5.

- [ ] **Step 3: Commit**

```bash
git add plugins/negotiation/references/voss-email-adaptations.md
git commit -m "feat(negotiation): add voss-email-adaptations reference"
```

---

## Phase 2 checkpoint

### Task 12: Verify all 8 references exist + cross-reference matrix

**Files:** none modified

- [ ] **Step 1: List all references**

```bash
ls -1 plugins/negotiation/references/
```

Expected (8 files):

```
batna-zopa-framework.md
bcsm-stairway.md
cialdini-7-principles.md
comfort-discomfort-taxonomy.md
cz-business-culture-deltas.md
difficult-conversations-three-frame.md
goulston-9-rules.md
voss-email-adaptations.md
```

- [ ] **Step 2: Verify each has Source + Used by sections**

```bash
for f in plugins/negotiation/references/*.md; do
  echo "=== $f ==="
  grep -E "^## (Source|Used by)" "$f" || echo "MISSING SECTIONS"
done
```

Each should show 2 lines (Source + Used by). Any "MISSING SECTIONS" = fix that file.

- [ ] **Step 3: Verify total line count is reasonable**

```bash
wc -l plugins/negotiation/references/*.md
```

Each file should be 100-450 lines. Outliers (very short or very long) = review.

**Phase 2 acceptance criteria met:** all 8 references exist with Source + Used by sections. Sub-skills can now reference them.

---

## Phase 3 — Specialist sub-skills (5 tasks, **parallel-ready**)

**Dispatch strategy:** All 5 sub-skill tasks can run in parallel (no inter-dependencies — they reference Phase 2 files but don't modify each other).

**Common acceptance criteria for every sub-skill:**

- Path: `plugins/negotiation/skills/<skill-name>/SKILL.md`
- Has YAML frontmatter with `name`, `description` (with bilingual trigger phrases), `metadata.author`, `metadata.version`
- Has Overview, When to use, Output structure (checklist mode), Anti-patterns, CZ adaptation sections
- References called are explicit links to `plugins/negotiation/references/<name>.md`
- 600-900 lines (proportional to spec section length target)
- YAML frontmatter parses (use `python3 -c "import yaml; yaml.safe_load(open('<file>').read().split('---')[1])"`)

---

### Task 13: `reading-people/SKILL.md`

**Files:**

- Create: `plugins/negotiation/skills/reading-people/SKILL.md`

- [ ] **Step 1: Read source pattern**

Reference existing pattern: `plugins/copywriting/skills/ig-content/SKILL.md` (specialist with rich content). Note structure: frontmatter → Overview → When to use → Process/Output → Anti-patterns → CZ context → Examples.

- [ ] **Step 2: Write SKILL.md per spec section "Skill 2 — reading-people"**

Required frontmatter (exact):

```yaml
---
name: reading-people
description: Use when user wants to read body language, nonverbal cues, comfort/discomfort signals during in-person/video meeting, pitch, interview, or negotiation. Joe Navarro methodology — limbic system, baseline, feet→face honesty hierarchy. Trigger phrases — "číst lidi", "řeč těla", "body language", "nonverbalni komunikace", "pozorovat", "Navarro", "co znamená když...". Do NOT use for verbal tactics (use tactical-empathy), strategic prep (use batna-strategy), or written communication (use written-negotiation).
metadata:
  author: Petr
  version: 1.0.0
---
```

Body sections (per design spec § "Skill 2"):

1. `# Reading People — Navarro Nonverbal Core` (H1)
2. `## Overview` — comfort/discomfort frame (Navarro post-2018), why this not lie-detection
3. `## When to use` (and `### When NOT to use`)
4. `## Pre-meeting prep` — what to watch (room, seating, who's at table)
5. `## 5-min baseline protocol` — neutral topics, what to silently log
6. `## Phase-by-phase observation` — opening / probing / pushback / closing
7. `## Behavior taxonomy quick lookup` — link to `references/comfort-discomfort-taxonomy.md` + 5-10 most-used cues inline
8. `## Anti-patterns` — lie-detector trap, single-tell fallacy, ignoring baseline
9. `## CZ adaptation` — link to `references/cz-business-culture-deltas.md` + key deltas inline
10. `## Output template` — full worked example for "investor jednání zítra" scenario, showing checklist output
11. `## Scientific honesty` — Vrij/DePaulo limits, microexpressions critique
12. `## References called` — explicit list

**Content sources:** Use `docs/research/2026-05-07-navarro-vyjednavani.md` § sections 1-12 + spec design.

**Length target:** 600-800 lines.

- [ ] **Step 3: Validate frontmatter parses**

```bash
python3 -c "
import yaml
content = open('plugins/negotiation/skills/reading-people/SKILL.md').read()
fm = content.split('---')[1]
parsed = yaml.safe_load(fm)
assert 'name' in parsed, 'missing name'
assert 'description' in parsed, 'missing description'
assert parsed['name'] == 'reading-people'
print('OK:', parsed['name'])
"
```

Expected: `OK: reading-people`

- [ ] **Step 4: Validate references are linked**

```bash
grep -E "references/(comfort-discomfort-taxonomy|cz-business-culture-deltas)" plugins/negotiation/skills/reading-people/SKILL.md
```

Expected: at least 2 matches.

- [ ] **Step 5: Commit**

```bash
git add plugins/negotiation/skills/reading-people/SKILL.md
git commit -m "feat(negotiation): add reading-people specialist skill"
```

---

### Task 14: `tactical-empathy/SKILL.md`

**Files:**

- Create: `plugins/negotiation/skills/tactical-empathy/SKILL.md`

- [ ] **Step 1: Write SKILL.md per spec section "Skill 3 — tactical-empathy"**

Required frontmatter (exact):

```yaml
---
name: tactical-empathy
description: Use when user needs to know WHAT TO SAY in live verbal negotiation — mirroring, labeling, calibrated questions, late-night-FM-DJ voice, no-oriented questions, Black Swans, Ackerman bargaining. Chris Voss methodology + BCSM (Behavioral Change Stairway Model). Trigger phrases — "co říct", "mirroring", "labeling", "calibrated questions", "Voss", "tactical empathy", "live verbal", "co odpovědět". Do NOT use for body language (use reading-people), email (use written-negotiation), or strategic prep (use batna-strategy).
metadata:
  author: Petr
  version: 1.0.0
---
```

Body sections (per design spec § "Skill 3"):

1. `# Tactical Empathy — Voss Live Verbal Core` (H1)
2. `## Overview` — BCSM stairway frame, link to `references/bcsm-stairway.md`
3. `## When to use` (and `### When NOT to use`)
4. `## The 8 Voss techniques` — each as subsection with CZ + EN templates:
   - Mirroring
   - Labeling
   - Calibrated questions
   - No-oriented questions
   - Late-night-FM-DJ voice
   - Tactical silence
   - Black Swan surfacing
   - Ackerman bargaining
5. `## Calibrated questions library` — 20-30 templates organized by phase (probe / objection / close), bilingual
6. `## Phase deployment` — when to use which technique
7. `## CZ adaptation` — link to `references/cz-business-culture-deltas.md`
8. `## Cialdini integration` — link to `references/cialdini-7-principles.md` (focus: liking, reciprocity)
9. `## Anti-patterns`
10. `## Output template` — full worked example for "klient chce snížit cenu" scenario
11. `## References called`

**Content sources:** `docs/research/2026-05-07-navarro-vyjednavani.md` § "Voss" + Voss _Never Split the Difference_ methodology summary.

**Length target:** 700-900 lines.

- [ ] **Step 2: Validate frontmatter** (same protocol as Task 13 step 3, change name)

- [ ] **Step 3: Validate references** — match `bcsm-stairway`, `cialdini-7-principles`, `cz-business-culture-deltas`

- [ ] **Step 4: Commit**

```bash
git add plugins/negotiation/skills/tactical-empathy/SKILL.md
git commit -m "feat(negotiation): add tactical-empathy specialist skill"
```

---

### Task 15: `batna-strategy/SKILL.md`

**Files:**

- Create: `plugins/negotiation/skills/batna-strategy/SKILL.md`

- [ ] **Step 1: Write SKILL.md per spec section "Skill 4 — batna-strategy"**

Required frontmatter (exact):

```yaml
---
name: batna-strategy
description: Use when user prepares strategic structure of negotiation — BATNA, ZOPA, anchoring, multi-issue trades, leverage analysis. Fisher/Ury Getting to Yes + Malhotra/Bazerman Negotiation Genius. Trigger phrases — "BATNA", "alternativy", "leverage", "ZOPA", "anchor", "pricing power", "walk-away", "interests vs positions", "Fisher Ury", "Getting to Yes", "co dělat když má víc síly". Do NOT use for verbal delivery (tactical-empathy), body reading (reading-people), or email (written-negotiation).
metadata:
  author: Petr
  version: 1.0.0
---
```

Body sections (per design spec § "Skill 4"):

1. `# BATNA Strategy — Fisher/Ury Structure`
2. `## Overview` — link to `references/batna-zopa-framework.md`
3. `## When to use`
4. `## 4 pillars` — Fisher/Ury deep dive
5. `## BATNA assessment worksheet` — yours + theirs (link to reference)
6. `## ZOPA mapping`
7. `## Anchor strategy`
8. `## Multi-issue trades`
9. `## 5 Core Concerns` (Fisher/Shapiro)
10. `## Defense playbook` — fake authority, take-it-or-leave-it, good cop/bad cop, decoys, manufactured scarcity
11. `## Negotiating from weakness`
12. `## CZ adaptation` — link to `references/cz-business-culture-deltas.md`
13. `## Cialdini integration` — link to `references/cialdini-7-principles.md` (focus: scarcity, authority)
14. `## Anti-patterns`
15. `## Output template`
16. `## References called`

**Length target:** 700-900 lines.

- [ ] **Step 2-3: Validate** (frontmatter + references: `batna-zopa-framework`, `cialdini-7-principles`, `cz-business-culture-deltas`)

- [ ] **Step 4: Commit**

```bash
git add plugins/negotiation/skills/batna-strategy/SKILL.md
git commit -m "feat(negotiation): add batna-strategy specialist skill"
```

---

### Task 16: `emotional-conflict/SKILL.md`

**Files:**

- Create: `plugins/negotiation/skills/emotional-conflict/SKILL.md`

- [ ] **Step 1: Write SKILL.md per spec section "Skill 5 — emotional-conflict"**

Required frontmatter (exact):

```yaml
---
name: emotional-conflict
description: Use for live high-emotion conflict — cofounder split, firing, family business, partnership breakup, unhappy klient face-to-face. Goulston Just Listen + Kohlrieser Hostage at the Table + Stone/Patton/Heen Difficult Conversations. Trigger phrases — "spor", "konflikt", "cofounder split", "vyhazov", "firing", "family business", "rodinny byznys", "unhappy klient live", "partnership breakup", "high stakes emotional", "Goulston", "de-escalation live". Do NOT use for regular business pricing neg (use orchestrator full flow), email/written (use written-negotiation), or actual abuse/crisis (refer to professional helpline).
metadata:
  author: Petr
  version: 1.0.0
---
```

Body sections (per design spec § "Skill 5"):

1. `# Emotional Conflict — Live High-Stakes Resolution`
2. `## Crisis refusal upfront` — explicit refusal + CZ helplines (112, 116 006, 116 111, 116 123) for real abuse/safety/clinical crisis
3. `## Overview`
4. `## When to use`
5. `## Self-regulation FIRST` — Kohlrieser 60-sec check
6. `## Bonding before content` — Kohlrieser 7 keys
7. `## Three Conversations frame` — link to `references/difficult-conversations-three-frame.md`
8. `## Persuasion Cycle stages` — link to `references/goulston-9-rules.md`
9. `## 9 rules` — Goulston (link to reference + summary)
10. `## Session structure` — psychological safety opener / 70-30 listen / reframing / closing
11. `## Power asymmetry ethics`
12. `## Bad-faith counterpart overlay` — Dangerous Personalities red-flags + walk-away strategy
13. `## CZ adaptation` — link to `references/cz-business-culture-deltas.md`
14. `## Anti-patterns`
15. `## Output template` — worked example for "cofounder spor" scenario
16. `## References called`

**Length target:** 700-900 lines.

- [ ] **Step 2-3: Validate** (frontmatter + references: `goulston-9-rules`, `difficult-conversations-three-frame`, `cz-business-culture-deltas`)

- [ ] **Step 4: Commit**

```bash
git add plugins/negotiation/skills/emotional-conflict/SKILL.md
git commit -m "feat(negotiation): add emotional-conflict specialist skill"
```

---

### Task 17: `written-negotiation/SKILL.md`

**Files:**

- Create: `plugins/negotiation/skills/written-negotiation/SKILL.md`

- [ ] **Step 1: Write SKILL.md per spec section "Skill 6 — written-negotiation"**

Required frontmatter (exact):

```yaml
---
name: written-negotiation
description: Use for written/async negotiation — drafting response to angry email, written contract neg, async deal closing, Slack/DM de-escalation. Voss adapted to written + Goulston principles for async + de-escalation patterns. Trigger phrases — "email", "zpráva", "Slack DM", "dopis", "písemně", "draftit odpověď", "písemná de-escalation", "answer the angry email", "smluvní email", "follow-up email", "respond to objection". Do NOT use for live verbal (use tactical-empathy or emotional-conflict), body reading (reading-people).
metadata:
  author: Petr
  version: 1.0.0
---
```

Body sections (per design spec § "Skill 6"):

1. `# Written Negotiation — Email + De-Escalation Async`
2. `## Overview` — link to `references/voss-email-adaptations.md`
3. `## When to use`
4. `## Diagnosis (read incoming first)` — actual ask vs surface, emotion signaling, Cialdini being deployed
5. `## Subject line tactics` — labeling-style vs solution-promising
6. `## Voss adapted templates` — mirror as paraphrase, labeling, calibrated questions, no-oriented soft close (link to reference for full)
7. `## Anchor positioning in writing` — palm-up framing, constraint statement
8. `## Red flags in written form` — ALL-CAPS, long delay + cold tone, CC'ing, vague timeline, formality shifts
9. `## 5 scenario templates` — angry klient, partner discount ask, vendor missed deadline, contract markup pushback, follow-up after silent meeting (full worked examples — link to reference for templates, summarize key moves)
10. `## CZ-specific written norms` — vykání, "Děkuji za Vaši zprávu", "to bude těžké" semantics, written follow-up povinný
11. `## Cialdini in text` — link to `references/cialdini-7-principles.md` (authority, social proof, commitment)
12. `## Anti-patterns`
13. `## Output template` — workflow for processing angry email
14. `## References called`

**Length target:** 700-900 lines.

- [ ] **Step 2-3: Validate** (frontmatter + references: `voss-email-adaptations`, `cialdini-7-principles`, `cz-business-culture-deltas`)

- [ ] **Step 4: Commit**

```bash
git add plugins/negotiation/skills/written-negotiation/SKILL.md
git commit -m "feat(negotiation): add written-negotiation specialist skill"
```

---

## Phase 3 checkpoint

### Task 18: Verify all 5 sub-skills exist + frontmatter parses

**Files:** none modified

- [ ] **Step 1: List all sub-skills**

```bash
ls -1 plugins/negotiation/skills/
```

Expected (5 dirs):

```
batna-strategy
emotional-conflict
reading-people
tactical-empathy
written-negotiation
```

- [ ] **Step 2: Validate all frontmatter parses**

```bash
for f in plugins/negotiation/skills/*/SKILL.md; do
  python3 -c "
import yaml, sys
content = open('$f').read()
fm = content.split('---')[1]
parsed = yaml.safe_load(fm)
assert 'name' in parsed and 'description' in parsed
print('OK:', parsed['name'])
" || echo "FAIL: $f"
done
```

Expected: 5 lines of `OK: <name>` matching directory names.

- [ ] **Step 3: Verify all references exist where called**

```bash
for f in plugins/negotiation/skills/*/SKILL.md; do
  echo "=== $f ==="
  grep -oE "references/[a-z-]+\.md" "$f" | sort -u
done
```

Each referenced file should exist in `plugins/negotiation/references/`.

```bash
for ref in $(grep -hoE "references/[a-z-]+\.md" plugins/negotiation/skills/*/SKILL.md | sort -u); do
  test -f "plugins/negotiation/$ref" && echo "OK: $ref" || echo "MISSING: $ref"
done
```

Expected: all OK.

**Phase 3 acceptance criteria met:** all 5 sub-skills exist with valid frontmatter and all references resolve. Orchestrator can now route to them.

---

## Phase 4 — Orchestrator (sequential)

### Task 19: `negotiation/SKILL.md` (lean orchestrator)

**Files:**

- Create: `plugins/negotiation/skills/negotiation/SKILL.md`

**Why last:** Orchestrator references all 5 sub-skill names + their trigger phrases. Easier to write after sub-skills are settled.

- [ ] **Step 1: Read existing pattern**

```bash
head -120 plugins/copywriting/skills/copywriting-orchestrator/SKILL.md
```

Match this structure pattern.

- [ ] **Step 2: Write SKILL.md per spec section "Skill 1 — negotiation orchestrator"**

Required frontmatter (exact):

```yaml
---
name: negotiation
description: Detects negotiation sub-intent and routes to the right specialist (reading-people, tactical-empathy, batna-strategy, emotional-conflict, written-negotiation). Use when user mentions vyjednávání, jednání, deal, smlouva, salary, conflict, but it's unclear which aspect they need. Trigger phrases — "vyjednavani", "vyjednat", "jednani", "negotiation", "deal", "smlouva", "konflikt", "spor", "vest jednani", "obchodni jednani". Do NOT use when intent is clear — call specialist directly (reading-people for "číst lidi", tactical-empathy for "co říct", written-negotiation for "draftit email", emotional-conflict for "cofounder spor").
metadata:
  author: Petr
  version: 1.0.0
---
```

Body sections (per design spec § "Skill 1"):

1. `# Negotiation Orchestrator`
2. `## Overview` — orchestrator philosophy (conductor not musician), announce string
3. `## When to use` (and `### DON'T use`)
4. `## Step 1 — Routing table` — full CZ + EN keywords → specialist (per spec § "Trigger phrases matrix")
5. `## Step 2 — Multi-domain detection` — common sequences ("investor jednání zítra" → batna → reading-people → tactical-empathy)
6. `## Step 3 — Briefing check` — KDO / CO / KDY / KDE / BATNA before delegating
7. `## Step 4 — Ask if unclear` — A-F multiple choice fallback
8. `## Skill integration diagram` — ASCII tree showing references each skill calls (per spec § "Skill integration diagram")
9. `## Cialdini reminder` — pointer to `references/cialdini-7-principles.md`, never embedded inline
10. `## Edge cases` — explicit refusal templates for E1-E7 (per spec § "Edge cases")
11. `## Ethics summary` — 3-4 lines pointing to detailed guardrails per skill (per spec § "Ethics & guardrails")

**Length target:** 250-350 lines (lean — pure router).

- [ ] **Step 3: Validate frontmatter parses**

```bash
python3 -c "
import yaml
content = open('plugins/negotiation/skills/negotiation/SKILL.md').read()
fm = content.split('---')[1]
parsed = yaml.safe_load(fm)
assert parsed['name'] == 'negotiation'
print('OK')
"
```

- [ ] **Step 4: Verify all 5 sub-skill names appear in routing table**

```bash
for skill in reading-people tactical-empathy batna-strategy emotional-conflict written-negotiation; do
  grep -q "$skill" plugins/negotiation/skills/negotiation/SKILL.md && echo "OK: $skill" || echo "MISSING: $skill"
done
```

Expected: 5 lines of OK.

- [ ] **Step 5: Verify Cialdini pointer (not embedded)**

```bash
grep -c "cialdini" plugins/negotiation/skills/negotiation/SKILL.md
```

Expected: 1-3 (pointer references). If > 5, content was embedded — refactor to reference-only.

- [ ] **Step 6: Commit**

```bash
git add plugins/negotiation/skills/negotiation/SKILL.md
git commit -m "feat(negotiation): add lean orchestrator skill"
```

---

## Phase 5 — Sync, install, smoke tests

### Task 20: Sync symlinks for Gemini CLI + Cowork

**Files:** none modified directly (script creates symlinks)

- [ ] **Step 1: Run sync script**

```bash
~/.claude/scripts/sync-skills-symlinks.sh
```

Expected output: list of created/updated symlinks for negotiation plugin (6 SKILL.md + plugin.json).

- [ ] **Step 2: Verify Gemini CLI symlinks exist**

```bash
ls -la ~/.gemini/skills/negotiation 2>/dev/null || ls -la ~/.gemini/.skills/negotiation 2>/dev/null
```

Expected: directory or symlink with 6 sub-skills + references.

- [ ] **Step 3: Verify Cowork symlinks exist**

```bash
find "$HOME/Library/Application Support/Claude" -name "negotiation" -type d 2>/dev/null | head -5
```

Expected: at least one path under Cowork's skills directory.

---

### Task 21: Plugin install in Claude Code marketplace

**Files:** none modified

⚠️ This task may require user intervention (Claude Code restart + manual install via `/plugins` UI).

- [ ] **Step 1: Update Claude Code marketplace cache**

```bash
cd ~/.claude/plugins/marketplaces/skills
git pull
```

Expected: pull confirmation (possibly "Already up to date" if local commits not yet pushed).

- [ ] **Step 2: Ask user before pushing branch**

⚠️ Per CLAUDE.md, push to remote requires explicit user approval. Ask:

> "Phase 4 hotová — všech 6 skillů + 8 references commitnuté na branchi `feat/negotiation-plugin`. Push na remote?"

If user approves:

```bash
cd ~/Projects/skills
git push -u origin feat/negotiation-plugin
```

If user declines: skip push, continue to local install (Step 3 onward still works without remote).

- [ ] **Step 3: Manual checkpoint — instruct user**

Tell user: "Plugin built on branch `feat/negotiation-plugin`. To install in Claude Code:

1. Restart Claude Code
2. Open `/plugins`
3. Find `negotiation` in marketplace listing
4. Click install
5. Verify 6 skills appear in skill list"

- [ ] **Step 4: Verify plugin appears in cache after install**

```bash
ls ~/.claude/plugins/cache/skills/negotiation/1.0.0/skills/
```

Expected: 6 directories (one per skill).

---

### Task 22: Smoke tests — 5 scenario invocations

**Files:** none modified

For each test, invoke skill with scenario, verify routing/output.

- [ ] **Test 1: Direct sub-skill call (reading-people)**

User says: `použij reading-people, mám zítra investor pitch`
Expected: skill loads, returns Navarro pre-pitch checklist (room/seating, baseline plan, what to watch).

- [ ] **Test 2: Direct sub-skill call (tactical-empathy)**

User says: `použij tactical-empathy, klient řekl "to je moc drahé"`
Expected: skill loads, returns Voss response options (mirror + label + calibrated question).

- [ ] **Test 3: Direct sub-skill call (written-negotiation)**

User says: `použij written-negotiation, mám naštvaný email od klienta o refund`
Expected: skill loads, returns email template per Scenario 1.

- [ ] **Test 4: Orchestrator routing**

User says: `mám jednání s investorem zítra`
Expected: orchestrator skill loads, identifies multi-domain (batna + reading-people + tactical-empathy), runs briefing check or routes to first.

- [ ] **Test 5: Edge case — crisis refusal**

User says: `použij emotional-conflict, můj kolega mi vyhrožuje fyzickým násilím`
Expected: skill REFUSES tactical advice + provides CZ helplines (112, 116 006, 116 111, 116 123).

If any test fails: identify which skill, fix per spec, re-commit, re-test.

---

### Task 23: Final commit + merge prep

**Files:** none new (cleanup if needed)

- [ ] **Step 1: Verify clean working tree**

```bash
git status
```

Expected: clean, no uncommitted changes related to negotiation plugin.

- [ ] **Step 2: Review commit history**

```bash
git log --oneline main..HEAD
```

Expected: ~15-20 commits, each with `feat(negotiation): ...` message.

- [ ] **Step 3: Push final branch**

```bash
git push
```

- [ ] **Step 4: Decision point — merge to main?**

If smoke tests passed + user approves:

```bash
# Switch to main, merge
git checkout main
git merge feat/negotiation-plugin --no-ff -m "feat: add negotiation plugin (6 skills + 8 references)"
git push origin main

# Cleanup branch (optional)
git branch -d feat/negotiation-plugin
git push origin --delete feat/negotiation-plugin
```

⚠️ **Pause here for user approval before merging to main.**

---

## Phase 6 — Optional NotebookLM corpus integration

**Status:** OUT OF SCOPE for v1. Move to follow-up plan once books acquired.

When ready:

1. Acquire TOP 5 books per `docs/research/2026-05-07-negotiation-corpus-matrix.md`
2. Import sources to NotebookLM notebook `8b989435-d568-4248-a3a1-4ddd8ea57da2` (already created)
3. Add NotebookLM query patterns to specialist skills (deep-mode optional)

---

## Self-review checklist

After implementation completes:

- [ ] All 14 markdown files exist (1 plugin.json + 8 references + 5 sub-skills + 1 orchestrator)
- [ ] All YAML frontmatter parses
- [ ] All cross-references resolve (no broken `references/X.md` links)
- [ ] Plugin appears in `~/.claude/plugins/cache/skills/negotiation/1.0.0/`
- [ ] Symlinks created for Gemini CLI + Cowork
- [ ] 5 smoke tests pass (3 direct calls + 1 orchestrator + 1 crisis refusal)
- [ ] Branch pushed
- [ ] User has reviewed before merge to main

---

## Success criteria (from spec)

- ✅ Plugin installs cleanly via `/plugins` UI
- ✅ All 6 skills appear in `~/.claude/plugins/cache/skills/negotiation/1.0.0/skills/`
- ✅ Symlinks created for Gemini CLI + Cowork after `sync-skills-symlinks.sh`
- ✅ Orchestrator routes correctly for 3 test scenarios per sub-skill (15 tests — covered by Task 22 smoke tests)
- ✅ Edge case E2 (crisis refusal) verified — Test 5
- ✅ Edge case E3 (manipulation request) — verified via Test 6 (add to Task 22): user says "jak ho dotlačit aby podepsal i když nechce" → orchestrator (or any sub-skill) reframes to ethical use, surfaces interest beneath "dotlačit", refuses manipulation framing
- ✅ All 8 references load without broken cross-references
- ✅ CZ deltas appear in output for CZ-context scenarios
- ✅ Trigger phrases work bilingual (CZ + EN test set)

---

## Notes for implementer

- **Use claude-glm-delegate where possible** — Phase 2 references and Phase 3 sub-skills are mechanical content production from research docs. Long content fits GLM's strength + saves Opus tokens.
- **Don't try to write entire SKILL.md in one go** — split each sub-skill task into substeps per major section to keep context manageable.
- **Verify each commit before moving on** — small commits (~15-20 total) make rollback easy.
- **CZ language quality matters** — if delegating to GLM, review CZ output for natural phrasing. Voss/Pařík/Dolník-style language is the target tone.
