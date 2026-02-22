---
name: product-prioritization
description: Provides structured frameworks (RICE, ICE, MoSCoW, Kano) to rank features and decide what to build first. Use when prioritizing a backlog, resolving stakeholder disagreements, or handling feature request overload. Triggers include "what should we build next", "how do I prioritize", "CEO wants X but data says Y", "20 ideas and 3 developers". Do NOT use for understanding customer needs (use product-discovery), defining long-term direction (use product-strategy), or measuring impact (use product-metrics).
metadata:
  author: Petr
  version: 1.0.0
---

# Product Prioritization

## Overview

Prioritization replaces gut feelings and politics with structured decision-making. The goal: maximum impact with available resources.

**Core principle:** Data over opinions. If you can't score it, you can't prioritize it.

**Announce:** "I'm using product-prioritization to help rank and decide what to build first."

## When to Use

**USE this skill:**

- "What should we build next?"
- "How do I prioritize my backlog?"
- "CEO wants X, but data says Y"
- "We have 20 ideas and 3 developers"
- Stakeholder disagreements about priorities
- Feature request overload

**DON'T use this skill:**

- Don't know customer needs yet → `product-discovery`
- Need long-term direction → `product-strategy`
- Need to measure impact → `product-metrics`

## Iron Law

```
DATA OVER OPINIONS
IMPACT OVER EFFORT IS NOT ENOUGH — ADD CONFIDENCE

Score it. Rank it. Discuss the ranking.
Never prioritize by who shouts loudest.
```

## Core Frameworks

### Framework 1: RICE (Intercom)

**Best for:** Data-driven teams with measurable impact. Default choice for most situations.

**Formula:** `RICE Score = (Reach × Impact × Confidence) / Effort`

| Factor         | Definition                          | Scale                                                        |
| -------------- | ----------------------------------- | ------------------------------------------------------------ |
| **Reach**      | How many users affected per quarter | Actual number (e.g., 500 users/quarter)                      |
| **Impact**     | How much it affects each user       | 3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal |
| **Confidence** | How sure are we about R, I, E       | 100% = high, 80% = medium, 50% = low                         |
| **Effort**     | Person-months to build              | Actual estimate (e.g., 2 person-months)                      |

**Example:**

```
Feature: Smart search
Reach: 2000 users/quarter
Impact: 2 (high)
Confidence: 80%
Effort: 3 person-months

RICE = (2000 × 2 × 0.8) / 3 = 1067
```

**When confidence < 50%:** Don't build. Run an experiment first (→ product-discovery).

### Framework 2: ICE (Sean Ellis)

**Best for:** Quick scoring when you don't have detailed reach data. Good for growth experiments.

**Formula:** `ICE Score = Impact × Confidence × Ease`

| Factor         | Scale                                    |
| -------------- | ---------------------------------------- |
| **Impact**     | 1-10 (how much will it move the metric?) |
| **Confidence** | 1-10 (how sure are we?)                  |
| **Ease**       | 1-10 (how easy to implement?)            |

**When to use ICE over RICE:**

- Early-stage, less data available
- Growth experiments (fast iterations)
- Quick triage of long backlog

### Framework 3: MoSCoW

**Best for:** Scope definition, MVP planning, stakeholder alignment on what's in/out.

| Category        | Definition                 | Rule                                      |
| --------------- | -------------------------- | ----------------------------------------- |
| **Must have**   | Product fails without this | Non-negotiable. If missing, don't launch. |
| **Should have** | Important but not critical | Include if possible. Workarounds exist.   |
| **Could have**  | Nice to have               | Only if time allows. First to cut.        |
| **Won't have**  | Explicitly excluded        | Not now. Maybe later. Clear boundary.     |

**How to apply:**

1. List all requirements/features
2. For each, ask: "If we launch WITHOUT this, does the product still work?"
3. YES → not Must. NO → Must.
4. For non-Musts: "How painful is the workaround?" Very → Should. Mild → Could.
5. Agree on Won'ts explicitly (prevents scope creep)

**60/20/20 Rule:** Aim for ~60% Must, ~20% Should, ~20% Could.

### Framework 4: Kano Model

**Best for:** Understanding which features drive satisfaction vs. which are expected. Product differentiation decisions.

**Categories:**

```
Satisfaction ↑
     │           ╱ Excitement (delight)
     │         ╱
     │       ╱
     │─────────────── Performance (more = better)
     │     ╱
     │   ╱
     │ ╱  Basic (expected, no credit for having it)
─────┼──────────────────→ Implementation
     │
```

| Category        | If Present                      | If Absent         | Example                        |
| --------------- | ------------------------------- | ----------------- | ------------------------------ |
| **Basic**       | No reaction                     | Anger/frustration | Login works, page loads fast   |
| **Performance** | Satisfaction increases linearly | Dissatisfaction   | Speed, storage, features count |
| **Excitement**  | Delight, wow factor             | No reaction       | Unexpected feature, magical UX |

**How to discover category (Kano survey):**

- Ask two questions per feature:
  1. "How would you feel if this feature IS present?" (functional)
  2. "How would you feel if this feature IS NOT present?" (dysfunctional)
- Answers: Like it / Expect it / Neutral / Can live with it / Dislike it
- Cross-reference answers to categorize

**Strategic implications:**

- **Basics**: Must have. Fix if broken. No competitive advantage.
- **Performance**: Where you compete. More = better.
- **Excitement**: Where you differentiate. Surprise and delight.

### Framework 5: Value vs Effort Matrix

**Best for:** Quick visual prioritization in team workshops. Good starting point before detailed scoring.

```
         High Value
              │
   Quick      │     Big
   Wins ★     │     Bets
              │
──────────────┼──────────────
              │
   Fill-ins   │     Time
   (maybe)    │     Sinks ✗
              │
         Low Value
    Low Effort ──── High Effort
```

**Action per quadrant:**

- **Quick Wins** (high value, low effort): Do these first
- **Big Bets** (high value, high effort): Plan carefully, validate first
- **Fill-ins** (low value, low effort): Only if capacity allows
- **Time Sinks** (low value, high effort): Kill them

## Process: Running Prioritization

### Step 1: Choose Framework

```
Have detailed data (reach, impact numbers)?
├─ YES → RICE
├─ NO, but need quick scoring → ICE
│
Defining MVP / scope?
├─ YES → MoSCoW
│
Understanding feature categories?
├─ YES → Kano
│
Quick team workshop?
├─ YES → Value vs Effort matrix → then RICE for top items
```

### Step 2: List Items

Collect all candidates from:

- Discovery findings (opportunities from OST)
- Customer requests
- Stakeholder asks
- Tech debt
- Bug fixes
- Growth experiments

### Step 3: Score Independently

- Each team member scores independently first
- Then compare and discuss disagreements
- Disagreement = different assumptions → resolve with data

### Step 4: Rank and Present

- Sort by score (highest first)
- Present top 5-10 to stakeholders
- Show the math — transparent scoring builds trust
- Let data drive the conversation

### Step 5: Review and Iterate

- Re-score quarterly (context changes)
- Track actual impact vs predicted (calibrate scoring)
- Remove completed items, add new discoveries

## Quick Reference

| Framework    | Best For                         | Speed  | Data Needed        |
| ------------ | -------------------------------- | ------ | ------------------ |
| RICE         | Default scoring                  | Medium | Reach, impact data |
| ICE          | Quick triage, experiments        | Fast   | Estimates only     |
| MoSCoW       | MVP scope, stakeholder alignment | Fast   | Requirements list  |
| Kano         | Feature categorization, strategy | Slow   | Customer survey    |
| Value/Effort | Team workshops, visual           | Fast   | Team estimates     |

## Stakeholder Alignment

**When stakeholders disagree:**

1. Make scoring transparent — show the spreadsheet
2. Ask: "What assumptions differ?" (usually Reach or Impact)
3. If no data: "Let's run an experiment to get data" (→ product-discovery)
4. Separate emotional attachment from impact data
5. CEO override is valid — but make it explicit: "We're choosing this despite lower RICE score because [strategic reason]"

## Common Mistakes

**Prioritizing by gut:**
"I feel like users want this" → Score it with RICE. What's the reach? Impact? Confidence?

**HiPPO (Highest Paid Person's Opinion):**
Whoever shouts loudest wins → Make scoring transparent. Data talks.

**Ignoring confidence:**
"This will be huge!" (Confidence: 30%) → Low confidence = experiment first, don't build.

**Scoring once and forgetting:**
Priorities from 6 months ago → Re-score quarterly.

**Only new features:**
Ignoring tech debt and bugs → Include ALL work items in the same scoring.

## Integration

- Customer research → `product-discovery` feeds into scoring
- Prioritized items → `product-strategy` for roadmap placement
- Impact measurement → `product-metrics` for tracking results
- Building top items → `development-workflow` for implementation
