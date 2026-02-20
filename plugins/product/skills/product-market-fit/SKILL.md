---
name: product-market-fit
description: Use when asking "are we building the right thing?", measuring retention, evaluating churn, or deciding whether to scale - PMF Survey, PMF Engine, Crossing the Chasm
---

# Product-Market Fit

## Overview

Product-market fit means building something people actually want and will keep using. Without PMF, nothing else matters — not marketing, not growth, not fundraising.

**Core principle:** If less than 40% of users would be "very disappointed" without your product, don't scale. Fix the product first.

**Announce:** "I'm using product-market-fit to evaluate whether we're building the right thing."

## When to Use

**USE this skill:**
- "Do we have product-market fit?"
- "Should we invest in growth?"
- "Our retention is bad"
- "Users sign up but don't stay"
- "Are we building the right thing?"
- Considering scaling/fundraising
- Churn is high despite marketing

**DON'T use this skill:**
- Don't know customer needs yet → `product-discovery`
- Need to choose what to build → `product-prioritization`
- Need long-term direction → `product-strategy`
- Need to define metrics → `product-metrics`

## Iron Law

```
IF < 40% "VERY DISAPPOINTED", DON'T SCALE
FIX RETENTION BEFORE INVESTING IN GROWTH

Growing a leaky bucket just wastes money faster.
```

## Core Frameworks

### Framework 1: PMF Survey (Sean Ellis)

**Best for:** Quick, quantitative PMF measurement. The industry standard.

**The Question:**

```
"How would you feel if you could no longer use [product]?"

A) Very disappointed
B) Somewhat disappointed
C) Not disappointed (it's not really that useful)
```

**The Benchmark:**

| Score | Status | Action |
|-------|--------|--------|
| **40%+ "Very disappointed"** | PMF achieved | Scale growth |
| **25-40%** | Getting close | Focus on core value |
| **< 25%** | No PMF | Pivot or iterate significantly |

**How to Run:**
1. Survey users who experienced core value (used product 2+ times, recent activity)
2. Minimum 40 responses for statistical relevance
3. Don't survey one-time visitors or inactive users
4. Run quarterly to track progress

**Follow-up Questions (ask all respondents):**

```
1. "What type of person do you think would benefit most from [product]?"
   → Reveals ideal customer profile

2. "What is the main benefit you receive from [product]?"
   → Reveals core value in customer's words

3. "How can we improve [product] for you?"
   → Reveals gaps and opportunities
```

### Framework 2: PMF Engine (Rahul Vohra / Superhuman)

**Best for:** Systematic process to improve PMF score. Superhuman improved from 22% to 58% using this.

**4-Step Process:**

#### Step 1: Segment — Find Your High-Expectation Customer (HXC)

```
From PMF survey, identify WHO said "Very disappointed"
├── What do they have in common?
├── Demographics? Role? Company size?
├── Use case? Job to be done?
└── This is your High-Expectation Customer (HXC)
```

**Why segment:** Overall PMF might be low, but specific segments might love you. Focus on them.

**HXC Profile Template:**

```
Role: [e.g., "Startup founder with 5-20 employees"]
Context: [e.g., "Managing customer communication across channels"]
Pain: [e.g., "Email is too slow, losing deals"]
What they value: [From survey: main benefit in their words]
```

#### Step 2: Analyze — Understand What Holds You Back

From "Somewhat disappointed" respondents who match your HXC profile:

```
WHY aren't they "Very disappointed"?
├── What's missing? (from "How can we improve?" answers)
├── What's the gap between their experience and HXC experience?
└── These gaps = your roadmap priorities
```

**Key insight:** Focus on converting "Somewhat disappointed" HXC-matching users to "Very disappointed." Don't try to please everyone.

#### Step 3: Build — Prioritize Ruthlessly

```
Roadmap priority:
1. Double down on what "Very disappointed" users love
2. Fix what "Somewhat disappointed" HXC users say is missing
3. IGNORE what "Not disappointed" users want

This is counterintuitive — you're ignoring most feedback.
```

**Scoring roadmap items:**

For each improvement:
- Does it serve the HXC? (if not, deprioritize)
- Will it convert "Somewhat" to "Very disappointed"?
- Does it strengthen what "Very disappointed" users already love?

#### Step 4: Repeat — Track PMF Score Over Time

```
Quarterly PMF tracking:
├── Run survey every quarter
├── Track % "Very disappointed" over time
├── Track by segment (HXC vs others)
└── Goal: steady increase toward 40%+
```

### Framework 3: Product-Market Fit Pyramid (Dan Olsen)

**Best for:** Systematic approach to building toward PMF from scratch. Useful for new products.

**6 Layers (bottom-up):**

```
      ┌─────────────────┐
      │      UVP         │  6. Unique Value Proposition
      ├─────────────────┤
      │   Feature Set    │  5. What you build
      ├─────────────────┤
      │   Value Prop     │  4. Why customers choose you
      ├─────────────────┤
      │  Underserved     │  3. Needs not well met
      │  Needs           │
      ├─────────────────┤
      │  Target          │  2. Who you serve
      │  Customer        │
      ├─────────────────┤
      │  Market          │  1. The market exists
      └─────────────────┘
```

**Process:**
1. Verify market exists (people spend money solving this)
2. Define target customer precisely (not "everyone")
3. Identify underserved needs (high importance, low satisfaction)
4. Articulate value proposition (why you, not alternatives)
5. Build feature set that delivers value proposition
6. Create UVP that communicates it clearly

**Each layer depends on the one below.** If target customer is wrong, everything above it is wrong too.

### Framework 4: Crossing the Chasm (Geoffrey Moore)

**Best for:** Understanding why products stall after early adopters. Critical for B2B and tech products.

**Technology Adoption Life Cycle:**

```
   Innovators → Early Adopters → [CHASM] → Early Majority → Late Majority → Laggards
    (2.5%)        (13.5%)                     (34%)           (34%)          (16%)
```

**The Chasm:**
- Early adopters buy vision, tolerate bugs, want to be first
- Early majority wants proven solutions, references, and safety
- The gap between them is where most products die

**Crossing Strategy:**

| Step | Action |
|------|--------|
| 1. Pick a beachhead | Choose ONE specific niche to dominate first |
| 2. Whole product | Build everything that niche needs (not just MVP) |
| 3. References | Get 2-3 referenceable customers in that niche |
| 4. Position vs alternative | "For [niche] who [pain], our product is [category] that [benefit]" |
| 5. Dominate, then expand | Own the niche before expanding to adjacent ones |

**Beachhead Selection Criteria:**
- Small enough to dominate (100-1000 potential customers)
- Painful enough that they'll buy imperfect solution
- Connected enough that word spreads (references matter)
- Expanding enough to lead to adjacent segments

## Process: Measuring and Improving PMF

### Step 1: Do You Have PMF?

```
Run Sean Ellis survey
├── 40%+ "Very disappointed" → YES, scale with confidence
├── 25-40% → CLOSE, focus on improving
├── < 25% → NO, significant work needed
│
No survey data?
├── Retention > 40% at day 30 → Good signal
├── Organic growth (word of mouth) → Good signal
├── Users coming back without prompting → Good signal
├── Need paid acquisition to keep numbers up → Bad signal
```

### Step 2: If PMF < 40%

```
1. Run full PMF Engine (Vohra's 4 steps)
2. Find and profile your HXC
3. Double down on what HXC loves
4. Fix gaps for "Somewhat disappointed" HXC-matching users
5. Consider: Is the market right? (Olsen's pyramid, layer 1-2)
6. Consider: Are we in the chasm? (Moore's framework)
```

### Step 3: If PMF ≥ 40%

```
1. Document your HXC profile
2. Scale growth channels (→ growth-hacking, product-led-growth)
3. Keep measuring quarterly (PMF can slip)
4. Expand to adjacent segments carefully
5. Watch for chasm dynamics if B2B
```

## PMF Signals (Beyond Survey)

| Signal | Strong PMF | Weak PMF |
|--------|-----------|----------|
| **Retention** | 30-day > 40% | Drops after trial |
| **NPS** | > 50 | < 0 |
| **Organic growth** | Word of mouth drives signups | Only paid acquisition |
| **Usage patterns** | Users come back daily/weekly | One-time use |
| **Customer requests** | "Can you add X?" (expansion) | "Can you fix Y?" (basics broken) |
| **Sales cycle** | Short, customers seek you | Long, lots of objections |
| **Pricing** | Can raise prices | Users churn on any price |

## Quick Reference

| Framework | Core Question | Best For |
|---|---|---|
| PMF Survey (Ellis) | "Would users miss us?" | Measuring PMF score |
| PMF Engine (Vohra) | "How do we improve PMF?" | Systematic improvement |
| PMF Pyramid (Olsen) | "Are we building on solid foundation?" | New products |
| Crossing the Chasm (Moore) | "Why did growth stall?" | B2B, tech products |

## Common Mistakes

**Scaling before PMF:**
"Let's invest in marketing" → If PMF < 40%, marketing just accelerates churn. Fix the product.

**Surveying wrong users:**
Surveying everyone including one-time visitors → Survey only users who experienced core value.

**Trying to please everyone:**
"Everyone should love our product" → Focus on HXC. Ignore non-target feedback.

**Confusing growth with PMF:**
"We have 50K signups!" → How many come back? What's retention? Signups ≠ PMF.

**Not segmenting:**
Overall PMF is 25% → But developers say 55%. Focus on developers!

**PMF as one-time event:**
"We achieved PMF in 2023" → PMF can slip. Measure quarterly.

## Integration

- Understanding customers → `product-discovery` (if PMF low, learn more)
- Prioritizing improvements → `product-prioritization` (PMF Engine roadmap)
- Strategy after PMF → `product-strategy` (scale plan)
- Measuring PMF signals → `product-metrics` (retention, NPS, engagement)
- Scaling after PMF → `growth-hacking`, `product-led-growth`
