---
name: negotiation
description: Detects negotiation sub-intent and routes to the right specialist (reading-people, tactical-empathy, batna-strategy, emotional-conflict, written-negotiation). Use when user mentions vyjednávání, jednání, deal, smlouva, salary, conflict, but it's unclear which aspect they need. Trigger phrases — "vyjednavani", "vyjednat", "jednani", "negotiation", "deal", "smlouva", "konflikt", "spor", "vest jednani", "obchodni jednani". Do NOT use when intent is clear — call specialist directly (reading-people for "číst lidi", tactical-empathy for "co říct", written-negotiation for "draftit email", emotional-conflict for "cofounder spor").
metadata:
  author: Petr
  version: 1.0.0
---

# Negotiation Orchestrator

## Overview

This skill orchestrates negotiation work by detecting sub-intent and calling the appropriate specialist. It does NOT implement negotiation tactics itself — it routes to specialists.

**Philosophy:**

```
Orchestrator = Conductor
Specialized Skills = Musicians

The conductor doesn't play instruments, but coordinates who plays when.
```

**Announce:** "I'm using the negotiation orchestrator to route this to the right specialist."

**Frame across all sub-skills:** Read for **psychological discomfort, not deception** (Navarro post-2018). Cialdini principles in **ethical use only**, never manipulation. Defer to professionals on crisis/legal/abuse. CZ business culture deltas built in.

## When to use

**USE this skill:**

- User says "vyjednavani" / "negotiation" / "jednani" / "deal" / "konflikt" without clear sub-intent
- Multi-domain request (e.g., "investor jednání zítra" — touches strategy + reading + verbal)
- Unclear which aspect user needs help with
- Beginning of a negotiation flow where multiple sub-skills will sequence

### DON'T use this skill

- **Intent is clear** → call specialist directly:
  - "číst lidi" / "řeč těla" → `reading-people` directly
  - "co říct klientovi" / "calibrated questions" → `tactical-empathy` directly
  - "BATNA" / "anchor" / "ZOPA" → `batna-strategy` directly
  - "draftit email" / "písemně" → `written-negotiation` directly
  - "cofounder spor" / "firing rozhovor" → `emotional-conflict` directly
- **Real abuse / crisis / safety risk** → refuse + refer to CZ helplines (see Edge Cases)
- **Pure copywriting** (sales page, marketing) → use `copywriting-orchestrator` instead
- **Pure legal compliance** → use `legal:legal-orchestrator` instead

## Step 1 — Routing table

| User keywords | Detected sub-intent | Route to |
|---------------|---------------------|----------|
| `číst lidi`, `řeč těla`, `body language`, `nonverbalni komunikace`, `pozorovat`, `co znamená když...`, `Navarro` | Nonverbal reading | **reading-people** |
| `co říct`, `jak odpovědět`, `mirroring`, `labeling`, `calibrated questions`, `Voss`, `tactical empathy`, `live verbal`, `co odpovědět` | Live verbal tactics | **tactical-empathy** |
| `BATNA`, `alternativy`, `leverage`, `ZOPA`, `anchor`, `pricing power`, `walk-away`, `interests vs positions`, `Fisher Ury`, `Getting to Yes`, `co dělat když má víc síly`, `příprava jednání` | Strategic structure | **batna-strategy** |
| `spor`, `konflikt`, `cofounder split`, `vyhazov`, `firing`, `family business`, `rodinny byznys`, `unhappy klient live`, `partnership breakup`, `high stakes emotional`, `Goulston`, `de-escalation live` | High-emotion live | **emotional-conflict** |
| `email`, `zpráva`, `Slack DM`, `dopis`, `písemně`, `draftit odpověď`, `písemná de-escalation`, `smluvní email`, `follow-up email`, `respond to objection` | Written/async | **written-negotiation** |

## Step 2 — Multi-domain detection

If request spans multiple domains, identify sequence and chain specialists:

```
"Investor jednání zítra"
  → batna-strategy (BATNA prep, valuation anchor, term-sheet trade matrix)
  → reading-people (in-person Navarro flow, baseline + comfort/discomfort observation)
  → tactical-empathy (Voss otázky during Q&A, calibrated questions for concerns)

"Cofounder chce odejít, jak ho přesvedcit zustaty?"
  → emotional-conflict (high-emotion + Three Conversations frame)
  → tactical-empathy (Voss labeling adapted for emotional context)

"Naštvaný klient mi napsal angry email, chce refund"
  → written-negotiation (Voss adapted to written, scenario template 1)
  → emotional-conflict (jako secondary — pokud user chce live follow-up call)

"Vyjednávám smlouvu s vendorem, ale on tlačí na deadline"
  → batna-strategy (your BATNA + theirs estimate)
  → tactical-empathy (calibrated questions to surface real deadline driver)
  → written-negotiation (formal email with constraint statement)

"Salary review s manažerem, je můj nadřízený 10 let"
  → emotional-conflict (relationship context — Difficult Conversations frame)
  → batna-strategy (your BATNA = competing offer? prepare worksheet)
  → tactical-empathy (Voss technique for asking + receiving)
```

When you identify a sequence, announce it: "Tohle je multi-domain — postupně projdeme: 1) [skill A], 2) [skill B], 3) [skill C]."

## Step 3 — Briefing check (before delegating)

Before calling a specialist, ensure these 5 facts are clear:

- **KDO (counterpart):** Kdo je druhá strana? Znáš ji? Kdo má authority?
- **CO (stakes):** Co je v sázce? Jaký je tvůj goal?
- **KDY (timing):** Kdy je meeting? Jaký timeframe?
- **KDE (channel):** In-person / video / email / phone?
- **BATNA:** Máš alternativu? Jakou?

If any of these is unclear, ask the user **before** delegating. The specialist will produce better output with these answers locked.

## Step 4 — Ask if unclear

If neither routing keywords nor multi-domain pattern matches, ask:

```
Co potřebuješ s vyjednáváním?

A) Číst druhou stranu (body language, nonverbální cues)         → reading-people
B) Co říct, jak komunikovat verbálně                            → tactical-empathy
C) Strategická příprava (BATNA, leverage, ZOPA, anchor)         → batna-strategy
D) Emocionální/konfliktní situace (cofounder, firing, family)   → emotional-conflict
E) Email / písemná zpráva / draftit odpověď                     → written-negotiation
F) Komplet workflow (před + při + po jednání)                   → multi-skill sequence
```

## Skill integration diagram

```
negotiation (orchestrator — pure router, this skill)
        │
        ├── reading-people     # Navarro: limbic, baseline, comfort/discomfort, feet
        │       references: comfort-discomfort-taxonomy + cz-business-culture-deltas
        │
        ├── tactical-empathy   # Voss: mirroring, labeling, calibrated, Black Swans, Ackerman
        │       references: bcsm-stairway + cialdini-7-principles + cz-business-culture-deltas
        │
        ├── batna-strategy     # Fisher/Ury + Malhotra: 4 pillars, BATNA, ZOPA, anchor, defense
        │       references: batna-zopa-framework + cialdini-7-principles + cz-business-culture-deltas
        │
        ├── emotional-conflict # Goulston + Kohlrieser + Difficult Conversations
        │       references: goulston-9-rules + difficult-conversations-three-frame + cz-business-culture-deltas
        │
        └── written-negotiation # Voss email adapt + de-escalation written
                references: voss-email-adaptations + cialdini-7-principles + cz-business-culture-deltas
```

## Cialdini reminder

Cialdini's 7 principles (reciprocity, commitment/consistency, social proof, authority, liking, scarcity, unity) are the **bias overlay** across negotiation. They apply in tactical-empathy (liking, reciprocity), batna-strategy (scarcity, authority), written-negotiation (authority, social proof, commitment).

This orchestrator does NOT embed Cialdini content — see `../references/cialdini-7-principles.md` for full taxonomy with ethical use cases, manipulation flags, and defense playbook. Sub-skills reference it where relevant.

## Edge cases

### E1 — Multi-domain request

Trigger: Request touches multiple sub-skills (e.g., "investor jednání zítra").
Action: Run multi-skill sequence (Step 2). Order: batna-strategy → reading-people → tactical-empathy. Optional follow-up: written-negotiation pro thank-you email.

### E2 — User in actual crisis (NOT metaphorical)

Trigger: Real hostage situation, physical abuse, suicide threat, immediate safety risk, threat of violence.

Action: **REFUSE** to provide tactical-negotiation advice. Immediate referral to CZ helplines:

- **112** — záchranná služba (general emergency)
- **158** — Policie (physical violence threat)
- **116 006** — Linka pomoci obětem (domestic abuse)
- **116 111** — Linka bezpečí (children/youth crisis)
- **116 123** — Linka první psychické pomoci (mental health crisis, suicide)

Refusal template:

> "Tohle vypadá jako situace kde tě tactical-negotiation skill nemůže odpovědně vést. Volej okamžitě [contact]. Po stabilizaci se můžeme vrátit k otázkám okolo follow-up komunikace."

### E3 — User wants manipulation tactics

Trigger: "jak ho přesvědčit i když nechce", "jak ho dotlačit", "manipulovat", "trick him into…"

Action: **REFRAME** — Cialdini principles only in ethical use. Manipulation flag activates warning + reframe to interest beneath the want.

Response template:

> "Tahle taktika přechází do manipulace, což má 3 problémy: (1) rozbije důvěru pokud detected, (2) v CZ B2B je reputace small-world, (3) Navarro/Voss explicitly distinguish persuasion vs manipulation. Pojďme reframe goal — co je interest beneath ten 'přesvědčit'?"

### E4 — Bad-faith counterpart (Dangerous Personalities)

Trigger: User describes patterns indicating narcissist / predator / paranoid / unstable counterpart.

Action: Route to `emotional-conflict` (live) or `written-negotiation` (async) + add Dangerous Personalities red-flag overlay. Recommendation: walk-away strategy + protective documentation. Do NOT engage with bad-faith counterpart using full tactical empathy — they exploit it.

### E5 — Cross-cultural beyond CZ

Trigger: counterpart is German / Italian / Indian / US / Asian.

Action: Acknowledge scope limit. `cz-business-culture-deltas` covers only CZ. Refer Erin Meyer *The Culture Map* (2014) as out-of-scope canonical. Brief deltas vs CZ baseline if relevant.

### E6 — Power asymmetry (ethics)

Trigger: employer-employee firing, big corp vs solo founder, lawyer vs lay person.

Action: Explicit ethics callout — tactical empathy is a tool, ne ospravedlnění. Three rules:

1. Never weaponize empathy proti vulnerable counterpart
2. Be transparent o tactics you're using when asked
3. Leave them better off after

### E7 — Group negotiation (3+ parties)

Trigger: board meeting, investor syndicate, multi-vendor negotiation.

Action: Admit primary design = 1-on-1. For 3+ parties: refer Lax/Sebenius *3-D Negotiation* (2006) as out-of-scope canonical. Brief: identify decision-maker, manage coalitions, sequence bilateral sub-conversations.

## Ethics summary

This skill operates under 6 guardrails (detailed per sub-skill):

1. **Frame around discomfort, not deception** (Navarro post-2018 + Vrij research)
2. **Cialdini = persuasion, not manipulation** (ethical use only — see references/cialdini-7-principles.md)
3. **Honest about scientific limits** (microexpressions + single-tells unreliable)
4. **CZ legal context** (recording meetings, GDPR — refer `legal:gdpr` for details)
5. **Professional referrals** (mental health → therapist; legal → lawyer; abuse → helplines; crisis → emergency)
6. **No "ends justify means"** — integrative (mutual gain) default per Fisher/Ury
