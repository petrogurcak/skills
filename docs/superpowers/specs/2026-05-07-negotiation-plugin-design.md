---
topic: Negotiation plugin design (Joe Navarro + Voss + Fisher/Ury + Goulston)
date: 2026-05-07
status: design-approved
research_inputs:
  - docs/research/2026-05-07-navarro-vyjednavani.md
  - docs/research/2026-05-07-negotiation-corpus-matrix.md
notebooklm_corpus: 8b989435-d568-4248-a3a1-4ddd8ea57da2 ("Vyjednavani — Parik + Dolnik + Prokupek + Navarro")
---

# Negotiation Plugin — Design Specification

## Overview

New plugin `plugins/negotiation/` adding **6 skills** (1 lean orchestrator + 5 specialists) covering negotiation, meeting leadership, conflict resolution, and written de-escalation. Primary methodology = Joe Navarro nonverbal reading + Chris Voss tactical empathy + Fisher/Ury principled negotiation + Goulston/Kohlrieser/Stone-Patton-Heen for emotional contexts. Czech business culture deltas built in; CZ canonical authors (Pařík, Dolník, Prokůpek) referenced as bilingual corpus.

**Output mode:** checklist (deliverable). User describes scenario → skill returns structured pre-meeting / phase-by-phase / closing checklist with concrete tactics.

**Length targets** throughout this spec (e.g., "~600-800 lines") are **guidelines for proportional skill depth**, not enforced caps. Final SKILL.md may be shorter if content is dense or longer if examples warrant.

**Orchestrator delegation model** follows existing pattern from `copywriting-orchestrator` and `ig-orchestrator`: the orchestrator skill ends after announcing routing decision and instructing user how to invoke specialist (e.g., "Use `/negotiation:tactical-empathy` for live verbal tactics"). Orchestrator does NOT auto-call other skills — Claude Code skill model is single-skill-active per turn.

**Audience:** hybrid — universal negotiation skeleton, examples and cultural deltas tuned to CZ business / solo founder reality. Compatible with Claude Code, Cowork, claude.ai.

**Ethical frame:** read for psychological discomfort (not deception, per Navarro post-2018 + Vrij/DePaulo research). Cialdini principles in ethical use only. Skill never recommends manipulation, defers to professionals on crisis/legal/abuse situations.

---

## Architecture

### Filesystem layout

```
plugins/negotiation/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── negotiation/SKILL.md            # lean orchestrator — pure router
│   ├── reading-people/SKILL.md         # Navarro nonverbal core
│   ├── tactical-empathy/SKILL.md       # Voss live verbal core
│   ├── batna-strategy/SKILL.md         # Fisher/Ury + Malhotra structure
│   ├── emotional-conflict/SKILL.md     # Goulston + Kohlrieser + Difficult Conversations (live)
│   └── written-negotiation/SKILL.md    # Voss email + de-escalation (async)
└── references/
    ├── bcsm-stairway.md                       # Vecchi 2005 paper
    ├── cialdini-7-principles.md               # bias library — shared across skills
    ├── comfort-discomfort-taxonomy.md         # Navarro behaviors lookup
    ├── batna-zopa-framework.md                # negotiation math
    ├── cz-business-culture-deltas.md          # CZ specifics — used by all
    ├── goulston-9-rules.md                    # high-emotion mode reference
    ├── difficult-conversations-three-frame.md # relationship contexts
    └── voss-email-adaptations.md              # written de-escalation patterns
```

### Plugin metadata (`.claude-plugin/plugin.json`)

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

### Marketplace registration

Add plugin to `.claude-plugin/marketplace.json` (top-level repo file). Then sync after creation:

```bash
~/.claude/scripts/sync-skills-symlinks.sh
```

---

## Skill 1 — `negotiation/` (lean orchestrator)

**Purpose:** Pure router. Detects sub-intent, optionally runs briefing check, delegates to specialist. NO domain knowledge embedded — references external files when explaining methodology to user.

**Length target:** ~250-350 lines.

**Frontmatter:**

```yaml
name: negotiation
description: Detects negotiation sub-intent and routes to the right specialist (reading-people, tactical-empathy, batna-strategy, emotional-conflict, written-negotiation). Use when user mentions vyjednávání, jednání, deal, smlouva, salary, conflict, but it's unclear which aspect they need. Trigger phrases — "vyjednavani", "vyjednat", "jednani", "negotiation", "deal", "smlouva", "konflikt", "spor", "vest jednani", "obchodni jednani". Do NOT use when intent is clear — call specialist directly (reading-people for "číst lidi", tactical-empathy for "co říct", written-negotiation for "draftit email", emotional-conflict for "cofounder spor").
metadata:
  author: Petr
  version: 1.0.0
```

### SKILL.md structure

1. **Overview** — orchestrator philosophy (conductor, not musician), announce string
2. **When to use / DON'T use** — clear gates
3. **Step 1 — Routing table** (CZ + EN keywords → specialist)
4. **Step 2 — Multi-domain detection** — common sequences (e.g., "investor jednání zítra" → batna → reading-people → tactical-empathy)
5. **Step 3 — Briefing check** — KDO / CO / KDY / KDE / BATNA before delegating
6. **Step 4 — Ask if unclear** — A-F multiple choice fallback
7. **Skill integration diagram** (ASCII tree showing references each skill calls)
8. **Cialdini reminder** — pointer to `references/cialdini-7-principles.md`, never embedded inline
9. **Edge cases** — explicit refusal templates for crisis / abuse / manipulation requests
10. **Ethics summary** (3-4 lines) — pointer to detailed ethical guardrails per skill

---

## Skill 2 — `reading-people/` (Navarro nonverbal core)

**Purpose:** Live nonverbal reading during in-person or video meetings. Teaches user how to baseline, observe, and act on comfort/discomfort cues.

**Length target:** ~600-800 lines.

**Frontmatter:**

```yaml
name: reading-people
description: Use when user wants to read body language, nonverbal cues, comfort/discomfort signals during in-person/video meeting, pitch, interview, or negotiation. Joe Navarro methodology — limbic system, baseline, feet→face honesty hierarchy. Trigger phrases — "číst lidi", "řeč těla", "body language", "nonverbalni komunikace", "pozorovat", "Navarro", "co znamená když...". Do NOT use for verbal tactics (use tactical-empathy), strategic prep (use batna-strategy), or written communication (use written-negotiation).
metadata:
  author: Petr
  version: 1.0.0
```

### SKILL.md structure

1. **Overview** — comfort/discomfort frame (Navarro post-2018), why this not lie-detection
2. **Pre-meeting prep** — what to watch (room, seating, who's at table)
3. **5-min baseline protocol** — neutral topics, what to silently log (blink rate, hand position, foot direction, voice tempo, posture)
4. **Phase-by-phase observation** —
   - Opening (5 min): handshake, baseline confirm
   - Probing: watch deviations during answers
   - Pushback: synchrony check (words vs body)
   - Closing: ventral fronting cluster vs ventral denial
5. **Behavior taxonomy** — quick reference table (links to `comfort-discomfort-taxonomy.md`)
6. **Anti-patterns** — lie-detector trap, single-tell fallacy, ignoring baseline
7. **CZ adaptation** — emotional restraint baseline, sensitivity > amplitude (links to `cz-business-culture-deltas.md`)
8. **Output template** — checklist mode example for typical scenario
9. **Scientific honesty** — what's well-supported vs debated (Vrij, microexpressions critique)

**References called:** `comfort-discomfort-taxonomy.md` (primary), `cz-business-culture-deltas.md`

---

## Skill 3 — `tactical-empathy/` (Voss live verbal core)

**Purpose:** Live verbal tactics. Teaches user what to say and how to say it during live negotiation (in-person, phone, video).

**Length target:** ~700-900 lines.

**Frontmatter:**

```yaml
name: tactical-empathy
description: Use when user needs to know WHAT TO SAY in live verbal negotiation — mirroring, labeling, calibrated questions, late-night-FM-DJ voice, no-oriented questions, Black Swans, Ackerman bargaining. Chris Voss methodology + BCSM (Behavioral Change Stairway Model). Trigger phrases — "co říct", "mirroring", "labeling", "calibrated questions", "Voss", "tactical empathy", "live verbal", "co odpovědět". Do NOT use for body language (use reading-people), email (use written-negotiation), or strategic prep (use batna-strategy).
metadata:
  author: Petr
  version: 1.0.0
```

### SKILL.md structure

1. **Overview** — BCSM stairway frame (Active Listening → Empathy → Rapport → Influence → Behavioral Change), cumulative-sequential
2. **8 Voss techniques** (each with CZ + EN templates):
   - Mirroring (last 1-3 words, inquisitive)
   - Labeling ("It seems like...", "Vypadá to že...")
   - Calibrated questions ("How am I supposed to do that?", "Jak to mám udělat?")
   - No-oriented questions ("Is now a bad time?", "Je teď nevhodná doba?")
   - Late-night-FM-DJ voice
   - Tactical silence
   - Black Swan surfacing
   - Ackerman bargaining (65/85/95/100% cadence)
3. **Calibrated questions library** — 20-30 templates organized by phase (probe / objection / close)
4. **Phase deployment** — when to use which technique in negotiation flow
5. **CZ adaptation** — vykání baseline, "to bude těžké" = polite NO, less amplitude in delivery
6. **Anti-patterns** — over-mirroring, fake empathy, premature solving, weaponized labeling
7. **Output template** — checklist mode for typical scenario
8. **Cialdini integration pointer** — liking + reciprocity moments (links to `cialdini-7-principles.md`)

**References called:** `bcsm-stairway.md` (primary), `cialdini-7-principles.md`, `cz-business-culture-deltas.md`

---

## Skill 4 — `batna-strategy/` (Fisher/Ury structure)

**Purpose:** Pre-negotiation strategic preparation + structural moves during. Math, leverage, alternatives, defenses against tricks.

**Length target:** ~700-900 lines.

**Frontmatter:**

```yaml
name: batna-strategy
description: Use when user prepares strategic structure of negotiation — BATNA, ZOPA, anchoring, multi-issue trades, leverage analysis. Fisher/Ury Getting to Yes + Malhotra/Bazerman Negotiation Genius. Trigger phrases — "BATNA", "alternativy", "leverage", "ZOPA", "anchor", "pricing power", "walk-away", "interests vs positions", "Fisher Ury", "Getting to Yes", "co dělat když má víc síly". Do NOT use for verbal delivery (tactical-empathy), body reading (reading-people), or email (written-negotiation).
metadata:
  author: Petr
  version: 1.0.0
```

### SKILL.md structure

1. **Overview** — Fisher/Ury 4 pillars frame
2. **4 pillars deep dive:**
   - Separate people from problem
   - Focus on interests, not positions
   - Invent options for mutual gain
   - Use objective criteria
3. **BATNA assessment worksheet** — yours (precise), theirs (estimated). Links to `batna-zopa-framework.md`
4. **ZOPA mapping** — your reservation point, their estimated reservation, overlap zone
5. **Anchor strategy** — first-offer math (when to anchor, when not), anchor-shifting moves
6. **Multi-issue trades** — bundle vs sequential, which issues to package
7. **5 Core Concerns prep** (Fisher/Shapiro) — appreciation, affiliation, autonomy, status, role
8. **Defense playbook** (Malhotra/Bazerman Ch. 10-11):
   - Fake authority detection
   - Take-it-or-leave-it response
   - Good cop / bad cop
   - Decoy options
   - Manufactured scarcity
9. **Negotiating from weakness** — when their BATNA is stronger
10. **CZ adaptation** — hierarchical decision authority (identify decision-maker), written paper trust, "to bude těžké" interpretation
11. **Cialdini integration pointer** — scarcity, authority, commitment

**References called:** `batna-zopa-framework.md` (primary), `cialdini-7-principles.md`, `cz-business-culture-deltas.md`

---

## Skill 5 — `emotional-conflict/` (live high-emotion)

**Purpose:** Live high-emotion conflict resolution. Cofounder splits, firing, family business disputes, partnership breakups, unhappy klient face-to-face.

**Length target:** ~700-900 lines.

**Frontmatter:**

```yaml
name: emotional-conflict
description: Use for live high-emotion conflict — cofounder split, firing, family business, partnership breakup, unhappy klient face-to-face. Goulston Just Listen + Kohlrieser Hostage at the Table + Stone/Patton/Heen Difficult Conversations. Trigger phrases — "spor", "konflikt", "cofounder split", "vyhazov", "firing", "family business", "rodinny byznys", "unhappy klient live", "partnership breakup", "high stakes emotional", "Goulston", "de-escalation live". Do NOT use for regular business pricing neg (use orchestrator full flow), email/written (use written-negotiation), or actual abuse/crisis (refer to professional helpline).
metadata:
  author: Petr
  version: 1.0.0
```

### SKILL.md structure

1. **Crisis refusal upfront** — if real abuse / safety / clinical crisis, immediate referral (CZ helplines: 112, 116 006, 116 111, 116 123). Skill does NOT provide tactical advice in those cases.
2. **Self-regulation FIRST** (Kohlrieser) — 60-sec internal check (am I in fight/flight myself), my 5 Core Concerns activated?
3. **Bonding before content** (Kohlrieser 7 keys) — secure base, mind's eye, focus on positive
4. **Three Conversations frame** (Stone/Patton/Heen):
   - What Happened conversation (facts, attribution)
   - Feelings conversation (emotions, validity)
   - Identity conversation (what does this mean about me?)
5. **Persuasion Cycle** (Goulston) — diagnose where counterpart is (Resisting → Listening → Considering → Willing → Doing → Glad I did). Push only to next stage, never skip.
6. **9 rules** (Goulston) — empathy jolt, "I get it" framing, amygdala-to-neocortex tactics
7. **Session structure:**
   - Opening: psychological safety statement
   - Listening: 70% them / 30% you
   - Reframing: Voss labeling adapted
   - Closing: explicit next step + relationship reaffirmation
8. **Anti-patterns** — escalation, fake empathy, premature problem-solving, "let's just be rational" (rationality bias)
9. **Power asymmetry ethics** — when there's significant power imbalance, additional ethical constraints
10. **Bad-faith counterpart overlay** — if narcissist/predator/paranoid pattern, walk-away + protective documentation
11. **CZ adaptation** — emotional restraint baseline, written follow-up povinný after live emotional session

**References called:** `goulston-9-rules.md`, `difficult-conversations-three-frame.md`, `cz-business-culture-deltas.md`

---

## Skill 6 — `written-negotiation/` (email + de-escalation async)

**Purpose:** Written/async negotiation. Drafting responses to angry emails, written contract negotiation, async deal closing, Slack/DM de-escalation.

**Length target:** ~700-900 lines.

**Frontmatter:**

```yaml
name: written-negotiation
description: Use for written/async negotiation — drafting response to angry email, written contract neg, async deal closing, Slack/DM de-escalation. Voss adapted to written + Goulston principles for async + de-escalation patterns. Trigger phrases — "email", "zpráva", "Slack DM", "dopis", "písemně", "draftit odpověď", "písemná de-escalation", "answer the angry email", "smluvní email", "follow-up email", "respond to objection". Do NOT use for live verbal (use tactical-empathy or emotional-conflict), body reading (reading-people).
metadata:
  author: Petr
  version: 1.0.0
```

### SKILL.md structure

1. **Diagnosis (read incoming first)** — what's the actual ask vs surface ask, what emotion is signaling, what Cialdini principle is being deployed against you
2. **Subject line tactics** — labeling-style ("Question about X"), NEVER solution-promising ("Re: Solution to X") which triggers defense
3. **Voss adapted templates:**
   - Mirroring as paraphrase (not literal quote)
   - Labeling templates ("It seems like...", "It sounds like..." / "Vypadá to že...", "Zní to jako že...")
   - Calibrated questions in writing
   - No-oriented soft close ("Is now a bad time to schedule a call?")
4. **Anchor positioning in writing** — palm-up framing, constraint statement, no-defensive-language
5. **Red flags in written form** — ALL-CAPS = freeze response (don't escalate), long delay + cold tone = flight, CC'ing additional people = territorial display, vague timeline ("soon", "ASAP") = ZOPA hidden
6. **5 scenario templates with full examples:**
   - Angry klient demanding refund
   - Partner asking for discount mid-deal
   - Vendor missing deadline
   - Contract markup pushback
   - Follow-up after silent meeting
7. **CZ-specific written norms** — vykání default, "Děkuji za Vaši zprávu" safe opener, avoid "to bude těžké" as concession, ALWAYS written follow-up confirms verbal agreements
8. **Cialdini in text** — authority (credentials embedded), social proof (other clients), commitment (small public yes patterns)

**References called:** `voss-email-adaptations.md` (primary), `cialdini-7-principles.md`, `cz-business-culture-deltas.md`

---

## References content (8 files)

### `bcsm-stairway.md`

- **Canonical:** Vecchi, Van Hasselt & Romano (2005), _Aggression and Violent Behavior_. Free PDF on nsuworks.nova.edu.
- **Content:** 5-stage progression (Active Listening → Empathy → Rapport → Influence → Behavioral Change), cumulative-sequential logic, why each stage is prerequisite for next, common stage-skipping mistakes
- **Called by:** tactical-empathy, emotional-conflict

### `cialdini-7-principles.md`

- **Canonical:** Robert Cialdini, _Influence: New & Expanded_ (2021) + _Pre-Suasion_ (2016)
- **Content:** 7 principles (reciprocity, commitment/consistency, social proof, authority, liking, scarcity, unity). For each: definition + ethical use case + manipulation flag (skill never recommends manipulation) + how to defend when used against you
- **Called by:** tactical-empathy, batna-strategy, written-negotiation (orchestrator references as pointer only)

### `comfort-discomfort-taxonomy.md`

- **Canonical:** Joe Navarro, _What Every Body Is Saying_ (2008) + _Dictionary of Body Language_ (2018) + jnforensics.com post-2018 articles
- **Content:** Comfort cluster vs discomfort cluster lookup tables. Per body part: feet, legs, torso, arms, hands, face, eyes. Specific behaviors → comfort/discomfort marker → typical context. Pacifying behaviors catalogue. Anti-patterns (don't read for deception).
- **Called by:** reading-people

### `batna-zopa-framework.md`

- **Canonical:** Fisher/Ury _Getting to Yes_ (3rd ed. 2011) + Malhotra/Bazerman _Negotiation Genius_ (2007)
- **Content:** BATNA computation worksheet, ZOPA mapping protocol, anchor math, multi-issue trade matrix, 5 Core Concerns prep (Fisher/Shapiro), defense playbook against tricks
- **Called by:** batna-strategy

### `cz-business-culture-deltas.md`

- **Canonical:** Composite — Pařík _Umění vyjednat cokoliv_ (2024) + Business Culture / World Business Culture profiles + Hofstede CZ data
- **Content:** Delta table — US/Anglo-Saxon baseline → CZ adjustment per: handshake, vykání/tykání, punctuality, directness paradox, emotional restraint, body amplitude, personal space, small talk topics (safe + landmines), meal etiquette, written agreement trust, decision style hierarchy, "to bude těžké" / "uvidíme" = polite NO
- **Called by:** all 5 sub-skills

### `goulston-9-rules.md`

- **Canonical:** Mark Goulston, _Just Listen_ (2009)
- **Content:** 9 rules + Persuasion Cycle stages (Resisting → Listening → Considering → Willing → Doing → Glad I did) + diagnostic questions per stage + amygdala-to-neocortex tactics + empathy jolt + "I get it" framing
- **Called by:** emotional-conflict, written-negotiation (subset for written de-escalation)

### `difficult-conversations-three-frame.md`

- **Canonical:** Stone, Patton & Heen, _Difficult Conversations_ (10th anniv. 2010, Harvard Negotiation Project)
- **Content:** Three Conversations frame (What Happened / Feelings / Identity) + internal preparation checklist for each + identity-quake mitigation + how to shift from "right vs wrong" to "your story / their story / third story"
- **Called by:** emotional-conflict

### `voss-email-adaptations.md`

- **Canonical:** Chris Voss _Never Split the Difference_ (2016) — adapted for written via composite (Voss own email tips + Black Swan Group blog + Goulston async principles)
- **Content:** Subject line patterns (labeling vs solution-promising), mirroring as paraphrase, labeling templates, calibrated question phrasings, no-oriented soft close, anchor positioning with palm-up framing, 5 scenario templates
- **Called by:** written-negotiation

---

## Cross-reference matrix

| Reference                           | reading-people | tactical-empathy | batna-strategy | emotional-conflict | written-negotiation |
| ----------------------------------- | :------------: | :--------------: | :------------: | :----------------: | :-----------------: |
| bcsm-stairway                       |                |        ✓         |                |         ✓          |                     |
| cialdini-7-principles               |                |        ✓         |       ✓        |                    |          ✓          |
| comfort-discomfort-taxonomy         |       ✓        |                  |                |                    |                     |
| batna-zopa-framework                |                |                  |       ✓        |                    |                     |
| cz-business-culture-deltas          |       ✓        |        ✓         |       ✓        |         ✓          |          ✓          |
| goulston-9-rules                    |                |                  |                |         ✓          |          ✓          |
| difficult-conversations-three-frame |                |                  |                |         ✓          |                     |
| voss-email-adaptations              |                |                  |                |                    |          ✓          |

---

## Trigger phrases matrix

| Sub-skill                | Primary triggers (CZ)                                                                                                                                                                | Primary triggers (EN)                                                                              | Secondary                                                 | NEGATIVE                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **negotiation** (router) | "vyjednavani", "jednani", "vyjednat", "obchodni jednani", "vest jednani", "dohoda", "smlouva", "deal", "konflikt" (ambiguous)                                                        | "negotiation", "negotiate", "deal", "agreement", "lead a meeting"                                  | "pomoz mi s X meetingem", "nevim jak na to"               | When sub-intent clear → call specialist directly                                      |
| **reading-people**       | "číst lidi", "řeč těla", "co znamená když...", "pozorovat", "neverbalni komunikace", "co prozrazuje", "Navarro"                                                                      | "body language", "read people", "nonverbal", "what does it mean when...", "Navarro"                | "co si myslí druhá strana", "rozumět situaci"             | NOT for verbal tactics, NOT for written                                               |
| **tactical-empathy**     | "co říct", "jak odpovedet", "mirroring", "labeling", "calibrated questions", "Voss", "live verbal"                                                                                   | "what to say", "how to phrase", "mirroring", "labeling", "tactical empathy", "Voss"                | "rapport", "vest rozhovor", "active listening"            | NOT for body reading, NOT for email                                                   |
| **batna-strategy**       | "BATNA", "alternativy", "leverage", "ZOPA", "anchor", "pricing power", "walk-away", "interests vs positions", "Fisher Ury", "Getting to Yes", "co dělat když má víc síly"            | "BATNA", "ZOPA", "leverage", "walk-away", "anchor", "principled negotiation"                       | "strategie před jednáním", "příprava", "jak se připravit" | NOT for verbal delivery, NOT during meeting                                           |
| **emotional-conflict**   | "spor", "konflikt", "cofounder split", "vyhazov", "firing", "rozvod společníků", "rodinny byznys", "unhappy klient live", "partnership breakup", "Goulston", "high stakes emotional" | "conflict", "cofounder split", "firing", "family business", "high-emotion", "de-escalate live"     | "tezky rozhovor", "obtizny rozhovor", "emocni situace"    | NOT for regular pricing neg, NOT for written, NOT for actual abuse/crisis (refer pro) |
| **written-negotiation**  | "email", "zpráva", "Slack DM", "dopis", "písemně", "draftit odpověď", "písemná de-escalation", "smluvní email", "follow-up email"                                                    | "email", "draft response", "written de-escalation", "Slack DM", "DM reply", "respond to objection" | "písemná komunikace", "answer this", "respond to"         | NOT for live verbal, NOT for body reading                                             |

---

## Edge cases (apply to orchestrator + relevant sub-skill)

**E1: Multi-domain request**
Trigger: "investor jednání zítra" — touches multiple sub-skills.
Action: Orchestrator runs multi-skill sequence. Order: batna-strategy → reading-people → tactical-empathy. Optional follow-up: written-negotiation for thank-you email.

**E2: User in actual crisis**
Trigger: real hostage situation, physical abuse, suicide threat, immediate safety risk.
Action: Skill explicitly refuses tactical advice. Immediate referral to CZ helplines:

- Crisis: 112 (záchranná služba)
- Domestic abuse: Linka pomoci 116 006
- Suicide: Linka bezpečí 116 111 / Linka první psychické pomoci 116 123
  Refusal template: "Tohle vypadá jako situace kde tě tactical-negotiation skill nemůže odpovědně vést. Volej okamžitě [contact]. Po stabilizaci se můžeme vrátit k otázkám okolo follow-up komunikace."

**E3: User wants manipulation tactics**
Trigger: "jak ho přesvědčit i když nechce", "jak ho dotlačit", "manipulovat".
Action: Skill reframes — Cialdini in ethical use only. Manipulation flag activates warning + reframe to interest beneath the want.

**E4: Bad-faith counterpart (Dangerous Personalities)**
Trigger: User describes patterns indicating narcissist / predator / paranoid / unstable.
Action: Route to emotional-conflict (live) or written-negotiation (async) + add Dangerous Personalities red-flag overlay. Recommendation: walk-away strategy + protective documentation.

**E5: Cross-cultural beyond CZ**
Trigger: counterpart is German / Italian / Indian / US / Asian.
Action: Skill acknowledges scope limit. Refers Erin Meyer _The Culture Map_ (2014) as out-of-scope canonical. Brief deltas vs CZ baseline.

**E6: Power asymmetry**
Trigger: employer-employee firing, big corp vs solo founder.
Action: Explicit ethics callout — tactical empathy is not justification for moves. (a) never weaponize empathy against vulnerable counterpart, (b) be transparent about tactics when asked, (c) leave them better off.

**E7: Group negotiation (3+ parties)**
Trigger: board meeting, investor syndicate, multi-vendor.
Action: Admits primary design = 1-on-1. Refers Lax/Sebenius _3-D Negotiation_ (2006) as out-of-scope. Brief: identify decision-maker, manage coalitions, sequence bilateral sub-conversations.

---

## Ethics & guardrails (apply across all sub-skills)

**G1: Frame around discomfort, not deception** — Per Navarro post-2018 + Vrij/DePaulo/Bond research. Skill never recommends "use body language to detect lies." Reframe: read for psychological discomfort → investigate cause via questions.

**G2: Cialdini = persuasion, not manipulation** — Each principle in `cialdini-7-principles.md` has 3 fields: ethical use case, manipulation flag, defense against. Skill uses ethical only.

**G3: Honest about scientific limits** — Microexpressions: low frequency, low reliability (Frontiers 2018, PMC6158306). Single tells: ~54% accuracy = chance (Vrij). Macro patterns + baseline deviation: better than single cues. BCSM: validated framework (Vecchi 2005).

**G4: CZ legal context** — Recording meetings: GDPR + CZ trestní zákon — recording without consent is legal for own protection (vlastní právní zájem) but cannot be published/shared without consent. Reference `legal:gdpr` for details. Written agreements: CZ business culture trusts paper > verbal handshake. Always follow up verbal with email summary.

**G5: Professional referrals** — Skill is decision support, not therapy/legal advice. When situation crosses lines: mental health → therapist; legal dispute → lawyer; abuse → support hotlines; real crisis → emergency services. Skill explicitly refers, doesn't pretend to handle.

**G6: No "ends justify means" framing** — Default frame: integrative (mutual gain) per Fisher/Ury. Distributive (zero-sum) tactics only invoked when user explicitly in distributive context (e.g., one-shot real-estate sale).

---

## Anti-patterns (skill warns user away from)

- ❌ "Read body language to catch lies" → reframe (G1)
- ❌ "Power-poses to dominate" → debunked (Carney/Cuddy retractions)
- ❌ "Mirror everything to build rapport fast" → over-mirroring detected as fake
- ❌ "Win at all costs" → relationships are repeat games
- ❌ "Just be authentic" → naïve in adversarial contexts
- ❌ "If you can read them, you can manipulate them" → ethics violation (G2)
- ❌ "FBI tactics work universally" → CZ business culture deltas matter

---

## Build sequence (for writing-plans skill input)

Build order respects dependencies (references first, then skills that consume them):

### Phase 1 — Plugin scaffolding

1. Create `plugins/negotiation/.claude-plugin/plugin.json`
2. Add plugin to `.claude-plugin/marketplace.json`
3. Create `plugins/negotiation/skills/` and `plugins/negotiation/references/` directories

### Phase 2 — References (8 files, parallel-ready)

**Content sources:** All 8 references draw from existing research docs `docs/research/2026-05-07-navarro-vyjednavani.md` and `docs/research/2026-05-07-negotiation-corpus-matrix.md` (already in repo). Books listed as "canonical" are attribution sources, not required to own — research docs already extracted methodology. NotebookLM corpus integration (Phase 6) can deepen references later.

Order priority (most-referenced first):

1. `cz-business-culture-deltas.md` (called by all 5 sub-skills)
2. `cialdini-7-principles.md` (called by 3 sub-skills)
3. `bcsm-stairway.md` (called by 2)
4. `goulston-9-rules.md` (called by 2)
5. `comfort-discomfort-taxonomy.md` (called by reading-people)
6. `batna-zopa-framework.md` (called by batna-strategy)
7. `difficult-conversations-three-frame.md` (called by emotional-conflict)
8. `voss-email-adaptations.md` (called by written-negotiation)

### Phase 3 — Specialist sub-skills (5 files, parallel-ready after refs)

1. `reading-people/SKILL.md`
2. `tactical-empathy/SKILL.md`
3. `batna-strategy/SKILL.md`
4. `emotional-conflict/SKILL.md`
5. `written-negotiation/SKILL.md`

### Phase 4 — Orchestrator

1. `negotiation/SKILL.md` (depends on all 5 sub-skills existing — references their names + triggers)

### Phase 5 — Sync & validation

1. Run `~/.claude/scripts/sync-skills-symlinks.sh` (Gemini CLI + Cowork symlinks)
2. Smoke test in Claude Code (`/negotiation`)
3. Verify all 6 frontmatter validate (YAML lint)
4. Test 3-5 scenario invocations end-to-end

### Phase 6 — Optional NotebookLM corpus integration

1. Acquire TOP 5 books per `2026-05-07-negotiation-corpus-matrix.md`
2. Import sources to NotebookLM notebook `8b989435-d568-4248-a3a1-4ddd8ea57da2`
3. Add NotebookLM query patterns to specialist skills (deep-mode optional)

---

## Out of scope for v1

- NotebookLM corpus integration (Phase 6 — optional, depends on book acquisition)
- Future sub-skills: `crisis-negotiation` (full hostage), `salary-negotiation`, `pitch-negotiation` (Klaff frame control), `multi-party-negotiation` (Lax/Sebenius 3-D)
- Cross-cultural beyond CZ (Erin Meyer territory)
- Group negotiation (3+ parties)
- Voice-tone analysis (Voss late-night-FM-DJ has limits in writing)
- Live audio/video automation (skill is decision support, not real-time analyzer)

---

## Success criteria

- ✅ Plugin installs cleanly via `/plugins` UI
- ✅ All 6 skills appear in `~/.claude/plugins/cache/skills/negotiation/1.0.0/skills/`
- ✅ Symlinks created for Gemini CLI + Cowork after `sync-skills-symlinks.sh`
- ✅ Orchestrator routes correctly for 3 test scenarios per sub-skill (15 tests)
- ✅ Edge case E2 (crisis refusal) verified — skill refuses tactical advice + provides helpline
- ✅ Edge case E3 (manipulation request) verified — skill reframes to ethical use
- ✅ All 8 references load without broken cross-references
- ✅ CZ deltas appear in output for CZ-context scenarios
- ✅ Trigger phrases work bilingual (CZ + EN test set)

---

## Open items

- Should `negotiation` plugin reference `legal:gdpr` for CZ recording-of-meetings compliance? (Decision: yes, as pointer in G4 ethics section)
- Should we add a Pařík-specific reference file? (Decision: no — Pařík is canonical CZ author, content lives in `cz-business-culture-deltas.md` with explicit attribution)
- Should orchestrator embed Cialdini summary or just pointer? (Decision: pointer only — keep orchestrator lean)
- Audioteka Klub trial timing for NotebookLM corpus — separate decision, not blocker for skill build

---

## Acceptance

User approved sections 1-5 incrementally during brainstorming session 2026-05-07. This spec is the consolidated artifact for handoff to writing-plans skill.
