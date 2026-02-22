---
name: copywriting-orchestrator
description: Detects content type and routes to the right specialized copywriting skill (instagram-content, web-copy, product-copy, newsletter). Use when the user asks for copy but it is unclear which specialist to use, or for multi-channel campaigns spanning several formats. Trigger phrases: "write copy for", "help me with copywriting", "product launch campaign", "I need marketing text". Do NOT use when you already know the exact medium — call the specialist skill directly instead.
metadata:
  author: Petr
  version: 1.0.0
---

# Copywriting Orchestrator

## Overview

This skill orchestrates copywriting work by detecting content type and calling the appropriate specialized skill. It does NOT implement copywriting itself - it routes to specialists.

**Philosophy:**

```
Orchestrator = Conductor
Specialized Skills = Musicians

The conductor doesn't play instruments, but coordinates who plays when.
```

**Announce:** "I'm using copywriting-orchestrator to determine the right copywriting approach."

## When to Use

**USE this skill:**

- Any copywriting request (unclear which specialist to use)
- Multi-channel campaigns (product launch = product page + email + social)
- "Help me write copy for..." requests
- Content strategy requiring multiple formats

**DON'T use this skill:**

- Already know exact medium → use specialist directly
- Pure editing/proofreading (not copywriting)

## Content Type Detection

### Step 1: Keyword Detection

| Keywords in Request                                               | Detected Type | Specialist Skill    |
| ----------------------------------------------------------------- | ------------- | ------------------- |
| `instagram`, `reel`, `stories`, `post`, `social`, `tiktok`        | Social Media  | `instagram-content` |
| `homepage`, `web`, `landing`, `about us`, `sales page`, `website` | Web Copy      | `web-copy`          |
| `produkt`, `e-shop`, `product description`, `e-commerce`, `popis` | Product Copy  | `product-copy`      |
| `email`, `newsletter`, `mailing`, `campaign`, `sequence`          | Email         | `newsletter`        |

### Step 2: Context Clues

If keywords unclear, check context:

```
Is it for social media platform?
├─ YES → instagram-content
│
Is it for a website page?
├─ YES → web-copy
│
Is it describing a product for sale?
├─ YES → product-copy
│
Is it sent to inbox?
├─ YES → newsletter
│
Still unclear?
└─ ASK user (see Step 3)
```

### Step 3: Ask if Unclear

```
I need to know what type of copy you're creating:

A) Instagram/Social Media (Reels, Stories, posts)
B) Website (homepage, landing page, about us)
C) Product Description (e-shop, e-commerce)
D) Email/Newsletter (campaigns, sequences)
E) Multi-channel campaign (combination)
```

## Skill Integration

### Skills this orchestrator calls:

```
copywriting-orchestrator
        │
        ├── instagram-content
        │   └── Hook-Substance-Payoff, viral content
        │
        ├── web-copy
        │   └── Blueprint, Triáda, PROTTO, homepage elements
        │
        ├── product-copy
        │   └── 7-step framework, Type A/B products
        │
        └── newsletter
            └── 9-step email anatomy, subject lines
```

### Shared Resources (loaded by specialists):

- `core-copywriting-principles.md` - 8 základních pravidel
- `core-briefing-process.md` - 8 otázek (CO, JAK, ČÍM, KDE, KOMU, KDO, KAM, PROČ)

## Standard Workflow

### Phase 1: Detection

Detect content type using keywords and context (see above).

### Phase 2: Briefing Check

Before calling specialist, ensure briefing is complete:

**Quick Brief (minimum 4 questions):**

- **KOMU (Audience):** Who is the target?
- **KAM (Goal):** What action do we want?
- **ČÍM (Differentiation):** Why us vs competitors?
- **PROČ (Why):** What's the deeper story?

If briefing incomplete → prompt user for answers before proceeding.

### Phase 3: Call Specialist

Invoke appropriate skill:

> "Using instagram-content for Instagram Reel creation."

The specialist skill handles its own workflow (TDD, checklists, quality controls).

### Phase 4: Quality Gate

After specialist completes, verify against Core Copywriting Principles:

```
☐ Headline bez tečky?
☐ Max 3 řádky na odstavec?
☐ Konkrétní čísla místo obecných tvrzení?
☐ Žádné zakázané klišé? (vysoká kvalita, flexibilní, komplexní...)
☐ Jasné CTA?
```

## Multi-Channel Campaigns

When request involves multiple channels:

### Example: Product Launch

```
User: "Chystám launch nového produktu"

Orchestrator detects: Multi-channel campaign

Recommended sequence:
1. product-copy → produktová stránka
2. newsletter → launch email sekvence
3. instagram-content → promo Reels/Stories

Execution: Call each skill in sequence OR parallel
```

### Example: Website Redesign

```
User: "Potřebujeme přepsat celý web"

Orchestrator detects: Web copy (multiple pages)

web-copy handles:
- Homepage (9 prvků)
- About Us
- Landing pages
- Blog structure
```

## Decision Logic

```dot
digraph copywriting_flow {
    "Request arrives" [shape=doublecircle];
    "Detect content type" [shape=box];
    "Type clear?" [shape=diamond];
    "Ask user" [shape=box];
    "Briefing complete?" [shape=diamond];
    "Prompt for brief" [shape=box];
    "Call specialist skill" [shape=box];
    "Quality gate check" [shape=box];
    "Done" [shape=doublecircle];

    "Request arrives" -> "Detect content type";
    "Detect content type" -> "Type clear?";
    "Type clear?" -> "Ask user" [label="no"];
    "Type clear?" -> "Briefing complete?" [label="yes"];
    "Ask user" -> "Briefing complete?";
    "Briefing complete?" -> "Prompt for brief" [label="no"];
    "Briefing complete?" -> "Call specialist skill" [label="yes"];
    "Prompt for brief" -> "Call specialist skill";
    "Call specialist skill" -> "Quality gate check";
    "Quality gate check" -> "Done";
}
```

## Quick Reference

| Content Type     | Specialist Skill    | Core Framework            |
| ---------------- | ------------------- | ------------------------- |
| Instagram/Social | `instagram-content` | Hook-Substance-Payoff     |
| Website/Landing  | `web-copy`          | Blueprint, Triáda, PROTTO |
| E-shop Products  | `product-copy`      | 7-step, Type A/B          |
| Email/Newsletter | `newsletter`        | 9-step anatomy            |

## Common Mistakes

**❌ Bypassing briefing:**
"Let me just start writing..." → STOP. Brief first.

**❌ Using wrong specialist:**
Product description on landing page → `web-copy` (sales page section), NOT `product-copy`

**❌ Ignoring quality gate:**
Specialist done ≠ copy done. Always verify Core Principles.

**❌ Not detecting multi-channel:**
"Launch campaign" = multiple skills, not just one.

## Integration Notes

**From specialists back to orchestrator:**
If specialist needs input from another (e.g., UVP for web copy), orchestrator coordinates:

1. `uvp-optimization` → define positioning
2. `web-copy` → write homepage with UVP

**Cross-skill knowledge:**

- Instagram hooks can inform email subject lines
- Product copy microbenefits can become web headlines
- Newsletter CTAs follow same principles as web CTAs
