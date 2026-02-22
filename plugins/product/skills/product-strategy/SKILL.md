---
name: product-strategy
description: Connects company vision to execution using Product Operating Model, OKRs, and outcome-driven roadmapping. Use when defining product vision, setting goals, building roadmaps, or aligning teams on long-term direction. Triggers include "what's our product vision", "how do I set OKRs", "we need a roadmap", "where are we going". Do NOT use for deciding what to build specifically (use product-discovery), deciding build order (use product-prioritization), validating PMF (use product-market-fit), or choosing metrics (use product-metrics).
metadata:
  author: Petr
  version: 1.0.0
---

# Product Strategy

## Overview

Product strategy connects company vision to what teams build. It answers: "Where are we going and why?"

**Core principle:** Outcomes over outputs. Empowered teams solve problems — they don't just ship features on a roadmap.

**Announce:** "I'm using product-strategy to define direction, goals, and roadmap."

## When to Use

**USE this skill:**

- "What's our product vision?"
- "How do I set OKRs for my product?"
- "We need a roadmap"
- "What's our strategy for the next year?"
- "How do I align teams on direction?"
- Stakeholders asking "where are we going?"

**DON'T use this skill:**

- What to build specifically → `product-discovery`
- What to build first → `product-prioritization`
- Are we on the right track → `product-market-fit`
- How to measure → `product-metrics`

## Iron Law

```
OUTCOMES OVER OUTPUTS
EMPOWERED TEAMS SOLVE PROBLEMS, NOT SHIP FEATURES

Strategy without measurable outcomes is just a wish list.
Roadmap without strategy is just a feature factory.
```

## Core Frameworks

### Framework 1: Product Operating Model (Marty Cagan / SVPG)

**Best for:** Transforming how your organization builds product. The foundational model for modern product management.

**Core Concept:** Move from feature teams (told WHAT to build) to empowered teams (given PROBLEMS to solve).

**Key Elements:**

| Element       | Feature Team (old)                | Empowered Team (new)                  |
| ------------- | --------------------------------- | ------------------------------------- |
| **Input**     | Feature roadmap from stakeholders | Strategic context + problems to solve |
| **Team role** | Deliver features on time          | Discover and deliver solutions        |
| **Success**   | Shipped on schedule               | Outcome achieved                      |
| **PM role**   | Project manager, backlog admin    | Product owner with real authority     |
| **Discovery** | None or minimal                   | Continuous (weekly customer contact)  |

**Strategic Context (what leadership provides):**

1. Company mission and vision
2. Product strategy (where to focus)
3. Specific team objectives (problems to solve)
4. Key results (how to measure success)

**What leadership does NOT provide:**

- Feature lists
- Solutions
- Detailed requirements
- Implementation timelines

**How to Apply:**

1. Define clear product vision (see below)
2. Create product strategy (focus areas)
3. Assign problems to teams via OKRs (not features)
4. Teams discover and deliver solutions
5. Measure outcomes, not output

### Framework 2: Product Vision

**Best for:** Aligning the entire organization on where the product is going. 3-5 year horizon.

**Product Vision Template:**

```
In [timeframe],
[product name] will be
[description of future state]
for [target customer]
who [key need/job-to-be-done].

Unlike [current alternatives],
our product will [key differentiator].
```

**Vision Board (Roman Pichler):**

```
┌─────────────────────────────────────┐
│           VISION                     │
│  "Where do we want to go?"          │
├──────────┬──────────┬───────────────┤
│ Target   │ Needs    │ Product       │
│ Group    │          │               │
│ Who?     │ Why?     │ What?         │
├──────────┴──────────┴───────────────┤
│         BUSINESS GOALS              │
│  Revenue? Market share? Retention?  │
└─────────────────────────────────────┘
```

**Good Vision Characteristics:**

- Inspiring (people want to work toward it)
- Ambitious but achievable (stretches, doesn't break)
- Customer-centric (about value, not technology)
- Stable (doesn't change every quarter)
- Measurable (you'll know when you're closer)

### Framework 3: OKRs (Objectives and Key Results)

**Best for:** Translating strategy into measurable quarterly goals. Originated at Intel, popularized by Google.

**Structure:**

```
Objective: [Qualitative, inspiring goal]
├── KR1: [Measurable result] (baseline → target)
├── KR2: [Measurable result] (baseline → target)
└── KR3: [Measurable result] (baseline → target)
```

**Rules:**

- 2-4 Objectives per quarter
- 2-4 Key Results per Objective
- Key Results are measurable outcomes, NOT tasks/outputs
- 70% achievement = success (stretch goals)
- Review weekly, score quarterly

**Good vs Bad OKRs:**

| Bad OKR                  | Why Bad             | Good Alternative                       |
| ------------------------ | ------------------- | -------------------------------------- |
| O: Launch feature X      | Output, not outcome | O: Make onboarding effortless          |
| KR: Ship by March 15     | Task, not result    | KR: Activation rate 30% → 50%          |
| KR: Build 3 integrations | Output count        | KR: Users with integrations 10% → 40%  |
| O: Improve product       | Too vague           | O: Become the fastest option for [job] |

**OKR Cadence:**

```
Annual: Company-level objectives (strategic themes)
   │
Quarterly: Team-level OKRs (problems to solve)
   │
Weekly: Check-in on KR progress (are we on track?)
   │
End of Quarter: Score and retrospect
```

### Framework 4: Product Strategy

**Best for:** Deciding WHERE to focus. Strategy is about making choices — what you WON'T do matters as much as what you will.

**Strategy = Focus Areas + Evidence + Goals**

**How to Build Product Strategy:**

1. **Understand the landscape**
   - Who are customers? What are their jobs? (→ product-discovery)
   - Who are competitors? What's their strategy?
   - What are market trends?

2. **Define focus areas (2-4 max)**

   ```
   We will focus on:
   1. [Area 1] because [evidence]
   2. [Area 2] because [evidence]

   We will NOT focus on:
   - [Area X] because [reason]
   - [Area Y] because [reason]
   ```

3. **Set objectives for each focus area**
   - Each focus area gets 1 Objective with Key Results
   - Teams own focus areas

4. **Review quarterly**
   - Are focus areas still correct?
   - Did we learn something that changes strategy?

**Strategic Bets Template:**

```
BET: [What we're betting on]
THESIS: [Why we believe this will work]
EVIDENCE: [Data/research supporting this]
RISK: [What could go wrong]
SUCCESS METRIC: [How we'll know it worked]
TIMEFRAME: [When we'll evaluate]
```

### Framework 5: Roadmapping

**Best for:** Communicating priorities and direction to stakeholders. NOT a commitment to specific features.

**Outcome-Based Roadmap (recommended):**

```
NOW (this quarter)      NEXT (next quarter)     LATER (future)
─────────────────       ──────────────────      ──────────────
[Outcome 1]             [Outcome 3]             [Outcome 5]
 - Solution A            - Being explored        - Needs discovery
 - In progress           - Several options

[Outcome 2]             [Outcome 4]
 - Solution B            - Early research
 - Testing
```

**Confidence decreases left to right:** NOW items are concrete, LATER items are directional.

**Feature-Based Roadmap (avoid if possible):**

- Lists specific features with dates
- Creates false commitments
- Removes team empowerment
- Use only if stakeholders absolutely require it

**Roadmap Rules:**

1. Communicate direction, not commitments
2. Show outcomes, not features (when possible)
3. Update quarterly (at minimum)
4. Less detail for items further out
5. Always show the "why" (which strategy/OKR does this serve?)

## Process: Building Strategy

### Step 1: Assess Current State

```
Where are we today?
├── Product-market fit? (→ product-market-fit)
├── Key metrics health? (→ product-metrics)
├── Customer satisfaction?
├── Competitive position?
└── Team capability?
```

### Step 2: Define Vision (if not exists)

- Workshop with leadership + product leaders
- Use Vision template or Vision Board
- Test: Can anyone in the company explain it in 30 seconds?

### Step 3: Set Strategy (Focus Areas)

- Based on vision + current state + market research
- 2-4 focus areas maximum
- Include explicit "won't do" list

### Step 4: Create OKRs

- Translate focus areas into quarterly OKRs
- Each team gets clear objectives
- Key Results are measurable outcomes

### Step 5: Build Roadmap

- Map OKRs to roadmap format (NOW / NEXT / LATER)
- Show connection between roadmap items and strategy
- Share with stakeholders

## Quick Reference

| Framework               | Core Question                      | Timeframe |
| ----------------------- | ---------------------------------- | --------- |
| Product Operating Model | "How should we organize?"          | Permanent |
| Product Vision          | "Where are we going?"              | 3-5 years |
| Product Strategy        | "Where do we focus?"               | 1 year    |
| OKRs                    | "What do we achieve this quarter?" | Quarterly |
| Roadmap                 | "What are we working on?"          | Rolling   |

## Common Mistakes

**Feature roadmap as strategy:**
"Our strategy is to build X, Y, Z" → Strategy is about outcomes. What problem does X solve?

**Too many objectives:**
10 OKRs per quarter → Pick 2-4. Focus is about saying no.

**Key Results as tasks:**
"KR: Launch mobile app" → That's an output. "KR: Mobile DAU reaches 5K" is a result.

**Vision too vague:**
"Be the best platform" → For whom? Doing what? Measurably how?

**Strategy without trade-offs:**
"We'll do everything" → Strategy IS making choices. What are you NOT doing?

**Roadmap as contract:**
"We promised feature X by March" → Roadmap shows direction, not commitments. Outcomes may change.

## Integration

- Customer understanding → `product-discovery` feeds strategy
- Prioritizing within strategy → `product-prioritization`
- Measuring strategy success → `product-metrics`
- PMF before scaling strategy → `product-market-fit`
- Go-to-market for strategy → `marketing-orchestrator`
